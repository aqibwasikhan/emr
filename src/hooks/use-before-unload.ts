// hooks/use-before-unload.ts
import { useEffect } from 'react';

/**
 * Hook to prevent navigation or refresh when enabled.
 * 
 * @param shouldWarn - If true, the browser shows a confirm dialog.
 * @param message - The message to show in the native confirm dialog.
 */
export function useBeforeUnload(shouldWarn: boolean, message: string = 'Are you sure you want to leave?') {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!shouldWarn) return;
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    if (shouldWarn) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [shouldWarn, message]);
}
