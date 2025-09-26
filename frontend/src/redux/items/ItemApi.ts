import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IItem } from "../../models/IItem";

export const itemAPI = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Item"],
  endpoints: (builder) => ({
    getItems: builder.query<IItem[], void>({
      query: () => "items",
      providesTags: ["Item"],
    }),
    getItemById: builder.query<IItem, string>({
      query: (id) => `item/${id}`,
      providesTags: (result, error, id) => [{ type: "Item", id }],
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
      invalidatesTags: (result, error, { id }) => [{ type: "Item", id }],
    }),
    deleteItem: builder.mutation<void, string>({
      query: (id) => ({
        url: `items/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Item", id }],
    }),
  }),
});

export const {
  useGetItemsQuery,
  useGetItemByIdQuery,
  useAddItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
} = itemAPI;
