import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'

const HeroSection = () => {

  const imageRef=useRef(null)

  useEffect(()=>{
        const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  },[]);

  return (
    <section className='w-full pt-36 md:pt-48 pb-10'>
      <div className='container mx-auto text-center space-y-6'>
        {/* Heading */}
        <div>
          <h1 
          style={{ lineHeight: "1.1" }}
          className='text-5xl md:text-6xl font-bold leading-tight 
           lg:text-7xl xl:text-8xl gradient-title 
           tracking-tighter
               bg-gradient-to-b from-gray-100 to-gray-400 
               bg-clip-text text-transparent'>
            Your AI Career Coach for
            <br />
            Professional Success
          </h1>
          <p className='mt-4 text-lg text-muted-foreground max-w-2xl md:text-xl mx-auto'>
            Advance your career with personalized guidance, interview prep, and AI-powered tools for job success.
          </p>
        </div>

        {/* Button */}
        <div  className="flex justify-center space-x-6">
          <Link href="/dashboard">
            <Button size="lg" className=' bg-white  cursor-pointer px-8'>
              Get Started
            </Button>
          </Link>
           <Link href="/dashboard">
            <Button  variant={"outline"} size="lg" className='  cursor-pointer shadow-lg bg-black px-8'>
              Watch Now
            </Button>
          </Link>
        </div>

        
        {/* Banner Image */}
        <div className='hero-image-wrapper mt-10 md:mt-0 '>
         <div
         ref={imageRef}
         className='hero-image'
         >
             <Image
            src="/banner.jpeg"
            width={1280}
            height={720}
            alt="Vistara Banner"
            className="rounded-lg shadow-2xl border mx-auto"
            priority
          />
         </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
