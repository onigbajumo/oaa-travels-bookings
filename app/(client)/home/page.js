import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tag from "../../../components/tag/Tag";
import { FaArrowRight } from "react-icons/fa";
import Portfolio from "../../../components/portfolio/portfolio";
import CTA from "../../../components/CTA/cta";
import Testimony from "../../../components/testimonial/testimonials";
import FAQs from "../../../components/faq";
import Courses from "../../../components/courses/course";

const offer = [
  {
    title: "Creative Tech Programs",
    icon: "/icons/creative.svg",
    image: "/images/service-2.jpg",
    desc: "Inspiring and educating children in creative technology and STEM fields.",
    path: "/upskill-program/courses",
  },
  {
    title: "Upskill",
    icon: "/icons/web.svg",
    image: "/images/service-3.jpg",
    desc: "Offering training and upskilling programs for individuals and professionals to enhance their skills and knowledge.",
    path: "/upskill-program",
  },
  {
    title: "iEnterprise",
    icon: "/icons/enterprise.svg",
    image: "/images/service-4.jpg",
    desc: "Delivering top-notch event management, printing, and media services to support businesses and events.",
    path: "/i-enterprise",
  },
];

const benefits = [
  {
    title: "Comprehensive Training",
    desc: "Our IT Training Courses are designed to meet industry demands, ensuring learners are job ready",
  },
  {
    title: "Business Centric Services",
    desc: "From web development to branding, we support business in reaching their goals",
  },
  {
    title: "Future Focused Learning",
    desc: "Our Creative Tech School Program empowers students with essential tech skills from an early age",
  },
];

const Home = () => {
  return (
    <div className="relative">
      <div className="absolute top-0 right-0 z-[-1]">
        <Image src={"/images/home-bg.svg"} width={500} height={500} alt="home" />
      </div>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container flex md:flex-row flex-col gap-12 ">
          <div className="space-y-6 flex flex-col justify-center md:w-2/3 py-20 md:py-0">
            <div className="flex gap-2">
              <p className="text-main font-semibold flex sm:items-center text-sm sm:text-md  lg:text-lg flex-col sm:flex-row gap-3">
                Imagine, Create, Innovate
                <span>
                  <span className="text-sm text-black">|</span>
                  <span className="text-secondary font-semibold bg-white p-2 rounded-tr-full rounded-br-full">
                    The Ehizua Way
                  </span>
                </span>
              </p>
            </div>
            <div className="space-y-8 ">
              <h1 className="text-main">
                We Provide <span className="text-secondary">IT Solutions </span>{" "}
                That Beat Your Imagination
              </h1>
              <p className="xl:pr-48 lg:pr-12">
                We design and build cutting-edge software solutions and deliver
                excellent IT solutions that beat your imaginations.
              </p>
              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  href="/services"
                  className="bg-main rounded-full text-white text-center text-base px-5 py-3 border-2 border-transparent font-medium"
                >
                  Get Started
                </Link>
                <Link
                  href="/contact-us"
                  className=" rounded-full text-main text-center border-main text-base border-2 px-5 py-3 font-medium"
                >
                  Free IT Consultation
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:block pt-10 lg:pt-0">
            <Image src={"/homescreen.png"} width={600} height={400} alt="hero" />
          </div>
        </div>
      </section>

      <section className="container flex justify-center gap-12 py-20">
        <div className="flex flex-col md:flex-row w-full gap-10 lg:w-[90%]">
          <div className="md:w-1/3 flex justify-center relative">
            <Image
              src={"/images/ceo.png"}
              width={1000}
              height={1000}
              className="w-[80%] md:w-full"
              alt="ceo"
            />

            <div className="absolute bottom-4 left-0 text-white p-2 w-full font-semibold text-center">
              {" "}
              CFO, Matthew Ehizua
            </div>
          </div>

          <div className="md:w-2/3 flex flex-col justify-center space-y-5">
            <Tag text="About Ehizua Hub" />
            <h2 className="text-main">Empowering Growth Through Technology</h2>
            <p>
              Ehizua Hub was born out of a vision to revolutionize the tech
              industry, education, and creative expression. Our humble
              beginnings date back to July 1st, 2021, when our founders dared to
              dream big and Implement the EHIZUA Way. <br />
              <br />
              Over the past few years, we have grown exponentially, diversifying
              our services and expanding our reach.
              <br />
              <br />
              We started as an IT company, providing cutting-edge top-notch
              solutions to businesses and individuals. Our expertise in software
              development, networking, and cybersecurity helped us build a loyal
              client base.
            </p>
            <div className="flex">
              <Link
                href="/about-us"
                className="bg-main rounded-full text-white text-center text-base px-7 py-3 font-medium"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-5 py-20">
        <Tag text="Our Services" />
        <h2 className="text-main">What We Offer</h2>
        <p>
          EhizuaHub is your gateway to a diverse array of innovative services
          designed to empower individuals and businesses in the digital age. Our
          offerings are meticulously crafted to meet the evolving demands of the
          tech industry and to foster creativity, skill development, and
          business growth.
        </p>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mt-10">
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
                    {/* <Link
                      href={item.path}
                      className=" rounded-full text-white text-center border-white text-base border-2 px-4 py-2 font-medium"
                    >
                      View More
                    </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container space-y-5 py-20">
        <Tag text="Why Ehizua Hub" />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <h2 className="text-main">
              Driving innovation, excellence, and growth
            </h2>

            <p>
              At EhizuaHub, we don&apos;t just train minds, we shape futures. Explore
              our offerings and you experience the transformation for yourself
            </p>

            <div className="space-y-5">
              <h3 className="font-bold text-main">Key Features</h3>

              <div className="space-y-6">
                {benefits.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
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
                  href="/upskill-program"
                  className="bg-main rounded-full text-white text-center text-base px-5 py-2 border-2 border-transparent font-medium"
                >
                  View all programs
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:grid  md:grid-cols-2 gap-5">
            <Image
              src="/images/person-1b.jpg"
              width={1000}
              height={1000}
              className="w-full object-cover h-full rounded-tl-full"
              alt="person"
            />
            <Image
              src="/images/person-2.jpg"
              width={1000}
              height={1000}
              className="w-full object-cover h-full rounded-br-full"
              alt="person"
            />
          </div>

          <div className="hidde grid md:hidden gap-5">
            <Image
              src="/images/person-1.jpg"
              width={1000}
              height={1000}
              className="w-full object-cover h-full rounded-tl-full"
              alt="person"
            />
            <Image
              src="/images/person-2b.jpg"
              width={1000}
              height={1000}
              className="w-full object-cover h-full rounded-br-full"
              alt="person"
            />
          </div>
        </div>
      </section>

      <Courses
        limit={3}
        heading="Upskill for Success"
        subHeading="Take your first step towards a career in technology with our
            expert-led courses. From software development and data analysis to
            cybersecurity and cloud computing, we offer a wide range of tech
            skills that are in high demand. Learn from the best and start
            building your future today!"
      />

      <Portfolio />

      <CTA
        pinkText="Ehizua way"
        preText="Build the"
        desc="Take the first step towards success and start achieving your
                goals today! Our services are tailored to meet your unique needs
                and help you reach new milestones."
      />

      <Testimony />

      <FAQs limit={4} />
    </div>
  );
};

export default Home;
