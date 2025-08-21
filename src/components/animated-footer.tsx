"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin, ArrowRight, ExternalLink } from "lucide-react"
import AnimatedButton from "./animated-button"
import { submitNewsletterSubscription } from "@/lib/firebase"
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
    <footer className="relative bg-background border-t border-gray-200 dark:border-gray-800/50">
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
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
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
              <p className="text-primary text-center mt-4 animate-fade-in">Thanks for subscribing! 🎉</p>
            )}
          </motion.form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="group flex justify-center lg:justify-start">
              {/* Light mode logo */}
              <Image
                src="/hig-logo-navy.svg"
                alt="Hawkins Insurance Group, LLC"
                width={300}
                height={100}
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105 dark:hidden"
              />
              {/* Dark mode logo */}
              <Image
                src="/hig-logo-white.svg"
                alt="Hawkins Insurance Group, LLC"
                width={300}
                height={100}
                className="h-16 w-auto transition-transform duration-300 group-hover:scale-105 hidden dark:block"
              />
            </div>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              Hawkins Insurance Group is a family-owned insurance agency serving Texas families and businesses with 
              personalized health insurance solutions. We make insurance simple and affordable.
            </p>

            {/* Social Links */}
            <div className="flex space-x-6 justify-center lg:justify-start">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={href} className="group relative" aria-label={label}>
                    <div className="w-12 h-12 bg-muted border border-border rounded-lg flex items-center justify-center group-hover:bg-muted/80 group-hover:border-border/80 transition-colors">
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links and Contact */}
          <div className="col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center sm:text-left">
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-8">Our Services</h4>
              <ul className="space-y-6">
                {[
                  { name: "Medicare Supplement", href: "/services" },
                  { name: "Medicare Advantage", href: "/services" },
                  { name: "Medicare Part D", href: "/services" },
                  { name: "Life Insurance", href: "/services" },
                  { name: "Dental Insurance", href: "/services" },
                  { name: "Cancer Insurance", href: "/services" },
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center justify-center sm:justify-start group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200 mr-0 group-hover:mr-2" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-8">Company</h4>
              <ul className="space-y-6">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Team", href: "/team" },
                  { name: "Success Stories", href: "/success-stories" },
                  { name: "Contact Us", href: "/contact" },
                  { name: "Get Started", href: "/get-started" },
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center justify-center sm:justify-start group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200 mr-0 group-hover:mr-2" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Compliance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-8">Legal & Compliance</h4>
              <ul className="space-y-6">
                {[
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Accessibility", href: "/accessibility" },
                  { name: "HIPAA Notice", href: "/hipaa" },
                ].map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center justify-center sm:justify-start group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200 mr-0 group-hover:mr-2" />
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <a 
                    href="https://www.medicare.gov" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center justify-center sm:justify-start group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-200 mr-0 group-hover:mr-2" />
                    Medicare.gov <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-foreground mb-6">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-muted-foreground justify-center sm:justify-start">
                  <Mail className="h-5 w-5 text-primary" />
                  <span>info@hawkinsig.com</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground justify-center sm:justify-start">
                  <Phone className="h-5 w-5 text-primary" />
                  <span>(817) 800-4253</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground justify-center sm:justify-start">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Fort Worth, TX</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
</div>
        {/* Medicare Disclaimer Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8 mt-12"
        >
          <MedicareDisclaimer variant="footer" />
        </motion.div>

        {/* Compliance & Legal Notices */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8 mt-8"
        >
          <div className="space-y-6 text-xs text-muted-foreground">
            
            {/* License Information */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium text-foreground mb-2">License Information</h4>
              <p>
                Hawkins Insurance Group is a licensed insurance agency. All insurance agents are licensed 
                in their respective states. License numbers available upon request and can be verified 
                through your state's insurance department website.
              </p>
            </div>

            {/* Additional Disclaimers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Insurance Disclosure</h4>
                <p>
                  Insurance plans have limitations and exclusions. Please review plan documents carefully. 
                  Not all plans are available in all areas. Coverage and premiums may vary by location.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">Website Compliance</h4>
                <p>
                  This website complies with ADA accessibility guidelines, HIPAA privacy requirements, 
                  and Medicare marketing regulations. We are committed to providing equal access to all users.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="border-t border-border pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-center md:text-left">
            <div>
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Hawkins Insurance Group, LLC. All rights reserved.
              </p>
              <p className="text-muted-foreground text-sm mt-1">
                Licensed insurance agency. Not affiliated with or endorsed by Medicare or any government agency.
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-muted-foreground hover:text-foreground transition-colors">
                Accessibility
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
