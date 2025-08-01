// stores/useAuthStore.ts
import { AuthUser } from '@/types/user';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
  reset: () => void; // ✅ Add this
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (userData) => set({ user: userData }),
      logout: () => set({ user: null }),
      reset: () => set({ user: null }) // ✅ Implement reset
    }),
    {
      name: 'auth-store',
    }
  )
);