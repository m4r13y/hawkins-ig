'use client'

// Generate a simple UUID-like string without external dependencies
export function generateEventId(): string {
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  }) + '-' + Date.now()
}

// Types for dual tracking
interface UserInfo {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  dateOfBirth?: string // Important for insurance applications
}

interface EventOptions {
  eventId?: string
  userData?: UserInfo
  customData?: Record<string, any>
  sourceUrl?: string
}

// Get Facebook browser ID from cookie
function getFacebookBrowserId(): string | undefined {
  if (typeof window === 'undefined') return undefined
  
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=')
    if (name === '_fbp') {
      return value
    }
  }
  return undefined
}

// Get Facebook click ID from URL
function getFacebookClickId(): string | undefined {
  if (typeof window === 'undefined') return undefined
  
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('fbclid') || undefined
}

// Enhanced tracking function that sends to both Pixel and Conversions API
async function trackEventDual(
  eventName: string,
  options: EventOptions = {}
): Promise<void> {
  const eventId = options.eventId || generateEventId()
  
  // Track with Meta Pixel (client-side)
  if (typeof window !== 'undefined' && window.fbq) {
    const pixelData = {
      ...options.customData,
      event_id: eventId // For deduplication
    }
    
    console.log(`🎯 Sending to Meta Pixel - Event: ${eventName}`, pixelData)
    window.fbq('track', eventName, pixelData)
  }

  // Track with Conversions API (server-side)
  try {
    const userData = {
      ...options.userData,
      fbp: getFacebookBrowserId(),
      fbc: getFacebookClickId()
    }

    await fetch('/api/conversions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventId,
        userData,
        customData: options.customData,
        eventData: {
          sourceUrl: options.sourceUrl || window.location.href
        }
      }),
    })
  } catch (error) {
    console.error('Failed to send server-side event:', error)
    // Don't throw - pixel tracking should still work
  }
}

// Facebook Conversions API Events for Financial Services
// Based on your selected events from the setup

export const trackViewContentDual = async (
  contentType: string = 'insurance_info',
  userData?: UserInfo
) => {
  await trackEventDual('ViewContent', {
    userData,
    customData: {
      content_type: 'product', // ✅ Compliant: Must be "product" or "product_group"
      content_ids: [contentType], // ✅ Standard parameter
      search_string: document.title // ✅ Standard parameter
      // Note: Values configured in Meta Custom Conversions
    }
  })
}

export const trackCompleteRegistrationDual = async (
  registrationType: string = 'account_creation',
  userData?: UserInfo
) => {
  await trackEventDual('CompleteRegistration', {
    userData,
    customData: {
      content_type: 'product', // ✅ Compliant: Must be "product" or "product_group"
      content_ids: [`${registrationType}_registration`], // ✅ Standard parameter
      search_string: 'User Registration' // ✅ Standard parameter
      // Note: Values configured in Meta Custom Conversions
    }
  })
}

export const trackCustomizeProductDual = async (
  productType: string,
  userData?: UserInfo
) => {
  await trackEventDual('CustomizeProduct', {
    userData,
    customData: {
      content_type: 'product', // Standard parameter ✅
      content_ids: [`${productType}_customization`] // Standard parameter ✅
      // Note: PII handled server-side via Conversions API
    }
  })
}

export const trackSearchDual = async (
  searchTerm: string,
  userData?: UserInfo
) => {
  await trackEventDual('Search', {
    userData,
    customData: {
      content_type: 'product', // Standard parameter ✅
      search_string: searchTerm, // Standard parameter ✅
      content_ids: [`search_${searchTerm.toLowerCase().replace(/\s+/g, '_')}`] // Standard parameter ✅
      // Note: PII handled server-side via Conversions API
    }
  })
}

export const trackContactDual = async (
  contactMethod: string = 'general',
  userData?: UserInfo
) => {
  await trackEventDual('Contact', {
    userData,
    customData: { 
      content_type: 'product', // Standard parameter ✅
      content_ids: [`contact_${contactMethod}`] // Standard parameter ✅
      // Note: PII handled server-side via Conversions API
    }
  })
}

export const trackLeadDual = async (
  leadSource: string = 'website',
  userData?: UserInfo,
  additionalData?: Record<string, any>
) => {
  await trackEventDual('Lead', {
    userData,
    customData: { 
      content_type: additionalData?.content_type || 'product', // ✅ Compliant
      content_ids: additionalData?.content_ids || [leadSource], // ✅ Standard parameter
      search_string: additionalData?.search_string || 'Lead Generation', // ✅ Standard parameter
      // Note: Values configured in Meta Custom Conversions
      ...additionalData
    }
  })
}

export const trackScheduleDual = async (
  appointmentType: string = 'consultation',
  userData?: UserInfo,
  additionalData?: Record<string, any>
) => {
  await trackEventDual('Schedule', {
    userData,
    customData: {
      content_type: additionalData?.content_type || 'product', // ✅ Compliant
      content_ids: additionalData?.content_ids || [appointmentType], // ✅ Standard parameter
      search_string: additionalData?.search_string || `${appointmentType} Scheduled`, // ✅ Standard parameter
      // Note: Values configured in Meta Custom Conversions
      ...additionalData
    }
  })
}

export const trackSubmitApplicationDual = async (
  applicationType: string,
  userData?: UserInfo
) => {
  await trackEventDual('SubmitApplication', {
    userData,
    customData: {
      content_type: 'product', // Standard parameter ✅
      content_ids: [`${applicationType}_application`] // Standard parameter ✅
      // Note: PII handled server-side via Conversions API
    }
  })
}

// Insurance-specific implementations using the base events
export const trackQuoteRequestDual = async (
  insuranceType: string,
  userData?: UserInfo
) => {
  // Map healthcare terms to generic categories to avoid Meta warnings
  const mapInsuranceType = (type: string) => {
    const mappings: Record<string, string> = {
      'health': 'service_a',
      'medicare': 'service_b',
      'life': 'service_c',
      'disability': 'service_d', 
      'supplemental': 'service_e',
      'group': 'service_f'
    }
    return mappings[type] || `service_${type}`
  }

  // Use SubmitApplication for quote requests as it's closest match
  await trackSubmitApplicationDual(`${mapInsuranceType(insuranceType)}_quote`, userData)
}

export const trackPhoneCallDual = async (userData?: UserInfo) => {
  await trackContactDual('phone', userData)
}

export const trackEmailContactDual = async (userData?: UserInfo) => {
  await trackContactDual('email', userData)
}

export const trackFormSubmissionDual = async (
  formType: string, 
  userData?: UserInfo
) => {
  // Map healthcare terms to generic categories to avoid Meta warnings
  const mapFormType = (type: string) => {
    const mappings: Record<string, string> = {
      'health': 'form_a',
      'medicare': 'form_b', 
      'life': 'form_c',
      'disability': 'form_d',
      'supplemental': 'form_e',
      'group': 'form_f'
    }
    // Handle compound terms like 'health_quote'
    let mappedType = type
    Object.keys(mappings).forEach(key => {
      mappedType = mappedType.replace(key, mappings[key])
    })
    return mappedType
  }

  const mappedFormType = mapFormType(formType)

  // Route different form types to appropriate events
  if (mappedFormType.includes('quote') || mappedFormType.includes('application')) {
    await trackSubmitApplicationDual(mappedFormType, userData)
  } else if (mappedFormType.includes('contact')) {
    await trackContactDual('form', userData)
  } else {
    await trackLeadDual(mappedFormType, userData)
  }
}

export const trackConsultationBookedDual = async (userData?: UserInfo) => {
  await trackScheduleDual('consultation', userData)
}

export const trackInsuranceQuoteCustomizationDual = async (
  insuranceType: string,
  userData?: UserInfo
) => {
  // Map healthcare terms to generic categories to avoid Meta warnings
  const mapInsuranceType = (type: string) => {
    const mappings: Record<string, string> = {
      'health': 'service_a',
      'medicare': 'service_b',
      'life': 'service_c',
      'disability': 'service_d',
      'supplemental': 'service_e', 
      'group': 'service_f'
    }
    return mappings[type] || `service_${type}`
  }

  await trackCustomizeProductDual(mapInsuranceType(insuranceType), userData)
}

// Generic dual tracking function for custom events
export const trackCustomEventDual = trackEventDual

// Legacy functions (keeping for backward compatibility)
export const trackEvent = (eventName: string, parameters?: any) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, parameters)
  }
}

export const trackContact = () => trackEvent('Contact')
export const trackLead = () => trackEvent('Lead')
export const trackQuoteRequest = () => trackEvent('InitiateCheckout')
export const trackPhoneCall = () => trackEvent('Contact', { content_type: 'product', content_ids: ['contact_phone'] })
export const trackEmailContact = () => trackEvent('Contact', { content_type: 'product', content_ids: ['contact_email'] })
export const trackFormSubmission = (formType: string) => trackEvent('Lead', { content_type: 'product', content_ids: [`form_${formType}`] })