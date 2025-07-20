'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFacetedFilter } from '@/components/ui/table/data-table-faceted-filter';
import { DataTableSimpleSelect } from '@/components/ui/table/data-table-simple-select';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { UserStatus } from '@/enums/users';

import { useDataTable } from '@/hooks/use-data-table';
import { normalizeSelectOptions } from '@/lib/utils';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
interface UserTableParams<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
}
export function UserTable<TData, TValue>({
  data,
  totalItems,
  columns
}: UserTableParams<TData, TValue>) {
  const [pageSize] = useQueryState('limit', parseAsInteger.withDefault(10));

  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data, // User data
    columns, // User columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  });
 

  return (
    <DataTable table={table}>
      
    </DataTable>
  );
}
