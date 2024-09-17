import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import CTA from '../../../components/cta'


const FAQ = ()=>{
    return (
        <div className=''>

            <div className='bg-[#F3F6F8] flex flex-col md:flex-row justify-between  mt-[-9px] mb-24 pt-24 pb-4'>
                <div className='md:pl-16 px-6'>
                    <h1 className='font-semibold md:text-[80px] text-[50px]'>Who we Are</h1>
                    <p className='italic font-thin text-lg max-w-lg'>We continue to push boundaries, exploring new frontiers in tech, education, and creative expression.</p>
                </div>
                <div>
                    <Image src="/ehizuahubprint.png" width={600} height={600} className='float-right'/>
                </div>
            </div>

            <div className='flex gap-12 md:px-16 px-6 py-24  justify-between items-center flex-col md:flex-row text-[20px]'>
                <div className='md:w-1/2 '>
                    <p className='mb-6'>
                    Ehizua Hub was born out of a vision to revolutionise the tech industry, education, and creative expression. Our humble beginnings date back to July 1st, 2021, when our founders dared to dream big and Implement the <span className='text-[#134574] font-semibold'>EHIZUA Way</span> .<br />
                    Over the past few years, we have grown exponentially, diversifying our services and expanding our reach.
                    <br /><br />

                    We started as an IT company, providing cutting-edge top-notch solutions to businesses and individuals. Our expertise in software development, networking, and cybersecurity helped us build a loyal client base.
                    </p>
                    <Link href={""} className='bg-[#134574] text-white rounded-full px-6 py-2'>Get in touch</Link>
                </div>
                <div>
                    <Image src={"/aboutEhizuahub.svg"} width={500} height={500} />
                </div>
            </div>

            <div className='md:px-16 px-6 space-y-20'>
                <div className='flex gap-16 flex-col md:flex-row'>

                        <div className='relative px-8 pt-12 pb-8 space-y-2 bg-[#E2E1F147] rounded-md md:w-1/2'>
                            <Image src={"/school.svg"} width={50} height={50} className='absolute -top-5 left-10' />
                            <h1 className='font-semibold text-xl '>School and Upskill</h1>
                            <p>As we grew, we recognized the need for quality education and skill development. We established a school and upskill program, offering courses in IT, digital marketing, and creative technologies. Our goal is to empower individuals with the skills to succeed in the ever-changing tech landscape with in-demand skills.</p>

                        </div>

                        <div className='relative px-8 pt-12 pb-8 space-y-2 bg-[#E2E1F147] rounded-md md:w-1/2'>
                            <Image src={"/technology.svg"} width={50} height={50} className='absolute -top-5 left-10' />
                            <h1 className='font-semibold text-xl '>Creative Technology Program</h1>
                            <p>We introduced a creative technology program for children, focusing on coding, robotics, and digital art (Animations). Our aim was to foster innovation and creativity in young minds, preparing them for a future where technology reigns supreme.</p>

                        </div>
                </div>

                <div className='flex gap-16 flex-col md:flex-row'>

                    <div className='relative px-8 pt-12 pb-8 space-y-2 bg-[#E2E1F147] rounded-md md:w-1/2'>
                        <Image src={"/media.svg"} width={50} height={50} className='absolute -top-5 left-10' />
                        <h1 className='font-semibold text-xl '>Media and Event Center</h1>
                        <p>Our media arm was established to produce engaging content, while our event centre hosts conferences, workshops, and training sessions. We{"'"}ve successfully organised numerous events, bringing industry experts and enthusiasts together.</p>

                    </div>

                    <div className='relative px-8 pt-12 pb-8 space-y-2 bg-[#E2E1F147] rounded-md md:w-1/2'>
                        <Image src={"/ads.svg"} width={50} height={50} className='absolute -top-5 left-10' />
                        <h1 className='font-semibold text-xl '>Advertising Agency</h1>
                        <p>Our advertising agency provides innovative solutions for businesses, helping them reach their target audience effectively. Our expertise in digital marketing, media coverage, social media management, digital billboards and content creation sets us apart.</p>

                    </div>
                </div>

                <div className='flex gap-16 flex-col md:flex-row'>

                    <div className='relative px-8 pt-12 pb-8 space-y-2 bg-[#E2E1F147] rounded-md md:w-1/2'>
                        <Image src={"/printing.svg"} width={50} height={50} className='absolute -top-5 left-10' />
                        <h1 className='font-semibold text-xl '>Printing Company</h1>
                        <p>Our printing company offers high-quality printing services, catering to various industries. From business cards to billboards, we deliver top-notch printing solutions.</p>

                    </div>

                    <div className='px-8 pb-8 space-y-2  rounded-md md:w-1/2'>
                       <Image src={"/quote.svg"} width={70} height={50}/>
                        <p className='text-justify'>Today, Ehizua Hub stands as a testament to innovation, dedication, and hard work. Our journey has been marked by milestones, achievements, and lessons learned. We{"'"}ve trained over 700 students, executed 10+ IT projects, and hosted 15+ events. Our journey is a testament to dedication, hard work, and the power of vision. We continue to push boundaries, exploring new frontiers in tech, education, and creative expression. Join us in our journey and shape the future together!</p>
                        <div className='text-right float-right space-y-4'>
                        <p>    CEO, Matthias Ehizua</p>
                        <Image src={"/quote.svg"} width={70} height={50} className='float-right'/>
                        </div>

                    </div>
                </div>

            </div>

            
            <CTA />
            
        </div>
    )
}

export default FAQ;