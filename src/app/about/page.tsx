"use client"

import { useState, useEffect } from 'react'
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import CustomerInquiry from "@/components/customer-inquiry"

export default function InquiryPage() {
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
        <CustomerInquiry />
        <AnimatedFooter />
      </div>
    </div>
  )
}
