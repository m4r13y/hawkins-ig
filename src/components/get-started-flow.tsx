"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Check, User, Users, Building, UserCheck, Heart, Shield, Phone, DollarSign, Calendar, MapPin } from "lucide-react"
import AnimatedButton from "./animated-button"

const clientTypes = [
  {
    id: "individual",
    name: "Individual",
    icon: <User className="w-8 h-8" />,
    description: "Personal insurance coverage for myself",
  },
  {
    id: "family",
    name: "Family",
    icon: <Users className="w-8 h-8" />,
    description: "Coverage for my family members",
  },
  {
    id: "business",
    name: "Business",
    icon: <Building className="w-8 h-8" />,
    description: "Group coverage for my employees",
  },
  {
    id: "agent",
    name: "Insurance Agent",
    icon: <UserCheck className="w-8 h-8" />,
    description: "I'm an agent looking to partner",
  },
]

const ageRanges = [
  { id: "under-26", name: "Under 26", description: "Young adult rates" },
  { id: "26-35", name: "26-35", description: "Lower premium tier" },
  { id: "36-50", name: "36-50", description: "Standard rates" },
  { id: "51-64", name: "51-64", description: "Pre-Medicare age" },
  { id: "65-plus", name: "65+", description: "Medicare eligible" },
]

  const familySizes = [
    { id: "1", name: "Just Me", description: "Individual coverage" },
    { id: "2", name: "Me + Spouse", description: "Two adults" },
    { id: "3-4", name: "Small Family", description: "3-4 family members" },
    { id: "5+", name: "Large Family", description: "5+ family members" },
  ]

  const employeeCounts = [
    { id: "1-9", name: "1-9 Employees", description: "Small business" },
    { id: "10-49", name: "10-49 Employees", description: "Medium business" },
    { id: "50-99", name: "50-99 Employees", description: "Large business" },
    { id: "100+", name: "100+ Employees", description: "Enterprise" },
  ]

const insuranceTypes = [
  { id: "health", name: "Health Insurance", description: "Medical, dental, vision coverage", icon: <Heart className="w-6 h-6" /> },
  { id: "medicare", name: "Medicare Plans", description: "Supplement, Advantage, Part D", icon: <Shield className="w-6 h-6" /> },
  { id: "life", name: "Life Insurance", description: "Term, whole, universal life", icon: <User className="w-6 h-6" /> },
  { id: "disability", name: "Disability Insurance", description: "Short-term and long-term", icon: <Shield className="w-6 h-6" /> },
  { id: "supplemental", name: "Supplemental Plans", description: "Cancer, accident, hospital indemnity", icon: <Phone className="w-6 h-6" /> },
  { id: "group", name: "Group Benefits", description: "Employee health and benefits", icon: <Building className="w-6 h-6" /> },
]

  const urgencyLevels = [
    { id: "immediate", name: "Immediate", description: "Need coverage within 30 days" },
    { id: "soon", name: "Soon", description: "Within 60-90 days" },
    { id: "planning", name: "Planning", description: "Researching for future needs" },
    { id: "renewal", name: "Renewal", description: "Current policy expires soon" },
  ]

  const agentTypes = [
    { id: "new-agent", name: "New Agent", description: "Just starting in insurance" },
    { id: "experienced", name: "Experienced Agent", description: "Looking for new opportunities" },
    { id: "broker", name: "Broker", description: "Independent broker seeking carriers" },
    { id: "agency", name: "Agency", description: "Agency looking for partnerships" },
  ]

export default function GetStartedFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    clientType: "",
    age: "",
    familySize: "",
    employeeCount: "",
    agentType: "",
    insuranceTypes: [] as string[],
    urgency: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    zipCode: "",
  })

  // Dynamic steps based on client type
  const getSteps = () => {
    const baseSteps = ["Client Type"]
    
    switch (formData.clientType) {
      case "individual":
        return [...baseSteps, "Age Range", "Insurance Needs", "Timeline", "Contact Information", "Complete"]
      case "family":
        return [...baseSteps, "Family Size", "Insurance Needs", "Timeline", "Contact Information", "Complete"]
      case "business":
        return [...baseSteps, "Company Size", "Group Benefits", "Timeline", "Contact Information", "Complete"]
      case "agent":
        return [...baseSteps, "Partnership Interest", "Experience Level", "Territory", "Contact Information", "Complete"]
      default:
        return [...baseSteps, "Details", "Needs", "Timeline", "Contact Information", "Complete"]
    }
  }

  const steps = getSteps()

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const toggleInsuranceType = (typeId: string) => {
    setFormData((prev) => ({
      ...prev,
      insuranceTypes: prev.insuranceTypes.includes(typeId)
        ? prev.insuranceTypes.filter((id) => id !== typeId)
        : [...prev.insuranceTypes, typeId],
    }))
  }

  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <section className="min-h-screen flex items-center justify-center py-32">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-white">Get Started</h1>
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-gray-900/50 border border-gray-800/50 rounded-3xl p-8 backdrop-blur-sm min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            {/* Step 0: Client Type */}
            {currentStep === 0 && (
              <motion.div
                key="client-type"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-3xl font-bold text-white mb-4">Who are you looking for coverage for?</h2>
                <p className="text-gray-400 mb-8">This helps us customize our insurance recommendations for your specific needs.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {clientTypes.map((client) => (
                    <motion.button
                      key={client.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData((prev) => ({ ...prev, clientType: client.id }))}
                      className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                        formData.clientType === client.id
                          ? "bg-blue-500/20 border-blue-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <div
                          className={`p-3 rounded-lg ${
                            formData.clientType === client.id ? "bg-blue-500/30" : "bg-gray-700/50"
                          }`}
                        >
                          {client.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-lg">{client.name}</div>
                          <div className="text-sm opacity-70">{client.description}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Age/Demographic */}
            {currentStep === 1 && (
              <motion.div
                key="age-demographic"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-3xl font-bold text-white mb-4">
                  {formData.clientType === 'individual' && "What's your age range?"}
                  {formData.clientType === 'family' && "How many family members need coverage?"}
                  {formData.clientType === 'business' && "How many employees need coverage?"}
                  {formData.clientType === 'agent' && "What type of agent relationship are you seeking?"}
                </h2>
                <p className="text-gray-400 mb-8">
                  {formData.clientType === 'individual' && "Age helps us determine the best insurance options and pricing for you."}
                  {formData.clientType === 'family' && "Family size helps us recommend the most cost-effective coverage options."}
                  {formData.clientType === 'business' && "Employee count helps us structure the right group coverage plan."}
                  {formData.clientType === 'agent' && "Let us know how we can support your insurance business needs."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {(formData.clientType === 'individual' ? ageRanges :
                    formData.clientType === 'family' ? familySizes :
                    formData.clientType === 'business' ? employeeCounts :
                    agentTypes).map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData((prev) => ({ 
                        ...prev, 
                        age: formData.clientType === 'individual' ? option.id : prev.age,
                        familySize: formData.clientType === 'family' ? option.id : prev.familySize,
                        employeeCount: formData.clientType === 'business' ? option.id : prev.employeeCount,
                        agentType: formData.clientType === 'agent' ? option.id : prev.agentType
                      }))}
                      className={`p-6 rounded-xl border transition-all duration-200 text-center ${
                        (formData.clientType === 'individual' && formData.age === option.id) ||
                        (formData.clientType === 'family' && formData.familySize === option.id) ||
                        (formData.clientType === 'business' && formData.employeeCount === option.id) ||
                        (formData.clientType === 'agent' && formData.agentType === option.id)
                          ? "bg-blue-500/20 border-blue-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="text-xl font-bold mb-2">{option.name}</div>
                      <div className="text-sm opacity-70">{option.description}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Insurance Types */}
            {currentStep === 2 && (
              <motion.div
                key="insurance-types"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-3xl font-bold text-white mb-4">What type of insurance are you interested in?</h2>
                <p className="text-gray-400 mb-8">
                  Select all that apply. We'll create a custom quote around your insurance needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {insuranceTypes.map((insurance) => (
                    <motion.button
                      key={insurance.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleInsuranceType(insurance.id)}
                      className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                        formData.insuranceTypes.includes(insurance.id)
                          ? "bg-blue-500/20 border-blue-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-lg">{insurance.name}</div>
                        {formData.insuranceTypes.includes(insurance.id) && <Check className="w-5 h-5 text-blue-400" />}
                      </div>
                      <div className="text-sm opacity-70">{insurance.description}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Timeline/Urgency */}
            {currentStep === 3 && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-3xl font-bold text-white mb-4">When do you need coverage to start?</h2>
                <p className="text-gray-400 mb-8">This helps us prioritize your application and ensure timely coverage.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {urgencyLevels.map((urgency) => (
                    <motion.button
                      key={urgency.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData((prev) => ({ ...prev, urgency: urgency.id }))}
                      className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                        formData.urgency === urgency.id
                          ? "bg-blue-500/20 border-blue-500/50 text-white"
                          : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-lg ${
                            formData.urgency === urgency.id ? "bg-blue-500/30" : "bg-gray-700/50"
                          }`}
                        >
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-lg">{urgency.name}</div>
                          <div className="text-sm opacity-70">{urgency.description}</div>
                        </div>
                        {formData.urgency === urgency.id && <Check className="w-5 h-5 text-blue-400" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Information */}
            {currentStep === 4 && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-3xl font-bold text-white mb-4">Let's get you a quote</h2>
                <p className="text-gray-400 mb-8">
                  We'll use this information to prepare your personalized insurance quote and get back to you within 24 hours.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="info@hawkinsig.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="(817) 800-4253"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => setFormData((prev) => ({ ...prev, zipCode: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                      placeholder="76001"
                      required
                    />
                  </div>
                  {(formData.clientType === 'business' || formData.clientType === 'agent') && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {formData.clientType === 'business' ? 'Company Name' : 'Agency Name'}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                        placeholder={formData.clientType === 'business' ? 'Your business name' : 'Your agency name'}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 5: Complete */}
            {currentStep === 5 && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-1 text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Your quote request is complete!</h2>
                <p className="text-xl text-gray-300 mb-6">
                  Thank you for choosing Hawkins Insurance Group. We'll prepare your personalized insurance quote and get
                  back to you within 24 hours.
                </p>
                <div className="bg-gray-800/50 rounded-2xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <span className="text-gray-300">We'll review your information and prepare personalized quotes</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <span className="text-gray-300">
                        Our licensed agents will reach out within 24 hours with your options
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <span className="text-gray-300">
                        We'll help you compare plans and complete your enrollment process
                      </span>
                    </div>
                  </div>
                </div>
                <AnimatedButton
                  onClick={() => (window.location.href = "/")}
                  className="bg-white text-black hover:bg-gray-100"
                >
                  Return to Home
                </AnimatedButton>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 5 && (
            <div className="flex justify-between items-center mt-8">
              <div>
                {currentStep > 0 && (
                  <AnimatedButton
                    onClick={prevStep}
                    variant="outline"
                    className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </AnimatedButton>
                )}
              </div>

              <div>
                {currentStep < 4 && (
                  <AnimatedButton
                    onClick={nextStep}
                    disabled={
                      (currentStep === 0 && !formData.clientType) ||
                      (currentStep === 1 && 
                        (formData.clientType === 'individual' && !formData.age) ||
                        (formData.clientType === 'family' && !formData.familySize) ||
                        (formData.clientType === 'business' && !formData.employeeCount) ||
                        (formData.clientType === 'agent' && !formData.agentType)
                      ) ||
                      (currentStep === 2 && formData.insuranceTypes.length === 0) ||
                      (currentStep === 3 && !formData.urgency)
                    }
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                )}

                {currentStep === 4 && (
                  <AnimatedButton
                    onClick={nextStep}
                    disabled={!formData.name || !formData.email || !formData.phone || !formData.zipCode}
                    className="bg-white text-black hover:bg-gray-100"
                  >
                    Get My Quote
                    <Check className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
