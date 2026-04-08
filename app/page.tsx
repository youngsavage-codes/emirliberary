/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import BooksSection from "./component/home/booksSection";
import MembersSection from "./component/home/membersSection";
import CategoriesSection from "./component/home/categorySection";
import { FaArrowRight } from "react-icons/fa";
import HeroSection from "./component/home/heroSection";
import WisdomSection from "./component/home/wisdomSection";
import PastEmirsSection from "./component/pastEmire";
import PhotoGallery from "./component/home/PhotoGallery";


export default function Home() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: any) => {
    e.preventDefault();
    alert(`Searching for: ${query}`);
  };

  const sampleImages = [
    { src: "/WhatsApp Image 2025-11-07 at 13.21.12_710a4ff0.jpg", caption: "Main Library Hall" },
    { src: "/WhatsApp Image 2025-11-07 at 13.21.12_d30baebb.jpg", caption: "Quiet Study Zone" },
    { src: "/WhatsApp Image 2025-11-07 at 13.21.13_35e9780c.jpg", caption: "Book Shelves" },
    { src: "/WhatsApp Image 2025-11-07 at 13.21.14_b9e7a969.jpg", caption: "Digital Learning Area" },
    { src: "/WhatsApp Image 2025-11-07 at 13.21.12_d30baebb.jpg", caption: "Quiet Study Zone" },
    { src: "/WhatsApp Image 2025-11-07 at 13.21.13_35e9780c.jpg", caption: "Book Shelves" },
    { src: "/WhatsApp Image 2025-11-07 at 13.21.14_b9e7a969.jpg", caption: "Digital Learning Area" },
  ];

  return (
    <main className=" text-gray-900 min-h-screen">
      {/* ================= HERO SECTION ================= */}
      <HeroSection />

      {/* ================= ELEGANT SEARCH BAR ================= */}
      <section className="py-12 bg-[#F3E9E0]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white shadow-lg rounded-full overflow-hidden border border-gray-200 transition-all hover:shadow-xl focus-within:shadow-xl"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books, authors, or topics..."
              className="grow px-6 py-4 text-gray-800 placeholder-gray-400 text-lg focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#8B5E3C] text-white px-6 py-4 font-semibold rounded-full hover:bg-[#A67C5B] transition-colors text-lg"
            >
              Search <FaArrowRight />
            </button>
          </form>
        </div>
      </section>

      {/* ================= PAST EMIRS ================= */}
      <PastEmirsSection />



      {/* ================= FEATURED BOOKS ================= */}
      <BooksSection />

      <CategoriesSection />


      {/* ================= CABINET MEMBERS ================= */}
      <MembersSection />


      {/* ================= QUOTES SECTION ================= */}
      <WisdomSection />

      <PhotoGallery title="Our Pictures" images={sampleImages} />

            {/* ================= ABOUT SECTION ================= */}
      <section className="py-20 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-[#8B5E3C] mb-6">
          About the Zazzau Emirate e-Library
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          The Zazzau Emirate e-Library is a digital initiative dedicated to the
          preservation, promotion, and accessibility of the Emirate’s vast
          intellectual and cultural heritage. It contains manuscripts, historical
          archives, religious writings, and modern research reflecting the
          knowledge traditions of Northern Nigeria.
        </p>
        <p className="text-gray-700 text-lg mt-4 leading-relaxed">
          Our mission is to foster education, cultural awareness, and research
          excellence by making authentic materials from the Emirate’s legacy
          available to scholars, students, and the global community.
        </p>
      </section>

    </main>
  );
}
