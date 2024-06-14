import React from 'react'
import Image from 'next/image'
import Form from './form'


const Conatct = () => {

 
  return (
    <div className='md:mx-24 mx-4 my-24'>
            <div className='relative rounded-tl-[25px] bg-[#134574]' >

            <div className=" absolute top-0 right-0 w-[15em] bg-[white]  h-6"></div>
            <div className=" absolute top-0 right-0 w-8  bg-[white] h-[80px]"></div>
            <div className="absolute top-12 right-0 bg-[#134574] h-8  rounded-tr-[25px]  py-3 pl-10 "></div>

            <div className='absolute top-0 right-0   flex justify-between ' >
                        
                        <div className='bg-[#134574] w-[10em] h-12 z-10 rounded-r-[40px]'>
                        </div>
    
                        <div className='flex flex-col '>
                            <div className="flex items-center bg-white px-4 z-10 rounded-bl-[25px] h-12 w-[170px] ">
                             </div>
                            
                        </div>
    
                        </div>

                <div className=' flex px-12 py-16 items-center text-white'>
                    <div className=" font-semibold lg:text-[90px] md:text-[50px] text-[39px] lg:leading-[109px]">
                    Unleash the power of innovation with us.
                    </div>
                    <p>
                    We're all about transforming through digital solutions, no matter what your project or goal is about.
                    </p>

                </div>

                <div className=' flex justify-center md:mt-[-5em] -mt-12 xl:mt-[-10em] pb-2'>
                    
                <Image src="/contactL.svg" width={600} height={200} />
                </div>

               
            </div>

                <Form />
            
    </div>
  )
}

export default Conatct
