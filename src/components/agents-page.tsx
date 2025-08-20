"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowRight, Users, Award, Phone, Mail, MapPin, Star, Shield, Heart } from "lucide-react"
import AnimatedButton from "./animated-button"

const successMetrics = [
  { value: "2,500+", label: "Families Protected", description: "Through our insurance solutions" },
  { value: "15+", label: "Years Experience", description: "Serving Texas communities" },
  { value: "98%", label: "Client Satisfaction", description: "Based on customer reviews" },
  { value: "24/7", label: "Claims Support", description: "When you need us most" },
]

export default function AgentsPage() {
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
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Our Insurance Team</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Licensed insurance professionals dedicated to protecting what matters most to you and your family
          </p>

          {/* Contact Info */}
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

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
        >
          {successMetrics.map((metric, index) => (
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
                {metric.value}
              </motion.div>
              <div className="text-sm font-medium text-slate-300 mb-1">{metric.label}</div>
              <div className="text-xs text-slate-500">{metric.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Platform Features Showcase */}
        <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-white text-center mb-12"
          >
            Introducing HawkNest Admin Platform
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-slate-400 text-center max-w-4xl mx-auto mb-16"
          >
            Our proprietary agent portal designed to streamline your workflow, organize your clients, 
            and maximize your efficiency. Built specifically for insurance professionals.
          </motion.p>

          {/* Main Platform Demo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden mb-16"
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                background: [
                  "radial-gradient(circle at 20% 20%, rgba(71,85,105,0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 80%, rgba(30,41,59,0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 80%, rgba(71,85,105,0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 80% 20%, rgba(30,41,59,0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 20% 20%, rgba(71,85,105,0.1) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
            />

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">Complete Agent Management System</h3>
                <p className="text-lg text-slate-400">Everything you need to run your insurance business efficiently</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Client Management */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-center mb-4">
                    <Users className="w-8 h-8 text-slate-400 mr-3" />
                    <h4 className="text-xl font-bold text-white">Client Management</h4>
                  </div>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Complete client profiles & history
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Policy tracking & renewals
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Automated follow-up reminders
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Secure document storage
                    </li>
                  </ul>
                </div>

                {/* Analytics Dashboard */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-center mb-4">
                    <Shield className="w-8 h-8 text-slate-400 mr-3" />
                    <h4 className="text-xl font-bold text-white">Analytics & Reporting</h4>
                  </div>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Real-time performance metrics
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Commission tracking & forecasting
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Client acquisition analytics
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Customizable dashboard layout
                    </li>
                  </ul>
                </div>

                {/* Client Portal Integration */}
                <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-center mb-4">
                    <Heart className="w-8 h-8 text-slate-400 mr-3" />
                    <h4 className="text-xl font-bold text-white">Client Portal Sync</h4>
                  </div>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Bidirectional data synchronization
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Secure client communications
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Document sharing & requests
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-slate-500 rounded-full mr-3" />
                      Real-time policy updates
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-12">
                <AnimatedButton className="bg-white text-black hover:bg-slate-100 px-8 py-4 text-lg mr-4">
                  <span className="flex items-center">
                    Request Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </AnimatedButton>
                <AnimatedButton
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
                >
                  Learn More
                </AnimatedButton>
              </div>
            </div>
          </motion.div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Agent Onboarding",
                description: "Guided 7-step setup with progress tracking and validation"
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Data Import Tools",
                description: "CSV import with smart mapping and validation engine"
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Network Collaboration",
                description: "Agent discovery, referrals, and file sharing capabilities"
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Mobile Optimized",
                description: "Full responsive design with offline support capabilities"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-6 backdrop-blur-sm text-center"
              >
                <div className="flex justify-center mb-4 text-slate-400">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{feature.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
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
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Protect What Matters Most?</h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Join thousands of satisfied clients who trust Hawkins Insurance Group for their protection needs. Let's discuss your insurance goals and create a custom plan for you and your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <AnimatedButton className="bg-white text-black hover:bg-slate-100 px-8 py-4 text-lg">
              <span className="flex items-center">
                Get Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </AnimatedButton>
            <AnimatedButton
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg"
            >
              Meet Our Team
            </AnimatedButton>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
