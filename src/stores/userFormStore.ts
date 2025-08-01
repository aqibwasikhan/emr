import { create } from 'zustand';

type UserFormState = {
  userData: any;
  setUserData: (data: any) => void;
  clearUserData: () => void;

  userId: number | undefined | null;
  setUserId: (id: number | undefined | null) => void;
  clearUserId: () => void;

  orgId: string | null;
  setOrgId: (id: string) => void;
  clearOrgId: () => void;

  userFacilities: any[];
  setUserFacilities: (facilities: any[]) => void;
  clearUserFacilities: () => void;

  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;

  reset: () => void;
};

export const useUserFormStore = create<UserFormState>((set) => ({
  userData: null,
  setUserData: (data) => set({ userData: data }),
  clearUserData: () => set({ userData: null }),

  userId: null,
  setUserId: (id) => set({ userId: id }),
  clearUserId: () => set({ userId: null }),

  orgId: null,
  setOrgId: (id) => set({ orgId: id }),
  clearOrgId: () => set({ orgId: null }),

  userFacilities: [],
  setUserFacilities: (facilities) => set({ userFacilities: facilities }),
  clearUserFacilities: () => set({ userFacilities: [] }),

  hasHydrated: false,
  setHasHydrated: (state) => set({ hasHydrated: state }),

  reset: () =>
    set({
      userData: null,
      userId: null,
      orgId: null,
      userFacilities: [],
      hasHydrated: false,
    }),
}));
