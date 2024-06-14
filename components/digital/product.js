"use client"
import React, { useEffect, useRef } from 'react';
import { LuDot } from "react-icons/lu";
import Image from 'next/image'
import styles from './styles.module.css'

const DigitalProduct = () => {

  
  return (
    <div>
         <div className='flex justify-between items-center'>
            <p></p>
            <div className="flex items-center mx-8 mb-12">
            <LuDot className='w-4' size={30}/>
             <h2> World-class digital products for</h2>
            </div>

         </div>
         <div className='  relative  ' style={{
                height: "300px",
                backgroundImage: `url(/productBG.svg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>

                <div className="absolute inset-0 bg-[#FF7A00] bg-opacity-70 ">
                    
                    <div className='space-y-36 my-12 overflow-hidden'>
                      <div className={`${styles.play}`}>
                          <div className={`${styles.playcontent} gap-12`}>
                              <h1 className='text-white text-3xl '>E-COMMERCE PLATFORMS</h1>
                              <h1 className='text-white text-3xl'>LEGAL FIRMS</h1>
                              <h1 className='text-white text-3xl'>REAL ESTATE AGENCIES</h1>
                              <h1 className='text-white text-3xl'>E-COMMERCE PLATFORMS</h1> 
                              <h1 className='text-white text-3xl'>LEGAL FIRMS</h1>
                              <h1 className='text-white text-3xl'>REAL ESTATE AGENCIES</h1>
                              <h1 className='text-white text-3xl'>E-COMMERCE PLATFORMS</h1> 
                              <h1 className='text-white text-3xl'>LEGAL FIRMS</h1>
                              <h1 className='text-white text-3xl'>REAL ESTATE AGENCIES</h1>
                              <h1 className='text-white text-3xl'>E-COMMERCE PLATFORMS</h1> 
                              <h1 className='text-white text-3xl'>LEGAL FIRMS</h1>
                              <h1 className='text-white text-3xl'>REAL ESTATE AGENCIES</h1>
                          </div>
                      </div>


                      <div className={`${styles.reverse}`}>
                        <div className={`${styles.playcontent} gap-12`}>
                            <h1 className='text-white text-3xl '>E-COMMERCE PLATFORMS</h1>
                            <h1 className='text-white text-3xl'>LEGAL FIRMS</h1>
                            <h1 className='text-white text-3xl'>REAL ESTATE AGENCIES</h1>
                            <h1 className='text-white text-3xl'>E-COMMERCE PLATFORMS</h1> 
                            <h1 className='text-white text-3xl'>LEGAL FIRMS</h1>
                            <h1 className='text-white text-3xl'>REAL ESTATE AGENCIES</h1>
                            <h1 className='text-white text-3xl'>E-COMMERCE PLATFORMS</h1> 
                            <h1 className='text-white text-3xl'>LEGAL FIRMS</h1>
                            <h1 className='text-white text-3xl'>REAL ESTATE AGENCIES</h1>
                            <h1 className='text-white text-3xl'>E-COMMERCE PLATFORMS</h1> 
                            <h1 className='text-white text-3xl'>LEGAL FIRMS</h1>
                            <h1 className='text-white text-3xl'>REAL ESTATE AGENCIES</h1>
                        </div>
                    </div>
                    </div>
                </div>
               
            </div>
    </div>
  )
}

export default DigitalProduct
