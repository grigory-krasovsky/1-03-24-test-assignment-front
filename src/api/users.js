import api from "./base-api";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => {
                return {
                    url: 'api/users',
                    method: 'GET'
                }
            },
            providesTags: ['users']
        }),
        deleteUser: build.mutation({
            query: ({id}) => {
                debugger
                return {
                    url: `api/users/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['users']
        }),
        addUser: build.mutation({
            query: ({body}) => {
                debugger
                return {
                    url: `api/users`,
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: ['users']
        }),
    })
})

export const {
    useGetUsersQuery,
    useDeleteUserMutation,
    useAddUserMutation,
} = authApi;