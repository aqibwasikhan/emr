// 'use client';

// import * as React from 'react';
// import * as LabelPrimitive from '@radix-ui/react-label';
// import { Slot } from '@radix-ui/react-slot';
// import {
//   Controller,
//   FormProvider,
//   useFormContext,
//   useFormState,
//   type ControllerProps,
//   type FieldPath,
//   type FieldValues
// } from 'react-hook-form';

// import { cn } from '@/lib/utils';
// import { Label } from '@/components/ui/label';

// const Form = FormProvider;

// type FormFieldContextValue<
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
// > = {
//   name: TName;
// };

// const FormFieldContext = React.createContext<FormFieldContextValue>(
//   {} as FormFieldContextValue
// );

// const FormField = <
//   TFieldValues extends FieldValues = FieldValues,
//   TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
// >({
//   ...props
// }: ControllerProps<TFieldValues, TName>) => {
//   return (
//     <FormFieldContext.Provider value={{ name: props.name }}>
//       <Controller {...props} />
//     </FormFieldContext.Provider>
//   );
// };

// const useFormField = () => {
//   const fieldContext = React.useContext(FormFieldContext);
//   const itemContext = React.useContext(FormItemContext);
//   const { getFieldState } = useFormContext();
//   const formState = useFormState({ name: fieldContext.name });
//   const fieldState = getFieldState(fieldContext.name, formState);

//   if (!fieldContext) {
//     throw new Error('useFormField should be used within <FormField>');
//   }

//   const { id } = itemContext;

//   return {
//     id,
//     name: fieldContext.name,
//     formItemId: `${id}-form-item`,
//     formDescriptionId: `${id}-form-item-description`,
//     formMessageId: `${id}-form-item-message`,
//     ...fieldState
//   };
// };

// type FormItemContextValue = {
//   id: string;
// };

// const FormItemContext = React.createContext<FormItemContextValue>(
//   {} as FormItemContextValue
// );

// function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
//   const id = React.useId();

//   return (
//     <FormItemContext.Provider value={{ id }}>
//       <div
//         data-slot='form-item'
//         className={cn('grid gap-2', className)}
//         {...props}
//       />
//     </FormItemContext.Provider>
//   );
// }

// function FormLabel({
//   className,
//   ...props
// }: React.ComponentProps<typeof LabelPrimitive.Root>) {
//   const { error, formItemId } = useFormField();

//   return (
//     <Label
//       data-slot='form-label'
//       data-error={!!error}
//       className={cn('data-[error=true]:text-destructive', className)}
//       htmlFor={formItemId}
//       {...props}
//     />
//   );
// }

// function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
//   const { error, formItemId, formDescriptionId, formMessageId } =
//     useFormField();

//   return (
//     <Slot
//       data-slot='form-control'
//       id={formItemId}
//       aria-describedby={
//         !error
//           ? `${formDescriptionId}`
//           : `${formDescriptionId} ${formMessageId}`
//       }
//       aria-invalid={!!error}
//       {...props}
//     />
//   );
// }

// function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
//   const { formDescriptionId } = useFormField();

//   return (
//     <p
//       data-slot='form-description'
//       id={formDescriptionId}
//       className={cn('text-muted-foreground text-sm', className)}
//       {...props}
//     />
//   );
// }

// function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
//   const { error, formMessageId } = useFormField();
//   const body = error ? String(error?.message ?? '') : props.children;

//   if (!body) {
//     return null;
//   }

//   return (
//     <p
//       data-slot='form-message'
//       id={formMessageId}
//       className={cn('text-destructive text-sm', className)}
//       {...props}
//     >
//       {body}
//     </p>
//   );
// }

// export {
//   useFormField,
//   Form,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormDescription,
//   FormMessage,
//   FormField
// };
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
    Controller,
    ControllerProps,
    FieldPath,
    FieldValues,
    FormProvider,
    useFormContext,
} from 'react-hook-form';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { isArray, uniq } from 'lodash';
import { useMemo } from 'react';

const Form = FormProvider;

type FormFieldContextValue<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
    name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
    ...props
}: ControllerProps<TFieldValues, TName>) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    );
};

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext);
    const itemContext = React.useContext(FormItemContext);
    const { getFieldState, formState } = useFormContext();

    const fieldState = getFieldState(fieldContext.name, formState);

    if (!fieldContext) {
        throw new Error('useFormField should be used within <FormField>');
    }

    const { id } = itemContext;

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    };
};

type FormItemContextValue = {
    id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        const id = React.useId();

        return (
            <FormItemContext.Provider value={{ id }}>
                <div ref={ref} className={cn(className)} {...props} />
            </FormItemContext.Provider>
        );
    },
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
    React.ElementRef<typeof LabelPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
    const { error, formItemId } = useFormField();

    return (
        <Label
            ref={ref}
            className={cn(error && 'text-destructive', className)}
            htmlFor={formItemId}
            {...props}
        />
    );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
    React.ElementRef<typeof Slot>,
    React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
            aria-invalid={!!error}
            {...props}
        />
    );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        />
    );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const errorMessages = useMemo(() => {
        let messages = [];
        if (isArray(error)) {
            error.forEach((item) => error && messages.push(String(item?.message)));
        } else if (error) {
            messages.push(String(error?.message));
        } else {
            messages.push(children);
        }
        messages = uniq(messages);
        return messages;
    }, [error, children]);

    if (!errorMessages.length) return null;

    return (
        <div
            ref={ref}
            id={formMessageId}
            className={cn('text-sm font-medium text-destructive', className)}
            {...props}
        >
            {errorMessages.map((body, i) => (
                <div key={i} className="space-y-1">
                    <p>{body}</p>
                </div>
            ))}
        </div>
    );
});
FormMessage.displayName = 'FormMessage';

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
};
