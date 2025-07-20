// src/components/ui/button.tsx

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';


const buttonVariants = cva(
  `
    inline-flex items-center justify-center gap-2 whitespace-nowrap
    rounded-lg font-semibold transition-colors outline-none 
    focus-visible:ring-2 focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer
  `,
  {
    variants: {
      variant: {
        default: [
          // Default
          "bg-foreground text-[var(--primary-foreground)] shadow-sm",
          // Hover
          "hover:bg-muted-foreground",
          // Active (pressed/focused)
          "active:bg-[var(--primary-foreground)] active:text-[var(--primary)] ",
          // Disabled
          "disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:border-transparent",
        ].join(" "),
        primary: [
          // Default
          "bg-primary text-[var(--primary-foreground)] shadow-sm",
          // Hover
          "hover:bg-muted-foreground",
          // Active (pressed/focused)
          "active:bg-[var(--primary-foreground)] active:text-[var(--primary)] ",
          // Disabled
          "disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:border-transparent",
        ].join(" "),
        primary_gradient: [
          // Default
          "btn-primary-gradient text-[var(--primary-foreground)] shadow-sm",
          // Active (pressed/focused)
          " active:text-[var(--primary)] ",
          // Hover
          "hover:btn-primary-gradient",
          // Disabled
          "disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:border-transparent",
        ].join(" "),

        secondary: [
          // Default
          "bg-primary-500 text-primary shadow-sm",
          // Hover
          "hover:bg-primary hover:text-primary-foreground",
          // Active
          "active:bg-[var(--secondary-foreground)] active:text-[var(--primary)] ",
          // Disabled
          "disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)]",
        ].join(" "),

        tertiary: [
          // Default
          "bg-transparent text-[var(--secondary)] underline-offset-4",
          // Hover
          "hover:text-[var(--secondary-200)] hover:underline",
          // Active
          "active: text-[var(--secondary)] active:underline",
          // Disabled
          "disabled:text-[var(--muted-foreground)] disabled:underline-none",
        ].join(" "),

        destructive: [
          // Default
          "bg-[var(--destructive)] text-[var(--destructive-foreground)] shadow-sm",
          // Hover
          "hover:bg-opacity-90",
          // Active
          "active:bg-[var(--destructive-foreground)] active:text-[var(--destructive)] active:border active:border-[var(--destructive)]",
          // Disabled
          "disabled:bg-[var(--muted)] disabled:text-[var(--muted-foreground)]",
        ].join(" "),

        ghost: [
          // Default
          "bg-transparent text-[var(--foreground)]",
          // Hover
          "hover:bg-[var(--accent)] hover:text-[var(--foreground)]",
          // Active
          "active:bg-[var(--muted)] active:text-[var(--foreground)]",
          // Disabled
          "disabled:text-[var(--muted-foreground)] disabled:bg-transparent",
        ].join(" "),

        link: [
          // Default
          "bg-transparent text-primary underline-offset-4",
          // Hover
          "hover:underline ",
          // Active
          "active:underline active:text-[var(--primary-foreground)]",
          // Disabled
          "disabled:text-[var(--muted-foreground)] disabled:underline-none",
        ].join(" "),

        outline: [
          // Default
          "bg-transparent border border-[var(--primary)] text-[var(--primary)]",
          // Hover
          "hover:bg-[var(--accent)] hover:text-[var(--primary)]",
          // Active
          "active:bg-[var(--primary)] active:text-[var(--primary-foreground)]",
          // Disabled
          "disabled:border-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:bg-transparent",
        ].join(" "),
         outline_default: [
          // Default
          "bg-transparent border border-border text-foreground",
          // Hover
          "hover:bg-muted/20 hover:text-foreground",
          // Active
          "active:bg-muted/40 active:text-foreground",
          // Disabled
          "disabled:border-[var(--muted)] disabled:text-[var(--muted-foreground)] disabled:bg-transparent",
        ].join(" "),
      },
      size: {
        sm: "h-8 rounded-md px-3 text-sm has-[>svg]:px-2.5",
        md: "h-12 rounded-md px-4 text-lg has-[>svg]:px-3",
        lg: "h-16 rounded-md px-6 text-2xl has-[>svg]:px-4",
        // Icon‐only (circle)
        icon: "h-10 w-10 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  loading = false,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        loading && "animate-pulse ",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    />
  );
}

export { Button, buttonVariants };
