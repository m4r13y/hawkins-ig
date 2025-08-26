import AnimatedFooter from "@/components/animated-footer"
import CancerInsuranceQuoter from "@/components/cancer-insurance-quoter"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cancer Insurance Quotes | Hawkins Insurance Group',
  description: 'Get instant quotes for cancer insurance plans. Protect yourself and your family from the financial impact of a cancer diagnosis with affordable coverage from top carriers.',
  alternates: {
    canonical: '/quotes/cancer-insurance',
  },
}

export default function CancerInsuranceQuotesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="relative z-10">
        <Navbar />
        <CancerInsuranceQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}

