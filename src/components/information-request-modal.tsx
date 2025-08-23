"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useModal, InformationRequestData } from '@/contexts/modal-context'

interface InformationRequestModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function InformationRequestModal({ isOpen, onClose }: InformationRequestModalProps) {
  const { informationRequestData, setInformationRequestData } = useModal()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const serviceOptions = [
    "Medicare Solutions",
    "Family Health Insurance", 
    "Group Health Insurance",
    "Dental & Vision",
    "Life Insurance",
    "Supplemental Coverage",
    "Financial Planning",
    "Estate Planning",
    "Other"
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Information request submission:', informationRequestData)
      
      const message = informationRequestData.requestType === 'waitlist' 
        ? `Thank you for joining the waitlist for ${informationRequestData.service}! We'll notify you when it's available.`
        : `Thank you for your interest in ${informationRequestData.service}! We'll contact you within 24 hours with more information.`
      
      alert(message)
      
      // Reset form
      setInformationRequestData({ 
        name: '', 
        email: '', 
        service: '', 
        requestType: 'information' 
      })
      onClose()
    } catch (error) {
      console.error('Error submitting information request:', error)
      alert('There was an error submitting your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (field: keyof InformationRequestData, value: string | 'waitlist' | 'information') => {
    setInformationRequestData({ ...informationRequestData, [field]: value })
  }

  const getTitle = () => {
    return informationRequestData.requestType === 'waitlist' 
      ? 'Join the Waitlist' 
      : 'Get More Information'
  }

  const getButtonText = () => {
    if (isSubmitting) return 'Submitting...'
    return informationRequestData.requestType === 'waitlist' 
      ? 'Join Waitlist' 
      : 'Get Information'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-slate-900/90 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div 
              className="bg-white dark:bg-slate-800 border border-border rounded-2xl p-8 w-full max-w-md shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">{getTitle()}</h2>
                <button
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-foreground/80 text-center mb-6">
                  {informationRequestData.requestType === 'waitlist' 
                    ? `Be the first to know when ${informationRequestData.service} is available!`
                    : `We'll send you detailed information about ${informationRequestData.service || 'our services'}.`
                  }
                </p>

                <div>
                  <label htmlFor="info-name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    id="info-name"
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-background dark:bg-slate-800 border border-border dark:border-slate-600 rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    value={informationRequestData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="info-email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    id="info-email"
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-background dark:bg-slate-800 border border-border dark:border-slate-600 rounded-xl text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    value={informationRequestData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="info-service" className="block text-sm font-medium text-foreground mb-2">
                    Service Interest
                  </label>
                  <select
                    id="info-service"
                    required
                    className="w-full px-4 py-3 bg-background dark:bg-slate-800 border border-border dark:border-slate-600 rounded-xl text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                    value={informationRequestData.service}
                    onChange={(e) => updateFormData('service', e.target.value)}
                  >
                    <option value="">Select a service</option>
                    {serviceOptions.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground px-8 py-3 rounded-xl font-medium transition-colors duration-200"
                >
                  {getButtonText()}
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
