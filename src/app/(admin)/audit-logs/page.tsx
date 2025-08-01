import { getAllLookupOrganization, getAllLookupRoles } from '@/app/actions/lookups';
import PageContainer from '@/components/layout/page-container';
import { SearchHeader } from '@/components/shared/search-header';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSimpleSelect } from '@/components/ui/table/data-table-simple-select';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { UserStatus } from '@/enums/users';
import LogsListingPage from '@/features/audit-logs/logs-listing';
import { searchParamsCache } from '@/lib/searchparams';
import { cn, normalizeSelectOptions } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Audit Logs',
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);
  const roleRaw = await getAllLookupRoles(); // Assuming this function fetches the roles from an API or a static list
  const organizationRaw = await getAllLookupOrganization(); // Assuming this function fetches the roles from an API or a static list
  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });
  const statusOptions = Object.values(UserStatus).map((status) => ({
    label: status,
    value: status
  }));

  const roleOptions = normalizeSelectOptions(roleRaw, {
    labelKey: 'name',
    valueKey: 'id',
    convertValueToString: true
  });
  const orgainzationOptions = normalizeSelectOptions(organizationRaw, {
    labelKey: 'name',
    valueKey: 'id',
    convertValueToString: true
  });

  return (
    <PageContainer scrollable={false} className='relative'>
      <div className='flex flex-1 flex-col space-y-4 pb-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Audit Logs'
            description='Track user actions across the system for accountability and compliance.'
          />
          <div className='w-1/4 2xl:w-1/5 max-w-96'>

            <SearchHeader placeholder="Searchs by user, Time etc.." />
          </div>
        </div>
        <Separator />
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium'>
            Filter By
          </span>
          <DataTableSimpleSelect
            title="Activity"
            queryKey="status"
            options={statusOptions}
          />
          <DataTableSimpleSelect
            title="Facility"
            queryKey="organization"
            options={orgainzationOptions}
          />
          <DataTableSimpleSelect
            title="Role"
            queryKey="role"
            options={roleOptions}
          />
          
        </div>
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >

          <LogsListingPage />
        </Suspense>

        
      </div>
    </PageContainer>
  );
}
