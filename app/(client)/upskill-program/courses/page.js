"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { BiFilter } from "react-icons/bi";
import CTA from "../../../../components/CTA/cta";

const skill = [
  {
    title: "Full Stack Development",
    category: "development",
    desc: "Master front-end and back-end technologies to build dynamic, responsive websites and applications",
    duration: "6 months",
    rating: "4.5",
    path: "course",
    image: "https://placehold.co/500.png",
    tag: "most popular",
  },
  {
    title: "Full Stack Development",
    category: "design",
    desc: "Master front-end and back-end technologies to build dynamic, responsive websites and applications",
    duration: "2 months",
    rating: "4.5",
    path: "course",
    image: "https://placehold.co/500.png",
  },
  {
    title: "Full Stack Development",
    category: "marketing",
    desc: "Master front-end and back-end technologies to build dynamic, responsive websites and applications",
    duration: "6 months",
    rating: "4.5",
    path: "course",
    image: "https://placehold.co/500.png",
    tag: "most popular",
  },
  {
    title: "Full Stack Development",
    category: "development",
    desc: "Master front-end and back-end technologies to build dynamic, responsive websites and applications",
    duration: "2 months",
    rating: "4.5",
    path: "course",
    image: "https://placehold.co/500.png",
    tag: "most popular",
  },
  {
    title: "Full Stack Development",
    category: "development",
    desc: "Master front-end and back-end technologies to build dynamic, responsive websites and applications",
    duration: "3 months",
    rating: "4.5",
    path: "course",
    image: "https://placehold.co/500.png",
    tag: "most popular",
  },
];

const Page = () => {
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedDuration, setSelectedDuration] = useState("Duration");
  const [searchTerm, setSearchTerm] = useState("");
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(skill.map((s) => s.category)));
    return ["Category", ...uniqueCategories];
  }, []);

  const durations = useMemo(() => {
    const uniqueDurations = Array.from(new Set(skill.map((s) => s.duration)));
    return ["Duration", ...uniqueDurations];
  }, []);

  const filteredSkills = useMemo(() => {
    return skill.filter((item) => {
      const matchesCategory =
        selectedCategory === "Category" || item.category === selectedCategory;
      const matchesDuration =
        selectedDuration === "Duration" || item.duration === selectedDuration;
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesDuration && matchesSearch;
    });
  }, [selectedCategory, selectedDuration, searchTerm]);

  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8">
              <h1 className="text-main">Explore Our Courses</h1>
              <p className="xl:pr-48 lg:pr-12">
                Master the skills of tomorrow with industry-driven courses
                designed for every stage of your journey
              </p>

              <div className="flex flex-col md:flex-row gap-4 p-2 bg-white/50 rounded-xl md:rounded-full md:w-fit">
                <div className="flex items-center gap-2 ">
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
                  <select
                    className="bg-transparent border-none focus:outline-none w-full"
                    value={selectedDuration}
                    onChange={(e) => setSelectedDuration(e.target.value)}
                  >
                    {durations.map((dur) => (
                      <option key={dur} value={dur}>
                        {dur}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F7F8]">
        <div className="container">
          <div className="flex justify-end">
            <div>
              <input
                type="text"
                placeholder="Search for a course"
                className="bg-white border border-[#828282] focus:outline-none px-4 py-2 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredSkills.length === 0 ? (
            <p className="text-center mt-10 text-lg font-medium">
              No courses available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
              {filteredSkills.map((item, index) => (
                <div
                  key={index}
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
                    <p className="text-[#C4C4C4]">{item.desc}</p>
                    <div className="flex justify-between w-full">
                      <p className="text-[#C4C4C4]">{item.duration}</p>
                      <p className="text-black font-semibold flex items-center gap-2">
                        <FaStar className="text-[#FAC036]" />
                        <span>{item.rating}/5</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex mt-2">
                    <Link
                      href={`/upskill-program/${item.path}`}
                      className="bg-main lg:bg-transparent hover:bg-main rounded-full text-white lg:text-main hover:text-white text-center text-base px-4 py-2 border border-main font-medium transition-all ease-in-out duration-300"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTA
        desc="Let us help you find the perfect course to achieve your goals"
        preText="Not Sure Where to"
        pinkText="Start"
        endText="?"
      />
    </>
  );
};

export default Page;
