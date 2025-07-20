'use client';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useMemo, useState } from 'react';
import { Facility } from '@/types/facilities';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Check, Plus } from 'lucide-react';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { CustomInput } from '@/components/ui/custom';

export function SelectFacilitiesSheet({
  selected,
  onConfirm,
  facilities,
}: {
  selected: Facility[];
  onConfirm: (rows: Facility[]) => void;
  facilities: Facility[];
}) {

  const [inputEditable, setInputEditable] = useState(false);
  const columns: ColumnDef<Facility>[] = [
    {
      id: 'select',
      size: 40,
      header: ({ table }) => {
        return (
          <div className="w-[40px] flex justify-center">
            <Checkbox
              checked={table.getIsAllRowsSelected()}
              onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
            />
          </div>
        );
      },
      cell: ({ row }) => (
        <div className="w-[40px] flex justify-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'facilityName',
      header: ({ column }: { column: Column<Facility, unknown> }) => (
        <DataTableColumnHeader column={column} title='Facility Name' />
      ),
      cell: ({ cell }) => <div>{cell.getValue<string>() || '--'}</div>,
      enableColumnFilter: true,
      meta: {
        label: 'Facility Name',
        placeholder: 'Search facility name...',
        variant: 'text'
      }
    },
    // {
    //   accessorKey: 'facilityType',
    //   header: ({ column }: { column: Column<Facility, unknown> }) => (
    //     <DataTableColumnHeader column={column} title='Facility Type' />
    //   ),
    //   cell: ({ cell }) => <div>{cell.getValue<string>()|| '--'}</div>,
    //   enableColumnFilter: true,
    //   meta: {
    //     label: 'Facility Type',
    //     placeholder: 'Search type...',
    //     variant: 'text'
    //   }
    // },
    {
      accessorKey: 'organizationName',
      header: ({ column }: { column: Column<Facility, unknown> }) => (
        <DataTableColumnHeader column={column} title='Organization' />
      ),
      cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
      enableColumnFilter: true,
      meta: {
        label: 'Facility Type',
        placeholder: 'Search type...',
        variant: 'text'
      }
    },
    {
      accessorKey: 'npiNumber',
      header: ({ column }: { column: Column<Facility, unknown> }) => (
        <DataTableColumnHeader column={column} title='Facility NPI' />
      ),
      cell: ({ cell }) => <div>{cell.getValue<string>()}</div>,
      enableColumnFilter: true,
      meta: {
        label: 'NPI Number',
        placeholder: 'Search NPI...',
        variant: 'text'
      }
    }
  ];

  const { table } = useDataTable({
    data: facilities,
    columns,
    pageCount: 1,
    manualFiltering: false,
    initialState: {
      rowSelection: Object.fromEntries(
        selected.map((f) => [f.id!, true])
      )
    }
  });

  const handleConfirm = () => {
    const selectedFacilities = table
      .getSelectedRowModel()
      .rows.map((row) => row.original);

    onConfirm(selectedFacilities);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary"><Plus /> Add Facilities</Button>
      </SheetTrigger>

      <SheetContent side="right" className="sm:max-w-[637px]! gap-3">
        <SheetHeader>
          <SheetTitle>Select Facilities</SheetTitle>
          <SheetDescription>
            Assign the user to facilities for role-based access control.
          </SheetDescription>
        </SheetHeader>
        <Separator className="mx-4" />

        <div className="px-4 pb-10 flex-1 ">
          <CustomInput
            placeholder={'Search facility Name...'}
            isSearch
            size="xs"
            className='w-full mb-4'
            onFocus={() => setInputEditable(true)}
            readOnly={!inputEditable} // Prevent keyboard until user taps
            inputClassName="pt-2"
            value={(table.getColumn("facilityName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("facilityName")?.setFilterValue(event.target.value)
            }
          />
          {/* <Input
            placeholder="Search facility Name..."
            value={(table.getColumn("facilityName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("facilityName")?.setFilterValue(event.target.value)
            }
            onFocus={() => setInputEditable(true)}
            readOnly={!inputEditable} // Prevent keyboard until user taps
            type='search'
            className="w-full mb-4"
          /> */}
          <DataTable
            table={table}
            pagination={false}
            enableRowClickSelection
          />
        </div>

        <SheetFooter className="mt-4 flex justify-between">
          <SheetClose asChild>
            <div className="page-container-footer">
              <Button
                variant="primary"
                size="lg"
                className="text-xs md:text-sm px-5!"
                onClick={handleConfirm}
              >
                <Check />
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
