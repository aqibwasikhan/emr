'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import RolesForm from '@/features/roles/components/roles-form';
import RolesEditForm from '@/features/roles/components/roles-edit-form';
import { getRoleById } from '@/app/actions/roles';
import { Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import SubRoleEditForm from './sub-role-edit-form';
import SubRoleForm from './sub-role-form';
import { DoubleChevronLeftIcon } from '@/icons';

interface Role {
  id: number;
  name: string;
}

interface RoleSwitchBarProps {
  subRoles: Role[];
  config: any;
  baseInitialValues: Record<string, any>;

}

export const SubRoleSwitchBar = ({ subRoles, config, baseInitialValues }: RoleSwitchBarProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedRoleId = searchParams.get('roleId');
  const [activeId, setActiveId] = useState<number | null>(
    selectedRoleId ? parseInt(selectedRoleId) : null
  );

  const [roleData, setRoleData] = useState<any>(null);

  useEffect(() => {
    const fetchRole = async () => {
      if (activeId) {
        const role = await getRoleById(activeId);
        setRoleData(role);
      } else {
        setRoleData(null);
      }
    };
    fetchRole();
  }, [activeId]);
  const MemoizedRolesEditForm = useMemo(() => {
    return <SubRoleEditForm
      config={config}
      initialValues={roleData}
      baseInitialValues={baseInitialValues}
    />;
  }, [activeId, roleData]);
  return (
    <>
      <div className="bg-foreground text-muted-foreground flex rounded-md px-2 py-1 flex-wrap rounded-bl-2xl rounded-br-2xl">
        <button
          className={cn(
            'pl-4 py-2 rounded cursor-pointer transition-all flex items-center gap-2 font-semibold text-white',
          )}
        >
          {/* {activeId === role.id && <div className="w-2 h-2 bg-secondary rounded-full" />} */}
          {baseInitialValues.name}
          <DoubleChevronLeftIcon className='ml-2 text-[var(--pri-dark-5)]'/>
        </button>
        {subRoles.map((role, i) => (
          <div className='flex items-center' key={i}>

            <button
              key={role.id}
              onClick={() => {
                setActiveId(role.id);
                router.replace(`?roleId=${role.id}`);
              }}
              className={cn(
                'px-4 py-2 mx-1 rounded cursor-pointer transition-all flex items-center gap-2',
                activeId === role.id ? 'font-semibold text-white' : 'text-[var(--pri-dark-5)]'
              )}
            >
              {activeId === role.id && <div className="w-2 h-2 bg-secondary rounded-full" />}
              {role.name}
            </button>
            <Separator
              className='bg-[var(--pri-grey-2)] py-2 data-[orientation=vertical]:h-3/4'
              orientation="vertical"
            />
          </div>

        ))}

        <button
          onClick={() => {
            setActiveId(null);
            router.replace(`?roleId=`);
          }}
          className={cn(
            'px-4 py-2 mx-1 rounded cursor-pointer transition-all flex items-center gap-2 ',
            activeId === null ? 'font-semibold text-white' : 'text-[var(--pri-dark-5)]'
          )}
        >
          {activeId === null && <div className="w-2 h-2 bg-secondary rounded-full" />}
          <Plus />
        </button>
      </div>

      {/* Conditional rendering of add/edit form */}
      {roleData ? MemoizedRolesEditForm : <SubRoleForm config={config} baseInitialValues={baseInitialValues} />}

    </>
  );
};
