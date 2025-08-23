"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Menu, X, Search, ArrowRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import AnimatedButton from "./animated-button"
import { useModal } from "@/contexts/modal-context"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { setIsSignInModalOpen } = useModal()
  const [searchQuery, setSearchQuery] = useState("")
  const searchRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
    }

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isSearchOpen])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // You can implement search logic here
      // For now, we'll just log it and redirect to a search page
      console.log("Searching for:", searchQuery)
      // Example: router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setIsSearchOpen(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
    if (e.key === 'Escape') {
      setIsSearchOpen(false)
      setSearchQuery("")
    }
  }

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-7xl">
      <nav className="relative bg-background/60 dark:bg-white/10 backdrop-blur-md border border-border/50 rounded-2xl shadow-lg overflow-hidden">
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
              
              <div className="hidden lg:block">
                <AnimatePresence mode="wait">
                  {!isSearchOpen ? (
                    <motion.div 
                      key="nav-links"
                      initial={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center space-x-8 overflow-hidden"
                    >
                      <Link href="/services" className="text-sm text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap">
                        Insurance
                      </Link>
                     {/* <Link href="/quotes" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                        Quotes
                      </Link> */}
                      <Link href="/finances" className="text-sm text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap">
                        Finances
                      </Link>
                      <Link href="/team" className="text-sm text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap">
                        Team
                      </Link>
                      <Link href="/success-stories" className="text-sm text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap">
                        Success Stories
                      </Link>
                      <Link href="/contact" className="text-sm text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap">
                        Contact
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="search-input"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "320px" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex items-center space-x-2 overflow-hidden"
                    >
                      <div className="relative flex-1 border-0 outline-none">
                        <Input
                          type="text"
                          placeholder="Search insurance products, services..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyDown={handleKeyPress}
                          className="w-full pr-10 bg-transparent border-0 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-foreground/50 text-foreground text-sm rounded-none shadow-none"
                          autoFocus
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-foreground/10"
                          onClick={handleSearch}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-4" ref={searchRef}>
              <motion.div
                animate={{ x: isSearchOpen ? -160 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchOpen(!isSearchOpen)
                    if (!isSearchOpen) {
                      setSearchQuery("")
                    }
                  }}
                  className="hover:bg-muted/50"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </motion.div>
              
              <AnimatePresence>
                {!isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex items-center space-x-4"
                  >
                    <Link href="/get-started">
                      <AnimatedButton size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 text-sm">
                        Get Started
                      </AnimatedButton>
                    </Link>
                    <AnimatedButton 
                      size="sm" 
                      className="bg-secondary/50 border border-border text-foreground hover:bg-muted/50 text-sm"
                      onClick={() => setIsSignInModalOpen(true)}
                    >
                      Sign In
                    </AnimatedButton>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="lg:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/80 backdrop-blur-md rounded-b-2xl">
            <div className="px-6 py-4 space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search insurance products, services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full pr-10 bg-transparent border border-border/30 focus:border-border/60 focus:ring-0 placeholder:text-foreground/50 text-foreground rounded-lg"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-foreground/10"
                  onClick={handleSearch}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="border-t border-border pt-3">
                <Link href="/services" className="block text-foreground/80 hover:text-foreground">
                  Insurance
                </Link>
                <Link href="/finances" className="block text-foreground/80 hover:text-foreground">
                  Finances
                </Link>
                <Link href="/team" className="block text-foreground/80 hover:text-foreground">
                  Team
                </Link>
                <Link href="/success-stories" className="block text-foreground/80 hover:text-foreground">
                  Success Stories
                </Link>
                <Link href="/contact" className="block text-foreground/80 hover:text-foreground">
                  Contact
                </Link>
              </div>
              
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
    </header>
  )
}
