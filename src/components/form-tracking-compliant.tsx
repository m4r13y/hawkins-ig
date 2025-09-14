// Meta Core Setup Compliant Form Tracking
// This version uses ONLY standard Meta parameters to ensure compliance

import { 
  trackCompleteRegistrationCompliant,
  trackLeadCompliant,
  trackSubmitApplicationCompliant,
  trackViewContentCompliant,
  trackInitiateCheckoutCompliant,
  trackContactCompliant
} from './dual-tracking-compliant'

// Newsletter Subscription Tracking (Compliant)
export const trackNewsletterSignupCompliant = async (email: string) => {
  await trackCompleteRegistrationCompliant('newsletter', {
    email: email,
  })
  
  console.log(`📧 Newsletter signup tracked (compliant): ${email}`)
}

// Get Started Form Tracking (Compliant)
export const trackGetStartedSubmissionCompliant = async (
  formData: {
    firstName: string
    lastName: string
    email: string
    phone: string
    zipCode: string
    state?: string
    clientType: 'individual' | 'family' | 'business' | 'agent'
  }
) => {
  // Use content_category instead of custom application_type
  await trackSubmitApplicationCompliant(formData.clientType, {
    email: formData.email,
    phone: formData.phone,
    firstName: formData.firstName,
    lastName: formData.lastName,
    zipCode: formData.zipCode,
    state: formData.state,
  })
  
  console.log(`🎯 Get Started form tracked (compliant): ${formData.clientType} - ${formData.email}`)
}

// Quote Request Tracking (Compliant)
export const trackQuoteRequestCompliant = async (
  insuranceType: 'medicare' | 'life' | 'health' | 'dental' | 'vision' | 'final_expense',
  userData: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    zipCode?: string
    state?: string
  }
) => {
  // Use InitiateCheckout for quote requests with content_category for insurance type
  await trackInitiateCheckoutCompliant(insuranceType, userData)
  
  console.log(`💰 Quote request tracked (compliant): ${insuranceType} - ${userData.email}`)
}

// Contact Form Tracking (Compliant)
export const trackContactFormSubmissionCompliant = async (
  formData: {
    name: string
    email: string
    phone?: string
    message: string
  }
) => {
  const [firstName, ...lastNameParts] = formData.name.split(' ')
  const lastName = lastNameParts.join(' ')
  
  await trackContactCompliant('contact', {
    email: formData.email,
    phone: formData.phone,
    firstName: firstName,
    lastName: lastName,
  })
  
  console.log(`📞 Contact form tracked (compliant): ${formData.email}`)
}

// Page View Tracking (Compliant) - Domain only, no paths
export const trackPageViewCompliant = async (
  pageCategory: 'individual' | 'family' | 'business' | 'agent' | 'quotes' | 'contact' | 'general',
  userContext?: {
    email?: string
    zipCode?: string
  }
) => {
  await trackViewContentCompliant(pageCategory, userContext)
  
  console.log(`👀 Page view tracked (compliant): ${pageCategory}`)
}

// Insurance Product View (Compliant)
export const trackInsuranceProductViewCompliant = async (
  productType: 'medicare' | 'life' | 'health' | 'dental' | 'vision' | 'final_expense',
  userContext?: {
    email?: string
    zipCode?: string
  }
) => {
  await trackViewContentCompliant(productType, userContext)
  
  console.log(`🔍 Product view tracked (compliant): ${productType}`)
}

// Lead Generation (General) - Compliant
export const trackLeadGenerationCompliant = async (
  leadCategory: 'newsletter' | 'contact' | 'quote' | 'consultation',
  userData: {
    email: string
    phone?: string
    firstName?: string
    lastName?: string
    zipCode?: string
    state?: string
  }
) => {
  await trackLeadCompliant(leadCategory, userData)
  
  console.log(`🎯 Lead generated (compliant): ${leadCategory} - ${userData.email}`)
}

// Cross-Domain Transition (Simplified for Compliance)
export const trackCrossDomainTransitionCompliant = async (
  transitionType: 'quote_request' | 'consultation' | 'referral',
  userData?: {
    email?: string
    zipCode?: string
  }
) => {
  // Can only track that a transition happened, not specific domains or journeys
  await trackViewContentCompliant(transitionType, userData)
  
  console.log(`🔗 Cross-domain transition tracked (compliant): ${transitionType}`)
}

// Utility: Extract compliant page category from route
export const getCompliantPageCategory = (route: string): string => {
  // Since we can't send URL paths, categorize based on route for local tracking only
  if (route.includes('/get-started/individual')) return 'individual'
  if (route.includes('/get-started/family')) return 'family'
  if (route.includes('/get-started/business')) return 'business'
  if (route.includes('/get-started/agent')) return 'agent'
  if (route.includes('/quotes/')) return 'quotes'
  if (route.includes('/contact')) return 'contact'
  
  return 'general'
}

// Utility: Extract insurance type from route for compliant tracking
export const getInsuranceTypeFromRoute = (route: string): string => {
  if (route.includes('medicare')) return 'medicare'
  if (route.includes('life')) return 'life'
  if (route.includes('health')) return 'health'
  if (route.includes('dental')) return 'dental'
  if (route.includes('vision')) return 'vision'
  if (route.includes('final-expense')) return 'final_expense'
  
  return 'general'
}