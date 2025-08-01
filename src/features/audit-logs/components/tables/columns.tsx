'use client';

import { ColumnDef, Column } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { AuditLog } from '@/types/audit-log';

export const columns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: 'user',
    header: ({ column }: { column: Column<AuditLog, unknown> }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center gap-2">
          <span className="font-medium">
            {user.firstName}{' '}
            <span className="font-semibold">{user.lastName}</span>
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => (
      <div>{format(new Date(row.original.date), 'MMM dd, yyyy')}</div>
    )
  },
  {
    id: 'time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Time" />
    ),
    cell: ({ row }) => (
      <div>{format(new Date(row.original.date), 'hh:mm a')}</div>
    )
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role = row.original.role;
      return (
        <Badge variant={role.variant} className="text-xs rounded">
          {role.name}
        </Badge>
      );
    }
  },
  {
    accessorKey: 'activity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Activity" />
    ),
    cell: ({ row }) => <div>{row.original.activity}</div>
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="whitespace-break-spaces text-sm">
        {row.original.description}
      </div>
    )
  },
  {
    accessorKey: 'facility',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Facility" />
    ),
    cell: ({ row }) => <div>{row.original.facility}</div>
  },
  {
    accessorKey: 'platform',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Platform" />
    ),
    cell: ({ row }) => <div>{row.original.platform}</div>
  },
  {
    accessorKey: 'module',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Module" />
    ),
    cell: ({ row }) => <div>{row.original.module}</div>
  }
];
