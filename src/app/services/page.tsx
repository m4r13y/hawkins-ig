"use client"

import { useEffect } from "react"
import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import MedicareDisclaimer from "@/components/medicare-disclaimer"
import ServicesPage from "@/components/services-page"
import InsuranceSavingsCalculator from "@/components/insurance-savings-calculator"
import InsuranceConsultationTool from "@/components/insurance-consultation-tool"
import BackgroundPaths from "@/components/background-paths"

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        <ServicesPage />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <MedicareDisclaimer variant="full" />
        </div>
      {/*  <InsuranceConsultationTool /> 
        <InsuranceSavingsCalculator /> */}
        <AnimatedFooter />
      </div>
    </div>
  )
}
