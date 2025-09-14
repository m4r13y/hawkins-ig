"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GetStartedFlow from "@/components/get-started-flow"
import { trackPageView } from "@/components/form-tracking"

export default function IndividualGetStartedPage() {
  useEffect(() => {
    trackPageView('/get-started/individual')
  }, [])

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <GetStartedFlow initialClientType="individual" />
        <AnimatedFooter />
      </div>
    </div>
  )
}

