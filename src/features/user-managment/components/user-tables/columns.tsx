'use client';

import { ColumnDef, Column } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Mail, CalendarDays, Building2, UserRoundCheck, Briefcase } from 'lucide-react';
import { User } from '@/types/user-mangment';
import { UserStatus } from '@/enums/users';
import { CellAction } from './cell-action';
import { formatDate } from '@/lib/format';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'firstName',
    id: 'name',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="font-medium">
            {user?.firstName} <span className="font-semibold">{user?.lastName}</span>
          </div>
        </div>
      );
    },
    meta: {
      label: 'Name',
      placeholder: 'Search name...',
      variant: 'text',
      icon: UserRoundCheck
    }
  },
  {
    accessorKey: 'email',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
    meta: {
      label: 'Email',
      placeholder: 'Search email...',
      variant: 'text',
      icon: Mail
    }
  },
  {
    accessorKey: 'lastLoginAt',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Last Login At' />
    ),
    cell: ({ cell }) => <div>{formatDate(cell.getValue<string>())}</div>,
    meta: {
      label: 'Last Login',
      placeholder: 'Search...',
      variant: 'text',
      icon: CalendarDays
    }
  },
  {
    accessorKey: 'facilities',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Facilities'  className="text-center" />
    ),
    cell: ({ cell }) => <div className='text-center'>{cell.getValue<number>()}</div>,
    meta: {
      label: 'Facilities',
      placeholder: 'Search...',
      variant: 'text',
      icon: Building2
    }
  },
  {
    accessorKey: 'roles',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Roles' className="w-[310px]"  />
    ),
    cell: ({ row }) => {
      const roles = row.original.roles;
      return (
        <div className="flex flex-wrap gap-1">
          {roles.slice(0, 3).map((role,index) => {
              const key = `${role.id}-${index}`;
            const variant =
              role.baseRoleName === 'Clinician'
                ? 'pink'
                : role.baseRoleName === 'Admin'
                  ? 'orange'
                  : role.baseRoleName === 'therapist'
                    ? 'blue'
                    : role.baseRoleName === 'Super Admin'
                      ? 'purple'
                      : role.baseRoleName === 'Physician'
                        ? 'green'
                        : 'green';

            return (
              <Badge key={key} variant={variant} className="text-xs rounded">
                {role.name}
              </Badge>
            );
          })}
          {roles.length > 3 && (
            <Badge variant="default" className="text-xs text-muted-foreground bg-[var(--pri-grey-5)]">
              +{roles.length - 3}
            </Badge>
          )}
        </div>
      );
    },

    enableColumnFilter: false,
    meta: {
      label: 'Roles',
      variant: 'multiSelect'
    }
  },
  {
    accessorKey: 'organization',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Organization' />
    ),
    cell: ({ row }) => {
      const organization = row.original?.organization;
      return <div className="text-sm">{organization?.name ||''}</div>;
    },
    meta: {
      label: 'Organization',
      placeholder: 'Search organization...',
      variant: 'text',
      icon: Briefcase
    }
  },
  {
    accessorKey: 'status',
    header: ({ column }: { column: Column<User, unknown> }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === UserStatus.Active
          ? 'outline_completed'
          : status === UserStatus.Invited
            ? 'outline_pending'
            : 'outline_inactive';

      return (
        <Badge variant={variant} className="text-xs capitalize">
          {status}
        </Badge>
      );
    },
    meta: {
      label: 'Status',
      variant: 'select',
      options: Object.values(UserStatus).map((status) => ({
        label: status,
        value: status
      }))
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
