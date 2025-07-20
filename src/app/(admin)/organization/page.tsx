import PageContainer from '@/components/layout/page-container';
import { SearchHeader } from '@/components/shared/search-header';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import OrganizationListingPage from '@/features/organization/org-listing';
import { OrgAndFacCardSkeleton } from '@/features/organization/components/OrgAndFacCardSkeleton';
import { searchParamsCache } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import { IconPlus } from '@tabler/icons-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'EMR: Organizations',
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  // Allow nested RSCs to access the search params (in a type-safe way)
  searchParamsCache.parse(searchParams);

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer scrollable={false} className='relative'>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <Heading
            title='Organizations'
            description='Centralized directory of healthcare organizations'
          />
          <div className='w-1/4 2xl:w-1/5 max-w-96'>
            
           <SearchHeader placeholder="Searchs by name or address" isPage={true} />
          </div>

        </div>
        <Separator />
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <OrgAndFacCardSkeleton key={i} />
              ))}
            </div>
          }
        >

          <OrganizationListingPage />
        </Suspense>
        <div className="page-container-footer">

          <Link
            href="/organization/add"
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'text-xs md:text-sm px-5!')}
          >
            <IconPlus />
          </Link>
        </div>
      </div>
    </PageContainer>


  );
}
