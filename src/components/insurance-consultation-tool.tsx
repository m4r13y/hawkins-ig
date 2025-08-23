"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowRight } from "lucide-react"
import AnimatedButton from "./animated-button"
import Link from "next/link"

export default function InsuranceConsultationTool() {
  const [familySize, setFamilySize] = useState(2)

  return (
    <section className="py-16 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">Insurance Cost Estimator</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get an instant estimate of your insurance costs based on your family size and coverage needs
          </p>
        </motion.div>

        <div className="bg-card border border-border rounded-3xl p-8 relative">
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Insurance Needs Assessment</h3>
              <p className="text-xl text-muted-foreground">Calculate your estimated coverage needs and potential savings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Family Size Selector */}
              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-medium text-foreground mb-4">Family Size</label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={familySize}
                      onChange={(e) => setFamilySize(Number(e.target.value))}
                      className="w-full h-3 bg-muted rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((familySize - 1) / (8 - 1)) * 100}%, hsl(var(--muted)) ${((familySize - 1) / (8 - 1)) * 100}%, hsl(var(--muted)) 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>1</span>
                      <span>8+</span>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-3xl font-bold text-foreground">{familySize}</span>
                    <span className="text-muted-foreground ml-2">{familySize === 1 ? 'person' : 'people'}</span>
                  </div>
                </div>

                {/* Insurance Process */}
                <div className="bg-card/50 rounded-2xl p-6 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Our Process</h3>
                  <div className="space-y-4">
                    {[
                      { step: "1", title: "Needs Assessment", desc: "Analyze your current situation" },
                      { step: "2", title: "Plan Comparison", desc: "Review available options" },
                      { step: "3", title: "Enrollment Support", desc: "Guide you through signup" },
                      { step: "4", title: "Ongoing Service", desc: "Year-round support & advocacy" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center space-x-4"
                      >
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <div className="text-foreground font-medium">{item.title}</div>
                          <div className="text-muted-foreground text-sm">{item.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-8">
                {/* Coverage Indicator */}
                <div className="relative w-64 h-64 mx-auto">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-muted"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradientInsurance)"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 251.2" }}
                      animate={{
                        strokeDasharray: `${(familySize / 8) * 251.2} 251.2`,
                      }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="gradientInsurance" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(var(--primary))" />
                        <stop offset="50%" stopColor="hsl(var(--primary) / 0.8)" />
                        <stop offset="100%" stopColor="hsl(var(--primary) / 0.6)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        key={familySize}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-2xl font-bold text-foreground"
                      >
                        ${(familySize * 450).toLocaleString()}
                      </motion.div>
                      <div className="text-muted-foreground text-sm">Est. Monthly</div>
                    </div>
                  </div>
                </div>

                {/* Coverage Estimates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card/50 rounded-2xl p-6 border border-border text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">
                      ${(familySize * 5400).toLocaleString()}
                    </div>
                    <div className="text-muted-foreground text-sm">Annual Premium</div>
                  </div>

                  <div className="bg-card/50 rounded-2xl p-6 border border-border text-center">
                    <div className="text-2xl font-bold text-foreground mb-1">
                      ${(familySize * 15000).toLocaleString()}
                    </div>
                    <div className="text-muted-foreground text-sm">Coverage Value</div>
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/get-started">
                    <AnimatedButton className="px-8 py-4 text-lg">
                      <span className="flex items-center">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

