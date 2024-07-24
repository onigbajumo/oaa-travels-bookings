import React from 'react'
import FAQs from '../../../components/faq'
import Image from 'next/image'


const FAQ = ()=>{
    return (
        <div className=''>

            <div className='bg-[#F3F6F8] flex flex-col md:flex-row justify-between  mt-[-9px] mb-24 pt-24 pb-4'>
                <div className='pl-16'>
                    <h1 className='font-semibold text-[80px]'>FAQ</h1>
                    <p className='italic font-thin text-lg max-w-md'>Welcome to Ehizua Hub. By accessing and using our website.</p>
                </div>
                <div>
                    <Image src="/ehizuahubprint.png" width={600} height={600} className='float-right'/>
                </div>
            </div>



            <div>

            </div>
            
        </div>
    )
}

export default FAQ;