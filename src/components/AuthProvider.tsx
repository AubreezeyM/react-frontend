import { createContext, useEffect } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";

import type { AuthContextType } from "../types";
import type { PropsWithChildren } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useShallow } from "zustand/react/shallow";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
    const [isAuthenticated, setIsAuthenticated] = useAuthStore(
        useShallow((state) => [state.isAuthenticated, state.setIsAuthenticated])
    );

    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN)

        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refresh,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthenticated(true)
            } else {
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthenticated(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setIsAuthenticated(false);
            return;
        }
        const decoded = jwtDecode(token);
        if (!decoded || !decoded.exp) {
            console.log('Invalid token...')
            setIsAuthenticated(false);
            return;
        }
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthenticated(true);
        }
    };

    useEffect(() => {
        auth();
    }, []);

    const value: AuthContextType = {
        isAuthenticated,
        refreshToken,
        auth,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}