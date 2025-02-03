"use client";
import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from "next/navigation";
import {projects} from "@/content/data";
import Image from "next/image";
import CTA from "@/components/CTA/cta";

const Page = () => {
  const { slug } = useParams();

  const project = projects.find((project) => project.slug === slug);

  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
          <div className="flex items-center gap-2 flex-wrap mb-5">
            <Link href="/" className="hover:text-secondary">
              Home
            </Link>
            <IoIosArrowForward />
            <Link href="/portfolio" className="hover:text-secondary">
              All Projects
            </Link>
            <IoIosArrowForward />
            <span className="text-gray-500">{project.title}</span>
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8">
              <h1 className="text-main capitalize">{project.title}</h1>
              
              <p>
                {project.description}
              </p>
            </div>
          </div>
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
