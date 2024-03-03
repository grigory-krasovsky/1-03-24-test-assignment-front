import api from "./base-api";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => {
                return {
                    url: 'api/users',
                    method: 'GET'
                }
            }
        }),
    })
})

export const {
    useGetUsersQuery,
} = authApi;