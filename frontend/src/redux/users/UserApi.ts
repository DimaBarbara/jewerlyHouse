import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IUser } from "../../models/IUser";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "user",
      providesTags: ["User"],
    }),
    getUserById: builder.query<IUser, string>({
      query: (id) => `user/${id}`,
      providesTags: (_, __, id) => [{ type: "User", id }],
    }),
    addUser: builder.mutation<IUser, Omit<IUser, "id">>({
      query: (body) => ({
        url: "user",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation<IUser, Pick<IUser, "id"> & Partial<IUser>>({
      query: ({ id, ...body }) => ({
        url: `user/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "User", id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userAPI;
