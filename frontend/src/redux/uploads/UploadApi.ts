import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
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
  endpoints: (builder) => ({
    uploadFile: builder.mutation<string, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
        responseHandler: async (response) => {
          return response.text();
        },
      }),
    }),
  }),
});

export const { useUploadFileMutation } = uploadApi;
