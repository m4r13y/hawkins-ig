import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GetStartedFlow from "@/components/get-started-flow"

export default function GetStartedPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <GetStartedFlow />
        <AnimatedFooter />
      </div>
    </div>
  )
}
