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
import { useEffect, useMemo, useState } from 'react';
import { Facility } from '@/types/facilities';
import { Column, ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { Check, Plus } from 'lucide-react';
import { useDataTable } from '@/hooks/use-data-table';
import { DataTable } from '@/components/ui/table/data-table';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
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
  const [open, setOpen] = useState(false);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  // console.log('selected', selected,
  //   Object.fromEntries(
  //     selected.map((f) => [f.id!, true])
  //   )
  // )
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
      cell: ({ cell }) => <div>{cell.getValue<string>() || 'N/A'}</div>,
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
    initialState: {},
    rowSelection,
    onRowSelectionChange: setRowSelection,
    getRowId: (row) => row.id ? String(row.id) : ''
  });

  useEffect(() => {
    if (open) {
      setRowSelection(
        Object.fromEntries(
          selected.map((f) => [f.id!, true])
        )
      );
    }
  }, [open, selected]);

  const handleConfirm = () => {
    const selectedFacilities = table
      .getSelectedRowModel()
      .rows.map((r) => r.original);
    onConfirm(selectedFacilities);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary"><Plus />{selected.length == 0 ? 'Add Facilities' : 'Add More Facilities'}</Button>
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
            type='search'
            onFocus={() => setInputEditable(true)}
            readOnly={!inputEditable} // Prevent keyboard until user taps
            inputClassName="pt-2"
            value={(table.getColumn("facilityName")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("facilityName")?.setFilterValue(event.target.value)
            }
          />
          <DataTable
            table={table}
            pagination={false}
            enableRowClickSelection
          />
        </div>

        <SheetFooter className="mt-4 flex justify-between">
          <SheetClose asChild>
            <div className="page-container-footer rounded-bl-xl">
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
