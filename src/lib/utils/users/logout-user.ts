import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getStoreReferences } from '@/stores/getStoreReferences';

export async function logoutUser(router: ReturnType<typeof useRouter>) {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });

    for (const store of getStoreReferences()) {
      // Clear persisted storage
      if (store.persist?.clearStorage) {
        await store.persist.clearStorage();
      }

      // Call reset method
      store.getState().reset();
    }

    toast.success('Logged out successfully');
    router.push('/auth/sign-in');
  } catch (err) {
    console.error('Logout failed:', err);
    toast.error('Logout failed. Try again.');
  }
}
