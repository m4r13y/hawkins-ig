"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
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

const STORAGE_KEY = 'cookie-consent'
const PREFERENCES_KEY = 'cookie-preferences'

export default function CookieConsent({ onAccept, onDecline, onCustomize }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false
  })

  // SSR-safe check for localStorage
  const isBrowser = typeof window !== 'undefined'

  // Memoized localStorage operations with error handling
  const saveToStorage = useCallback((key: string, value: string) => {
    if (!isBrowser) return false
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      console.warn(`Failed to save to localStorage (${key}):`, error)
      return false
    }
  }, [isBrowser])

  const getFromStorage = useCallback((key: string): string | null => {
    if (!isBrowser) return null
    try {
      return localStorage.getItem(key)
    } catch (error) {
      console.warn(`Failed to read from localStorage (${key}):`, error)
      return null
    }
  }, [isBrowser])

  // Memoized preference handlers
  const updatePreferences = useCallback((newPreferences: CookiePreferences) => {
    setPreferences(newPreferences)
    saveToStorage(PREFERENCES_KEY, JSON.stringify(newPreferences))
    onCustomize?.(newPreferences)
  }, [saveToStorage, onCustomize])

  const acceptAll = useCallback(() => {
    const allPreferences: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    
    updatePreferences(allPreferences)
    saveToStorage(STORAGE_KEY, 'accepted')
    setIsVisible(false)
    onAccept?.()
  }, [updatePreferences, saveToStorage, onAccept])

  const declineAll = useCallback(() => {
    const minimalPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    
    updatePreferences(minimalPreferences)
    saveToStorage(STORAGE_KEY, 'declined')
    setIsVisible(false)
    onDecline?.()
  }, [updatePreferences, saveToStorage, onDecline])

  const saveCustomPreferences = useCallback(() => {
    updatePreferences(preferences)
    saveToStorage(STORAGE_KEY, 'customized')
    setIsVisible(false)
    setShowSettings(false)
  }, [preferences, updatePreferences, saveToStorage])

  // Optimized preference toggle
  const togglePreference = useCallback((key: keyof CookiePreferences) => {
    if (key === 'necessary') return // Can't disable necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }, [])

  // Check consent status on mount
  useEffect(() => {
    if (!isBrowser) return

    const consentStatus = getFromStorage(STORAGE_KEY)
    
    if (!consentStatus) {
      // Show banner after a short delay to avoid layout shift
      const timer = setTimeout(() => setIsVisible(true), 1000)
      return () => clearTimeout(timer)
    } else {
      // Load saved preferences
      const savedPreferences = getFromStorage(PREFERENCES_KEY)
      if (savedPreferences) {
        try {
          const parsed = JSON.parse(savedPreferences)
          setPreferences(prev => ({ ...prev, ...parsed }))
        } catch (error) {
          console.warn('Failed to parse saved cookie preferences:', error)
        }
      }
    }
  }, [isBrowser, getFromStorage])

  // Memoized animation variants to prevent recreation
  const bannerVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 100
    },
    visible: { 
      opacity: 1, 
      y: 0
    },
    exit: { 
      opacity: 0, 
      y: 100
    }
  }), [])

  const settingsVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      scale: 1
    },
    exit: { 
      opacity: 0, 
      scale: 0.9
    }
  }), [])

  // Cookie categories configuration
  const cookieCategories = useMemo(() => [
    {
      key: 'necessary' as keyof CookiePreferences,
      title: 'Necessary Cookies',
      description: 'Essential for website functionality and security. Cannot be disabled.',
      required: true
    },
    {
      key: 'functional' as keyof CookiePreferences,
      title: 'Functional Cookies',
      description: 'Remember your preferences and improve your experience.',
      required: false
    },
    {
      key: 'analytics' as keyof CookiePreferences,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors use our website.',
      required: false
    },
    {
      key: 'marketing' as keyof CookiePreferences,
      title: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements.',
      required: false
    }
  ], [])

  if (!isVisible) return null

  return (
    <>
      {/* Main Cookie Banner */}
      <AnimatePresence mode="wait">
        {!showSettings && (
          <motion.div
            variants={bannerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-border shadow-2xl"
            role="banner"
            aria-labelledby="cookie-consent-title"
          >
            <div className="max-w-7xl mx-auto p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 id="cookie-consent-title" className="text-lg font-semibold text-foreground mb-2">
                        We Value Your Privacy
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        We use cookies to enhance your browsing experience, serve personalized content, 
                        and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. 
                        You can customize your preferences or learn more in our{' '}
                        <Link 
                          href="/privacy" 
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Privacy Policy
                          <ExternalLink className="w-3 h-3 inline ml-1" />
                        </Link>.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Customize cookie preferences"
                  >
                    <Settings className="w-4 h-4" />
                    Customize
                  </button>
                  
                  <button
                    onClick={declineAll}
                    className="px-6 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-border"
                  >
                    Decline All
                  </button>
                  
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50"
              onClick={() => setShowSettings(false)}
              aria-hidden="true"
            />
            
            {/* Settings Panel */}
            <motion.div
              variants={settingsVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed inset-4 md:inset-8 lg:inset-16 z-50 bg-background border border-border rounded-lg shadow-2xl overflow-hidden"
              role="dialog"
              aria-labelledby="cookie-settings-title"
              aria-modal="true"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 id="cookie-settings-title" className="text-xl font-bold text-foreground">
                    Cookie Preferences
                  </h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label="Close cookie settings"
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <p className="text-muted-foreground mb-6">
                    Manage your cookie preferences below. You can enable or disable different types 
                    of cookies based on your preferences.
                  </p>

                  <div className="space-y-6">
                    {cookieCategories.map((category) => (
                      <div key={category.key} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{category.title}</h3>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences[category.key]}
                              onChange={() => togglePreference(category.key)}
                              disabled={category.required}
                              className="sr-only"
                            />
                            <div className={`w-11 h-6 rounded-full transition-colors ${
                              preferences[category.key] 
                                ? 'bg-blue-600 dark:bg-blue-500' 
                                : 'bg-muted'
                            } ${category.required ? 'opacity-50 cursor-not-allowed' : ''}`}>
                              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                                preferences[category.key] ? 'translate-x-5' : 'translate-x-0.5'
                              } mt-0.5`} />
                            </div>
                            <span className="sr-only">
                              {category.required ? 'Required' : 'Optional'} - {category.title}
                            </span>
                          </label>
                        </div>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                        {category.required && (
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Required for website functionality</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row gap-3 p-6 border-t border-border bg-muted/30">
                  <button
                    onClick={declineAll}
                    className="flex-1 px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-border"
                  >
                    Decline All Optional
                  </button>
                  
                  <button
                    onClick={acceptAll}
                    className="flex-1 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Accept All
                  </button>
                  
                  <button
                    onClick={saveCustomPreferences}
                    className="flex-1 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
