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

// Medicare Supplement (Medigap) Quotes
export interface MedigapQuoteParams {
  zipCode: string
  age: string
  gender: "M" | "F"
  tobacco: "0" | "1"
  plans: string[] // Plan A, B, C, D, F, G, K, L, M, N
}

export interface MedigapQuote {
  id: string
  monthly_premium: number
  annual_premium: number
  carrier: {
    name: string
    full_name: string
    logo_url: string | null
    naic: string
  }
  plan_name: string
  plan_letter: string
  am_best_rating: string
  naic: string
  state: string
  zip5: string
  effective_date: string
  key: string
}

export async function getMedigapQuotes(params: MedigapQuoteParams): Promise<{ quotes?: MedigapQuote[]; error?: string }> {
  try {
    console.log('Medigap quote request:', params)
    
    const allQuotes: MedigapQuote[] = []
    const getMedigapQuotesFn = httpsCallable(functions, 'getMedigapQuotes')
    
    for (const plan of params.plans) {
      try {
        const functionParams = {
          zip5: params.zipCode,
          age: parseInt(params.age),
          gender: params.gender,
          tobacco: parseInt(params.tobacco),
          plan: plan
        }
        
        const result = await getMedigapQuotesFn(functionParams)
        
        let rawQuotes: unknown[] = []
        if (result.data) {
          if (typeof result.data === 'object' && 'quotes' in result.data && Array.isArray((result.data as Record<string, unknown>).quotes)) {
            rawQuotes = (result.data as Record<string, unknown>).quotes as unknown[]
          } else if (Array.isArray(result.data)) {
            rawQuotes = result.data
          }
        }
        
        const transformedQuotes = rawQuotes.map((quoteData: any, idx) => {
          const companyBase = quoteData.company_base || {}
          const carrier = {
            name: companyBase.name || companyBase.full_name || 'Unknown Carrier',
            full_name: companyBase.name_full || companyBase.full_name || companyBase.name || '',
            logo_url: companyBase.logo_url || null,
            naic: companyBase.naic || quoteData.naic || ''
          }
          
          return {
            id: quoteData.id || quoteData.key || `medigap-${plan}-${idx}`,
            monthly_premium: parseFloat(quoteData.monthly_premium || 0),
            annual_premium: parseFloat(quoteData.annual_premium || (quoteData.monthly_premium * 12) || 0),
            carrier,
            plan_name: `Medicare Supplement Plan ${plan}`,
            plan_letter: plan,
            am_best_rating: quoteData.am_best_rating || 'N/A',
            naic: quoteData.naic || '',
            state: quoteData.state || '',
            zip5: quoteData.zip5 || params.zipCode,
            effective_date: quoteData.effective_date || '',
            key: quoteData.key || ''
          }
        })
        
        allQuotes.push(...transformedQuotes)
      } catch (planError) {
        console.error(`Error fetching quotes for plan ${plan}:`, planError)
      }
    }
    
    // Sort by monthly premium
    allQuotes.sort((a, b) => a.monthly_premium - b.monthly_premium)
    
    return { quotes: allQuotes }
  } catch (error: unknown) {
    console.error('Error fetching Medigap quotes:', error)
    return { error: 'Unable to fetch quotes at this time. Please try again later.' }
  }
}
