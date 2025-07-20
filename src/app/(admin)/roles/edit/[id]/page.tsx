import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { CommonSkeleton } from '@/components/shared/common-skeleton';
import { getForms } from '@/app/actions/forms';
import { Heading } from '@/components/ui/heading';
import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';
import { OrgIcon } from '@/icons';
import RolesEditForm from '@/features/roles/components/roles-edit-form';
import { getRoleById } from '@/app/actions/roles';

export const metadata = {
    title: 'EMR: Organization Edit'
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const { config } = await getForms({ param: 'model=Role' });
    const data = await getRoleById(Number(id));
    return (
        <PageContainer scrollable={false} className='relative h-[calc(100dvh-119px)]'>
            <div className="flex flex-1 flex-col space-y-4 overflow-auto no-scrollbar">

                <Suspense fallback={
                    <div className='flex flex-1 flex-col space-y-4'>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => (
                                <CommonSkeleton key={i} lines={3} withAvatar />
                            ))}
                        </div>
                    </div>
                }>
                    <div className="flex items-start flex-col gap-2">
                        <Heading title="Edit Role" />
                        <CustomBreadcrumbs
                            items={[
                                { label: 'Roles', href: '/roles', icon: <OrgIcon className="h-5 w-5" /> },
                                { label: data.name || '',active: true },
                            ]}
                        />
                    </div>

                    <Separator />
                    {data &&
                                <RolesEditForm config={config} initialValues={data} />
                        
                    }
                </Suspense>


            </div>
        </PageContainer>
    )

}
