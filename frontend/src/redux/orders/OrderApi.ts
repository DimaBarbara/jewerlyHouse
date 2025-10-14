import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IOrder } from "../../models/IOrder";

export const orderAPI = createApi({
  reducerPath: "orderApi",
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
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query<IOrder, void>({
      query: () => "order",
      providesTags: ["Order"],
    }),
    getOrderById: builder.query<IOrder, string>({
      query: (id) => `order/${id}`,
      providesTags: (_, __, id) => [{ type: "Order", id }],
    }),
    addOrder: builder.mutation<IOrder, Omit<IOrder, "id">>({
      query: (body) => ({
        url: "order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    updateOrder: builder.mutation<IOrder, Pick<IOrder, "id"> & Partial<IOrder>>(
      {
        query: ({ id, ...body }) => ({
          url: `order/${id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: (_, __, { id }) => [{ type: "Order", id }],
      },
    ),
    deleteOrder: builder.mutation<void, string>({
      query: (id) => ({
        url: `order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [{ type: "Order", id }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderAPI;
