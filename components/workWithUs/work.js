import React from "react"
import Image from 'next/image'



const Work = () => {
    return(

        <div className="flex flex-col justify-center items-center bg-[#13457405] lg:px-40 px-12 py-24">

            <div className="text-center mb-4">
                <h1 className=" text-[#134574] font-extrabold md:text-[4rem] text-[3rem] ">Why work with us?</h1>
                <div>

                <p className="md:text-2xl inline-block sm:text-2xl bg-[#EF26890A] rounded-full px-4 my-8 py-2"> Expertise You Can Trust </p>
                </div>

                </div>
            <div className="flex flex-col lg:gap-16 gap-8">
                <div className="flex lg:gap-24 gap-8 flex-col md:flex-row">
                    <div className="px-4 py-8 bg-[#F6F6F6] border border-[#BDBDBD] rounded-lg">
                        <div className="flex gap-4 items-center pb-4">

                        <Image src={"/work1.svg"} width={50} height={50}/>
                        <h2 className="font-semibold text-2xl">Forward-thinking Approach</h2>
                        </div>

                        <hr className="border"/>
                        <p className="text-xl p-6">Our forward-thinking approach ensures we 
                        stay ahead of industry trends, leveraging the 
                        latest technologies and innovative strategies 
                        to deliver cutting-edge solutions that propel your 
                        business into the future.</p>


                    </div>

                    <div className="px-4 py-8 bg-[#F6F6F6] border border-[#BDBDBD] rounded-lg">
                        <div className="flex gap-4 items-center pb-4">

                        <Image src={"/work2.svg"} width={50} height={50}/>
                        <h2 className="font-semibold text-2xl">Agile Development</h2>
                        </div>

                        <hr className="border"/>
                        <p className="text-xl p-6">We embrace agile development methodologies to provide flexible, adaptive, and rapid project delivery. Our iterative process ensures continuous improvement and quick responses to changing requirements.</p>


                    </div>
                </div>

                <div className="flex lg:gap-24 gap-8 flex-col md:flex-row">
                    <div className="px-4 py-8 bg-[#F6F6F6] border border-[#BDBDBD] rounded-lg">
                        <div className="flex gap-4 items-center pb-4">

                        <Image src={"/work3.svg"} width={50} height={50}/>
                        <h2 className="font-semibold text-2xl">Scalable Solutions</h2>
                        </div>

                        <hr className="border"/>
                        <p className="text-xl p-6">Our scalable solutions are designed to grow with your business. Whether you{`'`}re a startup or an established enterprise, our adaptable systems ensure seamless expansion and long-term success.. <span className="text-transparent">hshshshshsh</span></p>
                        


                    </div>

                    <div className="px-4 py-8 bg-[#F6F6F6] border border-[#BDBDBD] rounded-lg">
                        <div className="flex gap-4 items-center pb-4">

                        <Image src={"/work4.svg"} width={50} height={50}/>
                        <h2 className="font-semibold text-2xl">Dedicated Team</h2>
                        </div>

                        <hr className="border"/>
                        <p className="text-xl p-6">Our dedicated team of experts is passionate about your success. With a focus on collaboration, innovation, and excellence, we work tirelessly to bring your vision to life, providing support every step of the way.</p>


                    </div>
                </div>
            </div>
        </div>

    )
}

export default Work