import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "@/redux/customBaseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    // add product
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/create-product",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
    // get all products
    getAllProducts: builder.query({
      query: () => ({
        url: "/get-all-products",
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    // Delete products
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete-product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    // update products
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update-product/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
