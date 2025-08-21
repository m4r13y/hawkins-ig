"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowRight, Users, Award, Phone, Mail, MapPin, Star, Shield, Heart, Linkedin, Calendar, CheckCircle } from "lucide-react"
import AnimatedButton from "./animated-button"

const teamMembers = [
  {
    id: 1,
    name: "Jonathan Hawkins",
    title: "Owner | CFP",
    specialties: ["Health Insurance", "Life Insurance", "Financial Planning"],
    licenseNumber: "TX-9419848",
    licensedStates: ["TX", "NM"],
    yearsExperience: 15,
    education: "University of Texas",
    certifications: ["CFP", "Insurance"],
    bio: "Fort Worth native and UT Austin graduate who enjoys ranch life and Texas Longhorns football. With 13+ years in insurance, I specialize in Medicare, group plans, and individual coverage.",
    achievements: [
      "2x National Producer of the Year",
      "CFP Certified Financial Planner",
      "2,500+ Families Protected",
      "Texas Longhorns Alumni"
    ],
    image: "/jonathan-hawkins.jpg",
    phone: "(817) 800-4253",
    email: "jhawk@hawkinsig.com",
    linkedin: "",
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
    linkedin: "",
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
    linkedin: "",
    languages: ["English"],
    servingAreas: ["Texas"]
  },

]

const teamStats = [
  { value: "45+", label: "Years Combined Experience", description: "Serving Texas communities" },
  { value: "5,000+", label: "Clients Protected", description: "Individuals and families" },
  { value: "99%", label: "Client Satisfaction", description: "Based on reviews" },
  { value: "24/7", label: "Support Available", description: "When you need us most" },
]

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Meet Our Team</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Licensed insurance professionals dedicated to protecting what matters most to you and your family
          </p>

          {/* Team Contact Info */}
        </motion.div>

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
                className="text-3xl font-bold text-white mb-2"
                style={{
                  textShadow: "0 0 20px rgba(71, 85, 105, 0.5)",
                }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-medium text-slate-300 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Team Members Grid */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-white text-center mb-12"
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
                className="bg-slate-900/50 border border-slate-800/50 overflow-visible backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300 group"
                style={{
                  boxShadow: selectedMember === member.id ? "0 20px 40px rgba(71, 85, 105, 0.1)" : "none",
                  borderRadius: "12px 72px 12px 12px",
                }}
              >
                {/* Profile Header with Image in Corner */}
                <div className="relative p-6 rounded-e-full rounded-s-xl bg-transparent">
                  {/* Circular Profile Image - Top Right */}
                  <div className="absolute -top-2 -right-2 z-20">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-48 h-48 rounded-full object-cover border-4 border-slate-800 shadow-xl"
                      style={{ 
                        objectPosition: member.id === 1 ? 'center 30%' : 
                                      member.id === 2 ? 'center 25%' : 
                                      member.id === 3 ? 'center 35%' : 
                                      'center 30%'
                      }}
                      onError={(e) => {
                        console.log(`Failed to load image for ${member.name}: ${member.image}`);
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
                      }}
                    />
                    {/* Fallback icon (hidden by default) */}
                    <div className="fallback-icon hidden w-36 h-36 rounded-full bg-gradient-to-br from-slate-500/20 to-slate-600/20 border-4 border-slate-600 shadow-xl">
                      <div className="flex items-center justify-center w-full h-full">
                        <Users className="w-12 h-12 text-white/30" />
                      </div>
                    </div>
                  </div>

                  {/* Basic Info - Left Aligned */}
                  <div className="pr-40">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-slate-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-slate-300 text-sm mb-2">{member.title}</p>
                    <p className="text-slate-400 text-xs mb-3">License: {member.licenseNumber}</p>
                    <p className="text-slate-400 text-xs">{member.yearsExperience} Years Experience</p>
                  </div>
                </div>

                <div className="p-6">
                  {/* Specialties */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-white mb-3">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, i) => (
                        <span key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-full px-3 py-1 text-xs text-slate-300">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="mb-6">
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>

                  {/* Key Achievements and Licensed States + Contact & Languages Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    {/* Left Column - Key Achievements and Licensed States */}
                    <div>
                      {/* Key Achievements */}
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white mb-3">Key Achievements</h4>
                        <ul className="space-y-2">
                          {member.achievements.slice(0, 2).map((achievement, i) => (
                            <li key={i} className="text-slate-300 text-xs flex items-center">
                              <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Licensed States */}
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-3">Licensed States</h4>
                        <div className="flex flex-wrap gap-2">
                          {member.licensedStates.map((state, i) => (
                            <span key={i} className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1 text-xs text-green-400">
                              {state}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Contact & Languages */}
                    <div className="border-l border-slate-700/50 pl-6">
                      <div className="grid grid-cols-1 gap-4 text-xs mb-4">
                        <div>
                          <p className="text-slate-500 mb-1">Languages</p>
                          <p className="text-slate-300">{member.languages.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 mb-1">Serving Areas</p>
                          <p className="text-slate-300">{member.servingAreas[0]}+</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <Mail className="w-4 h-4 text-slate-400" />
                          <Linkedin className="w-4 h-4 text-slate-400" />
                        </div>
                        <AnimatedButton className="bg-white text-black hover:bg-slate-100 px-4 py-2 text-xs">
                          <span className="flex items-center">
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
  )
}
