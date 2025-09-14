"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GetStartedFlow from "@/components/get-started-flow"
import { trackPageView } from "@/components/form-tracking"

export default function BusinessGetStartedPage() {
  useEffect(() => {
    trackPageView('/get-started/business')
  }, [])

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <GetStartedFlow initialClientType="business" />
        <AnimatedFooter />
      </div>
    </div>
  )
}

