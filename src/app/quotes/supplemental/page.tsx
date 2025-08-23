import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GenericInsuranceQuoter from "@/components/generic-insurance-quoter"
import { Plus } from "lucide-react"

export default function SupplementalQuotes() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
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

