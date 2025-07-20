import { getAllLookupOrganization, getAllLookupRoles } from '@/app/actions/lookups';
import PageContainer from '@/components/layout/page-container';
import { SearchHeader } from '@/components/shared/search-header';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { DataTableSimpleSelect } from '@/components/ui/table/data-table-simple-select';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import { UserStatus } from '@/enums/users';
import UserListingPage from '@/features/user-managment/user-listing';
import { searchParamsCache } from '@/lib/searchparams';
import { cn, normalizeSelectOptions } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'EMR: Users',
  description: 'Manage users for organizations and facilities'
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
      <div className='flex flex-1 flex-col space-y-4 pb-10'>
        <div className='flex items-start justify-between'>
          <Heading
            title='All Users'
            description='Create, edit, and manage users for organizations and facilities'
          />
          <div className='w-1/4 2xl:w-1/5 max-w-96'>

            <SearchHeader placeholder="Searchs by name or email" />
          </div>
        </div>
        <Separator />
        <div className='flex items-center gap-2'>
          <span className='text-sm font-medium'>
            Filter By
          </span>
          <DataTableSimpleSelect
            title="Organization"
            queryKey="organization"
            options={orgainzationOptions}
          />
          <DataTableSimpleSelect
            title="Role"
            queryKey="role"
            options={roleOptions}
          />
          <DataTableSimpleSelect
            title="Status"
            queryKey="status"
            options={statusOptions}
          />
        </div>
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >

          <UserListingPage />
        </Suspense>

        <div className="page-container-footer">

          <Link
            href="/user-management/add"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'text-xs md:text-sm px-5!')}
          >
            <IconPlus />
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
