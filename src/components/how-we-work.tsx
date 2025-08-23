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
    <section className="py-24 bg-transparent relative">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`bg-card border border-border rounded-3xl p-6 lg:p-8 backdrop-blur-sm hover:border-border/70 transition-all duration-300 group shadow-lg`}
            >
              {/* Mobile Layout: Graphic on top (< 640px) */}
              <div className="block sm:hidden">
                {/* Mockup Area */}
                <div className="aspect-video bg-muted rounded-2xl mb-4 overflow-hidden relative border border-border">
                  <div className="absolute inset-0 bg-muted/50 p-2">
                    {/* Mobile Consultation Mockup */}
                    {step.mockup === "consultation" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.3 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="w-full max-w-[140px] space-y-1.5">
                          <div className="flex items-start space-x-1.5">
                            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                              <div className="w-2.5 h-2.5 bg-white/100 rounded-full"></div>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="bg-card border border-border h-4 w-full rounded flex items-center px-1.5 shadow-sm">
                                <span className="text-[10px] text-foreground">Coverage Needs</span>
                              </div>
                              <div className="bg-card border border-border h-4 w-full rounded flex items-center px-1.5 shadow-sm">
                                <span className="text-[10px] text-foreground">Plan Options</span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            <div className="bg-card border border-border h-10 rounded-lg flex items-center justify-center text-[10px] text-foreground shadow-sm">Health</div>
                            <div className="bg-card border border-border h-10 rounded-lg flex items-center justify-center text-[10px] text-foreground shadow-sm">Budget</div>
                          </div>
                          <div className="bg-card border border-border h-6 w-full rounded flex items-center justify-center text-[10px] text-foreground shadow-sm">Cost $</div>
                        </div>
                      </motion.div>
                    )}

                    {/* Mobile Comparison Mockup */}
                    {step.mockup === "comparison" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.3 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="w-full max-w-[140px] space-y-2">
                          <div className="bg-card border border-border rounded-lg p-2 shadow-sm">
                            <div className="flex items-center space-x-1.5 mb-1.5">
                              <div className="w-1.5 h-1.5 bg-white/100 rounded-full"></div>
                              <div className="text-[10px] text-foreground">Plan A - $245/mo</div>
                            </div>
                            <div className="flex items-center space-x-1.5 mb-1.5">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                              <div className="text-[10px] text-foreground">Plan B - $198/mo</div>
                            </div>
                            <div className="flex items-center space-x-1.5">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                              <div className="text-[10px] text-foreground">Plan C - $275/mo</div>
                            </div>
                          </div>
                          <div className="flex space-x-1.5">
                            <div className="bg-card border border-border h-6 flex-1 rounded flex items-center justify-center text-[10px] text-foreground shadow-sm">Compare</div>
                            <div className="bg-primary border border-primary h-6 w-12 rounded flex items-center justify-center text-[10px] text-primary-foreground shadow-sm">Best</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Mobile Support Mockup */}
                    {step.mockup === "support" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.3 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="w-full max-w-[140px] space-y-1.5">
                          <div className="bg-card border border-border rounded px-2 py-1 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="text-[10px] text-foreground">Policy Status</div>
                              <div className="w-3 h-3 bg-white/100 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 text-white text-[8px]">✓</div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-0.5">
                            <div className="bg-card border border-border rounded px-2 py-1 shadow-sm">
                              <div className="flex items-center space-x-1.5">
                                <div className="w-1.5 h-1.5 bg-white/100 rounded-full"></div>
                                <div className="text-[10px] text-foreground">Enrolled</div>
                              </div>
                            </div>
                            <div className="bg-card border border-border rounded px-2 py-1 shadow-sm">
                              <div className="flex items-center space-x-1.5">
                                <div className="w-1.5 h-1.5 bg-white/100 rounded-full"></div>
                                <div className="text-[10px] text-foreground">Claims Support</div>
                              </div>
                            </div>
                            <div className="bg-card border border-border rounded px-2 py-1 shadow-sm">
                              <div className="flex items-center space-x-1.5">
                                <div className="w-1.5 h-1.5 bg-white/100 rounded-full"></div>
                                <div className="text-[10px] text-foreground">Annual Review</div>
                              </div>
                            </div>
                            <div className="bg-card border border-border rounded px-2 py-1 shadow-sm">
                              <div className="flex items-center space-x-1.5">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                                <div className="text-[10px] text-foreground">24/7 Available...</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold text-muted-foreground">{step.number}</div>
                    <div className="text-primary">{step.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Tablet Layout: Horizontal (640px - 1024px) */}
              <div className="hidden sm:block lg:hidden">
                <div className="flex gap-6 h-full">
                  {/* Graphic Side */}
                  <div className="flex-shrink-0 w-48">
                    <div className="h-full bg-muted rounded-2xl overflow-hidden relative border border-border">
                      <div className="absolute inset-0 bg-muted/50 p-6 flex items-center justify-center">
                        {/* Tablet Consultation Mockup */}
                        {step.mockup === "consultation" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: index * 0.3 }}
                            className="w-full h-full flex items-center justify-center"
                          >
                            <div className="w-full max-w-[160px] space-y-2">
                              <div className="flex items-start space-x-2">
                                <div className="w-9 h-9 bg-primary/20 rounded-lg flex items-center justify-center">
                                  <div className="w-3 h-3 bg-white/100 rounded-full"></div>
                                </div>
                                <div className="flex-1 space-y-1">
                                  <div className="bg-card border border-border h-5 w-full rounded flex items-center px-2 shadow-sm">
                                    <span className="text-xs text-foreground">Coverage Needs</span>
                                  </div>
                                  <div className="bg-card border border-border h-5 w-full rounded flex items-center px-2 shadow-sm">
                                    <span className="text-xs text-foreground">Plan Options</span>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="bg-card border border-border h-12 rounded-lg flex items-center justify-center text-xs text-foreground shadow-sm">Health</div>
                                <div className="bg-card border border-border h-12 rounded-lg flex items-center justify-center text-xs text-foreground shadow-sm">Budget</div>
                              </div>
                              <div className="bg-card border border-border h-8 w-full rounded flex items-center justify-center text-xs text-foreground shadow-sm">Cost $</div>
                            </div>
                          </motion.div>
                        )}

                        {/* Tablet Comparison Mockup */}
                        {step.mockup === "comparison" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: index * 0.3 }}
                            className="w-full h-full flex items-center justify-center"
                          >
                            <div className="w-full max-w-[160px] space-y-3">
                              <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-2 h-2 bg-white/100 rounded-full"></div>
                                  <div className="text-xs text-foreground">Plan A - $245/mo</div>
                                </div>
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <div className="text-xs text-foreground">Plan B - $198/mo</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <div className="text-xs text-foreground">Plan C - $275/mo</div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <div className="bg-card border border-border h-8 flex-1 rounded flex items-center justify-center text-xs text-foreground shadow-sm">Compare</div>
                                <div className="bg-primary border border-primary h-8 w-16 rounded flex items-center justify-center text-xs text-primary-foreground shadow-sm">Best</div>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Tablet Support Mockup */}
                        {step.mockup === "support" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: index * 0.3 }}
                            className="w-full h-full flex items-center justify-center"
                          >
                            <div className="w-full max-w-[160px] space-y-2">
                              <div className="bg-card border border-border rounded px-3 py-1.5 shadow-sm">
                                <div className="flex items-center justify-between">
                                  <div className="text-xs text-foreground">Policy Status</div>
                                  <div className="w-4 h-4 bg-white/100 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 text-white text-xs">✓</div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1">
                                <div className="bg-card border border-border rounded px-3 py-1.5 shadow-sm">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white/100 rounded-full"></div>
                                    <div className="text-xs text-foreground">Enrolled</div>
                                  </div>
                                </div>
                                <div className="bg-card border border-border rounded px-3 py-1.5 shadow-sm">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white/100 rounded-full"></div>
                                    <div className="text-xs text-foreground">Claims Support</div>
                                  </div>
                                </div>
                                <div className="bg-card border border-border rounded px-3 py-1.5 shadow-sm">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-white/100 rounded-full"></div>
                                    <div className="text-xs text-foreground">Annual Review</div>
                                  </div>
                                </div>
                                <div className="bg-card border border-border rounded px-3 py-1.5 shadow-sm">
                                  <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <div className="text-xs text-foreground">24/7 Available...</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl font-bold text-muted-foreground">{step.number}</div>
                      <div className="text-primary">{step.icon}</div>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>

              {/* Desktop Layout: Vertical (≥ 1024px) */}
              <div className="hidden lg:block">
                {/* Mockup Area */}
                <div className="aspect-video bg-muted rounded-2xl mb-6 overflow-hidden relative border border-border">
                  <div className="absolute inset-0 bg-muted/50 p-4">
                    {/* Desktop Consultation Mockup */}
                    {step.mockup === "consultation" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.3 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="w-full max-w-[200px] space-y-2">
                          <div className="flex items-start space-x-2">
                            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                              <div className="w-3 h-3 bg-white/100 rounded-full"></div>
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="bg-card border border-border h-5 w-full rounded flex items-center px-2 shadow-sm">
                                <span className="text-xs text-foreground">Coverage Needs</span>
                              </div>
                              <div className="bg-card border border-border h-5 w-full rounded flex items-center px-2 shadow-sm">
                                <span className="text-xs text-foreground">Plan Options</span>
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-card border border-border h-12 rounded-lg flex items-center justify-center text-xs text-foreground shadow-sm">Health</div>
                            <div className="bg-card border border-border h-12 rounded-lg flex items-center justify-center text-xs text-foreground shadow-sm">Budget</div>
                          </div>
                          <div className="bg-card border border-border h-8 w-full rounded flex items-center justify-center text-xs text-foreground shadow-sm">Cost $</div>
                        </div>
                      </motion.div>
                    )}

                    {/* Desktop Comparison Mockup */}
                    {step.mockup === "comparison" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.3 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="w-full max-w-[200px] space-y-3">
                          <div className="bg-card border border-border rounded-lg p-3 shadow-sm">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-2 h-2 bg-white/100 rounded-full"></div>
                              <div className="text-xs text-foreground">Plan A - $245/mo</div>
                            </div>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <div className="text-xs text-foreground">Plan B - $198/mo</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <div className="text-xs text-foreground">Plan C - $275/mo</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="bg-card border border-border h-8 flex-1 rounded flex items-center justify-center text-xs text-foreground shadow-sm">Compare</div>
                            <div className="bg-primary border border-primary h-8 w-16 rounded flex items-center justify-center text-xs text-primary-foreground shadow-sm">Best</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Desktop Support Mockup */}
                    {step.mockup === "support" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: index * 0.3 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="w-full max-w-[200px] space-y-2">
                          <div className="bg-card border border-border rounded px-3 py-1 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-foreground">Policy Status</div>
                              <div className="w-4 h-4 bg-white/100 rounded-full flex items-center justify-center">
                                <div className="w-2.5 h-4 text-white text-xs">✓</div>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="bg-card border border-border rounded px-3 py-1 shadow-sm">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-white/100 rounded-full"></div>
                                <div className="text-xs text-foreground">Enrolled</div>
                              </div>
                            </div>
                            <div className="bg-card border border-border rounded px-3 py-1 shadow-sm">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-white/100 rounded-full"></div>
                                <div className="text-xs text-foreground">Claims Support</div>
                              </div>
                            </div>
                            <div className="bg-card border border-border rounded px-3 py-1 shadow-sm">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-white/100 rounded-full"></div>
                                <div className="text-xs text-foreground">Annual Review</div>
                              </div>
                            </div>
                            <div className="bg-card border border-border rounded px-3 py-1 shadow-sm">
                              <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <div className="text-xs text-foreground">24/7 Available...</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Desktop Content */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl font-bold text-muted-foreground">{step.number}</div>
                    <div className="text-primary">{step.icon}</div>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}


