/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="flex justify-center">
      <div className="w-full">

        {/* ================= HERO ================= */}
        <section className="bg-[#F3E9E0] py-20 px-6 text-center">
          <h1 className="text-5xl font-bold text-[#8B5E3C] mb-6">
            Contact Us
          </h1>
          <p className="text-gray-700 text-lg">
            Have questions or suggestions? Reach out to the Emirate Library team.
          </p>
        </section>

        {/* ================= CONTACT FORM & INFO ================= */}
        <section className="py-20 px-5 lg:px-0 grid gap-10 lg:grid-cols-2 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="rounded-lg border border-gray-200 bg-white shadow p-6 hover:shadow-lg transition">
            <h2 className="text-3xl font-bold text-[#8B5E3C] mb-6 text-center">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                required
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={5}
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#8B5E3C]"
                required
              />
              <button
                type="submit"
                className="bg-[#8B5E3C] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#A67C5B] transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="rounded-lg border border-gray-200 bg-white shadow p-6 hover:shadow-lg transition flex flex-col justify-center gap-6">
            <h2 className="text-3xl font-bold text-[#8B5E3C] mb-2 text-center">Our Contact Info</h2>
            <div className="flex items-center gap-3">
              <span className="material-icons text-[#8B5E3C]">location_on</span>
              <p>Zaria, Kaduna State, Nigeria</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-icons text-[#8B5E3C]">phone</span>
              <p>+234 810 4669 710</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-icons text-[#8B5E3C]">email</span>
              <p>info@zazzau-library.ng</p>
            </div>
          </div>
        </section>

        {/* ================= IMAGE / MAP BANNER ================= */}
        <section className="relative w-full h-64 lg:h-96 rounded-lg overflow-hidden shadow-lg">
          <img
            src="/palace.png"
            alt="Contact Us Banner"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-4xl lg:text-5xl text-white font-bold">Get in Touch with Us</h2>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ContactUsPage
