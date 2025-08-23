import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import MedicareAdvantageQuoter from "@/components/medicare-advantage-quoter"

export default function MedicareAdvantageQuotesPage() {
  return (
    <div className="relative min-h-screen bg-background bg-noise">
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <MedicareAdvantageQuoter />
        </div>
        <AnimatedFooter />
      </div>
    </div>
  )
}
