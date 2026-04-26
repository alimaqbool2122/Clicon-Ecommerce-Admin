import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "@/redux/customBaseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (formData) => ({
        url: "/login",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
