"use client"

import { useEffect } from 'react'

/**
 * Performance Monitor Component
 * 
 * This component tracks Core Web Vitals metrics and provides real-time performance insights.
 * It dynamically imports the web-vitals library to avoid bundling it unnecessarily.
 * 
 * Metrics tracked:
 * - CLS (Cumulative Layout Shift): Visual stability - measures unexpected layout shifts
 * - INP (Interaction to Next Paint): Responsiveness - replaces FID in web-vitals v3+
 * - FCP (First Contentful Paint): Loading speed - time to first content render
 * - LCP (Largest Contentful Paint): Loading speed - time to largest content render
 * - TTFB (Time to First Byte): Server response time
 */

// Web Vitals monitoring
export function PerformanceMonitor() {
  useEffect(() => {
    // Load in both development and production for testing
    // In production, only enable if you want to collect metrics
    
    // Dynamic import to avoid bundling in development
    import('web-vitals').then((webVitals) => {
      const reportMetric = (metric: any) => {
        // Always log to console in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`🚀 ${metric.name}: ${Math.round(metric.value)}ms`, {
            value: metric.value,
            rating: metric.rating,
            entries: metric.entries
          })
        }
        
        // In production, send to analytics
        if (process.env.NODE_ENV === 'production') {
          // Example: gtag('event', metric.name, { value: metric.value })
          // Example: analytics.track(metric.name, { value: metric.value })
        }
      }

      // Use the correct function names for web-vitals v3+
      if (webVitals.onCLS) webVitals.onCLS(reportMetric)
      if (webVitals.onINP) webVitals.onINP(reportMetric) // INP replaced FID in v3
      if (webVitals.onFCP) webVitals.onFCP(reportMetric)
      if (webVitals.onLCP) webVitals.onLCP(reportMetric)
      if (webVitals.onTTFB) webVitals.onTTFB(reportMetric)
    }).catch(console.error)
  }, [])

  return null
}

// Resource hints component
/**
 * Resource Hints Component
 * 
 * This component adds performance optimizations by:
 * 1. Preconnecting to external domains (establishes early connections)
 * 2. DNS prefetching for other domains (resolves DNS early)
 * 
 * Benefits:
 * - Reduces connection time for external resources
 * - Improves loading speed for fonts, images, and APIs
 * - Eliminates DNS lookup delays
 */
export function ResourceHints() {
  useEffect(() => {
    // Preconnect to external domains
    const preconnectDomains = [
      'https://firebasestorage.googleapis.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      link.crossOrigin = 'anonymous'
      document.head.appendChild(link)
    })

    // DNS prefetch for other domains
    const dnsPrefetchDomains = [
      'https://logo.clearbit.com',
      'https://placehold.co'
    ]

    dnsPrefetchDomains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'dns-prefetch'
      link.href = domain
      document.head.appendChild(link)
    })
  }, [])

  return null
}

// Critical CSS injection for above-the-fold content
/**
 * Critical CSS Component
 * 
 * This component injects critical CSS directly into the HTML head to:
 * 1. Prevent render-blocking by external stylesheets
 * 2. Ensure above-the-fold content renders immediately
 * 3. Improve First Contentful Paint (FCP) scores
 * 
 * Critical CSS contains only the styles needed for:
 * - Hero section layout
 * - Navigation bar
 * - Primary buttons
 * - Above-the-fold elements
 */
export function CriticalCSS() {
  return (
    <style dangerouslySetInnerHTML={{
      __html: `
        /* Critical above-the-fold styles */
        .hero-section { min-height: 100vh; }
        .navbar { position: fixed; top: 0; width: 100%; z-index: 50; }
        .btn-primary { 
          background: hsl(var(--primary)); 
          color: hsl(var(--primary-foreground));
          transition: all 0.2s ease;
        }
        .btn-primary:hover { 
          background: hsl(var(--primary) / 0.9); 
        }
      `
    }} />
  )
}
