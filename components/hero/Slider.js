"use client"
import { useEffect, useState } from 'react';
import styles from './Slider.module.css';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = [
    {
      text:"Creating Capacity",
    },
    {
      text:"Branding Identity",
    },
    {
      text:"Smart Business",
    },
    
    
    
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className={` ${styles.slider} md:h-[6rem] lg:h-[5.9rem] xl:h-[8rem] h-[4rem]`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`csecondary font-extrabold md:text-[4.5em] lg:text-[4.5em] xl:text-[6em]  2xl:text-[7em] text-[2.5em]  sm:text-[3.5em] lg:leading-[4rem] md:leading-[5rem]  leading-[1em] text-[#134574] relative ${styles.sliderItem} ${currentIndex === index ? styles.active : ''}`}
        >
          {item.text}
          {/* {currentIndex === index && item.backgroundContent && (
            <div className={`lg:text-2xl text-[16px] font-normal ${styles.backgroundContent}`}>
              {item.backgroundContent}
            </div>
          )} */}
        </div>
      ))}
    </div>
  );
};

export default Slider;
