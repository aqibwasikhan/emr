'use client';

import { Table } from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons-react';

interface DataTableNumberedPaginationProps<TData> {
  table: Table<TData>;
  siblingCount?: number;
  pageSizeOptions?: number[];
  className?: string;
}

export function DataTableNumberedPagination<TData>({
  table,
  siblingCount = 1,
  pageSizeOptions = [10, 20, 30, 40, 50],
  className,
}: DataTableNumberedPaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex;
  const totalPages = table.getPageCount();

  const createPageRange = () => {
    const pages: (number | string)[] = [];
    const DOTS = '...';

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages - 2);

    pages.push(1);

    if (leftSiblingIndex > 2) pages.push(DOTS);

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i + 1);
    }

    if (rightSiblingIndex < totalPages - 2) pages.push(DOTS);

    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  const pageRange = createPageRange();

  return (
    <div className={cn('flex w-full items-center justify-between  py-1', className)}>
      {/* LEFT: Pagination */}
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          className='text-sm rounded-xl'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <IconArrowNarrowLeft  className="h-5 w-5" />
          Previous
        </Button>

        {pageRange.map((page, idx) =>
          page === '...' ? (
            <span key={idx} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={idx}
              variant={currentPage + 1 === page ? 'default' : 'ghost'}
              className="w-8 h-8 text-sm rounded-xl"
              onClick={() => table.setPageIndex(Number(page) - 1)}
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="ghost"
          onClick={() => table.nextPage()}
          className='text-sm rounded-xl'
          disabled={!table.getCanNextPage()}
        >
          Next
          <IconArrowNarrowRight  className="h-5 w-5" />
        </Button>
      </div>

      {/* RIGHT: Page size */}
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>Show:</span>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[6.5rem] border-none">
            <SelectValue placeholder={`${table.getState().pagination.pageSize} Items`} />
          </SelectTrigger>
          <SelectContent>
            {pageSizeOptions.map((option) => (
              <SelectItem key={option} value={`${option}`}>
                {option} Items
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
