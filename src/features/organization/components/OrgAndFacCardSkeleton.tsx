'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function OrgAndFacCardSkeleton() {
  return (
    <Card className='py-4'>
      <CardHeader className="space-y-2 flex items-start gap-4">
        <Skeleton className="flex items-center justify-center rounded-full size-12 text-lg font-medium text-muted-foreground">
        </Skeleton>
        <div className="flex-1 space-y-1">
          <Skeleton className="h-6 w-1/2" />    {/* Simulate org name */}
          <Skeleton className="h-4 w-1/3" />    {/* Simulate subtitle / code */}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-3 w-full" />   {/* Simulate description lines */}
        <Skeleton className="h-3 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
    </Card>
  );
}
