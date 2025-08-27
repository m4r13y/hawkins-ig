"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { submitWaitlistEntry } from "@/lib/firebase"
import { useModal } from "@/contexts/modal-context"

interface TabContent {
  id: string
  title: string
  description: string
  features: string[]
  buttonText: string
  placeholderImage: string
  images?: string[]
}

const tabsData: TabContent[] = [
  {
    id: "hawkins-ig",
    title: "Hawkins IG",
    description: "Your trusted insurance partner providing comprehensive coverage solutions for families and businesses across Texas with over a decade of professional service.",
    features: [
      "Licensed Insurance Agents",
      "Family-Owned Business", 
      "38+ Years Combined Experience",
      "Professional Service"
    ],
    buttonText: "Learn More About Us",
    placeholderImage: "/success-stories/HIG-Clients-2.jpg",
    images: [
      "/success-stories/HIG-Clients-2.jpg",
      "/success-stories/HIG-Clients-3.jpg", 
      "/success-stories/HIG-Clients-4.jpg"
    ]
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
    placeholderImage: "/insurance-hawk-photo.jpg"
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
    placeholderImage: "/hawknest-logo.png"
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
    placeholderImage: "/hawknest-admin-logo.png"
  }
]

export default function AboutUsTabs() {
  const [activeTab, setActiveTab] = useState("hawkins-ig")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { 
    setIsWaitlistModalOpen,
    setWaitlistFormData 
  } = useModal()

  const activeContent = tabsData.find(tab => tab.id === activeTab) || tabsData[0]

  const handleJoinWaitlist = (featureName: string) => {
    setWaitlistFormData({
      name: '',
      email: '',
      feature: featureName
    })
    setIsWaitlistModalOpen(true)
  }

  // Auto-cycle through images for Hawkins IG tab
  useEffect(() => {
    if (activeTab === "hawkins-ig" && activeContent.images) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => 
          (prev + 1) % activeContent.images!.length
        )
      }, 4000) // Change image every 4 seconds

      return () => clearInterval(interval)
    }
  }, [activeTab, activeContent.images])

  // Reset image index when switching tabs
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [activeTab])

  // Function to get the appropriate logo for each tab
  const getTabLogo = (tabId: string, isDark = false) => {
    switch (tabId) {
      case "hawkins-ig":
        return isDark ? "/hig-logo-white.svg" : "/hig-logo-navy.svg"
      case "insurance-hawk":
        return "/insurance-hawk-logo.svg"
      case "hawknest":
        return "/hawknest-logo.png"
      case "hawknest-admin":
        return "/hawknest-admin-logo.png"
      default:
        return isDark ? "/hig-logo-white.svg" : "/hig-logo-navy.svg"
    }
  }

  const getFeatureOptions = () => {
    const currentTab = tabsData.find(tab => tab.id === activeTab)
    return currentTab?.features || []
  }

  return (
    <section className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Our Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive suite of insurance technology and services designed to serve you better.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* Desktop version */}
          <div className="hidden sm:flex flex-wrap justify-center gap-4 w-full">
            {tabsData.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl border transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary/10 border-primary/50 text-primary"
                    : "bg-card border-border/20 hover:border-border/40 text-muted-foreground hover:bg-card/80 hover:text-foreground"
                }`}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {tab.id === "insurance-hawk" || tab.id === "hawknest" || tab.id === "hawknest-admin" ? (
                    // Single logo for these tabs (they don't have dark mode variants)
                    <Image 
                      src={getTabLogo(tab.id)} 
                      alt={`${tab.title} Logo`} 
                      width={24} 
                      height={24}
                      className="w-6 h-6"
                    />
                  ) : (
                    // HIG logo with dark mode support
                    <>
                      <Image 
                        src={getTabLogo(tab.id, false)} 
                        alt={`${tab.title} Logo`} 
                        width={24} 
                        height={24}
                        className="w-6 h-6 dark:hidden"
                      />
                      <Image 
                        src={getTabLogo(tab.id, true)} 
                        alt={`${tab.title} Logo`} 
                        width={24} 
                        height={24}
                        className="w-6 h-6 hidden dark:block"
                      />
                    </>
                  )}
                </div>
                <span className="font-medium">{tab.title}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile version - just logos in a row */}
          <div className="flex sm:hidden justify-center gap-3 w-full">
            {tabsData.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center w-16 h-16 rounded-2xl border transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-primary/10 border-primary/50 text-primary"
                    : "bg-card border-border/20 hover:border-border/40 text-muted-foreground hover:bg-card/80 hover:text-foreground"
                }`}
                aria-label={tab.title}
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  {tab.id === "insurance-hawk" || tab.id === "hawknest" || tab.id === "hawknest-admin" ? (
                    // Single logo for these tabs (they don't have dark mode variants)
                    <Image 
                      src={getTabLogo(tab.id)} 
                      alt={`${tab.title} Logo`} 
                      width={24} 
                      height={24}
                      className="w-6 h-6"
                    />
                  ) : (
                    // HIG logo with dark mode support
                    <>
                      <Image 
                        src={getTabLogo(tab.id, false)} 
                        alt={`${tab.title} Logo`} 
                        width={24} 
                        height={24}
                        className="w-6 h-6 dark:hidden"
                      />
                      <Image 
                        src={getTabLogo(tab.id, true)} 
                        alt={`${tab.title} Logo`} 
                        width={24} 
                        height={24}
                        className="w-6 h-6 hidden dark:block"
                      />
                    </>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
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
              className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 rounded-3xl border border-border/20 overflow-hidden transition-all duration-300"
            >
              {activeContent.id === "hawkins-ig" && activeContent.images ? (
                <div className="w-full h-full relative">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full relative"
                    >
                      <Image 
                        src={activeContent.images[currentImageIndex]} 
                        alt={`Hawkins Insurance Group Success Story ${currentImageIndex + 1}`} 
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={currentImageIndex === 0}
                        quality={75}
                        loading={currentImageIndex === 0 ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        onError={(e) => {
                          console.error('Image failed to load:', activeContent.images?.[currentImageIndex])
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <p className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                        Real clients, real results
                      </p>
                      <div className="flex space-x-1">
                        {activeContent.images.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentImageIndex 
                                ? 'bg-white' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`View image ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : activeContent.id === "insurance-hawk" ? (
                <div className="w-full h-full relative">
                  <Image 
                    src={activeContent.placeholderImage} 
                    alt="Jonathan 'The Hawk' Hawkins with his hawk in a patriotic setting" 
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    onError={(e) => {
                      console.error('Image failed to load:', activeContent.placeholderImage)
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium bg-black/30 backdrop-blur-sm px-3 py-2 rounded-lg">
                      The Hawk in action!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full relative flex items-center justify-center">
                  <Image 
                    src={activeContent.placeholderImage} 
                    alt={`${activeContent.title} Logo`} 
                    fill
                    className="object-contain p-8"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={85}
                    onError={(e) => {
                      console.error('Logo failed to load:', activeContent.placeholderImage)
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {activeContent.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
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
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">{feature}</span>
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
                  className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors duration-300"
                >
                  {activeContent.buttonText}
                </Link>
              </motion.div>
            ) : activeContent.id === "hawknest" || activeContent.id === "hawknest-admin" ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleJoinWaitlist(activeContent.title)}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-medium hover:bg-primary/90 transition-colors duration-300"
              >
                Join Waitlist
              </motion.button>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

