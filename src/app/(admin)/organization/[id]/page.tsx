import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import OrganizationDetailPage from '@/features/organization/organization-detail-page';
import { CommonSkeleton } from '@/components/shared/common-skeleton';

export const metadata = {
    title: 'EMR: Organization Detail'
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <PageContainer scrollable={false} className="relative">

            <Suspense fallback={
                <div className='flex flex-1 flex-col space-y-4'>
                    <CommonSkeleton lines={3} withAvatar />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => (
                            <CommonSkeleton key={i} lines={3} withAvatar />
                        ))}
                    </div>
                </div>
            }>
                <OrganizationDetailPage id={id} />
            </Suspense>


        </PageContainer>
    );
}
