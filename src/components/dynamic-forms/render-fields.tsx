'use client';

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'; // adjust path if needed

import { useFormContext } from 'react-hook-form';
import { FieldConfig } from '@/types/forms';
import { CustomInput } from '../ui/custom';
import { CustomTextarea } from '../ui/custom/CustomTextarea';
import { CustomSelect } from '../ui/custom/CustomSelect';
import { SelectGroup, SelectItem, SelectLabel } from '../ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { FieldType } from '@/enums/form';
function safeInputValue(value: any) {
  return value == null || undefined ? '' : value;
}
export default function RenderField({ field }: { field: FieldConfig }) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={field.name}
      render={({ field: controllerField }) => {
        const error = form.formState.errors?.[field.name]?.message as string | undefined;

        switch (field.type) {
          case FieldType.TEXTAREA:
            return (
              <FormItem>

                <FormControl>
                  <CustomTextarea
                    label={field.label}
                    name={controllerField.name}
                    onChange={controllerField.onChange}
                    onBlur={controllerField.onBlur}
                    ref={controllerField.ref}
                    value={safeInputValue(controllerField.value)}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );

          case FieldType.SELECT:
            return (
              <FormItem>
                <FormControl>
                  <CustomSelect
                    label={field.label}
                    value={controllerField.value?.toString() ?? ''}
                    onValueChange={controllerField.onChange}
                    placeholder={field.placeholder}
                    disabled={field.disabled}
                  >
                    <SelectGroup>
                      <SelectLabel>{field.label}</SelectLabel>
                      {field.options?.map((opt, idx) => (
                        <SelectItem key={idx} value={opt.value?.toString()}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </CustomSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            );

          case FieldType.TEXT:
          case FieldType.NUMBER:
          case FieldType.EMAIL:
            return (
              <FormItem>

                <FormControl>
                  <CustomInput
                    label={field.label}
                    value={safeInputValue(controllerField.value).toString()}
                    name={controllerField.name}
                    onChange={controllerField.onChange}
                    onBlur={controllerField.onBlur}
                    ref={controllerField.ref}
                    type={field.type}
                    placeholder={field.placeholder}
                    minLength={field.minLength}
                    maxLength={field.maxLength}
                    disabled={field.disabled}
                     
                  // {...controllerField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );

          case FieldType.SWITCH:
            return (
              <FormItem className="w-full">
                <div className='bg-[var(--pri-grey-5)] flex justify-between p-4 rounded'>
                  <FormLabel className="text-sm font-medium text-[var(--pri-grey-2)]">{field.label}</FormLabel>
                  <FormControl>

                    <Switch
                      disabled={field.disabled}
                      checked={controllerField.value ?? false}
                      onCheckedChange={controllerField.onChange}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            );

          case FieldType.CHECKBOX:
            return (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    id={field.name}
                    disabled={field.disabled}
                    checked={controllerField.value ?? false}
                    onCheckedChange={controllerField.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor={field.name}>{field.label}</FormLabel>
                <FormMessage />
              </FormItem>
            );
          case FieldType.MULTI_CHECKBOX:
            return (
              <FormItem>
                <div className="flex flex-wrap gap-4">
                  {field.options?.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-1 ">

                      <Checkbox
                        id={`${field.name}-${opt.value}`}
                        disabled={opt.disable}
                        checked={Array.isArray(controllerField.value) ? controllerField.value.includes(opt.value) : false}
                        onCheckedChange={(checked) => {
                          const current = Array.isArray(controllerField.value) ? controllerField.value : [];
                          const updatedValue = checked
                            ? [...current, opt.value]
                            : current.filter((val) => val !== opt.value);
                          controllerField.onChange(updatedValue);
                        }}
                      />
                      <label className={opt.disable ? 'cursor-not-allowed opacity-50 text-ring' : ''} htmlFor={`${field.name}-${opt.value}`}>{opt.label}</label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            );


          default:
            return <div>Unsupported field type</div>;
        }
      }}
    />
  );
}
