import api from "./base-api";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRoles: build.query({
            query: () => {
                return {
                    url: 'api/users',
                    method: 'GET'
                }
            },
            providesTags: ['users']
        }),
    })
})

export const {
    useGetRolesQuery,
} = authApi;