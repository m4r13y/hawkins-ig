"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { 
  Stethoscope, 
  Users, 
  Building, 
  Smile, 
  HeartHandshake, 
  Plus, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  DollarSign,
  Shield,
  Award,
  Briefcase,
  UserPlus,
  Calculator,
  ChevronDown,
  X
} from "lucide-react"
import AnimatedButton from "./animated-button"
import Link from "next/link"

const clientServices = [
  {
    id: 'medicare',
    title: "Medicare Plans",
    shortDesc: "Comprehensive Medicare Advantage and Supplement plans",
    category: 'health',
    pricing: "Free Consultation",
    icon: <Stethoscope className="w-8 h-8" />,
    gradient: "from-blue-600/20 via-blue-500/10 to-cyan-400/20",
    features: ["Medicare Advantage", "Medicare Supplement", "Part D Prescription", "Medicare Savings Programs"],
    details: "Navigate Medicare with confidence. Our experts help you understand and choose the right Medicare plan for your health needs and budget.",
    benefits: [
      "Personalized plan recommendations",
      "Annual enrollment assistance", 
      "Claims support and advocacy",
      "Provider network guidance"
    ],
    process: [
      "Free consultation to assess your needs",
      "Compare plans from top carriers",
      "Enrollment assistance and support",
      "Ongoing account management"
    ]
  },
  {
    id: 'family-health',
    title: "Family Health Insurance",
    shortDesc: "Individual and family health insurance plans",
    category: 'health',
    pricing: "Plans from $200/month",
    icon: <Users className="w-8 h-8" />,
    gradient: "from-green-600/20 via-green-500/10 to-emerald-400/20",
    features: ["Individual Plans", "Family Coverage", "HSA Compatible", "Telehealth Services"],
    details: "Protect your family's health with comprehensive coverage options designed for individuals and families.",
    benefits: [
      "Nationwide provider networks",
      "Preventive care covered 100%",
      "Prescription drug coverage",
      "Mental health and wellness"
    ],
    process: [
      "Health needs assessment",
      "Plan comparison and selection",
      "Application submission",
      "Ongoing support and service"
    ]
  },
  {
    id: 'group-health',
    title: "Group Health Plans",
    shortDesc: "Employee health benefits for businesses",
    category: 'business',
    pricing: "Custom Quotes",
    icon: <Building className="w-8 h-8" />,
    gradient: "from-purple-600/20 via-purple-500/10 to-violet-400/20",
    features: ["Employee Benefits", "Flexible Plans", "Wellness Programs", "Compliance Support"],
    details: "Attract and retain top talent with competitive group health insurance benefits tailored to your business needs.",
    benefits: [
      "Multiple plan options",
      "Employer contribution flexibility",
      "Employee wellness programs",
      "HR and compliance support"
    ],
    process: [
      "Business needs analysis",
      "Custom plan design",
      "Employee enrollment",
      "Ongoing administration"
    ]
  },
  {
    id: 'dental-vision',
    title: "Dental & Vision",
    shortDesc: "Comprehensive dental and vision coverage",
    category: 'supplemental',
    pricing: "Plans from $15/month",
    icon: <Smile className="w-8 h-8" />,
    gradient: "from-orange-600/20 via-orange-500/10 to-amber-400/20",
    features: ["Preventive Care", "Major Services", "Vision Exams", "Frame Allowances"],
    details: "Complete your health coverage with dental and vision plans that keep you smiling and seeing clearly.",
    benefits: [
      "Preventive care covered 100%",
      "Large provider networks",
      "Orthodontic coverage available",
      "Contact lens and frame benefits"
    ],
    process: [
      "Coverage needs assessment",
      "Plan selection assistance",
      "Quick enrollment process",
      "Provider network guidance"
    ]
  },
  {
    id: 'life-insurance',
    title: "Life Insurance",
    shortDesc: "Term and permanent life insurance protection",
    category: 'protection',
    pricing: "Plans from $20/month",
    icon: <HeartHandshake className="w-8 h-8" />,
    gradient: "from-red-600/20 via-red-500/10 to-pink-400/20",
    features: ["Term Life", "Whole Life", "Universal Life", "Final Expense"],
    details: "Secure your family's financial future with life insurance protection that fits your budget and needs.",
    benefits: [
      "Affordable term options",
      "Cash value accumulation",
      "Living benefits available",
      "No medical exam options"
    ],
    process: [
      "Needs analysis and quote",
      "Application and underwriting",
      "Policy delivery and setup",
      "Annual policy reviews"
    ]
  },
  {
    id: 'supplemental',
    title: "Supplemental Plans",
    shortDesc: "Cancer, accident, and critical illness coverage",
    category: 'supplemental',
    pricing: "Plans from $25/month",
    icon: <Plus className="w-8 h-8" />,
    gradient: "from-teal-600/20 via-teal-500/10 to-cyan-400/20",
    features: ["Cancer Insurance", "Accident Coverage", "Critical Illness", "Hospital Indemnity"],
    details: "Bridge the gap in your health coverage with supplemental insurance that pays cash benefits directly to you.",
    benefits: [
      "Cash payments for covered events",
      "Use benefits however you choose",
      "Guaranteed renewable coverage",
      "Affordable premium options"
    ],
    process: [
      "Coverage gap analysis",
      "Plan selection and quotes",
      "Simple application process",
      "Direct claim payments"
    ]
  }
]

const agentServices = [
  {
    id: 'lead-generation',
    title: "Lead Generation System",
    shortDesc: "Exclusive, high-quality leads delivered daily",
    category: 'sales',
    pricing: "Performance Based",
    icon: <TrendingUp className="w-8 h-8" />,
    gradient: "from-blue-600/20 via-indigo-500/10 to-purple-400/20",
    features: ["Exclusive Leads", "Real-Time Delivery", "CRM Integration", "Lead Scoring"],
    details: "Stop chasing leads and start closing deals. Our proprietary lead generation system delivers exclusive, qualified prospects ready to buy.",
    benefits: [
      "Exclusive territory rights",
      "Pre-qualified prospects",
      "Real-time lead delivery",
      "Advanced lead scoring"
    ],
    process: [
      "Territory selection and setup",
      "Lead system integration",
      "Training on lead conversion",
      "Ongoing optimization support"
    ]
  },
  {
    id: 'commission',
    title: "High Commission Structure",
    shortDesc: "Industry-leading commission rates and bonuses",
    category: 'compensation',
    pricing: "Up to 150% FYC",
    icon: <DollarSign className="w-8 h-8" />,
    gradient: "from-green-600/20 via-emerald-500/10 to-teal-400/20",
    features: ["High First Year", "Renewal Commissions", "Performance Bonuses", "Fast Pay Options"],
    details: "Earn what you're worth with our industry-leading commission structure designed to reward high-performing agents.",
    benefits: [
      "Highest commission rates",
      "Fast payment processing",
      "Performance bonus opportunities",
      "Vesting schedule benefits"
    ],
    process: [
      "Commission structure review",
      "Contract terms discussion",
      "Payment setup and preferences",
      "Performance tracking dashboard"
    ]
  },
  {
    id: 'training',
    title: "Comprehensive Training",
    shortDesc: "Product training, sales coaching, and certification",
    category: 'support',
    pricing: "Included",
    icon: <Award className="w-8 h-8" />,
    gradient: "from-purple-600/20 via-violet-500/10 to-indigo-400/20",
    features: ["Product Certification", "Sales Training", "Ongoing Coaching", "Industry Updates"],
    details: "Master your craft with comprehensive training programs that keep you ahead of the competition and compliant with regulations.",
    benefits: [
      "Expert-led training sessions",
      "Certification programs",
      "One-on-one coaching",
      "Continuing education credits"
    ],
    process: [
      "Initial training assessment",
      "Customized learning path",
      "Hands-on practice sessions",
      "Ongoing skill development"
    ]
  },
  {
    id: 'technology',
    title: "Technology Platform",
    shortDesc: "CRM, quoting tools, and mobile applications",
    category: 'tools',
    pricing: "Included",
    icon: <Calculator className="w-8 h-8" />,
    gradient: "from-cyan-600/20 via-blue-500/10 to-indigo-400/20",
    features: ["Integrated CRM", "Quoting Engine", "Mobile Apps", "E-Signature"],
    details: "Streamline your workflow with our comprehensive technology platform designed specifically for insurance professionals.",
    benefits: [
      "All-in-one platform",
      "Mobile accessibility",
      "Automated workflows",
      "Real-time reporting"
    ],
    process: [
      "Platform setup and configuration",
      "Training on all features",
      "Data migration assistance",
      "Ongoing technical support"
    ]
  },
  {
    id: 'marketing',
    title: "Marketing Support",
    shortDesc: "Branded materials, digital assets, and campaigns",
    category: 'support',
    pricing: "Included",
    icon: <Briefcase className="w-8 h-8" />,
    gradient: "from-orange-600/20 via-amber-500/10 to-yellow-400/20",
    features: ["Branded Materials", "Digital Assets", "Social Media", "Email Campaigns"],
    details: "Professional marketing materials and campaigns that help you build your brand and attract more clients.",
    benefits: [
      "Professional branding",
      "Compliance-approved materials",
      "Multi-channel campaigns",
      "Performance tracking"
    ],
    process: [
      "Brand customization setup",
      "Material selection and ordering",
      "Campaign planning and launch",
      "Performance monitoring"
    ]
  },
  {
    id: 'recruitment',
    title: "Recruitment Opportunities",
    shortDesc: "Build your team with recruiting incentives",
    category: 'compensation',
    pricing: "Bonus Structure",
    icon: <UserPlus className="w-8 h-8" />,
    gradient: "from-red-600/20 via-pink-500/10 to-rose-400/20",
    features: ["Recruiting Bonuses", "Team Building", "Leadership Development", "Override Commissions"],
    details: "Grow your income by building a team. Our recruiting program offers substantial bonuses and ongoing override commissions.",
    benefits: [
      "Substantial recruiting bonuses",
      "Override commission structure",
      "Leadership development program",
      "Team management tools"
    ],
    process: [
      "Recruiting strategy development",
      "Prospect identification and outreach",
      "Interview and onboarding support",
      "Team performance management"
    ]
  }
]

const tabs = [
  { id: 'clients', label: 'For Clients', description: 'Find the right insurance coverage for your needs' },
  { id: 'agents', label: 'For Agents', description: 'Join our team and grow your insurance business' }
]

interface WaitlistFormData {
  name: string
  email: string
  feature: string
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('clients')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [showWaitlist, setShowWaitlist] = useState(false)
  const [waitlistForm, setWaitlistForm] = useState<WaitlistFormData>({
    name: '',
    email: '',
    feature: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentServices = activeTab === 'clients' ? clientServices : agentServices

  const getFeatureOptions = () => {
    return currentServices.map(service => service.title)
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Add the active tab context to the form data
      const submissionData = {
        ...waitlistForm,
        serviceType: activeTab,
        timestamp: new Date().toISOString()
      }
      
      console.log('Waitlist submission:', submissionData)
      
      // Reset form
      setWaitlistForm({ name: '', email: '', feature: '' })
      setShowWaitlist(false)
      
    } catch (error) {
      console.error('Error submitting waitlist entry:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Services
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Comprehensive insurance solutions for individuals, families, and businesses. 
            Plus exclusive opportunities for insurance professionals.
          </p>

          {/* Tabs */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setExpandedCard(null)
                }}
                className={`px-8 py-4 rounded-2xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border/50'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{tab.label}</div>
                  <div className="text-sm opacity-75">{tab.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {currentServices.map((service, index) => (
            <div
              key={service.id}
              className={`relative bg-card border border-border/50 rounded-2xl backdrop-blur-sm hover:border-border transition-all duration-200 group cursor-pointer overflow-hidden shadow-lg hover:shadow-xl ${
                expandedCard === service.id ? 'lg:col-span-2' : ''
              }`}
              onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
            >
              {/* Gradient Background Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 dark:opacity-40`} />
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 dark:from-black/10 dark:via-transparent dark:to-white/5" />
              
              {/* Card Content */}
              <div className="relative p-6">
                {/* Card Header - Always Visible */}
                <div className="flex items-start justify-between mb-4">
                  <div className="text-foreground group-hover:text-primary transition-colors">
                    {service.icon}
                  </div>
                  <div className={`transform transition-transform duration-200 ${expandedCard === service.id ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {service.shortDesc}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-foreground">
                    {service.pricing}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Click to {expandedCard === service.id ? 'collapse' : 'expand'}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {expandedCard === service.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-border/50"
                  >
                    <div className="relative p-6 space-y-6">
                      {/* Service Details */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">About This Service</h4>
                        <p className="text-muted-foreground">{service.details}</p>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              <span className="text-sm text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">Benefits</h4>
                        <div className="space-y-2">
                          {service.benefits.map((benefit, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Process */}
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-3">Our Process</h4>
                        <div className="space-y-3">
                          {service.process.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                {idx + 1}
                              </div>
                              <span className="text-sm text-muted-foreground">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Link href="/quotes" className="flex-1">
                          <AnimatedButton 
                            variant="default" 
                            className="w-full"
                          >
                            {activeTab === 'clients' ? 'Get Quote' : 'Get Started'}
                          </AnimatedButton>
                        </Link>
                        <AnimatedButton 
                          variant="outline" 
                          onClick={() => {
                            setWaitlistForm(prev => ({ ...prev, feature: service.title }))
                            setShowWaitlist(true)
                          }}
                          className="flex-1"
                        >
                          Learn More
                        </AnimatedButton>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {showWaitlist && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowWaitlist(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-card border border-border rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Get More Information</h3>
                <button
                  onClick={() => setShowWaitlist(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={waitlistForm.name}
                    onChange={(e) => setWaitlistForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={waitlistForm.email}
                    onChange={(e) => setWaitlistForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="feature" className="block text-sm font-medium text-foreground mb-2">
                    Most Interested Feature
                  </label>
                  <select
                    id="feature"
                    required
                    value={waitlistForm.feature}
                    onChange={(e) => setWaitlistForm(prev => ({ ...prev, feature: e.target.value }))}
                    className="w-full px-4 py-3 bg-muted border border-border rounded-xl text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">Select a feature</option>
                    {getFeatureOptions().map((feature, index) => (
                      <option key={index} value={feature}>{feature}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground px-8 py-3 rounded-xl font-medium transition-colors duration-200"
                >
                  {isSubmitting ? "Submitting..." : "Get Information"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
