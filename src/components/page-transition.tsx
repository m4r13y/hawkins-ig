"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

interface PageTransitionProps {
  children: ReactNode
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02
  }
}

const pageTransition = {
  type: "tween" as const,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
  duration: 0.3 // Reduced duration for faster transitions
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  
  // Initialize with a function to avoid flash
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark')
    }
    return true // Default to dark mode on server
  })

  useEffect(() => {
    const checkDarkMode = () => {
      const html = document.documentElement
      setDarkMode(html.classList.contains('dark'))
    }
    
    // Check immediately when component mounts
    checkDarkMode()
    
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const backgroundClass = darkMode 
    ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    : "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"

  return (
    <div className={`fixed inset-0 ${backgroundClass} transition-all duration-300 ease-in-out`} suppressHydrationWarning>
      {/* Persistent background layer to prevent white flash */}
      <div className={`absolute inset-0 ${backgroundClass} z-0 transition-all duration-300 ease-in-out`} suppressHydrationWarning />
      
      {/* Page content with transitions */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="w-full h-full page-transition-wrapper overflow-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
