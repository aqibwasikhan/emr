import PageContainer from '@/components/layout/page-container';
import { SearchHeader } from '@/components/shared/search-header';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import RolesListing from '@/features/roles/roles-listing';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';

export const metadata = {
  title: 'EMR: Roles Management',
  description: 'Define and manage role-based access for EMR'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer scrollable={false} className='relative'>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Roles Management'
            description='Define and manage role-based access for organizations and facilities'
          />
          <div className='w-1/4 2xl:w-1/5 max-w-96'>

            <SearchHeader placeholder="Searchs by Roles or sub-roles" isPage={false}/>
          </div>

        </div>
        <Separator />
        <RolesListing />
        <div className="page-container-footer">

          <Link
            href="/roles/add"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'text-xs md:text-sm px-5!')}
          >
            <IconPlus />
          </Link>
        </div>
      </div>
    </PageContainer>


  );
}
