"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Users, Shield, Heart, Calendar, MapPin, Phone, Mail, CheckCircle, ArrowRight } from "lucide-react"
import AnimatedButton from "./animated-button"

interface QuoteFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  zipCode: string
  dateOfBirth: string
  familySize: number
  currentCoverage: string
  monthlyBudget: string
  healthConditions: string[]
  employmentStatus: string
}

interface FamilyHealthQuoterProps {
  serviceType: string
  title: string
  description: string
  icon: React.ReactNode
}

export default function FamilyHealthQuoter({
  serviceType = "family-health",
  title = "Family Health Insurance",
  description = "Get personalized family health insurance quotes tailored to your needs.",
  icon = <Users className="w-16 h-16 text-primary" />
}: FamilyHealthQuoterProps) {
  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    zipCode: "",
    dateOfBirth: "",
    familySize: 1,
    currentCoverage: "",
    monthlyBudget: "",
    healthConditions: [],
    employmentStatus: ""
  })
  
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const healthConditionOptions = [
    "Diabetes", "Heart Disease", "High Blood Pressure", "Asthma", 
    "Pregnancy", "Mental Health", "Chronic Conditions", "None of the above"
  ]

  const handleInputChange = (field: keyof QuoteFormData, value: string | number | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
        break
      case 2:
        if (!formData.zipCode.trim()) newErrors.zipCode = "ZIP code is required"
        if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = "Date of birth is required"
        break
      case 3:
        if (!formData.familySize || formData.familySize < 1) newErrors.familySize = "Family size is required"
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
      // Submit to Firebase
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          serviceType,
          submittedAt: new Date().toISOString()
        }),
      })
      
      if (response.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Failed to submit quote request')
      }
    } catch (error) {
      console.error("Error submitting quote:", error)
      setErrors({ general: "Unable to submit quote request. Please try again." })
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
              <h2 className="text-3xl font-bold text-foreground mb-4">Personal Information</h2>
              <p className="text-muted-foreground">Let's start with your basic information to personalize your quote.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your first name"
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your last name"
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email Address *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="(123) 456-7890"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>
        )
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Location & Demographics</h2>
              <p className="text-muted-foreground">Help us find plans available in your area.</p>
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
                <label className="block text-sm font-medium text-foreground mb-2">Family Size</label>
                <select
                  value={formData.familySize}
                  onChange={(e) => handleInputChange("familySize", parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value={1}>1 (Individual)</option>
                  <option value={2}>2 (Couple)</option>
                  <option value={3}>3 (Family of 3)</option>
                  <option value={4}>4 (Family of 4)</option>
                  <option value={5}>5 (Family of 5)</option>
                  <option value={6}>6+ (Large Family)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Employment Status</label>
                <select
                  value={formData.employmentStatus}
                  onChange={(e) => handleInputChange("employmentStatus", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select status</option>
                  <option value="employed">Employed</option>
                  <option value="self-employed">Self-Employed</option>
                  <option value="unemployed">Unemployed</option>
                  <option value="retired">Retired</option>
                  <option value="student">Student</option>
                </select>
              </div>
            </div>
          </div>
        )
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">Coverage Preferences</h2>
              <p className="text-muted-foreground">Tell us about your coverage needs and budget.</p>
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
                  <option value="0-200">$0 - $200</option>
                  <option value="200-400">$200 - $400</option>
                  <option value="400-600">$400 - $600</option>
                  <option value="600-800">$600 - $800</option>
                  <option value="800+">$800+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Current Coverage</label>
                <input
                  type="text"
                  value={formData.currentCoverage}
                  onChange={(e) => handleInputChange("currentCoverage", e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your current coverage"
                />
              </div>
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
          </div>
        )
        
      default:
        return null
    }
  }

  if (isSubmitted) {
    return (
      <section className="py-32 bg-transparent min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-6">
              Quote Request Submitted!
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Thank you for your interest in {title}. Our team will review your information and contact you within 24 hours with personalized quotes.
            </p>
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">What happens next?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>A licensed agent will review your information</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>We'll compare plans from multiple carriers</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>You'll receive personalized quotes via email and phone</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                  <span>We'll help you enroll in the plan that's right for you</span>
                </div>
              </div>
            </div>
            <AnimatedButton className="bg-primary text-primary-foreground">
              Return to Services
            </AnimatedButton>
          </motion.div>
        </div>
      </section>
    )
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
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 mt-6">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Step {currentStep} of 3</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border rounded-2xl p-8"
        >
          {renderStep()}
          
          {errors.general && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{errors.general}</p>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {currentStep > 1 && (
              <AnimatedButton
                variant="outline"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                Previous
              </AnimatedButton>
            )}
            
            {currentStep < 3 && (
              <AnimatedButton
                onClick={handleNext}
                className="ml-auto"
              >
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            )}
            
            {currentStep === 3 && (
              <AnimatedButton
                onClick={handleSubmit}
                disabled={isLoading}
                className="ml-auto bg-primary text-primary-foreground"
              >
                {isLoading ? "Submitting..." : "Get My Quote"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </AnimatedButton>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

