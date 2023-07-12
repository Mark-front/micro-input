import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Task } from '../types';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: location.origin,
        }
    ),
    endpoints: (builder) => ({
        getTask: builder.query<{ tasks: Task[] }, string | undefined | null>({
            query: (id) => '/db.json',
        }),
    }),
})

export const { useGetTaskQuery } = api