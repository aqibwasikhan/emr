// lib/utils/select-options.ts

type RawOption = Record<string, any>;

export function normalizeSelectOptions(
  raw: RawOption[],
  config: {
    labelKey: string;
    valueKey: string;
    convertValueToString?: boolean;
    includeAllOption?: boolean;
  }
): { label: string; value: string | undefined }[] {
  const {
    labelKey,
    valueKey,
    convertValueToString = true,
    includeAllOption = true
  } = config;

  const normalized = raw.map((item) => ({
    label: item[labelKey],
    value: convertValueToString
      ? item[valueKey]?.toString?.()
      : item[valueKey]
  }));

  if (includeAllOption) {
    return [{ label: 'All', value: undefined }, ...normalized];
  }

  return normalized;
}
