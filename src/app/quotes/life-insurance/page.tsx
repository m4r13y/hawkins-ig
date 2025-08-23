import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GenericInsuranceQuoter from "@/components/generic-insurance-quoter"
import { HeartHandshake } from "lucide-react"

export default function LifeInsuranceQuotes() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
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

