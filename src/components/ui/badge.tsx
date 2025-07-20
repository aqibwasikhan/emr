import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center cursor-pointer justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground hover:bg-accent [a&]:hover:text-accent-foreground',
        pending:
          'text-secondary border-transparent rounded-full bg-accent [a&]:hover:text-accent-foreground',
        orange:
          'text-[#FF9C2C] border-transparent rounded-full bg-[#FFF5EA] [a&]:hover:text-accent-foreground',
        blue:
          'text-[#0EA7E7] border-transparent rounded-full bg-[#E9F8FE] [a&]:hover:text-accent-foreground',
        green:
          'text-[#38C272] border-transparent rounded-full bg-[#EBF9F1] [a&]:hover:text-accent-foreground',
        pink:
          'text-[#D257D0] border-transparent rounded-full bg-[#FBEEFA] [a&]:hover:text-accent-foreground',
        purple:
          'text-[#6A85FF] border-transparent rounded-full bg-[#F0F3FF] [a&]:hover:text-accent-foreground',
        outline_completed:
          'text-primary border-primary rounded-full hover:bg-accent [a&]:hover:text-accent-foreground',
        outline_pending:
          'text-secondary border-secondary rounded-full bg-accent [a&]:hover:text-accent-foreground',
        outline_cancelled:
          'text-primary border-primary rounded-full [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        outline_incomplete:
          'text-primary border-primary rounded-full [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        outline_inactive:
          ' bg-[var(--pri-grey-5)]  text-muted-foreground border-ring rounded-full [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp
      data-slot='badge'
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
