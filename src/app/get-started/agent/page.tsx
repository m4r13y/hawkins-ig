import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GetStartedFlow from "@/components/get-started-flow"

export default function AgentGetStartedPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative z-10">
        <Navbar />
        <GetStartedFlow initialClientType="agent" />
        <AnimatedFooter />
      </div>
    </div>
  )
}
