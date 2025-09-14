'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    fbq: any
  }
}

interface MetaPixelProps {
  pixelId: string
}

function MetaPixelInner({ pixelId }: MetaPixelProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Initialize Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('init', pixelId)
      window.fbq('track', 'PageView')
    }
  }, [pixelId])

  useEffect(() => {
    // Track page views on route changes
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView')
    }
  }, [pathname, searchParams])

  return null
}

export default function MetaPixel({ pixelId }: MetaPixelProps) {
  return (
    <Suspense fallback={null}>
      <MetaPixelInner pixelId={pixelId} />
    </Suspense>
  )
}

// Helper function to track custom events
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters)
  }
}

// Common event tracking functions
export const trackContact = () => {
  trackEvent('Contact')
}

export const trackLead = () => {
  trackEvent('Lead')
}

export const trackQuoteRequest = () => {
  trackEvent('InitiateCheckout')
}

export const trackPhoneCall = () => {
  trackEvent('Contact', { contact_method: 'phone' })
}

export const trackEmailContact = () => {
  trackEvent('Contact', { contact_method: 'email' })
}

export const trackFormSubmission = (formType: string) => {
  trackEvent('Lead', { form_type: formType })
}