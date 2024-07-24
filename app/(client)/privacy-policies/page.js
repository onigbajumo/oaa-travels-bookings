import React from 'react'
import FAQs from '../../../components/faq'
import Image from 'next/image'


const Privacy = ()=>{
    return (
        <div className=''>

            <div className='bg-[#F3F6F8] flex flex-col lg:flex-row justify-between  mt-[-9px] mb-24 pt-24 pb-8'>
                <div className='pl-16'>
                    <h1 className='font-semibold text-[80px] leading-[80px]'>Terms & Privacy Policies</h1>
                    <p className='italic font-thin text-lg max-w-md'>Welcome to Ehizua Hub. By accessing and using our website.</p>
                </div>
                <div className='relative'>
                    <Image src="/ehizuahubprint.png" width={600} height={600} className='float-right'/>
                </div>
            </div>
            <div className='max-w-6xl pl-16 pr-4 space-y-8 my-24 py-12'>
                <h1 className='md:text-[50px] text-4xl font-semibold'>Terms of Service</h1>
                <div>
                    <h1 className='font-semibold text-lg'>1. Use of website</h1>
                    <div className='pl-4 space-y-4'>

                    <p>You agree to use our website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website.
                    </p>
                    <p> You must not use our website to distribute any material which is unlawful, harassing, defamatory, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable.</p>
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold text-lg'>2. Intellectual Property</h1>
                    <div className='pl-4 space-y-4'>

                    <p>All content on our website, including text, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Ehizuahub or its content suppliers and protected by international copyright laws. 
                    </p>
                    <p> You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the website without express written permission from Ehizua Hub</p>
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold text-lg'>3. Limitation of Liability</h1>
                    <div className='pl-4 space-y-4'>

                    <p>Ehizua Hub will not be liable for any damages arising from the use of, or inability to use, our website or any information contained on it. 
                    </p>
                    <p> We do not warrant that the website will be uninterrupted, timely, secure, or error-free. </p>
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold text-lg'>4. Changes to the Terms</h1>
                    <div className='pl-4 space-y-4'>

                    <p>We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page, and your continued use of the website constitutes acceptance of the new terms 
                    </p>
                    
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold text-lg'>5. Governing Law</h1>
                    <div className='pl-4 space-y-4'>

                    <p>These terms shall be governed by and construed in accordance with the laws of [Your Country/State], and any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts of Nigeria.
                    </p>
                    
                    </div>
                </div>

                <h1 className='md:text-[50px] text-4xl font-semibold'>Privacy Policy</h1>
                <div>
                    <h1 className='font-semibold text-lg'>1. Introduction</h1>
                    <div className='pl-4 space-y-4'>

                    <p>Ehizua Hub is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
                    </p>
                    
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold text-lg'>2. Information We Collect</h1>
                    <div className='pl-4 space-y-4'>

                    <p>Personal Information: We may collect personally identifiable information, such as your name, email address, and phone number, when you voluntarily provide it to us. 
                    </p>
                    <p> Non-Personal Information: We may collect non-personal information about you whenever you interact with our website. This may include your browser name, the type of computer, and technical information about your means of connection to our website.</p>
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold text-lg'>3. How We Use Your Information</h1>
                    <div className='pl-4 space-y-4'>

                    <p>To personalize your experience and respond to your individual needs. 
                    </p>
                    <p>To improve our website based on the information and feedback we receive from you. </p>
                    <p>To send periodic emails regarding your order or other products and services.</p>
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold text-lg'>4. How We Protect Your Information</h1>
                    <div className='pl-4 space-y-4'>

                    <p>We implement a variety of security measures to maintain the safety of your personal information. Your information is stored in secure networks and is only accessible by a limited number of persons who have special access rights to such systems.
                    </p>
                    
                    </div>
                </div>
                <div>
                    <h1 className='font-semibold text-lg'>5. Sharing Your Information</h1>
                    <div className='pl-4 space-y-4'>

                    <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information except to provide services or comply with the law.
                    </p>
                    
                    </div>
                </div>
            </div>



            <div>
                
            </div>
            
        </div>
    )
}

export default Privacy;