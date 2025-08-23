"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import FinancialPlanningTool from "@/components/financial-planning-tool"
import EstatePlanningTool from "@/components/estate-planning-tool"
import RetirementCalculatorTool from "@/components/retirement-calculator-tool"
import { motion } from "framer-motion"
import { Calculator, Users, Shield, TrendingUp, PiggyBank, FileText } from "lucide-react"

export default function Finances() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Check for dark mode preference
    const checkDarkMode = () => {
      const html = document.documentElement
      setDarkMode(html.classList.contains('dark'))
    }
    
    // Initial check
    checkDarkMode()
    
    // Listen for dark mode changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })
    
    return () => observer.disconnect()
  }, [])

  const gradientClass = darkMode 
    ? "bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    : "bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100"

  return (
    <div className={`relative min-h-screen ${gradientClass}`}>
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Planning</span>
              </h1>
              <p className={`text-xl max-w-3xl mx-auto mb-12 ${darkMode ? 'text-blue-100' : 'text-gray-700'}`}>
                Plan your financial future with our comprehensive tools for retirement, estate planning, 
                and overall financial wellness. Take control of your financial destiny today.
              </p>
              
              {/* Tool Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {[
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: "Financial Planning",
                    description: "Comprehensive financial roadmap for your future"
                  },
                  {
                    icon: <FileText className="w-8 h-8" />,
                    title: "Estate Planning",
                    description: "Protect your legacy and loved ones"
                  },
                  {
                    icon: <PiggyBank className="w-8 h-8" />,
                    title: "Retirement Calculator",
                    description: "Plan and optimize your retirement savings"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`border rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 ${
                      darkMode 
                        ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                        : 'bg-white/70 border-gray-200 hover:bg-white/90 shadow-lg'
                    }`}
                  >
                    <div className={`mb-4 flex justify-center ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {feature.icon}
                    </div>
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Financial Planning Tool */}
        <FinancialPlanningTool />

        {/* Estate Planning Tool */}
        <EstatePlanningTool />

        {/* Retirement Calculator Tool */}
        <RetirementCalculatorTool />

        <AnimatedFooter />
      </div>
    </div>
  )
}
