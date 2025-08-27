import AnimatedFooter from "@/components/animated-footer"
import MedicareQuoter from "@/components/medicare-quoter"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medicare Insurance Quotes | Hawkins Insurance Group',
  description: 'Compare Medicare Advantage (Part C), Medicare Supplement (Medigap), and Prescription Drug (Part D) plans. Get instant quotes to find the right Medicare coverage.',
  alternates: {
    canonical: '/quotes/medicare',
  },
}

export default function MedicareQuotes() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <MedicareQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}

