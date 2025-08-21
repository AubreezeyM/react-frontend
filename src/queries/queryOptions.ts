import { queryOptions } from "@tanstack/react-query";
import api from "../api";

const userQueryOptions = (id: number) => {
    return queryOptions({
        queryKey: ['users', id],
        queryFn: async () => fetchUser(id),
    })
}

const profileQueryOptions = (id: number) => {
    return queryOptions({
        queryKey: ['profile', id],
        queryFn: async () => fetchProfile(id),
    })
}

const fetchProfile = async (id: number) => {
    const response = await api.get(`api/profile/${id}`);
    return response.data;
}

const fetchUser = async (id: number) => {
    const response = await api.get(`api/users/${id}`);
    return response.data;
}

export { userQueryOptions, profileQueryOptions };