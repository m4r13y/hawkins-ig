"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Phone, User, MessageSquare, Send, CheckCircle } from "lucide-react"
import AnimatedButton from "./animated-button"
import { useModal } from "@/contexts/modal-context"

export default function GlobalContactFormModal() {
  const { 
    isContactFormModalOpen, 
    setIsContactFormModalOpen, 
    contactFormData 
  } = useModal()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "email"
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Update subject when contactFormData changes
  useEffect(() => {
    if (contactFormData.memberName) {
      setFormData(prev => ({
        ...prev,
        subject: `Contact Request for ${contactFormData.memberName}`
      }))
    }
  }, [contactFormData.memberName])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
    
    // Reset form after 3 seconds and close modal
    setTimeout(() => {
      handleClose()
    }, 3000)
  }

  const handleClose = () => {
    setIsSubmitted(false)
    setIsSubmitting(false)
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      preferredContact: "email"
    })
    setIsContactFormModalOpen(false)
  }

  if (!isContactFormModalOpen) return null

  return (
    <AnimatePresence>
      {isContactFormModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-slate-900/90 backdrop-blur-sm z-[60]"
            onClick={handleClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={handleClose}
          >
            <div 
              className="bg-white dark:bg-slate-800 border border-border rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Contact {contactFormData.memberName || 'Our Team'}
                  </h2>
                  <p className="text-muted-foreground text-sm">Get in touch with our insurance expert</p>
                  {contactFormData.memberPhone && (
                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                      <Phone className="inline w-4 h-4 mr-1" />
                      {contactFormData.memberPhone}
                    </p>
                  )}
                  {contactFormData.memberEmail && (
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      <Mail className="inline w-4 h-4 mr-1" />
                      {contactFormData.memberEmail}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
                {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      <User className="inline w-4 h-4 mr-2" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background dark:bg-slate-800 border border-border dark:border-slate-600 rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      <Mail className="inline w-4 h-4 mr-2" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-background dark:bg-slate-800 border border-border dark:border-slate-600 rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      <Phone className="inline w-4 h-4 mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background dark:bg-slate-800 border border-border dark:border-slate-600 rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label htmlFor="preferredContact" className="block text-sm font-medium text-foreground mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      id="preferredContact"
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background dark:bg-slate-800 border border-border dark:border-slate-600 rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="text">Text Message</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-background dark:bg-slate-800 border border-border dark:border-slate-600 rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    <MessageSquare className="inline w-4 h-4 mr-2" />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background dark:bg-slate-800 border border-border dark:border-slate-600 rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
                    placeholder="Please describe what insurance services you're interested in or any questions you have..."
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-3 border border-border rounded-xl text-muted-foreground hover:bg-muted transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <AnimatedButton
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground font-medium rounded-xl transition-colors duration-200 flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </AnimatedButton>
                </div>
              </form>
            ) : (
              /* Success Message */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Message Sent Successfully!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out to {contactFormData.memberName || 'our team'}. 
                  We'll get back to you within 24 hours.
                </p>
                <p className="text-sm text-muted-foreground">
                  This window will close automatically...
                </p>
              </motion.div>
            )}
          </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
