import React from "react";
import Testimony from "../../../components/testimonial/testimonials";
import Work from "../../../components/workWithUs/work";
import Image from "next/image";
import Tag from "../../../components/tag/Tag";
import CTA from "../../../components/CTA/cta";
import Contact from "../../../components/contact/contact";
import Journey from "./journey";

const dream = [
  {
    title: "Custom software development",
    icon: "/icons/software.svg",
  },
  {
    title: "Mobile app development",
    icon: "/icons/mobile.svg",
  },
  {
    title: "Web application development",
    icon: "/icons/webapp.svg",
  },
  {
    title: "Design",
    icon: "/icons/design.svg",
  },
  {
    title: "Digital Marketing",
    icon: "/icons/marketing.svg",
  },
  {
    title: "Branding",
    icon: "/icons/branding.svg",
  },
  {
    title: "Logo Design",
    icon: "/icons/logo-design.svg",
  },
  {
    title: "SEO",
    icon: "/icons/branding.svg",
  },
];

const team = [
  {
    name: "John Doe",
    position: "CEO",
    image: "https://placehold.co/500.png",
  },
  {
    name: "Jane Doe",
    position: "CTO",
    image: "https://placehold.co/500.png",
  },
  {
    name: "John Doe",
    position: "CEO",
    image: "https://placehold.co/500.png",
  },
  {
    name: "Jane Doe",
    position: "CTO",
    image: "https://placehold.co/500.png",
  },
  {
    name: "John Doe",
    position: "CEO",
    image: "https://placehold.co/500.png",
  },
  {
    name: "Jane Doe",
    position: "CTO",
    image: "https://placehold.co/500.png",
  },
  {
    name: "John Doe",
    position: "CEO",
    image: "https://placehold.co/500.png",
  },
  {
    name: "Jane Doe",
    position: "CTO",
    image: "https://placehold.co/500.png",
  },
];

const About = () => {
  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8 ">
              <h1 className="text-main">
                Shaping the Future of Innovation and Creativity
              </h1>
              <p className="xl:pr-48 lg:pr-12">
                Welcome to Ehizuahub—your ultimate destination for innovative IT
                services, cutting-edge tech training and creative solutions that
                redefine possibilities. We’re not just a company; we’re a
                community of forward-thinkers, dreamers, and problem-solvers
                dedicated to transforming lives and businesses through the power
                of technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container space-y-5 py-20 grid md:grid-cols-2 gap-7 items-center">
        <div className="space-y-5">
          <Tag text="The Dream" />
          <h2 className="text-main">
            Shaping Tomorrow, One Innovation at a Time
          </h2>
          <p>
            At Ehizuahub, our dream is more than just a vision—it’s a movement.
            We dream of a world where African talent leads global innovation,
            where technology bridges gaps, and where every individual has the
            tools to rewrite their story.
          </p>
        </div>

        <div>
          <Image
            src={"/images/about-image.jpg"}
            width={1000}
            height={1000}
            className="rounded-3xl w-full"
            alt="about"
          />
        </div>

        <div className="md:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {dream.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-main/5 rounded-lg p-3 gap-4"
              >
                <Image src={item.icon} width={30} height={30} alt={item.title} />
                <p className="text-xs font-semibold text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Journey />

      <section className="container py-20">
        <div className="space-y-5">
          <Tag text="Meet Our Team" />
          <h2 className="text-main">The Faces Behind Ehizua Hub</h2>
          <p>
            A dedicated team of professionals committed to transforming lives
            and businesses
          </p>
        </div>

        <div className="mt-10">
          <div className="grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {team.map((item, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <Image
                  src={item.image}
                  width={500}
                  height={500}
                  alt={item.name}
                  className="rounded-lg w-4/5"
                />
                <div>
                  <h4 className="font-semibold text-center text-main">
                    {item.name}
                  </h4>
                  <p className="text-sm text-center">{item.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Work />

      <Testimony />

      <CTA
        preText="Ready to Transform Your"
        pinkText="Vision"
        endText="Into Reality?"
        desc="Take the first step towards success and start achieving your
                goals today! Our services are tailored to meet your unique needs
                and help you reach new milestones."
      />

      <Contact />
    </>
  );
};

export default About;
