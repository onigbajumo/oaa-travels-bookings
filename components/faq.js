'use client'
import { useState } from 'react';

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const data = [
    {
      title: "What is the process for your IT consulting services?",
      content: "What is the process for your IT consulting services?What is the process for your IT consulting services?What is the process for your IT consulting services?What is the process for your IT consulting services?"
    },
    {
      title: "What is the process for your IT consulting services?",
      content: "What is the process for your IT consulting services?What is the process for your IT consulting services?What is the process for your IT consulting services?"
    },
    {
      title: "What is the process for your IT consulting services?",
      content: "What is the process for your IT consulting services?What is the process for your IT consulting services?What is the process for your IT consulting services?"
    },
    {
        title: "What is the process for your IT consulting services?",
        content: "What is the process for your IT consulting services?What is the process for your IT consulting services?What is the process for your IT consulting services?"
      }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-4">
      {data.map((item, index) => (
        <div key={index}>
          <button
            onClick={() => handleToggle(index)}
            className="w-full p-4 bg-[#F2F2F2] rounded-lg flex justify-between items-center"
          >
            <span className="text-md ">{item.title}</span>
            <span className='text-xl border bg-[#134574] text-white rounded-full px-[9px] '>{activeIndex === index ? '-' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="px-4 pb-24 pt-4 bg-[#FEFCFC] rounded-lg ">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQs;
