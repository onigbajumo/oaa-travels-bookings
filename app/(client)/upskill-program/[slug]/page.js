"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  PiClockCountdownBold,
  PiBriefcaseFill,
  PiUsersThreeBold,
} from "react-icons/pi";
import { MdLaptopWindows } from "react-icons/md";
import Image from "next/image";
import {
  FaArrowRight,
  FaCircle,
  FaRegDotCircle,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import Testimony from "../../../../components/testimonial/testimonials";
import CTA from "../../../../components/CTA/cta";
import FAQs from "../../../../components/faq";
import { IoIosArrowForward } from "react-icons/io";
import { useParams } from "next/navigation";
import courses from "@/content/data";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "curriculum", label: "Course Curriculum" },
  { id: "skills", label: "Knowledge & Skills" },
  { id: "certificate", label: "Certificate" },
  { id: "instructor", label: "Instructor" },
  { id: "payment", label: "Payment" },
];

const Page = () => {
  const { slug } = useParams();

  const course = courses.find((course) => course.slug === slug);

  const [openModules, setOpenModules] = useState([]);
  const [activeSection, setActiveSection] = useState("overview");

  const toggleModule = (index) => {
    setOpenModules((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      }
      return [...prev, index];
    });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
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
  }, []);

  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
        <div className="flex items-center gap-2 flex-wrap mb-5">
          <Link href="/" className="hover:text-secondary">Home</Link> <IoIosArrowForward /> <Link href="/upskill-program/courses" className="hover:text-secondary">All courses</Link> <IoIosArrowForward /> <Link href="#" className="text-gray-500">{course.title}</Link>
        </div>
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8">
              <h1 className="text-main">{course.title}</h1>
              <p className="xl:pr-48 lg:pr-12">{course.description}</p>

              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  href={`/enrol?course=${slug}`}
                  className="bg-main rounded-full text-white text-center text-base px-5 py-3 border-2 border-transparent font-medium"
                >
                  Enrol Now
                </Link>
                <Link
                  href="/contact-us"
                  className="rounded-full text-main text-center border-main text-base border-2 px-5 py-3 font-medium"
                >
                  Request Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-20 container space-y-10">
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl bg-[#F4F7F8] p-6 space-y-3">
            <PiClockCountdownBold className="text-secondary text-3xl" />
            <span className="text-black font-medium">Duration</span>
            <h4 className="capitalize font-semibold">
              comprehensive {course.duration} program
            </h4>
          </div>

          <div className="rounded-xl bg-[#F4F7F8] p-6 space-y-3">
            <PiBriefcaseFill className="text-secondary text-3xl" />
            <span className="text-black font-medium">Projects</span>
            <h4 className="capitalize font-semibold">
              Hands-On Industry Projects
            </h4>
          </div>

          <div className="rounded-xl bg-[#F4F7F8] p-6 space-y-3">
            <PiUsersThreeBold className="text-secondary text-3xl" />
            <span className="text-black font-medium">Level</span>
            <h4 className="capitalize font-semibold">{course.tag}</h4>
          </div>

          <div className="rounded-xl bg-[#F4F7F8] p-6 space-y-3">
            <MdLaptopWindows className="text-secondary text-3xl" />
            <span className="text-black font-medium">
              Flexible Learning Modes
            </span>
            <h4 className="capitalize font-semibold">
              {course.mode.join(" & ")}
            </h4>
          </div>
        </section>

        <section className="grid md:grid-cols-10 md:gap-8 gap-16">
          {/* Sticky Sidebar */}
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
            {/* Overview */}
            <div
              id="overview"
              className="space-y-4 border-b-2 pb-5 scroll-mt-24"
            >
              <div>
                <Image
                  src={course.image}
                  alt={course.title}
                  width={1000}
                  height={1000}
                  className="rounded-lg w-full object-cover aspect-[5/2]"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">{course.title}</h3>
                <p>{course.description}</p>
              </div>

              <div>
                <h3 className="text-main font-semibold">Key Highlights</h3>

                <div className="space-y-4 mt-5">
                  {course.highlights.map((highlight, i) => (
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
            </div>

            {/* Curriculum with Accordion */}
            <div id="curriculum" className="space-y-4 scroll-mt-24">
              <h3 className="text-main font-semibold">Curriculum</h3>

              <div className="space-y-4 border-b-2 pb-5">
                {course.curriculum.map((module, i) => {
                  const isOpen = openModules.includes(i);
                  return (
                    <div
                      key={i}
                      className={`cursor-pointer transition-colors duration-300 border rounded-md ${
                        isOpen
                          ? "bg-[#F4F7F8] border-gray-300"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      {/* Accordion Header */}
                      <div
                        className="p-4 flex items-center justify-between"
                        onClick={() => toggleModule(i)}
                      >
                        <h4 className="font-semibold">{module.module}</h4>
                        {isOpen ? (
                          <FaChevronDown className="text-secondary" />
                        ) : (
                          <FaChevronRight className="text-secondary" />
                        )}
                      </div>
                      {/* Accordion Content */}
                      {isOpen && (
                        <div className="p-4 space-y-2">
                          {module.topics.map((topic, tIndex) => (
                            <div key={tIndex}>
                              <h5 className="font-semibold">{topic}</h5>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Knowledge & Skills */}
            <div id="skills" className="space-y-4 border-b-2 pb-5 scroll-mt-24">
              <h3 className="text-main font-semibold">
                Knowledge & Skills You Will Learn
              </h3>

              <div className="flex flex-wrap gap-4">
                {course.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="border-2 border-main px-4 py-1 rounded-xl text-center"
                  >
                    <h5 className="font-semibold">{skill}</h5>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate */}
            <div
              id="certificate"
              className="space-y-4 border-b-2 pb-5 scroll-mt-24"
            >
              <h3 className="text-main font-semibold">Certificate</h3>

              <p>
                Upon completion of the program, you will receive an
                industry-recognized certificate showcasing your mastery of
                Fullstack Web Development. This certificate can be shared on
                professional platforms like LinkedIn or included in your
                portfolio.
              </p>

              <div className="flex justify-center">
                <Image
                  src="https://placehold.co/500x300.png"
                  width={1000}
                  height={1000}
                  alt="Certificate"
                  className="w-full md:w-2/3 rounded-md"
                />
              </div>
            </div>

            {/* Instructor */}
            <div
              id="instructor"
              className="space-y-4 border-b-2 pb-5 scroll-mt-24"
            >
              <h3 className="text-main font-semibold">Meet Your Instructor</h3>

              <div className="flex items-start gap-4">
                <div className="bg-[#F4F7F8] rounded-full w-64">
                  <Image
                    src={course.instructor.image}
                    width={1000}
                    height={1000}
                    alt={course.instructor.name}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold">{course.instructor.name}</h4>
                  <p className="text-black text-base font-medium">
                    {course.instructor.experience}
                  </p>
                  <p className="text-base">{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div
              id="payment"
              className="space-y-4 border-b-2 pb-5 scroll-mt-24"
            >
              <h3 className="text-main font-semibold">Payment Options</h3>

              <div className="grid md:grid-cols-2 gap-4">
                {course.payments.map((payment, i) => (
                  <div
                    key={i}
                    className="bg-[#F4F7F8] p-4 rounded-lg space-y-2"
                  >
                    <h4 className="font-semibold">{payment.title}</h4>
                    <p>{payment.description}</p>
                    <div className="flex gap-2">
                      <h5 className="font-semibold">{payment.price}</h5>{" "}
                      <span className="text-sm">{payment?.duration || ""}</span>
                    </div>

                    <div className="flex">
                      <Link
                        href={`/enrol?course=${slug}`}
                        className="bg-main rounded-full text-white text-center text-base px-5 py-2 font-medium"
                      >
                        Enrol Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Testimony />

      <section className="container py-20">
        <div className="relative">
          <div className="hidden sm:block">
            <Image
              src="/images/cta-bg-1.svg"
              alt="CTA Image"
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>

          <div className="sm:hidden">
            <Image
              src="/images/cta-bg-2.svg"
              alt="CTA Image"
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full h-[92%] flex justify-center items-center">
            <div className="p-3 sm:p-10 xl:p-24">
              <div className="flex flex-col items-center gap-4 sm:gap-7 xl:gap-10">
                <h1 className="text-white text-center">
                Take the first step towards mastering <span className="text-secondary capitalize">{course.title}</span>
                </h1>
                <p className="text-white text-center text-md sm:text-lg xl:text-2xl w-full lg:w-3/4">
                Don’t wait. Empower your future with skills that matter. Don’t wait. Empower your future with skills that matter
                </p>

                <div className="flex justify-center">
                  <Link
                    href={`/enrol?course=${slug}`}
                    className="bg-white rounded-full text-main text-center text-base px-7 py-3 font-medium"
                  >
                    Start Learning Today
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQs limit={4} />
    </>
  );
};

export default Page;
