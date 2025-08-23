import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GenericInsuranceQuoter from "@/components/generic-insurance-quoter"
import { HeartHandshake } from "lucide-react"

export default function LifeInsuranceQuotes() {
  return (
    <div className="relative min-h-screen bg-background bg-noise">
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
