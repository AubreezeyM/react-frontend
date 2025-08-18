import { queryOptions } from "@tanstack/react-query";
import api from "../api";

const userQueryOptions = (id) => {
    return queryOptions({
        queryKey: ['users', id],
        queryFn: async () => fetchUser(id)
    })
}

const fetchUser = async (id) => {
    response = api.get(`/users/${id}`);
    return response.json()
}

export default userQueryOptions;