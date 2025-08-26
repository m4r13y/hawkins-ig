import AnimatedFooter from "@/components/animated-footer"
import HealthcareMarketplaceQuoter from "@/components/healthcare-marketplace-quoter"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Healthcare Marketplace Insurance Quotes | Hawkins Insurance Group',
  description: 'Navigate the Healthcare Marketplace with ease. Get instant quotes for ACA-compliant health insurance plans and see if you qualify for subsidies.',
  alternates: {
    canonical: '/quotes/healthcare-marketplace',
  },
}

export default function HealthcareMarketplaceQuotesPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="relative z-10">
        <Navbar />
        <HealthcareMarketplaceQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}

