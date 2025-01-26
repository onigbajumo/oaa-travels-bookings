import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "../../../components/tag/Tag";
import { FaArrowRight } from "react-icons/fa";
import CTA from "../../../components/CTA/cta";
import Testimony from "../../../components/testimonial/testimonials";
import FAQs from "../../../components/faq";
import Courses from "../../../components/courses/course";

const benefits = [
  {
    title: "Online and Virtual Classes for flexibility",
    desc: "Our IT Training Courses are designed to meet industry demands, ensuring learners are job ready",
  },
  {
    title: "Hands-on, practical learning",
    desc: "From web development to branding, we support business in reaching their goals",
  },
  {
    title: "Industry-expert instructors",
    desc: "Our Creative Tech School Program empowers students with essential tech skills from an early age",
  },
  {
    title: "Access to cutting-edge tools and resources",
    desc: "Our Creative Tech School Program empowers students with essential tech skills from an early age",
  },
];

const why = [
  {
    title: "Select a Program",
    desc: "Explore our list of courses and choose the one that matches your goals.",
    icon: "/icons/list.svg",
  },
  {
    title: "Enroll and Start Learning",
    desc: "Flexible learning schedules designed for your convenience and at your pace.",
    icon: "/icons/graduate.svg",
  },
  {
    title: "Practice and Apply",
    desc: "Hands-on projects to reinforce your learning. Hands-on projects",
    icon: "/icons/code.svg",
  },
  {
    title: "Earn Certification",
    desc: "Receive industry-recognized credentials upon course completion.",
    icon: "/icons/certificate.svg",
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
                Learn, Build, Transform
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
                Empower Your Future with the{" "}
                <span className="text-secondary"> Upskill </span> Program
              </h1>
              <p className="xl:pr-48 lg:pr-12">
                Step into a world of possibilities with hands-on training,
                cutting-edge tools, and industry-leading programs designed to
                turn your ambitions into achievements
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  href="/upskill-program/courses"
                  className="bg-main rounded-full text-white text-center text-base px-5 py-3 border-2 border-transparent font-medium"
                >
                  Explore Programs
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <Image src={"/images/upskill.png"} width={600} height={400} alt="hero" />
          </div>
        </div>
      </section>

      <section className="container space-y-5 py-20">
        <Tag text="About the Upskill Program" />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-20">
          <div className="flex flex-col gap-5">
            <h2 className="text-main">Why Choose Upskill by Ehizua Hub?</h2>

            <div className="grid grid-cols-2 gap-2 md:gap-5 h-full">
              <Image
                src="/images/person-3.jpg"
                width={1000}
                height={1000}
                className="w-full object-cover h-full md:rounded-tl-[100px] rounded-tl-[50px]"
                alt="person"
              />
              <Image
                src="/images/person-4.jpg"
                width={1000}
                height={1000}
                className="w-full object-cover h-full md:rounded-br-[100px] rounded-br-[50px]"
                alt="person"
              />
            </div>
          </div>

          <div className="space-y-5">
            <p>
              Upskill by Ehizua Hub is dedicated to bridging the skills gap in
              technology and creative industries. Whether you&apos;re looking to
              enter the tech world, enhance your current skill set, or explore a
              creative passion, our expertly designed courses cater to all
              levels.
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
                  href="/upskill-program/courses"
                  className="bg-main rounded-full text-white text-center text-base px-5 py-2 border-2 border-transparent font-medium"
                >
                  View all programs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20 bg-main">
        <div className="space-y-5 text-white">
          <div className="border-l-4 border-white pl-2 pr-5 rounded-tr-full rounded-br-full bg-secondary w-fit text-white font-semibold text-sm py-2">
            How it Works
          </div>
          <h2 className="">Your Journey to Expertise</h2>
          <p className="text-white w-full md:w-2/3">
            Embark on a seamless journey to mastery with our step-by-step guide,
            crafted to ensure you achieve your learning goals and thrive in the
            digital world
          </p>
        </div>

        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-20 mt-10">
            {why.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div className="flex justify-center">
                  <Image
                    src={item.icon}
                    width={1000}
                    height={1000}
                    alt={item.title}
                    className="aspect-square w-16 rounded object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-white text-center font-semibold text-xl">
                    {item.title}
                  </h3>
                  <p className="text-center text-white text-base">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Courses
        heading="Discover Our Courses"
        subHeading="Tailored programs to match your career goals"
        limit={6}
      />

      <Testimony />

      <CTA
        pinkText="Learning"
        preText="Start Your"
        endText="Journey Today"
        desc="Don’t wait! — start building the skills that will shape your future today"
      />

      <FAQs limit={4} />
    </>
  );
};

export default Page;
