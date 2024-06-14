import Image from "next/image";
import Hero from '../../components/hero/Hero'
import { HiOutlineArrowLongRight } from "react-icons/hi2";

export default function Home() {
  return (
    <div className="">
     <Hero />
        <div className='mx-8'>
            <div className='relative rounded-lg flex justify-around items-center  ' style={{
                height: "500px",
                backgroundImage: `url(/videoDummy.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>
            </div>

            <div className="flex flex-col items-center my-16 ">
              <h1 className=" text-[#134574] font-extrabold md:text-[4rem] text-[3rem] ">Our Services</h1>
              <p className="md:text-3xl sm:text-2xl bg-[#E0F0FF33] rounded-full px-8 my-8 py-2">Innovative Solutions for Modern Challenges</p>

              <div className="flex flex-col md:flex-row justify-between container shadow-md items-center md:px-16 lg:px-24 px-8 py-4 border rounded-[2rem]">
                <div className="space-y-6 md:w-1/2">
                  <h2 className="text-[#EF2689] text-[3rem] font-medium mb-4">Brand Design</h2>
                  <p className="text-xl">Your brand is more than just a logo. It's your story, your voice, 
                    and your connection to the world. At Ehizua Hub, we go beyond 
                    aesthetics. We help you craft a powerful brand narrative that 
                    resonates, inspires, and drives results.</p>
                    <button className="bg-[#134574] py-4 text-2xl items-center px-8 text-white rounded-full flex gap-6 px-4"> <Image src="/arrowbtn.svg" width={70} height={20} /> Learn More</button>
                </div>
                <div>
                  <Image src={"/serviceicon4.svg"} width={400} height={400} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row container gap-6  my-12">

                <div className="border rounded-[2rem] shadow-sm px-8 pt-16 text-[3rem] md:w-1/3 relative">
                <h2 className="text-[#EF2689] text-[2rem]  font-medium mb-4 px-2">Digital Marketing</h2>
                  <p className="text-xl">We build Solutions and deliver excellent IT Services 
                    to Forward thinking business in Africa.</p>
                    <div className="flex justify-between">
                      <div></div>
                      <div><Image src={"/serviceicon4.svg"} width={300} height={300} /></div>
                    </div>
                    <button className="bg-[#134574] py-4 text-2xl text-white rounded-full px-8 absolute bottom-14">Learn More</button>
                </div>


                <div className="border rounded-[2rem] shadow-sm px-8 pt-16 md:w-1/3 relative">
                <h2 className="text-[#EF2689] text-[2rem]  font-medium mb-4 px-2">Web Development</h2>
                  <p className="text-xl">Innovative solutions for modern challenges</p>
                    <div className="flex justify-between">
                      <div></div>
                      <div><Image src={"/serviceicon2.svg"} width={300} height={300} /></div>
                    </div>
                    <button className="bg-[#134574] py-4 text-2xl text-white rounded-full px-8 absolute bottom-14">Learn More</button>
                </div>

                <div className="border rounded-[2rem] shadow-sm px-8 pt-16 md:w-1/3 relative">
                <h2 className="text-[#EF2689] text-[2rem]  font-medium mb-4 px-2">App Development</h2>
                  <p className="text-xl">Your brand is more than just a name and logo</p>
                    <div className="flex justify-between">
                      <div></div>
                      <div><Image src={"/serviceicon3.svg"} width={300} height={300} /></div>
                    </div>
                    <button className="bg-[#134574] py-4 text-2xl text-white rounded-full px-8 absolute bottom-14">Learn More</button>
                </div>
              </div>
            </div>

        </div>
    </div>
  );
}
