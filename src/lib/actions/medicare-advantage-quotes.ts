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

// Medicare Advantage Quotes
export interface MedicareAdvantageQuoteParams {
  zipCode?: string
  state?: string
  county?: string
  plan: "original" | "snp" | "pdp"
  sort?: "price" | "rating" | "name"
  order?: "asc" | "desc"
  effectiveDate?: string
}

export interface MedicareAdvantageQuote {
  id: string
  plan_name: string
  carrier: {
    name: string
    full_name: string
    logo_url: string | null
    naic: string
  }
  monthly_premium: number
  annual_premium: number
  deductible: number
  out_of_pocket_max: number
  star_rating: number
  plan_type: string
  service_area: string[]
  formulary_id: string
  benefits: {
    medical: any[]
    pharmacy: any[]
    supplemental: any[]
  }
  key: string
  effective_date: string
  expires_date: string
}

export async function getMedicareAdvantageQuotes(params: MedicareAdvantageQuoteParams): Promise<{ quotes?: MedicareAdvantageQuote[]; error?: string }> {
  try {
    const getMedicareAdvantageQuotesFn = httpsCallable(functions, 'getMedicareAdvantageQuotes')
    
    const functionParams = {
      ...(params.zipCode ? { zip5: params.zipCode } : {}),
      ...(params.state ? { state: params.state } : {}),
      ...(params.county ? { county: params.county } : {}),
      plan: params.plan,
      sort: params.sort || "price",
      order: params.order || "asc",
      ...(params.effectiveDate ? { effective_date: params.effectiveDate } : {}),
      offset: 0
    }
    
    const result = await getMedicareAdvantageQuotesFn(functionParams)
    
    let rawQuotes: unknown[] = []
    if (result.data) {
      if (typeof result.data === 'object' && 'quotes' in result.data && Array.isArray((result.data as Record<string, unknown>).quotes)) {
        rawQuotes = (result.data as Record<string, unknown>).quotes as unknown[]
      } else if (Array.isArray(result.data)) {
        rawQuotes = result.data
      }
    }
    
    const transformedQuotes: MedicareAdvantageQuote[] = rawQuotes.map((quoteData: any, idx) => {
      const companyBase = quoteData.company_base || {}
      const carrier = {
        name: companyBase.name || companyBase.full_name || 'Unknown Carrier',
        full_name: companyBase.name_full || companyBase.full_name || companyBase.name || '',
        naic: companyBase.naic || quoteData.naic || '',
        logo_url: companyBase.logo_url || null
      }
      
      return {
        id: quoteData.id || quoteData.key || `medicare-advantage-${idx}`,
        plan_name: quoteData.plan_name || 'Medicare Advantage Plan',
        carrier,
        monthly_premium: parseFloat(quoteData.monthly_premium || 0),
        annual_premium: parseFloat(quoteData.annual_premium || (quoteData.monthly_premium * 12) || 0),
        deductible: parseFloat(quoteData.deductible || 0),
        out_of_pocket_max: parseFloat(quoteData.out_of_pocket_max || 0),
        star_rating: parseFloat(quoteData.star_rating || 0),
        plan_type: quoteData.plan_type || params.plan,
        service_area: quoteData.service_area || [],
        formulary_id: quoteData.formulary_id || '',
        benefits: {
          medical: quoteData.medical_benefits || [],
          pharmacy: quoteData.pharmacy_benefits || [],
          supplemental: quoteData.supplemental_benefits || []
        },
        key: quoteData.key || '',
        effective_date: quoteData.effective_date || '',
        expires_date: quoteData.expires_date || ''
      }
    })
    
    // Sort by monthly premium if not already sorted
    if (params.sort === "price" || !params.sort) {
      transformedQuotes.sort((a, b) => 
        params.order === "desc" ? b.monthly_premium - a.monthly_premium : a.monthly_premium - b.monthly_premium
      )
    }
    
    return { quotes: transformedQuotes }
  } catch (error: unknown) {
    console.error('Error fetching Medicare Advantage quotes:', error)
    return { error: 'Unable to fetch Medicare Advantage quotes at this time. Please try again later.' }
  }
}
