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
  const [clickedCard, setClickedCard] = useState<string | null>(null)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen">
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
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
                Financial <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Planning</span>
              </h1>
              <p className="text-xl max-w-3xl mx-auto mb-12 text-gray-600 dark:text-slate-400">
                Plan your financial future with our comprehensive tools for retirement, estate planning, 
                and overall financial wellness. Take control of your financial destiny today.
              </p>
              
              {/* Tool Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                {[
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: "Financial Planning",
                    description: "Comprehensive financial roadmap for your future",
                    targetId: "financial-planning-tool"
                  },
                  {
                    icon: <FileText className="w-8 h-8" />,
                    title: "Estate Planning",
                    description: "Protect your legacy and loved ones",
                    targetId: "estate-planning-tool"
                  },
                  {
                    icon: <PiggyBank className="w-8 h-8" />,
                    title: "Retirement Calculator",
                    description: "Plan and optimize your retirement savings",
                    targetId: "retirement-calculator-tool"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setClickedCard(feature.targetId)
                      setTimeout(() => setClickedCard(null), 2000)
                      // Use anchor navigation instead of JavaScript scroll
                      window.location.hash = feature.targetId
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Navigate to ${feature.title} tool`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setClickedCard(feature.targetId)
                        setTimeout(() => setClickedCard(null), 2000)
                        window.location.hash = feature.targetId
                      }
                    }}
                    className={`group bg-white/80 dark:bg-slate-800/80 border ${
                      clickedCard === feature.targetId 
                        ? 'border-primary ring-2 ring-primary/30' 
                        : 'border-border hover:border-primary/50 dark:hover:border-primary/60'
                    } rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/95 dark:hover:bg-slate-800/95 hover:shadow-xl hover:shadow-primary/10 dark:hover:shadow-slate-900/20 shadow-lg cursor-pointer relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary/50`}
                  >
                    {/* Gradient overlay on hover and click */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 ${
                      clickedCard === feature.targetId 
                        ? 'opacity-20' 
                        : 'opacity-0 group-hover:opacity-100'
                    } transition-opacity duration-300 rounded-2xl`} />
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-4 flex justify-center text-slate-600 dark:text-slate-400 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                        {feature.icon}
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                      <div className={`mt-4 ${
                        clickedCard === feature.targetId 
                          ? 'opacity-100' 
                          : 'opacity-0 group-hover:opacity-100'
                      } transition-opacity duration-300`}>
                        <span className="text-xs text-primary font-medium">
                          {clickedCard === feature.targetId ? 'Scrolling to section...' : 'Click to explore →'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Financial Planning Tool */}
        <div id="financial-planning-tool">
          <FinancialPlanningTool />
        </div>

        {/* Estate Planning Tool */}
        <div id="estate-planning-tool">
          <EstatePlanningTool />
        </div>

        {/* Retirement Calculator Tool */}
        <div id="retirement-calculator-tool">
          <RetirementCalculatorTool />
        </div>

        <AnimatedFooter />
      </div>
    </div>
  )
}
