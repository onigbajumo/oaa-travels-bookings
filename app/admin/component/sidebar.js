"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";
import {
  PiArrowsInLineHorizontalFill,
  PiArrowsOutLineHorizontalFill, PiBooks, PiUsersBold, PiTagSimple
} from "react-icons/pi";
import Image from "next/image";
import { CiGrid42 } from "react-icons/ci";
import { MdOutlineArticle, MdOutlinePermMedia, MdOutlineReviews } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
import { LuMessageSquareText, LuBriefcaseBusiness } from "react-icons/lu";
import { RiQuestionnaireLine } from "react-icons/ri";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const whenActive = usePathname();

  const { logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth < 1280) {
        setIsSidebarOpen(false);
      } else if (window.innerWidth >= 1280) {
        setIsSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSidebarVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isSidebarVisible]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleLinkClick = () => {
    if (isSidebarVisible) {
      setIsSidebarVisible(false);
    }
  };

  const mainNavlink = [
    {
      name: "Dashboard",
      icon: <CiGrid42 size="20" />,
      path: "/admin",
    },
    {
      name: "Staffs",
      icon: <MdOutlinePermMedia size="20" />,
      path: "/admin/staffs",
    },
    {
      name: "Blogs",
      icon: <MdOutlineArticle size="20" />,
      path: "/admin/blog",
    },
    {
      name: "Portfolios",
      icon: <LuBriefcaseBusiness size="20" />,
      path: "/admin/portfolios",
    },
    {
      name: "Courses",
      icon: <PiBooks size="20" />,
      path: "/admin/courses",
    },
    {
      name: "Courses Enrollment",
      icon: <PiBooks size="20" />,
      path: "/admin/enrollment",
    },
    {
      name: "Categories",
      icon: <PiTagSimple size="20" />,
      path: "/admin/categories",
    },
    {
      name: "Testimonials",
      icon: <MdOutlineReviews size="20" />,
      path: "/admin/testimonials",
    },
    {
      name: "Contact Messages",
      icon: <LuMessageSquareText size="20" />,
      path: "/admin/contacts",
    },
    {
      name: "FAQs",
      icon: <RiQuestionnaireLine size="20" />,
      path: "/admin/faqs",
    },
    
  ];

  return (
    <div>
      {/* Hamburger Menu */}
      <button
        className="md:hidden p-2 text-black top-2 left-1 z-50 fixed"
        onClick={toggleMobileSidebar}
      >
        {isSidebarVisible ? "" : <FiMenu size={24} />}
      </button>

      {/* Backdrop when sidebar is open */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleMobileSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-white border-r border-secondary/50 top-0 h-full md:h-screen p-5 transition-all duration-300 z-40 overflow-y-auto fixed md:sticky
          ${isSidebarOpen ? "w-[270px]" : "w-[90px]"} 
          ${isSidebarVisible ? "block left-0 w-[270px] h-[100vh]" : "hidden"} 
          md:block md:relative`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            {/* Sidebar Logo */}
            <div className="flex justify-between items-center mb-6">
              {isSidebarOpen ? (
                <Image
                  src="/logo.png"
                  width={300}
                  height={50}
                  className="w-40"
                  alt="Logo"
                />
              ) : (
                <Image
                  src="/icon.png"
                  width={50}
                  height={50}
                  className="w-16"
                  alt="Logo"
                />
              )}
              <button
                className="md:hidden text-secondary"
                onClick={toggleMobileSidebar}
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Main Nav List */}
            <div className="flex flex-col gap-2">
              {mainNavlink.map((item, index) => {
                const isActive = whenActive === item.path;
                return (
                  <div key={index}>
                    <div
                      className={`flex items-center justify-between gap-4 p-2 rounded group cursor-pointer ${
                        isActive ? "bg-secondary" : "hover:bg-secondary"
                      }`}
                    >
                      <Link
                        href={item.path}
                        className="flex items-center gap-2 flex-grow"
                        onClick={handleLinkClick}
                      >
                        <div
                          className={`text-black group-hover:text-white ${
                            isActive ? "text-white" : ""
                          }`}
                        >
                          {item.icon}
                        </div>
                        <p
                          className={`text-sm text-black group-hover:text-white ${
                            isSidebarOpen ? "block" : "hidden"
                          } ${isActive ? "text-white" : ""}`}
                        >
                          {item.name}
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })}

              {/* Logout Button */}
              <div>
                <button
                  onClick={logout}
                  className={`flex items-center justify-between gap-4 p-2 rounded group cursor-pointer hover:bg-secondary w-full text-left transition-colors duration-200 ${
                    false ? "bg-secondary text-white" : "text-black"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-grow">
                    <FiLogOut
                      size={20}
                      className="text-black group-hover:text-white"
                    />
                    <p
                      className={`text-sm text-black group-hover:text-white ${
                        isSidebarOpen ? "block" : "hidden"
                      }`}
                    >
                      Logout
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Collapse/Expand Button */}
          <div className="mt-6">
            <button
              onClick={toggleSidebar}
              className="flex items-center gap-2 p-2 rounded group cursor-pointer hover:bg-secondary w-full text-black hover:text-white transition-colors duration-200"
            >
              {isSidebarOpen ? (
                <>
                  <PiArrowsInLineHorizontalFill size={20} />
                  <p className="text-sm text-black group-hover:text-white">
                    Collapse
                  </p>
                </>
              ) : (
                <PiArrowsOutLineHorizontalFill size={20} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
