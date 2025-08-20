"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowRight, Heart, Users, Building, Shield, Phone, Plus } from "lucide-react"
import AnimatedButton from "./animated-button"

export default function ServicesPage() {
  const [familySize, setFamilySize] = useState(2)
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  const services = [
    {
      title: "Medicare Plans",
      description:
        "Comprehensive Medicare coverage including supplements, advantage plans, and prescription drug coverage.",
      features: ["Medicare Supplement", "Medicare Advantage", "Part D Prescription", "Medigap Plans"],
      icon: <Heart className="w-8 h-8" />,
      gradient: "from-red-500/20 to-red-600/10",
      price: "Free Consultation",
      color: "red",
    },
    {
      title: "Group Health Insurance",
      description: "Competitive group benefits for your employees with access to major national carriers.",
      features: ["Employee Health Plans", "Dental & Vision", "Life Insurance", "Disability Coverage"],
      icon: <Building className="w-8 h-8" />,
      gradient: "from-blue-500/20 to-blue-600/10",
      price: "Custom Quotes",
      color: "blue",
    },
    {
      title: "Family Health Plans",
      description: "Zero-deductible, guaranteed renewable health plans that give families control over healthcare costs.",
      features: ["Individual Coverage", "Family Plans", "Short-term Options", "COBRA Alternatives"],
      icon: <Users className="w-8 h-8" />,
      gradient: "from-slate-500/20 to-slate-600/10",
      price: "Plans from $200/mo",
      color: "slate",
    },
    {
      title: "Life Insurance",
      description: "Term and permanent life insurance options to protect your family's financial future.",
      features: ["Term Life Insurance", "Whole Life Insurance", "Universal Life", "Final Expense"],
      icon: <Shield className="w-8 h-8" />,
      gradient: "from-red-600/20 to-red-700/10",
      price: "Plans from $25/mo",
      color: "red",
    },
    {
      title: "Dental & Vision",
      description: "Affordable dental and vision coverage to complement your health insurance.",
      features: ["Preventive Care", "Major Dental Work", "Vision Exams", "Frame Allowances"],
      icon: <Phone className="w-8 h-8" />,
      gradient: "from-blue-600/20 to-blue-700/10",
      price: "Plans from $15/mo",
      color: "blue",
    },
    {
      title: "Supplemental Coverage",
      description: "Additional protection including hospital indemnity, cancer insurance, and accident coverage.",
      features: ["Hospital Indemnity", "Cancer Insurance", "Accident Coverage", "Critical Illness"],
      icon: <Plus className="w-8 h-8" />,
      gradient: "from-slate-600/20 to-slate-700/10",
      price: "Plans from $10/mo",
      color: "slate",
    },
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      red: {
        icon: "text-red-400",
        border: "border-red-500/30",
        bg: "bg-red-500/10",
        hover: "hover:border-red-400/50",
        glow: "shadow-red-500/20",
      },
      blue: {
        icon: "text-blue-400",
        border: "border-blue-500/30",
        bg: "bg-blue-500/10",
        hover: "hover:border-blue-400/50",
        glow: "shadow-blue-500/20",
      },
      slate: {
        icon: "text-slate-300",
        border: "border-slate-500/30",
        bg: "bg-slate-500/10",
        hover: "hover:border-slate-400/50",
        glow: "shadow-slate-500/20",
      },
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Insurance Solutions</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive insurance coverage designed to protect what matters most to you and your family
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color)
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onHoverStart={() => setHoveredService(index)}
                onHoverEnd={() => setHoveredService(null)}
                className={`relative bg-gray-900/50 border ${colorClasses.border} ${colorClasses.hover} rounded-3xl p-8 backdrop-blur-sm transition-all duration-300 group overflow-hidden`}
                style={{
                  boxShadow: hoveredService === index ? `0 25px 50px -12px ${colorClasses.glow}` : "none",
                }}
              >
                {/* Animated background glow */}
                <motion.div
                  className={`absolute inset-0 ${colorClasses.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  animate={
                    hoveredService === index
                      ? {
                          background: [
                            `radial-gradient(circle at 20% 50%, ${colorClasses.bg.replace("bg-", "rgba(").replace("/10", ", 0.1)")} 0%, transparent 50%)`,
                            `radial-gradient(circle at 80% 50%, ${colorClasses.bg.replace("bg-", "rgba(").replace("/10", ", 0.1)")} 0%, transparent 50%)`,
                            `radial-gradient(circle at 20% 50%, ${colorClasses.bg.replace("bg-", "rgba(").replace("/10", ", 0.1)")} 0%, transparent 50%)`,
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative z-10">
                  <div className={`${colorClasses.icon} mb-6`}>{service.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + featureIndex * 0.1 }}
                        className="flex items-center text-gray-300"
                      >
                        <div className={`w-2 h-2 ${colorClasses.bg.replace("/10", "")} rounded-full mr-3`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">{service.price}</span>
                    <AnimatedButton className="bg-white text-black hover:bg-gray-100">
                      <span className="flex items-center">
                        Get Quote
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </AnimatedButton>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Licensed & Trusted</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="bg-blue-600 rounded-lg p-4 text-white font-semibold">Texas Licensed Agents</div>
            <div className="bg-green-600 rounded-lg p-4 text-white font-semibold">Family Owned Business</div>
            <div className="bg-gray-800 rounded-lg p-4 text-white font-semibold">10+ Years Experience</div>
            <div className="bg-red-600 rounded-lg p-4 text-white font-semibold">2000+ Clients Served</div>
          </div>
        </motion.div>

        {/* Insurance Consultation Tool */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden"
          id="consultation-tool"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(71,85,105,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(30,41,59,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(71,85,105,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(30,41,59,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(71,85,105,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Insurance Needs Assessment</h2>
              <p className="text-xl text-slate-400">Calculate your estimated coverage needs and potential savings</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Family Size Selector */}
              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-medium text-white mb-4">Family Size</label>
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={familySize}
                      onChange={(e) => setFamilySize(Number(e.target.value))}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #475569 0%, #475569 ${((familySize - 1) / (8 - 1)) * 100}%, #334155 ${((familySize - 1) / (8 - 1)) * 100}%, #334155 100%)`,
                      }}
                    />
                    <div className="flex justify-between text-sm text-slate-400 mt-2">
                      <span>1</span>
                      <span>8+</span>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <span className="text-3xl font-bold text-white">{familySize}</span>
                    <span className="text-slate-400 ml-2">{familySize === 1 ? 'person' : 'people'}</span>
                  </div>
                </div>

                {/* Insurance Process */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Our Process</h3>
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
                        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <div className="text-white font-medium">{item.title}</div>
                          <div className="text-slate-400 text-sm">{item.desc}</div>
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
                      className="text-slate-700"
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
                        <stop offset="0%" stopColor="#475569" />
                        <stop offset="50%" stopColor="#64748b" />
                        <stop offset="100%" stopColor="#94a3b8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        key={familySize}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-2xl font-bold text-white"
                      >
                        ${(familySize * 450).toLocaleString()}
                      </motion.div>
                      <div className="text-slate-400 text-sm">Est. Monthly</div>
                    </div>
                  </div>
                </div>

                {/* Coverage Estimates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      ${(familySize * 5400).toLocaleString()}
                    </div>
                    <div className="text-slate-400 text-sm">Annual Premium</div>
                  </div>

                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 text-center">
                    <div className="text-2xl font-bold text-white mb-1">
                      ${(familySize * 15000).toLocaleString()}
                    </div>
                    <div className="text-slate-400 text-sm">Coverage Value</div>
                  </div>
                </div>

                <div className="text-center">
                  <AnimatedButton className="bg-white text-black hover:bg-slate-100 px-8 py-4 text-lg">
                    <span className="flex items-center">
                      Schedule Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
