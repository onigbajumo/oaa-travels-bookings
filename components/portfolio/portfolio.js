"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CgArrowRight } from "react-icons/cg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Tag from "../../components/tag/Tag";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

const Portfolio = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
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
        setPortfolios(data);
      } catch (error) {
        console.error("Error fetching portfolios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < portfolios.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const project = portfolios[currentSlide];

  return (
    <section className="container py-20">
      <div className="space-y-5">
        <Tag text="Our Portfolio" />
        <h2 className="text-main">Crafting Digital Excellence</h2>
        <p>
          Explore our journey of innovation and creativity through projects that
          redefine possibilities.
        </p>
      </div>

      <div className="mt-10 rounded-xl border-2 p-2 md:p-5">
        {loading ? (
          <div>
            <div className="flex justify-end gap-3 mb-3">
              <Skeleton circle size="10" />
              <Skeleton circle size="10" />
            </div>
            <div className="space-y-10">
              <div className="grid md:grid-cols-2 gap-5">
                <Skeleton height="300px" width="100%" className="rounded-lg" />
                <div>
                  <Skeleton height="40px" width="100px" />
                  <div className="mt-5 space-y-5">
                    <Skeleton height="20px" width="200px" />
                    <Skeleton height="20px" width="150px" />
                    <SkeletonText mt="4" noOfLines={3} spacing="4" />
                    <Skeleton height="40px" width="150px" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : portfolios.length === 0 ? (
          <p>No portfolios available.</p>
        ) : (
          <>
            <div className="flex justify-end gap-3 mb-3">
              <button
                onClick={handlePrev}
                disabled={currentSlide === 0}
                className={`p-2 rounded-md border-2 ${
                  currentSlide === 0
                    ? "border-gray-400 text-gray-400 cursor-not-allowed"
                    : "border-main text-main hover:bg-main hover:text-white transition-colors"
                }`}
              >
                <FaArrowLeft />
              </button>

              <button
                onClick={handleNext}
                disabled={currentSlide === portfolios.length - 1}
                className={`p-2 rounded-md border-2 ${
                  currentSlide === portfolios.length - 1
                    ? "border-gray-400 text-gray-400 cursor-not-allowed"
                    : "bg-main border-main text-white hover:bg-white hover:text-main transition-colors"
                }`}
              >
                <FaArrowRight />
              </button>
            </div>

            <div className="space-y-10">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    width={1000}
                    height={1000}
                    className="w-full object-cover aspect-[4/3] rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex">
                    <Image
                      src={project.logo}
                      alt={project.title}
                      width={1000}
                      height={1000}
                      className="h-10 w-fit"
                    />
                  </div>

                  <div className="mt-5 space-y-5">
                    <p className="text-[#2E2E2E] text-sm font-semibold">
                      PROJECT SUMMARY
                    </p>

                    <div className="rounded bg-main/20 py-1 px-3 text-sm w-fit text-main font-semibold capitalize">
                      {project.type}
                    </div>

                    <h3 className="text-main font-bold capitalize">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#2E2E2E] capitalize">
                      Client: {project.client}
                    </p>
                    <p className="">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="bg-main lg:bg-transparent hover:bg-main rounded-full text-white lg:text-main hover:text-white text-center text-base px-4 py-2 border border-main font-medium transition-all ease-in-out duration-300 flex items-center gap-2"
                      >
                        Learn More <CgArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
