"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, BarChart3, Zap } from 'lucide-react'

interface PerformanceMetrics {
  fcp?: number
  lcp?: number
  cls?: number
  fid?: number
  ttfb?: number
  domContentLoaded?: number
  loadComplete?: number
}

export default function FloatingPerformanceWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [metrics, setMetrics] = useState<PerformanceMetrics>({})
  const [isLoading, setIsLoading] = useState(false)

  const measurePerformance = () => {
    setIsLoading(true)
    
    // Clear existing metrics
    setMetrics({})
    
    // Use Performance Observer API for Core Web Vitals
    if ('PerformanceObserver' in window) {
      // First Contentful Paint & Largest Contentful Paint
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'paint') {
            if (entry.name === 'first-contentful-paint') {
              setMetrics(prev => ({ ...prev, fcp: Math.round(entry.startTime) }))
            }
          }
          if (entry.entryType === 'largest-contentful-paint') {
            setMetrics(prev => ({ ...prev, lcp: Math.round(entry.startTime) }))
          }
          if (entry.entryType === 'layout-shift') {
            const layoutShiftEntry = entry as any
            setMetrics(prev => ({ 
              ...prev, 
              cls: prev.cls ? prev.cls + layoutShiftEntry.value : layoutShiftEntry.value 
            }))
          }
        })
      })
      
      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift'] })
    }

    // Navigation Timing API for other metrics
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      if (navigation) {
        setMetrics(prev => ({
          ...prev,
          ttfb: Math.round(navigation.responseStart - navigation.requestStart),
          domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
          loadComplete: Math.round(navigation.loadEventEnd - navigation.fetchStart)
        }))
      }
      
      setIsLoading(false)
    }, 1000)
  }

  useEffect(() => {
    measurePerformance()
  }, [])

  const getScoreColor = (metric: string, value: number) => {
    const thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
      ttfb: { good: 600, poor: 1500 }
    }
    
    const threshold = thresholds[metric as keyof typeof thresholds]
    if (!threshold) return 'text-gray-600'
    
    if (value <= threshold.good) return 'text-green-600'
    if (value <= threshold.poor) return 'text-yellow-600'
    return 'text-red-600'
  }

  const formatValue = (metric: string, value: number | undefined) => {
    if (value === undefined) return 'Measuring...'
    
    if (metric === 'cls') {
      return value.toFixed(3)
    }
    return `${value}ms`
  }

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <>
      {/* Floating Performance Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Performance Monitor"
      >
        <Zap className="w-6 h-6" />
      </motion.button>

      {/* Performance Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 left-6 z-50 bg-gradient-to-br from-secondary via-background to-secondary border border-border rounded-xl shadow-2xl w-96 max-h-96 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                  Performance Monitor
                </h3>
                <button
                  onClick={measurePerformance}
                  disabled={isLoading}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? 'Testing...' : 'Re-test'}
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gradient-to-br from-secondary via-background to-secondary rounded">
                  <span className="text-sm font-medium">FCP</span>
                  <span className={`text-sm font-mono ${getScoreColor('fcp', metrics.fcp || 0)}`}>
                    {formatValue('fcp', metrics.fcp)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gradient-to-br from-secondary via-background to-secondary rounded">
                  <span className="text-sm font-medium">LCP</span>
                  <span className={`text-sm font-mono ${getScoreColor('lcp', metrics.lcp || 0)}`}>
                    {formatValue('lcp', metrics.lcp)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gradient-to-br from-secondary via-background to-secondary rounded">
                  <span className="text-sm font-medium">CLS</span>
                  <span className={`text-sm font-mono ${getScoreColor('cls', metrics.cls || 0)}`}>
                    {formatValue('cls', metrics.cls)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gradient-to-br from-secondary via-background to-secondary rounded">
                  <span className="text-sm font-medium">TTFB</span>
                  <span className={`text-sm font-mono ${getScoreColor('ttfb', metrics.ttfb || 0)}`}>
                    {formatValue('ttfb', metrics.ttfb)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-2 bg-gradient-to-br from-secondary via-background to-secondary rounded">
                  <span className="text-sm font-medium">DOM Loaded</span>
                  <span className="text-sm font-mono text-gray-600">
                    {formatValue('dom', metrics.domContentLoaded)}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-white/10 dark:bg-green-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-green-900 dark:text-green-100 mb-1">Legend</h4>
                <div className="text-xs space-y-1">
                  <div><span className="text-green-600">●</span> Good</div>
                  <div><span className="text-yellow-600">●</span> Needs Improvement</div>
                  <div><span className="text-red-600">●</span> Poor</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

