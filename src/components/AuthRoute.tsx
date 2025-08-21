import React from "react";
import { useAuthStore } from "../stores/useAuthStore";
import type { PropsWithChildren } from "react";

const AuthRoute = ({ children }: PropsWithChildren) => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <p>Unauthorized.</p>;
}

export default AuthRoute;