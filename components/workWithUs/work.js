import React from "react";
import Image from "next/image";
import Tag from "../tag/Tag";

const data = [
  {
    title: "Forward-thinking Approach",
    description:
      "Innovation is at the core of everything we do. By staying ahead of industry trends, we leverage the latest technologies and creative strategies to deliver solutions that redefine possibilities and position your business for long-term success.",
    image: "/icons/work-1.svg",
  },
  {
    title: "Customized Solutions",
    description:
      "We understand that every business has unique challenges and goals. That’s why we offer tailored IT services and training programs that are designed to meet your specific needs, ensuring measurable results.",
    image: "/icons/work-2.svg",
  },
  {
    title: "End-to-End IT Services",
    description:
      "From web and app development to branding and digital marketing, our comprehensive suite of IT services ensures your business gets everything it needs to thrive—all in one place.",
    image: "/icons/work-3.svg",
  },
  {
    title: "Commitment to Excellence",
    description:
      "We don’t just deliver services; we build partnerships rooted in trust, reliability, and excellence. Our team goes the extra mile to ensure you receive cutting-edge solutions that exceed expectations.",
    image: "/icons/work-4.svg",
  },
];

const Work = () => {
  return (
    <section className="container py-20">
      <div className="space-y-5">
        <Tag text="Why Us" />
        <h2 className="text-main">What Sets Us Apart</h2>
        {/* <p>A dedicated team of professionals committed to transforming lives and businesses</p> */}
      </div>


      <div className="mt-10">
        <div className="grid md:grid-cols-2 gap-10">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[#F4F6F8] border border-[#BDBDBD] rounded-lg"
            >
              <div className="flex gap-4 items-center p-3 md:p-6 border-b border-[#BDBDBD]">
                <Image src={item.image} width={50} height={50} alt={item.title} />
                <h3 className="font-semibold">{item.title}</h3>
              </div>
              <p className="p-3 md:p-6">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
