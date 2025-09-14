// Cross-Domain Tracking Configuration and Utilities
// This file handles user journey tracking between hawkinsig.com and insurance-hawk.com

export const TRACKING_CONFIG = {
  // Same pixel ID for both domains
  pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID!,
  
  // Cross-domain settings
  domains: {
    hawkinsIg: process.env.NEXT_PUBLIC_HAWKINS_IG_DOMAIN || 'hawkinsig.com',
    insuranceHawk: process.env.NEXT_PUBLIC_INSURANCE_HAWK_DOMAIN || 'insurance-hawk.com'
  },
  
  // Event mapping for user journey
  events: {
    // From Hawkins IG
    getStarted: 'SubmitApplication',
    newsletter: 'CompleteRegistration',
    pageView: 'ViewContent',
    
    // Insurance Hawk specific
    quoteStarted: 'InitiateCheckout',
    quoteCompleted: 'Purchase',
    leadGenerated: 'Lead',
    contactRequested: 'Contact'
  },
  
  // URL parameters for cross-domain tracking
  trackingParams: {
    source: 'utm_source',
    medium: 'utm_medium', 
    campaign: 'utm_campaign',
    fbclid: 'fbclid', // Facebook click ID
    eventId: 'event_id', // For deduplication
    userJourney: 'user_journey', // Track journey stage
    insuranceType: 'insurance_type',
    referrer: 'referrer'
  }
}

// Helper to detect referral from Hawkins IG
export const isFromHawkinsIG = (): boolean => {
  if (typeof window === 'undefined') return false
  
  const referrer = document.referrer
  const urlParams = new URLSearchParams(window.location.search)
  
  return (
    referrer.includes(TRACKING_CONFIG.domains.hawkinsIg) ||
    urlParams.get('utm_source') === 'hawkins_ig' ||
    urlParams.has('user_journey')
  )
}

// Extract cross-domain tracking data from URL
export const getCrossDomainTrackingData = () => {
  if (typeof window === 'undefined') return null
  
  const urlParams = new URLSearchParams(window.location.search)
  
  return {
    eventId: urlParams.get('event_id'),
    userJourney: urlParams.get('user_journey'),
    insuranceType: urlParams.get('insurance_type'),
    referrer: urlParams.get('referrer'),
    utmSource: urlParams.get('utm_source'),
    utmMedium: urlParams.get('utm_medium'),
    utmCampaign: urlParams.get('utm_campaign'),
    fbclid: urlParams.get('fbclid')
  }
}

// Generate cross-domain tracking URL
export const buildCrossDomainUrl = (
  baseUrl: string,
  eventId?: string,
  userJourney?: string,
  additionalParams?: Record<string, string>
): string => {
  const url = new URL(baseUrl)
  
  // Add tracking parameters
  if (eventId) {
    url.searchParams.set('event_id', eventId)
  }
  
  if (userJourney) {
    url.searchParams.set('user_journey', userJourney)
  }
  
  // Add source attribution
  url.searchParams.set('utm_source', 'hawkins_ig')
  url.searchParams.set('utm_medium', 'referral')
  
  // Add any additional parameters
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  
  return url.toString()
}

// Store user data for cross-domain continuity
export const storeUserJourneyData = (data: {
  email?: string
  zipCode?: string
  insuranceInterests?: string[]
  journeyStage: string
  sourceEventId?: string
}) => {
  if (typeof window === 'undefined') return
  
  const journeyData = {
    ...data,
    timestamp: Date.now(),
    domain: window.location.hostname
  }
  
  // Store in localStorage for cross-domain continuity
  localStorage.setItem('user_journey_data', JSON.stringify(journeyData))
  
  // Also store in sessionStorage as backup
  sessionStorage.setItem('user_journey_data', JSON.stringify(journeyData))
}

// Retrieve user journey data
export const getUserJourneyData = () => {
  if (typeof window === 'undefined') return null
  
  try {
    const localData = localStorage.getItem('user_journey_data')
    const sessionData = sessionStorage.getItem('user_journey_data')
    
    // Use localStorage data if available and recent (within 24 hours)
    if (localData) {
      const parsed = JSON.parse(localData)
      const isRecent = (Date.now() - parsed.timestamp) < (24 * 60 * 60 * 1000)
      if (isRecent) return parsed
    }
    
    // Fallback to session data
    if (sessionData) {
      return JSON.parse(sessionData)
    }
    
    return null
  } catch (error) {
    console.error('Error retrieving user journey data:', error)
    return null
  }
}

// Clear user journey data (call after conversion)
export const clearUserJourneyData = () => {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('user_journey_data')
  sessionStorage.removeItem('user_journey_data')
}

// Merge URL params with stored journey data
export const getMergedUserContext = () => {
  const urlData = getCrossDomainTrackingData()
  const storedData = getUserJourneyData()
  
  return {
    ...storedData,
    ...urlData,
    // Give priority to URL params over stored data for freshness
  }
}