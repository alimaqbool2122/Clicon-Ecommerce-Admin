"use client";
import {
  ArrowRightIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  SearchIcon,
} from "@/components/svg/Icons";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "@/redux/services/category/categorySlice";

const page = () => {
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const { data: categories } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  // Track which category is being edited (null = create mode)
  const [editingCategory, setEditingCategory] = useState(null);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // Switch form to Edit mode — pre-fill title
  const handleEditClick = (category) => {
    setEditingCategory(category);
    setValue("title", category.title);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Switch form back to Create mode
  const handleCancelEdit = () => {
    setEditingCategory(null);
    reset();
  };

  // Create OR Update depending on mode
  const onSubmit = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      if (data[key] instanceof FileList && data[key].length > 0) {
        formData.append(key, data[key][0]);
      } else if (!(data[key] instanceof FileList)) {
        formData.append(key, data[key]);
      }
    }

    try {
      if (editingCategory) {
        // UPDATE mode
        const response = await updateCategory({
          id: editingCategory._id,
          formData,
        }).unwrap();
        toast.success(response.message);
        setEditingCategory(null);
      } else {
        // CREATE mode
        const response = await addCategory(formData).unwrap();
        toast.success(response.message);
      }
      reset();
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await deleteCategory(id).unwrap();
      toast.success(response.message);
    } catch (error) {
      toast.error(error.data?.message || "Something went wrong");
    }
  };

  const isEditMode = !!editingCategory;

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {isEditMode ? "Update Category" : "Add Category"}
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
            <li className="text-sm text-gray-800">
              {isEditMode ? "Update Category" : "Add Category"}
            </li>
          </ol>
        </nav>
      </div>
      {/* category from */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-800">
              {isEditMode
                ? `Editing: "${editingCategory.title}"`
                : "Category Description"}
            </h2>
            {/* Mode toggle pill */}
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-1">
              <button
                type="button"
                onClick={handleCancelEdit}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  !isEditMode
                    ? "bg-[#465fff] text-white"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Create Category
              </button>
              <button
                type="button"
                disabled={!isEditMode}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                  isEditMode
                    ? "bg-[#fa8232] text-white"
                    : "cursor-not-allowed text-gray-300"
                }`}
              >
                Update Category
              </button>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Category Title */}
            <div>
              <label
                htmlFor="category-name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                id="category-name"
                className={`h-11 w-full rounded-lg border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232]`}
                placeholder="Enter category name"
                {...register("title", {
                  required: "Category name is required",
                })}
              />
              {errors.title && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Category Image */}
            <div>
              <label
                htmlFor="category-image"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Category Image{" "}
                {isEditMode && (
                  <span className="text-gray-400 font-normal">
                    (leave empty to keep current)
                  </span>
                )}
              </label>
              <input
                type="file"
                id="category-image"
                className={`block h-11 w-full overflow-hidden rounded-lg border ${
                  errors.image ? "border-red-500" : "border-gray-300"
                } bg-transparent pr-3 text-sm text-gray-800 placeholder:text-gray-400 outline-[#fa8232] file:mr-4 file:cursor-pointer file:border-0 file:bg-[#fa8232] file:px-4 file:py-[12px] file:text-sm file:font-semibold file:text-white hover:file:bg-[#e0752d] cursor-pointer`}
                {...register("image", {
                  // Image only required when creating
                  required: isEditMode ? false : "Category image is required",
                })}
              />
              {errors.image && (
                <span className="text-red-500 text-xs mt-1 block">
                  {errors.image.message}
                </span>
              )}
              {/* Show current image preview in edit mode */}
              {isEditMode && editingCategory.image && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-xs text-gray-400">Current:</span>
                  <div className="relative h-10 w-10 rounded overflow-hidden border border-gray-200">
                    <Image
                      src={editingCategory.image}
                      alt={editingCategory.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-end justify-end gap-3">
          {isEditMode && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isAdding || isUpdating}
            className={`shadow-theme-xs gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white cursor-pointer disabled:opacity-60 ${
              isEditMode
                ? "bg-[#fa8232] hover:bg-[#e0752d]"
                : "bg-[#465fff] hover:bg-blue-700"
            }`}
          >
            {isEditMode
              ? isUpdating
                ? "Updating..."
                : "Update Category"
              : isAdding
                ? "Creating..."
                : "Create Category"}
          </button>
        </div>
      </form>
      {/* category table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white mt-6">
        <div className="flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Category List
            </h3>
            <p className="text-sm text-gray-500">
              Track your store's progress to boost your sales.
            </p>
          </div>
        </div>
        {/* search */}
        <div className="border-b border-gray-200 px-5 py-4">
          <div className="relative flex-1 sm:flex-auto">
            <span className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <SearchIcon />
            </span>
            <input
              type="text"
              placeholder="Search..."
              className="h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 sm:w-[300px] sm:min-w-[300px] outline-[#fa8232]"
            />
          </div>
        </div>
        {/* Table */}
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-left">
                  <p className="text-[12px] font-medium text-gray-800">Image</p>
                </th>
                <th className="px-5 py-4 text-left">
                  <p className="text-[12px] font-medium text-gray-800">Title</p>
                </th>
                <th className="px-5 py-4 text-left text-[12px] font-medium text-gray-800">
                  Created At
                </th>
                <th className="px-5 py-4 text-left text-[12px] font-medium text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categories?.data?.length > 0 ? (
                categories.data.map((category) => (
                  <tr
                    key={category._id}
                    className={
                      editingCategory?._id === category._id
                        ? "bg-orange-50" // highlight the row being edited
                        : ""
                    }
                  >
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="relative h-12 w-12 shrink-0">
                        <Image
                          src={category.image}
                          alt={category.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-700">
                        {category.title}
                      </p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-700">
                        {formatDate(category.createdAt)}
                      </p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleEditClick(category)}
                          className={`duration-300 ease-linear ${
                            editingCategory?._id === category._id
                              ? "text-[#fa8232]"
                              : "text-gray-700 hover:text-[#fa8232]"
                          }`}
                        >
                          <EditIcon />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
                          className="text-gray-700 duration-300 ease-linear hover:text-red-500"
                        >
                          <DeleteIcon />
                        </button>
                        <button className="text-gray-700 duration-300 ease-linear hover:text-[#fa8232]">
                          <EyeIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={12}
                    className="px-5 py-6 text-center text-sm text-gray-500"
                  >
                    No category found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* pagination */}
        <div className="flex flex-col items-center justify-between border-t border-gray-200 px-5 py-4 sm:flex-row dark:border-gray-800">
          <div className="pb-3 sm:pb-0">
            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="text-gray-800 dark:text-white/90">1</span> to{" "}
              <span className="text-gray-800 dark:text-white/90">7</span> of{" "}
              <span className="text-gray-800 dark:text-white/90">20</span>
            </span>
          </div>
          <div className="flex w-full items-center justify-between gap-2 rounded-lg bg-gray-50 p-4 sm:w-auto sm:justify-normal sm:rounded-none sm:bg-transparent sm:p-0 dark:bg-gray-900 dark:sm:bg-transparent">
            <button
              className="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer"
              disabled="disabled"
            >
              <span>
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.58203 9.99868C2.58174 10.1909 2.6549 10.3833 2.80152 10.53L7.79818 15.5301C8.09097 15.8231 8.56584 15.8233 8.85883 15.5305C9.15183 15.2377 9.152 14.7629 8.85921 14.4699L5.13911 10.7472L16.6665 10.7472C17.0807 10.7472 17.4165 10.4114 17.4165 9.99715C17.4165 9.58294 17.0807 9.24715 16.6665 9.24715L5.14456 9.24715L8.85919 5.53016C9.15199 5.23717 9.15184 4.7623 8.85885 4.4695C8.56587 4.1767 8.09099 4.17685 7.79819 4.46984L2.84069 9.43049C2.68224 9.568 2.58203 9.77087 2.58203 9.99715C2.58203 9.99766 2.58203 9.99817 2.58203 9.99868Z"
                  ></path>
                </svg>
              </span>
            </button>
            <ul className="hidden items-center gap-0.5 sm:flex">
              <li>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium bg-[#465fff] text-white"
                >
                  <span>1</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-brand-500 text-gray-700 dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-[#465fff]"
                >
                  <span>2</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium hover:bg-brand-500 text-gray-700 dark:text-gray-400 hover:text-white dark:hover:text-white hover:bg-[#465fff]"
                >
                  <span>3</span>
                </Link>
              </li>
            </ul>
            <button className="shadow-theme-xs flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-2 text-gray-700 hover:bg-gray-50 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50 sm:p-2.5 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200 cursor-pointer">
              <span>
                <svg
                  className="fill-current"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M17.4165 9.9986C17.4168 10.1909 17.3437 10.3832 17.197 10.53L12.2004 15.5301C11.9076 15.8231 11.4327 15.8233 11.1397 15.5305C10.8467 15.2377 10.8465 14.7629 11.1393 14.4699L14.8594 10.7472L3.33203 10.7472C2.91782 10.7472 2.58203 10.4114 2.58203 9.99715C2.58203 9.58294 2.91782 9.24715 3.33203 9.24715L14.854 9.24715L11.1393 5.53016C10.8465 5.23717 10.8467 4.7623 11.1397 4.4695C11.4327 4.1767 11.9075 4.17685 12.2003 4.46984L17.1578 9.43049C17.3163 9.568 17.4165 9.77087 17.4165 9.99715C17.4165 9.99763 17.4165 9.99812 17.4165 9.9986Z"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
