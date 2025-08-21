"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { submitWaitlistEntry } from "@/lib/firebase"

interface TabContent {
  id: string
  title: string
  description: string
  features: string[]
  buttonText: string
  placeholderImage: string
}

const tabsData: TabContent[] = [
  {
    id: "hawkins-ig",
    title: "Hawkins IG",
    description: "Your trusted insurance partner providing comprehensive coverage solutions for families and businesses across Texas with over a decade of professional service.",
    features: [
      "Licensed Insurance Agents",
      "Family-Owned Business", 
      "10+ Years Experience",
      "Professional Service"
    ],
    buttonText: "Learn More About Us",
    placeholderImage: "/api/placeholder/400/300"
  },
  {
    id: "insurance-hawk",
    title: "Insurance Hawk",
    description: "Jonathan 'The Hawk' Hawkins brings his goofy humor and big personality to insurance. Making coverage easy and affordable while keeping you entertained along the way!",
    features: [
      "Smartest Agent Alive",
      "Funniest Agent Around",
      "Best Looking Agent Ever",
      "Guaranteed Laughs Included"
    ],
    buttonText: "Join The Fun",
    placeholderImage: "/api/placeholder/400/300"
  },
  {
    id: "hawknest",
    title: "HawkNest", 
    description: "Comprehensive client portal and policy management system providing seamless access to your insurance information, claims, and documents.",
    features: [
      "Policy Management Dashboard",
      "Rate Tracking",
      "Tracking & Organization",
      "Transparent Quotes",
      "Explore All Options"
    ],
    buttonText: "Access Portal",
    placeholderImage: "/api/placeholder/400/300"
  },
  {
    id: "hawknest-admin",
    title: "Hawknest-Admin",
    description: "Professional-grade administrative platform designed for insurance agents and brokers to efficiently manage their business operations and client relationships.",
    features: [
      "Client Management System",
      "Commission Tracking Tools",
      "Industry Wide Quoting Dashboard",
      "Automated Workflow Engine"
    ],
    buttonText: "View Demo",
    placeholderImage: "/api/placeholder/400/300"
  }
]

export default function AboutUsTabs() {
  const [activeTab, setActiveTab] = useState("hawkins-ig")
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [waitlistForm, setWaitlistForm] = useState({
    name: "",
    email: "",
    feature: ""
  })

  const activeContent = tabsData.find(tab => tab.id === activeTab) || tabsData[0]

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const result = await submitWaitlistEntry({
        name: waitlistForm.name,
        email: waitlistForm.email,
        feature: waitlistForm.feature,
        product: activeTab // hawknest or hawknest-admin
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
    const currentTab = tabsData.find(tab => tab.id === activeTab)
    return currentTab?.features || []
  }

  return (
    <section className="py-24 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Our Solutions
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover our comprehensive suite of insurance technology and services designed to serve you better.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabsData.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl border transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-white/10 border-white/30 text-white"
                  : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <Image 
                  src="/hig-logo-white.svg" 
                  alt="Logo" 
                  width={24} 
                  height={24}
                  className="w-6 h-6"
                />
              </div>
              <span className="font-medium">{tab.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Image Side */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700/50 overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-2xl mx-auto flex items-center justify-center">
                    <Image 
                      src="/hig-logo-white.svg" 
                      alt="Logo" 
                      width={32} 
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  <p className="text-sm">
                    {activeContent.title} Preview
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                {activeContent.title}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {activeContent.description}
              </p>
            </div>

            <div className="space-y-4">
              {activeContent.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            {activeContent.id === "insurance-hawk" ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href="https://theinsurancehawk.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300"
                >
                  {activeContent.buttonText}
                </Link>
              </motion.div>
            ) : activeContent.id === "hawknest" || activeContent.id === "hawknest-admin" ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowWaitlistPopup(true)}
                className="bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Join Waitlist
              </motion.button>
            ) : null}
          </div>
        </motion.div>
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
              className="bg-gray-900 border border-gray-700 rounded-3xl p-8 max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Join the Waitlist</h3>
                <button
                  onClick={() => setShowWaitlistPopup(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-gray-300 mb-6">
                Be the first to know when {activeContent.title} is ready! We'll notify you as soon as it's available.
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
