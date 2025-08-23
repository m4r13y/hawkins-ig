import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import HospitalIndemnityQuoter from "@/components/hospital-indemnity-quoter"

export default function HospitalIndemnityQuotesPage() {
  return (
    <div className="relative min-h-screen bg-background bg-noise">
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <HospitalIndemnityQuoter />
        </div>
        <AnimatedFooter />
      </div>
    </div>
  )
}
