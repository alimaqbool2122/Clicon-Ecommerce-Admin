"use client";
import { ArrowDown, ArrowRightIcon } from "@/components/svg/Icons";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import {
  useAddBannerMutation,
  useUpdateBannerMutation,
  useGetAllBannersQuery,
} from "@/redux/services/banner/bannerSlice";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const BannerForm = () => {
  const [addBanner, { isLoading: isAdding }] = useAddBannerMutation();
  const [updateBanner, { isLoading: isUpdating }] = useUpdateBannerMutation();
  const { data: banners } = useGetAllBannersQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [editingBanner, setEditingBanner] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (editId && banners?.data) {
      const bannerToEdit = banners.data.find((b) => b._id === editId);
      if (bannerToEdit) {
        setEditingBanner(bannerToEdit);
        setValue("title", bannerToEdit.title);
        setValue("subtitle", bannerToEdit.subtitle);
        setValue("description", bannerToEdit.description);
        setValue("price", bannerToEdit.price);
        setValue("status", bannerToEdit.status ? "true" : "false");
      }
    }
  }, [editId, banners, setValue]);

  const isEditMode = !!editId;

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data[key] instanceof FileList && data[key].length > 0) {
          formData.append(key, data[key][0]);
        } else if (!(data[key] instanceof FileList)) {
          formData.append(key, data[key]);
        }
      }
      
      if (isEditMode) {
        const response = await updateBanner({ id: editId, formData }).unwrap();
        toast.success(response.message);
      } else {
        const response = await addBanner(formData).unwrap();
        toast.success(response.message);
      }

      setTimeout(() => {
        router.push(ROUTES.BANNER_LIST);
      }, 2000);
      reset();
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {isEditMode ? "Update Banner" : "Add Banner"}
        </h2>
        <nav>
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                href={ROUTES.DASHBOARD}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500"
              >
                Home
                <ArrowRightIcon />
              </Link>
            </li>
            <li className="text-sm text-gray-800 ">
              {isEditMode ? "Update Banner" : "Add Banner"}
            </li>
          </ol>
        </nav>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-800">
              {isEditMode ? `Editing: "${editingBanner?.title || ""}"` : "Banner Description"}
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* banner title */}
              <div>
                <label
                  htmlFor="banner-name"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Banner Title
                </label>
                <input
                  type="text"
                  id="banner-name"
                  className={`h-11 w-full rounded-lg border ${errors.title ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="Enter banner title"
                  {...register("title", {
                    required: "Banner title is required",
                  })}
                />
                {errors.title && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.title.message}
                  </span>
                )}
              </div>
              {/* banner subtitle */}
              <div>
                <label
                  htmlFor="banner-subtitle"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Banner Subtitle
                </label>
                <input
                  type="text"
                  id="banner-subtitle"
                  className={`h-11 w-full rounded-lg border ${errors.subtitle ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="Enter banner subtitle"
                  {...register("subtitle", {
                    required: "Banner subtitle is required",
                  })}
                />
                {errors.subtitle && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.subtitle.message}
                  </span>
                )}
              </div>
              {/* banner description */}
              <div>
                <label
                  htmlFor="banner-description"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Banner Description
                </label>
                <textarea
                  id="banner-description"
                  className={`h-11 w-full rounded-lg border ${errors.description ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] resize-none`}
                  placeholder="Enter banner description"
                  {...register("description", {
                    required: "Banner description is required",
                  })}
                />
                {errors.description && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.description.message}
                  </span>
                )}
              </div>
              {/* banner price */}
              <div>
                <label
                  htmlFor="banner-price"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Banner Price
                </label>
                <input
                  type="number"
                  id="banner-price"
                  className={`h-11 w-full rounded-lg border ${errors.price ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="Enter banner price"
                  {...register("price", {
                    required: "Banner price is required",
                  })}
                />
                {errors.price && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.price.message}
                  </span>
                )}
              </div>
              {/* banner status */}
              <div>
                <label
                  htmlFor="banner-status"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Banner Status
                </label>
                <div className="relative">
                  <select
                    id="banner-status"
                    className={`h-11 w-full rounded-lg border ${errors.status ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] appearance-none`}
                    {...register("status", {
                      required: "Banner status is required",
                    })}
                  >
                    <option value="">Select banner status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-700">
                    <ArrowDown />
                  </span>
                </div>
                {errors.status && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.status.message}
                  </span>
                )}
              </div>
              {/* banner image */}
              <div>
                <label
                  htmlFor="banner-image"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Banner Image{" "}
                  {isEditMode && (
                    <span className="text-gray-400 font-normal">
                      (leave empty to keep current)
                    </span>
                  )}
                </label>
                <input
                  type="file"
                  id="banner-image"
                  className={`block h-11 w-full overflow-hidden rounded-lg border ${errors.image ? "border-red-500" : "border-gray-300"} bg-transparent pr-3 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] file:mr-4 file:cursor-pointer file:border-0 file:bg-[#fa8232] file:px-4 file:py-[12px] file:text-sm file:font-semibold file:text-white hover:file:bg-[#e0752d] cursor-pointer`}
                  {...register("image", {
                    required: isEditMode ? false : "Banner image is required",
                  })}
                />
                {errors.image && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.image.message}
                  </span>
                )}
                {isEditMode && editingBanner?.image && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-gray-400">Current:</span>
                    <div className="relative h-10 w-10 rounded overflow-hidden border border-gray-200">
                      <Image
                        src={editingBanner.image}
                        alt={editingBanner.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* submit button */}
        <div className="flex items-end justify-end">
          <button
            type="submit"
            disabled={isAdding || isUpdating}
            className="bg-[#465fff] shadow-theme-xs hover:bg-brand-600 gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white cursor-pointer"
          >
            {isEditMode ? (
              isUpdating ? (
                <div className="flex items-center gap-2">
                  <Spinner className="text-white" />
                  <span>Updating Banner</span>
                </div>
              ) : (
                "Update Banner"
              )
            ) : isAdding ? (
              <div className="flex items-center gap-2">
                <Spinner className="text-white" />
                <span>Creating Banner</span>
              </div>
            ) : (
              "Create Banner"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BannerForm />
    </Suspense>
  );
};

export default page;
