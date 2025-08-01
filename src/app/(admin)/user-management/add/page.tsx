import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';
import { UserSettingIcon } from '@/icons';
// import { Suspense } from 'react';
// import AddOrganizationForm from '@/features/organization/components/add-organization-form';
// import { CommonSkeleton } from '@/components/shared/common-skeleton';
import { getForms } from '@/app/actions/forms';
// import AddUserForm from '@/features/user-managment/components/add-user-form';
import AddUserFormWizard from '@/features/user-managment/add-user-form-wizard';

export const metadata = {
  title: 'Add User'
};
export const dynamic = 'force-dynamic';

export default async function Page() {
  const { config } = await getForms({ param: 'model=User' });

  return (
    <PageContainer scrollable={false} className="relative h-[calc(100dvh-119px)]">
      <div className="flex flex-1 flex-col space-y-4 overflow-auto no-scrollbar">
        <div className="flex items-start flex-col gap-2">
          <Heading title="Add New User" />
          <CustomBreadcrumbs
            items={[
              {
                label: 'User Management',
                href: '/user-management',
                icon: <UserSettingIcon className="h-5 w-5" />,
              },
              { label: 'Add New User', active: true },
            ]}
          />
        </div>
      <Separator  />

        <AddUserFormWizard config={config} />
      </div>
    </PageContainer>
  );
}