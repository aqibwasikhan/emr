import type { Row } from '@tanstack/react-table';

export function facilityGlobalFilter<T>(row: Row<T>, columnId: string, filterValue: string): boolean {
  const original = row.original as Record<string, any>;
  const value = filterValue.toLowerCase();

  return (
    original.facilityName?.toLowerCase().includes(value) ||
    original.facilityType?.toLowerCase().includes(value) ||
    original.npiNumber?.toLowerCase().includes(value)
  );
}
