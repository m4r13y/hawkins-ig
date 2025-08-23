import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GenericInsuranceQuoter from "@/components/generic-insurance-quoter"
import { Building } from "lucide-react"

export default function GroupHealthQuotes() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
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

