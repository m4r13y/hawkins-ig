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

// Final Expense Life Insurance Quotes
export interface FinalExpenseLifeQuoteParams {
  zipCode: string
  state?: string
  age: number
  gender: "M" | "F"
  tobacco: "0" | "1"
  quotingType: "by_rate" | "by_face_value"
  desiredRate?: number
  desiredFaceValue?: number
  benefitName?: "Graded Benefit" | "Level Benefit" | "Large Pay" | "Return Of Premium" | "Small Pay" | "Single Pay"
  underwritingType?: "Full" | "Simplified" | "Guaranteed"
}

export interface FinalExpenseLifeQuote {
  id: string
  monthly_rate: number
  annual_rate: number
  face_value: number
  face_amount_min: number
  face_amount_max: number
  carrier: {
    name: string
    full_name: string
    logo_url: string | null
    naic: string
  }
  plan_name: string
  company_name: string
  benefit_name: string
  naic: string
  effective_date: string
  expires_date: string
  underwriting_type: string
  am_best_rating: string
  monthly_fee: number
  annual_fee: number
  is_down_payment_plan: boolean
  has_pdf_app: boolean
  e_app_link: string
  key: string
}

export async function getFinalExpenseLifeQuotes(params: FinalExpenseLifeQuoteParams): Promise<{ quotes?: FinalExpenseLifeQuote[]; error?: string }> {
  try {
    console.log('Final Expense Life quote request:', params)
    
    const getFinalExpenseLifeQuotesFn = httpsCallable(functions, 'getFinalExpenseLifeQuotes')
    
    const functionParams = {
      zip5: params.zipCode,
      state: params.state,
      age: params.age,
      gender: params.gender,
      tobacco: parseInt(params.tobacco),
      quote_type: params.quotingType,
      ...(params.quotingType === "by_rate" && params.desiredRate ? {
        desired_rate: params.desiredRate
      } : {}),
      ...(params.quotingType === "by_face_value" && params.desiredFaceValue ? {
        desired_face_value: params.desiredFaceValue
      } : {}),
      ...(params.benefitName ? { benefit_name: params.benefitName } : {}),
      ...(params.underwritingType ? { underwriting_type: params.underwritingType } : {}),
      offset: 0
    }
    
    const result = await getFinalExpenseLifeQuotesFn(functionParams)
    
    let rawQuotes: unknown[] = []
    if (result.data) {
      if (typeof result.data === 'object' && 'quotes' in result.data && Array.isArray((result.data as Record<string, unknown>).quotes)) {
        rawQuotes = (result.data as Record<string, unknown>).quotes as unknown[]
      } else if (Array.isArray(result.data)) {
        rawQuotes = result.data
      }
    }
    
    const transformedQuotes: FinalExpenseLifeQuote[] = rawQuotes.map((quoteData: any, idx) => {
      const monthly_rate = parseFloat(quoteData.monthly_rate || quoteData.monthly_premium || 0)
      const annual_rate = parseFloat(quoteData.annual_rate || (monthly_rate * 12) || 0)
      const face_value = parseFloat(quoteData.face_value || quoteData.face_amount || 0)
      const face_amount_min = parseFloat(quoteData.face_amount_min || face_value || 0)
      const face_amount_max = parseFloat(quoteData.face_amount_max || face_value || 0)
      
      const companyBase = quoteData.company_base || {}
      const carrier = {
        name: companyBase.name || companyBase.full_name || 'Unknown Carrier',
        full_name: companyBase.name_full || companyBase.full_name || companyBase.name || '',
        naic: companyBase.naic || quoteData.naic || '',
        logo_url: companyBase.logo_url || null
      }
      
      return {
        id: quoteData.id || quoteData.key || `final-expense-${idx}`,
        monthly_rate,
        annual_rate,
        face_value,
        face_amount_min,
        face_amount_max,
        carrier,
        plan_name: quoteData.plan_name || 'Final Expense Life Insurance',
        company_name: quoteData.company_name || carrier.name,
        benefit_name: quoteData.benefit_name || '',
        naic: quoteData.naic || '',
        effective_date: quoteData.effective_date || '',
        expires_date: quoteData.expires_date || '',
        underwriting_type: quoteData.underwriting_type || params.underwritingType || '',
        am_best_rating: quoteData.am_best_rating || 'N/A',
        monthly_fee: parseFloat(quoteData.monthly_fee || 0),
        annual_fee: parseFloat(quoteData.annual_fee || 0),
        is_down_payment_plan: quoteData.is_down_payment_plan || false,
        has_pdf_app: quoteData.has_pdf_app || false,
        e_app_link: quoteData.e_app_link || '',
        key: quoteData.key || ''
      }
    })
    
    // Sort by monthly rate
    transformedQuotes.sort((a, b) => a.monthly_rate - b.monthly_rate)
    
    return { quotes: transformedQuotes }
  } catch (error: unknown) {
    console.error('Error fetching Final Expense Life quotes:', error)
    return { error: 'Unable to fetch final expense life quotes at this time. Please try again later.' }
  }
}
