import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div
      id="footer"
      className="bg-main md:m-12 m-4 rounded-xl pt-24 px-6 relative  overflow-hidden"
    >
      <div className=" absolute top-0 left-0 w-20 bg-[white] h-8"></div>
      <div className="bg-main  absolute w-12  top-0 left-8 ml-[22px]  h-12 rounded-tl-[30px]"></div>

      <div className=" absolute top-0 left-0 w-6  bg-[white] h-[300px]"></div>

      <div className=" absolute top-0 right-0 w-8  bg-[white] h-16"></div>
      <div className="absolute right-0 top-10 mt-[-5px] md:mt-0 bg-main h-8 w-12  rounded-tr-[25px]   "></div>

      <div className="absolute top-0 left-0 flex flex-col">
        <div className="flex">
          <div className="bg-white space-y-4 pr-6 pb-4 z-[10]  rounded-br-[20px]">
            <div>
              <Link href={"https://www.instagram.com/ehizuahub"}>
                <Image src="/social1.svg" width={30} height={30} />
              </Link>
            </div>

            <div>
              <Link href={"https://www.facebook.com/ehizuahub"}>
                <Image src="/social2.svg" width={30} height={30} />
              </Link>
            </div>

            <div>
              <Link href={"https://www.x.com/Ehizua_hub"}>
                <Image src="/social3.svg" width={30} height={30} />
              </Link>
            </div>

            <div>
              <Link href={"https://www.linkedin.com/company/ehizua-hub"}>
                <Image src="/social4.svg" width={30} height={30} />
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-main w-12 h-[200px] z-10 rounded-tl-[25px]"></div>
      </div>

      <div className="absolute top-0 right-0   flex justify-between ">
        <div className="bg-main md:w-[10em] mr-[-2px] w-14 h-12 z-10 rounded-r-full"></div>

        <div className="flex flex-col ">
          <div className="flex items-center bg-white px-4 z-10 rounded-bl-[25px]  py-2 md:pl-20  ">
            <Link
              href="#header"
              className="text-main text-[10px] md:text-[16px]"
            >
              Take me back to top
            </Link>
            <Image src="/hand.svg" width={20} height={20} className="" />
          </div>
        </div>
      </div>

      <div className=" absolute top-0 right-0 md:w-[22em] w-[12em]  bg-[white] h-5"></div>

      <div className=" flex lg:justify-between justify-center  md:px-28 pl-12 pr-6 flex-col lg:flex-row gap-12">
        <div className="flex flex-col lg:w-1/3 ">
          <div className="space-y-4 text-white lg:pr-12">
            <h2 className="text-white leading-10 text-3xl font-semibold">
              But we{`’`}are here not to talk about oursleves
            </h2>
            <p className="text-white">
              - We{`’`}are here to talk about you, your company, your product,
              and your goals.
            </p>
            <div></div>

            <div className="xl:w-[60%] md:w-[60%] lg:w-[100%]">
              <Link
                href="/"
                className="text-main rounded-full px-4 py-2 bg-white flex justify-between font-semibold"
              >
                Let{`’`}s Talk
                <Image src="/arrowE.svg" width={20} height={1} />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex gap-16  lg:w-1/3 justify-between mr-12">
          <div className="text-white">
            <p className="text-[#828282] text-base mb-8">Learn</p>
            <ul className="space-y-4 flex flex-col">
              <Link href="#">Learn </Link>
              <Link href="about">About </Link>
              <Link href="#">Testimonials </Link>
              <Link href="#">Processes </Link>
              <Link href="/faqs">FAQs</Link>
            </ul>
          </div>
          <div className="text-white">
            <p className="text-[#828282] text-base mb-8">Explore</p>
            <ul className="space-y-4 flex flex-col">
              <Link href="/">Home </Link>
              <Link href="#">Work </Link>
              <Link href="#">Services </Link>
              <Link href="#">iEnterprise </Link>
              <Link href="#">Upskill Program</Link>
            </ul>
          </div>
        </div>
        <div className="text-white lg:w-1/3 ">
          <p className="text-[#828282] text-base mb-8">Contact Us</p>
          <div className="space-y-4">
            <div className="text-white flex gap-4">
              <Image src="/phoneE.svg" width={20} height={20} />
              Phone: +234 803 731 2788
            </div>
            <div className="text-white flex gap-4">
              <Image src="/mailE.svg" width={20} height={20} />
              Email: info@ehizuahub.com
            </div>
            <div className="text-white flex gap-4">
              <Image src="/locationE.svg" width={30} height={30} />
              6, Hon Fatai Eletu Street, Container Bus Stop, Awoyaya, Lekki
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-12">
        <Image src="/SLIDER.svg" width={900} height={600} />
      </div>
      <div className="text-white text-center py-8">
        Copyright @2024 Ehizuahub. All rights reserved
      </div>
    </div>
  );
};

export default Footer;
