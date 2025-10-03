import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ICollection } from "../../models/ICollection";

export const collectionAPI = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["collection"],
  endpoints: (builder) => ({
    getCollections: builder.query<ICollection[], void>({
      query: () => "collection",
      providesTags: ["collection"],
    }),
    getCollectionById: builder.query<ICollection, string>({
      query: (id) => `collection/${id}`,
      providesTags: (_, __, id) => [{ type: "collection", id }],
    }),
    addCollection: builder.mutation<ICollection, Omit<ICollection, "id">>({
      query: (body) => ({
        url: "collection",
        method: "POST",
        body,
      }),
      invalidatesTags: ["collection"],
    }),
    updateCollection: builder.mutation<
      ICollection,
      Pick<ICollection, "id"> & Partial<ICollection>
    >({
      query: ({ id, ...body }) => ({
        url: `collection/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: "collection", id }],
    }),
    deleteCollection: builder.mutation<void, string>({
      query: (id) => ({
        url: `collection/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "collection", id }],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionByIdQuery,
  useAddCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
} = collectionAPI;
