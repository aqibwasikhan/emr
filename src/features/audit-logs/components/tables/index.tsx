'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { DataTableFacetedFilter } from '@/components/ui/table/data-table-faceted-filter';
import { DataTableSimpleSelect } from '@/components/ui/table/data-table-simple-select';
import { DataTableToolbar } from '@/components/ui/table/data-table-toolbar';
import { UserStatus } from '@/enums/users';

import { useDataTable } from '@/hooks/use-data-table';
import { normalizeSelectOptions } from '@/lib/utils';
import { User } from '@/types/user-mangment';

import { ColumnDef, Row } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useState } from 'react';
// import { UserDetailSheet } from '../user-detail-sheet';
interface UserTableParams<TData, TValue> {
  data: TData[];
  totalItems: number;
  columns: ColumnDef<TData, TValue>[];
}
export function LogsTable<TData, TValue>({
  data,
  totalItems,
  columns
}: UserTableParams<TData, TValue>) {
  const [pageSize] = useQueryState('limit', parseAsInteger.withDefault(10));
  const [selectedUserId, setSelectedUserId] = useState<number | null | undefined>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  // const modifiedColumns = columns.map((col) =>
  //   col.id === 'name'
  //     ? {
  //       ...col,
  //       cell: ({ row }: { row: Row<TData> }) => {
  //         const user = row.original as User;
  //         return (
  //           <div
  //             onClick={() => handleOpenUser(user.id)}
  //             className="cursor-pointer font-medium hover:underline"
  //           >
  //               {user?.firstName} <span className="font-semibold">{user?.lastName}</span>
  //           </div>
  //         );
  //       },
  //     }
  //     : col
  // );
  const handleOpenUser = (userId: number | null | undefined) => {
    setSelectedUserId(userId);
    setSheetOpen(true);
  };
  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data, // User data
    columns, // User columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  });


  return (
    <>
      <DataTable table={table}>

      </DataTable>
      {/* <UserDetailSheet
        userId={selectedUserId}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      /> */}
    </>
  );
}
