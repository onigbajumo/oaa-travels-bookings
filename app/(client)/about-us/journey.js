"use client"
import React, { useState } from "react";
import { BiSolidRightArrow } from "react-icons/bi";
import Tag from "../../../components/tag/Tag";
import Image from "next/image";

const data = [
  {
    year: "2020",
    description: [
      {
        text: "Established multiple schools focused on providing accessible, high-quality education in various disciplines. Successfully trained and upskilled numerous students, increasing employability and industry readiness. Implemented digital learning platforms to enhance accessibility for remote learners.",
        deal: "Students Deal",
      },
    ],
    image: "/images/journey.jpg",
  },
  {
    year: "2021",
    description: [
      {
        text: "Supported international students by connecting them with financial aid and funding opportunities. Partnered with key financial institutions to streamline funding processes, reducing barriers to education.",
        deal: "Access Park",
      },
      {
        text: "Efficiently managed parking, electricity, and utilities at Ojaja Mall (owned by the Oni of Ife). Enhanced mall operations by integrating automated solutions for utility management and access control.",
        deal: "In-House HR Application",
      },
    ],
    image: "/images/journey.jpg",
  },
  {
    year: "2022",
    description: [
      {
        text: "Developed a proprietary HR application that tracks student and staff performance, attendance, and task management. Introduced innovative HR functionalities, including performance evaluations and automated reporting.",
        deal: "Community Impact and Strategic Partnerships",
      },
      {
        text: "Built strategic partnerships with educational institutions and industry leaders to enhance training and employment opportunities. Contributed to social impact initiatives by fostering learning opportunities in underserved communities.",
        deal: "Innovation in Market Assist (Pending launch)",
      },
    ],
    image: "/images/journey.jpg",
  },
  {
    year: "2023",
    description: [
      {
        text: "Designed a system to help consumers shop efficiently, with a strong focus on user-centric innovation.",
      },
      {
        text: "Organizational Growth and Innovation",
      },
      {
        text: "Maintained a commitment to technological innovation by integrating cloud-based solutions for education and business services.",
      },
      {
        text: "Implemented continuous improvement initiatives for operational efficiency and resource optimization.",
      },
    ],
    image: "/images/journey.jpg",
  },
];

const Journey = () => {
  const [activeYear, setActiveYear] = useState(data[0].year);
  const activeData = data.find((item) => item.year === activeYear);

  return (
    <section className="container mx-auto py-20">
      <div className="mb-10">
        <Tag text="Our Story" />
        <h2 className="text-main text-2xl font-bold mt-4">Our Journey</h2>
        <p className="mt-2">
          We&apos;re proud to have partnered with forward-thinking clients from
          various industries, delivering exceptional results that drive their
          success.
        </p>
      </div>

      <div className="grid grid-cols-7 gap-8">
        <div className="col-span-2 sm:col-span-1 space-y-4 flex flex-col justify-between">
          {data.map((item) => (
            <button
              key={item.year}
              onClick={() => setActiveYear(item.year)}
              className={`text-left md:text-2xl lg:text-3xl xl:text-4xl font-bold cursor-pointer transition-colors flex items-center
                ${
                  item.year === activeYear
                    ? "text-main"
                    : "text-[#BDBDBD] hover:text-main"
                }`}
            >
              {item.year === activeYear && (
                <BiSolidRightArrow className="inline-block mr-2 text-secondary text-md md:text-lg lg:text-xl" />
              )}
              {item.year !== activeYear && (
                <BiSolidRightArrow className="inline-block mr-2 text-transparent text-md md:text-lg lg:text-xl" />
              )} {item.year}
            </button>
          ))}
        </div>

        <div className="col-span-5 lg:col-span-3 bg-[#F4F7F8] rounded-lg h-fit p-3 space-y-4">
          {activeData?.description?.map((desc, i) => (
            <div key={i} className="bg-[#F4F7F8] rounded-lg">
              <p>{desc.text}</p>
              {desc.deal && (
                <p className="mt-1 text-sm text-main font-semibold">
                  - {desc.deal}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="lg:col-span-3 hidden lg:flex items-start justify-center">
          {activeData?.image ? (
            <Image
              src={activeData.image}
              alt={`Year ${activeData.year}`}
              width={1000}
              height={1000}
              className="w-full object-cover aspect-square rounded-tr-[60px]"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </div>

    </section>
  );
};

export default Journey;
