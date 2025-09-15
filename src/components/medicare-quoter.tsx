"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Stethoscope, Shield, Users, Heart, Calendar, MapPin, Phone, Mail, CheckCircle, ArrowRight } from "lucide-react"
import AnimatedButton from "./animated-button"
import { getMedicareAdvantageQuotes, type MedicareAdvantageQuoteParams } from "@/lib/actions/medicare-advantage-quotes"
import { getMedigapQuotes, type MedigapQuoteParams } from "@/lib/actions/medigap-quotes"

interface QuoteFormData {
  zipCode: string
  dateOfBirth: string
  gender: "male" | "female"
  planType: "advantage" | "supplement" | "both"
  currentCoverage: string
  monthlyBudget: string
  healthConditions: string[]
  preferredDoctors: string
}

export default function MedicareQuoter() {
  const [formData, setFormData] = useState<QuoteFormData>({
    zipCode: "",
    dateOfBirth: "",
    gender: "male",
    planType: "advantage",
    currentCoverage: "",
    monthlyBudget: "",
    healthConditions: [],
    preferredDoctors: ""
  })
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [quotes, setQuotes] = useState<any[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const healthConditionOptions = [
    "Diabetes", "Heart Disease", "High Blood Pressure", "Cancer History", 
    "Arthritis", "COPD", "Kidney Disease", "None of the above"
  ]

  const handleInputChange = (field: keyof QuoteFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (step) {
      case 1:
        if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
        if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = "Date of birth is required"
        break
      case 2:
        if (!formData.planType) newErrors.planType = "Plan type is required"
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return
    
    setIsLoading(true)
    try {
      const quoteParams: MedicareAdvantageQuoteParams = {
        zipCode: formData.zipCode,
        plan: "original",
        sort: "price",
        order: "asc"
      }
      
      let quoteResults: any[] = []
      
      if (formData.planType === "advantage" || formData.planType === "both") {
        const advantageResult = await getMedicareAdvantageQuotes(quoteParams)
        if (advantageResult.quotes) {
          quoteResults = [...quoteResults, ...advantageResult.quotes]
        }
      }
      
      if (formData.planType === "supplement" || formData.planType === "both") {
        const medigapParams: MedigapQuoteParams = {
          zipCode: formData.zipCode,
          age: calculateAge(formData.dateOfBirth).toString(),
          gender: formData.gender === "male" ? "M" : "F",
          tobacco: "0",
          plans: ["F", "G", "N"] // Popular supplement plans
        }
        const supplementResult = await getMedigapQuotes(medigapParams)
        if (supplementResult.quotes) {
          quoteResults = [...quoteResults, ...supplementResult.quotes]
        }
      }
      
      setQuotes(quoteResults)
      setCurrentStep(4) // Results step
    } catch (error) {
      console.error("Error getting quotes:", error)
      setErrors({ general: "Unable to retrieve quotes. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const calculateAge = (dateOfBirth: string): number => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Basic Information</h2>
              <p className="text-muted-foreground">Let's start with your location and demographics to find available Medicare plans.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">ZIP Code *</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => {
                    // Only allow digits and limit to 5 characters
                    const value = e.target.value.replace(/\D/g, '').slice(0, 5)
                    handleInputChange("zipCode", value)
                  }}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your ZIP code"
                  maxLength={5}
                  pattern="[0-9]{5}"
                  title="Please enter a 5-digit ZIP code"
                />
                {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Date of Birth *</label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value as "male" | "female")}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Monthly Budget</label>
                <select
                  value={formData.monthlyBudget}
                  onChange={(e) => handleInputChange("monthlyBudget", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select budget range</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200-300">$200 - $300</option>
                  <option value="300+">$300+</option>
                </select>
              </div>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Plan Preferences</h2>
              <p className="text-muted-foreground">Tell us about your coverage preferences and health needs.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: "advantage", title: "Medicare Advantage", desc: "All-in-one alternative to Original Medicare" },
                { value: "supplement", title: "Medicare Supplement", desc: "Covers gaps in Original Medicare" },
                { value: "both", title: "Compare Both", desc: "See options for both types" }
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleInputChange("planType", option.value)}
                  className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.planType === option.value
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2">{option.title}</h3>
                  <p className="text-muted-foreground">{option.desc}</p>
                </div>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Coverage</label>
              <input
                type="text"
                value={formData.currentCoverage}
                onChange={(e) => handleInputChange("currentCoverage", e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe your current Medicare coverage"
              />
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Health Information</h2>
              <p className="text-muted-foreground">Help us find plans that work best for your health needs.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">Health Conditions (select all that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {healthConditionOptions.map((condition) => (
                  <label key={condition} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.healthConditions.includes(condition)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...formData.healthConditions, condition]
                          : formData.healthConditions.filter(c => c !== condition)
                        handleInputChange("healthConditions", updated)
                      }}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-foreground">{condition}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Preferred Doctors/Hospitals</label>
              <textarea
                value={formData.preferredDoctors}
                onChange={(e) => handleInputChange("preferredDoctors", e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                placeholder="List any doctors or hospitals you want to keep seeing"
              />
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Your Medicare Quotes</h2>
              <p className="text-muted-foreground">Here are personalized Medicare plans based on your information.</p>
            </div>
            
            {quotes.length > 0 ? (
              <>
                <div className="grid gap-6">
                  {quotes.slice(0, 5).map((quote, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground">{quote.planName || `Plan ${index + 1}`}</h3>
                        <p className="text-muted-foreground">{quote.carrier || "Insurance Carrier"}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">${quote.premium || "0"}</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Deductible</div>
                        <div className="font-semibold">${quote.deductible || "0"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Max Out-of-Pocket</div>
                        <div className="font-semibold">${quote.maxOutOfPocket || "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Star Rating</div>
                        <div className="font-semibold">{quote.starRating || "N/A"}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Network</div>
                        <div className="font-semibold">{quote.network || "Standard"}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <AnimatedButton className="flex-1 bg-primary text-primary-foreground">
                        Get More Details
                      </AnimatedButton>
                      <AnimatedButton variant="outline" className="flex-1">
                        Compare Plans
                      </AnimatedButton>
                    </div>
                  </div>
                ))}
                </div>
                
                {/* HawkNest Account Creation Guidance */}
                <div className="bg-card border border-border rounded-lg p-6 mt-8">
                  <div className="text-center">
                    <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">Ready to Move Forward?</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your secure HawkNest account to save these quotes, access detailed plan information, 
                      and connect with our Medicare specialists for personalized guidance.
                    </p>
                    <AnimatedButton className="bg-primary text-primary-foreground px-8 py-3">
                      Create HawkNest Account
                    </AnimatedButton>
                    <p className="text-sm text-muted-foreground mt-3">
                      Already have an account? <span className="text-primary cursor-pointer hover:underline">Sign in here</span>
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <Stethoscope className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Quotes Available</h3>
                <p className="text-muted-foreground">We're having trouble finding quotes in your area. Our team will contact you with personalized options.</p>
              </div>
            )}
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <section className="py-32 bg-transparent min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Medicare Quote Tool
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized Medicare quotes in minutes. Compare plans and find the coverage that's right for you.
          </p>
        </motion.div>

        {/* Progress Bar */}
        {currentStep < 4 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Step {currentStep} of 4</span>
              <span className="text-sm text-muted-foreground">{Math.round((currentStep / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
        )}

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          {renderStep()}
          
          {errors.general && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-200 rounded-lg">
              <p className="text-red-600">{errors.general}</p>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 && currentStep < 4 && (
              <AnimatedButton
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Previous
              </AnimatedButton>
            )}
            
            {currentStep < 4 && (
              <AnimatedButton
                onClick={handleNext}
                className="ml-auto"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            )}
            
            {currentStep === 4 && (
              <AnimatedButton
                onClick={handleSubmit}
                disabled={isLoading}
                className="ml-auto bg-primary text-primary-foreground"
              >
                {isLoading ? "Getting Quotes..." : "Get My Quotes"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            )}
            
            {currentStep === 4 && (
              <div className="flex gap-4 ml-auto">
                <AnimatedButton
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                >
                  Start Over
                </AnimatedButton>
                <AnimatedButton className="bg-primary text-primary-foreground">
                  Contact an Agent
                </AnimatedButton>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


