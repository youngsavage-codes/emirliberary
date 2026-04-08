import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhone, FaArrowRight } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#8B5E3C] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo / Brand */}
        <div className="flex flex-col items-start">
          <Link href='/'><Image src={'/logo-removebg-preview.png'} alt='' height={70} width={70} /></Link>
          <p className="text-gray-200 text-sm leading-relaxed">
            Preserving the heritage, culture, and knowledge of the Emirate.
          </p>
        </div>

        {/* Desktop Navigation */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Pages Link</h3>
          <nav className="flex flex-col gap-5">
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
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
          <p className="flex items-center gap-2 text-gray-200 text-sm mb-2">
            <FaMapMarkerAlt color="white" /> 123 Emirate Street, Zaria
          </p>
          <p className="flex items-center gap-2 text-gray-200 text-sm mb-2">
            <FaEnvelope color="white" /> info@emirate.com
          </p>
          <p className="flex items-center gap-2 text-gray-200 text-sm mb-4">
            <FaPhone color="white" /> +234 810 466 9710
          </p>

          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-yellow-300 transition"><FaFacebookF size={18} /></a>
            <a href="#" className="hover:text-yellow-300 transition"><FaTwitter size={18} /></a>
            <a href="#" className="hover:text-yellow-300 transition"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-yellow-300 transition"><FaLinkedinIn size={18} /></a>
          </div>
        </div>

      </div>

      <div className="mt-10 border-t border-gray-600 pt-6 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Emirate Council. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
