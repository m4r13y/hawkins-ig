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

// Hospital Indemnity Insurance Quotes
export interface HospitalIndemnityQuoteParams {
  zipCode: string
  age: number
  gender: "M" | "F"
  tobacco: "0" | "1"
}

export interface HospitalIndemnityBenefit {
  amount: string
  quantifier: string
  rate: number
}

export interface HospitalIndemnityRider {
  name: string
  note: string | null
  benefits: HospitalIndemnityBenefit[]
  included?: boolean
}

export interface HospitalIndemnityQuote {
  id: string
  carrier: {
    name: string
    full_name: string
    logo_url: string | null
  }
  plan_name: string
  baseBenefits: HospitalIndemnityBenefit[]
  riders: HospitalIndemnityRider[]
  monthly_premium?: number
}

export async function getHospitalIndemnityQuotes(params: HospitalIndemnityQuoteParams): Promise<{ quotes?: HospitalIndemnityQuote[]; error?: string }> {
  try {
    console.log('Hospital Indemnity quote request:', params)
    
    const getHospitalIndemnityQuotesFn = httpsCallable(functions, 'getHospitalIndemnityQuotes')
    
    const functionParams = {
      zip5: params.zipCode,
      age: params.age,
      gender: params.gender,
      tobacco: parseInt(params.tobacco)
    }
    
    const result = await getHospitalIndemnityQuotesFn(functionParams)
    
    let rawQuotes: unknown[] = []
    if (result.data) {
      if (typeof result.data === 'object' && 'quotes' in result.data && Array.isArray((result.data as Record<string, unknown>).quotes)) {
        rawQuotes = (result.data as Record<string, unknown>).quotes as unknown[]
      } else if (Array.isArray(result.data)) {
        rawQuotes = result.data
      }
    }
    
    const transformedQuotes: HospitalIndemnityQuote[] = rawQuotes.map((quoteData: any, idx) => {
      const companyBase = quoteData.company_base || {}
      const existingCarrier = quoteData.carrier || {}
      
      const carrier = {
        name: (companyBase.name ?? companyBase.full_name ?? existingCarrier.name ?? "Unknown") as string,
        full_name: (companyBase.name_full ?? companyBase.full_name ?? companyBase.name ?? existingCarrier.full_name ?? "") as string,
        logo_url: (companyBase.logo_url ?? existingCarrier.logo_url ?? null) as string | null,
      }
      
      // Process base benefits
      const baseBenefits: HospitalIndemnityBenefit[] = []
      if (quoteData.base_benefits && Array.isArray(quoteData.base_benefits)) {
        baseBenefits.push(...quoteData.base_benefits.map((benefit: any) => ({
          amount: benefit.amount || '',
          quantifier: benefit.quantifier || '',
          rate: parseFloat(benefit.rate || 0)
        })))
      }
      
      // Process riders
      const riders: HospitalIndemnityRider[] = []
      if (quoteData.riders && Array.isArray(quoteData.riders)) {
        riders.push(...quoteData.riders.map((rider: any) => ({
          name: rider.name || '',
          note: rider.note || null,
          benefits: (rider.benefits || []).map((benefit: any) => ({
            amount: benefit.amount || '',
            quantifier: benefit.quantifier || '',
            rate: parseFloat(benefit.rate || 0)
          })),
          included: rider.included || false
        })))
      }
      
      return {
        id: quoteData.id || quoteData.key || `hospital-indemnity-${idx}`,
        carrier,
        plan_name: quoteData.plan_name || "Hospital Indemnity Plan",
        baseBenefits,
        riders,
        monthly_premium: parseFloat(quoteData.monthly_premium || 0)
      }
    })
    
    return { quotes: transformedQuotes }
  } catch (error: unknown) {
    console.error('Error fetching Hospital Indemnity quotes:', error)
    return { error: 'Unable to fetch hospital indemnity quotes at this time. Please try again later.' }
  }
}
