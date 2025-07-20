'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const wrapperVariants = cva(
  'relative w-full rounded-lg transition-colors hover:border-transparent focus-within:shadow-none',
  {
    variants: {
      state: {
        default:
          'border text-foreground hover:shadow-lg focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-ring',
        error:
          'border-destructive text-destructive focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-destructive',
        disabled:
          'border-border bg-muted text-muted-foreground shadow-none focus-within:ring-0 opacity-50',
      },
      size: {
        sm: 'min-h-[3rem]', // smaller height
        md: 'min-h-[5rem]',
        lg: 'min-h-[8rem]',
      },
    },
    defaultVariants: {
      state: 'default',
      size: 'md',
    },
  }
);

interface CustomTextareaProps
  extends Omit<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      'size' | 'aria-invalid'
    >,
    VariantProps<typeof wrapperVariants> {
  label?: string;
  errorText?: string;
  onErrorClear?: () => void;
}

export const CustomTextarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  (
    {
      label,
      state = 'default',
      size = 'md',
      placeholder,
      errorText,
      className,
      disabled = false,
      onErrorClear,
      value: controlledValue,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = React.useState<string>(
      () => defaultValue?.toString() || ''
    );
    const [internalError, setInternalError] = React.useState<string | undefined>(
      () => (state === 'error' ? errorText : undefined)
    );

    React.useEffect(() => {
      if (isControlled) {
        setInternalError(state === 'error' ? errorText : undefined);
      }
    }, [errorText, state, isControlled]);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
      const newValue = e.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
        if (internalError) setInternalError(undefined);
      }

      if (isControlled && errorText && typeof onErrorClear === 'function') {
        onErrorClear();
      }

      onChange?.(e);
    };

    const valueToRender = isControlled ? controlledValue : internalValue;
    const displayedError = isControlled ? errorText : internalError;

    return (
      <div className="flex w-full flex-col">
        <div
          className={cn(
            wrapperVariants({ state: disabled ? 'disabled' : state, size }),
            className
          )}
        >
          {label && (
            <label
              htmlFor={props.id}
              className={cn(
                'absolute left-1 -translate-y-1/2 z-10 bg-transparent px-1 p-2 font-semibold',
                size === "sm"
                  ? "text-sm"
                  : size === "lg"
                    ? "text-lg top-5"
                    : "text-sm top-4",
                disabled
                  ? 'text-muted-foreground'
                  : state === 'error'
                  ? 'text-destructive'
                  : 'text-[var(--pri-grey-2)]'
              )}
            >
              {label}
            </label>
          )}

          <textarea
            ref={ref}
            {...props}
            value={valueToRender}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={state === 'error' || undefined}
            className={cn(
              'w-full bg-transparent border-none h-full p-3 outline-none',
              'text-sm',
              size === "sm"
                  ? "pt-4 min-h-[3rem]"
                  : size === "lg"
                    ? "pt-9 min-h-[8rem]"
                    : " pt-7 min-h-[5rem]",
              disabled
                ? 'text-muted-foreground'
                : state === 'error'
                ? 'placeholder-destructive text-foreground'
                : 'text-foreground',
              'rounded-md'
            )}
          />
        </div>
        {displayedError && state === 'error' && (
          <p className="mt-1 text-sm text-destructive">{displayedError}</p>
        )}
      </div>
    );
  }
);

CustomTextarea.displayName = 'CustomTextarea';
