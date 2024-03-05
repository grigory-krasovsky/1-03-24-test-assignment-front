import api from "./base-api";
import {ROLES} from "../utils/constants";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSubjects: build.query({
            query: () => {
                return {
                    url: 'api/subjects',
                    method: 'GET'
                }
            },
            providesTags: ['subjects'],
            transformResponse: (data) => {
                return data.map(item => {
                    const students = item.users.filter(user => user.role.some(role => role.displayName === ROLES.STUDENT)).map(i => i.groupResponse?.group);
                    const teachers = item.users.filter(user => user.role.some(role => role.displayName === ROLES.TEACHER)).map(i => i.username);
                    delete item.users;
                    return { ...item, students, teachers };
                });
            }
        }),
        deleteSubjects: build.mutation({
            query: ({id}) => {
                return {
                    url: `api/subjects/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['subjects']
        }),
        addSubject: build.mutation({
            query: ({body}) => {
                return {
                    url: `api/subjects`,
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: ['subjects']
        }),

    })
})

export const {
    useGetSubjectsQuery,
    useDeleteSubjectsMutation,
    useAddSubjectMutation,
} = authApi;