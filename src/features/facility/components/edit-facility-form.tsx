'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from 'sonner';
import Link from 'next/link';
import { Check, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { SectionConfig } from '@/types/forms';
import { cn } from '@/lib/utils';
import { generateSchema } from '@/lib/utils/forms/generateSchema';
import DynamicFormSections from '@/components/dynamic-forms/dynamic-form-sections';
import { updateFacility } from '@/app/actions/facility';
import { setApiErrors } from '@/lib/utils/forms/setApiErrors';
import { useState } from 'react';
import { disableFieldsInConfig, omitKeys } from '@/lib/utils/forms/forms';

export default function EditFacilityForm({
  config,
  initialValues,
  id,
}: {
  config: SectionConfig[];
  initialValues: Record<string, any>;
  id: number;
}) {
  const router = useRouter();
  const updatedConfig = disableFieldsInConfig(config, ['organizationId']);
  const schema = generateSchema(updatedConfig);

  const [loading, setloading] = useState(false)
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  const onSubmit = async (data: any) => {
    setloading(true)
     const payload = omitKeys(data, ['organizationId'])
    const result = await updateFacility(id, payload);
    if (!result.success) {
      // Set API errors into form state
      setApiErrors(result.errors, methods.setError);
      setloading(false)
      toast.error(result.message || 'Failed to update organization');
      return;
    }

    toast.success(result.message || 'Organization updated successfully');
    router.push(`/organization/${initialValues?.organizationId}`);

  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="px-1 space-y-4 pb-12">
        <DynamicFormSections config={updatedConfig} />

        <div className="page-container-footer">
          <Link href={`/organization/${initialValues?.organizationId}`} className={cn(buttonVariants({ variant: 'tertiary', size: 'lg' }), 'text-xs md:text-sm px-5!')}>
            <ChevronLeft /> Back
          </Link>
          <Button disabled={loading} variant="primary" size="lg" className="text-xs md:text-sm px-5!" type="submit">
            <Check />
          </Button>
        </div>
      </form>
    </Form>
  );
}
