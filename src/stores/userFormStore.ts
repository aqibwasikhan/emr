import { create } from 'zustand';
import { persist } from 'zustand/middleware';
type UserFormState = {
  userData: any;
  setUserData: (data: any) => void;
  clearUserData: () => void;
  userId: number | null;
  setUserId: (id: number) => void;
  clearUserId: () => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useUserFormStore = create<UserFormState>()(
  persist(
    (set) => ({
      userData: null,
      setUserData: (data) => set({ userData: data }),
      clearUserData: () => set({ userData: null }),
      userId: null,
      setUserId: (id) => set({ userId: id }),
      clearUserId: () => set({ userId: null }),
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'user-form-storage',
      partialize: (state) => ({
        userData: state.userData,
        userId: state.userId
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
