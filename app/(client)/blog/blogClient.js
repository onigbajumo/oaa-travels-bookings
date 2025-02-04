"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { BiFilter } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Skeleton, SkeletonText } from "@chakra-ui/react";
import CTA from "@/components/CTA/cta";
import Testimony from "@/components/testimonial/testimonials";
import Tag from "@/components/tag/Tag";

export default function Blogs() {
  const [blogsData, setBlogsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/blogs");
        const data = await response.json();
        if ([200, 201].includes(response.status) && data.length > 0) {
          setBlogsData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } 
    };

    fetchBlogs();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(blogsData.map((b) => b.category?.name).filter((cat) => !!cat))
    );
    return ["Category", ...uniqueCategories];
  }, [blogsData]);

  const filteredBlogs = useMemo(() => {
    return blogsData.filter((item) => {
      const matchesCategory =
        selectedCategory === "Category" ||
        item.category?.name === selectedCategory;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogsData, selectedCategory, searchTerm]);

  const featuredBlog = useMemo(() => {
    if (blogsData.length === 0) return null;
    const featured = blogsData.find((blog) => blog.isFeatured === true);
    return featured
      ? featured
      : blogsData[Math.floor(Math.random() * blogsData.length)];
  }, [blogsData]);

  const renderSkeletonCards = () => {
    return [...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-2 md:p-3 transition-all ease-in-out duration-300"
      >
        <Skeleton height="200px" className="rounded-xl" />

        <div className="space-y-4 mt-2">
          <Skeleton height="10px" width="40%" />
          <Skeleton height="10px" width="60%" />

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

  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <Link href="/" className="hover:text-secondary">
              Home
            </Link>
            <IoIosArrowForward />
            <span className="text-gray-500">All Articles</span>
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8">
              <h1 className="text-main">Stay Informed, Stay Inspired</h1>
              <p className="xl:pr-48 lg:pr-12">
                Explore insights, industry trends, and expert opinions to keep
                you ahead in the digital space
              </p>

              <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/50 rounded-xl md:rounded-full md:w-fit">
                <div className="flex items-center gap-2">
                  <BiFilter /> Filter by:
                </div>

                <div className="bg-white rounded-full p-2">
                  <select
                    className="bg-transparent border-none focus:outline-none w-full"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "Category"
                          ? "Category"
                          : cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-white rounded-full p-2">
                  <input
                    type="text"
                    placeholder="Search for a blog post"
                    className="border-none rounded-full placeholder:text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F7F8]">
        <div className="container">
          <div className="mb-7">
            <Tag text="Featured Article" />
          </div>
          {isLoading ? (
            <Skeleton height="300px" className="rounded-xl" />
          ) : (
            featuredBlog && (
              <div
                key={featuredBlog.slug}
                className="bg-white rounded-2xl p-2 md:p-3 hover:shadow-lg transition-all ease-in-out duration-300 flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="relative md:w-1/2">
                  <Image
                    src={featuredBlog.image}
                    width={1000}
                    height={1000}
                    alt={featuredBlog.title}
                    className="rounded-xl object-cover aspect-[3/2] lg:aspect-[2/1]"
                  />
                  {featuredBlog.category && (
                    <div className="absolute top-2 right-2 bg-white text-secondary px-3 py-1 rounded-full text-sm capitalize">
                      {featuredBlog.category.name
                        ? featuredBlog.category.name
                        : featuredBlog.category}
                    </div>
                  )}
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center space-y-3 md:space-y-4">
                  <h3 className="text-black font-bold capitalize mt-2">
                    {featuredBlog.title}
                  </h3>
                  <p className="text-[#C4C4C4] short">{featuredBlog.body}</p>
                  <div className="flex justify-between">
                    <p className="text-[#C4C4C4]">{featuredBlog.author}</p>
                    <p className="text-black">
                      {new Date(featuredBlog.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                  <div className="flex mt-2">
                    <Link
                      href={`/blog/${featuredBlog.slug}`}
                      className="bg-main lg:bg-transparent hover:bg-main rounded-full text-white lg:text-main hover:text-white text-center text-base px-4 py-2 border border-main font-medium transition-all ease-in-out duration-300"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </section>

      <section className="py-20 bg-[#F4F7F8]">
        <div className="container">
          <div className="mb-7">
            <Tag text="Latest Articles" />
          </div>
          <div className="mt-10">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {renderSkeletonCards()}
              </div>
            ) : filteredBlogs.length === 0 ? (
              <p className="text-center mt-10 text-lg font-medium">
                No blog posts available
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBlogs.map((item) => (
                  <div
                    key={item.slug}
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
                        {item.category && (
                          <div className="absolute top-2 right-2 bg-white text-secondary px-3 py-1 rounded-full text-sm capitalize">
                            {item.category.name
                              ? item.category.name
                              : item.category}
                          </div>
                        )}
                      </div>
                      <h3 className="text-black font-bold capitalize mt-2">
                        {item.title}
                      </h3>
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
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Testimony />

      <CTA
        pinkText="Ehizua way"
        preText="Build the"
        desc="Take the first step towards success and start achieving your
                goals today! Our services are tailored to meet your unique needs
                and help you reach new milestones."
      />
    </>
  );
}
