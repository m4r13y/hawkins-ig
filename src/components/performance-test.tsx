"use client"

import { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fcp?: number
  lcp?: number
  cls?: number
  fid?: number
  ttfb?: number
  domContentLoaded?: number
  loadComplete?: number
}

export default function PerformanceTest() {
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

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-secondary via-background to-secondary rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Performance Test Results</h2>
        <button 
          onClick={measurePerformance} 
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Testing...' : 'Re-test'}
        </button>
      </div>
      <p className="text-gray-600 mb-6">
        Core Web Vitals and performance metrics for this page
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gradient-to-br from-secondary via-background to-secondary rounded-lg">
            <span className="font-medium">First Contentful Paint (FCP)</span>
            <span className={`font-mono ${getScoreColor('fcp', metrics.fcp || 0)}`}>
              {formatValue('fcp', metrics.fcp)}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gradient-to-br from-secondary via-background to-secondary rounded-lg">
            <span className="font-medium">Largest Contentful Paint (LCP)</span>
            <span className={`font-mono ${getScoreColor('lcp', metrics.lcp || 0)}`}>
              {formatValue('lcp', metrics.lcp)}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gradient-to-br from-secondary via-background to-secondary rounded-lg">
            <span className="font-medium">Cumulative Layout Shift (CLS)</span>
            <span className={`font-mono ${getScoreColor('cls', metrics.cls || 0)}`}>
              {formatValue('cls', metrics.cls)}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gradient-to-br from-secondary via-background to-secondary rounded-lg">
            <span className="font-medium">Time to First Byte (TTFB)</span>
            <span className={`font-mono ${getScoreColor('ttfb', metrics.ttfb || 0)}`}>
              {formatValue('ttfb', metrics.ttfb)}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gradient-to-br from-secondary via-background to-secondary rounded-lg">
            <span className="font-medium">DOM Content Loaded</span>
            <span className="font-mono text-gray-600">
              {formatValue('dom', metrics.domContentLoaded)}
            </span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gradient-to-br from-secondary via-background to-secondary rounded-lg">
            <span className="font-medium">Load Complete</span>
            <span className="font-mono text-gray-600">
              {formatValue('load', metrics.loadComplete)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Performance Score Legend</h4>
        <div className="text-sm space-y-1">
          <div><span className="text-green-600">●</span> Good: Meets performance recommendations</div>
          <div><span className="text-yellow-600">●</span> Needs Improvement: Above recommended thresholds</div>
          <div><span className="text-red-600">●</span> Poor: Significantly above thresholds</div>
        </div>
      </div>
    </div>
  )
}
