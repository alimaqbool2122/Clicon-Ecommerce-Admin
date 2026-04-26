"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  AccountSettingsIcon,
  ArrowDown,
  EditProfileIcon,
  InfoIcon,
  LogoutIcon,
  MenubarIcon,
  MoonIcon,
  NotificationIcon,
  SearchIcon,
} from "../svg/Icons";
import Image from "next/image";
import ROUTES from "@/constants/routes";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSidebar } from "@/components/ui/sidebar";

const DashboardHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const routes = [
    {
      icon: <EditProfileIcon />,
      label: "Edit profile",
      href: "#",
    },
    {
      icon: <AccountSettingsIcon />,
      label: "Account Settings",
      href: "#",
    },
    {
      icon: <InfoIcon />,
      label: "Support",
      href: "#",
    },
  ];
  return (
    <>
      <div className="sticky top-0 z-999 flex items-center justify-between px-6 py-4 bg-white border-b border-[#e4e7ec]">
        {/* search & menu bar */}
        <div className="flex items-center gap-4">
          {/* menuopen & close */}
          <div>
            <button
              onClick={toggleSidebar}
              className="grid place-content-center text-[#667085] border border-[#e4e7ec] w-11 h-11 rounded-[8px] cursor-pointer"
            >
              <MenubarIcon />
            </button>
          </div>
          <div className="relative hidden xl:block">
            <button className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer">
              <SearchIcon />
            </button>
            <input
              type="text"
              placeholder="Search or type command..."
              className="w-107.5 h-11 pl-12 pr-4 border border-[#e4e7ec] rounded-[8px] shadow-[0px_1px_2px_0px_#1018280d] outline-[#FA8232] placeholder:text-sm placeholder:text-gray-400"
            />
          </div>
        </div>
        {/* notification & user profile */}
        <div className="flex items-center gap-3">
          {/* theme switch */}
          <button className="w-11 h-11 grid place-content-center bg-white text-[#667085] border border-[#e4e7ec] rounded-full duration-500 ease-in-out hover:bg-gray-100 hover:text-[#344054] cursor-pointer">
            <MoonIcon />
          </button>
          {/* notification */}
          <button className="relative w-11 h-11 grid place-content-center bg-white text-[#667085] border border-[#e4e7ec] rounded-full duration-500 ease-in-out hover:bg-gray-100 hover:text-[#344054] cursor-pointer">
            <NotificationIcon />
            <span className="absolute top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-orange-400 flex">
              <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
            </span>
          </button>
          {/* user profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center ml-1 cursor-pointer"
            >
              <div className="relative w-11 h-11 overflow-hidden rounded-full mr-3">
                <Image
                  src="/image/user/owner.png"
                  alt="user"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-[#344054] font-medium mr-1">
                Musharof
              </span>
              <div
                className={`text-[#667085] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              >
                <ArrowDown />
              </div>
            </button>
            {/* Profile Dropdown */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-15.5 right-0 w-65 rounded-2xl border border-[#e4e7ec] bg-white p-3 dark:border-gray-800 shadow-[0px_12px_16px_-4px_#10182814,0px_4px_6px_-2px_#10182808]"
                >
                  {/* user info */}
                  <div className="flex flex-col items-start space-y-0.5">
                    <span className="text-sm font-medium text-[#344054]">
                      Musharof Chowdhury
                    </span>
                    <span className="text-[#667085] text-[12px]">
                      randomuser@pimjo.com
                    </span>
                  </div>
                  {/* Profile link */}
                  <ul className="space-y-1 pt-4 border-b border-[#e4e7ec] pb-3">
                    {routes.map((route, index) => {
                      const isActive = pathname === route.href;

                      return (
                        <li key={index}>
                          <Link
                            href={route.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className={`flex items-center gap-3 text-sm font-medium py-2 px-3 rounded-[8px] transition duration-500 ease-in-out capitalize ${
                              isActive
                                ? "bg-[#FA8232] text-white "
                                : "text-[#667085] bg-white hover:bg-gray-100 hover:text-[#344054]"
                            }`}
                          >
                            {route.icon}
                            <span
                              className={
                                isActive ? "text-white" : "text-[#344054]"
                              }
                            >
                              {route.label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  {/* logout */}
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center gap-3 mt-2.5 w-full text-sm font-medium py-2 px-3 rounded-[8px] transition duration-500 ease-in-out capitalize cursor-pointer text-[#667085] bg-white hover:bg-gray-100 hover:text-[#344054] "
                  >
                    <LogoutIcon />
                    <span className="text-[#344054]">Sign out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHeader;
