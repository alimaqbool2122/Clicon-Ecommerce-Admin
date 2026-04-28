"use client";
import {
  ArrowDown,
  ArrowRightIcon,
  DeleteIcon,
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
} from "@/components/svg/Icons";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useGetAllProductsQuery, useDeleteProductMutation } from "@/redux/services/product/productSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const page = () => {
  const { data } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const router = useRouter();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month}, ${year}`;
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteProduct(id).unwrap();
      toast.success(response.message || "Product deleted successfully");
    } catch (error) {
      toast.error(error.data?.message || "Failed to delete product");
    }
  };

  const handleEdit = (id) => {
    router.push(`/create-product?id=${id}`);
  };
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6">
        <h2 className="text-xl font-semibold text-gray-800">Products</h2>
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
            <li className="text-sm text-gray-800 ">Products</li>
          </ol>
        </nav>
      </div>

      {/* product list */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col justify-between gap-5 border-b border-gray-200 px-5 py-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Products List
            </h3>
            <p className="text-sm text-gray-500">
              Track your store's progress to boost your sales.
            </p>
          </div>
          <div>
            <Link
              href={ROUTES.ADD_PRODUCT}
              className="bg-[#465fff] shadow-theme-xs hover:bg-brand-600 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium text-white"
            >
              <PlusIcon />
              Add Product
            </Link>
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
            {/* tbale header */}
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-5 py-4 text-left text-xs font-medium text-gray-800">
                  <p className="text-[12px] font-medium text-gray-800">
                    Products
                  </p>
                </th>
                <th className="px-5 py-4 text-left text-xs font-medium text-gray-800">
                  <p className="text-[12px] font-medium text-gray-800">
                    Category
                  </p>
                </th>
                <th className="px-5 py-4 text-left text-xs font-medium text-gray-800">
                  <p className="text-[12px] font-medium text-gray-800">Brand</p>
                </th>
                <th className="px-5 py-4 text-left text-xs font-medium text-gray-800">
                  <p className="text-[12px] font-medium text-gray-800">Price</p>
                </th>
                <th className="px-5 py-4 text-left text-xs font-medium text-gray-800">
                  <p className="text-[12px] font-medium text-gray-800">Stock</p>
                </th>
                <th className="px-5 py-4 text-left text-xs font-medium text-gray-800">
                  Created At
                </th>
                <th className="px-5 py-4 text-left text-xs font-medium text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            {/* table body */}
            <tbody className="divide-x divide-y divide-gray-200 dark:divide-gray-800">
              {data?.data?.length > 0 ? (
                data.data.map((product) => (
                  <tr key={product._id}>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0">
                          <Image
                            src={product.mainImage}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.category}
                      </p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        {product.brand}
                      </p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        ${product.price}
                      </p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span
                        className={`text-[12px] rounded-full px-2 py-0.5 font-medium ${
                          product.stock > 0
                            ? "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-500"
                            : "bg-red-50 text-red-700 dark:bg-red-500/15 dark:text-red-500"
                        }`}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-700 dark:text-gray-400">
                        {formatDate(product.createdAt)}
                      </p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3 ">
                        <button 
                          onClick={() => handleEdit(product._id)}
                          className="text-gray-700 duration-300 ease-linear hover:text-[#fa8232] cursor-pointer"
                        >
                          <EditIcon />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="text-gray-700 duration-300 ease-linear hover:text-red-500 cursor-pointer"
                        >
                          <DeleteIcon />
                        </button>
                        <button className="text-gray-700 duration-300 ease-linear hover:text-[#fa8232] cursor-pointer">
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
                    No products found
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
