import AnimatedFooter from "@/components/animated-footer"
import DentalQuoter from "@/components/dental-quoter"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dental & Vision Insurance Quotes | Hawkins Insurance Group',
  description: 'Find affordable dental and vision insurance plans. Get instant quotes to compare coverage for check-ups, procedures, glasses, and contacts from leading providers.',
  alternates: {
    canonical: '/quotes/dental-vision',
  },
}

export default function DentalVisionQuotes() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="relative z-10">
        <Navbar />
        <DentalQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}

