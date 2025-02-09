"use client"

import { useState } from "react"
import { Facebook, Instagram, Twitter, Linkedin, GraduationCap } from "lucide-react"
import DynamicInput from "./DynamicInput"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Subscribing email:", email)
    setEmail("")
  }

  return (
    <footer className="w-full bg-[#2B3555] text-white py-16 ">
      <div className="w-[92%] md:w-[90%] mx-auto">
      <div className="mb-10 md:mb-0 text-center md:text-left">
            <div className="bg-[var(--MainLight-color)] text-black px-4 py-2 inline-flex items-center rounded">
              <GraduationCap className="mr-2" />
              <span className="font-semibold">miiGuru</span>
            </div>
          </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
         

          <nav className="flex flex-col md:flex-row gap-3 md:gap-8 mb-6 md:mb-0">
            <a href="#products" className="hover:text-[var(--MainLight-color)] transition-colors">
              Products
            </a>
            <a href="#solutions" className="hover:text-[var(--MainLight-color)] transition-colors">
              Solutions
            </a>
            <a href="#terms" className="hover:text-[var(--MainLight-color)] transition-colors">
              Terms of service
            </a>
            <a href="#privacy" className="hover:text-[var(--MainLight-color)] transition-colors">
              Privacy Policy
            </a>
          </nav>

          <div className="w-full md:w-auto">
            <form onSubmit={handleSubmit} className="flex place-items-end gap-2">
              <DynamicInput
                type="email"
                label={'Get the fresh news from us'}
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-black"
                required
              />
              <button type="submit" className="bg-[var(--MainLight-color)] text-black hover:bg-[#E4C02F] h-[44px] md:h-14 px-4 rounded-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>
<hr className="border border-gray-400 my-10"/>
        <div className="flex flex-col-reverse md:flex-row justify-between items-center ">
          <p className="text-gray-400">Copyright © 2024 miiGuru, All rights reserved.</p>

          <div className="flex gap-4 mb-6 md:mb-0">
            <a href="#facebook" className="hover:text-[var(--MainLight-color)] transition-colors border border-white hover:border-[var(--MainLight-color)] rounded-full p-2">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#facebook" className="hover:text-[var(--MainLight-color)] transition-colors border border-white hover:border-[var(--MainLight-color)] rounded-full p-2">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#facebook" className="hover:text-[var(--MainLight-color)] transition-colors border border-white hover:border-[var(--MainLight-color)] rounded-full p-2">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="#facebook" className="hover:text-[var(--MainLight-color)] transition-colors border border-white hover:border-[var(--MainLight-color)] rounded-full p-2">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

