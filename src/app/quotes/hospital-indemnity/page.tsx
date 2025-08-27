import AnimatedFooter from "@/components/animated-footer"
import HospitalIndemnityQuoter from "@/components/hospital-indemnity-quoter"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hospital Indemnity Insurance Quotes | Hawkins Insurance Group',
  description: 'Get coverage for out-of-pocket costs associated with hospital stays. Receive instant quotes for hospital indemnity insurance and protect your savings.',
  alternates: {
    canonical: '/quotes/hospital-indemnity',
  },
}

export default function HospitalIndemnityQuotesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <HospitalIndemnityQuoter />
        </div>
        <AnimatedFooter />
      </div>
    </div>
  )
}

