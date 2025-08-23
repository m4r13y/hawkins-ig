"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import ServicesPage from "@/components/services-page"
import InsuranceSavingsCalculator from "@/components/insurance-savings-calculator"
import InsuranceConsultationTool from "@/components/insurance-consultation-tool"

export default function Services() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    
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
        <ServicesPage />
        <AnimatedFooter />
      </div>
    </div>
  )
}
