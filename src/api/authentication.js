import api from "./base-api";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        authenticate: build.mutation({
            query: ({username, password}) => {
                return {
                    url: 'api/authenticate',
                    method: 'POST',
                    body: {username, password}
                }
            }
        }),
    })
})

export const {
    useAuthenticateMutation,
} = authApi;