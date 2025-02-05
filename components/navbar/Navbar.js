"use client";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const pathname = usePathname();

  if (
    pathname.startsWith("/hub-login") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/author") ||
    pathname.startsWith("/superadmin") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/accept-invite") ||
    pathname.startsWith("/forgot-password")
  ) {
    return null;
  }

  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/about-us",
    },
    {
      title: "Services",
      path: "/services",
    },
    {
      title: "Upskill Program",
      path: "/upskill-program",
    },
    // {
    //   title: "Programs",
    //   dropdown: true,
    //   submenu: [
    //     { title: "Upskill Program", path: "#" },
    //     { title: "All Programs", path: "#" },
    //   ],
    // },
    {
      title: "Portfolio",
      path: "/portfolio",
    },

    {
      title: "iEnterprise",
      path: "/i-enterprise",
    },
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white lg:bg-[url('/images/background.png')] bg-no-repeat bg-cover">
      <div className="flex items-center justify-between py-4 container">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image
              src="/logo.png"
              width={400}
              height={400}
              alt="logo"
              className="w-36 md:w-48"
            />
          </Link>
        </div>

        {/* Nav Links (Desktop) */}
        <div className="hidden lg:flex space-x-8 items-center">
          {links.map((link, index) => (
            <div key={index} className="relative">
              {link.dropdown ? (
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <span
                    className={`${
                      pathname.startsWith("/services")
                        ? "text-main font-semibold"
                        : "font-semibold"
                    } hover:text-main`}
                  >
                    {link.title}
                  </span>
                  <IoIosArrowDown />
                  {dropdownOpen && (
                    <div className="absolute top-5 left-0 bg-white shadow-lg rounded-md w-64">
                      {link.submenu.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.path}
                          className={`font-semibold block px-4 py-2 hover:bg-gray-100 hover:text-main rounded-md ${
                            pathname === sub.path ? "text-main" : ""
                          }`}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.path}
                  className={`font-semibold ${
                    pathname === link.path ? "text-main border-b-2 border-secondary pb-1" : "hover:text-main border-b-2 border-transparent hover:border-secondary pb-1"
                  }`}
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}
          <Link
            href="/contact-us"
            className="bg-white flex items-center gap-2 rounded-full text-main font-bold px-8 py-2 border border-main"
          >
            Let{`’`}s Talk <Image src="/arrowE.svg" width={20} height={1} alt="arrow" />
          </Link>
        </div>

        {/* Hamburger Menu (Mobile) */}
        <div
          className="lg:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white !h-[100vh]">
          {links.map((link, index) => (
            <div key={index} className="border-b">
              {link.dropdown ? (
                <div>
                  <div
                    className="flex justify-between items-center px-4 py-2 cursor-pointer"
                    onClick={() =>
                      setDropdownOpen((prev) => (prev === index ? null : index))
                    }
                  >
                    <span
                      className={`${
                        pathname.startsWith("/services") ? "text-main" : ""
                      } hover:text-main`}
                    >
                      {link.title}
                    </span>
                    <IoIosArrowDown />
                  </div>
                  {dropdownOpen === index && (
                    <div className="bg-gray-50">
                      {link.submenu.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.path}
                          className={`block px-4 py-2 hover:bg-gray-100 ${
                            pathname === sub.path ? "text-main" : ""
                          }`}
                          onClick={handleLinkClick}
                        >
                          {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.path}
                  className={`block px-4 py-2 ${
                    pathname === link.path ? "text-main" : "hover:text-main"
                  } `}
                  onClick={handleLinkClick}
                >
                  {link.title}
                </Link>
              )}
            </div>
          ))}
          <div className="mt-3">
            <Link
              href="/contact-us"
              className="bg-white flex items-center gap-2 rounded-full text-main font-bold px-8 py-2 border border-main"
            >
              Let{`’`}s Talk <Image src="/arrowE.svg" width={20} height={1} alt="arrow" />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
