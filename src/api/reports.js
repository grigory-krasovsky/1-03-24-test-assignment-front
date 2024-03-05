import api from "./base-api";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        getReportsGroups: build.query({
            query: () => {
                return {
                    url: 'api/reports/avg-in-groups',
                    method: 'GET'
                }
            },
            providesTags: ['roles']
        }),
        getReportsStudents: build.query({
            query: () => {
                return {
                    url: 'api/reports/avg-grades',
                    method: 'GET'
                }
            },
            providesTags: ['roles']
        }),
    })
})

export const {
    useGetReportsGroupsQuery,
    useGetReportsStudentsQuery,
} = authApi;