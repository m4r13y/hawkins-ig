"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, Check, User, Users, Building, UserCheck, Heart, Shield, Phone, DollarSign, Calendar, MapPin } from "lucide-react"
import AnimatedButton from "./animated-button"
import Link from "next/link"
import { submitGetStartedForm } from "@/lib/firebase-utils"
import { trackGetStartedSubmission } from "./form-tracking"

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

  const agentInterests = [
    { id: "leads", name: "Getting Leads", description: "Access to qualified prospects" },
    { id: "agent-portal", name: "Agent Portal Only", description: "Tools and resources for agents" },
    { id: "agent-client-portal", name: "Agent & Client Portal", description: "Full platform access for both agents and clients" },
    { id: "referral-partnerships", name: "Referral Partnerships", description: "Partner with us for referral opportunities" },
  ]

export default function GetStartedFlow({ initialClientType }: { initialClientType?: string }) {
  const [currentStep, setCurrentStep] = useState(initialClientType ? 0 : 0)
  const [formData, setFormData] = useState({
    clientType: initialClientType || "",
    age: "",
    familySize: "",
    employeeCount: "",
    agentType: "",
    insuranceTypes: [] as string[],
    urgency: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    zipCode: "",
  })

  // Dynamic steps based on client type
  const getSteps = () => {
    const baseSteps = initialClientType ? [] : ["Client Type"]
    
    switch (formData.clientType || initialClientType) {
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

  // Filter insurance types based on client type and demographics
  const getAvailableInsuranceTypes = () => {
    const clientType = formData.clientType || initialClientType
    
    // For individuals, filter based on age
    if (clientType === 'individual') {
      // Medicare plans only for 51-64 (pre-Medicare) and 65+ age groups
      if (formData.age === 'under-26' || formData.age === '26-35' || formData.age === '36-50') {
        return insuranceTypes.filter(type => type.id !== 'medicare')
      }
    }
    
    // For families, show Medicare as they might have older members
    if (clientType === 'family') {
      return insuranceTypes
    }
    
    // For business, remove Medicare plans (group benefits don't include Medicare)
    if (clientType === 'business') {
      return insuranceTypes.filter(type => type.id !== 'medicare')
    }
    
    // For agents, show all types (they need to understand all products)
    return insuranceTypes
  }

  const availableInsuranceTypes = getAvailableInsuranceTypes()

  const nextStep = () => {
    // Check if this is the final step (contact form completion)
    const contactFormStepIndex = steps.findIndex(step => step === "Contact Information");
    
    // Immediately proceed to next step for instant UI response
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
    
    // AFTER showing success page, submit form data in background
    if (currentStep === contactFormStepIndex) {
      // Use setTimeout to ensure UI updates first, then submit
      setTimeout(() => {
        submitGetStartedForm({
          clientType: formData.clientType || initialClientType || '',
          age: formData.age,
          familySize: formData.familySize,
          employeeCount: formData.employeeCount,
          agentType: formData.agentType,
          insuranceTypes: formData.insuranceTypes,
          urgency: formData.urgency,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          zipCode: formData.zipCode,
          source: 'get-started-flow'
        }).then(async (submissionId) => {
          if (submissionId) {
            console.log('Form submitted successfully:', submissionId);
            
            // Track the get started form submission
            const clientType = formData.clientType || initialClientType || '';
            
            // Convert IDs to human-readable text for tracking
            const ageRangeText = ageRanges.find(range => range.id === formData.age)?.name || formData.age;
            const timelineText = urgencyLevels.find(level => level.id === formData.urgency)?.name || formData.urgency;
            
            await trackGetStartedSubmission({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              zipCode: formData.zipCode,
              clientType: clientType as 'individual' | 'family' | 'business' | 'agent',
              insuranceNeeds: formData.insuranceTypes || [],
              ageRange: ageRangeText, // Convert ID to readable text
              currentCoverage: undefined, // Not collected in this form
              timeline: timelineText // Convert ID to readable text
            }, `get_started_${clientType}`);
            
          } else {
            console.error('Failed to submit form - no submission ID returned');
          }
        }).catch(error => {
          console.error('Error submitting form:', error);
        });
      }, 0);
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

  // Phone number formatting function
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '')
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumber.length <= 3) {
      return phoneNumber
    } else if (phoneNumber.length <= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormData((prev) => ({ ...prev, phone: formatted }))
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-32">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-foreground">Get Started</h1>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 to-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-card border border-border rounded-3xl p-8 backdrop-blur-sm min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            {/* Step 0: Client Type (only for non-initialClientType flows) */}
            {currentStep === 0 && !initialClientType && (
              <motion.div
                key="client-type"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">Who are you looking for coverage for?</h2>
                <p className="text-muted-foreground mb-8">This helps us customize our insurance recommendations for your specific needs.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {clientTypes.map((client) => (
                    <motion.button
                      key={client.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData((prev) => ({ ...prev, clientType: client.id }))}
                      className={`p-6 rounded-xl border transition-all duration-200 text-left cursor-pointer ${
                        formData.clientType === client.id
                          ? "bg-primary/20 border-primary/50 text-foreground"
                          : "bg-background/50 border-border text-foreground/80 hover:border-border/80"
                      }`}
                    >
                      <div className="flex items-center space-x-4 mb-3">
                        <div
                          className={`p-3 rounded-lg ${
                            formData.clientType === client.id ? "bg-primary/30" : "bg-muted"
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

            {/* Demographics Step: Age/Family Size/Employee Count/Agent Type */}
            {((currentStep === 1 && !initialClientType) || (currentStep === 0 && initialClientType)) && (
              <motion.div
                key="age-demographic"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {(formData.clientType || initialClientType) === 'individual' && "What's your age range?"}
                  {(formData.clientType || initialClientType) === 'family' && "How many family members need coverage?"}
                  {(formData.clientType || initialClientType) === 'business' && "How many employees need coverage?"}
                  {(formData.clientType || initialClientType) === 'agent' && "What type of agent relationship are you seeking?"}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {(formData.clientType || initialClientType) === 'individual' && "Age helps us determine the best insurance options and pricing for you."}
                  {(formData.clientType || initialClientType) === 'family' && "Family size helps us recommend the most cost-effective coverage options."}
                  {(formData.clientType || initialClientType) === 'business' && "Employee count helps us structure the right group coverage plan."}
                  {(formData.clientType || initialClientType) === 'agent' && "Let us know how we can support your insurance business needs."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {((formData.clientType || initialClientType) === 'individual' ? ageRanges :
                    (formData.clientType || initialClientType) === 'family' ? familySizes :
                    (formData.clientType || initialClientType) === 'business' ? employeeCounts :
                    agentTypes).map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData((prev) => ({ 
                        ...prev, 
                        age: (formData.clientType || initialClientType) === 'individual' ? option.id : prev.age,
                        familySize: (formData.clientType || initialClientType) === 'family' ? option.id : prev.familySize,
                        employeeCount: (formData.clientType || initialClientType) === 'business' ? option.id : prev.employeeCount,
                        agentType: (formData.clientType || initialClientType) === 'agent' ? option.id : prev.agentType
                      }))}
                      className={`p-6 rounded-xl border transition-all duration-200 text-center ${
                        ((formData.clientType || initialClientType) === 'individual' && formData.age === option.id) ||
                        ((formData.clientType || initialClientType) === 'family' && formData.familySize === option.id) ||
                        ((formData.clientType || initialClientType) === 'business' && formData.employeeCount === option.id) ||
                        ((formData.clientType || initialClientType) === 'agent' && formData.agentType === option.id)
                          ? "bg-primary/20 border-primary/50 text-foreground"
                          : "bg-background/50 border-border text-foreground/80 hover:border-border/80"
                      }`}
                    >
                      <div className="text-xl font-bold mb-2">{option.name}</div>
                      <div className="text-sm opacity-70">{option.description}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Insurance Types Step */}
            {((currentStep === 2 && !initialClientType) || (currentStep === 1 && initialClientType)) && (
              <motion.div
                key="insurance-types"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {(formData.clientType || initialClientType) === 'agent' 
                    ? "What types of insurance are you licensed to sell?"
                    : "What type of insurance are you interested in?"
                  }
                </h2>
                <p className="text-muted-foreground mb-8">
                  {(formData.clientType || initialClientType) === 'agent'
                    ? "Select all license types you currently hold. This helps us match you with the right opportunities."
                    : "Select all that apply. We'll create a custom quote around your insurance needs."
                  }
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {availableInsuranceTypes.map((insurance) => (
                    <motion.button
                      key={insurance.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleInsuranceType(insurance.id)}
                      className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                        formData.insuranceTypes.includes(insurance.id)
                          ? "bg-primary/20 border-primary/50 text-foreground"
                          : "bg-background/50 border-border text-foreground/80 hover:border-border/80"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-lg">{insurance.name}</div>
                        {formData.insuranceTypes.includes(insurance.id) && <Check className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="text-sm opacity-70">{insurance.description}</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Timeline/Urgency Step */}
            {((currentStep === 3 && !initialClientType) || (currentStep === 2 && initialClientType)) && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {(formData.clientType || initialClientType) === 'agent'
                    ? "What are you interested in?"
                    : "When do you need coverage to start?"
                  }
                </h2>
                <p className="text-muted-foreground mb-8">
                  {(formData.clientType || initialClientType) === 'agent'
                    ? "Let us know how you'd like to partner with us and what tools you need."
                    : "This helps us prioritize your application and ensure timely coverage."
                  }
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {((formData.clientType || initialClientType) === 'agent' ? agentInterests : urgencyLevels).map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData((prev) => ({ ...prev, urgency: option.id }))}
                      className={`p-6 rounded-xl border transition-all duration-200 text-left ${
                        formData.urgency === option.id
                          ? "bg-primary/20 border-primary/50 text-foreground"
                          : "bg-background/50 border-border text-foreground/80 hover:border-border/80"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-lg ${
                            formData.urgency === option.id ? "bg-primary/30" : "bg-muted"
                          }`}
                        >
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-lg">{option.name}</div>
                          <div className="text-sm opacity-70">{option.description}</div>
                        </div>
                        {formData.urgency === option.id && <Check className="w-5 h-5 text-primary" />}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Contact Information Step */}
            {((currentStep === 4 && !initialClientType) || (currentStep === 3 && initialClientType)) && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1"
              >
                <h2 className="text-3xl font-bold text-foreground mb-4">Let's get you a quote</h2>
                <p className="text-muted-foreground mb-8">
                  We'll use this information to prepare your personalized insurance quote and get back to you within 24 hours.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-foreground/90 mb-2">First Name *</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="First name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/90 mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        placeholder="Last name"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/90 mb-2">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/90 mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="(123) 456-7890"
                      maxLength={14}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground/90 mb-2">ZIP Code *</label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={(e) => {
                        // Only allow digits and limit to 5 characters
                        const value = e.target.value.replace(/\D/g, '').slice(0, 5)
                        setFormData((prev) => ({ ...prev, zipCode: value }))
                      }}
                      className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                      placeholder="12345"
                      maxLength={5}
                      pattern="[0-9]{5}"
                      title="Please enter a 5-digit ZIP code"
                      required
                    />
                  </div>
                  {(formData.clientType === 'business' || formData.clientType === 'agent') && (
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-foreground/90 mb-2">
                        {formData.clientType === 'business' ? 'Company Name' : 'Agency Name'}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary"
                        placeholder={formData.clientType === 'business' ? 'Your business name' : 'Your agency name'}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Completion Step */}
            {((currentStep === 5 && !initialClientType) || (currentStep === 4 && initialClientType)) && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-1 text-center"
              >
                <div className="w-20 h-20 bg-white/100/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-10 h-10 text-green-500" />
                </div>
                
                {/* Dynamic content based on client type */}
                {(formData.clientType || initialClientType) === 'individual' && (
                  <>
                    <h2 className="text-3xl font-bold text-foreground mb-4">Your personal insurance quote request is complete!</h2>
                    <p className="text-xl text-foreground/90 mb-6">
                      Thank you for choosing Hawkins Insurance Group. We'll prepare personalized insurance options tailored to your age and needs.
                    </p>
                    <div className="bg-card rounded-2xl p-6 mb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-4">What happens next?</h3>
                      <div className="space-y-3 text-left">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                          <span className="text-foreground/90">We'll review your age range and insurance preferences</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                          <span className="text-foreground/90">Our licensed agents will call you within 24 hours with personalized quotes</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                          <span className="text-foreground/90">We'll help you compare options and enroll in the best plan for you</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {(formData.clientType || initialClientType) === 'family' && (
                  <>
                    <h2 className="text-3xl font-bold text-foreground mb-4">Your family insurance quote request is complete!</h2>
                    <p className="text-xl text-foreground/90 mb-6">
                      Thank you for choosing Hawkins Insurance Group. We'll prepare comprehensive family coverage options that protect everyone you love.
                    </p>
                    <div className="bg-card rounded-2xl p-6 mb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-4">What happens next?</h3>
                      <div className="space-y-3 text-left">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                          <span className="text-foreground/90">We'll review your family size and coverage needs</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                          <span className="text-foreground/90">Our family insurance specialists will contact you within 24 hours</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                          <span className="text-foreground/90">We'll help you find affordable family coverage that fits your budget</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {(formData.clientType || initialClientType) === 'business' && (
                  <>
                    <h2 className="text-3xl font-bold text-foreground mb-4">Your group benefits quote request is complete!</h2>
                    <p className="text-xl text-foreground/90 mb-6">
                      Thank you for choosing Hawkins Insurance Group. We'll prepare comprehensive employee benefit packages tailored to your business needs.
                    </p>
                    <div className="bg-card rounded-2xl p-6 mb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-4">What happens next?</h3>
                      <div className="space-y-3 text-left">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                          <span className="text-foreground/90">We'll analyze your employee count and benefit requirements</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                          <span className="text-foreground/90">Our group benefits specialists will schedule a consultation within 24 hours</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                          <span className="text-foreground/90">We'll present competitive group plans and assist with enrollment</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {(formData.clientType || initialClientType) === 'agent' && (
                  <>
                    <h2 className="text-3xl font-bold text-foreground mb-4">Your agent partnership request is complete!</h2>
                    <p className="text-xl text-foreground/90 mb-6">
                      Thank you for your interest in partnering with Hawkins Insurance Group. We're excited to explore how we can work together.
                    </p>
                    <div className="bg-card rounded-2xl p-6 mb-8">
                      <h3 className="text-lg font-semibold text-foreground mb-4">What happens next?</h3>
                      <div className="space-y-3 text-left">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">1</div>
                          <span className="text-foreground/90">We'll review your licensing and partnership interests</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">2</div>
                          <span className="text-foreground/90">Our agent development team will reach out within 24 hours</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">3</div>
                          <span className="text-foreground/90">We'll discuss partnership opportunities and provide access to resources</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <AnimatedButton
                  onClick={() => (window.location.href = "/")}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Return to Home
                </AnimatedButton>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < (initialClientType ? 4 : 5) && (
            <div className="flex justify-between items-center mt-8">
              <div>
                {currentStep > 0 && (
                  <AnimatedButton
                    onClick={prevStep}
                    variant="outline"
                    className="bg-transparent border-border text-muted-foreground hover:bg-transparent/80"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </AnimatedButton>
                )}
              </div>

              <div>
                {currentStep < (initialClientType ? 4 : 5) && (
                  <AnimatedButton
                    onClick={nextStep}
                    disabled={
                      // Step 0: Client Type (only for non-initial flows) or Details (for initial flows)
                      (currentStep === 0 && !initialClientType && !formData.clientType) ||
                      (currentStep === 0 && initialClientType && (
                        (initialClientType === 'individual' && !formData.age) ||
                        (initialClientType === 'family' && !formData.familySize) ||
                        (initialClientType === 'business' && !formData.employeeCount) ||
                        (initialClientType === 'agent' && !formData.agentType)
                      )) ||
                      // Step 1: Details (for non-initial) or Insurance Needs (for initial)
                      (currentStep === 1 && !initialClientType && (
                        (formData.clientType === 'individual' && !formData.age) ||
                        (formData.clientType === 'family' && !formData.familySize) ||
                        (formData.clientType === 'business' && !formData.employeeCount) ||
                        (formData.clientType === 'agent' && !formData.agentType)
                      )) ||
                      (currentStep === 1 && initialClientType && formData.insuranceTypes.length === 0) ||
                      // Step 2: Insurance Needs (for non-initial) or Timeline (for initial)
                      (currentStep === 2 && !initialClientType && formData.insuranceTypes.length === 0) ||
                      (currentStep === 2 && initialClientType && !formData.urgency) ||
                      // Step 3: Timeline (for non-initial) or Contact (for initial)
                      (currentStep === 3 && !initialClientType && !formData.urgency) ||
                      // Contact step validation
                      (currentStep === (initialClientType ? 3 : 4) && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.zipCode))
                    }
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {currentStep === (initialClientType ? 3 : 4) ? (
                      <>
                        Complete <Check className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Continue <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
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


