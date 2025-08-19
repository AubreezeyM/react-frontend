import React, { useState } from "react";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

const AuthRoute = ({ children }) => {
    const [isAuthenticated, setAuthenticated] = useState(null);

    const refreshToken = async () => {
        refresh = localStorage.getItem(REFRESH_TOKEN)

        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }

        const auth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);
            if (!token) {
                setIsAuthorized(false);
                return;
            }
            const decoded = jwtDecode(token);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                await refreshToken();
            } else {
                setIsAuthorized(true);
            }
        };

        if (isAuthorized === null) {
            return <div>Loading...</div>;
        }

        return isAuthorized ? children : <Navigate to="/login" />;
    }
}

export default AuthRoute;