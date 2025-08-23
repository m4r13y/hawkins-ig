import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import HealthcareMarketplaceQuoter from "@/components/healthcare-marketplace-quoter"

export default function HealthcareMarketplaceQuotesPage() {
  return (
    <div className="relative min-h-screen bg-background bg-noise">
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <HealthcareMarketplaceQuoter />
        </div>
        <AnimatedFooter />
      </div>
    </div>
  )
}
