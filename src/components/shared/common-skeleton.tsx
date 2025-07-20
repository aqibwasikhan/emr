'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CommonSkeletonProps {
  lines?: number;  // Number of content lines to render
  withAvatar?: boolean;  // Show avatar circle at top
}

export function CommonSkeleton({ lines = 3, withAvatar = true }: CommonSkeletonProps) {
  return (
    <Card className="py-4 rounded-2xl">
      <CardHeader className="space-y-2 flex items-start gap-4">
        {withAvatar && (
          <Skeleton className="flex items-center justify-center rounded-full size-12" />
        )}
        <div className="flex-1 space-y-1">
          <Skeleton className="h-6 w-1/2" /> {/* Title skeleton */}
          <Skeleton className="h-4 w-1/3" /> {/* Subtitle / code skeleton */}
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {[...Array(lines)].map((_, i) => (
          <Skeleton key={i} className={`h-3 ${i % 2 === 0 ? 'w-5/6' : 'w-2/3'}`} />
        ))}
      </CardContent>
    </Card>
  );
} 