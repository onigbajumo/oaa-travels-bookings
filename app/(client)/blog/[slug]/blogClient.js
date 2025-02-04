"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from "next/navigation";
import CTA from "@/components/CTA/cta";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

const BlogClient = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/blogs?slug=${slug}`);
        if (res.status === 404) {
          setError("not found");
          setBlog(null);
        } else if (!res.ok) {
          throw new Error("Failed to fetch blog");
        } else {
          const data = await res.json();
          setBlog(data);
          setError(null);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("not found");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <>
        <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
          <div className="container py-20">
            <div className="flex flex-col gap-4">
              <Skeleton height="20px" width="80px" />
              <Skeleton height="20px" width="120px" />
              <Skeleton height="30px" width="300px" />
            </div>
          </div>
        </section>

        <section className="container py-20 space-y-5 flex flex-col">
          <Skeleton height="300px" className="rounded-lg" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" />
        </section>
      </>
    );
  }

  if (error === "not found" || !blog) {
    return (
      <>
        <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
          <div className="container py-20 h-80 grid place-content-center">
            <h1 className="text-main capitalize">Blog Not Found</h1>
          </div>
        </section>

        <CTA
          pinkText="Ehizua way"
          preText="Build the"
          desc="Take the first step towards success and start achieving your goals today! Our services are tailored to meet your unique needs and help you reach new milestones."
        />
      </>
    );
  }

  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <Link href="/" className="hover:text-secondary">
              Home
            </Link>
            <IoIosArrowForward />
            <Link href="/blog" className="hover:text-secondary">
              All Articles
            </Link>
            <IoIosArrowForward />
            <span className="text-gray-500">{blog.title}</span>
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8">
              <h1 className="text-main capitalize">{blog.title}</h1>
              <div className="bg-white/50 p-3 rounded-full flex gap-5 w-fit flex-wrap">
                <p className="text-black px-5 py-2 rounded-full bg-white capitalize">
                  Category: {blog.category?.name || blog.category}
                </p>
                <p className="text-black px-5 py-2 rounded-full bg-white">
                  By {blog.author}, {new Date(blog.date).toLocaleDateString("en-GB")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20 space-y-5 flex flex-col">
        <div>
          <Image
            src={blog.image}
            alt={blog.title}
            width={1000}
            height={1000}
            className="w-full rounded-lg aspect-[3/1] object-cover"
          />
        </div>

        <div className="flex justify-center flex-col lg:items-center space-y-5">
          <h2 className="lg:w-4/5">{blog.title}</h2>
          <div
            className="text-[#777777] text-base leading-7 lg:w-4/5"
            dangerouslySetInnerHTML={{ __html: blog.body }}
          ></div>
        </div>
      </section>

      <CTA
        pinkText="Ehizua way"
        preText="Build the"
        desc="Take the first step towards success and start achieving your goals today! Our services are tailored to meet your unique needs and help you reach new milestones."
      />
    </>
  );
};

export default BlogClient;
