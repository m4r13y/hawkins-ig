'use client'

// Generate a simple UUID-like string without external dependencies
function generateEventId(): string {
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
      content_type: contentType,
      content_name: document.title,
      content_category: 'Insurance Information'
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
      content_name: 'User Registration',
      registration_method: registrationType,
      content_category: 'Account'
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
      content_name: `${productType} Customization`,
      content_category: 'Insurance Product',
      product_type: productType
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
      search_string: searchTerm,
      content_category: 'Site Search'
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
      contact_method: contactMethod,
      content_name: 'Contact Request'
    }
  })
}

export const trackLeadDual = async (
  leadSource: string = 'website',
  userData?: UserInfo
) => {
  await trackEventDual('Lead', {
    userData,
    customData: { 
      content_name: 'Lead Generation',
      lead_source: leadSource,
      content_category: 'Lead'
    }
  })
}

export const trackScheduleDual = async (
  appointmentType: string = 'consultation',
  userData?: UserInfo
) => {
  await trackEventDual('Schedule', {
    userData,
    customData: {
      content_name: `${appointmentType} Scheduled`,
      appointment_type: appointmentType,
      content_category: 'Appointment'
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
      content_name: `${applicationType} Application`,
      application_type: applicationType,
      content_category: 'Application'
    }
  })
}

// Insurance-specific implementations using the base events
export const trackQuoteRequestDual = async (
  insuranceType: string,
  userData?: UserInfo
) => {
  // Use SubmitApplication for quote requests as it's closest match
  await trackSubmitApplicationDual(`${insuranceType}_quote`, userData)
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
  // Route different form types to appropriate events
  if (formType.includes('quote') || formType.includes('application')) {
    await trackSubmitApplicationDual(formType, userData)
  } else if (formType.includes('contact')) {
    await trackContactDual('form', userData)
  } else {
    await trackLeadDual(formType, userData)
  }
}

export const trackConsultationBookedDual = async (userData?: UserInfo) => {
  await trackScheduleDual('consultation', userData)
}

export const trackInsuranceQuoteCustomizationDual = async (
  insuranceType: string,
  userData?: UserInfo
) => {
  await trackCustomizeProductDual(insuranceType, userData)
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
export const trackPhoneCall = () => trackEvent('Contact', { contact_method: 'phone' })
export const trackEmailContact = () => trackEvent('Contact', { contact_method: 'email' })
export const trackFormSubmission = (formType: string) => trackEvent('Lead', { form_type: formType })