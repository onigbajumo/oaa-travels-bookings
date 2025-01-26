"use client";
import React, { useState } from "react";
import Tag from "../../../components/tag/Tag";
import { FaArrowRight, FaGlobe } from "react-icons/fa";
import Image from "next/image";

const data = [
  {
    title: "UI/UX Design",
    description:
      "We design user interfaces that are intuitive, engaging, and visually appealing...",
    icon: <FaGlobe />,
    image: "https://placehold.co/500.png",
    heading: "Our Service Includes",
    details: [
      {
        title: "User Research",
        description: "We conduct user research to understand the needs...",
      },
      {
        title: "Wireframing & Prototyping",
        description: "We create wireframes and prototypes to visualize...",
      },
      {
        title: "Visual Design",
        description: "We create visually appealing designs that reflect...",
      },
    ],
  },
  {
    title: "Development",
    description:
      "We build high-quality, scalable web and mobile applications...",
    icon: <FaGlobe />,
    image: "https://placehold.co/500.png",
    heading: "Our Service",
    details: [
      {
        title: "Frontend Development",
        description: "We use modern frameworks and libraries...",
      },
      {
        title: "Backend Development",
        description: "We create robust and scalable backend solutions...",
      },
    ],
  },
  // ... more items if needed
];

const Offer = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-20 bg-[#F4F7F8]">
      <div className="container">
      <div className="space-y-5">
        <Tag text="Our Services" />
        <h2 className="text-main">What We Offer</h2>
        <p>
          Creative solutions tailored to boost your business and leave a lasting
          impression.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="space-y-4 p-3 rounded-lg bg-white">
          {data.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                onClick={() => handleAccordionClick(index)}
                className="rounded-lg transition"
              >
                <div
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer hover:bg-main/10 
                  ${isActive ? "bg-main hover:bg-main/100" : "bg-white"}
                `}
                >
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-xl ${
                        isActive ? "text-white" : "text-secondary"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <h3
                      className={`font-semibold ${
                        isActive ? "text-white" : "text-black"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                </div>
                {isActive && (
                  <p className="mt-2 text-base text-gray-600 px-3 pb-3">
                    {item.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-white p-3 rounded-lg">
          {activeIndex !== null && (
            <>
              <Image
                width={1000}
                height={1000}
                src={data[activeIndex].image}
                alt={data[activeIndex].title}
                className="w-full h-auto rounded-lg aspect-[2/1] object-cover"
              />
              <h4 className="text-main font-bold my-2">
                {data[activeIndex].heading}
              </h4>

              <div className="space-y-4 mt-5">
                {data[activeIndex].details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="bg-secondary/20 p-2 rounded-md text-secondary">
                      <FaArrowRight />
                    </div>
                    <div>
                      <h4>{detail.title}</h4>
                      <p className="text-sm w-full lg:w-[80%]">
                        {detail.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      </div>
    </section>
  );
};

export default Offer;
