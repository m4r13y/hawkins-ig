import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import DentalQuoter from "@/components/dental-quoter"

export default function DentalVisionQuotes() {
  return (
    <div className="relative min-h-screen bg-background bg-noise">
      <div className="relative z-10">
        <Navbar />
        <DentalQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}
