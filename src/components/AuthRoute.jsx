import React from "react";
import { useAuth } from "../components/AuthProvider";

const AuthRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <p>Unauthorized.</p>;
}


export default AuthRoute;