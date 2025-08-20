import React, { useEffect, useState } from "react";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { Navigate } from "react-router";

const AuthRoute = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        auth();
    }, []);

    const refreshToken = async () => {
        const refresh = localStorage.getItem(REFRESH_TOKEN)

        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refresh,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setAuthenticated(true)
            } else {
                setAuthenticated(false)
            }
        } catch (error) {
            console.log(error);
            setAuthenticated(false);
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            setAuthenticated(false);
            return;
        }
        const decoded = jwtDecode(token);
        if (!decoded || !decoded.exp) {
            console.log('Invalid token...')
            setAuthenticated(false);
            return;
        }
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setAuthenticated(true);
        }
    };

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <p>Unauthorized.</p>;
}


export default AuthRoute;