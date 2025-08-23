import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import GetStartedFlow from "@/components/get-started-flow"

export default function BusinessGetStartedPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="relative z-10">
        <Navbar />
        <GetStartedFlow initialClientType="business" />
        <AnimatedFooter />
      </div>
    </div>
  )
}

