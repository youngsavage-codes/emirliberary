'use client'
import React from 'react'
import Image from 'next/image'

const HistoryPage = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full">

        {/* Hero */}
        <section className="bg-[#F3E9E0] py-20 px-6 text-center">
          <h1 className="text-5xl font-bold text-[#8B5E3C] mb-6">History of the Zazzau Emirate</h1>
          <p className="text-gray-700 text-lg">
            From its founding in the 11th century, through warrior queens, colonial times, and modern leadership — 
            the Zazzau Emirate has a rich and enduring story.
          </p>
        </section>

        {/* Foundation Era */}
        <section className="py-20 grid gap-10 lg:grid-cols-2 items-center lg:w-7xl mx-auto px-5 lg:px-0">
          <div>
            <h2 className="text-3xl font-bold text-[#8B5E3C] mb-4">Foundation & Early Kingdom (11th - 15th Century)</h2>
            <p className="text-gray-700 mb-4">
              The Zazzau Emirate is traditionally said to have been founded by Gunguma around the 11th century 
              as one of the original Hausa “Bakwai” city-states.
            </p>
            <p className="text-gray-700">
              Its location at the crossroads of trade routes between the Saharan salt caravans and the southern forest zones 
              made Zazzau a strategic hub for commerce and culture.
            </p>
          </div>
          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/palace.png"
              alt="Foundation Zazzau"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Warrior Queen Era */}
        <section className="py-20 grid gap-10 lg:grid-cols-2 items-center lg:w-7xl mx-auto px-5 lg:px-0">
          <div className="order-2 lg:order-1 relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/assets/queen-amina.jpg"
              alt="Queen Amina of Zazzau"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl font-bold text-[#8B5E3C] mb-4">The Era of Princess Amina (c. 1576–1610)</h2>
            <p className="text-gray-700 mb-4">
              Queen Amina expanded Zazzau’s territory through military campaigns, built fortified city walls known as “Amina’s walls,” 
              and elevated the kingdom’s influence across the region.
            </p>
            <p className="text-gray-700">
              Her legacy remains a symbol of strength, trade dominance, and cultural pride in the region.
            </p>
          </div>
        </section>

        {/* Fulani Jihad & Colonial Transition */}
        <section className="py-20 grid gap-10 lg:grid-cols-2 items-center lg:w-7xl mx-auto px-5 lg:px-0">
          <div>
            <h2 className="text-3xl font-bold text-[#8B5E3C] mb-4">Fulani Jihad & Colonial Transformation (1804 - 1902)</h2>
            <p className="text-gray-700 mb-4">
              In 1804, the emir of Zazzau pledged allegiance to Usman dan Fodio after the Fulani jihad. 
              This marked the replacement of the Hausa ruling line with a Fulani emirate under the Sokoto Caliphate.
            </p>
            <p className="text-gray-700">
              The British colonial era further altered the emirate’s structure, reducing its vassals and integrating it into colonial administration.
            </p>
          </div>
          <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/jihadwar.png"
              alt="Colonial Zazzau"
              fill
              className="w-full h-full"
            />
          </div>
        </section>

        {/* Modern Era */}
        <section className="py-20 bg-[#EADBC8] rounded-lg shadow-md px-6">
            <div className='lg:w-7xl mx-auto px-5 lg:px-0'>
                <h2 className="text-3xl font-bold text-[#8B5E3C] mb-6 text-center">Modern Leadership & Legacy</h2>
                <p className="text-gray-700 mb-4">
                    In October 2020, Ahmed Nuhu Bamalli was appointed the 19th Emir of Zazzau — the first from the Mallawa ruling house in nearly a century.
                </p>
                <p className="text-gray-700">
                    Today, the emirate remains a cultural, educational, and religious centre, preserving its heritage while adapting to the demands of modern Nigeria.
                </p>
            </div>
        </section>

        {/* Timeline Cards */}
        <section className="py-20 grid gap-6 lg:grid-cols-4 lg:w-7xl mx-auto px-5 lg:px-0">
          <div className="rounded-lg border border-gray-200 bg-white shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#8B5E3C] mb-3">11th Century</h3>
            <p className="text-gray-700">Founding by King Gunguma as one of the Hausa Bakwai states.</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#8B5E3C] mb-3">c.1576</h3>
            <p className="text-gray-700">Princess Amina ascends to the throne and leads major conquests.</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#8B5E3C] mb-3">1804</h3>
            <p className="text-gray-700">Fulani jihad and allegiance to the Sokoto Caliphate.</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white shadow p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-[#8B5E3C] mb-3">2020</h3>
            <p className="text-gray-700">Ahmed Nuhu Bamalli appointed 19th Emir of Zazzau.</p>
          </div>
        </section>

        {/* Closing Banner */}
        <section className="relative w-full h-64 lg:h-96 overflow-hidden px-5 lg:px-0">
          <Image
            src="/R.jpeg"
            alt="Zazzau Emirate History Banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-4xl lg:text-5xl text-white font-bold">Preserving a Millennium of Heritage</h2>
          </div>
        </section>

      </div>
    </div>
  )
}

export default HistoryPage
