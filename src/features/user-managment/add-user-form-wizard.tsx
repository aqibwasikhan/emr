'use client';

import { useState } from 'react';
import AddUserForm from './components/add-user-form';
import AssignFacilityForm from './components/assign-facility-form';
import { SectionConfig } from '@/types/forms';
import { Stepper } from '@/components/ui/stepper/stepper';
import { Separator } from '@/components/ui/separator';

export default function AddUserFormWizard({ config }: { config: SectionConfig[] }) {
  const [step, setStep] = useState(0);

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
          // Only allow going backwards
          if (index < step) {
            setStep(index);
          }
          // setStep(index)
        }}
      />
      <Separator className="my-4 seprater-dashed " />

      {step === 0 && (
        <AddUserForm
          config={config}
          onNextStep={() => setStep(1)}
        />
      )}

      {step === 1 && (
        <AssignFacilityForm
          onPrevStep={() => setStep(0)}
        />
      )}
    </div>
  );
}
