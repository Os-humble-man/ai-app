import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
   user: {
      id: string;
      email: string;
      name: string;
      avatarUrl?: string;
   } | null;
   token: string | null;
   isLoading: boolean;
   error: string | null;
};

type AuthAction = {
   setUser: (user: AuthState['user']) => void;
   setToken: (token: string | null) => void;
   setLoading: (isLoading: boolean) => void;
   setError: (error: string | null) => void;
};

const initialState: AuthState = {
   user: null,
   token: null,
   isLoading: false,
   error: null,
};

export const useAuthStore = create<AuthState & AuthAction>()(
   persist(
      (set) => ({
         ...initialState,
         setUser: (user) => set({ user }),
         setToken: (token) => set({ token }),
         setLoading: (isLoading) => set({ isLoading }),
         setError: (error) => set({ error }),
      }),
      {
         name: 'auth-storage',
         partialize: (state) => ({
            user: state.user,
            token: state.token,
         }),
      }
   )
);
