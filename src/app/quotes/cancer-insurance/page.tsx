import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import CancerInsuranceQuoter from "@/components/cancer-insurance-quoter"

export default function CancerInsuranceQuotesPage() {
  return (
    <div className="relative min-h-screen bg-background bg-noise">
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <CancerInsuranceQuoter />
        </div>
        <AnimatedFooter />
      </div>
    </div>
  )
}
