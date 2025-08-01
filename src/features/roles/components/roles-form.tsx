'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button, buttonVariants } from '@/components/ui/button';
import { Check, ChevronLeft } from 'lucide-react';

import { Form } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { generateSchema } from '@/lib/utils/forms/generateSchema';
import { setApiErrors } from '@/lib/utils/forms/setApiErrors';
import DynamicFormSections from '@/components/dynamic-forms/dynamic-form-sections';
import { addRole, getModuleById } from '@/app/actions/roles';
import { SectionConfig } from '@/types/forms';
import AssignPermissions from './assign-permissions';

export type RoleFormValues = {
  module: number[];
  [key: string]: any;
};

export default function RolesForm({ config }: { config: SectionConfig[] }) {
  const router = useRouter();
  const [modulesData, setModulesData] = useState<any[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<Record<number, Record<number, Set<number>>>>({});
  const [loading, setloading] = useState(false)

  const schema = generateSchema(config);
  const methods = useForm<RoleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { module: [] },
    mode: 'onSubmit',
    shouldFocusError: true,
  });

  const selectedModules = methods.watch('module');

  useEffect(() => {
    console.log('Selected modules:', selectedModules);
    console.log('Selected permisoon:', selectedPermissions);
    const currentIds = modulesData.map((m) => m.id);
    const newIds = (selectedModules ?? []).filter((id: number) => !currentIds.includes(id));
    const removedIds = currentIds.filter((id: number) => !selectedModules?.includes(id));

    const fetchModules = async () => {
      try {
        const fetched = await Promise.all(newIds.map(getModuleById));
        setModulesData((prev) => [...prev.filter((m) => !removedIds.includes(m.id)), ...fetched]);

        setSelectedPermissions((prev) => {
          const updated = { ...prev };
          removedIds.forEach((id) => delete updated[id]);
          return updated;
        });
      } catch (err: any) {
        toast.error(err.message || 'Failed to load module permissions');
      }
    };

    if (newIds.length || removedIds.length) fetchModules();
  }, [selectedModules]);

  const togglePermission = (modId: number, resId: number, permId: number, checked: boolean) => {
    setSelectedPermissions((prev) => {
      const updated = { ...prev };
      const resourceSet = new Set(prev[modId]?.[resId] || []);
      checked ? resourceSet.add(permId) : resourceSet.delete(permId);

      return {
        ...updated,
        [modId]: {
          ...updated[modId],
          [resId]: resourceSet,
        },
      };
    });
  };

  const onSubmit = async (formData: any) => {
    const { module, ...rest } = formData;
    const submission = modulesData.flatMap((mod) =>
      mod.resources
        .filter((res: any) => selectedPermissions[mod.id]?.[res.id]?.size)
        .map((res: any) => ({
          moduleId: mod.id,
          resourceId: res.id,
          permissions: Array.from(selectedPermissions[mod.id][res.id]),
        }))
    );
    setloading(true);

    const result = await addRole({ ...rest, submission });
    if (!result.success) {
      setApiErrors(result.errors, methods.setError);
      toast.error(result.message || 'Failed to create role');
      setloading(false);
      return;
    }

    toast.success(result.message || 'Role created successfully');
    router.push('/roles');
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="px-1 space-y-4 pb-12">
        <DynamicFormSections config={config} />

        {modulesData.length > 0 && (
          <AssignPermissions
            modules={modulesData}
            selectedPermissions={selectedPermissions}
            onPermissionToggle={togglePermission}
          />
        )}

        <div className="page-container-footer">
          <Link
            href="/roles"

            className={cn(buttonVariants({ variant: 'tertiary', size: 'lg' }), 'text-xs md:text-sm px-5!')}
          >
            <ChevronLeft /> Back
          </Link>
          <Button disabled={loading} variant="primary" size="lg" type="submit" className="text-xs md:text-sm px-5!">
            <Check />
          </Button>
        </div>
      </form>
    </Form>
  );
}
