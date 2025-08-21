import { create } from 'zustand';

interface AuthState {
    isAuthenticated: boolean | null;
    setIsAuthenticated: (isAuthenticated: boolean | null) => void;
    user: { id: string; name: string } | null;
    token: {
        access: string | null;
        refresh: string | null;
    };
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: null,
    setIsAuthenticated: (isAuthenticated: boolean | null) => set({ isAuthenticated }),
    user: null,
    token: {
        access: null,
        refresh: null
    }
}))