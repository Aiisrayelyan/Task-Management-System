import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Task } from '../types/Task';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], void>({
      query: () => 'tasks',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks', id } as const)),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],      
    }),
    getTaskById: builder.query<Task, number>({
      query: (id) => `tasks/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tasks', id }],
    }),
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: 'tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }],
    }),
    updateTask: builder.mutation<Task, Task>({
      query: ({ id, ...rest }) => ({
        url: `tasks/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Tasks', id },
        { type: 'Tasks', id: 'LIST' },
      ],      
    }),
    deleteTask: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Tasks', id },
        { type: 'Tasks', id: 'LIST' },
      ],      
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
