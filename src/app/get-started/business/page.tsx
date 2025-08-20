import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GetStartedFlow from "@/components/get-started-flow"
import BackgroundPaths from "@/components/background-paths"

export default function BusinessGetStartedPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        <GetStartedFlow initialClientType="business" />
        <AnimatedFooter />
      </div>
    </div>
  )
}
