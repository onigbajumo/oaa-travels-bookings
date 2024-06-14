"use client"
import { useEffect, useRef } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import { FaRegHandPointRight } from "react-icons/fa";
import "../../app/(client)/globals.css";
import Slider from "./Slider"

const HeroSection = () => {
  
    return (
        <div className='relative'>
           <div className='absolute bottom-40 -left-20 px-4 gap-4 flex transform rotate-90 items-center'>
            <Link href='#footer' className='text-[#134574]'>Take me back to bottom</Link>
            <Image src="/hand.svg" width={20} height={20} className=' transform rotate-90' />
            </div>
         
            <div className=' rounded-lg flex justify-around items-center gap-8 ' style={{
                height: "600px",
                backgroundImage: `url(/herE.svg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
                 <div className='text-center lg:px-[12em] md:px-16 px-4 space-y-4'>
             
                  <Slider />
                  <p className='lg:px-[12rem] xl:px-[15rem]  px-12 text-base md:text-lg md:px-[8rem]'>
                    We Build software and deliver excellent IT services to forward-thinking businesses in Africa.
                  </p>
                  <div className='flex flex-col md:flex-row gap-4 md:gap-12 justify-center'>
                    <Link href=''>
                      <button className='rounded-full bg-[#134574] text-white px-6 py-2 text-sm md:text-base'>
                        Let{`’`}s Talk
                      </button>
                    </Link>
                    <Link href=''>
                      <button className='rounded-full border border-[#134574] text-[#134574] px-6 py-2 text-sm md:text-base'>
                        Learn More
                      </button>
                    </Link>
                  </div>
              </div>

        </div>
        </div>
    )
}

export default HeroSection;