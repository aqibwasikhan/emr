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
import { updateOrganization } from '@/app/actions/organization'; // You must create this action
import DynamicFormSections from '@/components/dynamic-forms/dynamic-form-sections';
import { setApiErrors } from '../../../lib/utils/forms/setApiErrors';

export default function EditOrganizationForm({
  config,
  initialValues,
  orgId,
}: {
  config: SectionConfig[];
  initialValues: Record<string, any>;
  orgId: number;
}) {
  const router = useRouter();
  const schema = generateSchema(config);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });
  const onSubmit = async (data: any) => {
    const result = await updateOrganization(orgId, data);

    if (!result.success) {
      setApiErrors(result.errors, methods.setError);
      toast.error(result.message || 'Failed to update organization');
      return;
    }

    toast.success(result.message || 'Organization updated successfully');
    router.push(`/organization/${orgId}`);
  };

  return (
    <Form {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="px-1 space-y-4 pb-12">
        <DynamicFormSections config={config} />

        <div className="page-container-footer">
          <Link href={`/organization/${orgId}`} className={cn(buttonVariants({ variant: 'tertiary', size: 'lg' }), 'text-xs md:text-sm px-5!')}>
            <ChevronLeft /> Back
          </Link>
          <Button variant="primary" size="lg" className="text-xs md:text-sm px-5!" type="submit">
            <Check />
          </Button>
        </div>
      </form>
    </Form>
  );
}
