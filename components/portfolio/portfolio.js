import React from 'react'
import Link from 'next/link'
import Image from 'next/image'





const Portfolio = ()=>{



    return (
        <div className='flex md:flex-row flex-col gap-8 justify-between items-center'>
            <div>
                <Image src={"/pot1.png"} width={400} height={400} className='rounded-[30px] shadow-[0_35px_40px_-20px_rgba(10,15,0,0.3)]'/>
                <div className='mt-6'>

                <h1 className='font-semibold '>Market Assist</h1>
                <p>App Dev, Branding - E-commerce</p>
                </div>
            </div>
            <div>
                <Image src={"/pot2.png"} width={400} height={400} className='rounded-[30px] shadow-[0_35px_40px_-20px_rgba(10,15,0,0.3)]'/>
                <div className='mt-6'>

                <h1 className='font-semibold '>Johannes</h1>
                <p>Web Dev, UI/UX - Online Store</p>
                </div>
            </div>
            <div>
                <Image src={"/pot1.png"} width={400} height={400} className='rounded-[30px] shadow-[0_35px_40px_-20px_rgba(10,15,0,0.3)]'/>
                <div className='mt-6'>

                <h1 className='font-semibold '>Market Assist</h1>
                <p>App Dev, Branding - E-commerce</p>
                </div>
            </div>
        </div>
    )
}

export default Portfolio