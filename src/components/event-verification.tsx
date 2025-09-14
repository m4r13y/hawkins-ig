"use client"

import { useState } from 'react'
import { trackNewsletterSignup, trackGetStartedSubmission, trackPageView } from './form-tracking'

// Event Parameter Verification Helper
// Use this to test what data is being sent to Facebook

interface EventVerification {
  eventName: string
  hasEventId: boolean
  hasEmail: boolean
  hasPhone: boolean
  hasName: boolean
  hasLocation: boolean
  missingParameters: string[]
  recommendations: string[]
}

export function verifyEventData(
  eventName: string,
  userData?: {
    email?: string
    phone?: string
    firstName?: string
    lastName?: string
    city?: string
    state?: string
    zipCode?: string
  },
  customData?: Record<string, any>
): EventVerification {
  const verification: EventVerification = {
    eventName,
    hasEventId: true, // Always generated in our implementation
    hasEmail: !!userData?.email,
    hasPhone: !!userData?.phone,
    hasName: !!(userData?.firstName && userData?.lastName),
    hasLocation: !!(userData?.zipCode || userData?.state),
    missingParameters: [],
    recommendations: []
  }

  // Check for missing high-value parameters
  if (!userData?.email) {
    verification.missingParameters.push('Email')
    verification.recommendations.push('🔴 CRITICAL: Collect email addresses - highest match rate for insurance leads')
  }

  if (!userData?.phone) {
    verification.missingParameters.push('Phone')
    verification.recommendations.push('🟡 HIGH: Phone numbers are valuable for insurance business')
  }

  if (!userData?.firstName || !userData?.lastName) {
    verification.missingParameters.push('First/Last Name')
    verification.recommendations.push('🟡 MEDIUM: Names improve customer matching accuracy')
  }

  if (!userData?.zipCode) {
    verification.missingParameters.push('Zip Code')
    verification.recommendations.push('🟡 MEDIUM: Zip codes help with location-based insurance targeting')
  }

  if (!userData?.state) {
    verification.missingParameters.push('State')
    verification.recommendations.push('🟡 MEDIUM: State is important for insurance compliance and targeting')
  }

  // Event-specific recommendations
  switch (eventName) {
    case 'Lead':
    case 'SubmitApplication':
      if (!userData?.email && !userData?.phone) {
        verification.recommendations.push('🔴 CRITICAL: Lead events should have email OR phone for follow-up')
      }
      break
    
    case 'CompleteRegistration':
      if (!userData?.email) {
        verification.recommendations.push('🔴 CRITICAL: Registration events should always have email')
      }
      break
    
    case 'Schedule':
      if (!userData?.phone && !userData?.email) {
        verification.recommendations.push('🔴 CRITICAL: Appointment scheduling needs contact information')
      }
      break
  }

  return verification
}

// Test function to check your current setup
export function testEventCapture() {
  console.log('🔍 Testing Event Data Capture...')
  
  // Test with minimal data
  const minimalTest = verifyEventData('Lead', {})
  console.log('Minimal Data Test:', minimalTest)
  
  // Test with complete data
  const completeTest = verifyEventData('Lead', {
    email: 'test@example.com',
    phone: '555-123-4567',
    firstName: 'John',
    lastName: 'Doe',
    zipCode: '12345',
    state: 'TX'
  })
  console.log('Complete Data Test:', completeTest)
  
  return { minimalTest, completeTest }
}

// Facebook Parameter Compliance for Insurance
export const INSURANCE_RECOMMENDED_PARAMETERS = {
  // Always try to collect these for insurance leads
  CRITICAL: ['email', 'phone'],
  
  // High value for insurance business
  HIGH_VALUE: ['firstName', 'lastName', 'zipCode', 'state'],
  
  // Nice to have for better targeting
  OPTIONAL: ['city', 'dateOfBirth', 'gender'],
  
  // Events that require specific parameters
  EVENT_REQUIREMENTS: {
    'Lead': ['email', 'phone'], // At least one contact method
    'SubmitApplication': ['email', 'firstName', 'lastName'], // Application needs identity
    'CompleteRegistration': ['email'], // Account creation needs email
    'Schedule': ['phone', 'email'], // Appointments need contact info
    'Contact': ['email', 'phone'] // Contact requests need contact method
  }
}

// Quick check function for forms
export function validateFormDataForEvent(
  eventName: string,
  formData: Record<string, any>
): { isValid: boolean; missing: string[]; warnings: string[] } {
  const eventRequirements = INSURANCE_RECOMMENDED_PARAMETERS.EVENT_REQUIREMENTS as Record<string, string[]>
  const requirements = eventRequirements[eventName] || []
  const missing: string[] = []
  const warnings: string[] = []
  
  // Check critical requirements
  const hasEmail = formData.email?.trim()
  const hasPhone = formData.phone?.trim()
  
  if (requirements.includes('email') && !hasEmail) {
    missing.push('Email address')
  }
  
  if (requirements.includes('phone') && !hasPhone) {
    missing.push('Phone number')
  }
  
  // For insurance, warn if we don't have at least email OR phone
  if (!hasEmail && !hasPhone) {
    warnings.push('No contact information captured - this will significantly reduce event matching')
  }
  
  // Check name requirements
  if (requirements.includes('firstName') && !formData.firstName?.trim()) {
    missing.push('First name')
  }
  
  if (requirements.includes('lastName') && !formData.lastName?.trim()) {
    missing.push('Last name')
  }
  
  return {
    isValid: missing.length === 0,
    missing,
    warnings
  }
}