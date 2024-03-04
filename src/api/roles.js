import api from "./base-api";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRoles: build.query({
            query: () => {
                return {
                    url: 'api/roles',
                    method: 'GET'
                }
            },
            providesTags: ['roles']
        }),
    })
})

export const {
    useGetRolesQuery,
} = authApi;