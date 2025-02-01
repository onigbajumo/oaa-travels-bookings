"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Tag from "../tag/Tag";
import { FaStar } from "react-icons/fa";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

const Courses = ({ limit, heading, subHeading }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchCourses = async () => {
        try {
          setIsLoading(true);
          const response = await fetch("/api/courses");
          const data = await response.json();
          if ([200, 201].includes(response.status) && data.length > 0) {
            setCourses(data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
  
      fetchCourses();
    }, []);

  const renderSkeletonCards = () => {
    return [...Array(limit || 3)].map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-2 md:p-3 hover:shadow-lg transition-all ease-in-out duration-300"
      >
        <div className="relative">
          <Skeleton className="rounded-xl" height="200px" />
        </div>

        <div className="space-y-4 mt-2">
          <Skeleton height="10px" width="40%" />
          <Skeleton height="14px" width="70%" />
          <SkeletonText noOfLines={2} spacing="2" />
          <div className="flex justify-between w-full">
            <Skeleton height="10px" width="25%" />
            <Skeleton height="10px" width="25%" />
          </div>
        </div>

        <div className="flex mt-2">
          <Skeleton height="40px" width="120px" borderRadius="full" />
        </div>
      </div>
    ));
  };

  const renderCourses = () => {
    const sliced = limit ? courses.slice(0, limit) : courses;

    return sliced.map((item, index) => (
      <div
        key={item._id || index}
        className="bg-white rounded-2xl p-2 md:p-3 hover:shadow-lg transition-all ease-in-out duration-300"
      >
        <div className="relative">
          <Image
            src={item.image}
            width={1000}
            height={1000}
            alt={item.title}
            className="rounded-xl object-cover aspect-[3/2]"
          />

          {item.tag && (
            <div className="absolute top-2 right-2 bg-white text-secondary px-3 py-1 rounded-full text-sm">
              {item.tag}
            </div>
          )}
        </div>

        <div className="space-y-4 mt-2">
          <p className="uppercase text-[#828282] font-semibold text-xs md:text-base">
            {item.category}
          </p>
          <h3 className="text-black font-bold">{item.title}</h3>
          <p className="text-[#C4C4C4] short">{item.description}</p>

          <div className="flex justify-between w-full">
            <p className="text-[#C4C4C4]">{item.duration}</p>
            <p className="text-black font-semibold flex items-center gap-2">
              <FaStar className="text-[#FAC036]" /> <span>{item.rating}/5</span>
            </p>
          </div>
        </div>

        <div className="flex mt-2">
          <Link
            href={`/upskill-program/${item.slug}`}
            className="bg-main lg:bg-transparent hover:bg-main rounded-full text-white lg:text-main hover:text-white text-center text-base px-4 py-2 border border-main font-medium transition-all ease-in-out duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <section className="py-20 bg-[#F4F7F8]">
      <div className="space-y-5 container">
        <Tag text="Training Program" />
        <h2 className="text-main">{heading}</h2>
        <p>{subHeading}</p>

        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {isLoading ? renderSkeletonCards() : renderCourses()}
          </div>
        </div>

        <div className="flex justify-center !mt-10">
          <Link
            href="/upskill-program/courses"
            className="bg-main rounded-full text-white text-center text-base px-7 py-3 font-medium"
          >
            View all courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Courses;
