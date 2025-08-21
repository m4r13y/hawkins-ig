"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accessibility, Eye, EarOff, Type, MousePointer } from 'lucide-react'

interface AccessibilitySettings {
  fontSize: 'small' | 'normal' | 'large' | 'extra-large'
  contrast: 'normal' | 'high' | 'inverted'
  reduceMotion: boolean
}

export default function ADAAccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 'normal',
    contrast: 'normal',
    reduceMotion: false
  })

  // SSR-safe check for document
  const isBrowser = typeof window !== 'undefined'

  // Memoized font size adjustment
  const adjustFontSize = useCallback((size: AccessibilitySettings['fontSize']) => {
    if (!isBrowser) return
    
    setSettings(prev => ({ ...prev, fontSize: size }))
    
    const root = document.documentElement
    const currentSize = root.getAttribute('data-font-size')
    if (currentSize === size) return
    
    // Use data attributes for CSS targeting
    root.setAttribute('data-font-size', size)
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem('ada-font-size', size)
    } catch (error) {
      console.warn('Failed to save font size preference:', error)
    }
  }, [isBrowser])

  // Memoized contrast adjustment
  const adjustContrast = useCallback((contrast: AccessibilitySettings['contrast']) => {
    if (!isBrowser) return
    
    setSettings(prev => ({ ...prev, contrast }))
    
    const body = document.body
    const currentContrast = body.getAttribute('data-contrast')
    if (currentContrast === contrast) return
    
    // Use data attributes for CSS targeting
    body.setAttribute('data-contrast', contrast)
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem('ada-contrast', contrast)
    } catch (error) {
      console.warn('Failed to save contrast preference:', error)
    }
  }, [isBrowser])

  // Memoized motion reduction toggle
  const toggleReduceMotion = useCallback(() => {
    if (!isBrowser) return
    
    const newValue = !settings.reduceMotion
    setSettings(prev => ({ ...prev, reduceMotion: newValue }))
    
    const root = document.documentElement
    root.setAttribute('data-reduce-motion', newValue.toString())
    
    // Store in localStorage for persistence
    try {
      localStorage.setItem('ada-reduce-motion', newValue.toString())
    } catch (error) {
      console.warn('Failed to save motion preference:', error)
    }
  }, [settings.reduceMotion, isBrowser])

  // Optimized screen reader announcement
  const announceForScreenReader = useCallback((message: string) => {
    if (!isBrowser) return
    
    // Use a single persistent element for announcements
    let announcement = document.getElementById('ada-announcements')
    if (!announcement) {
      announcement = document.createElement('div')
      announcement.id = 'ada-announcements'
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      document.body.appendChild(announcement)
    }
    
    announcement.textContent = message
    
    // Clear after announcement
    setTimeout(() => {
      if (announcement) announcement.textContent = ''
    }, 1000)
  }, [isBrowser])

  // Load saved preferences on mount
  useEffect(() => {
    if (!isBrowser) return

    try {
      const savedFontSize = localStorage.getItem('ada-font-size') as AccessibilitySettings['fontSize']
      const savedContrast = localStorage.getItem('ada-contrast') as AccessibilitySettings['contrast']
      const savedReduceMotion = localStorage.getItem('ada-reduce-motion') === 'true'

      if (savedFontSize && ['small', 'normal', 'large', 'extra-large'].includes(savedFontSize)) {
        adjustFontSize(savedFontSize)
      }
      if (savedContrast && ['normal', 'high', 'inverted'].includes(savedContrast)) {
        adjustContrast(savedContrast)
      }
      if (savedReduceMotion !== null) {
        setSettings(prev => ({ ...prev, reduceMotion: savedReduceMotion }))
        document.documentElement.setAttribute('data-reduce-motion', savedReduceMotion.toString())
      }
    } catch (error) {
      console.warn('Failed to load accessibility preferences:', error)
    }
  }, [isBrowser, adjustFontSize, adjustContrast])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (!isBrowser) return
      
      // Reset to default values on cleanup if needed
      const announcement = document.getElementById('ada-announcements')
      if (announcement) {
        announcement.remove()
      }
    }
  }, [isBrowser])

  // Reset all settings
  const resetSettings = useCallback(() => {
    if (!isBrowser) return
    
    setSettings({
      fontSize: 'normal',
      contrast: 'normal',
      reduceMotion: false
    })
    
    // Reset DOM
    const root = document.documentElement
    const body = document.body
    
    root.setAttribute('data-font-size', 'normal')
    root.setAttribute('data-reduce-motion', 'false')
    body.setAttribute('data-contrast', 'normal')
    
    // Clear localStorage
    try {
      localStorage.removeItem('ada-font-size')
      localStorage.removeItem('ada-contrast')
      localStorage.removeItem('ada-reduce-motion')
    } catch (error) {
      console.warn('Failed to clear accessibility preferences:', error)
    }
    
    announceForScreenReader('All accessibility settings reset to default')
  }, [isBrowser, announceForScreenReader])

  return (
    <>
      {/* ADA Widget Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed left-4 top-1/2 z-40 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-label="Open accessibility settings"
        aria-expanded={isOpen}
      >
        <Accessibility className="w-6 h-6" />
      </motion.button>

      {/* ADA Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-80 bg-white shadow-2xl border-r overflow-y-auto"
            role="dialog"
            aria-labelledby="accessibility-panel-title"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 id="accessibility-panel-title" className="text-xl font-bold text-gray-900">
                  Accessibility Settings
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Close accessibility settings"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Font Size Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Font Size
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {['small', 'normal', 'large', 'extra-large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        adjustFontSize(size as AccessibilitySettings['fontSize'])
                        announceForScreenReader(`Font size changed to ${size}`)
                      }}
                      className={`p-3 rounded border text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        settings.fontSize === size
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                      aria-pressed={settings.fontSize === size}
                    >
                      {size === 'small' ? 'Small' :
                       size === 'normal' ? 'Normal' :
                       size === 'large' ? 'Large' : 'Extra Large'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contrast Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Contrast
                </h3>
                <div className="space-y-2">
                  {[
                    { value: 'normal', label: 'Normal Contrast' },
                    { value: 'high', label: 'High Contrast' },
                    { value: 'inverted', label: 'Inverted Colors' }
                  ].map(({ value, label }) => (
                    <button
                      key={value}
                      onClick={() => {
                        adjustContrast(value as AccessibilitySettings['contrast'])
                        announceForScreenReader(`Contrast changed to ${label}`)
                      }}
                      className={`w-full p-3 rounded border text-left font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        settings.contrast === value
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                      aria-pressed={settings.contrast === value}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Motion Controls */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <MousePointer className="w-5 h-5 mr-2" />
                  Motion
                </h3>
                <button
                  onClick={() => {
                    toggleReduceMotion()
                    announceForScreenReader(
                      !settings.reduceMotion ? 'Motion reduced' : 'Motion restored'
                    )
                  }}
                  className={`w-full p-3 rounded border font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    settings.reduceMotion
                      ? 'bg-green-100 border-green-500 text-green-700'
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                  aria-pressed={settings.reduceMotion}
                >
                  {settings.reduceMotion ? 'Motion Reduced ✓' : 'Reduce Motion'}
                </button>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetSettings}
                className="w-full p-3 bg-gray-600 text-white rounded font-medium hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Reset All Settings
              </button>

              {/* Information */}
              <div className="mt-6 p-4 bg-blue-50 rounded border border-blue-200">
                <p className="text-sm text-blue-800">
                  These settings help make our website more accessible. Changes are saved automatically and will persist across sessions.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  )
}
