import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IItem } from "../../models/IItem";

export const itemAPI = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    getItems: builder.query<IItem[], void>({
      query: () => "items",
      providesTags: ["Item"],
    }),
    getItemById: builder.query<IItem, string>({
      query: (id) => `items/${id}`,
      providesTags: (_, __, id) => [{ type: "Item", id }],
    }),
    findByCategory: builder.query<IItem[], string>({
      query: (category) => `items/${category}`,
      providesTags: (_, __, category) => [{ type: "Item", category }],
    }),
    addItem: builder.mutation<IItem, Omit<IItem, "id">>({
      query: (body) => ({
        url: "items",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Item"],
    }),
    updateItem: builder.mutation<IItem, Pick<IItem, "id"> & Partial<IItem>>({
      query: ({ id, ...body }) => ({
        url: `items/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "Item", id }],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Item", id }],
    }),
  }),
});

export const {
  useFindByCategoryQuery,
  useGetItemsQuery,
  useGetItemByIdQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemAPI;
