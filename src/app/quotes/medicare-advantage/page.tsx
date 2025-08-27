import AnimatedFooter from "@/components/animated-footer"
import MedicareAdvantageQuoter from "@/components/medicare-advantage-quoter"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medicare Advantage Plan Quotes (Part C) | Hawkins Insurance Group',
  description: 'Explore Medicare Advantage (Part C) plans. Get instant quotes to compare benefits, including HMO and PPO options, from top-rated insurance carriers.',
  alternates: {
    canonical: '/quotes/medicare-advantage',
  },
}

export default function MedicareAdvantageQuotesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <MedicareAdvantageQuoter />
        </div>
        <AnimatedFooter />
      </div>
    </div>
  )
}

