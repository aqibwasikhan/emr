// import { z } from 'zod';
// import { SectionConfig } from '@/types/forms';

// export function generateSchema(config: SectionConfig[]) {
//   const fields: Record<string, any> = {};

//   config.forEach((section) => {
//     section.formFields.forEach((field) => {
//       let base;

//       // Boolean types (checkbox, switch)
//       if (field.type === 'checkbox' || field.type === 'switch') {
//         base = z.boolean();

//         if (field.required) {
//           base = base.refine((val) => val === true, {
//             message: `${field.label} is required`,
//           });
//         }
//       } else if (field.type === 'select') {
//         // For select fields, ensure the value is either string or number and belongs to the valid options
//         base = z.union([z.string(), z.number()]).refine((val) => field.options?.some((opt) => opt.value === val), {
//           message: `${field.label} must be one of the available options`,
//         });

//         // Required validation for select
//         if (field.required) {
//           base = z.string().min(1, `${field.label} is required`);  // Handle required validation for select
//         }
//       } else {
//         // Default to string for all other types
//         base = z.string();

//         // Type-specific base rules
//         if (field.type === 'number') {
//           base = base.regex(/^\d+$/, `${field.label} must be numeric`);
//         }
//         if (field.type === 'email') {
//           base = base.email('Invalid email address');
//         }

//         // Required
//         if (field.required) {
//           base = base.min(1, `${field.label} is required`);
//         }

//         // Regex
//         if (field.regex) {
//           const regexStr = field.regex.trim();
//           const match = regexStr.match(/^\/(.+)\/([gimsuy]*)$/);
//           const pattern = match ? match[1] : regexStr;
//           const flags = match ? match[2] : '';
//           base = base.regex(new RegExp(pattern, flags), `${field.label} format is invalid`);
//         }

//         // Min/Max Length
//         if (field.minLength && field.minLength > 0) {
//           base = base.min(field.minLength, `${field.label} must be at least ${field.minLength} characters`);
//         }
//         if (field.maxLength && field.maxLength > 0) {
//           base = base.max(field.maxLength, `${field.label} must be at most ${field.maxLength} characters`);
//         }
//       }

//       fields[field.name] = field.required ? base : base.optional();

//     });
//   });

//   return z.object(fields);
// }
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

        case FieldType.SELECT: {
          const allowedValues = field.options?.map(opt => opt.value) ?? [];

          base = z.union([z.string(), z.number()]).refine(val => {
            return allowedValues.some(opt => opt?.toString() === val?.toString());
          }, {
            message: `${label} must be one of the available options`,
          });
          if (isRequired) {
            base = base.refine(val => val !== null && val !== '', {
              message: `${label} is required`,
            });
          } else {
            base = base.optional().nullable();
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

        default: {
          base = z.string().nullable();

          if (field.type === 'number') {
            base = base.refine((val) => val != null && /^\d+$/.test(val), {
              message: `${label} must be numeric`,
            });
          }

          if (field.type === 'email') {
            base = base.refine((val) => val != null && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
              message: 'Invalid email address',
            });
          }

          if (field.regex) {
            const regexStr = field.regex.trim();
            const match = regexStr.match(/^\/(.+)\/([gimsuy]*)$/);
            const pattern = match ? match[1] : regexStr;
            const flags = match ? match[2] : '';
            const regex = new RegExp(pattern, flags);

            base = base.refine((val) => val != null && regex.test(val), {
              message: `${label} format is invalid`,
            });
          }

          const minLength = field.minLength ?? 0;
          const maxLength = field.maxLength ?? Infinity;

          if (field.minLength && minLength > 0) {
            base = base.refine((val) => val != null && val.length >= minLength, {
              message: `${label} must be at least ${minLength} characters`,
            });
          }

          if (field.maxLength && isFinite(maxLength)) {
            base = base.refine((val) => val == null || val.length <= maxLength, {
              message: `${label} must be at most ${maxLength} characters`,
            });
          }

          if (isRequired) {
            base = base.refine((val) => val != null && val.trim() !== '', {
              message: `${label} is required`,
            });
          } else {
            base = base.optional();
          }

          break;
        }

      }

      fields[field.name] = base;
    });
  });

  return z.object(fields);
}
