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
        getTask: builder.query<{ test_question: { audio: string }, tasks: Task[] }, string | undefined | null>({
            // @ts-ignore
            query: (id) => `${window.settingsForMicro.testPath}`,
        }),
    }),
})

export const { useGetTaskQuery } = api