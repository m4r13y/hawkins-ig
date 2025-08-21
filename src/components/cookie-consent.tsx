"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, Settings, X, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface CookieConsentProps {
  onAccept?: () => void
  onDecline?: () => void
  onCustomize?: (preferences: CookiePreferences) => void
}

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export default function CookieConsent({ onAccept, onDecline, onCustomize }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Check if user has already made a choice with error handling
    try {
      const cookieConsent = localStorage.getItem('cookie-consent')
      if (!cookieConsent) {
        // Show banner after a short delay
        const timer = setTimeout(() => setIsVisible(true), 1000)
        return () => clearTimeout(timer)
      }
    } catch (error) {
      console.warn('Failed to access localStorage for cookie consent:', error)
      // Show banner if localStorage fails
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem('cookie-preferences', JSON.stringify(allPreferences))
    setIsVisible(false)
    onAccept?.()
  }

  const declineAll = () => {
    const minimalPreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    
    localStorage.setItem('cookie-consent', 'declined')
    localStorage.setItem('cookie-preferences', JSON.stringify(minimalPreferences))
    setIsVisible(false)
    onDecline?.()
  }

  const savePreferences = () => {
    localStorage.setItem('cookie-consent', 'customized')
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences))
    setIsVisible(false)
    setShowSettings(false)
    onCustomize?.(preferences)
  }

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }))
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-700 shadow-2xl"
      >
        {!showSettings ? (
          // Main Cookie Banner
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              <div className="flex items-start space-x-4 flex-1">
                <div className="bg-blue-500/20 p-3 rounded-lg flex-shrink-0">
                  <Cookie className="h-6 w-6 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-white">We Use Cookies</h3>
                  <p className="text-sm text-slate-300 max-w-2xl">
                    We use cookies to enhance your browsing experience, provide personalized content, 
                    analyze our traffic, and improve our services. By clicking "Accept All", you consent 
                    to our use of cookies.
                  </p>
                  <div className="flex items-center space-x-4 text-xs">
                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                      Privacy Policy <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                    <Link href="/terms" className="text-blue-400 hover:text-blue-300 inline-flex items-center">
                      Terms of Service <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Customize
                </button>
                <button
                  onClick={declineAll}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Decline All
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Cookie Settings Panel
          <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Cookie Preferences</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Necessary Cookies */}
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-white">Necessary Cookies</h4>
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Always Active
                  </div>
                </div>
                <p className="text-sm text-slate-300 mb-4">
                  These cookies are essential for the website to function properly. They enable basic 
                  functionality like page navigation, access to secure areas, and form submissions.
                </p>
                <div className="text-xs text-slate-400">
                  Examples: Session management, security tokens, form data
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-white">Analytics Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={(e) => updatePreference('analytics', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-slate-300 mb-4">
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously.
                </p>
                <div className="text-xs text-slate-400">
                  Examples: Google Analytics, page views, user behavior patterns
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-white">Marketing Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => updatePreference('marketing', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-slate-300 mb-4">
                  These cookies are used to deliver personalized advertisements and track their effectiveness.
                </p>
                <div className="text-xs text-slate-400">
                  Examples: Ad targeting, conversion tracking, remarketing
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-medium text-white">Functional Cookies</h4>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => updatePreference('functional', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-slate-300 mb-4">
                  These cookies enable enhanced functionality and personalization, such as remembering 
                  your preferences and settings.
                </p>
                <div className="text-xs text-slate-400">
                  Examples: Language preferences, theme settings, chat widgets
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-slate-700">
              <button
                onClick={() => setShowSettings(false)}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePreferences}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
