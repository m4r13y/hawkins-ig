import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GenericInsuranceQuoter from "@/components/generic-insurance-quoter"
import { Building } from "lucide-react"

export default function GroupHealthQuotes() {
  return (
    <div className="relative min-h-screen bg-background bg-noise">
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
