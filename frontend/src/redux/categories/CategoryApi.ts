import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICategory } from "../../models/ICategory";

export const categoryAPI = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["category"],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => "category",
      providesTags: ["category"],
    }),
    getCategoryById: builder.query<ICategory, string>({
      query: (id) => `category/${id}`,
      providesTags: (result, error, id) => [{ type: "category", id }],
    }),
    addCategory: builder.mutation<ICategory, Omit<ICategory, "id">>({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation<ICategory, Pick<ICategory, "id"> & Partial<ICategory>>({
      query: ({ id, ...body }) => ({
        url: `category/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "category", id }],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "category", id }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryAPI;
