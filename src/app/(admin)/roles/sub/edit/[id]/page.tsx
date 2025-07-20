import { redirect } from 'next/navigation';
import { getForms } from '@/app/actions/forms';
import { getRoleById } from '@/app/actions/roles';
import SubRoleEditForm from '@/features/roles/components/sub-role-edit-form';
import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';
import { OrgIcon } from '@/icons';

export const metadata = {
  title: 'EMR: Edit Sub Role',
};

export default async function Page({
  params,
  searchParams: sp,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ subRoleId?: string }>;
}) {
  const { id } = await params;
  const searchParams = await sp;
  const subRoleId = searchParams.subRoleId ? parseInt(searchParams.subRoleId) : undefined;

  if (!subRoleId) {
    redirect('/roles'); // or show a fallback UI
  }

  const { config } = await getForms({ param: 'model=Role' });
  const data = await getRoleById(subRoleId);
  const baseData = await getRoleById(Number(id));

  return (
    <PageContainer scrollable={false} className="relative h-[calc(100dvh-119px)]">
      <div className="flex flex-1 flex-col space-y-4 overflow-auto no-scrollbar">
        <div className="flex items-start flex-col gap-2">
          <Heading title="Edit Sub Role" />
          <CustomBreadcrumbs
            items={[
              { label: 'Roles', href: '/roles', icon: <OrgIcon className="h-5 w-5" /> },
              { label: data.name, active: true },
            ]}
          />
        </div>
        <Separator />
        {data && (
          <SubRoleEditForm
            config={config}
            initialValues={data}
            baseInitialValues={baseData}
          />
        )}
      </div>
    </PageContainer>
  );
}
