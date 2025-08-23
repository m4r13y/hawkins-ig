"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import InsuranceConsultationTool from "@/components/insurance-consultation-tool"
import InsuranceSavingsCalculator from "@/components/insurance-savings-calculator"
import { useModal } from "@/contexts/modal-context"
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

// Carrier logos for the flowing carousel
const carrierLogos = [
  "/Carrier Logos (1)/1.png",
  "/Carrier Logos (1)/2.png", 
  "/Carrier Logos (1)/3.png",
  "/Carrier Logos (1)/4.png",
  "/Carrier Logos (1)/5.png",
  "/Carrier Logos (1)/6.png",
  "/Carrier Logos (1)/7.png",
  "/Carrier Logos (1)/8.png",
  "/Carrier Logos (1)/9.png",
  "/Carrier Logos (1)/10.png"
]

const clientServices = [
  {
    id: 'medicare',
    title: "Medicare Plans",
    shortDesc: "Instant quotes from 200+ Medicare carriers - compare and enroll online",
    category: 'health',
    pricing: "Instant Quotes",
    icon: <Stethoscope className="w-8 h-8" />,
    
    quoteUrl: "/quotes/medicare",
    features: ["Instant Medicare Quotes", "200+ Carrier Options", "Transparent Pricing", "Zero Pressure Process"],
    details: "Skip the sales calls and get instant Medicare quotes from 200+ top carriers. See transparent pricing, compare plans side-by-side, and enroll immediately - all online.",
    benefits: [
      "Instant quotes from 200+ carriers",
      "Transparent pricing with no hidden fees", 
      "Compare plans without sales pressure",
      "Enroll online in minutes, not weeks"
    ],
    process: [
      "Get instant quotes in under 60 seconds",
      "Compare 200+ carriers transparently",
      "Choose your plan with full information",
      "Enroll immediately with zero pressure"
    ]
  },
  {
    id: 'family-health',
    title: "Family Health Insurance",
    shortDesc: "Instant family health quotes from 200+ top-rated carriers",
    category: 'health',
    pricing: "Instant Quotes",
    icon: <Users className="w-8 h-8" />,
    
    quoteUrl: "/quotes/healthcare-marketplace",
    features: ["Instant Quote Technology", "200+ Carrier Network", "Transparent Pricing", "No Sales Pressure"],
    details: "Get instant family health insurance quotes from 200+ carriers. See transparent pricing, compare coverage options, and enroll online - no waiting, no sales calls.",
    benefits: [
      "Instant quotes from 200+ carriers",
      "Full price transparency upfront",
      "Compare plans without pressure", 
      "Enroll online in minutes"
    ],
    process: [
      "Enter family details once",
      "View instant quotes from 200+ carriers",
      "Compare transparent pricing & benefits",
      "Enroll immediately with confidence"
    ]
  },
  {
    id: 'group-health',
    title: "Group Health Plans",
    shortDesc: "Instant business health quotes from 200+ enterprise carriers",
    category: 'business',
    pricing: "Instant Quotes",
    icon: <Building className="w-8 h-8" />,
    
    quoteUrl: "/quotes/healthcare-marketplace",
    features: ["Instant Business Quotes", "200+ Carrier Network", "Transparent Pricing", "Self-Service Platform"],
    details: "Get instant group health quotes from 200+ enterprise carriers. Compare transparent pricing, see exact costs per employee, and enroll your team online.",
    benefits: [
      "Instant quotes from 200+ carriers",
      "Transparent per-employee pricing",
      "Compare benefits without sales calls",
      "Enroll your entire team online"
    ],
    process: [
      "Enter company details instantly",
      "View quotes from 200+ carriers",
      "Compare transparent pricing & benefits",
      "Enroll employees with zero pressure"
    ]
  },
  {
    id: 'dental-vision',
    title: "Dental & Vision",
    shortDesc: "Instant dental & vision quotes from 200+ specialized carriers",
    category: 'supplemental',
    pricing: "Instant Quotes",
    icon: <Smile className="w-8 h-8" />,
    
    quoteUrl: "/quotes/dental-vision",
    features: ["Instant Quote Technology", "200+ Dental Carriers", "Transparent Pricing", "Immediate Enrollment"],
    details: "Get instant dental and vision quotes from 200+ specialized carriers. See transparent pricing, compare coverage levels, and enroll immediately online.",
    benefits: [
      "Instant quotes from 200+ carriers",
      "Transparent pricing with no surprises",
      "Compare plans without sales pressure",
      "Enroll online in minutes"
    ],
    process: [
      "Get instant quotes in seconds",
      "Compare 200+ carriers transparently",
      "Choose your coverage level",
      "Enroll immediately online"
    ]
  },
  {
    id: 'life-insurance',
    title: "Life Insurance",
    shortDesc: "Instant life insurance quotes from 200+ top-rated carriers",
    category: 'protection',
    pricing: "Instant Quotes",
    icon: <HeartHandshake className="w-8 h-8" />,
    
    quoteUrl: "/quotes/final-expense",
    features: ["Instant Quote Technology", "200+ Life Carriers", "Transparent Pricing", "No Sales Pressure"],
    details: "Get instant life insurance quotes from 200+ carriers. See transparent pricing for term, whole, and final expense coverage - compare and apply online.",
    benefits: [
      "Instant quotes from 200+ carriers",
      "Transparent pricing for all coverage types",
      "Compare options without sales calls",
      "Apply online with zero pressure"
    ],
    process: [
      "Get instant quotes in under 60 seconds",
      "Compare 200+ carriers side-by-side",
      "Choose your protection level",
      "Apply immediately with confidence"
    ]
  },
  {
    id: 'supplemental',
    title: "Supplemental Plans",
    shortDesc: "Instant supplemental insurance quotes from 200+ carriers",
    category: 'supplemental',
    pricing: "Instant Quotes",
    icon: <Plus className="w-8 h-8" />,
    
    quoteUrl: "/quotes/cancer-insurance",
    features: ["Instant Quote Technology", "200+ Carrier Network", "Transparent Pricing", "Immediate Coverage"],
    details: "Get instant quotes for cancer, accident, and critical illness coverage from 200+ carriers. See transparent pricing and enroll online - no waiting, no sales calls.",
    benefits: [
      "Instant quotes from 200+ carriers",
      "Transparent pricing with no surprises",
      "Compare benefits without pressure",
      "Enroll online in minutes"
    ],
    process: [
      "Get instant quotes in seconds",
      "Compare 200+ carriers transparently",
      "Choose your protection level",
      "Enroll immediately with confidence"
    ]
  }
]

export default function ServicesPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const { 
    setIsInformationRequestModalOpen,
    setInformationRequestData 
  } = useModal()

  // Carrier carousel component - COMMENTED OUT
  /*
  const CarrierCarousel = () => {
    return (
      <div className="relative overflow-hidden py-4">
        <div 
          className="flex animate-scroll gap-8 py-4"
          style={{
            animation: 'scroll 30s linear infinite, mask-shift 30s linear infinite'
          }}
        >
          {carrierLogos.map((logo, index) => (
            <div key={`first-${index}`} className="flex-shrink-0 min-w-fit flex items-center justify-center w-48">
              <Image 
                className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 filter" 
                alt={`Carrier ${index + 1}`}
                src={logo}
                title={`Carrier ${index + 1}`}
                width={192}
                height={64}
                quality={85}
              />
            </div>
          ))}
          {carrierLogos.map((logo, index) => (
            <div key={`second-${index}`} className="flex-shrink-0 min-w-fit flex items-center justify-center w-48">
              <Image 
                className="h-16 w-auto opacity-70 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 filter" 
                alt={`Carrier ${index + 1}`}
                src={logo}
                title={`Carrier ${index + 1}`}
                width={192}
                height={64}
                quality={85}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
  */

  const getFeatureOptions = () => {
    return clientServices.map(service => service.title)
  }

  const handleGetMoreInfo = (serviceTitle: string) => {
    setInformationRequestData({
      name: '',
      email: '',
      service: serviceTitle,
      requestType: 'information'
    })
    setIsInformationRequestModalOpen(true)
  }

  return (
    <>
      {/* Hero Header Section */}
      <section className="pt-32 pb-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Insurance Quotes</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get instant quotes from 200+ top carriers. Transparent pricing, zero pressure, modern technology - insurance the way it should be.
            </p>
            
            {/* Carrier Carousel in Header - COMMENTED OUT */}
            {/*
            <div className="mb-8">
              <p className="text-lg text-muted-foreground mb-4">
                Trusted by <span className="font-bold text-foreground">200+ Top Carriers</span>
              </p>
              <CarrierCarousel />
            </div>
            */}
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="bg-transparent text-foreground pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {clientServices.map((service, index) => (
            <div
              key={service.id}
              className={`relative bg-card border border-border/50 rounded-2xl backdrop-blur-sm hover:border-border/80 transition-all duration-200 group cursor-pointer overflow-hidden shadow-lg hover:shadow-xl ${
                expandedCard === service.id ? 'lg:col-span-2' : ''
              }`}
              onClick={() => setExpandedCard(expandedCard === service.id ? null : service.id)}
            >
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

                      {/* Features and Process Layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Key Features and Benefits */}
                        <div className="space-y-6">
                          {/* Key Features */}
                          <div>
                            <h4 className="text-lg font-semibold text-foreground mb-3">Key Features</h4>
                            <div className="space-y-2">
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
                        </div>

                        {/* Right Column - Process */}
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
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <Link href={service.quoteUrl || '/quotes'} className="flex-1">
                          <AnimatedButton 
                            variant="default" 
                            className="w-full"
                          >
                            Get Quote
                          </AnimatedButton>
                        </Link>
                        <AnimatedButton 
                          variant="outline" 
                          onClick={() => handleGetMoreInfo(service.title)}
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
      </section>

      {/* Insurance Tools Section */}
      <InsuranceConsultationTool />
      <InsuranceSavingsCalculator />
    </>
  )
}

