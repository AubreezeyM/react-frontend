import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import { userQueryOptions, profileQueryOptions } from '../queries/queryOptions'
import AuthRoute from "../components/AuthRoute";

const UserPage = () => {
    const [id, setId] = useState(1);
    const userQuery = useQuery(userQueryOptions(id))
    const profileQuery = useQuery(profileQueryOptions(id))

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
            </div>
        </AuthRoute>
    )
}

export default UserPage;