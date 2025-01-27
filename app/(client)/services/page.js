import React from "react";
import Link from "next/link";
import Testimony from "../../../components/testimonial/testimonials";
import CTA from "../../../components/CTA/cta";
import Timeline from "./timeline";
import Offer from "./offer";
import Tag from "../../../components/tag/Tag";
import Image from "next/image";

export const metadata = {
  title: "Our Services",
}

const client = [
  "https://placehold.co/400x100.png",
  "https://placehold.co/400x100.png",
  "https://placehold.co/400x100.png",
  "https://placehold.co/400x100.png",
  "https://placehold.co/400x100.png",
  "https://placehold.co/400x100.png",	
  "https://placehold.co/400x100.png",	
  "https://placehold.co/400x100.png",	
  "https://placehold.co/400x100.png",	
]

const About = () => {
  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8 ">
              <h1 className="text-main">
                Empowering Your Digital Journey with Innovative Solutions
              </h1>
              <p className="xl:pr-48 lg:pr-12">
                Discover our wide range of IT services designed to accelerate
                growth, enhance engagement, and drive digital transformation
              </p>

              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  href="/contact-us"
                  className="bg-main rounded-full text-white text-center text-base px-5 py-3 border-2 border-transparent font-medium"
                >
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Timeline />

      <Offer />

      <section className="container py-20">
        <div className="space-y-5">
          <Tag text="Our Clients" />
          <h2 className="text-main">
            Trusted by Leading Brands and Organizations
          </h2>
          <p>
            We’re proud to have partnered with forward-thinking clients from
            various industries, delivering exceptional results that drive their
            success
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-10 ">
            {client.map((item, index) => (
              <Image
                width={400}
                height={200}
                key={index}
                src={item}
                alt="client"
                className="w-full h-full object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F4F6F8] py-20">
        <div className="container">
        <div className="space-y-5">
          <Tag text="Technology" />
          <h2 className="text-main">
          Empowering Solutions with Cutting-Edge Technology
          </h2>
          <p>
          Our expertise spans the latest technologies, enabling us to deliver innovative solutions that meet the unique demands of each project.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-10 ">
            {client.map((item, index) => (
              <Image
                width={400}
                height={200}
                key={index}
                src={item}
                alt="client"
                className="w-full h-full object-contain"
              />
            ))}
          </div>
        </div>
        </div>
      </section>

      <Testimony />

      <CTA
        pinkText="Ehizua way"
        preText="Build the"
        desc="Take the first step towards success and start achieving your
                goals today! Our services are tailored to meet your unique needs
                and help you reach new milestones."
      />

    </>
  );
};

export default About;
