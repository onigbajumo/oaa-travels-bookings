"use client";
import React, { useState } from "react";
import Testimony from "../../../components/testimonial/testimonials";
import Work from "../../../components/workWithUs/work";
import Image from "next/image";
import Tag from "../../../components/tag/Tag";
import CTA from "../../../components/CTA/cta";
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

const values = [
  {
    title: "Innovation",
    desc: "We embrace forward-thinking ideas and cutting-edge technologies to deliver impactful solutions.",
  },
  {
    title: "Excellence",
    desc: "Quality is our hallmark. We are committed to exceeding expectations in everything we do.",
  },
  {
    title: "Empowerment",
    desc: "We believe in uplifting people by providing access to education, tools, and opportunities for success.",
  },
  {
    title: "Integrity",
    desc: "Our actions reflect honesty, transparency, and respect for all stakeholders.",
  },
  {
    title: "Collaboration",
    desc: "We foster partnerships and teamwork, creating synergy that drives meaningful results.",
  },
  {
    title: "Adaptability",
    desc: "In a rapidly evolving world, we remain agile, ready to innovate and adjust to emerging trends.",
  },
];

const About = () => {
  const [activeTab, setActiveTab] = useState("mission");

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

        {/* Services grid */}
        <div className="md:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {dream.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-main/5 rounded-lg p-3 gap-4"
              >
                <Image
                  src={item.icon}
                  width={30}
                  height={30}
                  alt={item.title}
                />
                <p className="text-xs font-semibold text-center">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Journey />

      <section className="bg-[#F4F7F8] py-20">
        <div className="container">
          <div className="space-y-5">
            <Tag text="What Drives Us" />
            <h2 className="text-main">Mission, Vision, and Values</h2>
            <p>
              Our mission, vision, and values define our purpose and guide our
              journey toward excellence
            </p>
          </div>

          <div className="mt-8">
            <div className="overflow-x-auto">
              <div className="bg-white/40 rounded-full p-3 flex items-center gap-5 w-fit whitespace-nowrap">
                <button
                  onClick={() => setActiveTab("mission")}
                  className={`rounded-full px-4 py-2 bg-white font-semibold transition-colors ${
                    activeTab === "mission" ? "text-secondary" : "text-black"
                  }`}
                >
                  MISSION
                </button>

                <button
                  onClick={() => setActiveTab("vision")}
                  className={`rounded-full px-4 py-2 bg-white font-semibold transition-colors ${
                    activeTab === "vision" ? "text-secondary" : "text-black"
                  }`}
                >
                  VISION
                </button>

                <button
                  onClick={() => setActiveTab("values")}
                  className={`rounded-full px-4 py-2 bg-white font-semibold transition-colors ${
                    activeTab === "values" ? "text-secondary" : "text-black"
                  }`}
                >
                  CORE VALUES
                </button>
              </div>
            </div>

            <div className="mt-8">
              {/* Mission Content */}
              {activeTab === "mission" && (
                <div className="bg-white rounded-lg p-5">
                  <p>
                    To empower individuals and businesses through innovative
                    technology solutions, transformative training programs, and
                    strategic partnerships that unlock their full potential in a
                    digital-first world.
                  </p>
                </div>
              )}

              {/* Vision Content */}
              {activeTab === "vision" && (
                <div className="bg-white rounded-lg p-5">
                  <p>
                    To be the leading hub for creative technology and IT
                    services, inspiring innovation and shaping a future where
                    African talent drives global excellence.
                  </p>
                </div>
              )}

              {/* Core Values Content */}
              {activeTab === "values" && (
                <div className="bg-white rounded-lg p-5 md:columns-2 space-y-4">
                  {values.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div>
                        <h4 className="text-[#828282] font-semibold mb-2">
                          {index + 1}. {item.title}
                        </h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

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
                <div className="rounded-xl border-2 border-secondary/20 p-1 flex justify-center ">
                  <Image
                    src={item.image}
                    width={500}
                    height={500}
                    alt={item.name}
                    className="rounded-lg w-full object-cover aspect-square"
                  />
                </div>
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
    </>
  );
};

export default About;
