"use client";
import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from "next/navigation";
import {blogs} from "@/content/data";
import Image from "next/image";
import CTA from "@/components/CTA/cta";

const Page = () => {
  const { slug } = useParams();

  const blog = blogs.find((blog) => blog.slug === slug);

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
                <p className="text-black px-5 py-2 rounded-full bg-white">Category: {blog.category}</p>
                <p className="text-black px-5 py-2 rounded-full bg-white">
                  By {blog.author}, {blog.date}
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
            dangerouslySetInnerHTML={{
              __html: blog.body,
            }}
          ></div>
        </div>
      </section>


      <CTA
        pinkText="Ehizua way"
        preText="Build the"
        desc="Take the first step towards success and start achieving your
                goals today! Our services are tailored to meet your unique needs
                and help you reach new milestones."
      />
    </>
  );
};

export default Page;
