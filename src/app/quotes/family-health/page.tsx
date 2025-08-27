import AnimatedFooter from "@/components/animated-footer"
import HealthcareMarketplaceQuoter from "@/components/healthcare-marketplace-quoter"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Family Health Insurance Quotes | Hawkins Insurance Group',
  description: 'Explore affordable family health insurance plans through the Healthcare Marketplace. Get instant quotes and find the right coverage for you and your loved ones.',
  alternates: {
    canonical: '/quotes/family-health',
  },
}

export default function FamilyHealthQuotes() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <HealthcareMarketplaceQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}

