import React from "react";
import Tag from "../../../components/tag/Tag";


const steps = [
  {
    title: "Understand Your Needs",
    text: "We begin with a consultation to understand your unique requirements.",
  },
  {
    title: "Tailored Strategies",
    text: "Develop a personalized approach that aligns with your goals.",
  },
  {
    title: "Execution & Delivery",
    text: "Implement the solution with precision and expertise.",
  },
  {
    title: "Continuous Support",
    text: "Offer ongoing support to ensure success.",
  },
];

const colors = ["#134574", "#EF2689"];

const Timeline = () => {
  return (
    <section className="container py-20">
      <div className="space-y-5">
        <Tag text="Approach" />
        <h2 className="text-main">How We Work</h2>
        <p>Our streamlined process ensures every project is tailored to your needs, executed with precision, and supported for lasting impact. From understanding your goals to delivering exceptional results, we’re with you every step of the way</p>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        <div className="md:hidden relative">
          <div
            className="absolute top-0 bottom-0 left-4 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, #EF2689, #134574)",
            }}
          />
          {steps.map((item, index) => {
            const circleColor = colors[index % 2];
            let borderColor = "#D0DAE3";
            if (circleColor === "#EF2689") {
              borderColor = "#FCD8EA";
            }

            const secondColor =
              circleColor === "#EF2689" ? "#134574" : "#EF2689";

            return (
              <div
                key={index}
                className="relative mb-20 flex items-start"
                style={{ minHeight: 100 }}
              >
                <div className="relative">
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full"
                    style={{
                      backgroundColor: circleColor,
                      border: `4px solid ${borderColor}`,
                    }}
                  />
                  <div
                    className="absolute h-[2px] w-40"
                    style={{
                      top: "50%",
                      // transform: "translateY(10%)",
                      left: 0,
                      right: 0,
                      background: `linear-gradient(to right, ${circleColor}, ${secondColor})`,
                    }}
                  />
                </div>

                <div className="pl-4" style={{ marginTop: "30px" }}>
                  <div className="bg-[#F4F7F8] rounded-lg p-4 max-w-sm">
                    <h4 className="font-semibold mb-2">{item.title}</h4>
                    <p className="text-gray-700 font-medium">{item.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="hidden md:block relative">
          <div
            className="absolute top-0 bottom-0 left-1/2 -ml-px w-[2px]"
            style={{
              background: "linear-gradient(to bottom, #EF2689, #134574)",
            }}
          />
          {steps.map((item, index) => {
            const isRightSide = index % 2 === 0;
            const circleColor = colors[index % 2];
            let borderColor = "#D0DAE3";
            if (circleColor === "#EF2689") {
              borderColor = "#FCD8EA";
            }
            const secondColor =
              circleColor === "#EF2689" ? "#134574" : "#EF2689";

            return (
              <div
                key={index}
                className="relative flex items-start mb-20"
                style={{ minHeight: 100 }}
              >
                <div className="w-1/2 flex justify-end pr-4">
                  {!isRightSide && (
                    <div className="relative" style={{ marginTop: "30px" }}>
                      <div className="bg-[#F4F7F8] rounded-lg p-4 max-w-sm">
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p className="text-gray-700 font-medium">{item.text}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <span
                    className="flex items-center justify-center w-8 h-8 rounded-full"
                    style={{
                      backgroundColor: circleColor,
                      border: `4px solid ${borderColor}`,
                    }}
                  />
                  <div
                    className="absolute h-[2px]"
                    style={{
                      top: "50%",
                      transform: "translateY(-80%)",
                      [isRightSide ? "left" : "right"]: "100%",
                      width: "150px",
                      background: isRightSide
                        ? `linear-gradient(to right, ${circleColor}, ${secondColor})`
                        : `linear-gradient(to left, ${circleColor}, ${secondColor})`,
                    }}
                  />
                </div>

                <div className="w-1/2 flex justify-start pl-4">
                  {isRightSide && (
                    <div className="relative" style={{ marginTop: "30px" }}>
                      <div className="bg-[#F4F7F8] rounded-lg p-4 max-w-sm">
                        <h4 className="font-semibold mb-2">{item.title}</h4>
                        <p className="text-gray-700 font-medium">{item.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
