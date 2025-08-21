import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { userQueryOptions, profileQueryOptions } from '../queries/queryOptions'
import AuthRoute from "../components/AuthRoute";
import { useAuthStore } from "../stores/useAuthStore";

const UserPage = () => {
    const [id, setId] = useState(1);
    const { isAuthenticated } = useAuthStore();

    const userQuery = useQuery({
        ...userQueryOptions(id),
        enabled: isAuthenticated === true,
    })

    const profileQuery = useQuery({
        ...profileQueryOptions(id),
        enabled: isAuthenticated === true,
    })

    return (
        <AuthRoute>
            <div className="user-page">
                <h1 className="user-header">User Page</h1>
                {userQuery.isLoading && <p>Loading...</p>}
                {userQuery.isError && <p>Error loading user data.</p>}
                {userQuery.isSuccess && (
                    <div className="user-info">
                        <h3 className="user-username">{userQuery.data.username}</h3>
                        {profileQuery.isSuccess && (
                            <div className="user-profile">
                                <p className="user-bio">Bio: {profileQuery.data.bio}</p>
                            </div>
                        )}
                    </div>
                )}
                <button onClick={() => setId(id - 1)} className="user-next-button">
                    Prev user
                </button>
                <button onClick={() => setId(id + 1)} className="user-next-button">
                    Next user
                </button>
            </div>
        </AuthRoute>
    )
}

export default UserPage;