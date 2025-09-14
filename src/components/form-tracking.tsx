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
    content_ids: ['newsletter_subscription'], // ✅ Compliant: Newsletter as product ID
    value: 25, // ✅ Standard parameter
    currency: 'USD', // ✅ Standard parameter
    lead_event_source: source, // ✅ Compliant: Newsletter source
    item_number: `CV_003_newsletter_${Date.now()}`, // ✅ Compliant: Unique identifier
    user_bucket: 'newsletter_subscriber' // ✅ Compliant: Newsletter audience bucket
  })
  
  console.log(`📧 Newsletter signup tracked: ${email} from ${source}`)
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
    dateOfBirth: formData.dateOfBirth,
  }

  // Track as Schedule event first (they're scheduling a consultation)
  await trackScheduleDual('consultation', userData, {
    content_type: 'product', // ✅ Compliant: Must be "product" or "product_group"
    content_ids: formData.insuranceNeeds, // ✅ Compliant: Insurance types as product IDs
    value: 250, // ✅ Standard parameter
    currency: 'USD', // ✅ Standard parameter
    postal_code: formData.zipCode, // ✅ Standard parameter
    region: formData.state, // ✅ Standard parameter
    lead_event_source: 'get_started_form', // ✅ Compliant: Lead source
    item_number: `CV_001_schedule_${Date.now()}`, // ✅ Compliant: Unique identifier
    user_bucket: formData.clientType // ✅ Compliant: Use for client type (individual/family/business)
  })
  
  // Also track as Lead (they're a qualified lead)
  await trackLeadDual('get_started_form', userData, {
    content_type: 'product', // ✅ Compliant: Must be "product" or "product_group"
    content_ids: formData.insuranceNeeds, // ✅ Compliant: Insurance types as product IDs
    value: 500, // ✅ Standard parameter
    currency: 'USD', // ✅ Standard parameter
    postal_code: formData.zipCode, // ✅ Standard parameter
    region: formData.state, // ✅ Standard parameter
    lead_event_source: 'get_started_form', // ✅ Compliant: Lead source
    item_number: `CV_002_lead_${Date.now()}`, // ✅ Compliant: Unique identifier
    user_bucket: formData.clientType // ✅ Compliant: Use for client type (individual/family/business)
  })
  
  console.log(`🎯 Get Started form tracked: Schedule + Lead for ${formData.clientType} - ${formData.email}`)
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
  await trackSubmitApplicationDual(`${insuranceType}_quote`, {
    ...userData
  })
  
  console.log(`💰 Quote request tracked: ${insuranceType} - ${userData.email}`)
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
  })
  
  console.log(`📞 Contact form tracked: ${formData.email}`)
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
  
  console.log(`👀 Page view tracked: ${route} (${contentType})`)
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
  
  console.log(`📅 Appointment scheduled: ${appointmentData.appointmentType} - ${appointmentData.email}`)
}

// Insurance Product Customization Tracking
export const trackProductCustomization = async (
  productType: string,
  customizationData: any,
  userContext?: any
) => {
  await trackCustomizeProductDual(productType, userContext)
  
  console.log(`⚙️ Product customization tracked: ${productType}`)
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
  
  console.log(`📊 Funnel step tracked: ${stepName} (${stepNumber}/${totalSteps})`)
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