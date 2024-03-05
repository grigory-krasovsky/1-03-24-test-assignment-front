import api from "./base-api";
import {ROLES} from "../utils/constants";

const authApi = api.injectEndpoints({
    endpoints: (build) => ({
        addGroup: build.mutation({
            query: ({body}) => {
                return {
                    url: `api/groups`,
                    method: 'POST',
                    body: body
                }
            },
            invalidatesTags: ['groups']
        }),
        deleteGroups: build.mutation({
            query: ({id}) => {
                return {
                    url: `api/groups/${id}`,
                    method: 'DELETE'
                }
            },
            invalidatesTags: ['groups']
        }),
        getGroups: build.query({
            query: () => {
                return {
                    url: 'api/groups',
                    method: 'GET'
                }
            },
            providesTags: ['groups'],
            transformResponse: (data) => {
                return data.map(item => {
                    const students = item.users.filter(user => user.role.some(role => role.displayName === ROLES.STUDENT)).map(i => i.username);
                    delete item.users;
                    return { ...item, students };
                });
            }
        }),

    })
})

export const {
    useAddGroupMutation,
    useGetGroupsQuery,
    useDeleteGroupsMutation,
} = authApi;