"use client";

import { useState, useEffect } from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import Link from "next/link";
import Tag from "../components/tag/Tag";
import { Skeleton, SkeletonCircle } from "@chakra-ui/react";

const FAQs = ({ limit }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/faqs");
        if (!response.ok) {
          throw new Error(`Error fetching FAQs: ${response.statusText}`);
        }
        const data = await response.json();
        if (data) {
          setFaqs(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchFaqs();
  }, []);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const displayedData = limit ? faqs.slice(0, limit) : faqs;

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
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="w-full p-4 bg-[#F2F2F2] rounded-lg flex justify-between items-center"
              >
                <Skeleton height="20px" width="70%" />

                <SkeletonCircle size="8" />
              </div>
            ))
          : displayedData.map((item, index) => (
              <div key={item._id || index}>
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full p-4 bg-[#F2F2F2] rounded-lg flex justify-between items-center"
                >
                  <span className="text-lg text-left">{item.title}</span>
                  <span>
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
