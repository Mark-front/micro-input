import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Answer, Step, Task } from '../types';

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
        getStep: builder.query<Step, string | undefined | null>({
            query: (id) => ({
                url: `steps/${id}`,
                params: {
                    stepID: id,
                },
            }),
        }),
        postAnswer: builder.mutation<Answer, Partial<Answer>>({
            query: (body) => {
                return {
                    url: 'answers',
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
})

export const { useGetTaskQuery, usePostAnswerMutation, useGetStepQuery } = api