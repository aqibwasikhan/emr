// import { cn } from '@/lib/utils';

// function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
//   return (
//     <div
    
//       data-slot='skeleton'
//       className={cn('bg-ring animate-pulse rounded-md opacity-5', className)}
//       {...props}
//     />
//   );
// }

// export { Skeleton };
import { cn } from '@/lib/utils';

function Skeleton({
  className,
  testId,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { testId?: string }) {
  return (
    <div
      data-testid={testId}
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };