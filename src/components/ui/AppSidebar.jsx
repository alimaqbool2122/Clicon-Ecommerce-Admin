"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";
import {
  AccountSettingsIcon,
  BrowingHistoryIcon,
  CardsAndAddressIcon,
  ChatIcon,
  CompareIcon,
  DashboardIcon,
  EditProfileIcon,
  LogoutIcon,
  OrderIcon,
  ShopingCartIcon,
  TruckTrackingIcon,
  WishlistIcon,
} from "../svg/Icons";
import ROUTES from "@/constants/routes";

const AppSidebar = () => {
  const { open, openMobile, setOpenMobile } = useSidebar();
  const isCollapsed = !open;
  const isMobileOpen = openMobile;
  const setIsMobileOpen = setOpenMobile;
  const pathname = usePathname();

  const routes = [
    { icon: <DashboardIcon />, label: "Dashboard", href: ROUTES.DASHBOARD },
    { icon: <OrderIcon />, label: "Order History", href: ROUTES.ORDER_HISTORY },
    {
      icon: <TruckTrackingIcon />,
      label: "Track Order",
      href: ROUTES.TRACK_ORDER,
    },
    {
      icon: <ShopingCartIcon />,
      label: "Shopping Cart",
      href: ROUTES.SHOPING_CARD,
    },
    { icon: <WishlistIcon />, label: "wishlist", href: ROUTES.WISHLIST },
    { icon: <CompareIcon />, label: "Compare", href: ROUTES.COMPARE },
    {
      icon: <CardsAndAddressIcon />,
      label: "Cards & Address",
      href: ROUTES.CARDS_ADDRESS,
    },
    {
      icon: <BrowingHistoryIcon />,
      label: "Browsing History",
      href: ROUTES.BROWSING_HISTORY,
    },
    {
      icon: <ChatIcon />,
      label: "Chat",
      href: "#",
    },
    {
      icon: <EditProfileIcon />,
      label: "Edit profile",
      href: ROUTES.PROFILE(1),
    },
    {
      icon: <AccountSettingsIcon />,
      label: "Account Settings",
      href: ROUTES.PROFILE_SETTINGS,
    },
    {
      icon: <LogoutIcon />,
      label: "Sign out",
      href: "#",
    },
  ];

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
              className={`absolute top-0 transition-all duration-500 ease-in-out ${
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
              className={`absolute top-0 transition-all duration-500 ease-in-out ${
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
              const isActive = pathname === route.href;

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
