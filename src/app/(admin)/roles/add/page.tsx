// import PageContainer from '@/components/layout/page-container';
// import { Separator } from '@/components/ui/separator';
// import { Heading } from '@/components/ui/heading';
// import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';
// import { OrgIcon } from '@/icons';
// import { getForms } from '@/app/actions/forms';
// import RolesForm from '@/features/roles/components/roles-form';

// export const metadata = {
//   title: 'EMR: Role Management',
// };


// export default async function Page() {
//   const { config } = await getForms({ param: 'model=Role' });

//   return (
//     <PageContainer scrollable={false} className='relative h-[calc(100dvh-119px)]'>
//       <div className="flex flex-1 flex-col space-y-4 overflow-auto no-scrollbar">
//         <div className="flex items-start flex-col gap-2">
//           <Heading title="Add Role" />
//           <CustomBreadcrumbs
//             items={[
//               { label: 'Role Management', href: '/roles', icon: <OrgIcon className="h-5 w-5" /> },
//               { label: 'Add New Role', active: true }
//             ]}
//           />
//         </div>
//         <Separator />
//         <RolesForm config={config} />
//       </div>
//     </PageContainer>
//   );
// }
import PageContainer from '@/components/layout/page-container';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import { CustomBreadcrumbs } from '@/components/ui/custom/CustomBreadcrumbs';
import { OrgIcon } from '@/icons';
import { getForms } from '@/app/actions/forms';
import { RoleSwitchBar } from '@/features/roles/components/role-switch-bar';
import { getAllLookupBaseRoles } from '@/app/actions/lookups';
export const metadata = {
  title: 'EMR: Role Management',
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ roleId?: string }>;
}) {
  const { roleId: rId } = await searchParams;
  const roleId = rId ? parseInt(rId) : undefined;

  const { config } = await getForms({ param: 'model=Role' });
  const { data: baseRoles } = await getAllLookupBaseRoles();
  return (
    <PageContainer scrollable={false} className="relative h-[calc(100dvh-119px)]">
      <div className="flex flex-col space-y-4 overflow-auto no-scrollbar">
        <div className="flex flex-col gap-2">
          <Heading title={roleId ? 'Edit Role' : 'Add Role'} />
          <CustomBreadcrumbs
            items={[
              { label: 'Role Management', href: '/roles', icon: <OrgIcon className="h-5 w-5" /> },
              { label: roleId ? 'Edit Role' : 'Add New Role', active: true }
            ]}
          />
        </div>

        <RoleSwitchBar baseRoles={baseRoles} config={config} />

      </div>
    </PageContainer>
  );
}
