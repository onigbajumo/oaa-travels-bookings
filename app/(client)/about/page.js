import React from "react"
import Testimony from "../../../components/testimonial/testimonials"
import Work from "../../../components/workWithUs/work"
import Image from "next/image"

const About =() => {
    

    return(
        <div>
            <div className="flex flex-col justify-center items-center bg-[#13457405] p-12 gap-16">
            <h1 className=" text-[#134574] font-bold md:text-[4rem] text-[3rem] ">About Us</h1>
                <div className="flex gap-4 lg:flex-row flex-col mx-8">
                    <div className="bg-white py-12 px-16 rounded-[30px] lg:w-[50%] flex flex-col gap-12">
                        <div>

                            <h2 className="bg-[#EF268921] inline-block px-2 rounded-full font-semibold text-[#134574]">The Dream</h2>
                        </div>
                        <h2 className="font-semibold text-5xl">Our Dream is Global IT Services</h2>
                        <p className="text-xl text-[#0D1118]">Ehizua Hub is a technology agency focused on building software products for forward thinking businesses in Africa. We partner with growth-focused companies to create cutting-edge software solutions that propel business growth and improve operational efficiency.</p>
                    </div>
                    <div className="">
                        <Image src={"/about1.png"} width={800} height={800} />
                        <div className=" mt-4 bg-white rounded-xl flex flex-col">
                            <div className="flex  p-4 gap-2">
                                <div className="bg-[#13457405] rounded-[30px] flex flex-col gap-2 items-center text-center p-4 md:flex-1">
                                    <Image src={"/abticon1.svg"} width={20} height={20} />
                                    <p className="text-sm">Custom software development</p>

                                </div>
                                <div className="bg-[#13457405] rounded-[30px] flex flex-col gap-2 items-center text-center p-4 md:flex-1">
                                    <Image src={"/abticon2.svg"} width={20} height={20} />
                                    <p className="text-sm">Mobile app development</p>

                                </div>
                                <div className="bg-[#13457405] rounded-[30px] flex flex-col gap-2 items-center text-center p-4 md:flex-1">
                                    <Image src={"/abticon7.svg"} width={20} height={20} />
                                    <p className="text-sm">Logo Design</p>

                                </div>
                                <div className="bg-[#13457405] rounded-[30px] flex flex-col gap-2 items-center text-center p-4 md:flex-1">
                                    <Image src={"/abticon4.svg"} width={20} height={20} />
                                    <p className="text-sm">Design</p>

                                </div>
                           
                            </div>
                            <div className="flex  p-4 gap-2">
                                <div className="bg-[#13457405] rounded-[30px] flex flex-col gap-2 items-center text-center p-4 md:flex-1">
                                    <Image src={"/abticon5.svg"} width={20} height={20} />
                                    <p className="text-sm">Digital Marketing</p>

                                </div>
                                <div className="bg-[#13457405] rounded-[30px] flex flex-col gap-2 items-center text-center p-4 md:flex-1">
                                    <Image src={"/abticon6.svg"} width={20} height={20} />
                                    <p className="text-sm">Branding</p>

                                </div>
                                
                                <div className="bg-[#13457405] rounded-[30px] flex flex-col gap-2 items-center text-center p-4 md:flex-1">
                                    <Image src={"/abticon3.svg"} width={20} height={20} />
                                    <p className="text-sm">Web application development</p>

                                </div>
                                <div className="bg-[#13457405] rounded-[30px] flex flex-col gap-2 items-center text-center p-4 md:flex-1">
                                    <Image src={"/abticon6.svg"} width={20} height={20} />
                                    <p className="text-sm">SEO</p>

                                </div>
                           
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>

            <div className="p-16 flex flex-col gap-12 ">
                <div>
                    <h2 className="bg-[#EF268921] inline-block px-2 rounded-full font-semibold text-[#134574]">The Dream</h2>
                </div>
                <div className="text-4xl font-semibold lg:w-1/3 md:1/2  ">Meet Our Dedicated team and creators</div>
                <div className="flex justify-between items-center gap-8 md:flex-row flex-col">
                    <div>

                    <Image src={"/dev1.png"} width={500} height={500}/>
                    </div>
                    <div>

                    <Image src={"/dev2.png"} width={500} height={500}/>
                    </div>
                    <div>

                    <Image src={"/dev3.png"} width={500} height={500}/>
                    </div>

                </div>
            </div>

            <Work />
            

            <Testimony />
        </div>
    )
}


export default About