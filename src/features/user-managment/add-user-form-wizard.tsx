
'use client';

import { useEffect, useState } from 'react';
import AddUserForm from './components/add-user-form';
import AssignFacilityForm from './components/assign-facility-form';
import { SectionConfig } from '@/types/forms';
import { Stepper } from '@/components/ui/stepper/stepper';
import { Separator } from '@/components/ui/separator';
import { useUserFormStore } from '@/stores/userFormStore';
import { disableFieldsInConfig } from '@/lib/utils/forms/forms';

type AddUserFormWizardProps = {
  config: SectionConfig[];
  isEdit?: boolean;
  initialData?: any;
  id?: number;
};
export function transformUserFormData(initialData: any) {
  if (!initialData) return null;

  return {
    ...initialData,
    organizationId: initialData.organization?.id ?? null,
    organizationName: initialData.organization?.name ?? '',
    employmentType: initialData.employmentType?.id ?? null,
  };
}
export default function AddUserFormWizard({
  config,
  isEdit = false,
  initialData,
  id
}: AddUserFormWizardProps) {
  const [step, setStep] = useState(0);

  const {
    setUserData,
    setUserId,
    setOrgId,
    setUserFacilities,
    reset,
  } = useUserFormStore();

  useEffect(() => {
    if (isEdit && initialData) {
      // Also store in Zustand for step 2
      setUserData(transformUserFormData(initialData));
      setUserId(id);
      setOrgId(initialData?.organization?.id ?? null);
      setUserFacilities(initialData?.facilities || []);
      return () => reset();
    }
  }, [isEdit, initialData]);
  
  const updatedConfig = isEdit ? disableFieldsInConfig(config, ['organizationId','email']) : config;

  const steps = [
    { key: 'user', label: 'Personal Details' },
    { key: 'facility', label: 'Assign Facility & Roles' },
  ];

  return (
    <div className="space-y-4">
      <Stepper
        steps={steps}
        activeStep={step}
        onStepClick={(index) => {
          // Allow only backward navigation if needed:
          if (isEdit && index < step) {
            setStep(index);
          }
          // setStep(index);
        }}
      />
      <Separator className="my-4 seprater-dashed " />

      {step === 0 && (
        <AddUserForm
          config={updatedConfig}
          onNextStep={() => setStep(1)}
          isEdit={isEdit}
          initialData={transformUserFormData(initialData)} // ✅ Pass transformed data directly
        />
      )}

      {step === 1 && (
        <AssignFacilityForm
          isEdit={isEdit}
          onPrevStep={() => setStep(0)}
        />
      )}
    </div>
  );
}
