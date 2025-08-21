"use client"

import { motion } from "framer-motion"
import { ClipboardList, BarChart3, Monitor } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Online Assessments",
    description: "Our tools quickly capture your family size, coverage needs, and budget to create a personalized insurance profile.",
    icon: <ClipboardList className="w-8 h-8" />,
    mockup: "consultation",
    gradient: "from-slate-500/20 to-slate-600/10",
  },
  {
    number: "02",
    title: "Instant Plan Comparison",
    description: "Compare multiple plans instantly with clear pricing. Our smart recommendations highlight the best value options for your specific needs.",
    icon: <BarChart3 className="w-8 h-8" />,
    mockup: "comparison",
    gradient: "from-slate-500/20 to-slate-600/10",
  },
  {
    number: "03",
    title: "Real-Time Support Dashboard",
    description: "Track your enrollment status, access claims support, and receive ongoing policy management with complete transparency and 24/7 availability.",
    icon: <Monitor className="w-8 h-8" />,
    mockup: "support",
    gradient: "from-slate-500/20 to-slate-600/10",
  },
]

export default function HowWeWork() {
  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">How We Help You</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A simple, personal approach to finding the right insurance coverage for your family or business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`bg-card border border-border rounded-3xl p-8 backdrop-blur-sm hover:border-border/70 transition-all duration-300 group shadow-lg`}
            >
              {/* Mockup Area */}
              <div className="aspect-video bg-muted rounded-2xl mb-6 overflow-hidden relative border border-border">
                <div className="absolute inset-0 bg-muted/50 p-4">
                  {/* Consultation Mockup */}
                  {step.mockup === "consultation" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: index * 0.3 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="w-full max-w-[200px] space-y-3">
                        <div className="flex items-start space-x-2">
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="bg-gray-700 h-5 w-full rounded flex items-center px-2">
                              <span className="text-xs text-gray-300">Coverage Needs</span>
                            </div>
                            <div className="bg-gray-700 h-5 w-4/5 rounded flex items-center px-2">
                              <span className="text-xs text-gray-300">Plan Options</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gray-700 h-12 rounded-lg flex items-center justify-center text-xs text-gray-400">Health</div>
                          <div className="bg-gray-700 h-12 rounded-lg flex items-center justify-center text-xs text-gray-400">Budget</div>
                        </div>
                        <div className="bg-gray-700 h-8 w-full rounded flex items-center justify-center text-xs text-gray-400">Cost $</div>
                      </div>
                    </motion.div>
                  )}

                  {/* Comparison Mockup */}
                  {step.mockup === "comparison" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: index * 0.3 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="w-full max-w-[200px] space-y-3">
                        <div className="bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="text-xs text-gray-300">Plan A - $245/mo</div>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="text-xs text-gray-300">Plan B - $198/mo</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <div className="text-xs text-gray-300">Plan C - $275/mo</div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="bg-gray-700 h-8 flex-1 rounded flex items-center justify-center text-xs text-gray-400">Compare</div>
                          <div className="bg-blue-500 h-8 w-16 rounded flex items-center justify-center text-xs text-white">Best</div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Support Mockup */}
                  {step.mockup === "support" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: index * 0.3 }}
                      className="w-full h-full flex items-center justify-center"
                    >
                      <div className="w-full max-w-[200px] space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-400">Policy Status</div>
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 text-white text-xs">✓</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="text-xs text-gray-300">Enrolled</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="text-xs text-gray-300">Claims Support</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <div className="text-xs text-gray-300">Annual Review</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            <div className="text-xs text-gray-300">24/7 Available...</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-muted-foreground">{step.number}</div>
                  <div className="text-blue-400">{step.icon}</div>
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
