'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { serialize } from '@/lib/searchparams';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import isEqual from 'lodash.isequal';
import { ReactNode, forwardRef } from 'react';
type InfiniteScrollContainerProps<T> = {
  initialItems: T[];
  total: number;
  initialPage: number;
  limit: number;
  filters?: Record<string, any>;
  refreshKey?: number; // ✅ Trigger to force full refresh from parent
  fetchPage: (page: number, limit: number, filters: Record<string, any>) => Promise<T[]>;
  renderItem: (item: T, index: number) => React.ReactNode;
  renderFirstItem?: () => React.ReactNode;
  renderSkeleton?: (key: number) => React.ReactNode;
  firstItem?: boolean;
  className?: string;
  showNoResultFound?: boolean;
  highlightedItemId?: string | number;

};
type ScrollLayoutWrapperProps = {
  children: ReactNode;
  className?: string;
  viewportRef?: React.Ref<HTMLDivElement>;
};
export function InfiniteScrollContainer<T>({
  initialItems,
  total,
  initialPage,
  limit,
  filters = {},
  refreshKey,
  fetchPage,
  renderItem,
  renderFirstItem,
  renderSkeleton,
  firstItem = false,
  className,
  showNoResultFound = true,
  highlightedItemId

}: InfiniteScrollContainerProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const prevFiltersRef = useRef(filters);
  const prevRefreshKeyRef = useRef(refreshKey);
  const isResettingRef = useRef(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const scrollViewportRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const maxPage = Math.ceil(total / limit);

  useEffect(() => {
    const filtersChanged = !isEqual(prevFiltersRef.current, filters);
    const refreshKeyChanged = prevRefreshKeyRef.current !== refreshKey;

    if (filtersChanged || refreshKeyChanged) {
      isResettingRef.current = true;

      (async () => {
        setLoading(true);
        console.log('first one')

        const newItems = await fetchPage(1, limit, filters);
        setItems(newItems);
        setPage(1);
        setLoading(false);
        isResettingRef.current = false;

        prevFiltersRef.current = filters;
        prevRefreshKeyRef.current = refreshKey;

        router.replace(`${serialize({ page: 1, ...filters })}`, { scroll: false });
      })();
    }
  }, [filters, refreshKey, fetchPage, limit, router]);


  // 🔁 INFINITE SCROLL LOGIC
  useEffect(() => {
    if (!sentinelRef.current || !scrollViewportRef.current) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        const hasMore = items.length < total && page < maxPage;

        if (
          entry.isIntersecting &&
          !loading &&
          hasMore &&
          !isResettingRef.current // ✅ prevent during reset
        ) {
          setLoading(true);
          const nextPage = page + 1;
          console.log('second one')
          const newItems = await fetchPage(nextPage, limit, filters);

          if (newItems.length === 0) {
            setLoading(false);
            return;
          }

          setItems(prev => [...prev, ...newItems]);
          setPage(nextPage);
          setLoading(false);

          router.replace(`${serialize({ page: nextPage, ...filters })}`, { scroll: false });
        }
      },
      {
        root: scrollViewportRef.current,
        rootMargin: '100px',
      }
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [items, loading, page, total, limit, maxPage, fetchPage, filters, router]);

  return (
    <ScrollLayoutWrapper className={className} viewportRef={scrollViewportRef}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {firstItem && renderFirstItem?.()}
        {/* {items.map((item, index) => renderItem(item, index))} */}
        {items.map((item, index) => {
          const isHighlighted = highlightedItemId && (item as any).id === highlightedItemId;
          return (
            <div key={(item as any).id} className={isHighlighted ? 'animate-fadeInLeft' : ''}>
              {renderItem(item, index)}
            </div>
          );
        })}

        {/* ✅ Show "No Results" if there’s nothing to show */}

      </div>
      {!loading && items.length === 0 && showNoResultFound && (
        <div className="col-span-full text-center text-muted-foreground py-10">
          No results found.
        </div>
      )}
      {items.length < total && (
        <div ref={sentinelRef} className="flex justify-center items-center w-full py-6">
          {loading && renderSkeleton && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              {Array.from({ length: limit }).map((_, i) => renderSkeleton(i))}
            </div>
          )}
        </div>
      )}

    </ScrollLayoutWrapper>
  );
}
export const ScrollLayoutWrapper = forwardRef<HTMLDivElement, ScrollLayoutWrapperProps>(
  ({ children, className, viewportRef }, ref) => {
    return (
      <div className={cn('absolute inset-0 flex overflow-hidden no-scrollbar', className)} ref={ref}>
        <ScrollArea className="h-full w-full">
          <ScrollArea.Viewport ref={viewportRef} className="h-full w-full space-y-6">
            {children}
          </ScrollArea.Viewport>
        </ScrollArea>
      </div>
    );
  }
);

ScrollLayoutWrapper.displayName = 'ScrollLayoutWrapper';