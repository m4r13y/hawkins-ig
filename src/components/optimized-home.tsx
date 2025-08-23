"use client"

import { lazy, Suspense, useEffect, useState } from 'react'
import Navbar from "@/components/navbar"
import Hero from "@/components/hero"

// Lazy load heavy components to improve initial loading
const HowWeWork = lazy(() => import("@/components/how-we-work"))
const InsuranceServices = lazy(() => import("@/components/insurance-services"))
const AboutUsTabs = lazy(() => import("@/components/about-us-tabs"))
const AnimatedFooter = lazy(() => import("@/components/animated-footer"))

// Loading placeholder to prevent CLS
const ComponentSkeleton = ({ height = "h-64" }: { height?: string }) => (
  <div className={`w-full ${height} bg-gray-100 animate-pulse rounded-lg`}>
    <div className="flex items-center justify-center h-full">
      <div className="text-gray-400">Loading...</div>
    </div>
  </div>
)

export default function OptimizedHome() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      const html = document.documentElement
      setDarkMode(html.classList.contains('dark'))
    }
    
    checkDarkMode()
    
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const gradientClass = darkMode 
    ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
    : "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"

  return (
    <div className={`relative min-h-screen ${gradientClass}`}>
      <div className="relative z-10">
        <Navbar />
        <Hero />
        
        {/* Lazy load below-the-fold content with skeleton loading */}
        <Suspense fallback={<ComponentSkeleton height="h-96" />}>
          <HowWeWork />
        </Suspense>
        
        <Suspense fallback={<ComponentSkeleton height="h-64" />}>
          <AboutUsTabs />
        </Suspense>
        
        <Suspense fallback={<ComponentSkeleton height="h-80" />}>
          <InsuranceServices />
        </Suspense>
        
        <Suspense fallback={<ComponentSkeleton height="h-32" />}>
          <AnimatedFooter />
        </Suspense>
      </div>
    </div>
  )
}
