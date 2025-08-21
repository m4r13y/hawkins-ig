"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accessibility, Eye, Type } from 'lucide-react'

export default function ADAAccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    contrast: 'normal'
  })

  // Safe font size adjustment - only affects specific elements
  const adjustFontSize = (size: string) => {
    setSettings(prev => ({ ...prev, fontSize: size }))
    
    // Apply font size using CSS custom properties with a specific class
    const root = document.documentElement
    
    // Remove existing font size classes
    root.classList.remove('ada-font-small', 'ada-font-normal', 'ada-font-large', 'ada-font-extra-large')
    
    // Add new font size class
    switch (size) {
      case 'small':
        root.classList.add('ada-font-small')
        break
      case 'large':
        root.classList.add('ada-font-large')
        break
      case 'extra-large':
        root.classList.add('ada-font-extra-large')
        break
      default:
        root.classList.add('ada-font-normal')
    }
    
    // Store preference
    try {
      localStorage.setItem('ada-font-size', size)
    } catch (error) {
      console.warn('Could not save font size preference:', error)
    }
    
    console.log('Font size changed to:', size)
  }

  // Safe contrast adjustment - uses classes instead of global styles
  const adjustContrast = (contrast: string) => {
    setSettings(prev => ({ ...prev, contrast }))
    
    const body = document.body
    
    // Remove existing contrast classes
    body.classList.remove('ada-contrast-high', 'ada-contrast-inverted')
    
    // Add new contrast class
    switch (contrast) {
      case 'high':
        body.classList.add('ada-contrast-high')
        break
      case 'inverted':
        body.classList.add('ada-contrast-inverted')
        break
      default:
        // Normal contrast - no class needed
        break
    }
    
    // Store preference
    try {
      localStorage.setItem('ada-contrast', contrast)
    } catch (error) {
      console.warn('Could not save contrast preference:', error)
    }
    
    console.log('Contrast changed to:', contrast)
  }

  // Reset all settings
  const resetSettings = () => {
    setSettings({
      fontSize: 'normal',
      contrast: 'normal'
    })
    
    // Remove all ADA classes
    const root = document.documentElement
    const body = document.body
    
    root.classList.remove('ada-font-small', 'ada-font-normal', 'ada-font-large', 'ada-font-extra-large')
    body.classList.remove('ada-contrast-high', 'ada-contrast-inverted')
    
    // Clear localStorage
    try {
      localStorage.removeItem('ada-font-size')
      localStorage.removeItem('ada-contrast')
    } catch (error) {
      console.warn('Could not clear preferences:', error)
    }
    
    console.log('Settings reset')
  }

  // Load saved preferences on mount
  useEffect(() => {
    try {
      const savedFontSize = localStorage.getItem('ada-font-size')
      const savedContrast = localStorage.getItem('ada-contrast')

      if (savedFontSize) {
        adjustFontSize(savedFontSize)
      }
      if (savedContrast) {
        adjustContrast(savedContrast)
      }
    } catch (error) {
      console.warn('Could not load saved preferences:', error)
    }
  }, [])

  return (
    <>
      {/* ADA Widget Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
        aria-label="Open accessibility options"
        title="Accessibility Options"
      >
        <Accessibility className="h-6 w-6" />
      </button>

      {/* ADA Widget Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-24 right-6 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl shadow-2xl w-80 max-h-96 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                  <Accessibility className="h-5 w-5 mr-2" />
                  Accessibility Options
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                  aria-label="Close accessibility options"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Font Size Controls */}
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                    <Type className="h-4 w-4 mr-2" />
                    Text Size
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['small', 'normal', 'large', 'extra-large'].map((size) => (
                      <button
                        key={size}
                        onClick={() => adjustFontSize(size)}
                        className={`p-2 text-xs rounded border transition-colors ${
                          settings.fontSize === size
                            ? 'bg-blue-100 border-blue-500 text-blue-700'
                            : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {size === 'extra-large' ? 'XL' : size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contrast Controls */}
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Contrast
                  </h4>
                  <div className="space-y-2">
                    {[
                      { value: 'normal', label: 'Normal' },
                      { value: 'high', label: 'High Contrast' },
                      { value: 'inverted', label: 'Inverted' }
                    ].map(({ value, label }) => (
                      <button
                        key={value}
                        onClick={() => adjustContrast(value)}
                        className={`w-full p-2 text-xs rounded border text-left transition-colors ${
                          settings.contrast === value
                            ? 'bg-blue-100 border-blue-500 text-blue-700'
                            : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetSettings}
                  className="w-full p-3 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors text-sm font-medium"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Safe CSS styles using scoped classes */}
      <style jsx global>{`
        /* Font Size Adjustments - only affects main content areas */
        .ada-font-small {
          font-size: 14px;
        }
        
        .ada-font-normal {
          font-size: 16px;
        }
        
        .ada-font-large {
          font-size: 18px;
        }
        
        .ada-font-extra-large {
          font-size: 20px;
        }

        /* Contrast Adjustments - targeted approach */
        .ada-contrast-high {
          filter: contrast(150%) brightness(110%);
        }
        
        .ada-contrast-high * {
          background-color: transparent !important;
        }
        
        .ada-contrast-inverted {
          filter: invert(100%) hue-rotate(180deg);
        }

        /* Motion Reduction - only affects animations */
        .ada-reduce-motion *,
        .ada-reduce-motion *::before,
        .ada-reduce-motion *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        /* Screen reader support */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </>
  )
}
