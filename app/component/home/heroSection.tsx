import React from 'react'
import Link from "next/link"

const HeroSection = () => {
  return (
    <section
        className="relative bg-cover bg-no-repeat bg-center text-white py-32 shadow-md"
        style={{ backgroundImage: "url('/WhatsApp Image 2025-10-25 at 12.44.56_6a520dee.jpg')" }}
    >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to the Zazzau Emirate
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Preserving Knowledge • Promoting Heritage
          </p>
          <p className="mt-4 text-gray-100">
            Explore a rich collection of books, manuscripts, and historical works
            that capture the intellectual legacy of the Zazzau Emirate.
          </p>
          <div className='flex items-center justify-center mt-5'>
            <a 
              href="/Product Documentation.pdf" 
              download="Product Documentation.pdf" 
              className="flex items-center gap-2 bg-[#8B5E3C] text-white px-6 py-4 font-semibold rounded-full hover:bg-[#A67C5B] transition-colors text-lg w-fit mx-auto">
                Download
            </a>
          </div>
        </div>
    </section>
  )
}

export default HeroSection