import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import HowWeWork from "@/components/how-we-work"
import InsuranceServices from "@/components/insurance-services"
import AboutUsTabs from "@/components/about-us-tabs"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <BackgroundPaths />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <HowWeWork />      
        <AboutUsTabs />
        <InsuranceServices />
        <AnimatedFooter />
      </div>
    </div>
  )
}
