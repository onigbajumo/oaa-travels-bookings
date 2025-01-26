"use client";
import { useState } from "react";
import Tag from "../components/tag/Tag";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import Link from "next/link";

const FAQs = ({ limit }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const data = [
    {
      title: "What is your development process like?",
      content:
        " Our workflow is outlined in 6 simple steps, you can read more here .....",
    },
    {
      title: "Do you offer ongoing maintenance and support?",
      content:
        "Yes we offer ongoing maintenance and support after project completion to our clients.",
    },
    {
      title: "How much does your service cost? ",
      content:
        "Our rates for services are priced based on your service inquiry, let’s chat and you’ll get a quote emailed to you.",
    },
    {
      title: "What kind of projects do you take on?",
      content:
        "We are sector agnostic when we work on projects, our priority is ensuring your problem are solved with our digital skills.",
    },
    {
      title: "What information do you need from me to get started?",
      content:
        "That’s easy, we just need a brief about your project containing everything you need and we can schedule a discovery call to initiate the project.",
    },
    {
      title: "How will I be involved in the development process?",
      content:
        "We ensure to keep our clients and stakeholders involved in the design and development phases of the project to maintain smooth communication and understanding between both parties.",
    },
    {
      title: "How will I know the project is on track?",
      content:
        "That’s easy, we make use of project management software's to improve our operational efficiency and keep you updated as well.",
    },
    {
      title: "What happens if I need to make changes during development?",
      content:
        "Not a problem, we can be flexible however it would come at an extra cost if the changes are outside the scope of the project.",
    },
    {
      title: "Do you offer custom software development?",
      content:
        "Yes. We design, build, and deploy bespoke software applications tailored to your unique needs.",
    },
  ];

  const displayedData = limit ? data.slice(0, limit) : data;

  return (
    <section className="container py-20">
      <div className="space-y-5">
        <Tag text="Frequently Asked Questions" />
        <h2 className="text-main">Got Questions? We’ve Got Answers</h2>
        <p>
          Explore our frequently asked questions to learn more about our
          services, programs, and how we can help you succeed
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {displayedData.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => handleToggle(index)}
              className="w-full p-4 bg-[#F2F2F2] rounded-lg flex justify-between items-center"
            >
              <span className="text-lg text-left">{item.title}</span>
              <span className="">
                {activeIndex === index ? (
                  <IoIosArrowDropupCircle className="text-3xl text-main" />
                ) : (
                  <IoIosArrowDropdownCircle className="text-3xl text-main" />
                )}
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-4 pb-4 pt-4 bg-[#FEFCFC] rounded-lg">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-3 justify-center mt-10">
        <h3 className="font-semibold">
          Didn’t find what you were looking for?
        </h3>
        <Link
          href="/contact-us"
          className="bg-main rounded-full text-white text-center text-base px-7 py-3 font-medium"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
};

export default FAQs;
