import { createApi } from "@reduxjs/toolkit/query/react";
import { customBaseQuery } from "@/redux/customBaseQuery";

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: customBaseQuery,
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    // add banner
    addBanner: builder.mutation({
      query: (formData) => ({
        url: "/create-banner",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),
    // Get all banners
    getAllBanners: builder.query({
      query: () => ({
        url: "/get-banners",
        method: "GET",
      }),
      providesTags: ["Banner"],
    }),
    // Delete banner
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/delete-banner/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
    // update banner
    updateBanner: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update-banner/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useAddBannerMutation,
  useGetAllBannersQuery,
  useDeleteBannerMutation,
  useUpdateBannerMutation,
} = bannerApi;
