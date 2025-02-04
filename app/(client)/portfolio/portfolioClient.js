"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CgArrowRight } from "react-icons/cg";
import CTA from "../../../components/CTA/cta";
import Testimony from "../../../components/testimonial/testimonials";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

const Portfolio = () => {
  const [filterType, setFilterType] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/portfolios");
        if (!res.ok) {
          throw new Error("Failed to fetch portfolios");
        }
        const data = await res.json();
        setProjects(data.reverse());
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const types = ["all", ...new Set(projects.map((project) => project.type))];
  const handleFilterClick = (type) => {
    setFilterType(type);
  };

  const filteredProjects =
    filterType === "all"
      ? projects
      : projects.filter((project) => project.type === filterType);

  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8">
              <h1 className="text-main">Our Projects</h1>
              <p className="xl:pr-48 lg:pr-12">
                Discover how we blend innovation, creativity, and technology to
                deliver transformative solutions. From groundbreaking digital
                experiences to visually compelling designs, explore the projects
                that define our journey to excellence.
              </p>
              {loading ? (
                <div className="flex items-center gap-5">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton
                      key={index}
                      height="40px"
                      width="100px"
                      borderRadius="9999px"
                    />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <div className="flex items-center gap-5 bg-white/50 rounded-full p-3 w-fit">
                    <div
                      onClick={() => handleFilterClick("all")}
                      className={`cursor-pointer border border-main px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap
                        ${
                          filterType === "all"
                            ? "bg-main text-white"
                            : "bg-white text-main"
                        }`}
                    >
                      Explore All ({projects.length})
                    </div>
                    {types
                      .filter((type) => type !== "all")
                      .map((type) => {
                        const typeCount = projects.filter(
                          (p) => p.type === type
                        ).length;
                        return (
                          <div
                            key={type}
                            onClick={() => handleFilterClick(type)}
                            className={`cursor-pointer border border-main px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap
                              ${
                                filterType === type
                                  ? "bg-main text-white"
                                  : "bg-white text-main"
                              }`}
                          >
                            {type} ({typeCount})
                          </div>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-5 py-20">
        {loading ? (
          <div className="grid md:grid-cols-2 gap-7">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="bg-[#F4F7F8] rounded-lg flex flex-col"
                key={index}
              >
                <Skeleton
                  height="200px"
                  width="100%"
                  className="rounded-tr-lg rounded-tl-lg"
                />
                <div className="p-2 md:p-4 bg-[#F4F7F8] rounded-br-lg rounded-bl-lg flex flex-col justify-between h-full">
                  <Skeleton height="20px" width="50%" />
                  <Skeleton height="16px" width="80%" />
                  <SkeletonText mt="4" noOfLines={3} spacing="4" />
                  <Skeleton height="40px" width="40%" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-7">
            {filteredProjects.map((project, index) => (
              <div
                className="bg-[#F4F7F8] rounded-lg flex flex-col"
                key={index}
              >
                <div>
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    width={1000}
                    height={1000}
                    className="w-full object-cover aspect-[4/3] rounded-tr-lg rounded-tl-lg"
                  />
                </div>
                <div className="p-2 md:p-4 bg-[#F4F7F8] rounded-br-lg rounded-bl-lg flex flex-col justify-between h-full">
                  <div>
                    <div className="flex justify-between items-start flex-col md:flex-row gap-2">
                      <Image
                        src={project.logo}
                        alt={project.title}
                        width={1000}
                        height={1000}
                        className="h-14 w-fit"
                      />
                      <div className="rounded bg-main/20 py-1 px-3 text-sm w-fit text-main font-semibold capitalize">
                        {project.type}
                      </div>
                    </div>

                    <div className="mt-5 space-y-5 flex flex-col justify-between">
                      <p className="text-[#2E2E2E] text-sm font-semibold">
                        PROJECT SUMMARY
                      </p>
                      <h3 className="text-main font-bold capitalize">
                        {project.title}
                      </h3>
                      <p className="text-sm text-[#2E2E2E] capitalize">
                        Client: {project.client}
                      </p>
                      <p>{project.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5">
                    <Link
                      href={`/portfolio/${project.slug}`}
                      className="bg-main lg:bg-transparent hover:bg-main rounded-full text-white lg:text-main hover:text-white text-center text-base px-4 py-2 border border-main font-medium transition-all ease-in-out duration-300 flex items-center gap-2"
                    >
                      Learn More <CgArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Testimony />

      <CTA
        pinkText="Ehizua way"
        preText="Build the"
        desc="Take the first step towards success and start achieving your goals today! Our services are tailored to meet your unique needs and help you reach new milestones."
      />
    </>
  );
};

export default Portfolio;
