"use client";
import { ArrowDown, ArrowRightIcon, UploadIcon } from "@/components/svg/Icons";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import React, { useEffect, useState, Suspense } from "react";
import { useForm } from "react-hook-form";
import {
  useAddProductMutation,
  useUpdateProductMutation,
  useGetAllProductsQuery,
} from "@/redux/services/product/productSlice";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const ProductForm = () => {
  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { data: products } = useGetAllProductsQuery();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [editingProduct, setEditingProduct] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const mainImageFile = watch("mainImage");
  const thumbnailFiles = watch([
    "thumbnails0",
    "thumbnails1",
    "thumbnails2",
    "thumbnails3",
    "thumbnails4",
    "thumbnails5",
  ]);

  useEffect(() => {
    if (editId && products?.data) {
      const productToEdit = products.data.find((p) => p._id === editId);
      if (productToEdit) {
        setEditingProduct(productToEdit);
        setValue("title", productToEdit.title);
        setValue("category", productToEdit.category);
        setValue("brand", productToEdit.brand);
        setValue("color", Array.isArray(productToEdit.color) ? productToEdit.color.join(", ") : productToEdit.color);
        setValue("price", productToEdit.price);
        setValue("discountPrice", productToEdit.discountPrice);
        setValue("model", productToEdit.model);
        setValue("badge", Array.isArray(productToEdit.badge) ? productToEdit.badge.join(", ") : productToEdit.badge);
        setValue("stock", productToEdit.stock ? "In Stock" : "Out of Stock");
        setValue("size", Array.isArray(productToEdit.size) ? productToEdit.size.join(", ") : productToEdit.size);
        setValue("memory", Array.isArray(productToEdit.memory) ? productToEdit.memory.join(", ") : productToEdit.memory);
        setValue("storage", Array.isArray(productToEdit.storage) ? productToEdit.storage.join(", ") : productToEdit.storage);
        setValue("description", productToEdit.description);
      }
    }
  }, [editId, products, setValue]);

  const isEditMode = !!editId;

  // for create product
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      const splitAndTrim = (str) =>
        str ? str.split(",").map((s) => s.trim()) : [];
      const arrayFields = ["badge", "size", "memory", "storage", "color"];

      for (const key in data) {
        const value = data[key];

        // Handle file inputs
        if (value?.[0] instanceof File) {
          if (key.startsWith("thumbnails")) {
            formData.append("thumbnails", value[0]);
          } else {
            formData.append(key, value[0]);
          }
        }
        // Handle non-file inputs
        else if (!(value instanceof FileList)) {
          if (arrayFields.includes(key)) {
            const arr = splitAndTrim(value);
            arr.forEach((item) => formData.append(key, item));
          } else if (key === "stock") {
            formData.append(key, value === "In Stock" ? "true" : "false");
          } else if (value !== undefined && value !== null && value !== "") {
            formData.append(key, value);
          }
        }
      }

      // ✅ Debug: check what's inside formData before sending
      for (let [key, val] of formData.entries()) {
        console.log(key, val);
      }

      if (isEditMode) {
        const response = await updateProduct({ id: editId, formData }).unwrap();
        toast.success(response.message || "Product updated successfully");
      } else {
        const response = await addProduct(formData).unwrap();
        toast.success(response.message || "Product created successfully");
      }
      setTimeout(() => {
        reset();
        router.push(ROUTES.PRODUCTS_LIST);
      }, 2000);
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {isEditMode ? "Update Product" : "Add Product"}
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
              {isEditMode ? "Update Product" : "Add Product"}
            </li>
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
                  className={`h-11 w-full rounded-lg border ${errors.title ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="Enter product title"
                  {...register("title", {
                    required: "Product title is required",
                  })}
                />
                {errors.title && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.title.message}
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
                      required: "category is required",
                    })}
                  >
                    <option value="" className="text-gray-700">
                      Select category
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
                <input
                  type="text"
                  className={`h-11 w-full rounded-lg border ${errors.color ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="e.g. Space Gray, Silver"
                  {...register("color", { required: "Color is required" })}
                />
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

              {/* product model */}
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  model
                </label>
                <input
                  type="text"
                  className={`h-11 w-full rounded-lg border ${errors.model ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="Enter product model"
                  {...register("model", { required: "model is required" })}
                />
                {errors.model && (
                  <span className="text-red-500 text-xs mt-1 block">
                    {errors.model.message}
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
                  placeholder="e.g. 32% OFF, hot"
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
                <input
                  type="text"
                  className={`h-11 w-full rounded-lg border ${errors.size ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="e.g. 14-inch, 16-inch"
                  {...register("size", { required: "Size is required" })}
                />
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
                <input
                  type="text"
                  className={`h-11 w-full rounded-lg border ${errors.memory ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="e.g. 16GB, 32GB"
                  {...register("memory", { required: "Memory is required" })}
                />
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
                <input
                  type="text"
                  className={`h-11 w-full rounded-lg border ${errors.storage ? "border-red-500" : "border-gray-300"} bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                  placeholder="e.g. 1TB SSD, 2TB SSD"
                  {...register("storage", {
                    required: "Storage is required",
                  })}
                />
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
                  required: isEditMode ? false : "Main image is required",
                })}
              />
            </label>
            {mainImageFile && mainImageFile.length > 0 && (
              <p className="mt-3 text-sm font-medium text-green-600 text-center">
                Selected file: {mainImageFile[0].name}
              </p>
            )}
            {isEditMode && editingProduct?.mainImage && (
              <div className="mt-2 flex items-center justify-center gap-2">
                <span className="text-xs text-gray-400">Current:</span>
                <div className="relative h-10 w-10 rounded overflow-hidden border border-gray-200">
                  <Image
                    src={editingProduct.mainImage}
                    alt={editingProduct.title || "Current image"}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
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
              {[...Array(6)].map((_, index) => {
                const fileList = thumbnailFiles[index];
                return (
                  <div key={index} className="flex flex-col">
                    <label
                      htmlFor={`product-featured-image-${index}`}
                      className={`shadow-theme-xs group hover:border-[#fa8232] block cursor-pointer rounded-lg border-2 border-dashed ${errors[`thumbnails${index}`] ? "border-red-500" : "border-gray-300"}`}
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
                        {...register(`thumbnails${index}`)}
                      />
                    </label>
                    {fileList && fileList.length > 0 && (
                      <p
                        className="mt-2 text-[10px] sm:text-xs font-medium text-green-600 text-center truncate px-1 max-w-[120px] mx-auto"
                        title={fileList[0].name}
                      >
                        {fileList[0].name}
                      </p>
                    )}
                    {errors[`thumbnails${index}`] && (
                      <span className="text-red-500 text-xs mt-1 block text-center">
                        {errors[`thumbnails${index}`].message}
                      </span>
                    )}
                  </div>
                );
              })}
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
                  <span>Updating Product</span>
                </div>
              ) : (
                "Update Product"
              )
            ) : isAdding ? (
              <div className="flex items-center gap-2">
                <Spinner className="text-white" />
                <span>Creating Product</span>
              </div>
            ) : (
              "Create Product"
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
      <ProductForm />
    </Suspense>
  );
};

export default page;
