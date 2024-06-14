import React from 'react';
import "../globals.css";
import Design from '../../../components/service/design'
import Portfolio from '../../../components/portfolio/port'
import Hero from '../../../components/hero/Hero'
import ClientLogo from '../../../components/clientLogo/client'
import DigitalProduct from '../../../components/digital/product'
import Contact from '../../../components/contact/contact'
import Testimony from '../../../components/testimonial/testimonials'


const Home = () => {

    return(
        <>
        <Hero />
        <div className='mx-8'>
            <div className='relative rounded-lg flex justify-around items-center  ' style={{
                height: "500px",
                backgroundImage: `url(/videoDummy.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}>

                
               
            </div>

        </div>

        <ClientLogo />
        <Design />

        <Portfolio />
        <DigitalProduct />
        <Testimony />
        <Contact />
        
        </>
    )
}

export default Home;