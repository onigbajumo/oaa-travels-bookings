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
           {/* <div className='absolute bottom-40 -left-20 px-4 gap-4 flex transform rotate-90 items-center'>
            <Link href='#footer' className='text-[#134574]'>Take me back to bottom</Link>
            <Image src="/hand.svg" width={20} height={20} className=' transform rotate-90' />
            </div> */}
         
            <div className=' rounded-lg mt-[-10px]  flex justify-around items-center  ' style={{
                height: "600px",
                backgroundImage: `url(/heroimage.svg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                
              }}>
                 <div className='text-center lg:px-[12em] md:px-16 px-4 space-y-4 pt-12'>
                 <h1 className= "csecondary font-extrabold  md:text-[4.5em] lg:text-[4.5em] xl:text-[6.5em] 2xl:text-[7em] sm:text-[3.5em]  text-[2.5em] lg:leading-[6rem] md:leading-[2rem] leading-[0.5em] text-[#134574]">
                  IT Services for</h1>
             
                  <Slider />
                  <p className='lg:px-[6rem] xl:px-[15rem]  px-8 text-base md:text-lg md:px-[4rem]'>
                    We Build software and deliver excellent IT services to forward-thinking businesses in Africa.
                  </p>
                  <div className='flex flex-col md:flex-row gap-4 md:gap-12 justify-center'>
                    <Link href=''>
                      <button className='rounded-full bg-[#134574] text-white px-12 py-4 text-sm md:text-base'>
                        Let{`’`}s Talk
                      </button>
                    </Link>
                    <Link href=''>
                      <button className='rounded-full border border-[#134574] text-[#134574] px-12 py-4 text-sm md:text-base'>
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