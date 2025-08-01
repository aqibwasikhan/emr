// stores/getStoreReferences.ts
import { useAuthStore } from './useAuthStore';
import { useUserFormStore } from './userFormStore';
// import { useOtherStore } from './useOtherStore';

export function getStoreReferences() {
  return [
    useAuthStore,
    // useUserFormStore
    // useOtherStore,
  ];
}
