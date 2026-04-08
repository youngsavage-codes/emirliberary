'use client'
import React from 'react'
import Image from 'next/image'

const AboutUsPage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full">
        {/* ================= HERO ================= */}
        <section className="bg-[#F3E9E0] py-20  px-6 text-center">
          <h1 className="text-5xl font-bold text-[#8B5E3C] mb-6">
            About the Zazzau Emirate
          </h1>
          <p className="text-gray-700 text-lg">
            Discover the rich history, culture, and legacy of the Zazzau Emirate, one of the most influential Hausa kingdoms in Northern Nigeria.
          </p>
        </section>

        {/* ================= HISTORY ================= */}
        <section className="py-20 px-5 lg:px-0 grid gap-10 lg:grid-cols-2 items-center max-w-7xl mx-auto">
          <div>
            <h2 className="text-3xl font-bold text-[#8B5E3C] mb-4">Our History</h2>
            <p className="text-gray-700 mb-4">
              The Zazzau Emirate, now Zaria, was established in the 11th century and became a central hub for trade and culture among the Hausa states. 
            </p>
            <p className="text-gray-700 mb-4">
              Queen Amina, a legendary warrior queen of Zazzau, expanded the kingdom’s territory and fortified its cities with walls that still stand today. 
            </p>
            <p className="text-gray-700">
              In the early 19th century, the Fulani Jihad brought changes that blended Hausa and Fulani traditions, shaping the emirate into the influential cultural and religious center it remains today.
            </p>
          </div>
          <div className="relative w-full h-80 rounded-lg overflow-hidden">
            <Image
              src="/WhatsApp Image 2025-10-25 at 12.44.56_6a520dee.jpg"
              alt="Zazzau History"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* ================= MISSION ================= */}
        <section className="py-20 bg-[#EADBC8]  px-6 text-center">
          <h2 className="text-3xl font-bold text-[#8B5E3C] mb-6">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            To preserve and promote the cultural, historical, and religious heritage of the Zazzau Emirate while fostering education and community development.
          </p>
          <p className="text-gray-700">
            We aim to provide a platform for learning, celebrate our rich traditions, and inspire future generations through knowledge and cultural engagement.
          </p>
        </section>

        {/* ================= CULTURE & LEGACY CARDS ================= */}
        <section className="py-20 px-5 lg:px-0 grid gap-6 lg:grid-cols-3 max-w-7xl mx-auto">
          {/* Card 1 */}
          <div className="rounded-lg border border-gray-200 bg-white shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#8B5E3C] mb-3">Cultural Heritage</h3>
            <p className="text-gray-700">
              Zazzau is renowned for its music, dance, festivals, and artisan crafts including weaving, pottery, and metalwork.
            </p>
          </div>
          {/* Card 2 */}
          <div className="rounded-lg border border-gray-200 bg-white shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#8B5E3C] mb-3">Islamic Scholarship</h3>
            <p className="text-gray-700">
              The emirate remains a center for Islamic education, attracting students and scholars from across the region.
            </p>
          </div>
          {/* Card 3 */}
          <div className="rounded-lg border border-gray-200 bg-white shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#8B5E3C] mb-3">Leadership Legacy</h3>
            <p className="text-gray-700">
              From historic rulers to modern emirs, Zazzaus leaders have shaped governance, culture, and the social structure of the region.
            </p>
          </div>
        </section>

        {/* ================= IMAGE BANNER ================= */}
        <section className="relative w-full h-64 lg:h-96 overflow-hidden">
          <Image
            src="/palace.png"
            alt="Zazzau Emirate"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-4xl lg:text-5xl text-white font-bold">A Legacy of Culture & Leadership</h2>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutUsPage
