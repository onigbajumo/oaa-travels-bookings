"use client";
import React, { useState } from "react";
import Tag from "../../../components/tag/Tag";
import { FaArrowRight, FaGlobe } from "react-icons/fa";
import { MdPalette } from "react-icons/md";
import { BsXDiamondFill } from "react-icons/bs";
import { HiLightBulb } from "react-icons/hi";
import Image from "next/image";

const data = [
  {
    title: "IT Training Programs",
    description:
      "Gain industry-relevant skills through our comprehensive IT training courses. Our expert-led classes prepare you for today's competitive tech landscape",
    icon: <HiLightBulb />,
    image: "https://placehold.co/500.png",
    heading: "Our training programs includes:",
    details: [
      {
        title: "Full-Stack Web Development",
        description: "Master the art of web development by learning front-end and back-end technologies to build dynamic, responsive websites and applications",
      },
      {
        title: "UI/UX Design",
        description: "Learn to design user-friendly and aesthetically pleasing digital products that prioritize user experience",
      },
      {
        title: "Animation",
        description: "Acquire skills to create captivating animations for entertainment, education, and marketing",
      },
      {
        title: "Cinematography",
        description: "Master the art of storytelling through visual media and develop the technical skills needed for professional video production",
      },
    ],
  },
  {
    title: "IT Services",
    description:
      "Elevate your business with our range of professional IT services designed to strengthen your digital presence and streamline operations",
    icon: <FaGlobe />,
    image: "https://placehold.co/500.png",
    heading: "Our offerings includes:",
    details: [
      {
        title: "Web Development",
        description: "Build robust, custom websites that align with your brand's identity and deliver an exceptional user experience",
      },
      {
        title: "Digital Marketing",
        description: "Drive traffic, boost brand visibility, and grow your online presence through targeted digital marketing strategies ",
      },
      {
        title: "UI/UX Design",
        description: "Enhance customer satisfaction with well-designed, intuitive interfaces for your websites, apps, and digital products",
      },
    ],
  },
  {
    title: "iEnterprise",
    description:
      "Through IEnterprise, we deliver creative solutions that enhance brand identity, boost event impact, and capture life's unforgettable moments",
    icon: <BsXDiamondFill />,
    image: "https://placehold.co/500.png",
    heading: "Our services includes:",
    details: [
      {
        title: "Cinematography",
        description: "Capture high-quality visuals for events, commercials, films, and promotional videos. Our team ensures your story is told with impact",
      },
      {
        title: "Event Branding",
        description: "Make your event memorable with customized branding materials, from banners to signage that align with your brand identity",
      },
      {
        title: "Printing Services",
        description: "High-quality printing services for promotional materials, brochures, event materials, and corporate branding assets",
      },
    ],
  },
  {
    title: "Creative Tech School Program",
    description:
      "At EhizuaHub, we believe in nurturing the next generation of tech innovators. Our Creative Tech School Program is tailored for primary and secondary schools, providing students with essential tech skills that prepare them for the future.",
    icon: <MdPalette />,
    image: "https://placehold.co/500.png",
    heading: "We partner with schools to offer hands-on training in:",
    details: [
      {
        title: "Coding",
        description: "Introduce students to programming concepts, logical thinking, and problem-solving through interactive projects",
      },
      {
        title: "Animation",
        description: "Empower students to create digital animations, unlocking their creative potential",
      },
      {
        title: "Robotics",
        description: "Engage students in building and programming robots, fostering critical thinking, engineering, and problem-solving skills",
      },
      {
        title: "Cinematography",
        description: "Teach students how to produce visually engaging videos, enhancing their storytelling abilities",
      },
    ],
  },
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
                      className={`text-2xl ${
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
                      <p className="text-sm w-full ">
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
