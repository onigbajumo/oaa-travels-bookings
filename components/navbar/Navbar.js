
"use client"
import React, {useState} from 'react';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { BsCart3 } from "react-icons/bs";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { usePathname } from "next/navigation";
import { TfiClose } from "react-icons/tfi";
import { CiSearch } from "react-icons/ci";


const navlist = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "About",
    path: "/about",
  },
  {
    text: "Services",
    path: "/#",
  },
  {
    text: "Portfolio",
    path: "/#",
  },
  
  {
    text: "Upskill program",
    path: "/#",
  },
  
  {
    text: "iEnterprise",
    path: "/#",
  },
 
  

];



const Navigation = () => {
  const [showNav, setShowNav] = useState(false);

  const whenActive = usePathname();
  


  const navBarList = navlist.filter((element) => element.path !== "/menu");

  return (
    <div id="header">
    <nav className='fixed top-0 w-full z-[9999] bg-white '>
     
      <header  className="bg-white sticky top-0 bottom-0 z-40 py-6 border-b-2 border-[#F2F2F2]">
      <div className="flex justify-between items-center mx-auto max-w-[1536px] w-[90%]">
        

        {/* Desktop View */}
        <div className='lg:flex hidden '>

                <Link className="text-xl font-semibold  " href="/">
                 <Image src="/logo.png" width={150} height={25}/>
                </Link>
        </div>
        <div className="">

          <ul className="lg:flex hidden justify-around gap-6 items-center">
           

            {navBarList.map((list, index) => (
              <Link href={list.path} key={index}>
                <li
                  className={
                    whenActive === list.path
                      ? "text-[16px] font-bold text-[#0D1118] inline-block border-b-2 border-[#0D1118]"
                      : "text-[16px] text-[#0D1118] font-medium 1xl"
                  }
                  key={index}
                >
                  {list.text}
                </li>
              </Link>
            ))}
            
          </ul>

          <div className='lg:hidden '>

            <Link className="text-xl font-semibold  " href="/">
            <Image src="/logo.png" width={200} height={200}/>
            </Link>
          </div>
          
        </div>
        <Link href="# " className="lg:flex hidden">
            <button className="border border-[#134574] flex items-center gap-2 rounded-full  text-[#134574] font-bold  px-6 py-2 ">
                Let{`’`}s Talk <Image src='/arrowE.svg' width={20} height={1} />
            </button>
        </Link>
      
        <div onClick={() => setShowNav(!showNav)} className="lg:hidden">
            {/* <MenuIcon  /> */}
            <HiOutlineMenuAlt3 className="text-[40px]" />

          </div>


      </div>

      {/* Mobile View */}
      <div
        className={
          showNav
            ? "lg:hidden w-full h-screen fixed left-0 top-0 bg-black/70"
            : ""
        }
      >
        <div
          className={
            showNav
              ? "h-screen fixed left-0 top-0 bg-[#134574] w-[75%] sm-w-[35%] ease-in duration-500"
              : "fixed left-[-100%] top-0 ease-in duration-500 "
          }
        >
          <div className="flex flex-col gap-9">
            <div
              onClick={() => setShowNav(!showNav)}
              className="flex  flex-row-reverse w-full py-8 px-6"
            >
              <TfiClose className="text-[30px] align-right text-white" />
            </div>
            <div className="">
            
              <ul className="flex flex-col gap-6 px-8">
                {navBarList.map((list, index) => (
                  <Link
                    href={list.path}
                    key={index}
                    onClick={() => setShowNav(false)}
                  >
                    <li
                      className={
                        whenActive === list.path
                          ? "text-[16px] font-bold text-white"
                          : "text-[16px] text-white font-medium"
                      }
                      key={index}
                    >
                      {list.text}
                    </li>
                  </Link>
                ))}
                <Link href="/">
                  <button
                    className="bg-white flex items-center gap-2 rounded-full text-[#134574] font-bold px-8 py-2"
                    onClick={() => setShowNav(false)}
                  >
                    Let{`’`}s Talk <Image src='/arrowE.svg' width={20} height={1} />
                  </button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    </nav>
    </div>
   
  );
};

export default Navigation;


