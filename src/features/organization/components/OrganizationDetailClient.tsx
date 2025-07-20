// 'use client';

// import { InfiniteScrollContainer } from '@/components/infinite-scroll-container';
// import { FacilityCard } from '@/features/facility/components/FacilityCard';
// import { OrgAndFacCardSkeleton } from './OrgAndFacCardSkeleton';
// import { AddFacilityCard } from '@/features/facility/components/AddFacilityCard';
// import { Organization } from '@/types/organization';
// import { Facility } from '@/types/facilities';
// import { getFacilitiesByOrgId } from '@/app/actions/facility';

// export function OrganizationDetailClient({
//     org,
//     initialFacilities,
//     totalFacilities
// }: {
//     org: Organization;
//     initialFacilities: Facility[];
//     totalFacilities: number;
// }) {
//     return (
//         <InfiniteScrollContainer<Facility>
//             className='m-4'
//             initialItems={initialFacilities}
//             total={totalFacilities}
//             initialPage={1}
//             limit={7}
//             fetchPage={async (page, limit) => {
//                 const { facilities } = await getFacilitiesByOrgId(org.id, page, limit);
//                 return facilities;
//             }}
//             renderFirstItem={() => <AddFacilityCard />}
//             renderItem={(facility) => <FacilityCard key={facility.id} facility={facility} />}
//             firstItem={true}
//             renderSkeleton={(i) => (
//                 <OrgAndFacCardSkeleton key={i} />
//             )}
//         />

//     );
// }
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
    
    // const [refreshKey, setRefreshKey] = useState(Date.now()); // force re-render InfiniteScroll
    const [refreshKey, setRefreshKey] = useState(0);

    const [, startTransition] = useTransition();

    const handleRefresh = () => {
        startTransition(() => {
            // setRefreshKey(Date.now());
            setRefreshKey(prevKey => prevKey + 1)
        });
    };

    const fetchPage = useCallback(
        async (page: number, limit: number) => {
            const { facilities } = await getFacilitiesByOrgId(org.id, page, limit);
            return facilities;
        },
        [org.id, refreshKey] // ✅ depend on refreshKey so fetches fresh data
    );

    return (
        <InfiniteScrollContainer<Facility>
            className="m-4"
            initialItems={initialFacilities}
            total={totalFacilities}
            initialPage={1}
            limit={7}
            refreshKey={refreshKey}
            fetchPage={fetchPage}
            renderFirstItem={() => <AddFacilityCard onAddSuccess={handleRefresh} organizationId={org.id} />}
            renderItem={(facility,i) => <FacilityCard key={i} facility={facility} />}
            firstItem={true}
            renderSkeleton={(i) => <OrgAndFacCardSkeleton key={i} />}
        />
    );
}

