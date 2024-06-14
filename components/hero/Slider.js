"use client"
import { useEffect, useState } from 'react';
import styles from './Slider.module.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      text:"IT Services For Smart Businesses",
      // backgroundContent: "Web Development"
    },
    {
      text:"We bring your ideas to life",
      backgroundContent: "BRANDING"
    },
    {
      text:"Watch your ideas come alive",
      backgroundContent: "BRANDING"
    },
    
    
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className={`space-y-4 ${styles.slider} md:h-[15rem] lg:h-[15rem] h-[15rem] pt-8`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`csecondary font-extrabold uppercase md:text-[4em] lg:text-[5em] xl:text-[6em]   text-[3.5em] lg:leading-[6rem] md:leading-[5rem]  leading-[1em] text-[#0D1118] relative ${styles.sliderItem} ${currentIndex === index ? styles.active : ''}`}
        >
          {item.text}
          {currentIndex === index && item.backgroundContent && (
            <div className={`lg:text-2xl text-[16px] font-normal ${styles.backgroundContent}`}>
              {item.backgroundContent}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Slider;
