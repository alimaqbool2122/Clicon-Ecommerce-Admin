"use client";
import { ArrowDown, ArrowRightIcon, UploadIcon } from "@/components/svg/Icons";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";
import { useForm, Controller } from "react-hook-form";

const page = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <h2 className="text-xl font-semibold text-gray-800">Add Product</h2>
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
            <li className="text-sm text-gray-800 ">Add Product</li>
          </ol>
        </nav>
      </div>

      {/* product form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-800">
              Products Description
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* product title */}
              <div>
                <label
                  htmlFor="product-name"
                  className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400"
                >
                  Product Title
                </label>
                <input
                  type="text"
                  id="product-name"
                  className={`h-11 w-full rounded-lg border ${errors.productName ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="Enter product title"
                  {...register("productName", {
                    required: "Product title is required",
                  })}
                />
                {errors.productName && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.productName.message}
                  </span>
                )}
              </div>

              {/* product category */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">
                  Category
                </label>
                <div className="relative">
                  <select
                    className={`h-11 w-full rounded-lg border ${errors.category ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] appearance-none`}
                    {...register("category", {
                      required: "Category is required",
                    })}
                  >
                    <option value="" className="text-gray-700">
                      Select Category
                    </option>
                    <option value="Laptop" className="text-gray-700">
                      Laptop
                    </option>
                    <option value="Phone" className="text-gray-700">
                      Phone
                    </option>
                    <option value="Watch" className="text-gray-700">
                      Watch
                    </option>
                    <option value="Electronics" className="text-gray-700">
                      Electronics
                    </option>
                    <option value="Accessories" className="text-gray-700">
                      Accessories
                    </option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-700">
                    <ArrowDown />
                  </span>
                </div>
                {errors.category && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.category.message}
                  </span>
                )}
              </div>

              {/* Product brand */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <div className="relative">
                  <select
                    className={`h-11 w-full rounded-lg border ${errors.brand ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] appearance-none`}
                    {...register("brand", { required: "Brand is required" })}
                  >
                    <option value="" className="text-gray-700">
                      Select Brand
                    </option>
                    <option value="Laptop" className="text-gray-700">
                      Laptop
                    </option>
                    <option value="Phone" className="text-gray-700">
                      Phone
                    </option>
                    <option value="Watch" className="text-gray-700">
                      Watch
                    </option>
                    <option value="Electronics" className="text-gray-700">
                      Electronics
                    </option>
                    <option value="Accessories" className="text-gray-700">
                      Accessories
                    </option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-700">
                    <ArrowDown />
                  </span>
                </div>
                {errors.brand && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.brand.message}
                  </span>
                )}
              </div>

              {/* Product color */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Color
                </label>
                <div className="relative">
                  <select
                    className={`h-11 w-full rounded-lg border ${errors.color ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] appearance-none`}
                    {...register("color", { required: "Color is required" })}
                  >
                    <option value="" className="text-gray-700">
                      Select Color
                    </option>
                    <option value="Red" className="text-gray-700">
                      Red
                    </option>
                    <option value="Green" className="text-gray-700">
                      Green
                    </option>
                    <option value="Blue" className="text-gray-700">
                      Blue
                    </option>
                    <option value="Yellow" className="text-gray-700">
                      Yellow
                    </option>
                    <option value="Black" className="text-gray-700">
                      Black
                    </option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-700">
                    <ArrowDown />
                  </span>
                </div>
                {errors.color && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.color.message}
                  </span>
                )}
              </div>

              {/* price */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  className={`h-11 w-full rounded-lg border ${errors.price ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="Enter product price"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price cannot be negative" },
                  })}
                />
                {errors.price && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.price.message}
                  </span>
                )}
              </div>

              {/* discount price */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Discount Price
                </label>
                <input
                  type="number"
                  className={`h-11 w-full rounded-lg border ${errors.discountPrice ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="Enter product discount price"
                  {...register("discountPrice", {
                    min: {
                      value: 0,
                      message: "Discount price cannot be negative",
                    },
                  })}
                />
                {errors.discountPrice && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.discountPrice.message}
                  </span>
                )}
              </div>

              {/* product modal */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Modal
                </label>
                <input
                  type="text"
                  className={`h-11 w-full rounded-lg border ${errors.modal ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="Enter product modal"
                  {...register("modal", { required: "Modal is required" })}
                />
                {errors.modal && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.modal.message}
                  </span>
                )}
              </div>

              {/* product badge */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Badge
                </label>
                <input
                  type="text"
                  className={`h-11 w-full rounded-lg border ${errors.badge ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="Enter product badge"
                  {...register("badge", { required: "Badge is required" })}
                />
                {errors.badge && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.badge.message}
                  </span>
                )}
              </div>

              {/* product stock */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Availability Status
                </label>
                <div className="relative">
                  <select
                    className={`h-11 w-full rounded-lg border ${errors.stock ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] appearance-none`}
                    {...register("stock", {
                      required: "Availability Status is required",
                    })}
                  >
                    <option value="" className="text-gray-700">
                      Select Availability
                    </option>
                    <option value="In Stock" className="text-gray-700">
                      In Stock
                    </option>
                    <option value="Out of Stock" className="text-gray-700">
                      Out of Stock
                    </option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-700">
                    <ArrowDown />
                  </span>
                </div>
                {errors.stock && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.stock.message}
                  </span>
                )}
              </div>

              {/* product size */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Size
                </label>
                <div className="relative">
                  <select
                    className={`h-11 w-full rounded-lg border ${errors.size ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] appearance-none`}
                    {...register("size", { required: "Size is required" })}
                  >
                    <option value="" className="text-gray-700">
                      Select Size
                    </option>
                    <option value="Small" className="text-gray-700">
                      Small
                    </option>
                    <option value="Medium" className="text-gray-700">
                      Medium
                    </option>
                    <option value="Large" className="text-gray-700">
                      Large
                    </option>
                    <option value="X-Large" className="text-gray-700">
                      X-Large
                    </option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-700">
                    <ArrowDown />
                  </span>
                </div>
                {errors.size && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.size.message}
                  </span>
                )}
              </div>

              {/* product memory */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Memory
                </label>
                <div className="relative">
                  <select
                    className={`h-11 w-full rounded-lg border ${errors.memory ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] appearance-none`}
                    {...register("memory", { required: "Memory is required" })}
                  >
                    <option value="" className="text-gray-700">
                      Select Memory
                    </option>
                    <option value="64GB" className="text-gray-700">
                      64GB
                    </option>
                    <option value="128GB" className="text-gray-700">
                      128GB
                    </option>
                    <option value="256GB" className="text-gray-700">
                      256GB
                    </option>
                    <option value="512GB" className="text-gray-700">
                      512GB
                    </option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-700">
                    <ArrowDown />
                  </span>
                </div>
                {errors.memory && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.memory.message}
                  </span>
                )}
              </div>

              {/* product storage */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Storage
                </label>
                <div className="relative">
                  <select
                    className={`h-11 w-full rounded-lg border ${errors.storage ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] appearance-none`}
                    {...register("storage", {
                      required: "Storage is required",
                    })}
                  >
                    <option value="" className="text-gray-700">
                      Select Storage
                    </option>
                    <option value="64GB" className="text-gray-700">
                      64GB
                    </option>
                    <option value="128GB" className="text-gray-700">
                      128GB
                    </option>
                    <option value="256GB" className="text-gray-700">
                      256GB
                    </option>
                    <option value="512GB" className="text-gray-700">
                      512GB
                    </option>
                  </select>
                  <span className="pointer-events-none absolute top-1/2 right-4 z-30 -translate-y-1/2 text-gray-700">
                    <ArrowDown />
                  </span>
                </div>
                {errors.storage && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.storage.message}
                  </span>
                )}
              </div>

              {/* product description */}
              <div className="col-span-full">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  placeholder="Enter product description"
                  rows="7"
                  className={`w-full rounded-lg border ${errors.description ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] resize-none`}
                  {...register("description", {
                    required: "Description is required",
                  })}
                />
                {errors.description && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* product images */}
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-800">
              Products Main Image
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <label
              htmlFor="product-image"
              className={`shadow-theme-xs group hover:border-[#fa8232] block cursor-pointer rounded-lg border-2 border-dashed ${errors.mainImage ? "border-red-500" : "border-gray-300"}`}
            >
              <div className="flex justify-center p-10">
                <div className="flex max-w-[260px] flex-col items-center gap-4">
                  <div className="inline-flex h-13 w-13 items-center justify-center rounded-full border border-gray-200 text-gray-700">
                    <UploadIcon />
                  </div>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      Click to upload
                    </span>{" "}
                    or drag and drop SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              </div>
              <input
                type="file"
                id="product-image"
                className="hidden"
                {...register("mainImage", {
                  required: "Main image is required",
                })}
              />
            </label>
            {errors.mainImage && (
              <span className="text-red-500 text-xs mt-2 block text-center">
                {errors.mainImage.message}
              </span>
            )}
          </div>
        </div>

        {/* product featured iamges  */}
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-medium text-gray-800">
              Products Featured Images
            </h2>
          </div>
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
              {[...Array(6)].map((_, index) => (
                <div key={index}>
                  <label
                    htmlFor={`product-featured-image-${index}`}
                    className={`shadow-theme-xs group hover:border-[#fa8232] block cursor-pointer rounded-lg border-2 border-dashed ${errors[`featuredImage${index}`] ? "border-red-500" : "border-gray-300"}`}
                  >
                    <div className="flex justify-center p-4 py-8">
                      <div className="flex flex-col items-center gap-3">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-700">
                          <UploadIcon width={20} height={20} />
                        </div>
                        <p className="text-center text-xs text-gray-500">
                          <span className="block font-medium text-gray-800">
                            Click to upload
                          </span>
                        </p>
                      </div>
                    </div>
                    <input
                      type="file"
                      id={`product-featured-image-${index}`}
                      className="hidden"
                      {...register(`featuredImage${index}`)}
                    />
                  </label>
                  {errors[`featuredImage${index}`] && (
                    <span className="text-red-500 text-xs mt-1 block text-center">
                      {errors[`featuredImage${index}`].message}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* submit button */}
        <div className="flex items-end justify-end">
          <button
            type="submit"
            className="bg-[#465fff] shadow-theme-xs hover:bg-brand-600 gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white cursor-pointer"
          >
            Create Product
          </button>
        </div>
      </form>
    </>
  );
};

export default page;
