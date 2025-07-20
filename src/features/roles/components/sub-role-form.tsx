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

export default function SubRoleForm({
  config,
  baseInitialValues,
}: {
  config: SectionConfig[];
  baseInitialValues: Record<string, any>;

}) {
  const router = useRouter();
  const [modulesData, setModulesData] = useState<any[]>(baseInitialValues.modules || []);
  const [selectedPermissions, setSelectedPermissions] = useState<Record<number, Record<number, Set<number>>>>({});
  const [initialized, setInitialized] = useState(false);

  const initialModuleIds = baseInitialValues.modules?.map((m: any) => m.id) || [];

  const processedConfig: SectionConfig[] = config.map((section) => {
    return {
      ...section,
      formFields: section.formFields.map((field) => {
        if (field.name === 'module' && Array.isArray(field.options)) {
          const updatedOptions = field.options.map((option) => ({
            ...option,
            disable: !initialModuleIds.includes(option.value),
          }));
          return { ...field, options: updatedOptions };
        }
        return field;
      }),
    };
  });

  const schema = generateSchema(processedConfig);
  const methods = useForm<RoleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      module: initialModuleIds,
    },
    mode: 'onSubmit',
    shouldFocusError: true,
  });

  const selectedModules = methods.watch('module');

  useEffect(() => {
    if (!initialized) {
      const initialPerms: Record<number, Record<number, Set<number>>> = {};
      baseInitialValues.modules?.forEach((mod: any) => {
        mod.resources?.forEach((res: any) => {
          res.permissions?.forEach((perm: any) => {
            if (perm.isAssigned) {
              if (!initialPerms[mod.id]) initialPerms[mod.id] = {};
              if (!initialPerms[mod.id][res.id]) initialPerms[mod.id][res.id] = new Set();
              initialPerms[mod.id][res.id].add(perm.id);
            }
          });
        });
      });
      setSelectedPermissions(initialPerms);
      setInitialized(true);
      return;
    }

    const currentIds = modulesData.map((m) => m.id);
    const newIds = (selectedModules ?? []).filter((id: number) => !currentIds.includes(id));
    const removedIds = currentIds.filter((id: number) => !selectedModules?.includes(id));

    if (newIds.length === 0 && removedIds.length === 0) return;

    const fetchModules = async () => {
      try {
        const fetched = await Promise.all(
          newIds.map((id) => getModuleById(id, baseInitialValues.id))
        );

        const assignedPerms: Record<number, Record<number, Set<number>>> = {};
        for (const mod of fetched) {
          mod.resources?.forEach((res: any) => {
            const assigned = res.permissions?.filter((p: any) => p.isAssigned) || [];
            if (assigned.length > 0) {
              if (!assignedPerms[mod.id]) assignedPerms[mod.id] = {};
              assignedPerms[mod.id][res.id] = new Set(assigned.map((p: any) => p.id));
            }
          });
        }

        setModulesData((prev) => [...prev.filter((m) => !removedIds.includes(m.id)), ...fetched]);

        setSelectedPermissions((prev) => {
          const updated = { ...prev };
          removedIds.forEach((id) => delete updated[id]);
          for (const modId in assignedPerms) {
            if (!updated[modId]) updated[modId] = {};
            for (const resId in assignedPerms[modId]) {
              updated[modId][+resId] = assignedPerms[modId][+resId];
            }
          }
          return updated;
        });
      } catch (err: any) {
        toast.error(err.message || 'Failed to load module permissions');
      }
    };

    fetchModules();
  }, [selectedModules, initialized, baseInitialValues.modules, modulesData]);

  const togglePermission = (
    modId: number,
    resId: number,
    permId: number,
    checked: boolean
  ) => {
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

    const payload = {
      ...rest,
      submission,
      baseRoleId: baseInitialValues.id,
      isBaseRole: false,
    };

    const result = await addRole(payload);

    if (!result.success) {
      setApiErrors(result.errors, methods.setError);
      toast.error(result.message || 'Failed to create sub-role');
      return;
    }

    toast.success(result.message || 'Sub-role created successfully');
    router.push('/roles');
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="px-1 space-y-4 pb-12">
        <DynamicFormSections config={processedConfig} />

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
          <Button variant="primary" size="lg" type="submit" className="text-xs md:text-sm px-5!">
            <Check />
          </Button>
        </div>
      </form>
    </Form>
  );
}
