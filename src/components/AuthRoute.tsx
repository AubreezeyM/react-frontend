import React from "react";
import { useAuth } from "./AuthProvider";
import type { PropsWithChildren } from "react";

const AuthRoute = ({ children }: PropsWithChildren) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <p>Unauthorized.</p>;
}

export default AuthRoute;