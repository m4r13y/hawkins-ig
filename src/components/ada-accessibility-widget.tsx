"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Accessibility, Eye, Type, MousePointer, Sun, Moon } from 'lucide-react'

export default function ADAAccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    contrast: 'normal',
    reduceMotion: false,
    darkMode: false
  })

  // Placeholder functions - we'll add functionality incrementally
  const adjustFontSize = (size: string) => {
    setSettings(prev => ({ ...prev, fontSize: size }))
    console.log('Font size changed to:', size)
    // TODO: Add safe font size changes
  }

  const adjustContrast = (contrast: string) => {
    setSettings(prev => ({ ...prev, contrast }))
    console.log('Contrast changed to:', contrast)
    // TODO: Add safe contrast changes
  }

  const toggleReduceMotion = () => {
    const newValue = !settings.reduceMotion
    setSettings(prev => ({ ...prev, reduceMotion: newValue }))
    console.log('Reduce motion:', newValue)
    // TODO: Add safe motion reduction
  }

  const toggleDarkMode = () => {
    const newValue = !settings.darkMode
    setSettings(prev => ({ ...prev, darkMode: newValue }))
    
    // Toggle dark mode on the html element
    const html = document.documentElement
    if (newValue) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    
    // Store preference
    try {
      localStorage.setItem('ada-dark-mode', newValue.toString())
    } catch (error) {
      console.warn('Could not save dark mode preference:', error)
    }
    
    console.log('Dark mode:', newValue)
  }

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

                {/* Motion Controls */}
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                    <MousePointer className="h-4 w-4 mr-2" />
                    Motion
                  </h4>
                  <button
                    onClick={toggleReduceMotion}
                    className={`w-full p-3 rounded border text-sm transition-colors ${
                      settings.reduceMotion
                        ? 'bg-green-100 border-green-500 text-green-700'
                        : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {settings.reduceMotion ? 'Motion Reduced ✓' : 'Reduce Motion'}
                  </button>
                </div>

                {/* Dark Mode Controls */}
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                    {settings.darkMode ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                    Theme
                  </h4>
                  <button
                    onClick={toggleDarkMode}
                    className={`w-full p-3 rounded border text-sm transition-colors ${
                      settings.darkMode
                        ? 'bg-slate-800 border-slate-600 text-white'
                        : 'bg-yellow-100 border-yellow-500 text-yellow-800'
                    }`}
                  >
                    {settings.darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                  </button>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setSettings({
                      fontSize: 'normal',
                      contrast: 'normal',
                      reduceMotion: false,
                      darkMode: false
                    })
                    // Reset dark mode
                    document.documentElement.classList.remove('dark')
                    console.log('Settings reset')
                  }}
                  className="w-full p-3 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors text-sm font-medium"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
    
    // Remove existing contrast classes
    body.classList.remove('high-contrast', 'inverted-contrast')
    
    if (settings.contrast === 'high') {
      body.classList.add('high-contrast')
    } else if (settings.contrast === 'inverted') {
      body.classList.add('inverted-contrast')
    }
  }

  const toggleReduceMotion = () => {
    const newValue = !settings.reduceMotion
    setSettings(prev => ({ ...prev, reduceMotion: newValue }))
    
    // Apply reduced motion preference
    const root = document.documentElement
    if (newValue) {
      root.style.setProperty('--motion-reduce', 'none')
    } else {
      root.style.removeProperty('--motion-reduce')
    }
  }

  const announceForScreenReader = (message: string) => {
    // Reuse existing announcement element or create one
    let announcement = document.getElementById('accessibility-announcement')
    if (!announcement) {
      announcement = document.createElement('div')
      announcement.id = 'accessibility-announcement'
      announcement.setAttribute('aria-live', 'polite')
      announcement.setAttribute('aria-atomic', 'true')
      announcement.className = 'sr-only'
      document.body.appendChild(announcement)
    }
    
    announcement.textContent = message
    
    // Clear the message after screen reader has had time to announce it
    setTimeout(() => {
      if (announcement) {
        announcement.textContent = ''
      }
    }, 1000)
  }

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
                    {[
                      { label: 'Small', value: 'small' },
                      { label: 'Normal', value: 'normal' },
                      { label: 'Large', value: 'large' },
                      { label: 'Extra Large', value: 'extra-large' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          adjustFontSize(option.value)
                          announceForScreenReader(`Font size changed to ${option.label}`)
                        }}
                        className={`p-2 text-xs rounded-lg border transition-colors ${
                          settings.fontSize === option.value
                            ? 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
                            : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                        }`}
                      >
                        {option.label}
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
                      { label: 'Normal', value: 'normal' },
                      { label: 'High Contrast', value: 'high' },
                      { label: 'Inverted', value: 'inverted' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          adjustContrast(option.value)
                          announceForScreenReader(`Contrast changed to ${option.label}`)
                        }}
                        className={`w-full p-2 text-xs rounded-lg border text-left transition-colors ${
                          settings.contrast === option.value
                            ? 'bg-blue-100 border-blue-300 text-blue-800 dark:bg-blue-900 dark:border-blue-600 dark:text-blue-200'
                            : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Motion Controls */}
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3 flex items-center">
                    <MousePointer className="h-4 w-4 mr-2" />
                    Motion
                  </h4>
                  <button
                    onClick={() => {
                      toggleReduceMotion()
                      announceForScreenReader(`Motion ${settings.reduceMotion ? 'enabled' : 'reduced'}`)
                    }}
                    className={`w-full p-3 text-sm rounded-lg border text-left transition-colors ${
                      settings.reduceMotion
                        ? 'bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-600 dark:text-green-200'
                        : 'bg-slate-50 border-slate-200 text-slate-700 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-medium">Reduce Motion</div>
                    <div className="text-xs opacity-75">
                      {settings.reduceMotion ? 'Animations disabled' : 'Click to reduce animations'}
                    </div>
                  </button>
                </div>

                {/* Screen Reader Info */}
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2 flex items-center">
                    <EarOff className="h-4 w-4 mr-2" />
                    Screen Reader Support
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    This website is optimized for screen readers and includes proper ARIA labels, 
                    semantic HTML, and keyboard navigation support.
                  </p>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setSettings({
                      fontSize: 'normal',
                      contrast: 'normal',
                      reduceMotion: false,
                      screenReader: false
                    })
                    adjustFontSize('normal')
                    adjustContrast('normal')
                    const root = document.documentElement
                    root.style.removeProperty('--motion-reduce')
                    announceForScreenReader('All accessibility settings reset to default')
                  }}
                  className="w-full p-3 bg-slate-100 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-500 transition-colors text-sm font-medium"
                >
                  Reset to Default
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS Styles for Accessibility Features */}
      <style jsx global>{`
        .high-contrast {
          filter: contrast(150%);
        }
        
        .inverted-contrast {
          filter: invert(1) hue-rotate(180deg);
        }
        
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        [style*="--motion-reduce"] * {
          animation: none !important;
          transition: none !important;
        }

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

        /* Focus indicators */
        button:focus,
        a:focus,
        input:focus,
        textarea:focus,
        select:focus {
          outline: 2px solid #3B82F6 !important;
          outline-offset: 2px !important;
        }

        /* High contrast mode improvements */
        @media (prefers-contrast: high) {
          .high-contrast {
            filter: contrast(200%);
          }
        }
      `}</style>
    </>
  )
}
