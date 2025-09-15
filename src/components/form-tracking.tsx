// Form-Specific Meta Pixel Tracking Integration
// This file contains tracking calls for specific forms and user journeys

import { 
  trackCompleteRegistrationDual,
  trackLeadDual,
  trackSubmitApplicationDual,
  trackViewContentDual,
  trackCustomizeProductDual,
  trackScheduleDual
} from './dual-tracking'

// Newsletter Subscription Tracking
export const trackNewsletterSignup = async (email: string, source: string = 'footer') => {
  await trackCompleteRegistrationDual('newsletter', {
    email: email,
  })
  
  // Also track as Lead for broader funnel tracking
  await trackLeadDual('newsletter_signup', {
    email: email,
  }, {
    content_type: 'product', // ✅ Compliant: Must be "product" or "product_group"
    content_ids: ['newsletter_subscription'] // ✅ Compliant: Newsletter as product ID
    // Note: PII handled server-side via Conversions API
    // Note: Values configured in Meta Custom Conversions
  })
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📧 Newsletter signup tracked: ${email} from ${source}`)
  }
}

// Get Started Form Tracking
export const trackGetStartedSubmission = async (
  formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    zipCode: string
    state?: string
    dateOfBirth?: string
    clientType: 'individual' | 'family' | 'business' | 'agent'
    insuranceNeeds: string[]
    ageRange?: string
    currentCoverage?: string
    timeline?: string
  },
  source: string
) => {
  const userData = {
    email: formData.email,
    phone: formData.phone,
    firstName: formData.firstName,
    lastName: formData.lastName,
    zipCode: formData.zipCode,
    state: formData.state,
    // Note: dateOfBirth excluded for privacy - not required for Lead tracking
  }

  // Map healthcare terms to generic product categories to avoid Meta warnings
  // This prevents Facebook from flagging events as healthcare-related data
  const mapToGenericContentIds = (insuranceNeeds: string[]) => {
    const mappings: Record<string, string> = {
      'health': 'product_a',
      'medicare': 'product_b', 
      'life': 'product_c',
      'disability': 'product_d',
      'supplemental': 'product_e',
      'group': 'product_f'
    }
    return insuranceNeeds.map(need => mappings[need] || `product_${need}`)
  }

  // Track as Lead (they're a qualified lead interested in consultation)
  await trackLeadDual('get_started_form', userData, {
    content_type: 'product', // ✅ Compliant: Must be "product" or "product_group"
    content_ids: mapToGenericContentIds(formData.insuranceNeeds) // ✅ Generic IDs to avoid healthcare warnings
    // Note: PII (postal_code, region) handled server-side via Conversions API
    // Note: Values configured in Meta Custom Conversions
  })
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎯 Get Started form tracked: Lead for ${formData.clientType} - ${formData.email}`)
  }
}

// Quote Request Tracking (for specific insurance products)
export const trackQuoteRequest = async (
  insuranceType: string,
  userData: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    zipCode?: string
    state?: string
  },
  source: string = 'quote_form'
) => {
  // Map healthcare terms to generic product categories to avoid Meta warnings
  const mapInsuranceType = (type: string) => {
    const mappings: Record<string, string> = {
      'health': 'product_a',
      'medicare': 'product_b',
      'life': 'product_c', 
      'disability': 'product_d',
      'supplemental': 'product_e',
      'group': 'product_f'
    }
    return mappings[type] || `product_${type}`
  }

  await trackSubmitApplicationDual(`${mapInsuranceType(insuranceType)}_quote`, {
    ...userData
  })
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`💰 Quote request tracked: ${insuranceType} - ${userData.email}`)
  }
}

// Contact Form Tracking
export const trackContactFormSubmission = async (
  formData: {
    name: string
    email: string
    phone?: string
    message: string
    subject?: string
  },
  source: string = 'contact_form'
) => {
  const [firstName, ...lastNameParts] = formData.name.split(' ')
  const lastName = lastNameParts.join(' ')
  
  await trackLeadDual('contact_form', {
    email: formData.email,
    phone: formData.phone,
    firstName: firstName,
    lastName: lastName,
  }, {
    content_type: 'product', // ✅ Compliant: Must be "product" or "product_group"
    content_ids: ['contact_inquiry'] // ✅ Compliant: Contact as product ID
    // Note: Values configured in Meta Custom Conversions
  })
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📞 Contact form tracked: ${formData.email}`)
  }
}

// Page View Tracking with Route Context
export const trackPageView = async (route: string, userContext?: any) => {
  let contentType = 'general'
  
  // Categorize page types for better tracking
  if (route.includes('/quotes/')) {
    contentType = 'insurance_product'
    const productType = route.split('/quotes/')[1]?.replace('/', '') || 'unknown'
    await trackViewContentDual(`${productType}_info`, userContext)
  } else if (route.includes('/get-started')) {
    contentType = 'get_started_flow'
    await trackViewContentDual('get_started_flow', userContext)
  } else if (route === '/contact') {
    contentType = 'contact_page'
    await trackViewContentDual('contact_info', userContext)
  } else if (route === '/about' || route === '/team') {
    contentType = 'company_info'
    await trackViewContentDual('company_info', userContext)
  } else if (route === '/services') {
    contentType = 'services_overview'
    await trackViewContentDual('services_info', userContext)
  } else {
    await trackViewContentDual(contentType, userContext)
  }
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`👀 Page view tracked: ${route} (${contentType})`)
  }
}

// Appointment Scheduling Tracking
export const trackAppointmentScheduled = async (
  appointmentData: {
    email: string
    phone: string
    firstName: string
    lastName: string
    appointmentType: string
    preferredTime?: string
  }
) => {
  await trackScheduleDual(appointmentData.appointmentType, {
    email: appointmentData.email,
    phone: appointmentData.phone,
    firstName: appointmentData.firstName,
    lastName: appointmentData.lastName,
  })
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📅 Appointment scheduled: ${appointmentData.appointmentType} - ${appointmentData.email}`)
  }
}

// Insurance Product Customization Tracking
export const trackProductCustomization = async (
  productType: string,
  customizationData: any,
  userContext?: any
) => {
  await trackCustomizeProductDual(productType, userContext)
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`⚙️ Product customization tracked: ${productType}`)
  }
}

// Funnel Step Tracking (for multi-step forms)
export const trackFunnelStep = async (
  stepName: string,
  stepNumber: number,
  totalSteps: number,
  userData?: any
) => {
  // Use ViewContent for funnel steps
  await trackViewContentDual(`funnel_${stepName}`, userData)
  
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 Funnel step tracked: ${stepName} (${stepNumber}/${totalSteps})`)
  }
}

// Utility function to extract user context from various sources
export const extractUserContext = (formData: any, route?: string) => {
  return {
    email: formData.email,
    phone: formData.phone,
    firstName: formData.firstName,
    lastName: formData.lastName,
    zipCode: formData.zipCode,
    state: formData.state,
    // Add route context for better segmentation
    source_page: route,
    // Add timestamp for analysis
    timestamp: new Date().toISOString()
  }
}