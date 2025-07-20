// src/components/ui/custom/CustomInput.tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * We omit:
 *  • "size" because HTMLInputAttributes already has `size?: number`, and we want our CVA `size` variant.
 *  • "aria-invalid" because the built-in type is boolean|"grammar"|"spelling", 
 *    but here we drive error display via our own `errorText?: string`.
 */
interface CustomInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "aria-invalid"
  >,
  VariantProps<typeof wrapperVariants> {
  /**
   * The text label to display overlapping the top border.
   */
  label?: string;

  /**
   * A React node to show inside the left side of the input (e.g. a user‐icon).
   */
  icon?: React.ReactNode;
  /**
    * A React node to show inside the right side of the input (e.g. a calendar icon or eye‐toggle).
    */
  rightIcon?: React.ReactNode;

  /**
   * Callback when the right icon is clicked.
   */
  onRightIconClick?: () => void;
  /**
   * If true (or if you pass `type="search"`), a default search icon appears on the left.
   */
  isSearch?: boolean;

  /**
   * When `state="error"`, this string is rendered below the field. We also set aria-invalid on the <input>.
   */
  errorText?: string;

  /**
   * If you use the input in controlled mode (`value={…}`), supply this callback
   * so that when the user starts typing again, we call it to let your parent clear its own error.
   */
  onErrorClear?: () => void;
  inputClassName?: string;


}


const wrapperVariants = cva(
  [
    "relative w-full rounded-lg transition-colors hover:border-transparent ",
    "focus-within:shadow-none", // drop hover-shadow when focused
  ],
  {
    variants: {
      state: {
        default:
          "border text-[var(--foreground)] " +
          "hover:shadow-lg focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-[var(--ring)]",
        error:
          "border-destructive border  text-[var(--destructive)] " +
          "hover:shadow-none  focus-within:ring-1 focus-within:ring-offset-1 focus-within:ring-[var(--destructive)] focus-within:border-none",
        disabled:
          "border-[var(--border)] bg-[var(--muted)] text-[var(--muted-foreground)] " +
          "shadow-none focus-within:ring-0 opacity-50",
      },
      size: {
        xs: "h-11",
        sm: "h-15",
        md: "h-18",
        lg: "h-20",
      },
      hasIcon: {
        true: "pl-10",
        false: "",
      },
      hasRightIcon: {
        true: "pr-10",
        false: "",
      },
    },
    defaultVariants: {
      state: "default",
      size: "md",
      hasIcon: false,
      hasRightIcon: false,
    },
  }
);

export const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>(
  (
    {
      label,
      state = "default",
      size = "md",
      icon,
      isSearch = false,
      placeholder,
      errorText,
      className,
      inputClassName,
      disabled = false,
      onErrorClear,
      rightIcon,
      onRightIconClick,
      value: controlledValue,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    // Are we in controlled mode?
    const isControlled = controlledValue !== undefined;

    // Internal value state (uncontrolled mode):
    const [internalValue, setInternalValue] = React.useState<string>(
      () => defaultValue?.toString() || ""
    );
    // Internal error (uncontrolled mode):
    const [internalError, setInternalError] = React.useState<string | undefined>(
      () => (state === "error" ? errorText : undefined)
    );

    // Sync internalError when parent-controlled errorText changes:
    React.useEffect(() => {
      if (isControlled) {
        setInternalError(state === "error" ? errorText : undefined);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorText, state, isControlled]);

    // onChange handler (common for both modes):
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      const newValue = e.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Clear internal error in uncontrolled:
      if (!isControlled && internalError) {
        setInternalError(undefined);
      }

      // If controlled & parent gave onErrorClear, call it:
      if (isControlled && errorText && typeof onErrorClear === "function") {
        onErrorClear();
      }

      // Finally, call the parent's onChange:
      onChange?.(e);
    };

    // Decide which value to render:
    const inputValue = isControlled ? controlledValue : internalValue;
    // Decide which error message to show:
    const displayedError = isControlled ? errorText : internalError;

    // Should we reserve left padding for an icon/search?
    const showIcon = isSearch || Boolean(icon);
    // Should we reserve right padding for a right icon?
    const showRightIcon = Boolean(rightIcon);

    return (
      <div className="flex w-full flex-col ">
        {/**
          ┌────────────────────────────────────────────────────────────┐
          │   The “wrapper” - a single bordered box containing both    │
          │   the floating label and the <input> itself.               │
          │                                                            │
          │   We use absolute positioning for the label to overlap     │
          │   the top border, just like your Figma design.             │
          └────────────────────────────────────────────────────────────┘
        */}
        <div
          className={cn(
            wrapperVariants({
              state:
                disabled
                  ? "disabled"
                  : state === "error"
                    ? "error"
                    : "default",
              size,
              hasIcon: showIcon,
            }),
            className
          )}
        >
          {/* 1) Floating label: overlaps the top border */}
          {label && (
            <label
              htmlFor={props.id}
              className={cn(
                "absolute left-3 font-semibold  z-10  px-1 p-2  ",
                showIcon ? 'left-8' : 'left-1',
                size === "sm"
                  ? "text-sm"
                  : size === "lg"
                    ? "text-lg top-auto"
                    : "text-sm top-auto",
                disabled
                  ? "text-[var(--muted-foreground)]"
                  : state === "error"
                    ? "text-[var(--destructive)]"
                    : "text-[var(--pri-grey-2)]"
              )}
            >
              {label}
            </label>
          )}

          {/* 2) Icon (search or custom) on the left inside the box */}
          {showIcon && (
            <div className={cn("pointer-events-none absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center",
              isSearch ? 'top-1/2 ' : 'top-5'
            )}>
              {isSearch ? (
                <SearchIcon
                  className={cn(
                    "h-4 w-4",
                    disabled
                      ? "text-[var(--muted-foreground)]"
                      : state === "error"
                        ? "text-[var(--destructive)]"
                        : "text-[var(--muted-foreground)]"
                  )}
                />
              ) : (
                <span
                  className={cn(
                    "h-4 w-4",
                    disabled
                      ? "text-[var(--muted-foreground)]"
                      : state === "error"
                        ? "text-[var(--destructive)]"
                        : "text-[var(--muted-foreground)]"
                  )}
                >
                  {icon}
                </span>
              )}
            </div>
          )}
          {/* 3) Right icon (clickable) */}
          {showRightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-3 top-1/2 flex -translate-y-1/2 -rotate-z-1 z-10 items-center justify-center"
              disabled={disabled}
            >
              <span
                className={cn(
                  "h-4 w-4",
                  disabled
                    ? "text-[var(--muted-foreground)]"
                    : state === "error"
                      ? "text-[var(--destructive)]"
                      : "text-[var(--muted-foreground)]"
                )}
              >
                {rightIcon}
              </span>
            </button>
          )}

          {/* 4) The <input> stretches the full wrapper; borderless & transparent */}
          <input
            ref={ref}
            {...props}
            value={inputValue}
            onChange={handleChange}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={state === "error" || undefined}
            className={cn(
              "absolute inset-0 w-full h-full bg-transparent border-none  rounded px-3",
              size === "sm"
                ? "pt-4 pb-2 text-sm"
                : size === "lg"
                  ? "pt-5 pb-0 text-xl"
                  : "pt-5 pb-2 text-base",
              showIcon ? "pl-10" : "",
              showRightIcon ? "pr-10" : "",
              disabled
                ? "text-[var(--muted-foreground)]"
                : state === "error"
                  ? "placeholder-[var(--destructive)] text-[var(--foreground)]"
                  : "text-[var(--foreground)]",
              "outline-none",

              disabled ? "cursor-not-allowed" : "",
              inputClassName
            )}
          />
        </div>

        {/* 4) If there's an error, show it beneath in red */}
        {displayedError && state === "error" && (
          <p className="mt-1 text-sm text-[var(--destructive)]">
            {displayedError}
          </p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";
