'use client';

import { PencilIcon } from '@/icons';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type Step = {
  label: string;
  key: string;
};

type StepperProps = {
  steps: Step[];
  activeStep: number;
  onStepClick?: (index: number) => void;
};

export function Stepper({ steps, activeStep, onStepClick }: StepperProps) {
  return (
    <div className="flex items-center justify-start gap-4">
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        return (
          <div key={step.key} className="flex items-center gap-2">
            <div
              onClick={() => onStepClick?.(index)}
              className={cn(
                'w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium cursor-pointer',
                'transition-all duration-500 ease-in-out', // ✅ add this line
                isCompleted
                  ? 'bg-foreground text-[var(--primary-foreground)]'
                  : isActive
                    ? 'btn-primary-gradient text-[var(--primary-foreground)]'
                    : 'bg-muted text-muted-foreground border-border'
              )}
            >
              {isCompleted ? <Check className="w-4 h-4 transition-all duration-200" /> : isActive ? <PencilIcon className="w-3 h-3 transition-all duration-200" /> : index + 1}
            </div>

            <span className={cn(
              'text-sm font-bold cursor-pointer',
              isCompleted || isActive ? 'text-foreground ' : 'text-muted-foreground'
            )}>
              {step.label}
            </span>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-8 h-1 mx-2 rounded-2xl transition-all duration-500 ease-in-out",
                  isCompleted ? 'bg-foreground' : 'btn-primary-gradient'
                )}
              />
            )}

          </div>
        );
      })}
    </div>
  );
}
