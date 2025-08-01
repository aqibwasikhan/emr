'use client';

import { useCallback, useState, useTransition } from 'react';
import { InfiniteScrollContainer } from '@/components/shared/infinite-scroll-container';
import { FacilityCard } from '@/features/facility/components/facility-card';
import { OrgAndFacCardSkeleton } from './OrgAndFacCardSkeleton';
import { AddFacilityCard } from '@/features/facility/components/AddFacilityCard';
import { Organization } from '@/types/organization';
import { Facility } from '@/types/facilities';
import { getFacilitiesByOrgId } from '@/app/actions/facility';

export function OrganizationDetailClient({
    org,
    initialFacilities,
    totalFacilities
}: {
    org: Organization;
    initialFacilities: Facility[];
    totalFacilities: number;
}) {
    const [refreshKey, setRefreshKey] = useState(0);
    const [highlightedId, setHighlightedId] = useState<number | undefined>();
    const handleAddNewFacility = (newFacility: Facility) => {
        setHighlightedId(newFacility.id); // 👈 to animate
        setRefreshKey(prev => prev + 1); // 👈 to trigger data reload
    };

    const fetchPage = useCallback(
        async (page: number, limit: number) => {
            const { facilities } = await getFacilitiesByOrgId(org.id, page, limit);
            return facilities;
        },
        [org.id, refreshKey] // ✅ depend on refreshKey so fetches fresh data
    );
    // const fetchPage = useCallback(
    //     async (page: number, limit: number) => {
    //         // For page 1, return current state
    //         if (page === 1) return facilities;
    //         const { facilities: newPageFacilities } = await getFacilitiesByOrgId(org.id, page, limit);
    //         return newPageFacilities;
    //     },
    //     [org.id, facilities]
    // );
    return (
        <InfiniteScrollContainer<Facility>
            className="m-4"
            initialItems={initialFacilities}
            total={totalFacilities}
            initialPage={1}
            limit={14}
            showNoResultFound={false}
            refreshKey={refreshKey}
            fetchPage={fetchPage}
            renderFirstItem={() => <AddFacilityCard onAddSuccess={handleAddNewFacility} organizationId={org.id} />}
            highlightedItemId={highlightedId} // ✅ NEW
            renderItem={(facility) => (
                <FacilityCard facility={facility} />
            )}
            firstItem={true}
            renderSkeleton={(i) => <OrgAndFacCardSkeleton key={i} />}
        />
    );
}

