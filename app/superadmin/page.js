"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineArrowOutward } from "react-icons/md";

const getAccessToken = () => localStorage.getItem("accessToken");

const Page = () => {
  const [overviewData, setOverviewData] = useState({
    faqs: 0,
    blogs: 0,
    portfolios: 0,
    categories: 0,
    contacts: 0,
    courses: 0,
    enrollments: 0,
    staff: 0,
    testimonials: 0,
    users: 0,
    admins: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAccessToken();
        const headers = { "Content-Type": "application/json" };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        const [
          faqsRes,
          blogsRes,
          portfoliosRes,
          categoriesRes,
          contactsRes,
          coursesRes,
          enrollmentsRes,
          staffRes,
          testimonialsRes,
          usersRes,
        ] = await Promise.all([
          fetch("/api/faqs", { method: "GET", headers }),
          fetch("/api/blogs", { method: "GET", headers }),
          fetch("/api/portfolios", { method: "GET", headers }),
          fetch("/api/categories", { method: "GET", headers }),
          fetch("/api/contacts", { method: "GET", headers }),
          fetch("/api/courses", { method: "GET", headers }),
          fetch("/api/enroll", { method: "GET", headers }),
          fetch("/api/staff", { method: "GET", headers }),
          fetch("/api/testimonial", { method: "GET", headers }),
          fetch("/api/users", { method: "GET", headers }),
        ]);

        const faqsData = await faqsRes.json();
        const blogsData = await blogsRes.json();
        const portfoliosData = await portfoliosRes.json();
        const categoriesData = await categoriesRes.json();
        const contactsData = await contactsRes.json();
        const coursesData = await coursesRes.json();
        const enrollmentsData = await enrollmentsRes.json();
        const staffData = await staffRes.json();
        const testimonialsData = await testimonialsRes.json();
        const usersData = await usersRes.json();


        setOverviewData({
          faqs: faqsData.length,
          blogs: blogsData.length,
          portfolios: portfoliosData.length,
          categories: categoriesData.length,
          contacts: contactsData.length,
          courses: coursesData.length,
          enrollments: enrollmentsData.length,
          staff: staffData.length,
          testimonials: testimonialsData.length,
          users: usersData.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const overview = [
    { title: "FAQs", value: overviewData.faqs, path: "/superadmin/faqs" },
    { title: "Blogs", value: overviewData.blogs, path: "/superadmin/blog" },
    { title: "Portfolios", value: overviewData.portfolios, path: "/superadmin/portfolios" },
    { title: "Categories", value: overviewData.categories, path: "/superadmin/categories" },
    { title: "Contacts", value: overviewData.contacts, path: "/superadmin/contacts" },
    { title: "Courses", value: overviewData.courses, path: "/superadmin/courses" },
    { title: "Enrollments", value: overviewData.enrollments, path: "/superadmin/enrollment" },
    { title: "Staff", value: overviewData.staff, path: "/superadmin/staffs" },
    { title: "Testimonials", value: overviewData.testimonials, path: "/superadmin/testimonials" },
    { title: "Users", value: overviewData.users, path: "/superadmin/users" },
  ];

  return (
    <div className="space-y-5">
      <div className="py-3">
        <h3 className="text-2xl font-semibold">Dashboard Overview</h3>
      </div>

      <div>
        <div className="grid md:grid-cols-4 gap-3">
          {overview.map((item, index) => (
            <div
              key={index}
              className="space-y-2 p-4 rounded-xl border-2 bg-white shadow"
            >
              <h6 className="text-gray-600">Total {item.title}</h6>
              <p className="text-xl font-bold">{item.value}</p>
              <Link
                href={item.path}
                className="text-secondary hover:underline mt-2 inline-flex gap-1 items-center"
              >
                View {item.title} <MdOutlineArrowOutward className="text-xl" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
