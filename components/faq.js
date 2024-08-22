'use client';
import { useState } from 'react';

const FAQs = ({ limit }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const data = [
    {
      title: "What is your development process like?",
      content: " Our workflow is outlined in 6 simple steps, you can read more here ....."
    },
    {
      title: "Do you offer ongoing maintenance and support?",
      content: "Yes we offer ongoing maintenance and support after project completion to our clients."
    },
    {
      title: "How much does your service cost? ",
      content: "Our rates for services are priced based on your service inquiry, let’s chat and you’ll get a quote emailed to you."
    },
    {
      title: "What kind of projects do you take on?",
      content: "We are sector agnostic when we work on projects, our priority is ensuring your problem are solved with our digital skills."
    },
    {
      title: "What information do you need from me to get started?",
      content: "That’s easy, we just need a brief about your project containing everything you need and we can schedule a discovery call to initiate the project."
    },
    {
      title: "How will I be involved in the development process?",
      content: "We ensure to keep our clients and stakeholders involved in the design and development phases of the project to maintain smooth communication and understanding between both parties."
    },
    {
      title: "How will I know the project is on track?",
      content: "That’s easy, we make use of project management software's to improve our operational efficiency and keep you updated as well."
    },
    {
      title: "What happens if I need to make changes during development?",
      content: "Not a problem, we can be flexible however it would come at an extra cost if the changes are outside the scope of the project."
    },
    {
      title: "Do you offer custom software development?",
      content: "Yes. We design, build, and deploy bespoke software applications tailored to your unique needs."
    }
  ];

  // If a limit is provided, slice the array, otherwise show all items
  const displayedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      {displayedData.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => handleToggle(index)}
            className="w-full p-4 bg-[#F2F2F2] rounded-lg flex justify-between items-center"
          >
            <span className="text-md">{item.title}</span>
            <span className='text-xl border bg-[#134574] text-white rounded-full px-[9px]'>{activeIndex === index ? '-' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="px-4 pb-4 pt-4 bg-[#FEFCFC] rounded-lg">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
