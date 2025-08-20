"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { DollarSign, Shield, Users, Heart, Calculator, CheckCircle } from "lucide-react"
import AnimatedButton from "./animated-button"

const familyTypes = [
  {
    id: "individual",
    name: "Individual",
    icon: <Users className="w-6 h-6" />,
    baseRate: 350,
    description: "Single person coverage",
  },
  {
    id: "couple",
    name: "Couple",
    icon: <Heart className="w-6 h-6" />,
    baseRate: 650,
    description: "Two person coverage",
  },
  {
    id: "family",
    name: "Family",
    icon: <Shield className="w-6 h-6" />,
    baseRate: 950,
    description: "Family with children",
  },
  {
    id: "senior",
    name: "Senior",
    icon: <Heart className="w-6 h-6" />,
    baseRate: 280,
    description: "Medicare supplement plans",
  },
]

const ageRanges = [
  { value: "25-35", multiplier: 0.8 },
  { value: "36-45", multiplier: 1.0 },
  { value: "46-55", multiplier: 1.3 },
  { value: "56-65", multiplier: 1.6 },
  { value: "65+", multiplier: 0.6 }, // Medicare
]

export default function InsuranceSavingsCalculator() {
  const [selectedFamily, setSelectedFamily] = useState("individual")
  const [selectedAge, setSelectedAge] = useState("36-45")

  const selectedFamilyType = familyTypes.find((f) => f.id === selectedFamily)
  const selectedAgeRange = ageRanges.find((a) => a.value === selectedAge)
  
  const baseRate = selectedFamilyType?.baseRate || 350
  const ageMultiplier = selectedAgeRange?.multiplier || 1.0

  const calculateWithoutUs = (base: number) => {
    // Typical marketplace or direct-buy rates (20-30% higher)
    return Math.round(base * ageMultiplier * 1.25)
  }

  const calculateWithUs = (base: number) => {
    // Our competitive rates
    return Math.round(base * ageMultiplier)
  }

  const calculateAnnualSavings = () => {
    const withoutUs = calculateWithoutUs(baseRate)
    const withUs = calculateWithUs(baseRate)
    return (withoutUs - withUs) * 12
  }

  const savingsPercentage = () => {
    const withoutUs = calculateWithoutUs(baseRate)
    const withUs = calculateWithUs(baseRate)
    return Math.round(((withoutUs - withUs) / withoutUs) * 100)
  }

  return (
    <section className="py-24 bg-black relative backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Calculate Your Savings</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how much you could save on health insurance with our expert guidance and carrier relationships
          </p>
        </motion.div>

        <div className="bg-gray-900/40 border border-gray-700/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
          {/* Subtle animated background */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              background: [
                "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 80%, rgba(147,51,234,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 80%, rgba(34,197,94,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 80% 20%, rgba(249,115,22,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Controls */}
            <div className="space-y-8">
              {/* Family Type Selection */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Select Your Coverage Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {familyTypes.map((family) => (
                    <motion.button
                      key={family.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedFamily(family.id)}
                      className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                        selectedFamily === family.id
                          ? "bg-blue-500/20 border-blue-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedFamily === family.id ? "bg-blue-500/30" : "bg-gray-700/50"
                          }`}
                        >
                          {family.icon}
                        </div>
                        <div>
                          <div className="font-medium">{family.name}</div>
                          <div className="text-xs opacity-70">{family.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Age Range Selection */}
              <div>
                <label className="block text-lg font-medium text-white mb-4">Age Range</label>
                <div className="grid grid-cols-3 gap-3">
                  {ageRanges.map((age) => (
                    <motion.button
                      key={age.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedAge(age.value)}
                      className={`p-3 rounded-xl border transition-all duration-200 text-center ${
                        selectedAge === age.value
                          ? "bg-green-500/20 border-green-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="font-medium">{age.value}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Benefits List */}
              <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Calculator className="w-5 h-5 text-green-400" />
                  <span className="text-sm font-medium text-white">What's Included</span>
                </div>
                <div className="space-y-2">
                  {[
                    "Free consultation & needs analysis",
                    "Shopping multiple carriers for best rates",
                    "Ongoing policy support & claims assistance",
                    "Annual policy reviews",
                    "No fees - carriers pay our commission"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-xs text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-8">
              {/* Savings Circle */}
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="none"
                    className="text-gray-700"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="url(#savingsGradient)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: "0 219.8" }}
                    animate={{
                      strokeDasharray: `${(savingsPercentage() / 100) * 219.8} 219.8`,
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="savingsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#6ee7b7" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      key={`${selectedFamily}-${selectedAge}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-white"
                    >
                      {savingsPercentage()}%
                    </motion.div>
                    <div className="text-gray-400 text-sm">Savings</div>
                  </div>
                </div>
              </div>

              {/* Cost Comparison Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 text-center">
                  <div className="text-red-400 text-sm mb-2">Without Our Help</div>
                  <motion.div
                    key={`without-${selectedFamily}-${selectedAge}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    ${calculateWithoutUs(baseRate)}
                  </motion.div>
                  <div className="text-gray-400 text-sm">per month</div>
                </div>

                <div className="bg-green-900/20 border border-green-500/30 rounded-2xl p-6 text-center">
                  <div className="text-green-400 text-sm mb-2">With Our Help</div>
                  <motion.div
                    key={`with-${selectedFamily}-${selectedAge}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-2xl font-bold text-white mb-1"
                  >
                    ${calculateWithUs(baseRate)}
                  </motion.div>
                  <div className="text-gray-400 text-sm">per month</div>
                </div>
              </div>

              {/* Annual Savings */}
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <motion.div
                  key={`annual-${selectedFamily}-${selectedAge}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl font-bold text-green-400 mb-1"
                >
                  ${calculateAnnualSavings().toLocaleString()}
                </motion.div>
                <div className="text-gray-400 text-sm">Annual Savings</div>
              </div>

              {/* CTA Button */}
              <AnimatedButton 
                variant="default" 
                size="lg"
                className="w-full font-semibold"
              >
                Get Your Free Quote
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
