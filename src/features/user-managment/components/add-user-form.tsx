'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RightArrowIcon } from '@/icons';
import { Form } from '@/components/ui/form';
import { SectionConfig } from '@/types/forms';
import { generateSchema } from '@/lib/utils/forms/generateSchema';
import DynamicFormSections from '@/components/dynamic-forms/dynamic-form-sections';
import { useUserFormStore } from '@/stores/userFormStore';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback'; // <-- your custom hook
import { toast } from 'sonner';
import { setApiErrors } from '@/lib/utils/forms/setApiErrors';
import { addUser, updateUser } from '@/app/actions/user-management';
import { omitKeys } from '@/lib/utils/forms/forms';

export default function AddUserForm({
  config,
  onNextStep,
  isEdit = false,
  initialData,
}: {
  config: SectionConfig[];
  onNextStep: () => void;
  isEdit?: boolean;
  initialData?: any;
}) {
  const { setUserData, clearUserData, setUserId, setOrgId, userData, userId } = useUserFormStore();


  const [loading, setloading] = useState(false)

  const schema = generateSchema(config);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: userData || initialData || { isAuthenticatorMfa: false },
    shouldFocusError: true,
  });
  const { watch, handleSubmit } = methods;

  // Use your custom debounced callback
  const debouncedSetUserData = useDebouncedCallback((data: any) => {
    setUserData(data);
  }, 300);

  // Watch and trigger debounced setter
  useEffect(() => {
    const subscription = watch((value) => {
      debouncedSetUserData(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, debouncedSetUserData]);


  const onSubmit = async (data: any) => {
    
    setloading(true);
    const payload = isEdit
      ? omitKeys(data, ['email', 'organizationId'])
      : data;

    const result = isEdit
      ? await updateUser(userId, payload)
      : await addUser(payload);

    if (!result.success) {
      setApiErrors(result.errors, methods.setError);
      toast.error(result.message || 'Failed to save user');
      setloading(false);
      return;
    }

    if (isEdit) {
      setUserData(result.data);
      setOrgId(result.data?.organizationId ?? null);

      toast.success(result.message || 'User updated successfully');
    } else {
      setUserId(result.data?.id);
      setOrgId(result.data?.organizationId ?? null);
      clearUserData();
      toast.success(result.message || 'User created successfully');
    }

    setloading(false);
    onNextStep();
  };


  return (
    <Form {...methods} >
      <form onSubmit={handleSubmit(onSubmit)} className="px-1 space-y-4 pb-12" noValidate>
        <DynamicFormSections config={config} />
        <div className="page-container-footer">
          <Button variant="primary" disabled={loading} size="lg" className="text-xs md:text-sm px-5!" type="submit">
            <RightArrowIcon />
          </Button>
        </div>
      </form>
    </Form>
  );
}
