"use client"

import { lazy, Suspense } from 'react'
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
  return (
    <div className="relative min-h-screen bg-background bg-noise">
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
