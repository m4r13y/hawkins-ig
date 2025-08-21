"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useState } from "react"
import AnimatedButton from "./animated-button"
import { submitContactLead } from '../lib/firebase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await submitContactLead({
        name: formData.name,
        email: formData.email,
        message: `Subject: ${formData.subject}\n\nMessage: ${formData.message}`,
        source: "Contact Page"
      })
      setIsSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' }) // Reset form
    } catch (error) {
      console.error('Form submission error:', error)
      // Handle error - you might want to show an error message to the user
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Ready to secure your family's future? Let's discuss your insurance needs and find the perfect coverage at the right price.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-500/20 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Email</p>
                    <p className="text-white">info@hawkinsig.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-500/20 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Phone</p>
                    <p className="text-white">+1 (817) 800-4253</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-500/20 rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white">San Antonio, TX</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-slate-500/20 rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Business Hours</p>
                    <p className="text-white">Mon - Fri: 8AM - 6PM CST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-white mb-4">Why Choose Hawkins Insurance Group?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-slate-500 rounded-full mt-2"></div>
                  <span className="text-slate-300">Licensed agents in TX  and 48 other states</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-slate-500 rounded-full mt-2"></div>
                  <span className="text-slate-300">98% client satisfaction rate</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-slate-500 rounded-full mt-2"></div>
                  <span className="text-slate-300">$2M+ in annual savings for our clients</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-slate-500 rounded-full mt-2"></div>
                  <span className="text-slate-300">Personal service and ongoing support</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {!isSubmitted ? (
              <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">Get Your Free Quote</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
                      Insurance Type
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                      placeholder="Medicare, Life Insurance, Group Health, etc."
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                      Tell Us About Your Needs
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500"
                      placeholder="Tell us about your current coverage, family size, budget, or any specific concerns..."
                    ></textarea>
                  </div>

                  <AnimatedButton
                    type="submit"
                    className="w-full bg-white text-black hover:bg-gray-100"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Get Started
                      </>
                    )}
                  </AnimatedButton>
                </form>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 backdrop-blur-sm text-center"
              >
                <div className="w-20 h-20 bg-slate-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <Send className="h-10 w-10 text-slate-500" />
                  </motion.div>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Quote Request Received!</h2>
                <p className="text-xl text-slate-300 mb-6">
                  Thank you for your interest in our insurance services. We'll contact you within 24 hours with your personalized quote.
                </p>
                <p className="text-slate-400">
                  In the meantime, feel free to explore our{" "}
                  <a href="/services" className="text-slate-400 hover:text-slate-300">
                    insurance services
                  </a>{" "}
                  or check out our{" "}
                  <a href="/success-stories" className="text-slate-400 hover:text-slate-300">
                    client success stories
                  </a>
                  .
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
