import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "../../../components/tag/Tag";
import { FaArrowRight } from "react-icons/fa";
import CTA from "../../../components/CTA/cta";
import Testimony from "../../../components/testimonial/testimonials";
import Portfolio from "../../../components/portfolio/portfolio";
import Contact from "../../../components/contact/contact";

const offer = [
  {
    title: "IT Solution",
    icon: "/icons/web.svg",
    image: "/images/service-1.jpg",
    desc: "Providing cutting-edge IT solutions and services to businesses and organisations.",
    path: "#",
  },
  {
    title: "Creative Tech Programs",
    icon: "/icons/creative.svg",
    image: "/images/service-2.jpg",
    desc: "Inspiring and educating children in creative technology and STEM fields.",
    path: "#",
  },
  {
    title: "iEnterprise",
    icon: "/icons/enterprise.svg",
    image: "/images/service-4.jpg",
    desc: "Delivering top-notch event management, printing, and media services to support businesses and events.",
    path: "#",
  },
];

const benefits = [
  {
    title: "Innovative Solutions",
    desc: "Our IT Training Courses are designed to meet industry demands, ensuring learners are job ready",
  },
  {
    title: "High-Quality Output",
    desc: "From web development to branding, we support business in reaching their goals",
  },
  {
    title: "Reliable Delivery",
    desc: "Our Creative Tech School Program empowers students with essential tech skills from an early age",
  },
  {
    title: "Client-Centric Approach",
    desc: "Our Creative Tech School Program empowers students with essential tech skills from an early age",
  },
];


const Page = () => {
  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container flex md:flex-row flex-col gap-12 py-20">
          <div className="space-y-6 flex flex-col justify-center md:w-2/3">
            <div className="flex gap-2">
              <p className="text-main font-semibold flex xl:items-center text-sm sm:text-md  lg:text-lg flex-col xl:flex-row gap-3">
                Brand, Build, Inspire
                <span>
                  <span className="text-sm text-black">|</span>
                  <span className="text-secondary font-semibold bg-white p-2 rounded-tr-full rounded-br-full">
                    The Ehizua Hub Advantage
                  </span>
                </span>
              </p>
            </div>
            <div className="space-y-8 ">
              <h1 className="text-main">
                Elevate Your Brand with{" "}
                <span className="text-secondary"> iEnterprise</span>
              </h1>
              <p className="xl:pr-48 lg:pr-12">
                Your one-stop solution for impactful branding, captivating
                cinematography, and seamless event experiences
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  href="/contact-us"
                  className="bg-main rounded-full text-white text-center text-base px-5 py-3 border-2 border-transparent font-medium"
                >
                  Get Started Today
                </Link>
                <Link
                  href="/services"
                  className=" rounded-full text-main text-center border-main text-base border-2 px-5 py-3 font-medium"
                >
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Image src={"/images/enterprise.png"} width={600} height={400} alt="hero" />
          </div>
        </div>
      </section>

      <section className="container space-y-5 py-20">
        <Tag text="Our Services" />
        <h2 className="text-main">Our Expertise</h2>
        <p>
          Creative solutions tailored to boost your business and leave a lasting
          impression.
        </p>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 !mt-10">
            {offer.map((item, index) => (
              <div
                key={index}
                style={{ backgroundImage: `url(${item.image})` }}
                className="bg-cover bg-center p-4 rounded-xl flex flex-col items-center w-full aspect-square relative group  transition-all ease-in-out duration-700"
              >
                <div className="absolute bottom-0 left-0 bg-main/80 group-hover:bg-main group-hover:h-full rounded-xl p-4 w-full group-hover:flex flex-col justify-between transition-all ease-in-out duration-700">
                  <div className="space-y-3">
                    <Image src={item.icon} width={50} height={50} alt={item.title} />
                    <h3 className="text-white">{item.title}</h3>
                  </div>

                  <p className="hidden group-hover:block text-white transition-all ease-in-out duration-700">
                    {item.desc}
                  </p>

                  <div className="hidden group-hover:flex transition-all ease-in-out duration-700">
                    <Link
                      href={item.path}
                      className=" rounded-full text-white text-center border-white text-base border-2 px-4 py-2 font-medium"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container space-y-5 py-20 bg-[#F4F7F8]">
        <Tag text="About the Upskill Program" />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
          <div className="flex flex-col gap-5">
            <h2 className="text-main">Why Choose iEnterprise by Ehizua Hub?</h2>

            <div className="grid grid-cols-2 gap-2 md:gap-5 h-full">
              <Image
                src="/images/person-5.jpg"
                width={1000}
                height={1000}
                className="w-full object-cover h-full md:rounded-tl-[100px] rounded-tl-[50px]"
                alt="person"
              />
              <Image
                src="/images/person-6.png"
                width={1000}
                height={1000}
                className="w-full object-cover h-full md:rounded-br-[100px] rounded-br-[50px]"
                alt="person"
              />
            </div>
          </div>

          <div className="space-y-5">
            <p>
              We bring creativity, innovation, and reliability to every project.
              We bring creativity, innovation, and reliability to every project
            </p>

            <div className="space-y-5">
              <h3 className="font-bold text-main">Key Highlights</h3>

              <div className="space-y-6">
                {benefits.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="bg-secondary/20 p-2 rounded-md text-secondary">
                      <FaArrowRight />
                    </div>

                    <div>
                      <h4>{item.title}</h4>

                      {/* <p className="text-sm w-full lg:w-[80%]">{item.desc}</p> */}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex">
                <Link
                  href="/contact-us"
                  className="bg-main rounded-full text-white text-center text-base px-5 py-2 border-2 border-transparent font-medium"
                >
                  Let’s Talk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Portfolio />

      <Testimony />

      <CTA
        preText="Ready to Transform Your"
        pinkText="Brand"
        endText="?"
        desc="Let iEnterprise take your business to the next level with creative solutions that work. Let iEnterprise take your business to the next level with creative solutions that work"
      />

      <Contact />
    </>
  );
};

export default Page;
