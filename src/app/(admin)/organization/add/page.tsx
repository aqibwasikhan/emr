import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';
// import { OrganizationCardSkeleton } from '@/features/organization/components/OrgAndFacCardSkeleton';
import { OrgIcon } from '@/icons';
import { Suspense } from 'react';
import AddOrganizationForm from '@/features/organization/components/add-organization-form';
import { CommonSkeleton } from '@/components/shared/common-skeleton';
import { getForms } from '@/app/actions/forms';

export const metadata = {
  title: 'EMR: Add Organization'
};
export const dynamic = 'force-dynamic';

export default async function Page() {
  const { config } = await getForms({ param: 'model=Organization' });

  return (
    <PageContainer scrollable={false} className='relative h-[calc(100dvh-119px)]'>
      <div className="flex flex-1 flex-col space-y-4 overflow-auto no-scrollbar">
        <div className="flex items-start flex-col gap-2">
          <Heading title="Add Organizations" />
          <CustomBreadcrumbs
            items={[
              { label: 'Organizations', href: '/organization?page=1', icon: <OrgIcon className="h-5 w-5" /> },
              { label: 'Add New Organization', active: true }
            ]}
          />
        </div>

        <Separator />


        <Suspense fallback={
          <div className='flex flex-1 flex-col space-y-4'>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <CommonSkeleton key={i} lines={3} withAvatar />
              ))}
            </div>
          </div>
        }>
          <AddOrganizationForm config={config} />
        </Suspense>


      </div>
    </PageContainer>
  );
}
