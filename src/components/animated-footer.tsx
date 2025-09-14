"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, ArrowRight, ExternalLink } from "lucide-react"
import AnimatedButton from "./animated-button"
import { submitNewsletterSubscription } from "@/lib/firebase"
import { trackNewsletterSignup } from "./form-tracking"
import MedicareDisclaimer from "./medicare-disclaimer"

export default function AnimatedFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    
    setIsSubmitting(true)
    
    try {
      const result = await submitNewsletterSubscription({
        email: email.trim(),
        source: 'footer_newsletter'
      })
      
      const responseData = result.data as any
      
      if (responseData?.success) {
        // Track the newsletter signup
        await trackNewsletterSignup(email.trim(), 'footer_newsletter')
        
        setIsSubscribed(true)
        setEmail("")
        setTimeout(() => setIsSubscribed(false), 5000)
      } else {
        throw new Error('Subscription failed')
      }
    } catch (error: any) {
      console.error("Newsletter subscription error:", error)
      alert(error.message || "There was an error subscribing. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="relative bg-transparent border-t border-gray-200 dark:border-gray-800/50">
      {/* Newsletter Section */}
      <div className="relative z-10 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Stay Informed About Your Coverage</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get important updates about insurance changes, enrollment periods, and money-saving tips delivered to your inbox.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubscribe}
            className="max-w-md mx-auto"
          >
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-transparent border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  required
                />
              </div>
              <AnimatedButton
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-5 w-5"
                  >
                    ⟳
                  </motion.div>
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </AnimatedButton>
            </div>
            {isSubscribed && (
              <p className="text-primary text-center mt-4 animate-fade-in">Thanks for subscribing!</p>
            )}
          </motion.form>
        </div>
      </div>

      {/* Main Footer Content - Redesigned */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Top Section: Logo, Description & CTA */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Logo */}
            <div className="flex justify-center">
              <Image
                src="/hig-logo-navy.svg"
                alt="Hawkins Insurance Group, LLC"
                width={300}
                height={100}
                className="h-20 w-auto dark:hidden"
              />
              <Image
                src="/hig-logo-white.svg"
                alt="Hawkins Insurance Group, LLC"
                width={300}
                height={100}
                className="h-20 w-auto hidden dark:block"
              />
            </div>

            {/* Mission Statement */}
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Family-owned insurance agency serving Texas families and businesses with personalized health insurance solutions.
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center space-x-6 pt-4">
              {[
                { icon: Instagram, href: "http://instagram.com/theinsurancehawk", label: "Instagram" },
                { icon: Facebook, href: "https://www.facebook.com/people/The-Insurance-Hawk/61563388870467/", label: "Facebook" },
                { icon: Youtube, href: "https://www.youtube.com/@theinsurancehawk9030", label: "YouTube" },
              ].map(({ icon: Icon, href, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={href} className="group" aria-label={label} target="_blank" rel="noopener noreferrer">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                      <Icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Section: Navigation Grid */}
        <div className="border-t border-border pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Services Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-6">Services</h4>
              <ul className="space-y-3">
                {[
                  "Medicare Supplement",
                  "Medicare Advantage", 
                  "Medicare Part D",
                  "Life Insurance",
                  "Dental Insurance"
                ].map((service, index) => (
                  <li key={service}>
                    <Link 
                      href="/services" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Company Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-6">Company</h4>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Team", href: "/team" },
                  { name: "Success Stories", href: "/success-stories" },
                  { name: "Contact", href: "/contact" },
                  { name: "Get Started", href: "/get-started" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-6">Legal</h4>
              <ul className="space-y-3">
                {[
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Accessibility", href: "/accessibility" },
                  { name: "HIPAA Notice", href: "/hipaa" }
                ].map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <a 
                    href="https://www.medicare.gov" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm inline-flex items-center"
                  >
                    Medicare.gov <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Contact Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-6">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a href="mailto:info@hawkinsig.com" className="text-sm text-foreground hover:text-primary transition-colors">
                      info@hawkinsig.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href="tel:8178004253" className="text-sm text-foreground hover:text-primary transition-colors">
                      (817) 800-4253
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-sm text-foreground">Fort Worth, TX</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Disclaimers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8 mt-12"
        >
          <div className="space-y-6">
            {/* Medicare Disclaimer */}
            <div className="border-b border-border/50 pb-6">
              <MedicareDisclaimer variant="footer" />
            </div>

            {/* Compliance Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">License Information</h4>
                <p>Licensed insurance agency. All agents licensed in their respective states. License numbers available upon request.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Insurance Disclosure</h4>
                <p>Plans have limitations and exclusions. Please review documents carefully. Coverage and premiums may vary by location.</p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Website Compliance</h4>
                <p>Complies with ADA guidelines, HIPAA requirements, and Medicare marketing regulations.</p>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-border pt-6 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Hawkins Insurance Group, LLC. All rights reserved. Not affiliated with or endorsed by Medicare.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

