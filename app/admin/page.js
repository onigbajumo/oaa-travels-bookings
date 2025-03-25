"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Overview from "./component/overview";
import { MdOutlineArrowOutward } from "react-icons/md";
import {
  Box,
  Heading,
  Select,
  
} from "@chakra-ui/react";

const getAccessToken = () => localStorage.getItem("accessToken");

const Page = () => {
  const [overviewData, setOverviewData] = useState({
    
    enrollments: 0,
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
          enrollmentsRes,
          usersRes,
        ] = await Promise.all([
          fetch("/api/contestant", { method: "GET", headers })
        ]);

        const enrollmentsData = await enrollmentsRes.json();


        setOverviewData({
          enrollments: enrollmentsData.length
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const overview = [
    { title: "Contestants", value: overviewData.enrollments, path: "/admin/contestants" },
  ];

  return (
    <Box className="space-y-5">
      <Heading size="lg" mb={6}>📊 Admin Dashboard</Heading>

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

      <Overview />
    </Box>
  );
};

export default Page;
