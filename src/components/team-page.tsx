"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowRight, Users, Award, Phone, Mail, MapPin, Star, Shield, Heart, Linkedin, Calendar, CheckCircle } from "lucide-react"
import AnimatedButton from "./animated-button"

const teamMembers = [
  {
    id: 1,
    name: "Jonathan Hawkins",
    title: "Founder & Senior Insurance Advisor",
    specialties: ["Medicare Supplements", "Life Insurance", "Business Insurance"],
    licenseNumber: "TX-2345678",
    yearsExperience: 15,
    education: "Bachelor's in Business Administration, Texas A&M University",
    certifications: ["LUTCF", "MDRT", "Texas Licensed Agent"],
    bio: "Michael founded Hawkins Insurance Group with a mission to provide personalized insurance solutions for Texas families and businesses. With over 15 years of experience, he specializes in Medicare planning and has helped thousands of clients navigate complex insurance decisions.",
    achievements: [
      "Million Dollar Round Table (MDRT) Member",
      "Top 1% of Medicare Advisors in Texas",
      "2,500+ Families Protected",
      "Industry Excellence Award 2023"
    ],
    image: "/team/jonathan-hawkins.jpg",
    phone: "(817) 800-4253",
    email: "jhawk@hawkinsig.com",
    linkedin: "https://linkedin.com/in/jonathan-hawkins",
    languages: ["English", "Spanish"],
    servingAreas: ["Dallas-Fort Worth", "Houston", "Austin", "San Antonio"]
  },
  {
    id: 2,
    name: "Kasey",
    title: "Senior Benefits Specialist",
    specialties: ["Group Health Insurance", "Employee Benefits", "COBRA Administration"],
    licenseNumber: "TX-3456789",
    yearsExperience: 12,
    education: "Master's in Human Resources, University of Texas",
    certifications: ["CEBS", "GBA", "Texas Licensed Agent"],
    bio: "Sarah brings over 12 years of expertise in employee benefits and group insurance. She works closely with businesses to design comprehensive benefit packages that attract and retain top talent while managing costs effectively.",
    achievements: [
      "Certified Employee Benefit Specialist",
      "500+ Businesses Served",
      "Employee Benefits Excellence Award",
      "Client Retention Rate: 98%"
    ],
    image: "/team/kasey.jpg",
    phone: "(555) 234-5678",
    email: "info@hawkinsig.com",
    linkedin: "https://linkedin.com/in/sarah-martinez",
    languages: ["English", "Spanish"],
    servingAreas: ["Dallas-Fort Worth", "Houston", "East Texas"]
  },
  {
    id: 3,
    name: "Calvin Marley",
    title: "Family Insurance Advisor",
    specialties: ["Individual Health Plans", "Family Coverage", "ACA Marketplace"],
    licenseNumber: "TX-4567890",
    yearsExperience: 8,
    education: "Bachelor's in Finance, Rice University",
    certifications: ["AHIP", "Texas Licensed Agent", "Marketplace Certified"],
    bio: "David specializes in helping individuals and families find affordable health insurance coverage. His expertise in ACA Marketplace plans and subsidy optimization has saved clients thousands of dollars annually.",
    achievements: [
      "ACA Marketplace Expert",
      "1,200+ Individuals Covered",
      "Average Savings: $3,600/year",
      "Perfect Customer Satisfaction Score"
    ],
    image: "/team/cal-marley.jpg",
    phone: "(555) 345-6789",
    email: "cal@hawkinsig.com",
    linkedin: "https://linkedin.com/in/calvin-marley",
    languages: ["English", "Mandarin"],
    servingAreas: ["Fort Worth", "Austin", "Central Texas"]
  },
  {
    id: 4,
    name: "Lisa Thompson",
    title: "Senior Life Insurance Specialist",
    specialties: ["Term Life Insurance", "Whole Life Insurance", "Final Expense"],
    licenseNumber: "TX-5678901",
    yearsExperience: 10,
    education: "Bachelor's in Marketing, Baylor University",
    certifications: ["LUTCF", "FLMI", "Texas Licensed Agent"],
    bio: "Lisa is passionate about helping families protect their financial future through comprehensive life insurance planning. She takes a consultative approach to understand each family's unique needs and goals.",
    achievements: [
      "Life Underwriter Training Council Fellow",
      "800+ Families Protected",
      "Life Insurance Expert of the Year",
      "Community Service Award"
    ],
    image: "/team/lisa-thompson.jpg",
    phone: "(555) 456-7890",
    email: "info@hawkinsig.com",
    linkedin: "https://linkedin.com/in/lisa-thompson",
    languages: ["English"],
    servingAreas: ["Dallas-Fort Worth", "North Texas", "Oklahoma"]
  }
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-500/20 to-slate-600/20 border border-slate-500/30 rounded-full text-sm text-white">
              <Phone className="w-4 h-4 mr-2" />
              Call us: (817) 800-4253
              <Mail className="w-4 h-4 ml-4 mr-2" />
              Licensed in Texas
            </div>
          </motion.div>
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
            Our Licensed Professionals
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
                className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-slate-700/50 transition-all duration-300 group"
                style={{
                  boxShadow: selectedMember === member.id ? "0 20px 40px rgba(71, 85, 105, 0.1)" : "none",
                }}
              >
                {/* Profile Header */}
                <div className="relative h-64 bg-gradient-to-br from-slate-700 to-slate-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-500/20 to-slate-600/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="w-20 h-20 text-white/30" />
                  </div>
                  {/* License Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1 text-xs text-green-400">
                      Licensed TX
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Basic Info */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-slate-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-slate-400 text-sm mb-2">{member.title}</p>
                    <p className="text-slate-500 text-xs">License: {member.licenseNumber} • {member.yearsExperience} Years Experience</p>
                  </div>

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

                  {/* Contact & Languages */}
                  <div className="border-t border-slate-700/50 pt-4">
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-slate-500 mb-1">Languages</p>
                        <p className="text-slate-300">{member.languages.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 mb-1">Serving Areas</p>
                        <p className="text-slate-300">{member.servingAreas[0]}+</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center bg-slate-900/50 border border-slate-800/50 rounded-3xl p-12 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Work with Our Team?</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Our licensed professionals are ready to help you find the perfect insurance solution. 
            Schedule a consultation with the team member who best matches your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton className="bg-white text-black hover:bg-slate-100 px-8 py-4 text-lg">
              <span className="flex items-center">
                Schedule Consultation
                <Calendar className="ml-2 h-5 w-5" />
              </span>
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
            >
              View All Credentials
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
