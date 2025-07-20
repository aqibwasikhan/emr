'use client';

import { useEffect, useRef } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

type IndeterminateCheckboxProps = {
  checked: boolean;
  indeterminate?: boolean;
  onCheckedChange: () => void;
};

export function IndeterminateCheckbox({
  checked,
  indeterminate,
  onCheckedChange
}: IndeterminateCheckboxProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = !!indeterminate;
    }
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onCheckedChange as any}
      className="peer border-[var(--pri-dark-5)] border-2 dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px]  shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
    />
  );
}
