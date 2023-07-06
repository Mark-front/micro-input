import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Task } from '../types';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:3000/',
        }
    ),
    endpoints: (builder) => ({
        getTask: builder.query<Task, string | undefined | null>({
            query: (id) => `tasks/${id}`,
        }),
    }),
})

export const { useGetTaskQuery } = api