
'use client';

import { getOrganizations } from '@/app/actions/organization';
import { OrganizationCard } from './org-card';
import { OrgAndFacCardSkeleton } from './OrgAndFacCardSkeleton';
import { InfiniteScrollContainer } from '@/components/shared/infinite-scroll-container';
import { Organization } from '@/types/organization';

export function OrganizationScrollClient({
  initialItems,
  total,
  initialPage,
  limit,
  search
}: {
  initialItems: Organization[];
  total: number;
  initialPage: number;
  limit: number;
  search?: string;
}) {
  return (
    <InfiniteScrollContainer<Organization>
      initialItems={initialItems}
      total={total}
      initialPage={initialPage}
      limit={limit}
      filters={{ search }}
      fetchPage={async (page, limit) => {

        const { organizations } = await getOrganizations({ page, limit, search });
        return organizations;

      }}
      renderItem={(org) => <OrganizationCard key={org.id} organization={org} />}
      renderSkeleton={(i) => <OrgAndFacCardSkeleton key={i} />}
    />
  );
}

