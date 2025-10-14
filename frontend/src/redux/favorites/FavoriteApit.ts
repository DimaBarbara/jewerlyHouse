import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IFavoriteItem } from "../../models/IFavoriteItem";

export const favoritesAPI = createApi({
  reducerPath: "favoritesApi",
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

  tagTypes: ["Favorites"],

  endpoints: (builder) => ({
    getFavorites: builder.query<IFavoriteItem[], void>({
      query: () => "favorites",
      providesTags: ["Favorites"],
    }),

    addItemToFavorites: builder.mutation<IFavoriteItem, number>({
      query: (itemId) => ({
        url: `favorites/${itemId}`,
        method: "POST",
      }),
      invalidatesTags: ["Favorites"],
    }),

    removeItemFromFavorites: builder.mutation<void, number>({
      query: (itemId) => ({
        url: `favorites/${itemId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorites"],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddItemToFavoritesMutation,
  useRemoveItemFromFavoritesMutation,
} = favoritesAPI;
