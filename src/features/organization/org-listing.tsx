import { searchParamsCache } from '@/lib/searchparams';
import { OrganizationScrollClient } from './components/OrganizationScrollClient';
import { getOrganizations } from '@/app/actions/organization';

export default async function OrganizationListingPage() {
  const page = 1;
  const limit = 12;
 const search = searchParamsCache.get('search');
    const { organizations, total } = await getOrganizations({ page, limit, search });

  return (
    <div className='relative h-full'>
      <OrganizationScrollClient
      initialItems={organizations}
      total={total}
      initialPage={page}
      limit={limit}
      search={search ?? undefined}
    />
    </div>
  );
}

