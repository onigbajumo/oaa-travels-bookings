import React from "react";
import Contact from "../../../components/contact/contact";
import CTA from "../../../components/CTA/cta";
import FAQs from "../../../components/faq";

export const metadata = {
  title: "Contact Us",
}

const page = () => {
  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8 ">
              <h1 className="text-main">Connect With Us</h1>
              <p className="xl:pr-48 lg:pr-12">
                Experience the perfect blend of research precision, innovative
                development, and impactful digital strategies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact />

      <CTA
        pinkText="Ehizua way"
        preText="Build the"
        desc="Take the first step towards success and start achieving your
                goals today! Our services are tailored to meet your unique needs
                and help you reach new milestones."
      />

      <FAQs limit={4} />
    </>
  );
};

export default page;
