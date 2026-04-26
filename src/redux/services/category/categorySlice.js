import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "@/redux/customBaseQuery";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => ({
    // add category
    addCategory: builder.mutation({
      query: (formData) => ({
        url: "/create-category",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
    // get all categories
    getAllCategories: builder.query({
      query: () => ({
        url: "/get-allcategories",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    // Delete category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/delete-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    // update category
    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update-category/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
