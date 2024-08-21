import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


const CTA = () => {

 
  return (
    <div className='md:mx-24 mx-4 my-24'>
            <div className='relative rounded-tl-[25px] bg-[#134574]' >

            <div className=" absolute top-0 right-0 w-[15em] bg-[white]  h-6 z-10"></div>
            <div className=" absolute top-0 right-0 w-8  bg-[white] h-[80px] z-10"></div>
            <div className="absolute top-12 right-0 bg-[#134574] h-8  rounded-tr-[25px]  py-3 pl-10 z-10"></div>

            <div className='z-10 absolute top-0 right-0   flex justify-between ' >
                        
                        <div className='bg-[#134574] w-[10em] h-12 z-10 rounded-r-[40px]'>
                        </div>
    
                        <div className='flex flex-col '>
                            <div className="flex items-center bg-white px-4 z-10 rounded-bl-[25px] h-12 w-[170px] ">
                             </div>
                            
                        </div>
    
            </div>

            {/* <div className='absolute right-20'>
              <Image src={"/bubble.svg"} width={350} height={300}  />
            </div> */}
            <div className='absolute left-20 bottom-0 flex gap-24 justify-between'>
              <Image src={"/bubble2.svg"} width={350} height={300}  />
            </div>
              <Image src={"/bubble.svg"} width={400} height={400} className='hidden lg:flex  absolute right-[20em]'  />

                <div className=' flex flex-col md:flex-row px-12 py-16 items-center text-white z-10'>
                    <div className="z-10 font-semibold lg:text-[90px] xl:text-[110px] md:text-[50px] text-[42px] lg:leading-[109px]">
                    Unleash the power of innovation with us.
                    </div>
                    <div className='space-y-8 z-10'>

                    <p>
                    We are all about transforming through digital solutions, no matter what your project or goal is about.
                    </p>
                    <div className="xl:w-[60%]  lg:w-[100%]">
                         <Link href='#' className='text-[#134574] rounded-full px-4 py-2 bg-white flex justify-between'>
                            
                            <h2>Let{`’`}s Talk </h2>

                             <Image src='/arrowE.svg' width={20} height={1} />
                           
                        </Link>
                    </div>
                    </div>

                </div>

                {/* <div className=' flex justify-center md:mt-[-5em] -mt-12 xl:mt-[-10em] pb-2'>
                    
                <Image src="/contactL.svg" width={600} height={200} />
                </div> */}

               
            </div>

    </div>
  )
}

export default CTA
