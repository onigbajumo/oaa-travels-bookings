import React from 'react'
import { LuDot } from "react-icons/lu";
import Image from 'next/image'
import Link from 'next/link';
import { BsArrowUpLeft } from "react-icons/bs";
import { HiOutlineArrowLongRight } from "react-icons/hi2";


const Portfolio = () => {
  return (
    <div>
     <div className="flex justify-between md:flex-row-reverse flex-col gap-8 my-24 mx-12">

        <div className="">
          <div className="mb-12">
            <h2 className='flex'><LuDot /> Our Portfolio</h2>
            <h1 className='font-medium text-3xl md:pr-24 pt-8'>Take a Look at some of our projects.</h1>
          </div>


          <div className="flex flex-col gap-8">

              <div className="">
                <div className='relative  py-6 mb-4 group'>
                  <div className='absolute right-0 top-6 md:hidden flex md:group-hover:flex'>

                      <div className=' rounded-tr-[25px] h-4 w-[5em] bg-transparent border-r-[10px] mr-[-0.6em] mt-[-1px] border-white  '></div>
                  
                      <div className='bg-white rounded-bl-[25px] h-10 w-[18em] flex items-center pb-4 px-4 gap-2 '>
                        <div className="text-[12px] font-medium bg-[#EF26891A] px-2  rounded-full">WEB APP</div>
                        <div className="text-[12px] font-medium bg-[#1345741A] px-2 rounded-full">WEBSITE</div>
                        <div className="text-[12px] font-medium bg-[#FF7A001A] px-2 rounded-full">BRANDING</div>
                      </div>

                  </div>

                    <Image src='/port1.png' width={700} height={600} />


                    <div className="absolute left-0 bottom-5 mt-2 w-1/2">

                        <Link href="/">
                          <botton className="md:bg-white border  md:text-[#134574] text-white bg-[#134574] py-2 px-8 rounded-full hover:bg-[#134574] hover:text-white flex gap-4 items-center">
                            <h2>View Project</h2>

                            <HiOutlineArrowLongRight  size={30}/>
                            
                          </botton>
                        
                        </Link>

                    </div>
                </div>
                <p>2023</p>
                <h2 className='font-medium text-2xl text-[#0D1118]'>Dashboard Design</h2>
              </div>

              <div className="">
                <div className="relative  py-6 mb-4 group">
                    <div className='absolute right-0 top-6 md:hidden flex md:group-hover:flex'>

                        <div className=' rounded-tr-[25px] h-4 w-[5em] bg-transparent border-r-[10px] mr-[-0.6em] mt-[-1px] border-white  '></div>

                        <div className='bg-white rounded-bl-[25px] h-10 w-[18em] flex items-center pb-4 px-4 gap-2 '>
                          <div className="text-[12px] font-medium bg-[#EF26891A] px-2  rounded-full">WEB APP</div>
                          <div className="text-[12px] font-medium bg-[#1345741A] px-2 rounded-full">WEBSITE</div>
                          <div className="text-[12px] font-medium bg-[#FF7A001A] px-2 rounded-full">BRANDING</div>
                        </div>

                    </div>

                <Image src='/port2.png' width={700} height={600} />

                <div className="absolute left-0 bottom-0 mt-2 w-1/2">

                <Link href="/">
                          <botton className="md:bg-white border  md:text-[#134574] text-white bg-[#134574] py-2 px-8 rounded-full hover:bg-[#134574] hover:text-white flex gap-4 items-center">
                            <h2>View Project</h2>

                            <HiOutlineArrowLongRight  size={30}/>
                            
                          </botton>
                        
                        </Link>
                  </div>

                </div>
                <p>2023</p>
                <h2 className='font-medium text-2xl text-[#0D1118]'>Dashboard Design</h2>
              </div>
           </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className=''>
            <div className="relative  py-6 mb-4 group">
              <div className='absolute right-0 top-6 md:hidden flex md:group-hover:flex'>

                  <div className=' rounded-tr-[25px] h-4 w-[5em] bg-transparent border-r-[10px] mr-[-0.6em] mt-[-1px] border-white  '></div>
                  
                  <div className='bg-white rounded-bl-[25px] h-10 w-[18em] flex items-center pb-4 px-4 gap-2 '>
                    <div className="text-[12px] font-medium bg-[#EF26891A] px-2  rounded-full">WEB APP</div>
                    <div className="text-[12px] font-medium bg-[#1345741A] px-2 rounded-full">WEBSITE</div>
                    <div className="text-[12px] font-medium bg-[#FF7A001A] px-2 rounded-full">BRANDING</div>
                  </div>

              </div>


            <Image src='/port3.png' width={700} height={600} />

              <div className="absolute left-0 bottom-0 mt-2 w-1/2">

              <Link href="/">
                          <botton className="md:bg-white border  md:text-[#134574] text-white bg-[#134574] py-2 px-8 rounded-full hover:bg-[#134574] hover:text-white flex gap-4 items-center">
                            <h2>View Project</h2>

                            <HiOutlineArrowLongRight  size={30}/>
                            
                          </botton>
                        
                        </Link>
              </div>
            </div>
            <p>2023</p>
            <h2 className='font-medium text-2xl text-[#0D1118]'>Dashboard Design</h2>
          </div>


          <div className=''>
            <div className="relative  py-6 mb-4 group">
            <div className='absolute right-0 top-6 md:hidden flex md:group-hover:flex'>

                  <div className=' rounded-tr-[25px] h-4 w-[5em] bg-transparent border-r-[10px] mr-[-0.6em] mt-[-1px] border-white  '></div>
                  
                  <div className='bg-white rounded-bl-[25px] h-10 w-[18em] flex items-center pb-4 px-4 gap-2 '>
                    <div className="text-[12px] font-medium bg-[#EF26891A] px-2  rounded-full">WEB APP</div>
                    <div className="text-[12px] font-medium bg-[#1345741A] px-2 rounded-full">WEBSITE</div>
                    <div className="text-[12px] font-medium bg-[#FF7A001A] px-2 rounded-full">BRANDING</div>
                  </div>

                  </div>

              <Image src='/port4.png' width={700} height={600} />
                      <div className="absolute left-0 bottom-0 mt-2 w-1/2">

                      <Link href="/">
                          <botton className="md:bg-white border  md:text-[#134574] text-white bg-[#134574] py-2 px-8 rounded-full hover:bg-[#134574] hover:text-white flex gap-4 items-center">
                            <h2>View Project</h2>

                            <HiOutlineArrowLongRight  size={30}/>
                            
                          </botton>
                        
                        </Link>
                    </div>
            </div>

            <p>2023</p>
            <h2 className='font-medium text-2xl text-[#0D1118]'>Dashboard Design</h2>
          </div>

          <div className='flex'>
            <div>

            <h1 className='my-12 text-[#0D1118] font-medium text-4xl '>You wanna see <br /> more?</h1>
            <Link href='#'  className='rounded-full border border-[#134574] hover:bg-[#134574] hover:text-white flex px-24 py-16 gap-4 md:text-[#134574] md:bg-white text-2xl bg-[#134574] text-white '> <BsArrowUpLeft size={30} /> View all <br /> work</Link>
            </div>
            <div></div>
          
          </div>
        </div>
</div>

      <div></div>
    </div>
  )
}

export default Portfolio
