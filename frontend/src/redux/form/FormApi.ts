import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { EmailCredentials } from "../../models/IEmail";

export const emailApi = createApi({
  reducerPath: "emailAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["send"],
  endpoints: (builder) => ({
    sendEmail: builder.mutation<EmailCredentials, EmailCredentials>({
      query: ({ email, name, message }) => ({
        url: `/send`,
        method: "POST",
        body: { email, name, message },
      }),
    }),
  }),
});

export const { useSendEmailMutation } = emailApi;
