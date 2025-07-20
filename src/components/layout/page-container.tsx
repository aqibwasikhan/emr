import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export default function PageContainer({
  children,
  scrollable = true,
  className = ''
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
}) {
  return (
    <>
      {scrollable ? (
        <ScrollArea className='h-[calc(100dvh-72px)] overflow-auto no-scrollbar'>
          <div className={cn('flex flex-1 p-4 md:px-6 m-4 md:m-6 rounded bg-card', className)}>
            {children}</div>
        </ScrollArea>
      ) : (
        <div className={cn('flex flex-1 p-4 md:px-6 m-4 md:m-6 rounded bg-card', className)}>{children}</div>
      )}
    </>
  );
}
