"use client";
import React, { useState } from "react";
import ROUTES from "@/constants/routes";
import { usePathname } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { assets } from "@/constants/assets";
import { ArrowRight } from "@/components/svg/Icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/authProvider";
import { useLoginMutation } from "@/redux/services/auth/authApiSlice";

const page = () => {
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loginRegistration, { isLoading }] = useLoginMutation();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  // admin Login
  const onSubmit = async (data) => {
    try {
      const response = await loginRegistration(data).unwrap();
      console.log("Login Response:", response);

      if (response.success) {
        toast.success(response.message);
        // pass token and user data to login function
        login(response);
        setTimeout(() => {
          router.push(ROUTES.DASHBOARD);
        }, 2000);
      }
    } catch (error) {
      console.error("Login Error:", error);
      const message =
        error?.data?.message || error?.message || "Something went wrong!";
      toast.error(message);
    }
  };

  return (
    <>
      {/* Sign In */}
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-106 mx-auto bg-white shadow-[0px_8px_40px_0px_rgba(0,0,0,0.12)] border border-[#E4E7E9] rounded-sm">
          {/* top nav */}
          <div className="flex items-center justify-center border-b border-[#E4E7E9] py-4">
            <Image
              src="/image/logo/logo.svg"
              alt="Logo"
              width={154}
              height={32}
              className="cursor-pointer"
            />
          </div>
          <div className="p-4.5 sm:p-8 sm:pt-5 pt-5">
            {/* Login Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-12 space-y-5"
            >
              {/* Email */}
              <div className="col-span-12">
                <label
                  htmlFor="email"
                  className="text-sm font-normal leading-5 text-[#191C1F] text-start mt-4.5"
                >
                  Email Address
                </label>
                <input
                  type="text"
                  className="w-full h-11 rounded-xs border border-[#E4E7E9] outline-0 mt-2 text-[#191C1F] px-3.75 placeholder:text-sm"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address including @",
                    },
                  })}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* Password */}
              <div className="col-span-12">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-normal leading-5 text-[#191C1F]"
                  >
                    Password
                  </label>
                  <Link
                    href={ROUTES.FORGET_PASSWORD}
                    className="text-sm font-semibold leading-5 text-[#2DA5F3]"
                  >
                    Forget Password
                  </Link>
                </div>
                <div className="w-full h-11 flex items-center rounded-xs border border-[#E4E7E9] mt-2 text-[#191C1F] px-3.75">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full outline-0 text-[#191C1F] placeholder:text-sm"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
                        message:
                          "Must contain uppercase, lowercase, number & special character",
                      },
                    })}
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    <Image
                      src={showPassword ? assets.EyeSlash : assets.Eye_Black}
                      alt="eye-icon"
                      width={20}
                      height={20}
                    />
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* submit button */}
              <button
                type="submit"
                className="col-span-12 flex items-center justify-center gap-2 border-2! border-[#FA8232]! bg-[#FA8232]! text-white px-6 h-12 text-sm! leading-px uppercase font-bold! rounded-[3px] mb-4 mt-1 duration-500 ease-linear hover:bg-transparent! hover:text-[#191C1F] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign in
                <ArrowRight />
              </button>
            </form>
            {/* Divider Separator */}
            <div className="after:border-[#e4e7e9] relative text-center after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <p className="text-[#77878F] text-sm! bg-white inline-block px-2.5 font-normal leading-5 relative z-10">
                or
              </p>
            </div>
            {/* login with other  */}
            <div className="mt-3 space-y-3">
              <button className="text-[#475156] text-sm border border-[#E4E7E9] rounded-xs w-full h-11 cursor-pointer relative">
                Login with Google
                <Image
                  src={assets.Google}
                  alt="google-icon"
                  width={20}
                  height={20}
                  className="absolute top-3 left-4"
                />
              </button>
              <button className="text-[#475156] text-sm border border-[#E4E7E9] rounded-xs w-full h-11 cursor-pointer relative">
                Login with Apple
                <Image
                  src={assets.Apple}
                  alt="apple-icon"
                  width={20}
                  height={20}
                  className="absolute top-3 left-4"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
