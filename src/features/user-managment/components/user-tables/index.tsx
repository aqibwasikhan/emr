'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { useDataTable } from '@/hooks/use-data-table';
import { User } from '@/types/user-mangment';
import { ColumnDef, Row } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import React, { useState } from 'react';
import { UserDetailSheet } from '../user-detail-sheet';
import { ActionDropdown } from '@/components/shared/action-dropdown';
import { PencilIcon } from '@/icons';
import { Eye } from 'lucide-react';
import { useUserFormStore } from '@/stores/userFormStore';
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
  const [selectedUserId, setSelectedUserId] = useState<number | null | undefined>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
    const {  clearUserData, } = useUserFormStore();
  
  const modifiedColumns = columns.map((col) => {
  if (col.id === 'name') {
    return {
      ...col,
      cell: ({ row }: { row: Row<TData> }) => {
        const user = row.original as User;
        return (
          <div
            onClick={() => handleOpenUser(user.id)}
            className="cursor-pointer font-medium hover:underline"
          >
            {user.firstName} <span className="font-semibold">{user.lastName}</span>
          </div>
        );
      },
    };
  }

  if (col.id === 'actions') {
    return {
      ...col,
      cell: ({ row }: { row: Row<TData> }) => {
        const user = row.original as User;
        return (
          <ActionDropdown
            actions={[
              {
                label: 'Edit User',
                href: `/user-management/edit/${user.id}`,
                onClick: () => clearUserData(),
                icon: <PencilIcon className="w-4 h-4 text-foreground" />,
              },
              { separator: true },
              {
                label: 'View User',
                onClick: () => handleOpenUser(user.id),
                icon: <Eye className="w-4 h-4 text-foreground" />,
              },
            ]}
          />
        );
      },
    };
  }

  return col;
});
  const handleOpenUser = (userId: number | null | undefined) => {
    setSelectedUserId(userId);
    setSheetOpen(true);
  };
  const pageCount = Math.ceil(totalItems / pageSize);

  const { table } = useDataTable({
    data, // User data
    columns: modifiedColumns, // User columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500
  });


  return (
    <React.Fragment>
      <DataTable table={table}/>
      <UserDetailSheet
        userId={selectedUserId}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </React.Fragment>
  );
}
