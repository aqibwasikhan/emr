// components/ui/custom/CustomOtpInput.tsx
'use client';

import * as React from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';

type CustomOtpInputProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
  length?: number;
  onlyNumbers?: boolean; // restrict to only digits
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
};

export function CustomOtpInput({
  value,
  defaultValue,
  onChange,
  length = 6,
  onlyNumbers = false,
  disabled = false,
  className,
  inputClassName,
}: CustomOtpInputProps) {
  const [internal, setInternal] = React.useState(defaultValue || '');
  const isControlled = value !== undefined;

  const handleChange = (val: string) => {
    const filtered = onlyNumbers ? val.replace(/[^0-9]/g, '') : val;
    if (!isControlled) setInternal(filtered);
    onChange?.(filtered);
  };

  const actualValue = isControlled ? value : internal;

  return (
    <InputOTP
      value={actualValue}
      onChange={handleChange}
      maxLength={length}
      disabled={disabled}
      className={cn(className)}
    >
      <InputOTPGroup className='gap-3'>
        {Array.from({ length }).map((_, i) => (
          <InputOTPSlot
            key={i}
            index={i}
            className={cn(inputClassName)}
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
