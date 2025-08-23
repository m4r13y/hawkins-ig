import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import HealthcareMarketplaceQuoter from "@/components/healthcare-marketplace-quoter"

export default function FamilyHealthQuotes() {
  return (
    <div className="relative min-h-screen bg-background bg-noise">
      <div className="relative z-10">
        <Navbar />
        <HealthcareMarketplaceQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}
