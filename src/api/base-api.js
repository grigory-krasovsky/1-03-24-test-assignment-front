import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("jwt")
        if (token) headers.set("Authorization", `Bearer ${token}`)
        return headers
    }
})

const api = createApi({
    baseQuery: (args, api, extraOptions) => rawBaseQuery({...args}, api, extraOptions),
    endpoints: () => ({})
})

export default api