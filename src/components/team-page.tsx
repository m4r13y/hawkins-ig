"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Users, Award, Phone, Mail, MapPin, Star, Shield, Heart, Facebook, Calendar, CheckCircle } from "lucide-react"
import AnimatedButton from "./animated-button"
import ContactFormModal from "./contact-form-modal"

const teamMembers = [
  {
    id: 1,
    name: "Jonathan Hawkins",
    title: "Owner | CFP®, RICP®, CLTC®, CLU®",
    specialties: ["Financial Planning", "Estate Planning", "Life Insurance", "Long-Term Care", "Retirement Income"],
    licenseNumber: "TX-9419848",
    licensedStates: ["TX", "NM"],
    yearsExperience: 14,
    education: "University of Texas",
    certifications: ["CFP®", "RICP®", "CLTC®", "CLU®"],
    bio: "Jonathan is a Texas-based life and health insurance broker with 14 years of experience. In that time, he has helped thousands of Americans save money and improve their insurance benefits and coverage. His dedication and client-focused results have earned him national recognition as a top producer with multiple leading insurance carriers. He holds advanced designations including Certified Financial Planner (CFP®), Retirement Income Certified Professional (RICP®), Certified in Long-Term Care (CLTC®), and Chartered Life Underwriter (CLU®). These credentials reflect his specialized expertise in financial planning, retirement income strategies, long-term care solutions, and life insurance and estate planning. With this broad knowledge base, he is well-equipped to address even the most complex insurance and financial needs. He specializes in working with individuals and families who have substantial assets, helping protect their wealth and plan for the future. Drawing on his estate planning knowledge, he offers basic estate planning services—such as drafting wills and trusts—in coordination with his clients' attorneys and financial advisors. This collaborative approach ensures each client's insurance strategy is aligned with their broader legal and financial plans, providing a comprehensive path toward security. Known for his warm, professional, and trustworthy approach, he prides himself on building long-term client relationships and working hand-in-hand with other professionals to achieve the best outcomes for those he serves.",
    achievements: [
      "National Recognition as Top Producer",
      "CFP® Certified Financial Planner",
      "RICP® Retirement Income Professional", 
      "CLTC® Long-Term Care Specialist",
      "CLU® Chartered Life Underwriter",
      "Thousands of Americans Served",
      "Estate Planning Services Provider"
    ],
    image: "/jonathan-hawkins.jpg",
    phone: "(817) 800-4253",
    email: "jhawk@hawkinsig.com",
    facebook: "",
    languages: ["English"],
    servingAreas: ["Texas"]
  },
  {
    id: 2,
    name: "Kasey Weadon",
    title: "Group Advisor",
    specialties: ["Group Health Insurance", "Employee Benefits", "COBRA Administration"],
    licenseNumber: "TX-3456789",
    licensedStates: ["TX"],
    yearsExperience: 12,
    education: "Master's in Human Resources, University of Texas",
    certifications: ["CEBS", "GBA", "Texas Licensed Agent"],
    bio: "Kasey brings over 10 years of expertise in employee benefits and group insurance. He works closely with businesses to design comprehensive benefit packages that attract and retain top talent while managing costs effectively.",
    achievements: [
      "Certified Employee Benefit Specialist",
      "500+ Businesses Served",
      "Employee Benefits Excellence Award",
      "Client Retention Rate: 98%"
    ],
    image: "/Kasey-Weadon.jpg",
    phone: "(972) 978-5037",
    email: "info@hawkinsig.com",
    facebook: "",
    languages: ["English", "Spanish"],
    servingAreas: ["Dallas-Fort Worth", "Houston", "East Texas"]
  },
  {
    id: 3,
    name: "Cal Marley",
    title: "Senior Benefits Specialist",
    specialties: ["Medicare", "Supplemental Insurance"],
    licenseNumber: "TX-9419848",
    licensedStates: ["TX"],
    yearsExperience: 2,
    education: "Texas Christian University",
    certifications: ["General Lines Insurance"],
    bio: "",
    achievements: [
      "Licensed Insurance Professional",
      "Medicare Specialist",
      "Client-Focused Approach",
      "Rising Star in Benefits"
    ],
    image: "/cal-marley.png",
    phone: "(325) 225-5742",
    email: "cal@hawkinsig.com",
    facebook: "",
    languages: ["English"],
    servingAreas: ["Texas"]
  },

]

const teamStats = [
  { value: "38+", label: "Years Combined Experience", description: "Serving Texas communities" },
  { value: "5,000+", label: "Clients Protected", description: "Individuals and families" },
  { value: "99%", label: "Client Satisfaction", description: "Based on reviews" },
  { value: "24/7", label: "Support Available", description: "When you need us most" },
]

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [expandedBios, setExpandedBios] = useState<Set<number>>(new Set())
  const [contactModal, setContactModal] = useState<{
    isOpen: boolean
    memberName: string
    memberPhone: string
    memberEmail: string
  }>({
    isOpen: false,
    memberName: "",
    memberPhone: "",
    memberEmail: ""
  })

  const openContactModal = (name: string, phone: string, email: string) => {
    setContactModal({
      isOpen: true,
      memberName: name,
      memberPhone: phone,
      memberEmail: email
    })
  }

  const closeContactModal = () => {
    setContactModal({
      isOpen: false,
      memberName: "",
      memberPhone: "",
      memberEmail: ""
    })
  }

  const toggleBio = (memberId: number) => {
    const newExpandedBios = new Set(expandedBios)
    if (newExpandedBios.has(memberId)) {
      newExpandedBios.delete(memberId)
    } else {
      newExpandedBios.add(memberId)
    }
    setExpandedBios(newExpandedBios)
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
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Licensed insurance professionals dedicated to protecting what matters most to you and your family
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Team Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {teamStats.map((stat, index) => (
            <div key={index} className="text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-3xl font-bold text-foreground mb-2"
                style={{
                  textShadow: "0 0 20px rgba(71, 85, 105, 0.3)",
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Team Members Grid */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-foreground text-center mb-12"
          >
          
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setSelectedMember(member.id)}
                onHoverEnd={() => setSelectedMember(null)}
                className="bg-card/50 border border-border/50 overflow-visible backdrop-blur-sm hover:border-border/80 transition-all duration-300 group"
                style={{
                  boxShadow: selectedMember === member.id ? "0 20px 40px rgba(0, 0, 0, 0.1) dark:rgba(71, 85, 105, 0.1)" : "none",
                  borderRadius: "12px 72px 12px 12px",
                }}
              >
                {/* Profile Header with Image in Corner */}
                <div className="relative p-6 rounded-e-full rounded-s-xl bg-transparent">
                  {/* Circular Profile Image - Top Right */}
                  <div className="absolute -top-2 -right-2 z-20">
                    <Image 
                      src={member.image} 
                      alt={member.name}
                      width={192}
                      height={192}
                      className="w-48 h-48 rounded-full object-cover border-4 border-border shadow-xl"
                      style={{ 
                        objectPosition: member.id === 1 ? 'center 30%' : 
                                      member.id === 2 ? 'center 25%' : 
                                      member.id === 3 ? 'center 35%' : 
                                      'center 30%'
                      }}
                      quality={90}
                      priority={member.id === 1}
                      onError={(e) => {
                        console.log(`Failed to load image for ${member.name}: ${member.image}`);
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                      }}
                    />
                    {/* Fallback icon (hidden by default) */}
                    <div className="fallback-icon hidden w-36 h-36 rounded-full bg-gradient-to-br from-muted/20 to-muted/40 border-4 border-border shadow-xl">
                      <div className="flex items-center justify-center w-full h-full">
                        <Users className="w-12 h-12 text-muted-foreground/30" />
                      </div>
                    </div>
                  </div>

                  {/* Basic Info - Left Aligned */}
                  <div className="pr-40">
                    <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-foreground text-sm mb-2">{member.title}</p>
                    <p className="text-muted-foreground text-xs mb-3">License: {member.licenseNumber}</p>
                    <p className="text-muted-foreground text-xs">{member.yearsExperience} Years Experience</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, i) => (
                        <span key={i} className="bg-muted/50 border border-border/50 rounded-full px-3 py-1 text-xs text-foreground">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <div className="relative">
                      <p className={`text-muted-foreground text-sm leading-relaxed transition-all duration-300 ${
                        expandedBios.has(member.id) ? '' : 'line-clamp-3'
                      }`}>
                        {member.bio}
                      </p>
                      
                      {/* Check if bio is long enough to need expansion */}
                      {member.bio && member.bio.length > 200 && (
                        <button
                          onClick={() => toggleBio(member.id)}
                          className="mt-2 text-primary hover:text-primary/80 text-xs font-medium transition-colors duration-200 flex items-center gap-1"
                        >
                          {expandedBios.has(member.id) ? (
                            <>
                              Read Less
                              <motion.svg
                                initial={false}
                                animate={{ rotate: expandedBios.has(member.id) ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </motion.svg>
                            </>
                          ) : (
                            <>
                              Read More
                              <motion.svg
                                initial={false}
                                animate={{ rotate: expandedBios.has(member.id) ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </motion.svg>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Key Achievements and Licensed States + Contact & Languages Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Left Column - Key Achievements and Licensed States */}
                    <div>
                      {/* Key Achievements */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-foreground mb-3">Key Achievements</h4>
                        <ul className="space-y-2">
                          {member.achievements.slice(0, 2).map((achievement, i) => (
                            <li key={i} className="text-foreground text-xs flex items-center">
                              <CheckCircle className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Licensed States */}
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-3">Licensed States</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.licensedStates.map((state, i) => (
                            <span key={i} className="bg-primary/20 border border-primary/30 rounded-full px-3 py-1 text-xs text-primary">
                              {state}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Contact & Languages */}
                    <div className="border-l border-border/50 pl-6">
                      <div className="grid grid-cols-1 gap-4 text-xs mb-4">
                        <div>
                          <p className="text-muted-foreground mb-1">Languages</p>
                          <p className="text-foreground">{member.languages.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground mb-1">Serving Areas</p>
                          <p className="text-foreground">{member.servingAreas[0]}+</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex space-x-2">
                          <Phone className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                          <Mail className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                          <Facebook className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
                        </div>
                        <AnimatedButton 
                          onClick={() => openContactModal(member.name, member.phone, member.email)}
                          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-xs w-full"
                        >
                          <span className="flex items-center justify-center">
                            Contact {member.name.split(' ')[0]}
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </span>
                        </AnimatedButton>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* Contact Form Modal */}
      <ContactFormModal
        isOpen={contactModal.isOpen}
        onClose={closeContactModal}
        memberName={contactModal.memberName}
        memberPhone={contactModal.memberPhone}
        memberEmail={contactModal.memberEmail}
      />
    </>
  )
}

