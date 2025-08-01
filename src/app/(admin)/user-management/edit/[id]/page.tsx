import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { CommonSkeleton } from '@/components/shared/common-skeleton';
import EditOrganizationForm from '@/features/organization/components/edit-organization-form';
import { getForms } from '@/app/actions/forms';
import { getOrganizationById } from '@/app/actions/organization';
import { Heading } from '@/components/ui/heading';
import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';
import { OrgIcon, UserSettingIcon } from '@/icons';
import AddUserFormWizard from '@/features/user-managment/add-user-form-wizard';
import { getUserById } from '@/app/actions/user-management';

export const metadata = {
    title: 'Edit User'
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const { config } = await getForms({ param: 'model=User' });
    const data = await getUserById(Number(id));

    return (
        <PageContainer scrollable={false} className="relative h-[calc(100dvh-119px)]">
            <div className="flex flex-1 flex-col space-y-4 overflow-auto no-scrollbar">
                <div className="flex items-start flex-col gap-2">
                    <Heading title="Edit User" />
                    <CustomBreadcrumbs
                        items={[
                            {
                                label: 'User Management',
                                href: '/user-management',
                                icon: <UserSettingIcon className="h-5 w-5" />,
                            },
                            { label: 'Edit User', active: true },
                        ]}
                    />
                </div>
                <Separator />
                {data.data &&
                    <AddUserFormWizard isEdit initialData={data.data} config={config} id={Number(id)} />
                }
            </div>
        </PageContainer>
    )

}
