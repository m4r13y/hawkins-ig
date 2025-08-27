import AnimatedFooter from "@/components/animated-footer"
import GenericInsuranceQuoter from "@/components/generic-insurance-quoter"
import Navbar from "@/components/navbar"
import { Building } from "lucide-react"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Group Health Insurance Quotes | Hawkins Insurance Group',
  description: 'Get competitive group health insurance quotes for your business. Provide your employees with quality health benefits while managing costs with plans from top carriers.',
  alternates: {
    canonical: '/quotes/group-health',
  },
}

export default function GroupHealthQuotes() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <GenericInsuranceQuoter
          serviceType="group-health"
          title="Group Health Insurance Quote"
          description="Get competitive group health insurance quotes for your business. Provide your employees with quality health benefits while managing costs."
          icon={<Building className="w-16 h-16 text-primary" />}
        />
        <AnimatedFooter />
      </div>
    </div>
  )
}

