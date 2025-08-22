"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import ServicesPage from "@/components/services-page"
import InsuranceSavingsCalculator from "@/components/insurance-savings-calculator"
import InsuranceConsultationTool from "@/components/insurance-consultation-tool"

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative z-10">
        <Navbar />
        <ServicesPage />
        <AnimatedFooter />
      </div>
    </div>
  )
}
