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
    
    // Immediately show success state
    setIsSubmitted(true)
    setFormData({ name: '', email: '', subject: '', message: '' }) // Reset form
    setIsSubmitting(false)
    
    // Submit to backend in background (fire and forget)
    submitContactLead({
      name: formData.name,
      email: formData.email,
      message: `Subject: ${formData.subject}\n\nMessage: ${formData.message}`,
      source: "Contact Page"
    }).then(leadId => {
      if (leadId) {
        if (process.env.NODE_ENV === 'development') {
          console.log('Contact form submitted successfully:', leadId);
        }
      } else {
        console.error('Failed to submit contact form');
      }
    }).catch(error => {
      console.error('Contact form submission error:', error);
      // Note: We don't show error to user since they already saw success
      // You might want to implement background retry or notification
    });
  }

  return (
    <>
      {/* Hero Header Section */}
      <section className="pt-32 pb-8 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Ready to secure your family's future? Let's discuss your insurance needs and find the perfect coverage at the right price.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pt-5 pb-20 bg-transparent relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-card border border-border rounded-3xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Email</p>
                    <p className="text-foreground">info@hawkinsig.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Phone</p>
                    <p className="text-foreground">+1 (817) 800-4253</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Location</p>
                    <p className="text-foreground">San Antonio, TX</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Business Hours</p>
                    <p className="text-foreground">Mon - Fri: 8AM - 6PM CST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-foreground mb-4">Why Choose Hawkins Insurance Group?</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
                  <span className="text-foreground/90">Licensed agents in TX  and 48 other states</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
                  <span className="text-foreground/90">98% client satisfaction rate</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
                  <span className="text-foreground/90">$2M+ in annual savings for our clients</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full mt-2"></div>
                  <span className="text-foreground/90">Personal service and ongoing support</span>
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
              <div className="bg-card border border-border rounded-3xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-foreground mb-6">We'd Love to Hear from You!</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/90 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/90 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground/90 mb-2">
                      Insurance Type
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Medicare, Life Insurance, Group Health, etc."
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground/90 mb-2">
                      Tell Us About Your Needs
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      placeholder="Tell us about your current coverage, family size, budget, or any specific concerns..."
                    ></textarea>
                  </div>

                  <AnimatedButton
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-4 h-4 border-2 border-primary-foreground/60 border-t-transparent rounded-full mr-2"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit
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
                className="bg-card border border-border rounded-3xl p-12 backdrop-blur-sm text-center"
              >
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <Send className="h-10 w-10 text-muted-foreground" />
                  </motion.div>
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">Quote Request Received!</h2>
                <p className="text-xl text-foreground/90 mb-6">
                  Thank you for your interest in our insurance services. We'll contact you within 24 hours with your personalized quote.
                </p>
                <p className="text-muted-foreground">
                  In the meantime, feel free to explore our{" "}
                  <a href="/services" className="text-primary hover:text-primary/80">
                    insurance services
                  </a>{" "}
                  or check out our{" "}
                  <a href="/success-stories" className="text-primary hover:text-primary/80">
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
    </>
  )
}

