import React from "react";
import Link from "next/link";
import Image from "next/image";

const CTA = () => {
  return (
    <section className="container py-12">
      <div className="relative">
        <div className="hidden sm:block">
          <Image
            src="/images/cta-bg-1.svg"
            alt="CTA Image"
            width={1000}
            height={1000}
            className="w-full"
          />
        </div>

        <div className="sm:hidden">
          <Image
            src="/images/cta-bg-2.svg"
            alt="CTA Image"
            width={1000}
            height={1000}
            className="w-full"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-[92%] flex justify-center items-center">
          <div className="p-3 sm:p-10 xl:p-24">
            <div className="flex flex-col items-center gap-4 sm:gap-7 xl:gap-10">
              <h1 className="text-white text-center">
                Build the <span className="text-secondary">Ehizua way</span>
              </h1>
              <p className="text-white text-center text-md sm:text-lg xl:text-2xl w-full lg:w-3/4">
                Take the first step towards success and start achieving your
                goals today! Our services are tailored to meet your unique needs
                and help you reach new milestones.
              </p>

              <div className="flex justify-center">
                <Link
                  href="#"
                  className="bg-white rounded-full text-main text-center text-base px-7 py-3 font-medium"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
