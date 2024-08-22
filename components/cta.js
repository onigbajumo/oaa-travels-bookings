import React from "react"
import Link from "next/link";
import Image from "next/image";



const CTA = () => {
    return (
        <div >
           <div className="bg-[#EF2689] m-16 rounded-xl flex relative overflow-hidden justify-between flex-col lg:flex-row">
  <div className="lg:w-1/2 space-y-12 relative z-10 py-12 px-24">
    <h1 className="text-4xl font-semibold text-white">Build the Ehizua way</h1>
    <p className="text-white">Take the first step towards success and start achieving your goals today! Our services are tailored to meet your unique needs and help you reach new milestones.</p>
    <div>
      <Link href="" className="bg-white rounded-full px-4 py-2">Get in touch</Link>
    </div>
  </div>
  <div className="relative float-right">
    <Image src={"/homecta.png"} alt="CTA Image" width={500} height={500} className="float-right" />
  </div>
  
</div>

        </div>
    )
}

export default CTA;