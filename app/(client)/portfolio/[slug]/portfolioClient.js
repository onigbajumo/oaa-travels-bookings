"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowRight, FaCircle, FaRegDotCircle } from "react-icons/fa";
import { LiaIndustrySolid } from "react-icons/lia";
import { PiRocketDuotone } from "react-icons/pi";
import { IoMdGlobe } from "react-icons/io";
import { Skeleton, SkeletonText } from "@chakra-ui/react";

import Testimony from "../../../../components/testimonial/testimonials";
import CTA from "../../../../components/CTA/cta";
import FAQs from "../../../../components/faq";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "challenges", label: "Challenges & Solutions" },
  { id: "technology", label: "Technology Stack" },
  { id: "team", label: "Team Composition" },
  { id: "screen", label: "Project Screens" },
  { id: "conclusion", label: "Conclusion" },
];

export default function Programs() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openModules, setOpenModules] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/portfolios?slug=${slug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch project");
        }
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  useEffect(() => {
    if (!project) return;
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -60% 0px",
      threshold: [0, 0.3, 0.6, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sectionElements = sections.map((s) => document.getElementById(s.id));
    sectionElements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      sectionElements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, [project]);

  if (loading) {
    return (
      <>
        <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
          <div className="container py-20">
            <div className="flex items-center gap-2 flex-wrap mb-5">
              <Skeleton width="100px" height="20px" />
              <IoIosArrowForward className="text-gray-400" />
              <Skeleton width="100px" height="20px" />
              <IoIosArrowForward className="text-gray-400" />
              <Skeleton width="150px" height="20px" />
            </div>
            <div className="space-y-6 flex flex-col justify-center">
              <div className="space-y-8">
                <Skeleton height="40px" width="300px" />
                <SkeletonText noOfLines={3} spacing="4" />
                <div className="flex flex-col md:flex-row gap-4">
                  <Skeleton height="40px" width="200px" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="py-20 container space-y-10">
          <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Skeleton height="100px" />
            <Skeleton height="100px" />
            <Skeleton height="100px" />
            <Skeleton height="100px" />
          </section>

          <section className="grid md:grid-cols-10 md:gap-8 gap-16">
            <div className="hidden md:block md:col-span-3 p-4 rounded-lg border-2 space-y-2 sticky top-20 self-start">
              {sections.map((sec, idx) => (
                <Skeleton key={idx} height="20px" />
              ))}
            </div>
            <div className="md:col-span-7 space-y-4">
              <Skeleton height="40px" width="200px" />
              <SkeletonText noOfLines={4} spacing="4" />
              <Skeleton height="300px" />
              <SkeletonText noOfLines={2} spacing="4" />
            </div>
          </section>
        </div>

        <Testimony />
        <CTA
          pinkText="Ehizua way"
          preText="Build the"
          desc="Take the first step towards success and start achieving your goals today! Our services are tailored to meet your unique needs and help you reach new milestones."
        />
        <FAQs limit={4} />
      </>
    );
  }

  if (!project) {
    return (
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20 text-center">
          <h1 className="text-main text-3xl font-bold">Project Not Found</h1>
          <p className="mt-4 text-gray-600">
            Sorry, the project you are looking for does not exist.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/"
              className="bg-main text-white px-6 py-3 rounded-full"
            >
              Go Home
            </Link>
            <Link
              href="/portfolio"
              className="border border-main text-main px-6 py-3 rounded-full"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
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
            <Link href="/portfolio" className="hover:text-secondary">
              All projects
            </Link>
            <IoIosArrowForward />
            <span className="text-gray-500">{project.title}</span>
          </div>

          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8">
              <h1 className="text-main capitalize">{project.title}</h1>
              <p className="xl:pr-48 lg:pr-12">{project.description}</p>
              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  href={project.projectLink}
                  target="_blank"
                  className="bg-main rounded-full text-white text-center text-base px-5 py-3 border-2 border-transparent font-medium"
                >
                  View live project
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-20 container space-y-10">
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl bg-[#F4F7F8] p-6 space-y-3">
            <LiaIndustrySolid className="text-secondary text-3xl" />
            <span className="text-black font-medium">Industry</span>
            <h4 className="capitalize font-semibold">{project.industry}</h4>
          </div>

          <div className="rounded-xl bg-[#F4F7F8] p-6 space-y-3">
            <PiRocketDuotone className="text-secondary text-3xl" />
            <span className="text-black font-medium">Year</span>
            <h4 className="capitalize font-semibold">{project.year}</h4>
          </div>

          <div className="rounded-xl bg-[#F4F7F8] p-6 space-y-3">
            <PiRocketDuotone className="text-secondary text-3xl" />
            <span className="text-black font-medium">Team Number</span>
            <h4 className="capitalize font-semibold">{project?.teamNumber}</h4>
          </div>

          <div className="rounded-xl bg-[#F4F7F8] p-6 space-y-3">
            <IoMdGlobe className="text-secondary text-3xl" />
            <span className="text-black font-medium">Location</span>
            <h4 className="capitalize font-semibold">{project.location}</h4>
          </div>
        </section>

        <section className="grid md:grid-cols-10 md:gap-8 gap-16">
          <div className="hidden md:block md:col-span-3 p-4 rounded-lg border-2 space-y-2 sticky top-20 self-start">
            {sections.map(({ id, label }) => {
              const isActive = activeSection === id;
              return (
                <Link
                  key={id}
                  href={`#${id}`}
                  className={`${
                    isActive ? "text-secondary" : "text-[#828282]"
                  } font-semibold flex items-center gap-2`}
                >
                  {isActive ? (
                    <FaRegDotCircle className="text-sm" />
                  ) : (
                    <FaCircle className="text-sm" />
                  )}
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="md:col-span-7 space-y-4">
            <div
              id="overview"
              className="space-y-4 border-b-2 pb-5 scroll-mt-24"
            >
              <h2>Project Overview</h2>
              <div className="space-y-2">
                <h3 className="font-semibold capitalize">{project.title}</h3>
                <p>{project.description}</p>
              </div>

              {project.features && (
                <div>
                  <h3 className="text-main font-semibold">Key Highlights</h3>
                  <div className="space-y-4 mt-5">
                    {project.features.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="bg-secondary/20 p-2 rounded-md text-secondary">
                          <FaArrowRight />
                        </div>
                        <div>
                          <h5 className="font-semibold">{highlight}</h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="!my-10">
                <Link
                  href={project.projectLink}
                  target="_blank"
                  className="bg-main rounded-full text-white text-center text-base px-5 py-2 border-2 border-transparent font-medium"
                >
                  View live project
                </Link>
              </div>

              <div>
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  width={1000}
                  height={1000}
                  className="rounded-lg w-full object-cover aspect-[5/2]"
                />
              </div>
            </div>

            <div id="challenges" className="space-y-4 scroll-mt-24">
              <h2>Challenges & Solutions</h2>
              <p>{project.challenges.heading}</p>

              <div className="space-y-4 border-b-2 pb-5">
                {project.challenges.data.map((item, i) => (
                  <div key={i}>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-main">
                        {item.problem.title}
                      </h3>
                      <p>{item.problem.description}</p>
                    </div>

                    <div className="mt-3">
                      <h4 className="font-semibold text-main text-md mb-2">
                        Our Solutions
                      </h4>
                      <ul className="list-disc pl-5 space-y-3">
                        {item.solution.map((solution, i) => (
                          <li key={i}>
                            <h5 className="font-semibold text-[#636262]">
                              {solution}
                            </h5>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="technology"
              className="space-y-4 border-b-2 pb-5 scroll-mt-24"
            >
              <h2>Technology Stack</h2>
              <p>
                Finding trusted vendors in crowded markets is time-consuming.
                Market prices vary widely with no way to compare beforehand.
              </p>
              <div className="flex flex-wrap gap-4">
                {project.technology.map((skill, i) => (
                  <div
                    key={i}
                    className="border-2 border-main px-4 py-1 rounded-xl text-center"
                  >
                    <h5 className="font-semibold capitalize text-main">
                      {skill}
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            <div id="team" className="space-y-4 border-b-2 pb-5 scroll-mt-24">
              <h2>Team Composition</h2>
              <p>
                Finding trusted vendors in crowded markets is time-consuming.
                Market prices vary widely with no way to compare beforehand.
              </p>
              <div className="space-y-5">
                <h4 className="text-main font-semibold">
                  Project Team Members
                </h4>
                {project.team.map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <div className="bg-secondary/20 p-2 rounded-md text-secondary">
                      <FaArrowRight />
                    </div>
                    <p className="text-black">
                      <span className="font-semibold">{item.title}</span>{" "}
                      {item.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div id="screen" className="border-b-2 pb-5 scroll-mt-24">
              <h2>Project Screens</h2>
              <div className="grid md:grid-cols-2 gap-8 mt-5">
                {project.gallery.map((image, i) => (
                  <div key={i}>
                    <Image
                      src={image}
                      alt={project.title}
                      width={1000}
                      height={1000}
                      className="rounded-lg w-full aspect-video object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div
              id="conclusion"
              className="space-y-4 border-b-2 pb-5 scroll-mt-24"
            >
              <h2>Conclusion</h2>
              <p>{project.conclusion}</p>
            </div>
          </div>
        </section>
      </div>

      <Testimony />

      <CTA
        pinkText="Ehizua way"
        preText="Build the"
        desc="Take the first step towards success and start achieving your goals today! Our services are tailored to meet your unique needs and help you reach new milestones."
      />

      <FAQs limit={4} />
    </>
  );
}
