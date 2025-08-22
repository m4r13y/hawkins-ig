"use client"

import { useEffect } from "react"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import InsuranceConsultationTool from "@/components/insurance-consultation-tool"
import InsuranceSavingsCalculator from "@/components/insurance-savings-calculator"
import { motion } from "framer-motion"
import { Calculator, Users, Shield, TrendingUp } from "lucide-react"

export default function Tools() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="relative min-h-screen bg-background bg-noise">
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Insurance <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">Tools</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                Use our interactive tools to assess your insurance needs, calculate potential savings, 
                and make informed decisions about your coverage.
              </p>
              
              {/* Tool Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
                {[
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: "Needs Assessment",
                    description: "Calculate coverage based on family size and situation"
                  },
                  {
                    icon: <Calculator className="w-8 h-8" />,
                    title: "Savings Calculator",
                    description: "Compare costs and see potential savings"
                  },
                  {
                    icon: <Shield className="w-8 h-8" />,
                    title: "Plan Comparison",
                    description: "Evaluate different insurance options"
                  },
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: "Financial Planning",
                    description: "Long-term coverage and investment strategies"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300"
                  >
                    <div className="text-blue-400 mb-4 flex justify-center">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Insurance Consultation Tool */}
        <InsuranceConsultationTool />

        {/* Insurance Savings Calculator */}
        <InsuranceSavingsCalculator />

        {/* Additional Information Section */}
        <section className="py-16 bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Need More Personalized Help?
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                Our tools provide estimates, but every situation is unique. Schedule a free consultation 
                with one of our licensed insurance professionals for personalized recommendations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    title: "Free Consultation",
                    description: "No-obligation assessment of your insurance needs",
                    highlight: "Always Free"
                  },
                  {
                    title: "Expert Guidance",
                    description: "Licensed professionals with years of experience",
                    highlight: "Certified Agents"
                  },
                  {
                    title: "Ongoing Support",
                    description: "Year-round assistance and advocacy",
                    highlight: "24/7 Support"
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm"
                  >
                    <div className="text-blue-400 text-sm font-medium mb-2">
                      {item.highlight}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-400">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <AnimatedFooter />
      </div>
    </div>
  )
}
