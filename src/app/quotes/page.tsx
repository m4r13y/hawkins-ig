import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import MegaQuoter from "@/components/mega-quoter"

export default function () {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative z-10">
        <Navbar />
        <MegaQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}