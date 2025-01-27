import React from "react";
import FAQs from "../../../components/faq";
import Image from "next/image";

const FAQ = () => {
  return (
    <>
      <section className="bg-[url('/images/background.png')] bg-no-repeat bg-cover">
        <div className="container py-20">
          <div className="space-y-6 flex flex-col justify-center">
            <div className="space-y-8 ">
              <h1 className="text-main">FAQs</h1>
              <p className="xl:pr-48 lg:pr-12">
                Answers to common questions about our services, policies,
                support, and everything you need to know in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQs />
    </>
  );
};

export default FAQ;
