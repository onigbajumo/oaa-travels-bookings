"use client"
import React, { useEffect, useRef } from 'react';
import { LuDot } from "react-icons/lu";
import Image from 'next/image'


const ClientLogo = () => {
  
    const trackRef = useRef(null);

    useEffect(() => {
        const track = trackRef.current;
        let animation = null;
        
        const startAnimation = () => {
          animation = track.animate(
            [
              { transform: 'translateX(0)' },
              { transform: `translateX(-${track.scrollWidth/4}px)` }
            ],
            {
              duration: 5000,
              iterations: Infinity,
              easing: 'linear'
            }
          );
        };
    
        startAnimation();
    
        const handleMouseEnter = () => {
          if (animation) animation.pause();
        };
    
        const handleMouseLeave = () => {
          if (animation) animation.play();
        };
    
        track.addEventListener('mouseenter', handleMouseEnter);
        track.addEventListener('mouseleave', handleMouseLeave);
    
        return () => {
          track.removeEventListener('mouseenter', handleMouseEnter);
          track.removeEventListener('mouseleave', handleMouseLeave);
        };
      }, []);

   
    
  return (
    <div>
        <div className='flex justify-between items-center my-12 mx-12'>
            <p></p>
            <div className="flex items-center mx-8">
            <LuDot className='w-4' size={30}/>
             <h2> Our Trusted Clients</h2>
            </div>

        </div>


     
        <div className='carousel m-12'>
      <div className='carousel__track' ref={trackRef}>
        {[...Array(2)].map((_, index) => (
          <>
            <Image key={`${index}-client1`} src='/client1.svg' width={150} height={50} alt="client1" />
            <Image key={`${index}-client2`} src='/client2.svg' width={150} height={50} alt="client2" />
            <Image key={`${index}-client3`} src='/client3.svg' width={150} height={50} alt="client3" />
            <Image key={`${index}-client4`} src='/client4.svg' width={150} height={50} alt="client4" />
            <Image key={`${index}-client5`} src='/client5.svg' width={150} height={50} alt="client5" />
            <Image key={`${index}-client6`} src='/client6.svg' width={150} height={50} alt="client6" />
          </>
        ))}
      </div>
      <style jsx>{`
        .carousel {
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .carousel__track {
          display: flex;
        }
        .carousel__track :global(img) {
        //   margin-right: 20px;
        }
      `}</style>
    </div>

        

    </div>
  )
}

export default ClientLogo
