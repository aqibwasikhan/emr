import { SectionConfig } from '@/types/forms'; // adjust path as needed

export function disableFieldsInConfig(
  config: SectionConfig[],
  fieldNamesToDisable: string[]
): SectionConfig[] {
  return config.map((section) => ({
    ...section,
    formFields: section.formFields.map((field) => {
      if (fieldNamesToDisable.includes(field.name)) {
        return {
          ...field,
          disabled: true,
        };
      }
      return field;
    }),
  }));
}
export function omitKeys<T extends Record<string, any>>(obj: T, keys: string[]): Partial<T> {
  const cloned = { ...obj };
  keys.forEach((key) => {
    delete cloned[key];
  });
  return cloned;
}
