import { createContext, useState, useEffect, useContext } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

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

    const value = {
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