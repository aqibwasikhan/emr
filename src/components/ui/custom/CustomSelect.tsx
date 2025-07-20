'use client';

import * as React from 'react';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectValue,
    SelectItem,
    SelectGroup,
    SelectLabel,
    SelectSeparator,
} from '@/components/ui/select';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { serialize } from '@/lib/searchparams';

const wrapperVariants = {
    default: 'border text-foreground hover:shadow-lg focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-ring',
    error: 'border-destructive text-destructive focus-within:ring-1 focus-within:ring-destructive',
    disabled: 'border-[var(--border)] bg-[var(--muted)]!  text-[var(--muted-foreground)]  opacity-50',
};

const sizeVariants = {
    xs: 'h-11',
    sm: 'h-15',
    md: 'h-18',
    lg: 'h-24',
};

export interface CustomSelectProps extends React.ComponentProps<typeof Select> {
    label?: string;
    placeholder?: string;
    state?: 'default' | 'error' | 'disabled';
    size?: 'xs' | 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export const CustomSelect = ({
    label,
    placeholder = '-- select --',
    state = 'default',
    size = 'md',
    children,
    disabled,
    ...props
}: CustomSelectProps) => {
    const wrapperClass = cn(
        ' w-full rounded-lg transition-colors',
        wrapperVariants[state],
        sizeVariants[size]
    );

    return (
        <Select  {...props} disabled={state === 'disabled' || disabled}>



            <SelectTrigger
                size={size}
                className={cn(
                    'flex items-center justify-between w-full rounded-md border px-3',
                    wrapperClass,
                    size === 'xs' && 'h-11 text-sm',
                    size === 'sm' && 'h-15 text-base',
                    size === 'md' && 'h-18 text-base',
                    size === 'lg' && 'h-24 text-lg',
                    state === 'disabled' && 'cursor-not-allowed'
                )}
            >
                <div className='flex items-start gap-2 flex-col'>

                    {label && (
                        <label
                            className={cn(
                                'font-semibold ',
                               
                                size === "sm"
                                    ? "text-sm"
                                    : size === "lg"
                                        ? "text-lg "
                                        : "text-sm ",
                                state === 'error' ? 'text-destructive' : 'text-[var(--pri-grey-2)]'
                            )}
                        >
                            {label}
                        </label>
                    )}
                    <SelectValue placeholder={placeholder} />
                </div>

            </SelectTrigger>

            <SelectContent className="bg-popover rounded-md shadow-md border mt-1">
                {children}
            </SelectContent>

        </Select>
    );
};
