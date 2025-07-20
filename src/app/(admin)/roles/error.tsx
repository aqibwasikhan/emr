'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { IconAlertCircle } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

export default function Error({ error }: { error: Error }) {
  const pathname = usePathname();

  return (
    <Alert variant='destructive'>
      <IconAlertCircle className='h-4 w-4' />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Failed to load {pathname}: {error.message}
      </AlertDescription>
    </Alert>
  );
}
