import React from 'react';
import Image from 'next/image'
import Link from "next/link"
import { LuDot } from "react-icons/lu";

import { BsArrowRight } from "react-icons/bs";

const services = [
    {
      imageSrc: "/service1.svg",
      title: "Brand Design",
      description: "Your brand is more than just a logo. It's your story, your voice, and your connection to the world. At Ehizua Hub, we go beyond aesthetics. We help you craft a powerful brand narrative that resonates, inspires, and drives results.",
      link: "/",
    },
    {
      imageSrc: "/service4.svg",
      title: "Web Design",
      description: "Your brand is more than just a logo. It's your story, your voice, and your connection to the world. At Ehizua Hub, we go beyond aesthetics. We help you craft a powerful brand narrative that resonates, inspires, and drives results.",
      link: "/",
    },
    {
      imageSrc: "/service3.svg",
      title: "App Design",
      description: "Your brand is more than just a logo. It's your story, your voice, and your connection to the world. At Ehizua Hub, we go beyond aesthetics. We help you craft a powerful brand narrative that resonates, inspires, and drives results.",
      link: "/",
    },
    {
        imageSrc: "/service2.svg",
        title: "Digital marketing",
        description: "Your brand is more than just a logo. It's your story, your voice, and your connection to the world. At Ehizua Hub, we go beyond aesthetics. We help you craft a powerful brand narrative that resonates, inspires, and drives results.",
        link: "/",
      },
  ];


const Design = () => {

    return (
        <div className='bg-[#134574] p-24'>
            <div className="mb-12 text-white">
            <h2 className='flex items-center text-xl'><LuDot  size={20}/> Our Service</h2>
            
          </div>
      {services.map((service, index) => (
        <div key={index} className='flex justify-between gap-8 space-x-12 px-4 pb-12 pt-16 border-b-[0.1px] border-gray-500'>
          <div className='w-2/3 flex gap-12'>
            <Image src={service.imageSrc} width={100} height={50} alt='service' />
            <div>
              <h2 className='font-semibold text-3xl text-white mb-4'>{service.title}</h2>
              <p className='text-white'>{service.description}</p>
            </div>
          </div>
          <div>
            <Link href={service.link} className="flex items-center gap-4 rounded-full py-4 px-8 bg-white text-[#134574]">
              Learn More <BsArrowRight />
            </Link>
          </div>
        </div>
      ))}
    </div>
    )
}

export default Design;