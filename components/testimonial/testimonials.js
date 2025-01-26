"use client";
import React, { useState, useEffect } from "react";
import { CgArrowRightO, CgArrowLeftO } from "react-icons/cg";
import Image from "next/image";
import Tag from "../../components/tag/Tag";

const testimony = [
  {
    name: "Vice Principal, Living Spring School",
    message:
      "Our experience with Ehizua Hub has been nothing short of exceptional. They took our digital presence to the next level with their innovative strategies and attention to detail. From website design to social media management, they have exceeded our expectations at every step. Highly recommended! ",
    img: "/tes.png",
  },
  {
    name: "David, Sales Manager, Vine Foods",
    message:
      "Our experience with Ehizua Hub has been nothing short of exceptional. They took our digital presence to the next level with their innovative strategies and attention to detail. From website design to social media management, they have exceeded our expectations at every step. Highly recommended!",
    img: "/tes.png",
  },
  {
    name: "Kemi, Data Science Student, Ehizua Hub",
    message:
      "Our experience with Ehizua Hub has been nothing short of exceptional. They took our digital presence to the next level with their innovative strategies and attention to detail. From website design to social media management, they have exceeded our expectations at every step. Highly recommended!",
    img: "/tes.png",
  },
  {
    name: "Chioma, Unicorn Family Enterprise",
    message:
      "Our experience with Ehizua Hub has been nothing short of exceptional. They took our digital presence to the next level with their innovative strategies and attention to detail. From website design to social media management, they have exceeded our expectations at every step. Highly recommended!",
    img: "/tes.png",
  },
];

const testimonialColors = ["bg-[#FFF2E5]", "bg-[#FDE9F3]"];

const TestimonySection = ({ name, message, img, index }) => {
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
              src={img}
              width={65}
              height={63}
              alt="testimony"
              className="rounded-[25px]"
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
  const [cardsPerPage, setCardsPerPage] = useState(2);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    setCardsPerPage(getCardsPerPage());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getCardsPerPage = () => {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 1024) {
      return 2;
    } else {
      return 2;
    }
  };

  const handleResize = () => {
    setCardsPerPage(getCardsPerPage());
  };

  const totalCards = testimony.length;

  const handleNextCard = () => {
    if (currentCardIndex < totalCards - cardsPerPage) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
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

      <div className="flex flex-col gap-6">
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

        <div>
          <div className="flex gap-8">
            {testimony
              .slice(currentCardIndex, currentCardIndex + cardsPerPage)
              .map((testimonial, idx) => (
                <TestimonySection
                  key={idx}
                  index={idx + currentCardIndex}
                  {...testimonial}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimony;
