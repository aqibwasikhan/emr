// components/RoleCard.tsx
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';
import { PencilIcon } from '@/icons';
import { ActionDropdown, DropdownAction } from '@/components/shared/action-dropdown';
import { Role,SubRole } from '@/types/roles';
import { type ColumnDef, Column } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ReactNode } from 'react';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTable } from '@/components/ui/table/data-table';


type RoleCardProps = {
  roleBlock: Role;
};

const dropdownActions: DropdownAction[] = [
  {
    label: 'Edit Role',
    icon: <PencilIcon className='w-4 h-4 cursor-pointer text-foreground' />,
  },
  { separator: true },
  {
    label: 'Add New Sub Role',
    icon: <Trash2 className='w-4 h-4 cursor-pointer text-foreground' />,
  },
];

export const columns: ColumnDef<SubRole>[] = [
  {
    accessorKey: 'title',
    header: ({ column }: { column: Column<SubRole, unknown> }) => (
      <DataTableColumnHeader column={column} title='Sub Role Title' />
    ),
    cell: ({ cell }) => <span className='font-semibold pl-4'>{String(cell.getValue())}</span>,
  },
  {
    accessorKey: 'Description',
    header: ({ column }: { column: Column<SubRole, unknown> }) => (
      <DataTableColumnHeader column={column} title='Description' />
    ),
    cell: ({ cell }) => <span className='text-muted-foreground'>{String(cell.getValue())}</span>,
  },
  {
    accessorKey: 'Scope',
    header: 'Scope',
    cell: ({ cell }) => (
      <div className='flex flex-wrap gap-1'>
        {(cell.getValue() as string[]).map((scope, idx) => (
          <Badge key={idx} variant='outline_pending' className='border-none rounded'>
            {scope}
          </Badge>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Created On',
    cell: ({ cell }) =>
      new Date(String(cell.getValue())).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'createdBy',
    header: 'Created By',
    cell: ({ cell }) => <span>{String(cell.getValue())}</span>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <div className='flex justify-end gap-2 pr-4'>
        <PencilIcon className='w-4 h-4 cursor-pointer text-[var(--pri-grey-2)]' />
        <Trash2 className='w-4 h-4 cursor-pointer text-[var(--pri-grey-2)]' />
      </div>
    ),
  },
];

export function RoleCard({ roleBlock }: RoleCardProps) {
  const { table } = useDataTable<SubRole>({
    data: roleBlock.subRoles || [],
    columns,
    pageCount: 1,
    shallow: false,
    debounceMs: 300,
  });

  return (
    <Card className='bg-accent py-2 border-none'>
      <CardContent className='p-2'>
        <div className='flex items-start justify-between px-2'>
          <h3 className='text-sm font-semibold text-secondary mb-4'>{roleBlock.role}</h3>
          <ActionDropdown actions={dropdownActions} />
        </div>
        <DataTable table={table} pagination={false}/>
      </CardContent>
    </Card>
  );
}
