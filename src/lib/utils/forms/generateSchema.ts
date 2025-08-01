import { z } from 'zod';
import { SectionConfig } from '@/types/forms';
import { FieldType } from '@/enums/form';

export function generateSchema(config: SectionConfig[]) {
  const fields: Record<string, any> = {};

  config.forEach((section) => {
    section.formFields.forEach((field) => {
      const label = field.label;
      const isRequired = !!field.required;

      let base: z.ZodTypeAny;

      switch (field.type) {
        case FieldType.CHECKBOX:
        case FieldType.SWITCH: {
          base = z.boolean();

          if (isRequired) {
            base = base.refine(val => val === true, {
              message: `${label} is required`,
            });
          } else {
            base = base.optional();
          }

          break;
        }

        // case FieldType.SELECT: {
        //   const allowedValues = field.options?.map(opt => opt.value) ?? [];

        //   base = z.union([z.string(), z.number()]).refine(val => {
        //     return allowedValues.some(opt => opt?.toString() === val?.toString());
        //   }, {
        //     message: `${label} must be one of the available options`,
        //   });
        //   if (isRequired) {
        //     base = base.refine(val => val !== null && val !== '', {
        //       message: `${label} is required`,
        //     });
        //   } else {
        //     base = base.optional().nullable();
        //   }

        //   break;
        // }
        case FieldType.SELECT: {
          const allowedValues = field.options?.map(opt => opt.value) ?? [];

          // 1. Accept string or number or null (typed as union)
          base = z.union([z.string(), z.number(), z.null()]);

          // 2. Only validate value if it's not null or empty
          base = base.refine(val => {
            if (val === null || val === '') return true;
            return allowedValues.some(opt => opt?.toString() === val?.toString());
          }, {
            message: `${label} must be one of the available options`,
          });

          // 3. Handle required vs optional
          if (isRequired) {
            base = base.refine(val => val !== null && val !== '', {
              message: `${label} is required`,
            });
          } else {
            base = base.optional().nullable(); // ✅ explicitly allow null for optional
          }

          break;
        }
        case FieldType.MULTI_CHECKBOX: {
          const allowedValues = field.options?.map(opt => opt.value) ?? [];
          base = z.array(z.union([z.string(), z.number()])).refine((arr) =>
            arr.every(val => allowedValues.includes(val))
            , {
              message: `${label} contains invalid selections`,
            });

          if (isRequired) {
            base = base.refine((arr) => arr.length > 0, {
              message: `${label} is required`,
            });
          } else {
            base = base.optional();
          }

          break;
        }

        // default: {
        //   base = z.string().nullable();

        //   if (field.type === 'number') {
        //     base = base.refine((val) => val != null && /^\d+$/.test(val), {
        //       message: `${label} must be numeric`,
        //     });
        //   }

        //   if (field.type === 'email') {
        //     base = base.refine((val) => val != null && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        //       message: 'Invalid email address',
        //     });
        //   }

        //   if (field.regex) {
        //     const regexStr = field.regex.trim();
        //     const match = regexStr.match(/^\/(.+)\/([gimsuy]*)$/);
        //     const pattern = match ? match[1] : regexStr;
        //     const flags = match ? match[2] : '';
        //     const regex = new RegExp(pattern, flags);

        //     base = base.refine((val) => val != null && regex.test(val), {
        //       message: `${label} format is invalid`,
        //     });
        //   }

        //   const minLength = field.minLength ?? 0;
        //   const maxLength = field.maxLength ?? Infinity;

        //   if (field.minLength && minLength > 0) {
        //     base = base.refine((val) => val != null && val.length >= minLength, {
        //       message: `${label} must be at least ${minLength} characters`,
        //     });
        //   }

        //   if (field.maxLength && isFinite(maxLength)) {
        //     base = base.refine((val) => val == null || val.length <= maxLength, {
        //       message: `${label} must be at most ${maxLength} characters`,
        //     });
        //   }

        //   if (isRequired) {
        //     base = base.refine((val) => val != null && val.trim() !== '', {
        //       message: `${label} is required`,
        //     });
        //   } else {
        //     base = base.optional();
        //   }

        //   break;
        // }
        default: {
          base = z.string().nullable();

          const shouldValidate = (val: any) =>
            val != null && val !== '' && typeof val === 'string' && val.trim() !== '';

          if (field.type === 'number') {
            base = base.refine((val) => !shouldValidate(val) || /^\d+$/.test(val), {
              message: `${label} must be numeric`,
            });
          }

          if (field.type === 'email') {
            base = base.refine((val) => !shouldValidate(val) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
              message: 'Invalid email address',
            });
          }

          // if (field.regex) {
          //   const regexStr = field.regex.trim();
          //   const match = regexStr.match(/^\/(.+)\/([gimsuy]*)$/);
          //   const pattern = match ? match[1] : regexStr;
          //   const flags = match ? match[2] : '';
          //   const regex = new RegExp(pattern, flags);

          //   base = base.refine((val) => !shouldValidate(val) || regex.test(val), {
          //     message: `${label} format is invalid`,
          //   });
          // }
          if (field.regex) {
            const regexStr = field.regex.trim();
            const match = regexStr.match(/^\/(.+)\/([gimsuy]*)$/);
            const pattern = match ? match[1] : regexStr;
            const flags = match ? match[2] : '';
            const regex = new RegExp(pattern, flags);
            const minCharsToValidate = 3; // ✅ Customize as needed
            base = base.refine((val) => {
              if (!shouldValidate(val)) return true; // skip empty values
              if (val.length < minCharsToValidate) return true; // skip short values
              return regex.test(val); // finally run regex
            }, {
              message: `${label} format is invalid`,
            });
          }

          const minLength = field.minLength ?? 0;
          const maxLength = field.maxLength ?? Infinity;

          if (field.minLength && minLength > 0) {
            base = base.refine((val) => !shouldValidate(val) || val.length >= minLength, {
              message: `${label} must be at least ${minLength} characters`,
            });
          }

          if (field.maxLength && isFinite(maxLength)) {
            base = base.refine((val) => !shouldValidate(val) || val.length <= maxLength, {
              message: `${label} must be at most ${maxLength} characters`,
            });
          }

          if (isRequired) {
            base = base.refine((val) => shouldValidate(val), {
              message: `${label} is required`,
            });
          } else {
            base = base.optional().nullable();
          }

          break;
        }


      }

      fields[field.name] = base;
    });
  });

  return z.object(fields);
}
