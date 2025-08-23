import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import MedicareQuoter from "@/components/medicare-quoter"

export default function MedicareQuotes() {
  return (
    <div className="relative min-h-screen bg-background bg-noise">
      <div className="relative z-10">
        <Navbar />
        <MedicareQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}
