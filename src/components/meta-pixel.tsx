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

// Helper function to track custom events with event ID for deduplication
export const trackEventWithId = (eventName: string, eventId: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    const eventData = {
      ...parameters,
      event_id: eventId // Critical for deduplication with Conversions API
    }
    window.fbq('track', eventName, eventData)
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
  trackEvent('Contact', { content_type: 'product', content_ids: ['contact_phone'], user_bucket: 'contact_request' })
}

export const trackEmailContact = () => {
  trackEvent('Contact', { content_type: 'product', content_ids: ['contact_email'], user_bucket: 'contact_request' })
}

export const trackFormSubmission = (formType: string) => {
  trackEvent('Lead', { content_type: 'product', content_ids: [`form_${formType}`], user_bucket: 'lead' })
}