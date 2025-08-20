"use client"

import { motion } from "framer-motion"
import { Heart, Users, Building, Shield, Phone, Plus, CheckCircle, Clock, UserCheck } from "lucide-react"
import Link from "next/link"
import AnimatedButton from "./animated-button"

const services = [
  {
    title: "Medicare Plans",
    description: "Comprehensive Medicare coverage including supplements, advantage plans, and prescription drug coverage.",
    icon: <Heart className="w-8 h-8" />,
    gradient: "from-blue-500/20 to-blue-600/10",
    features: ["Medicare Supplement", "Medicare Advantage", "Part D Prescription", "Medigap Plans"],
    mockup: "medicare"
  },
  {
    title: "Group Insurance", 
    description: "Competitive group benefits for your employees with access to major national carriers.",
    icon: <Building className="w-8 h-8" />,
    gradient: "from-green-500/20 to-green-600/10",
    features: ["Employee Health Plans", "Dental & Vision", "Life Insurance", "Disability Coverage"],
    mockup: "group"
  },
  {
    title: "Family Health",
    description: "Zero-deductible, guaranteed renewable health plans that give families more control over healthcare costs.",
    icon: <Users className="w-8 h-8" />,
    gradient: "from-red-500/20 to-red-600/10",
    features: ["Individual Coverage", "Family Plans", "Short-term Options", "COBRA Alternatives"],
    mockup: "family"
  },
  {
    title: "Life Insurance",
    description: "Term and permanent life insurance options to protect your family's financial future.",
    icon: <Shield className="w-8 h-8" />,
    gradient: "from-blue-500/20 to-blue-600/10",
    features: ["Term Life Insurance", "Whole Life Insurance", "Universal Life", "Final Expense"],
    mockup: "life"
  },
  {
    title: "Dental & Vision",
    description: "Affordable dental and vision coverage to complement your health insurance.",
    icon: <Phone className="w-8 h-8" />,
    gradient: "from-slate-500/20 to-slate-600/10",
    features: ["Preventive Care", "Major Dental Work", "Vision Exams", "Frame Allowances"],
    mockup: "dental"
  },
  {
    title: "Supplemental Coverage",
    description: "Additional protection including hospital indemnity, cancer insurance, and accident coverage.",
    icon: <Plus className="w-8 h-8" />,
    gradient: "from-red-500/20 to-red-600/10",
    features: ["Hospital Indemnity", "Cancer Insurance", "Accident Coverage", "Critical Illness"],
    mockup: "supplemental"
  },
]

export default function InnovativeServices() {
  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Insurance Solutions for Every Need
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive coverage options tailored to protect what matters most to you and your family.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`bg-gradient-to-br ${service.gradient} border border-gray-800/50 rounded-3xl p-8 backdrop-blur-sm hover:border-gray-700/50 transition-all duration-300 group relative overflow-hidden`}
            >
              {/* Animated mockup overlay */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                {service.mockup === "medicare" && (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center"
                  >
                    <Heart className="w-8 h-8 text-blue-400" />
                  </motion.div>
                )}
                
                {service.mockup === "group" && (
                  <motion.div
                    animate={{ 
                      y: [-2, 2, -2],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center"
                  >
                    <Building className="w-8 h-8 text-green-400" />
                  </motion.div>
                )}

                {service.mockup === "family" && (
                  <motion.div
                    animate={{ 
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 bg-red-500/20 rounded-xl flex items-center justify-center"
                  >
                    <Users className="w-8 h-8 text-red-400" />
                  </motion.div>
                )}

                {service.mockup === "life" && (
                  <motion.div
                    animate={{ 
                      rotateY: [0, 180, 360],
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear"
                    }}
                    className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center"
                  >
                    <Shield className="w-8 h-8 text-blue-400" />
                  </motion.div>
                )}

                {service.mockup === "dental" && (
                  <motion.div
                    animate={{ 
                      x: [-3, 3, -3],
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut"
                    }}
                    className="w-16 h-16 bg-slate-500/20 rounded-full flex items-center justify-center"
                  >
                    <Phone className="w-8 h-8 text-slate-400" />
                  </motion.div>
                )}

                {service.mockup === "supplemental" && (
                  <motion.div
                    animate={{ 
                      rotate: [0, 90, 180, 270, 360],
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear"
                    }}
                    className="w-16 h-16 bg-red-500/20 rounded-lg flex items-center justify-center"
                  >
                    <Plus className="w-8 h-8 text-red-400" />
                  </motion.div>
                )}
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <div className="text-white">{service.icon}</div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
              </div>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Feature list */}
              <div className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: (index * 0.1) + (featureIndex * 0.05) }}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Insurance benefits */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Free Consultation
                  </span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Licensed Agents
                  </span>
                  <span className="text-green-400">✓</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Ongoing Support
                  </span>
                  <span className="text-green-400">✓</span>
                </div>
              </div>

              <Link href="/get-started">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 rounded-lg py-3 px-6 transition-all duration-300 font-medium"
                >
                  Get Started
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Call to action section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-3xl p-12 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">
              Not Sure Which Plan is Right for You?
            </h3>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Our licensed insurance professionals will help you compare options and find the perfect coverage for your needs and budget.
            </p>
            <Link href="/contact">
              <AnimatedButton className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg">
                Schedule Free Consultation
              </AnimatedButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
