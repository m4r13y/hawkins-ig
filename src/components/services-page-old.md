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
  Filter,
  Search,
  X
} from "lucide-react"
import AnimatedButton from "./animated-button"
import Link from "next/link"
import { submitWaitlistEntry } from "@            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                layout
                className={`relative bg-card border border-border/50 rounded-2xl backdrop-blur-sm hover:border-border transition-all duration-300 group cursor-pointer overflow-hidden shadow-lg hover:shadow-xl ${
                  expandedCard === service.id ? 'lg:col-span-2' : ''
                }`}
                onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
              >
                {/* Gradient Background Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60 dark:opacity-40`} />
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/5 dark:from-black/10 dark:via-transparent dark:to-white/5" />
                
                {/* Card Content */}
                <div className="relative p-6">"

const clientServices = [
  {
    id: 'medicare',
    title: "Medicare Plans",
    shortDesc: "Complete Medicare coverage solutions",
    description: "Comprehensive Medicare coverage including supplements, advantage plans, and prescription drug coverage.",
    icon: <Stethoscope className="w-8 h-8" />,
    gradient: "from-blue-500/20 to-blue-600/10",
    category: "health",
    features: [
      "Medicare Supplement Plans",
      "Medicare Advantage Options", 
      "Part D Prescription Coverage",
      "Medigap Insurance"
    ],
    pricing: "Free Consultation",
    benefits: [
      "Guaranteed renewable coverage",
      "Access to top-rated carriers",
      "Personalized plan comparison",
      "Annual review included"
    ]
  },
  {
    id: 'family-health',
    title: "Family Health Plans",
    shortDesc: "Affordable family health coverage",
    description: "Guaranteed renewable health plans that give families more control over healthcare costs.",
    icon: <Users className="w-8 h-8" />,
    gradient: "from-green-500/20 to-green-600/10",
    category: "health",
    features: [
      "Individual Coverage",
      "Family Plan Options",
      "Short-term Insurance",
      "COBRA Alternatives"
    ],
    pricing: "Plans from $200/mo",
    benefits: [
      "Flexible coverage options",
      "National provider networks",
      "Telehealth benefits included",
      "No waiting periods"
    ]
  },
  {
    id: 'group-health',
    title: "Group Health Insurance", 
    shortDesc: "Employee benefit solutions",
    description: "Competitive group benefits for your employees with access to major national carriers.",
    icon: <Building className="w-8 h-8" />,
    gradient: "from-purple-500/20 to-purple-600/10",
    category: "business",
    features: [
      "Employee Health Plans",
      "Dental & Vision Coverage",
      "Life Insurance Options",
      "Disability Coverage"
    ],
    pricing: "Custom Quotes",
    benefits: [
      "Attract top talent",
      "Tax advantages for employers",
      "Simple administration",
      "Multiple carrier options"
    ]
  },
  {
    id: 'dental-vision',
    title: "Dental & Vision",
    shortDesc: "Complete oral and vision care",
    description: "Affordable dental and vision coverage to complement your health insurance.",
    icon: <Smile className="w-8 h-8" />,
    gradient: "from-yellow-500/20 to-yellow-600/10",
    category: "supplemental",
    features: [
      "Routine Cleanings Covered",
      "Vision Exams & Frames",
      "No Waiting Periods",
      "Preventive Care Included"
    ],
    pricing: "Plans from $15/mo",
    benefits: [
      "Immediate coverage available",
      "Large provider networks",
      "Family discounts",
      "Orthodontics included"
    ]
  },
  {
    id: 'life-insurance',
    title: "Life Insurance",
    shortDesc: "Protect your family's future",
    description: "Term and permanent life insurance options to protect your family's financial future.",
    icon: <HeartHandshake className="w-8 h-8" />,
    gradient: "from-red-500/20 to-red-600/10",
    category: "protection",
    features: [
      "Term Life Insurance",
      "Whole Life Insurance",
      "Universal Life Options",
      "Final Expense Coverage"
    ],
    pricing: "Plans from $25/mo",
    benefits: [
      "No medical exam options",
      "Flexible payment terms",
      "Cash value accumulation",
      "Living benefits available"
    ]
  },
  {
    id: 'supplemental',
    title: "Supplemental Coverage",
    shortDesc: "Extra protection for unexpected costs",
    description: "Additional protection including hospital indemnity, cancer insurance, and accident coverage.",
    icon: <Plus className="w-8 h-8" />,
    gradient: "from-orange-500/20 to-orange-600/10",
    category: "supplemental",
    features: [
      "Hospital Indemnity Plans",
      "Cancer Insurance",
      "Accident Coverage",
      "Critical Illness Protection"
    ],
    pricing: "Plans from $10/mo",
    benefits: [
      "Cash benefits paid directly",
      "No network restrictions",
      "Portable coverage",
      "Quick claim processing"
    ]
  },
]

const agentServices = [
  {
    id: 'lead-generation',
    title: "Lead Generation System",
    shortDesc: "Warm leads delivered daily",
    description: "Proprietary technology platform that generates high-quality, qualified leads for insurance agents.",
    icon: <TrendingUp className="w-8 h-8" />,
    gradient: "from-yellow-500/20 to-yellow-600/10",
    category: "sales",
    features: [
      "Warm Lead Generation",
      "AI-Powered Qualification",
      "Real-Time Lead Delivery",
      "Lead Quality Guarantee"
    ],
    pricing: "Performance Based",
    benefits: [
      "No cold calling required",
      "Pre-qualified prospects",
      "Exclusive territory rights",
      "24/7 lead flow"
    ]
  },
  {
    id: 'commission',
    title: "Commission Structure",
    shortDesc: "Industry-leading compensation",
    description: "Competitive commission rates with performance bonuses and residual income opportunities.",
    icon: <DollarSign className="w-8 h-8" />,
    gradient: "from-green-500/20 to-green-600/10",
    category: "compensation",
    features: [
      "High Commission Rates",
      "Performance Bonuses",
      "Residual Income",
      "Fast Payment Processing"
    ],
    pricing: "Up to 120% Commission",
    benefits: [
      "Weekly commission payments",
      "No charge backs for 2 years",
      "Bonus opportunities",
      "Lifetime renewals"
    ]
  },
  {
    id: 'training',
    title: "Training & Certification",
    shortDesc: "Complete success system",
    description: "Comprehensive training programs to help agents succeed in the insurance industry.",
    icon: <Award className="w-8 h-8" />,
    gradient: "from-blue-500/20 to-blue-600/10",
    category: "support",
    features: [
      "Product Training",
      "Sales Techniques",
      "Compliance Education",
      "Continuing Education"
    ],
    pricing: "Included at No Cost",
    benefits: [
      "Live and recorded training",
      "One-on-one mentoring",
      "Certification assistance",
      "Ongoing education credits"
    ]
  },
  {
    id: 'technology',
    title: "Technology Platform",
    shortDesc: "All-in-one business tools",
    description: "State-of-the-art CRM and quoting tools to streamline your sales process.",
    icon: <Calculator className="w-8 h-8" />,
    gradient: "from-purple-500/20 to-purple-600/10",
    category: "tools",
    features: [
      "Integrated CRM System",
      "Real-Time Quoting",
      "Application Processing",
      "Commission Tracking"
    ],
    pricing: "Free Platform Access",
    benefits: [
      "Mobile-optimized platform",
      "Automated follow-up",
      "Real-time reporting",
      "API integrations"
    ]
  },
  {
    id: 'marketing',
    title: "Marketing Support",
    shortDesc: "Professional brand building",
    description: "Professional marketing materials and campaign support to build your brand.",
    icon: <Briefcase className="w-8 h-8" />,
    gradient: "from-pink-500/20 to-pink-600/10",
    category: "support",
    features: [
      "Branded Marketing Materials",
      "Digital Marketing Support",
      "Social Media Templates",
      "Local Advertising Support"
    ],
    pricing: "Marketing Budget Provided",
    benefits: [
      "Custom branded materials",
      "Social media management",
      "Website development",
      "Local SEO optimization"
    ]
  },
  {
    id: 'recruitment',
    title: "Agent Recruitment",
    shortDesc: "Build your own agency",
    description: "Opportunity to build your own agency and recruit sub-agents for additional income.",
    icon: <UserPlus className="w-8 h-8" />,
    gradient: "from-cyan-500/20 to-cyan-600/10",
    category: "growth",
    features: [
      "Agency Building Support",
      "Recruitment Training",
      "Override Commissions",
      "Team Management Tools"
    ],
    pricing: "Additional Revenue Stream",
    benefits: [
      "Passive income potential",
      "Leadership development",
      "Team building rewards",
      "Management bonuses"
    ]
  },
]

const tabs = [
  { id: 'clients', label: 'For Clients', description: 'Find the right insurance coverage for your needs' },
  { id: 'agents', label: 'For Agents', description: 'Join our team and grow your insurance business' }
]

const clientCategories = [
  { id: 'all', label: 'All Services', icon: <Shield className="w-4 h-4" /> },
  { id: 'health', label: 'Health Insurance', icon: <Stethoscope className="w-4 h-4" /> },
  { id: 'business', label: 'Business Plans', icon: <Building className="w-4 h-4" /> },
  { id: 'supplemental', label: 'Supplemental', icon: <Plus className="w-4 h-4" /> },
  { id: 'protection', label: 'Life & Protection', icon: <HeartHandshake className="w-4 h-4" /> }
]

const agentCategories = [
  { id: 'all', label: 'All Resources', icon: <Shield className="w-4 h-4" /> },
  { id: 'sales', label: 'Sales Tools', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'compensation', label: 'Compensation', icon: <DollarSign className="w-4 h-4" /> },
  { id: 'support', label: 'Support & Training', icon: <Award className="w-4 h-4" /> },
  { id: 'tools', label: 'Technology', icon: <Calculator className="w-4 h-4" /> },
  { id: 'growth', label: 'Agency Building', icon: <UserPlus className="w-4 h-4" /> }
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('clients')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [waitlistForm, setWaitlistForm] = useState({
    name: "",
    email: "",
    feature: ""
  })
  
  const currentServices = activeTab === 'clients' ? clientServices : agentServices
  const currentCategories = activeTab === 'clients' ? clientCategories : agentCategories
  
  // Filter services based on category and search term
  const filteredServices = currentServices.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab)
    setSelectedCategory('all')
    setExpandedCard(null)
    setSearchTerm('')
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const result = await submitWaitlistEntry({
        name: waitlistForm.name,
        email: waitlistForm.email,
        feature: waitlistForm.feature,
        product: "hawknest-admin"
      })
      
      // Firebase functions return data in result.data
      const responseData = result.data as any
      
      if (responseData?.success) {
        alert(responseData.message || "Thank you for joining the waitlist! We'll notify you when it's ready.")
        setShowWaitlistPopup(false)
        setWaitlistForm({ name: "", email: "", feature: "" })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error: any) {
      console.error("Waitlist submission error:", error)
      alert(error.message || "There was an error submitting your information. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFeatureOptions = () => {
    return [
      "Lead Generation System",
      "Commission Structure", 
      "Training & Certification",
      "Technology Platform",
      "Marketing Support",
      "Agent Recruitment"
    ]
  }

  return (
    <section className="relative min-h-screen pt-32 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Solutions for Everyone
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Whether you're looking for insurance coverage or wanting to build a successful insurance career, we have the solutions you need.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-12"
        >
          <div className="bg-muted/50 backdrop-blur-sm border border-border rounded-2xl p-2 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-8 py-4 rounded-xl transition-all duration-300 font-semibold ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <div className="text-center">
                  <div className="text-lg">{tab.label}</div>
                  <div className="text-sm opacity-70">{tab.description}</div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${activeTab === 'clients' ? 'insurance plans' : 'agent resources'}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground placeholder-muted-foreground focus:outline-none focus:border-border/70 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {currentCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                  }`}
                >
                  {category.icon}
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Counter */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Showing {filteredServices.length} of {currentServices.length} {activeTab === 'clients' ? 'insurance plans' : 'resources'}
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
        </motion.div>

        {/* Services Grid with Interactive Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${selectedCategory}-${searchTerm}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                layout
                className={`bg-gradient-to-br ${service.gradient} border border-gray-800/50 rounded-2xl backdrop-blur-sm hover:border-gray-700/50 transition-all duration-300 group cursor-pointer overflow-hidden ${
                  expandedCard === service.id ? 'lg:col-span-2' : ''
                }`}
                onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
              >
                {/* Card Header - Always Visible */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-slate-300 group-hover:text-blue-400 transition-colors">
                      {service.icon}
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCard === service.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
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
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-800/50"
                    >
                      <div className="p-6 space-y-6">
                        {/* Full Description */}
                        <p className="text-gray-300 leading-relaxed">
                          {service.description}
                        </p>

                        {/* Features and Benefits in Two Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Features */}
                          <div>
                            <h4 className="text-white font-semibold mb-3 flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                              What's Included
                            </h4>
                            <ul className="space-y-2">
                              {service.features.map((feature, featureIndex) => (
                                <motion.li
                                  key={featureIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: featureIndex * 0.1 }}
                                  className="flex items-center text-gray-300 text-sm"
                                >
                                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 flex-shrink-0" />
                                  {feature}
                                </motion.li>
                              ))}
                            </ul>
                          </div>

                          {/* Benefits */}
                          <div>
                            <h4 className="text-white font-semibold mb-3 flex items-center">
                              <Shield className="w-4 h-4 text-blue-400 mr-2" />
                              Key Benefits
                            </h4>
                            <ul className="space-y-2">
                              {service.benefits.map((benefit, benefitIndex) => (
                                <motion.li
                                  key={benefitIndex}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: benefitIndex * 0.1 }}
                                  className="flex items-center text-muted-foreground text-sm"
                                >
                                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 flex-shrink-0" />
                                  {benefit}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                          {activeTab === 'clients' ? (
                            <>
                              <Link href="/contact" className="flex-1">
                                <AnimatedButton className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                  <span className="flex items-center justify-center">
                                    Speak to Agent
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </span>
                                </AnimatedButton>
                              </Link>
                              <Link href="/quotes" className="flex-1">
                                <AnimatedButton className="w-full bg-transparent border border-border text-foreground hover:bg-muted">
                                  Get Quotes
                                </AnimatedButton>
                              </Link>
                            </>
                          ) : (
                            <AnimatedButton 
                              onClick={() => setShowWaitlistPopup(true)}
                              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              <span className="flex items-center justify-center">
                                Join Waitlist
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </span>
                            </AnimatedButton>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results Message */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p>Try adjusting your search terms or selecting a different category.</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

      </div>

      {/* Waitlist Popup */}
      <AnimatePresence>
        {showWaitlistPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowWaitlistPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-3xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-foreground">Join the Waitlist</h3>
                <button
                  onClick={() => setShowWaitlistPopup(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-muted-foreground mb-6">
                Be the first to know when HawkNest-Admin is ready! We'll notify you as soon as it's available.
              </p>

              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={waitlistForm.name}
                    onChange={(e) => setWaitlistForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={waitlistForm.email}
                    onChange={(e) => setWaitlistForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="feature" className="block text-sm font-medium text-gray-300 mb-2">
                    Most Interested Feature
                  </label>
                  <select
                    id="feature"
                    required
                    value={waitlistForm.feature}
                    onChange={(e) => setWaitlistForm(prev => ({ ...prev, feature: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select a feature</option>
                    {getFeatureOptions().map((feature, index) => (
                      <option key={index} value={feature}>{feature}</option>
                    ))}
                  </select>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-colors duration-300"
                >
                  {isSubmitting ? "Joining Waitlist..." : "Join Waitlist"}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
