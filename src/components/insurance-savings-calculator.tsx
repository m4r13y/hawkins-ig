"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { DollarSign, Shield, Users, Heart, Calculator, CheckCircle, Building, Stethoscope, FileText, TrendingUp } from "lucide-react"
import AnimatedButton from "./animated-button"
import Link from "next/link"

const productCategories = [
  {
    id: "primary-health",
    name: "Primary Health Insurance",
    icon: <Stethoscope className="w-6 h-6" />,
    baseRate: 450,
    description: "Core health coverage plans",
  },
  {
    id: "supplemental",
    name: "Supplemental Health Insurance",
    icon: <Shield className="w-6 h-6" />,
    baseRate: 180,
    description: "Additional coverage options",
  },
  {
    id: "life-insurance",
    name: "Life Insurance",
    icon: <Heart className="w-6 h-6" />,
    baseRate: 85,
    description: "Life protection policies",
  },
  {
    id: "financial",
    name: "Financial Products",
    icon: <TrendingUp className="w-6 h-6" />,
    baseRate: 350,
    description: "Investment & planning",
  },
]

const productDetails = {
  "primary-health": [
    { id: "individual", name: "Individual Health Plans", multiplier: 0.8 },
    { id: "family", name: "Family Health Plans", multiplier: 1.2 },
    { id: "medicare", name: "Medicare", multiplier: 0.6 },
    { id: "group", name: "Group Insurance", multiplier: 1.1 },
  ],
  "supplemental": [
    { id: "dental", name: "Dental", multiplier: 0.4 },
    { id: "cancer", name: "Cancer", multiplier: 0.7 },
    { id: "drug-plans", name: "Drug Plans", multiplier: 0.5 },
    { id: "hospital", name: "Hospital Indemnity", multiplier: 0.6 },
  ],
  "life-insurance": [
    { id: "whole", name: "Whole Life", multiplier: 2.0 },
    { id: "universal", name: "Universal Life", multiplier: 1.5 },
    { id: "term", name: "Term Life", multiplier: 0.8 },
    { id: "final-expense", name: "Final Expense", multiplier: 1.0 },
  ],
  "financial": [
    { id: "annuities", name: "Annuities", multiplier: 1.5 },
    { id: "investments", name: "Investments", multiplier: 1.2 },
    { id: "estate", name: "Estate Planning", multiplier: 2.0 },
  ],
}

const ageRanges = [
  { value: "25-35", multiplier: 0.8 },
  { value: "36-45", multiplier: 1.0 },
  { value: "46-55", multiplier: 1.3 },
  { value: "56-65", multiplier: 1.6 },
  { value: "65+", multiplier: 0.7 },
]

export default function InsuranceSavingsCalculator() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedAge, setSelectedAge] = useState("")

  const selectedCategoryData = productCategories.find((c) => c.id === selectedCategory)
  const availableProducts = selectedCategory ? productDetails[selectedCategory as keyof typeof productDetails] || [] : []
  const selectedProductData = availableProducts.find((p) => p.id === selectedProduct)
  const selectedAgeRange = ageRanges.find((a) => a.value === selectedAge)
  
  const baseRate = selectedCategoryData?.baseRate || 350
  const productMultiplier = selectedProductData?.multiplier || 1.0
  const ageMultiplier = selectedAgeRange?.multiplier || 1.0

  const calculateWithoutUs = (base: number) => {
    // Typical marketplace or direct-buy rates (20-30% higher)
    return Math.round(base * productMultiplier * ageMultiplier * 1.25)
  }

  const calculateWithUs = (base: number) => {
    // Our competitive rates
    return Math.round(base * productMultiplier * ageMultiplier)
  }

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedProduct("") // Reset product when category changes
    setSelectedAge("") // Reset age when category changes
    setCurrentStep(2)
  }

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId)
    setSelectedAge("") // Reset age when product changes
    setCurrentStep(3)
  }

  const handleAgeSelect = (ageValue: string) => {
    setSelectedAge(ageValue)
    setCurrentStep(4)
  }

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      if (currentStep === 2) {
        setSelectedCategory("")
        setSelectedProduct("")
        setSelectedAge("")
      } else if (currentStep === 3) {
        setSelectedProduct("")
        setSelectedAge("")
      } else if (currentStep === 4) {
        setSelectedAge("")
      }
    }
  }

  const isComplete = selectedCategory && selectedProduct && selectedAge

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
    <section className="py-24 bg-background relative backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">Calculate Your Savings</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how much you could save on health insurance with our expert guidance and carrier relationships
          </p>
        </motion.div>

        <div className="bg-gradient-to-br from-secondary via-background to-secondary border border-border rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Step Form */}
            <div className="space-y-8">
              {/* Progress Indicator */}
              <div className="flex items-center space-x-4 mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                        step < currentStep
                          ? "bg-green-500 text-white"
                          : step === currentStep
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step < currentStep ? "✓" : step}
                    </div>
                    {step < 4 && (
                      <div
                        className={`w-8 h-1 mx-2 transition-all duration-200 ${
                          step < currentStep ? "bg-green-500" : "bg-muted"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <div className="min-h-[300px]">
                {/* Step 1: Product Category */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Step 1: Choose Product Category</h3>
                      <p className="text-muted-foreground">What type of insurance or financial product are you interested in?</p>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {productCategories.map((category) => (
                        <motion.button
                          key={category.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleCategorySelect(category.id)}
                          className="p-6 rounded-xl border border-border bg-card/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-200 text-left group"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-lg bg-muted group-hover:bg-primary/20 transition-colors">
                              {category.icon}
                            </div>
                            <div>
                              <div className="font-semibold text-foreground text-lg">{category.name}</div>
                              <div className="text-muted-foreground text-sm">{category.description}</div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Product Type */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Step 2: Choose Product Type</h3>
                      <p className="text-muted-foreground">Which specific {selectedCategoryData?.name.toLowerCase()} product interests you?</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {availableProducts.map((product) => (
                        <motion.button
                          key={product.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleProductSelect(product.id)}
                          className="p-4 rounded-xl border border-border bg-card/50 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200 text-left"
                        >
                          <div className="font-medium text-foreground">{product.name}</div>
                        </motion.button>
                      ))}
                    </div>
                    <button
                      onClick={goBack}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center space-x-2"
                    >
                      <span>← Back to categories</span>
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Age Range */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Step 3: Select Age Range</h3>
                      <p className="text-muted-foreground">What's your age range? This helps us calculate accurate pricing.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {ageRanges.map((age) => (
                        <motion.button
                          key={age.value}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAgeSelect(age.value)}
                          className="p-4 rounded-xl border border-border bg-card/50 hover:border-green-500/50 hover:bg-green-500/10 transition-all duration-200 text-center"
                        >
                          <div className="font-medium text-foreground text-lg">{age.value}</div>
                        </motion.button>
                      ))}
                    </div>
                    <button
                      onClick={goBack}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center space-x-2"
                    >
                      <span>← Back to products</span>
                    </button>
                  </motion.div>
                )}

                {/* Step 4: Results */}
                {currentStep === 4 && isComplete && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">Your Selection</h3>
                      <p className="text-muted-foreground">Here's your estimated savings calculation</p>
                    </div>
                    <div className="bg-card/30 border border-border rounded-xl p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="text-foreground font-medium">{selectedCategoryData?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Product:</span>
                        <span className="text-foreground font-medium">{selectedProductData?.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Age Range:</span>
                        <span className="text-foreground font-medium">{selectedAge}</span>
                      </div>
                    </div>
                    <button
                      onClick={goBack}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center space-x-2"
                    >
                      <span>← Back to age selection</span>
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Benefits List - Always Visible */}
              <div className="bg-card/30 border border-border rounded-xl p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <Calculator className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-sm font-medium text-foreground">What's Included</span>
                </div>
                <div className="space-y-2">
                  {[
                    "Shopping multiple carriers for best rates",
                    "Ongoing policy support & claims assistance",
                    "Annual policy reviews",
                    "No fees - carriers pay our commission"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Results - Only show when complete */}
            {isComplete ? (
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
                      className="text-muted"
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
                        key={`${selectedCategory}-${selectedProduct}-${selectedAge}`}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-2xl font-bold text-foreground"
                      >
                        {savingsPercentage()}%
                      </motion.div>
                      <div className="text-muted-foreground text-sm">Savings</div>
                    </div>
                  </div>
                </div>

                {/* Cost Comparison Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 rounded-2xl p-6 text-center">
                    <div className="text-red-600 dark:text-red-400 text-sm mb-2">Without Our Help</div>
                    <motion.div
                      key={`without-${selectedCategory}-${selectedProduct}-${selectedAge}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-foreground mb-1"
                    >
                      ${calculateWithoutUs(baseRate)}
                    </motion.div>
                    <div className="text-muted-foreground text-sm">per month</div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-500/30 rounded-2xl p-6 text-center">
                    <div className="text-green-600 dark:text-green-400 text-sm mb-2">With Our Help</div>
                    <motion.div
                      key={`with-${selectedCategory}-${selectedProduct}-${selectedAge}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold text-foreground mb-1"
                    >
                      ${calculateWithUs(baseRate)}
                    </motion.div>
                    <div className="text-muted-foreground text-sm">per month</div>
                  </div>
                </div>

                {/* Annual Savings */}
                <div className="bg-card/50 rounded-2xl p-6 border border-border text-center">
                  <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                  <motion.div
                    key={`annual-${selectedCategory}-${selectedProduct}-${selectedAge}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1"
                  >
                    ${calculateAnnualSavings().toLocaleString()}
                  </motion.div>
                  <div className="text-muted-foreground text-sm">Annual Savings</div>
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4">
                  <AnimatedButton
                    onClick={() => {
                      setCurrentStep(1)
                      setSelectedCategory("")
                      setSelectedProduct("")
                      setSelectedAge("")
                    }}
                    variant="outline"
                    size="lg"
                    className="flex-1 font-semibold"
                  >
                    Start Over
                  </AnimatedButton>

                  <Link href="/get-started" className="flex-1">
                    <AnimatedButton 
                      variant="default" 
                      size="lg"
                      className="w-full font-semibold"
                    >
                      Get Started
                    </AnimatedButton>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-card/50 rounded-full flex items-center justify-center mx-auto">
                    <Calculator className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">Calculate Your Savings</h3>
                    <p className="text-muted-foreground max-w-sm">
                      Complete the steps on the left to see your personalized savings estimate
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Step {currentStep} of 3
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
