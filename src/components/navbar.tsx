"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import AnimatedButton from "./animated-button"
import SignInModal from "./sign-in-modal"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

  return (
    <header className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
      <nav className="relative bg-background/60 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg overflow-hidden">
        <div className="relative z-10 px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-3">
                {/* Light mode logo */}
                <Image
                  src="/hig-logo-navy.svg"
                  alt="Hawkins Insurance Group, LLC"
                  width={140}
                  height={45}
                  className="h-10 w-auto dark:hidden"
                />
                {/* Dark mode logo */}
                <Image
                  src="/hig-logo-white.svg"
                  alt="Hawkins Insurance Group, LLC"
                  width={140}
                  height={45}
                  className="h-10 w-auto hidden dark:block"
                />
              </Link>
              
              <div className="hidden md:block">
                <div className="flex items-center space-x-8">
                  <Link href="/services" className="text-sm text-foreground/80 hover:text-red-400 transition-colors">
                    Services
                  </Link>
                  <Link href="/team" className="text-sm text-foreground/80 hover:text-red-400 transition-colors">
                    Team
                  </Link>
                  <Link href="/success-stories" className="text-sm text-foreground/80 hover:text-blue-400 transition-colors">
                    Success Stories
                  </Link>
                  <Link href="/contact" className="text-sm text-foreground/80 hover:text-red-400 transition-colors">
                    Contact
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/get-started">
                <AnimatedButton size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                  Get Started
                </AnimatedButton>
              </Link>
              <AnimatedButton 
                size="sm" 
                className="bg-transparent border border-border text-foreground hover:bg-muted/50 text-sm"
                onClick={() => setIsSignInModalOpen(true)}
              >
                Sign In
              </AnimatedButton>
            </div>

            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/80 backdrop-blur-md rounded-b-2xl">
            <div className="px-6 py-4 space-y-3">
              <Link href="/services" className="block text-foreground/80 hover:text-red-400">
                Services
              </Link>
              <Link href="/team" className="block text-foreground/80 hover:text-red-400">
                Team
              </Link>
              <Link href="/success-stories" className="block text-foreground/80 hover:text-blue-400">
                Success Stories
              </Link>
              <Link href="/contact" className="block text-foreground/80 hover:text-red-400">
                Contact
              </Link>
              <div className="pt-3 border-t border-border space-y-3">
                <Link href="/get-started" className="block">
                  <AnimatedButton className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Get Started</AnimatedButton>
                </Link>
                <AnimatedButton 
                  className="w-full bg-transparent border border-border text-foreground hover:bg-muted/50"
                  onClick={() => {
                    setIsSignInModalOpen(true)
                    setIsMenuOpen(false)
                  }}
                >
                  Sign In
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Sign In Modal */}
      <SignInModal 
        isOpen={isSignInModalOpen} 
        onClose={() => setIsSignInModalOpen(false)} 
      />
    </header>
  )
}
