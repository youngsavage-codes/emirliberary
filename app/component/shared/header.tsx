'use client'

import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#8B5E3C] text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <Link href='/'><Image src={'/logo-removebg-preview.png'} alt='' height={70} width={70} /></Link>
          
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              Zazzau Emirate
            </h1>
            <p className="text-sm text-gray-200 italic">
              Preserving Knowledge • Promoting Heritage
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <Link href="/" className="hover:text-yellow-300 transition-colors">
            Home
          </Link>
          <Link href="/library" className="hover:text-yellow-300 transition-colors">
            Library
          </Link>
          <Link href="/history" className="hover:text-yellow-300 transition-colors">
            History
          </Link>
          <Link href="/about" className="hover:text-yellow-300 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-yellow-300 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              {/* Mobile Menu Button */}
              <button className="md:hidden text-white hover:text-yellow-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-[#F9F4EF] text-[#8B5E3C]">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <Image
                    src="/assets/emirate-logo.png"
                    alt="Zazzau Emirate Logo"
                    width={36}
                    height={36}
                    className="rounded-full border border-[#8B5E3C]"
                  />
                  <span className="font-bold">Zazzau Emirate</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="mt-8 flex flex-col space-y-6 text-lg font-medium px-5">
                <SheetClose asChild>
                  <Link href="/" className="hover:text-yellow-600 transition">
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/library" className="hover:text-yellow-600 transition">
                    Library
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/history" className="hover:text-yellow-600 transition">
                    History
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/about" className="hover:text-yellow-600 transition">
                    About
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link href="/contact" className="hover:text-yellow-600 transition">
                    Contact
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
