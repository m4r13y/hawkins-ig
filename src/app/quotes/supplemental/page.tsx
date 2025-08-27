import AnimatedFooter from "@/components/animated-footer"
import GenericInsuranceQuoter from "@/components/generic-insurance-quoter"
import Navbar from "@/components/navbar"
import { Plus } from "lucide-react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Supplemental Insurance Quotes | Hawkins Insurance Group',
  description: 'Bridge gaps in your primary health coverage. Get instant quotes for supplemental plans like cancer, accident, critical illness, and hospital indemnity insurance.',
  alternates: {
    canonical: '/quotes/supplemental',
  },
}

export default function SupplementalQuotes() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <GenericInsuranceQuoter
          serviceType="supplemental"
          title="Supplemental Insurance Quote"
          description="Bridge gaps in your health coverage with supplemental insurance. Get quotes for cancer, accident, critical illness, and hospital indemnity plans."
          icon={<Plus className="w-16 h-16 text-primary" />}
        />
        <AnimatedFooter />
      </div>
    </div>
  )
}

