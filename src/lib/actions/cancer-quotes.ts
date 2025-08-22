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

// Cancer Insurance Quotes
export interface CancerQuoteParams {
  state: "TX" | "GA"
  age: number
  familyType: "Applicant Only" | "Applicant and Spouse" | "Applicant and Child(ren)" | "Applicant and Spouse and Child(ren)"
  tobaccoStatus: "Non-Tobacco" | "Tobacco"
  premiumMode: "Monthly Bank Draft" | "Monthly Credit Card" | "Monthly Direct Mail" | "Annual"
  carcinomaInSitu: "25%" | "100%"
  benefitAmount: number
}

export interface CancerQuote {
  monthly_premium: number
  carrier: string
  plan_name: string
  benefit_amount: number
  state: string
  age: number
  family_type: string
  tobacco_status: string
  premium_mode: string
  carcinoma_in_situ: string
}

export async function getCancerQuotes(params: CancerQuoteParams): Promise<{ quotes?: CancerQuote[]; error?: string }> {
  try {
    console.log('Cancer quote request:', params)
    
    const getCancerQuotesFn = httpsCallable(functions, 'getCancerInsuranceQuote')
    
    const result = await getCancerQuotesFn(params)
    
    // Cancer quotes returns a single quote object
    const quote = result.data as CancerQuote
    
    return { quotes: [quote] }
  } catch (error: unknown) {
    console.error('Error fetching Cancer quotes:', error)
    return { error: 'Unable to fetch cancer insurance quotes at this time. Please try again later.' }
  }
}
