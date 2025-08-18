import React, { useState } from "react";
import { useQuery } from '@tanstack/react-query';
import userQueryOptions from '../queries/queryOptions'

const UserCard = () => {
    const [id, setId] = useState(2);
    const query = useQuery(userQueryOptions(id))

    return (
        <>
            <p>{query.data}</p>
        </>
    )
}

export default UserCard