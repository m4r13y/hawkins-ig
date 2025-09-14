// Meta Core Setup Compliant Dual Tracking
// This version ensures only standard Meta parameters are sent

'use client'

import { generateEventId } from './dual-tracking'

// Standard Meta parameters that are allowed under Core Setup
interface CompliantCustomData {
  content_name?: string
  content_category?: string
  content_ids?: string[]
  content_type?: 'product' | 'product_group' // Only these values allowed
  currency?: string
  value?: number
  num_items?: number
}

interface CompliantUserInfo {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  dateOfBirth?: string
  gender?: 'm' | 'f'
}

interface CompliantEventOptions {
  userData?: CompliantUserInfo
  customData?: CompliantCustomData
  eventId?: string
}

// Compliant dual tracking function
async function trackEventDualCompliant(
  eventName: string,
  options: CompliantEventOptions = {}
): Promise<void> {
  const eventId = options.eventId || generateEventId()
  
  // Track with Meta Pixel (client-side) - only standard parameters
  if (typeof window !== 'undefined' && window.fbq) {
    const pixelData = {
      ...options.customData, // Only compliant parameters
      event_id: eventId // For deduplication
    }
    
    window.fbq('track', eventName, pixelData)
  }

  // Track with Conversions API (server-side) - only standard parameters
  try {
    const response = await fetch('/api/conversions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventName,
        eventTime: Math.floor(Date.now() / 1000),
        eventId,
        eventSourceUrl: window?.location?.hostname || undefined, // Domain only, no path
        userData: options.userData || {},
        customData: options.customData || {}
      }),
    })
    
    if (!response.ok) {
      console.error('Conversions API error:', response.status)
    }
  } catch (error) {
    console.error('Failed to send to Conversions API:', error)
  }
}

// Compliant event tracking functions using only standard parameters

export const trackViewContentCompliant = async (
  contentCategory: string,
  userData?: CompliantUserInfo,
  contentName?: string
) => {
  await trackEventDualCompliant('ViewContent', {
    userData,
    customData: {
      content_name: contentName || `${contentCategory} Page`,
      content_category: contentCategory
    }
  })
}

export const trackCompleteRegistrationCompliant = async (
  registrationCategory: string,
  userData?: CompliantUserInfo
) => {
  await trackEventDualCompliant('CompleteRegistration', {
    userData,
    customData: {
      content_name: 'Registration Completed',
      content_category: registrationCategory
    }
  })
}

export const trackLeadCompliant = async (
  leadCategory: string,
  userData?: CompliantUserInfo
) => {
  await trackEventDualCompliant('Lead', {
    userData,
    customData: {
      content_name: 'Lead Generated',
      content_category: leadCategory
    }
  })
}

export const trackSubmitApplicationCompliant = async (
  applicationCategory: string,
  userData?: CompliantUserInfo
) => {
  await trackEventDualCompliant('SubmitApplication', {
    userData,
    customData: {
      content_name: 'Application Submitted',
      content_category: applicationCategory
    }
  })
}

export const trackContactCompliant = async (
  contactCategory: string,
  userData?: CompliantUserInfo
) => {
  await trackEventDualCompliant('Contact', {
    userData,
    customData: {
      content_name: 'Contact Request',
      content_category: contactCategory
    }
  })
}

export const trackInitiateCheckoutCompliant = async (
  checkoutCategory: string,
  userData?: CompliantUserInfo,
  value?: number
) => {
  await trackEventDualCompliant('InitiateCheckout', {
    userData,
    customData: {
      content_name: 'Quote Request',
      content_category: checkoutCategory,
      currency: 'USD',
      value: value || 0
    }
  })
}

export const trackScheduleCompliant = async (
  scheduleCategory: string,
  userData?: CompliantUserInfo
) => {
  await trackEventDualCompliant('Schedule', {
    userData,
    customData: {
      content_name: 'Appointment Scheduled',
      content_category: scheduleCategory
    }
  })
}

// Custom event with compliant parameters only
export const trackCustomEventCompliant = trackEventDualCompliant

// Export the generateEventId function for external use
export { generateEventId }

// Helper function to clean URLs for compliance (domain only)
export const getCompliantUrl = (fullUrl?: string): string | undefined => {
  if (!fullUrl) return undefined
  
  try {
    const url = new URL(fullUrl)
    return url.origin // Returns just protocol + domain
  } catch {
    return undefined
  }
}

// Helper to validate that custom data only contains standard parameters
export const validateCompliantCustomData = (customData: any): CompliantCustomData => {
  const allowedKeys = [
    'content_name',
    'content_category', 
    'content_ids',
    'content_type',
    'currency',
    'value',
    'num_items'
  ]
  
  const compliantData: CompliantCustomData = {}
  
  Object.keys(customData || {}).forEach(key => {
    if (allowedKeys.includes(key)) {
      compliantData[key as keyof CompliantCustomData] = customData[key]
    } else {
      console.warn(`Skipping non-compliant parameter: ${key}`)
    }
  })
  
  return compliantData
}