import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { CommonSkeleton } from '@/components/shared/common-skeleton';
import { getForms } from '@/app/actions/forms';
import { Heading } from '@/components/ui/heading';
import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';
import { OrgIcon } from '@/icons';
import RolesEditForm from '@/features/roles/components/roles-edit-form';
import { getRoleById, getSubRoles } from '@/app/actions/roles';
import SubRoleForm from '@/features/roles/components/sub-role-form';
import { SubRoleSwitchBar } from '@/features/roles/components/sub-role-switch-bar';

export const metadata = {
    title: 'EMR: Add Sub Role'
};

export default async function Page({ params, searchParams: sp }: { params: Promise<{ id: number }>; searchParams: Promise<{ roleId?: string }>; }) {
    const { id } = await params;
    const searchParams = await sp;
    const roleId = searchParams.roleId ? parseInt(searchParams.roleId) : undefined;

    const { config } = await getForms({ param: 'model=Role' });
    const data = await getRoleById(id);
    const { data: subRoles } = await getSubRoles({ baseRoleId: id ?? undefined });


    return (
        <PageContainer scrollable={false} className='relative h-[calc(100dvh-119px)]'>
            <div className="flex flex-1 flex-col space-y-4 overflow-auto no-scrollbar">
                <div className="flex items-start flex-col gap-2">
                    <Heading title={roleId ? 'Edit Sub Role' : 'Add  Sub Role'} />
                    <CustomBreadcrumbs
                        items={[
                            { label: 'Roles', href: '/roles', icon: <OrgIcon className="h-5 w-5" /> },
                            { label:  roleId ? 'Edit Sub Role' : 'Add New Sub Role', active: true }
                        ]}
                    />
                </div>
                <Separator />
                {/* {data &&
                    <SubRoleForm config={config} baseInitialValues={data}  />
                } */}
                <SubRoleSwitchBar subRoles={subRoles} config={config} baseInitialValues={data} />

            </div>
        </PageContainer>
    )

}
