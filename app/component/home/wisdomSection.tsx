import React from 'react'

const WisdomSection = () => {
  return (
      <section className=" text-white py-14 text-center bg-[#8B5E3C]">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-6 text-yellow-300">
            Words of Wisdom
          </h2>
          <blockquote className="text-xl italic">
            “Knowledge is a trust; those who inherit it must preserve and spread
            it for the good of their people.”
          </blockquote>
          <p className="mt-3 text-gray-200 font-medium">
            — Prominent Scholar of the Zazzau Emirate
          </p>
        </div>
      </section>
  )
}

export default WisdomSection