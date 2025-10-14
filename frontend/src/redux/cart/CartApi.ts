import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ICart,
  AddItemBody,
  AddItemArgs,
  DeleteItemArgs,
  DeleteItemBody,
} from "../../models/ICart";
import type { IItem } from "../../models/IItem";

export const cartAPI = createApi({
  reducerPath: "cartApi",
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
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCarts: builder.query<ICart[], void>({
      query: () => "cart",
      providesTags: ["Cart"],
    }),
    getCartByUser: builder.query<ICart, void>({
      query: () => `cart`,
      providesTags: [{ type: "Cart", id: "USER_CART" }],
    }),
    findAllItems: builder.query<IItem[], number>({
      query: (cartId) => `cart/item/${cartId}`,
      providesTags: ["Cart"],
    }),
    addItem: builder.mutation<ICart, AddItemArgs>({
      query: ({ userId, itemId, quantityToAdd }) => {
        const body: AddItemBody = { itemId, quantityToAdd };

        return {
          url: `cart/${userId}/item`,
          method: "POST",
          body: body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    deleteItem: builder.mutation<ICart, DeleteItemArgs>({
      query: ({ userId, itemId }) => {
        const body: DeleteItemBody = { itemId };

        return {
          url: `cart/${userId}/item`,
          method: "DELETE",
          body: body,
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartsQuery,
  useGetCartByUserQuery,
  useFindAllItemsQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = cartAPI;
