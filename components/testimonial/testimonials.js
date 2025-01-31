"use client";
import React, { useState, useEffect } from "react";
import { CgArrowRightO, CgArrowLeftO } from "react-icons/cg";
import Image from "next/image";
import Tag from "../../components/tag/Tag";
import { Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react";

const testimonialColors = ["bg-[#FFF2E5]", "bg-[#FDE9F3]"];

const TestimonySection = ({ name, message, image, index }) => {
  const bgColor = index % 2 === 1 ? testimonialColors[0] : testimonialColors[1];

  return (
    <div
      className={`w-full ${bgColor} relative px-10 pt-12 pb-24 rounded-3xl group gap-8`}
    >
      <div className="flex flex-col justify-between gap-4">
        <div>{message}</div>
        <div className="font-semibold">- {name}</div>

        <div className="">
          <div className="bg-white absolute p-2 z-10 bottom-0 left-0 rounded-[25px] flex gap-4">
            <Image
              src={image || "/tes.png"}
              width={65}
              height={63}
              alt="testimony"
              className="rounded-[25px] object-cover w-16 aspect-square"
            />
          </div>

          <span
            className={`z-10 absolute bottom-20 left-0 w-12 h-8 rounded-bl-[15px] ${bgColor}`}
          ></span>
          <span className="bg-white h-12 w-6 absolute bottom-12 left-0 rounded"></span>
        </div>
      </div>
    </div>
  );
};

const Testimony = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const [cardsPerPage, setCardsPerPage] = useState(2);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/testimonial");
        if (!res.ok) {
          throw new Error(`Error fetching testimonials: ${res.statusText}`);
        }

        const data = await res.json();
        if ([200, 201].includes(res.status) && data.length > 0) {
          setTestimonials(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    setCardsPerPage(getCardsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCardsPerPage = () => {
    if (typeof window === "undefined") return 2;
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 1024) {
      return 2;
    }
    return 2;
  };

  const handleResize = () => {
    setCardsPerPage(getCardsPerPage());
  };

  const totalCards = testimonials.length;

  const handleNextCard = () => {
    if (currentCardIndex < totalCards - cardsPerPage) {
      setCurrentCardIndex((prev) => prev + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
    }
  };

  const isPrevDisabled = currentCardIndex === 0;
  const isNextDisabled = currentCardIndex >= totalCards - cardsPerPage;

  return (
    <section className="container py-20">
      <div className="space-y-5">
        <Tag text="Testimonials" />
        <h2 className="text-main">What Our Clients Say</h2>
        <p>Hear from those we&apos;ve empowered and inspired</p>
      </div>

      {loading ? (
        <div className="flex gap-8 mt-10">
          {Array.from({ length: cardsPerPage }).map((_, i) => {
            const colorIndex = (currentCardIndex + i) % 2;
            const bgColor =
              colorIndex === 1 ? testimonialColors[0] : testimonialColors[1];

            return (
              <div
                key={i}
                className={`w-full ${bgColor} relative px-10 pt-12 pb-24 rounded-3xl group gap-8`}
              >
                <div className="flex flex-col justify-between gap-4">
                  <SkeletonText noOfLines={3} spacing="4" />

                  <Skeleton height="20px" width="40%" />

                  <div className="bg-white absolute p-2 z-10 bottom-0 left-0 rounded-[25px] flex gap-4">
                    <SkeletonCircle size="16" />
                  </div>
                  <span
                    className={`z-10 absolute bottom-20 left-0 w-12 h-8 rounded-bl-[15px] ${bgColor}`}
                  ></span>
                  <span className="bg-white h-12 w-6 absolute bottom-12 left-0 rounded"></span>
                </div>
              </div>
            );
          })}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="mt-10">No testimonials found.</div>
      ) : (
        <div className="flex flex-col gap-6 mt-10">
          <div className="flex justify-end">
            <div className="flex mt-4 gap-4">
              <div
                className={`${
                  isPrevDisabled
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-[#134574] cursor-pointer"
                }`}
                onClick={!isPrevDisabled ? handlePrevCard : undefined}
              >
                <CgArrowLeftO size={30} />
              </div>

              <div
                className={`${
                  isNextDisabled
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-[#134574] cursor-pointer"
                }`}
                onClick={!isNextDisabled ? handleNextCard : undefined}
              >
                <CgArrowRightO size={30} />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {testimonials
              .slice(currentCardIndex, currentCardIndex + cardsPerPage)
              .map((testimonial, idx) => (
                <TestimonySection
                  key={testimonial._id || idx}
                  index={idx + currentCardIndex}
                  name={testimonial.name}
                  message={testimonial.message}
                  image={testimonial.image}
                />
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimony;
