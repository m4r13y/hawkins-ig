import AnimatedFooter from "@/components/animated-footer"
import GenericInsuranceQuoter from "@/components/generic-insurance-quoter"
import Navbar from "@/components/navbar"
import { HeartHandshake } from "lucide-react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Life Insurance Quotes | Hawkins Insurance Group',
  description: "Secure your family's financial future with affordable life insurance. Get instant quotes for term, whole, and universal life policies to find the best plan for you.",
  alternates: {
    canonical: '/quotes/life-insurance',
  },
}

export default function LifeInsuranceQuotes() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <GenericInsuranceQuoter
          serviceType="life-insurance"
          title="Life Insurance Quote"
          description="Secure your family's financial future with affordable life insurance. Get quotes for term, whole, and universal life insurance policies."
          icon={<HeartHandshake className="w-16 h-16 text-primary" />}
        />
        <AnimatedFooter />
      </div>
    </div>
  )
}

