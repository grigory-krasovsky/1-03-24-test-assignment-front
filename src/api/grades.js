import api from "./base-api";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        getGrades: build.query({
            query: () => {
                return {
                    url: 'api/grades',
                    method: 'GET'
                }
            },
            providesTags: ['grades'],
            transformResponse: (data) => {
                return data.sort((a, b) => a.subjectName.localeCompare(b.subjectName));
            }
        }),
        rateStudent: build.mutation({
            query: ({body}) => {
                return {
                    url: 'api/grades/rate',
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: ['grades']
        }),

    })
})

export const {
    useGetGradesQuery,
    useRateStudentMutation,
} = authApi;