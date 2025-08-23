"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { Smile, Shield, Users, CheckCircle, ArrowRight, Calendar, MapPin, Phone, Mail, Sparkles } from "lucide-react"
import AnimatedButton from "./animated-button"
import { getDentalQuotes, type DentalQuoteParams, type DentalQuote } from "@/lib/actions/dental-quotes"

interface QuoteFormData {
  zipCode: string
  dateOfBirth: string
  gender: "M" | "F"
  tobacco: "0" | "1"
  covered_members: "I" | "S" | "C" | "F"
  preferredDentist: string
  currentDentalCoverage: string
  monthlyBudget: string
  specificNeeds: string[]
  frequency: string
}

export default function DentalQuoter() {
  const [formData, setFormData] = useState<QuoteFormData>({
    zipCode: "",
    dateOfBirth: "",
    gender: "M",
    tobacco: "0",
    covered_members: "I",
    preferredDentist: "",
    currentDentalCoverage: "",
    monthlyBudget: "",
    specificNeeds: [],
    frequency: ""
  })
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [quotes, setQuotes] = useState<DentalQuote[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const dentalNeedsOptions = [
    "Regular Cleanings", "Fillings", "Root Canals", "Crowns/Bridges", 
    "Orthodontics", "Oral Surgery", "Cosmetic Dentistry", "Emergency Care"
  ]

  const handleInputChange = (field: keyof QuoteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const calculateAge = (dateOfBirth: string): number => {
    const birthDate = new Date(dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    
    return age
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (step) {
      case 1:
        if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
        if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = "Date of birth is required"
        break
      case 2:
        if (!formData.covered_members) newErrors.covered_members = "Coverage type is required"
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return
    
    setIsLoading(true)
    
    try {
      const age = calculateAge(formData.dateOfBirth)
      
      const quoteParams: DentalQuoteParams = {
        zipCode: formData.zipCode,
        age: age,
        gender: formData.gender,
        tobacco: formData.tobacco,
        covered_members: formData.covered_members
      }
      
      const result = await getDentalQuotes(quoteParams)
      
      if (result.error) {
        setErrors({ submit: result.error })
      } else if (result.quotes) {
        setQuotes(result.quotes)
        setCurrentStep(4) // Results step
      }
    } catch (error) {
      console.error('Error getting dental quotes:', error)
      setErrors({ submit: 'Unable to get quotes at this time. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Basic Information</h2>
              <p className="text-muted-foreground">Let's start with your location and basic details to find available dental plans.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">ZIP Code *</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your ZIP code"
                  maxLength={5}
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
                  onChange={(e) => handleInputChange("gender", e.target.value as "M" | "F")}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Tobacco Use</label>
                <select
                  value={formData.tobacco}
                  onChange={(e) => handleInputChange("tobacco", e.target.value as "0" | "1")}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Coverage Type</h2>
              <p className="text-muted-foreground">Who do you need dental coverage for?</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {[
                { value: "I", title: "Individual", desc: "Coverage for yourself only", icon: <Users className="w-6 h-6" /> },
                { value: "S", title: "Spouse/Partner", desc: "Coverage for you and your spouse/partner", icon: <Users className="w-6 h-6" /> },
                { value: "C", title: "Children", desc: "Coverage for you and your children", icon: <Users className="w-6 h-6" /> },
                { value: "F", title: "Family", desc: "Coverage for your entire family", icon: <Users className="w-6 h-6" /> }
              ].map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleInputChange("covered_members", option.value as "I" | "S" | "C" | "F")}
                  className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                    formData.covered_members === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      formData.covered_members === option.value ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}>
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{option.title}</h3>
                      <p className="text-muted-foreground">{option.desc}</p>
                    </div>
                    {formData.covered_members === option.value && (
                      <CheckCircle className="w-6 h-6 text-primary" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {errors.covered_members && <p className="text-red-500 text-sm mt-1">{errors.covered_members}</p>}
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Dental Preferences</h2>
              <p className="text-muted-foreground">Tell us about your dental care needs and preferences.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Monthly Budget</label>
                <select
                  value={formData.monthlyBudget}
                  onChange={(e) => handleInputChange("monthlyBudget", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select budget range</option>
                  <option value="0-25">$0 - $25</option>
                  <option value="25-50">$25 - $50</option>
                  <option value="50-75">$50 - $75</option>
                  <option value="75-100">$75 - $100</option>
                  <option value="100+">$100+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Dental Visit Frequency</label>
                <select
                  value={formData.frequency}
                  onChange={(e) => handleInputChange("frequency", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select frequency</option>
                  <option value="twice-yearly">Twice yearly (recommended)</option>
                  <option value="annually">Once per year</option>
                  <option value="as-needed">Only when needed</option>
                  <option value="frequently">More than twice yearly</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">Dental Services Needed (select all that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {dentalNeedsOptions.map((need) => (
                  <label key={need} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.specificNeeds.includes(need)}
                      onChange={(e) => {
                        const updated = e.target.checked
                          ? [...formData.specificNeeds, need]
                          : formData.specificNeeds.filter(n => n !== need)
                        handleInputChange("specificNeeds", updated)
                      }}
                      className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <span className="text-foreground">{need}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Preferred Dentist/Practice</label>
              <input
                type="text"
                value={formData.preferredDentist}
                onChange={(e) => handleInputChange("preferredDentist", e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Name of your current dentist (optional)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Current Dental Coverage</label>
              <textarea
                value={formData.currentDentalCoverage}
                onChange={(e) => handleInputChange("currentDentalCoverage", e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                placeholder="Describe your current dental coverage situation"
              />
            </div>
          </div>
        )
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Your Dental Insurance Quotes</h2>
              <p className="text-muted-foreground">Here are personalized dental insurance plans based on your information.</p>
            </div>
            
            {quotes.length > 0 ? (
              <>
                <div className="grid gap-6">
                  {quotes.slice(0, 5).map((quote, index) => (
                    <div key={quote.id} className="bg-card border border-border rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start space-x-4">
                          {quote.carrier.logo_url && (
                            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                              <Image 
                                src={quote.carrier.logo_url} 
                                alt={quote.carrier.name}
                                width={64}
                                height={64}
                                className="max-w-full max-h-full object-contain"
                                quality={85}
                              />
                            </div>
                          )}
                          <div>
                            <h3 className="text-xl font-semibold text-foreground">{quote.plan_name}</h3>
                            <p className="text-muted-foreground">{quote.carrier.full_name || quote.carrier.name}</p>
                            <div className="flex items-center mt-1">
                              <Shield className="w-4 h-4 text-muted-foreground mr-1" />
                              <span className="text-sm text-muted-foreground">AM Best: {quote.am_best_rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">${quote.monthly_premium}</div>
                          <div className="text-sm text-muted-foreground">per month</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Coverage Level</div>
                          <div className="font-semibold">{quote.benefit_amount} {quote.benefit_quantifier}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Plan Type</div>
                          <div className="font-semibold">
                            {formData.covered_members === "I" ? "Individual" : 
                             formData.covered_members === "S" ? "Spouse/Partner" :
                             formData.covered_members === "C" ? "Children" : "Family"}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Network</div>
                          <div className="font-semibold">Nationwide PPO</div>
                        </div>
                      </div>
                      
                      {quote.benefit_notes && (
                        <div className="bg-muted/50 rounded-lg p-3 mb-4">
                          <div className="text-sm text-foreground">
                            <strong>Benefits:</strong> {quote.benefit_notes}
                          </div>
                        </div>
                      )}
                      
                      {quote.limitation_notes && (
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
                          <div className="text-sm text-foreground">
                            <strong>Important:</strong> {quote.limitation_notes}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-3">
                        <AnimatedButton className="flex-1 bg-primary text-primary-foreground">
                          Get Plan Details
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
                    <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">Ready to Secure Your Dental Health?</h3>
                    <p className="text-muted-foreground mb-4">
                      Create your secure HawkNest account to save these dental quotes, access detailed plan information, 
                      find in-network dentists, and connect with our dental insurance specialists.
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
                <Smile className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Quotes Available</h3>
                <p className="text-muted-foreground">We're having trouble finding dental quotes in your area. Our team will contact you with personalized options.</p>
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
          <Smile className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Dental Insurance Quotes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protect your smile with comprehensive dental insurance. Get personalized quotes from top-rated dental insurance carriers.
          </p>
        </motion.div>

        {/* Progress Bar */}
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

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-3xl p-8 mb-8 border border-border"
        >
          {renderStep()}
        </motion.div>

        {/* Navigation */}
        {currentStep < 4 && (
          <div className="flex justify-between items-center">
            <div className="w-24">
              {currentStep > 1 && currentStep < 4 && (
                <AnimatedButton
                  variant="outline"
                  onClick={handleBack}
                  className="flex items-center space-x-2"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  <span>Back</span>
                </AnimatedButton>
              )}
            </div>

            <div className="flex items-center space-x-4">
              {errors.submit && (
                <p className="text-red-500 text-sm">{errors.submit}</p>
              )}
              
              {currentStep === 3 ? (
                <AnimatedButton
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-primary text-primary-foreground px-8 py-3"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Getting Quotes...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Get My Dental Quotes</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </AnimatedButton>
              ) : (
                <AnimatedButton
                  onClick={handleNext}
                  className="bg-primary text-primary-foreground px-8 py-3"
                >
                  <div className="flex items-center space-x-2">
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </AnimatedButton>
              )}
            </div>

            <div className="w-24" />
          </div>
        )}

        {currentStep === 4 && (
          <div className="text-center">
            <AnimatedButton
              onClick={() => {
                setCurrentStep(1)
                setFormData({
                  zipCode: "",
                  dateOfBirth: "",
                  gender: "M",
                  tobacco: "0",
                  covered_members: "I",
                  preferredDentist: "",
                  currentDentalCoverage: "",
                  monthlyBudget: "",
                  specificNeeds: [],
                  frequency: ""
                })
                setQuotes([])
                setErrors({})
              }}
              variant="outline"
              className="mr-4"
            >
              Start New Quote
            </AnimatedButton>
          </div>
        )}
      </div>
    </section>
  )
}

