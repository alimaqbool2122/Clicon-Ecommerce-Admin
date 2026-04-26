"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";
import {
  ArrowDown,
  DashboardIcon,
  FileIcon,
  LogoutIcon,
  OrderIcon,
  ShopingCartIcon,
} from "../svg/Icons";
import ROUTES from "@/constants/routes";

const AppSidebar = () => {
  const { open, openMobile, setOpenMobile } = useSidebar();
  const isCollapsed = !open;
  const isMobileOpen = openMobile;
  const setIsMobileOpen = setOpenMobile;
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState("");
  const dropdownRef = useRef(null);
  const routes = [
    { icon: <DashboardIcon />, label: "Dashboard", href: ROUTES.DASHBOARD },
    {
      icon: <FileIcon />,
      label: "Banner",
      href: "#",
      subRoutes: [
        { label: "All Banners", href: ROUTES.BANNER_LIST },
        { label: "Create Banner", href: ROUTES.ADD_BANNER },
      ],
    },
    {
      icon: <ShopingCartIcon />,
      label: "Product",
      href: "#",
      subRoutes: [
        { label: "All Products", href: ROUTES.PRODUCTS_LIST },
        { label: "Create Product", href: ROUTES.ADD_PRODUCT },
      ],
    },
    {
      icon: <OrderIcon />,
      label: "Add Category",
      href: ROUTES.ADD_CATEGORY,
    },
    {
      icon: <LogoutIcon />,
      label: "Sign out",
      href: "#",
    },
  ];

  useEffect(() => {
    if (pathname === ROUTES.PRODUCTS_LIST || pathname === ROUTES.ADD_PRODUCT) {
      setOpenDropdown("Product");
    }
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownClick = (label) => {
    setOpenDropdown((prev) => (prev === label ? "" : label));
  };

  return (
    <>
      {/* ======= Mobile Navbar Toggle ======= */}
      <div className="lg:hidden fixed top-0 left-0 w-full py-4 px-5 bg-[#f9fafb] border-b border-[#e2e8f0] flex items-center justify-between z-40">
        {/* Menu Icon */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="text-[#1F2936] flex items-center justify-center rounded-lg bg-[#ECECFD] size-10 cursor-pointer"
        >
          <span className="material-symbols-rounded text-[28px]">menu</span>
        </button>
      </div>

      {/* ======= Sidebar ======= */}
      <div
        className={`
                    fixed lg:sticky top-0 h-screen px-5 flex shrink-0 flex-col bg-white border-r border-[#e4e7ec]
                    transition-all duration-500 ease-in-out z-9999
                    ${isCollapsed ? "lg:w-22.5" : "lg:w-72.5"}
                    ${isMobileOpen ? "left-0" : "-left-72.5"}
                    w-72.5 lg:left-0
                `}
      >
        {/* Sidebar Header */}
        <div className="pt-8 pb-7">
          <div className="relative h-8 w-full">
            <Image
              src="/image/logo/logo.svg"
              alt="Logo"
              width={154}
              height={32}
              className={`absolute top-0 transition-all duration-500 ease-in-out cursor-pointer ${
                isCollapsed
                  ? "opacity-0 scale-95 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            />
            <Image
              src="/image/logo/logo-icon.svg"
              alt="Logo Icon"
              width={32}
              height={32}
              className={`absolute top-0 transition-all duration-500 ease-in-out cursor-pointer ${
                isCollapsed
                  ? "opacity-100 scale-100 left-[9px]"
                  : "opacity-0 scale-95 left-0 pointer-events-none"
              }`}
            />
          </div>
        </div>

        {/* Sidebar Routes */}
        <div className="">
          <h3
            className={`mb-4 text-xs leading-[20px] text-gray-400 uppercase transition-all duration-500 ease-in-out ${
              isCollapsed ? "pl-2.5" : "pl-0"
            }`}
          >
            <span className="">MENU</span>
          </h3>
          {/* routes list */}
          <ul className="space-y-1">
            {routes.map((route, index) => {
              const hasSubRoutes = !!route.subRoutes;
              const isActive = hasSubRoutes
                ? route.subRoutes.some((sub) => pathname === sub.href)
                : pathname === route.href;

              if (hasSubRoutes) {
                const isDropdownOpen = openDropdown === route.label;
                return (
                  <li key={index} ref={isDropdownOpen ? dropdownRef : null}>
                    <div
                      onClick={() => handleDropdownClick(route.label)}
                      className={`relative w-full block rounded-[8px] transition duration-500 ease-in-out cursor-pointer ${
                        isActive
                          ? "text-white"
                          : "text-[#667085] bg-white hover:bg-gray-100 hover:text-[#344054]"
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-sidebar"
                          className="absolute inset-0 bg-[#FA8232] rounded-[8px]"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        />
                      )}
                      <div className="relative z-10 flex items-center justify-between text-sm font-medium py-2 px-3 w-full capitalize overflow-hidden">
                        <div className="flex items-center">
                          <div className="shrink-0 flex items-center justify-center">
                            {route.icon}
                          </div>
                          <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${
                              isCollapsed
                                ? "max-w-0 opacity-0 ml-0"
                                : "max-w-[200px] opacity-100 ml-3"
                            } ${isActive ? "text-white" : "text-[#344054]"}`}
                          >
                            <span className="whitespace-nowrap">
                              {route.label}
                            </span>
                          </div>
                        </div>
                        {!isCollapsed && (
                          <div
                            className={`transition-transform duration-300 ${
                              isDropdownOpen ? "rotate-180" : "rotate-0"
                            } flex items-center justify-center`}
                          >
                            <ArrowDown />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sub routes */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isDropdownOpen && !isCollapsed
                          ? "max-h-40 opacity-100 mt-1"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="ml-9 space-y-1">
                        {route.subRoutes.map((sub, subIdx) => {
                          const isSubActive = pathname === sub.href;
                          return (
                            <li key={subIdx}>
                              <Link
                                href={sub.href}
                                className={`block text-sm py-2 px-3 rounded-[8px] transition-colors ${
                                  isSubActive
                                    ? "text-[#FA8232] font-semibold bg-[#FA8232]/10"
                                    : "text-[#667085] hover:text-[#344054] hover:bg-gray-100"
                                }`}
                              >
                                {sub.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={index}>
                  <Link
                    href={route.href}
                    className={`relative w-full block rounded-[8px] transition duration-500 ease-in-out ${
                      isActive
                        ? "text-white"
                        : "text-[#667085] bg-white hover:bg-gray-100 hover:text-[#344054]"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-sidebar"
                        className="absolute inset-0 bg-[#FA8232] rounded-[8px]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      />
                    )}
                    <div className="relative z-10 flex items-center text-sm font-medium py-2 px-3 w-full capitalize overflow-hidden">
                      <div className="shrink-0 flex items-center justify-center">
                        {route.icon}
                      </div>
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out flex items-center ${
                          isCollapsed
                            ? "max-w-0 opacity-0 ml-0"
                            : "max-w-[200px] opacity-100 ml-3"
                        } ${isActive ? "text-white" : "text-[#344054]"}`}
                      >
                        <span className="whitespace-nowrap">{route.label}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ======= Mobile Overlay ======= */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="fixed inset-0 bg-black/60  z-40 lg:hidden"
        ></div>
      )}
    </>
  );
};

export default AppSidebar;
