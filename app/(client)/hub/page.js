import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import CTA from '../../../components/cta';
import Portfolio from '../../../components/portfolio/portfolio';
import FAQs from '../../../components/faq';
import Course from '../../../components/courses/course'
import Testimony from '../../../components/testimonial/testimonials';

const Hub = () => {
    return (

    <div>
            <div className='flex md:flex-row flex-col xl:px-24 md:px-8 px-4 gap-12'>
                <div className='space-y-6 flex flex-col justify-center md:w-2/3'>
                    <div className='flex gap-2'>
                        <p className='text-[#134574]'>Imagine, Create, Innovate
                            <span className='px-2 text-xl text-black'>|</span>
                        <span className='text-[#EF2689] font-semibold'>The Ehizua Way</span>
                        </p>
                    </div>
                    <div className='space-y-8 '>
                        <h1 className='text-[#134574] xl:text-[64px] md:text-[50px] text-4xl xl:leading-[70px] leading-[50px] font-extrabold'>We Provide <span className='text-[#EF2689]'>IT Solutions </span> That Beat Your Imagination</h1>
                        <p className='xl:pr-48 lg:pr-12 text-[#828282]'>We design and build cutting-edge software solutions and deliver excellent IT solutions that beat your imaginations.</p>
                        <div className='flex xl:gap-12 gap-4'>
                            <Link href={"#"} className='bg-[#134574] rounded-full text-white lg:text-md text-[12px] px-8 py-4 font-medium'>Get Started</Link>
                            <Link href={"#"} className=' rounded-full text-[#134574] lg:text-md border-[#134574] text-[12px] border-2 px-8 py-4 font-medium'>Free IT Consultation</Link>
                        </div>
                    </div>
                </div>
                
                <div>
                        <Image src={"/homescreen.png"} width={600} height={400}/>

                </div>
            </div>

            <div className='xl:px-24 md:px-8 px-6 space-y-12 my-24'>
                <h1 className='text-[#134574] font-extrabold md:text-[50px] text-4xl'>Our Services</h1>
                <div className='flex gap-8 flex-col md:flex-row'>

                    <div className='flex flex-col md:flex-row gap-8'>

                    <div className='space-y-4 md:w-1/2'>
                        <Image src={'/service.png'} width={400} height={400} />
                        <h1 className='font-medium lg:text-4xl text-2xl '>IT Solution</h1>
                        <p className='text-[#828282]'>Providing cutting-edge IT solutions and services to businesses and organisations.</p>
                        <div className='pt-6'>
                        <Link href={"/"} className='rounded-full border-[#134574] border text-[#134574] font-semibold px-4 py-2 '>View More</Link>
                        </div>
                    </div>

                    <div className='space-y-4 md:w-1/2'>
                        <Image src={'/upskill.png'} width={400} height={400} />
                        <h1 className='font-medium lg:text-4xl text-2xl'>Upskill</h1>
                        <p className='text-[#828282]'>Offering training and upskilling programs for individuals and professionals to enhance their skills and knowledge.</p>
                        <div>
                        <Link href={"/"} className='rounded-full border-[#134574] border text-[#134574] font-semibold px-4 py-2 '>View More</Link>
                        </div>
                    </div>
                    </div>

                    <div className='flex flex-col md:flex-row gap-8'>

                    <div className='space-y-4 md:w-1/2'>
                        <Image src={'/enterprise.png'} width={400} height={400} />
                        <h1 className='font-medium lg:text-4xl text-2xl '>iEnterprise</h1>
                        <p className='text-[#828282]'>Delivering top-notch event management, printing, and media services to support businesses and events.</p>
                        <div>
                        <Link href={"/"} className='rounded-full border-[#134574] border text-[#134574] font-semibold px-4 py-2 '>View More</Link>
                        </div>
                    </div>

                    <div className='space-y-4 md:w-1/2'>
                        <Image src={'/creative.png'} width={400} height={400} />
                        <h1 className='font-medium lg:text-4xl text-2xl '>Creative Tech Programs</h1>
                        <p className='text-[#828282]'>Inspiring and educating children in creative technology and STEM fields.</p>
                        <div>
                        <Link href={"/"} className='rounded-full border-[#134574] border text-[#134574] font-semibold px-4 py-2 '>View More</Link>
                        </div>
                    </div>
                    </div>


                    
                </div>
            </div>

            <div className='xl:px-24 md:px-8 px-6 space-y-8 my-24'>
            <h1 className='text-[#134574] font-extrabold md:text-[50px] text-4xl'>Our Portfolio</h1>
            <p>let us help you bring your purpose, imaginations and dreams alive The Ehizua Way</p>
            <div>
                <div className='flex flex-col justify-center items-center space-y-12'>

                    <Portfolio />
                    <div>

                    <Link href={""} className=' bg-[#134574] text-white rounded-full px-8 py-2'>Explore more</Link>
                    </div>

                </div>
            </div>
            </div>

            <div className='flex flex-col lg:flex-row justify-between gap-24 bg-[#134574] rounded-xl md:mx-24 mx-4 px-8 py-12'>
                <div className='text-white space-y-8 lg:w-2/3'>
                    <h1 className='font-extrabold md:text-4xl text-2xl'>About Us</h1>
                    <p>
                    Ehizua Hub was born out of a vision to revolutionize the tech industry, education, and creative expression. Our humble beginnings date back to July 1st, 2021, when our founders dared to dream big and Implement the EHIZUA Way. <br />
                    Over the past few years, we have grown exponentially, diversifying our services and expanding our reach. 
                    </p>
                    
                    <p>We started as an IT company, providing cutting-edge top-notch solutions to businesses and individuals. Our expertise in software development, networking, and cybersecurity helped us build a loyal client base.</p>

                    <div className='pt-8'>
                        <Link href={""} className='bg-white rounded-full px-8 py-2 text-[#134574] font-medium'>Get Started</Link>
                    </div>

                </div>
                <div className='flex flex-col justify-center items-center gap-6'>
                    <Image src={"/matthy.png"} width={500} height={450} />
                    <h1 className='text-white text-2xl font-medium '>CFO, Matthew Ehizua</h1>
                </div>
            </div>

            <div className='bg-[#F4F7F8] xl:px-24 md:px-8 px-6 space-y-8 my-24 py-12'>
                <div className='space-y-4'>
                    <h1 className='font-medium text-4xl '>Empowering Young Africans with Tomorrow{"'"}s Skills</h1>
                    <p className='leading-[20px] md:pr-48'>Take your first step towards a career in technology with our expert-led courses. From software development and data analysis to cybersecurity and cloud computing, we offer a wide range of tech skills that are in high demand. Learn from the best and start building your future today!</p>
                </div>
                <div>
                    <Course />
                    <div className='text-center pt-12 '>
                        <Link href={"#"} className='bg-[#134574] text-white rounded-full px-6 py-2'>View all Courses</Link>
                    </div>
                </div>
            </div>

            <Testimony />

            <div className=' xl:px-24 md:px-8 px-6 space-y-8 my-24 py-12'>
                <h1 className='text-center text-4xl font-medium'>Frequently Asked <spand className="text-[#134574]">Questions</spand> </h1>

                <FAQs limit={4} />


            </div>


            <CTA />
    </div>
    )
}

export default Hub;