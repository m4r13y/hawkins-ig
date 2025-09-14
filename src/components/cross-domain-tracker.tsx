"use client"

import { useEffect } from 'react'
import { 
  trackViewContentDual,
  trackCustomEventDual
} from './dual-tracking'
import { 
  isFromHawkinsIG, 
  getCrossDomainTrackingData, 
  getUserJourneyData,
  storeUserJourneyData,
  TRACKING_CONFIG 
} from '@/lib/cross-domain-tracking'

interface CrossDomainTrackerProps {
  currentDomain: 'hawkins_ig' | 'insurance_hawk'
  pageType?: string
  userContext?: {
    email?: string
    zipCode?: string
    insuranceType?: string
  }
}

export default function CrossDomainTracker({ 
  currentDomain, 
  pageType = 'general',
  userContext 
}: CrossDomainTrackerProps) {
  
  useEffect(() => {
    handleCrossDomainTracking()
  }, [])

  const handleCrossDomainTracking = async () => {
    try {
      // Get tracking data from URL and storage
      const urlData = getCrossDomainTrackingData()
      const storedData = getUserJourneyData()
      
      // Detect if this is a cross-domain journey
      const isFromOtherDomain = isFromHawkinsIG() && currentDomain === 'insurance_hawk'
      
      if (isFromOtherDomain && urlData) {
        // Track the cross-domain journey transition
        await trackCrossDomainJourney({
          fromDomain: 'hawkinsig.com',
          toDomain: window.location.hostname,
          userAction: urlData.userJourney || 'page_visit',
          eventId: urlData.eventId || undefined,
          userData: {
            email: userContext?.email,
            zipCode: userContext?.zipCode
          },
          crossDomainData: urlData
        })
        
        // Update stored journey data with new context
        storeUserJourneyData({
          email: userContext?.email || storedData?.email,
          zipCode: userContext?.zipCode || storedData?.zipCode,
          insuranceInterests: userContext?.insuranceType ? [userContext.insuranceType] : storedData?.insuranceInterests,
          journeyStage: `${currentDomain}_${pageType}`,
          sourceEventId: urlData.eventId || undefined
        })
        
        console.log('🔗 Cross-domain journey tracked:', {
          from: 'hawkinsig.com',
          to: window.location.hostname,
          action: urlData.userJourney,
          eventId: urlData.eventId
        })
      }
      
      // Track page view with journey context
      await trackPageViewWithJourney(window.location.pathname, {
        ...userContext,
        referralSource: urlData?.utmSource || undefined,
        userJourney: urlData?.userJourney || storedData?.journeyStage,
        fromCrossDomain: isFromOtherDomain
      })
      
    } catch (error) {
      console.error('Cross-domain tracking error:', error)
    }
  }

  return null // This is a tracking component, no UI
}

// Cross-Domain Journey Tracking
export const trackCrossDomainJourney = async (
  journeyData: {
    fromDomain: string
    toDomain: string
    userAction: string
    eventId?: string
    userData?: {
      email?: string
      zipCode?: string
    }
    crossDomainData?: any
  }
) => {
  await trackCustomEventDual('ViewContent', {
    userData: journeyData.userData || {},
    customData: {
      content_type: 'product', // ✅ Core Setup compliant
      content_ids: ['cross_domain_journey'], // ✅ Standard parameter
      from_domain: journeyData.fromDomain,
      to_domain: journeyData.toDomain,
      user_action: journeyData.userAction,
      journey_stage: 'transition',
      utm_source: journeyData.crossDomainData?.utmSource,
      utm_medium: journeyData.crossDomainData?.utmMedium,
      insurance_type: journeyData.crossDomainData?.insuranceType,
      referrer: journeyData.crossDomainData?.referrer
      // Note: PII handled server-side via Conversions API
    },
    eventId: journeyData.eventId
  })
  
  console.log(`🔗 Cross-domain: ${journeyData.fromDomain} → ${journeyData.toDomain} (${journeyData.userAction})`)
}

// Page View with Cross-Domain Context
export const trackPageViewWithJourney = async (
  route: string, 
  userContext?: {
    email?: string
    zipCode?: string
    referralSource?: string
    userJourney?: string
    fromCrossDomain?: boolean
    insuranceType?: string
  }
) => {
  let contentType = 'general'
  let contentName = route
  
  // Determine content type based on route
  if (route.includes('/quotes/')) {
    contentType = 'quote_page'
    contentName = `Quote Page - ${route.split('/').pop()}`
  } else if (route.includes('/contact')) {
    contentType = 'contact_page'
    contentName = 'Contact Page'
  } else if (route.includes('/insurance/')) {
    contentType = 'product_page'
    contentName = `Product Page - ${route.split('/').pop()}`
  } else if (route.includes('/get-started')) {
    contentType = 'get_started_page'
    contentName = `Get Started - ${route.split('/').pop()}`
  }
  
  await trackCustomEventDual('ViewContent', {
    userData: {
      email: userContext?.email,
      zipCode: userContext?.zipCode
    },
    customData: {
      content_type: 'product', // ✅ Core Setup compliant
      content_ids: [contentType], // ✅ Standard parameter
      referral_source: userContext?.referralSource,
      user_journey: userContext?.userJourney,
      from_cross_domain: userContext?.fromCrossDomain || false,
      insurance_type: userContext?.insuranceType
      // Note: PII handled server-side via Conversions API
    }
  })
  
  console.log(`👀 Page view: ${route} (${contentType}) - Journey: ${userContext?.userJourney || 'new'}`)
}

// Enhanced Quote Referral Tracking (for Hawkins IG)
export const trackQuoteReferral = async (
  insuranceType: string,
  destinationUrl: string,
  userData?: {
    email?: string
    zipCode?: string
  }
) => {
  await trackCustomEventDual('ViewContent', {
    userData: userData || {},
    customData: {
      content_type: 'product', // ✅ Core Setup compliant
      content_ids: [`quote_referral_${insuranceType}`], // ✅ Standard parameter
      insurance_type: insuranceType,
      destination_url: destinationUrl,
      referral_type: 'cross_domain'
      // Note: PII handled server-side via Conversions API
    }
  })
  
  console.log(`🔗 Quote referral: ${insuranceType} → ${destinationUrl}`)
}