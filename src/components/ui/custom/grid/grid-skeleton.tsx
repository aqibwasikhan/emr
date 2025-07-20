import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { getResponsiveClasses, Grid, GridItem } from '.';
import { gridRows, rowSpan as rowSpans } from './preload-classes';

type IConfigType = 'grid' | 'item';

type IConfig = {
  type: IConfigType;
  className?: string;
  skeletonClassName?: string;
} & (
  | {
      type: 'grid';
      columns: number;
      rows: number;
      span?: never;
      rowSpan?: never;
    }
  | {
      type: 'item';
      columns?: never;
      rows?: never;
      span: number;
      rowSpan?: number;
    }
) & (
  | { child: IConfig[]; skeleton?: never; node?: never }
  | (
      | { child?: never; skeleton?: boolean; node?: never }
      | { child?: never; skeleton?: never; node: ReactNode }
    )
);

export const tableSkeletonConfig = ({
  rows,
  filledRows,
  columns,
  skeletonClassName,
  className,
}: {
  rows: number;
  filledRows: number;
  columns: ({ span: number; hideSkeleton?: boolean } | number)[]; // columns can be either object or number
  skeletonClassName?: string;
  className?: string;
}): IConfig => {
  const getCol = (col: { span: number; hideSkeleton?: boolean } | number) => {
    let defaultCol: { span: number; hideSkeleton?: boolean } = { span: 1, hideSkeleton: false };
    if (typeof col === 'number') {
      defaultCol.span = col;
    } else {
      defaultCol = col;
    }
    return defaultCol;
  };
  const gridColumns = columns.reduce((a: number, col) => {
    a += getCol(col).span;
    return a;
  }, 0);

  const skeletonCn = cn('bg-muted', skeletonClassName);

  const row = (child: IConfig[]) => {
    return {
      type: 'item' as const,
      span: gridColumns,
      child: [
        {
          type: 'grid' as const,
          columns: gridColumns,
          rows: 1,
          className: 'h-full p-2 gap-4 border-b',
          child,
        },
      ],
    };
  };

  const tableRows = Array.from({ length: filledRows }).flatMap(() =>
    row(
      columns.map((item) => ({
        type: 'item' as const,
        span: getCol(item).span,
        skeleton: !getCol(item).hideSkeleton,
        skeletonClassName: skeletonCn,
      }))
    )
  );

  return {
    type: 'grid' as const,
    className: cn('w-full h-full bg-backgprund border rounded-md gap-0 table-shadow', className),
    columns: gridColumns,
    rows,
    child: [
      row([{ type: 'item' as const, span: gridColumns, skeletonClassName: skeletonCn }]),
      ...tableRows,
    ],
  };
};

export const GridSkeleton = ({
  config,
  uniqueKey = '', // default to empty string if undefined
  globalSkeletonClassName,
}: {
  config: IConfig;
  uniqueKey?: string;
  globalSkeletonClassName?: string;
}) => {
  const {
    type,
    child,
    node,
    skeleton = true,
    className,
    skeletonClassName,
    columns,
    rows,
    rowSpan,
    span,
  } = config;
  const key = `${uniqueKey}-${type}`; // Fixed key concatenation
  const renderChild = () => {
    if (child)
      return child.map((item, i) => {
        const k = `${i}-${uniqueKey}`;
        return (
          <GridSkeleton
            key={k}
            uniqueKey={k}
            config={item}
            globalSkeletonClassName={globalSkeletonClassName}
          />
        );
      });
    if (node) return node;
    if (skeleton)
      return (
        <Skeleton
          className={cn('h-full w-full bg-muted', globalSkeletonClassName, skeletonClassName)}
        />
      );
    return <></>;
  };

  switch (type) {
    case 'grid':
      const rowClasses = getResponsiveClasses({ xs: rows }, gridRows);
      return (
        <Grid key={key} className={cn('gap-7.5', rowClasses, className)} columns={{ xs: columns }}>
          {renderChild()}
        </Grid>
      );
    case 'item':
      const rowSpanClasses = rowSpan && getResponsiveClasses({ xs: rowSpan }, rowSpans);
      return (
        <GridItem key={key} className={cn(rowSpanClasses, className)} xs={span}>
          {renderChild()}
        </GridItem>
      );
  }
  return <></>;
};


