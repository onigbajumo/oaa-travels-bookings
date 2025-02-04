"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Tag from "../tag/Tag";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

const FeaturedBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if ([200, 201].includes(response.status) && data.length > 0) {
          setBlogs(data.reverse());
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } 
    };

    fetchBlogs();
  }, []);

  const renderSkeletonCards = () => {
    return Array.from({ length: 3 }).map((_, index) => (
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

  const renderBlogs = () => {
    return blogs.slice(0, 3).map((item, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-2 md:p-3 hover:shadow-lg transition-all ease-in-out duration-300 flex flex-col justify-between"
      >
        <div>
          <div className="relative">
            <Image
              src={item.image}
              width={1000}
              height={1000}
              alt={item.title}
              className="rounded-xl object-cover aspect-[3/2]"
            />
            {item.category && item.category.name && (
              <div className="absolute top-2 right-2 bg-white text-secondary px-3 py-1 rounded-full text-sm capitalize">
                {item.category.name}
              </div>
            )}
          </div>
          <h3 className="text-black font-bold capitalize mt-2">{item.title}</h3>
        </div>
        <div className="space-y-4 mt-2">
          <p className="text-[#C4C4C4] short">{item.body}</p>

          <div className="flex justify-between">
            <p className="text-[#C4C4C4]">{item.author}</p>
            <p className="text-black">
              {new Date(item.date).toLocaleDateString("en-GB")}
            </p>
          </div>

          <div className="flex mt-2">
            <Link
              href={`/blog/${item.slug}`}
              className="bg-main lg:bg-transparent hover:bg-main rounded-full text-white lg:text-main hover:text-white text-center text-base px-4 py-2 border border-main font-medium transition-all ease-in-out duration-300"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="py-20 bg-[#F4F7F8]">
      <div className="space-y-5 container">
        <Tag text="Featured Blog" />
        <h2 className="text-main">Explore Our Blog</h2>
        <p>
          Explore insights, industry trends, and expert opinions to keep you
          ahead in the digital space
        </p>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {isLoading ? renderSkeletonCards() : renderBlogs()}
          </div>
        </div>
        <div className="flex justify-center !mt-10">
          <Link
            href="/blog"
            className="bg-main rounded-full text-white text-center text-base px-7 py-3 font-medium"
          >
            View all articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlogs;
