"use server"

import { httpsCallable, getFunctions } from 'firebase/functions'
import { initializeApp, getApps } from 'firebase/app'

// Initialize Firebase app for functions
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]
const functions = getFunctions(app)

// Dental Insurance Quotes
export interface DentalQuoteParams {
  zipCode: string
  age: number
  gender: "M" | "F"
  tobacco: "0" | "1"
  covered_members: "I" | "S" | "C" | "F" // Individual, Spouse, Children, Family
}

export interface DentalQuote {
  id: string
  monthly_premium: number
  carrier: {
    name: string
    full_name?: string
    logo_url: string | null
  }
  plan_name: string
  am_best_rating: string
  benefit_amount: string
  benefit_quantifier: string
  benefit_notes?: string
  limitation_notes?: string
  base_plans?: Array<{
    name: string
    benefits: Array<{
      rate: number
      amount?: string
      quantifier?: string
    }>
    benefit_notes?: string
    limitation_notes?: string
  }>
}

export async function getDentalQuotes(params: DentalQuoteParams): Promise<{ quotes?: DentalQuote[]; error?: string }> {
  try {
    console.log('Dental quote request:', params)
    
    const getDentalQuotesFn = httpsCallable(functions, 'getDentalQuotes')
    
    const functionParams = {
      zip5: params.zipCode,
      age: params.age,
      gender: params.gender,
      tobacco: parseInt(params.tobacco),
      covered_members: params.covered_members
    }
    
    const result = await getDentalQuotesFn(functionParams)
    
    let rawQuotes: unknown[] = []
    if (result.data) {
      if (typeof result.data === 'object' && 'quotes' in result.data && Array.isArray((result.data as Record<string, unknown>).quotes)) {
        rawQuotes = (result.data as Record<string, unknown>).quotes as unknown[]
      } else if (Array.isArray(result.data)) {
        rawQuotes = result.data
      }
    }
    
    const transformedQuotes: DentalQuote[] = rawQuotes.map((quoteData: any, idx) => {
      const carrier = {
        name: quoteData.carrier?.name || quoteData.company_name || 'Unknown Carrier',
        full_name: quoteData.carrier?.full_name || quoteData.company_full_name || '',
        logo_url: quoteData.carrier?.logo_url || null
      }
      
      return {
        id: quoteData.id || quoteData.key || `dental-${idx}`,
        monthly_premium: parseFloat(quoteData.monthly_premium || 0),
        carrier,
        plan_name: quoteData.plan_name || 'Dental Insurance Plan',
        am_best_rating: quoteData.am_best_rating || 'N/A',
        benefit_amount: quoteData.benefit_amount || '',
        benefit_quantifier: quoteData.benefit_quantifier || '',
        benefit_notes: quoteData.benefit_notes,
        limitation_notes: quoteData.limitation_notes,
        base_plans: quoteData.base_plans || []
      }
    })
    
    // Sort by monthly premium
    transformedQuotes.sort((a, b) => a.monthly_premium - b.monthly_premium)
    
    return { quotes: transformedQuotes }
  } catch (error: unknown) {
    console.error('Error fetching Dental quotes:', error)
    return { error: 'Unable to fetch dental quotes at this time. Please try again later.' }
  }
}
