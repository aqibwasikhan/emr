// 'use client';

// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/button';
// import { RightArrowIcon } from '@/icons';
// import { Form } from '@/components/ui/form';
// import { SectionConfig } from '@/types/forms';
// import { generateSchema } from '@/lib/forms/generateSchema';
// import DynamicFormSections from '@/components/dynamic-forms/dynamic-form-sections';
// import { useUserFormStore } from '@/stores/userFormStore';
// import { useEffect, useRef } from 'react';
// import { useDebouncedCallback } from '@/hooks/use-debounced-callback';

// export default function AddUserForm({
//   config,
//   onNextStep,
// }: {
//   config: SectionConfig[];
//   onNextStep: () => void;
// }) {
//   const { setUserData, userData, hasHydrated } = useUserFormStore();
//   const schema = generateSchema(config);

//   const methods = useForm({
//     resolver: zodResolver(schema),
//     defaultValues: {}, // empty by default
//     mode: 'onChange',
//     shouldFocusError: true,
//   });

//   const { watch, handleSubmit, reset } = methods;

//   const debouncedSetUserData = useDebouncedCallback((data: any) => {
//     setUserData(data);
//   }, 300);

//   // 🔁 After hydration + userData exists → reset form
//   const hasInitialized = useRef(false);
//   useEffect(() => {
//     if (hasHydrated && userData && !hasInitialized.current) {
//       console.log('Resetting form with userData:', userData);
//       reset(userData);
//       hasInitialized.current = true;
//     }
//   }, [hasHydrated, userData, reset]);

//   useEffect(() => {
//     const subscription = watch((value) => {
//       console.log('Form data changed:', value);
//       debouncedSetUserData(value);
//     });
//     return () => subscription.unsubscribe();
//   }, [watch, debouncedSetUserData]);

//   const onSubmit = async () => {
//     onNextStep();
//   };

//   if (!hasHydrated) {
//     return <div className="p-4 text-sm text-muted-foreground">Loading form...</div>;
//   }

//   return (
//     <Form {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)} className="px-1 space-y-4 pb-12">
//         <DynamicFormSections config={config} />
//         <div className="page-container-footer">
//           <Button variant="primary" size="lg" className="text-xs md:text-sm px-5!" type="submit">
//             <RightArrowIcon />
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// }
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { RightArrowIcon } from '@/icons';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { SectionConfig } from '@/types/forms';
import { generateSchema } from '@/lib/utils/forms/generateSchema';
import { cn } from '@/lib/utils';
import DynamicFormSections from '@/components/dynamic-forms/dynamic-form-sections';
import { useUserFormStore } from '@/stores/userFormStore';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback'; // <-- your custom hook
import { toast } from 'sonner';
import { setApiErrors } from '@/lib/utils/forms/setApiErrors';
import { addUser } from '@/app/actions/user-management';

export default function AddUserForm({
  config,
  onNextStep,
}: {
  config: SectionConfig[];
  onNextStep: () => void;
}) {
  const router = useRouter();
  const { setUserData, clearUserData, setUserId, userData } = useUserFormStore();

  const [loading, setloading] = useState(false)

  const schema = generateSchema(config);

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: userData || {},
    mode: 'onChange',
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
    setloading(true)

    const result = await addUser(data);
    if (!result.success) {
      setApiErrors(result.errors, methods.setError);
      toast.error(result.message || 'Failed to create user');
      setloading(false);
      return;
    }

    // ✅ Store userId and clear form data
    setUserId(result.data?.id);
    clearUserData();

    toast.success(result.message || 'User created successfully');
    onNextStep();

  };


  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="px-1 space-y-4 pb-12">
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
