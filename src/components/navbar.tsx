"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedButton from "./animated-button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
      <nav className="relative bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative z-10 px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/hig-logo-white.svg"
                  alt="Hawkins Insurance Group, LLC"
                  width={140}
                  height={45}
                  className="h-10 w-auto"
                />
              </Link>
              
              <div className="hidden md:block">
                <div className="flex items-center space-x-8">
                  <Link href="/services" className="text-sm text-gray-300 hover:text-red-400 transition-colors">
                    Services
                  </Link>
                  <Link href="/team" className="text-sm text-gray-300 hover:text-red-400 transition-colors">
                    Team
                  </Link>
                  <Link href="/success-stories" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">
                    Success Stories
                  </Link>
                  <Link href="/contact" className="text-sm text-gray-300 hover:text-red-400 transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/get-started">
                <AnimatedButton size="sm" className="bg-white text-black hover:bg-gray-100 text-sm">
                  Get Started
                </AnimatedButton>
              </Link>
              <Link href="/sign-in">
                <AnimatedButton size="sm" className="bg-transparent border border-white/30 text-white hover:bg-white/10 text-sm">
                  Sign In
                </AnimatedButton>
              </Link>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5 text-gray-300" /> : <Menu className="h-5 w-5 text-gray-300" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700/50 bg-gray-900/80 backdrop-blur-md rounded-b-2xl">
            <div className="px-6 py-4 space-y-3">
              <Link href="/services" className="block text-gray-300 hover:text-red-400">
                Services
              </Link>
              <Link href="/team" className="block text-gray-300 hover:text-red-400">
                Team
              </Link>
              <Link href="/success-stories" className="block text-gray-300 hover:text-blue-400">
                Success Stories
              </Link>
              <Link href="/contact" className="block text-gray-300 hover:text-red-400">
                Contact
              </Link>
              <div className="pt-3 border-t border-gray-700">
                <Link href="/get-started" className="block">
                  <AnimatedButton className="w-full bg-white text-black hover:bg-gray-100">Get Started</AnimatedButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
