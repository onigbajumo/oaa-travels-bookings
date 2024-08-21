import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const courses = [

]

const course = () => {
  return (
    <div className='flex gap-16 justify-between flex-col md:flex-row'>
        
        <div className='bg-white rounded-xl shadow-md p-6 md:w-1/2 space-y-6'>
            <Image src={"/develop.svg"} width={60} height={50} />
            <div className='space-y-2'>

            <h4 className='text-sm text-gray-400'>DEVELOPMENT</h4>
            <h2 className='font-medium w-1/2 text-xl'>Full Stack Development</h2>
            </div>

            <div className='flex justify-between'>
                <h4 className='text-gray-400'>6 months Course</h4>
                <div className='flex gap-2'>
                    <Image src={'/start.svg'} width={20} height={20} />
                    <p>4/5</p>
                </div>
            </div>
            <div>

            <Link href={"/"} className='border rounded-full p-2 text-[#134574] font-medium'>Get Started</Link>
            </div>

        </div>

        <div className='bg-white rounded-xl shadow-md p-6 md:w-1/2 space-y-6'>
            <Image src={"/design.svg"} width={60} height={50} />
            <div className='space-y-2'>

            <h4 className='text-sm text-gray-400'>DESIGN</h4>
            <h2 className='font-medium w-1/2 text-xl'>UI/UX</h2>
            </div>

            <div className='flex justify-between'>
                <h4 className='text-gray-400'>3 months Course</h4>
                <div className='flex gap-2'>
                    <Image src={'/start.svg'} width={20} height={20} />
                    <p>4/5</p>
                </div>
            </div>
            <div>

            <Link href={"/"} className='border rounded-full p-2 text-[#134574] font-medium'>Get Started</Link>
            </div>

        </div>

        <div className='bg-white rounded-xl shadow-md p-6 md:w-1/2 space-y-6'>
            <Image src={"/develop.svg"} width={60} height={50} />
            <div className='space-y-2'>

            <h4 className='text-sm text-gray-400'>DEVELOPMENT</h4>
            <h2 className='font-medium w-1/2 text-xl'>Front-end Development</h2>
            </div>

            <div className='flex justify-between'>
                <h4 className='text-gray-400'>4 months Course</h4>
                <div className='flex gap-2'>
                    <Image src={'/start.svg'} width={20} height={20} />
                    <p>4.5/5</p>
                </div>
            </div>
            <div>

            <Link href={"/"} className='border rounded-full p-2 text-[#134574] font-medium'>Get Started</Link>
            </div>

        </div>
      
      
        
    </div>
  )
}

export default course