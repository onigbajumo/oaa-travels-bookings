"use client"
import React, { useState, useEffect } from 'react';
import { LuDot } from 'react-icons/lu';
import { CgArrowRightO, CgArrowLeftO } from 'react-icons/cg';
import Image from 'next/image';

const testimony = [
  {
    name: 'Adam Lalana',
    message:
      'Our experience with Ehizua Hub has been nothing short of exceptional. They took our digital presence to the next level with their innovative strategies and attention to detail. From website design to social media management, they have exceeded our expectations at every step. Highly recommended! - Sarah W., CEO',
    img: '/tes.png',
  },
  {
    name: 'John Doe',
    message:
      'Our experience with Ehizua Hub has been nothing short of exceptional. They took our digital presence to the next level with their innovative strategies and attention to detail. From website design to social media management, they have exceeded our expectations at every step. Highly recommended!',
    img: '/tes.png',
  },
  {
    name: 'Benjamine Ehidoa',
    message:
      'Our experience with Ehizua Hub has been nothing short of exceptional. They took our digital presence to the next level with their innovative strategies and attention to detail. From website design to social media management, they have exceeded our expectations at every step. Highly recommended!',
    img: '/tes.png',
  },
  {
    name: 'Luke shaw',
    message:
      'Our experience with Ehizua Hub has been nothing short of exceptional. They took our digital presence to the next level with their innovative strategies and attention to detail. From website design to social media management, they have exceeded our expectations at every step. Highly recommended!',
    img: '/tes.png',
  },
];

const testimonialColors = ['bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-pink-200'];

const TestimonySection = ({ name, message, img, index }) => {

    const bgColor = testimonialColors[index % testimonialColors.length] || '';

  return (
    <div className={`w-full  ${bgColor} relative px-10 pt-12 pb-24 rounded-l-[50px] rounded-tr-[50px] group gap-8 `}>
      <div className="flex flex-col justify-between gap-4 ">
        <div>{message}</div>
        <div>{name}</div>

        <div className='md:hidden group-hover:flex '>

        <div className='bg-white absolute p-2 z-10 bottom-0 left-0 rounded-[25px] flex gap-4  '>

        <Image src={img} width={63} height={63} className='rounded-[25px]' />
        
        </div>
        <span className={`z-10 absolute bottom-0 left-20  w-12 h-12 rounded-b-[20px] ${bgColor}`}></span>
        <span className={`z-10 absolute bottom-20 left-0  w-12 h-8 rounded-bl-[15px] ${bgColor}`}></span>
        <span className='bg-[white] h-6 w-12 absolute bottom-0 left-12 rounded'></span>
        <span className='bg-[white] h-12 w-6 absolute bottom-12 left-0 rounded'></span>

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

  return (
    <div>
      <div className="flex px-8 md:pl-20 gap-12 flex-col lg:flex-row my-12 ">
        <div className="flex flex-col gap-4 px-8 md:w-[50em]">
          <div className="flex items-center">
            <LuDot className="" size={30} />
            <h2> Testimonials</h2>
          </div>
          <h2 className="text-[#0D1118] font-medium text-2xl">Read what our Clients are saying.</h2>
          <button className="rounded-full px-4 py-2 text-white bg-[#134574]">Let{`’`}s talk</button>
          <div className="flex mt-4 gap-4 text-[#134574]">
            <CgArrowLeftO size={20} onClick={handlePrevCard} disabled={currentCardIndex === 0} />
            <CgArrowRightO size={20} onClick={handleNextCard} disabled={currentCardIndex >= totalCards - cardsPerPage} />
          </div>
        </div>
        <div>
          <div className="flex gap-8">
            {testimony
              .slice(currentCardIndex, currentCardIndex + cardsPerPage)
              .map((testimonial, index) => (
                <TestimonySection key={index} index={index} {...testimonial} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimony;
