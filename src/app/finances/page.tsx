"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import FinancialPlanningTool from "@/components/financial-planning-tool"
import EstatePlanningTool from "@/components/estate-planning-tool"
import RetirementCalculatorTool from "@/components/retirement-calculator-tool"
import { motion } from "framer-motion"
import { Calculator, Users, Shield, TrendingUp, PiggyBank, FileText } from "lucide-react"

export default function Finances() {
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
                    className="bg-card border rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:bg-white/90 shadow-lg"
                  >
                    <div className="mb-4 flex justify-center text-slate-600">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-500">
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
