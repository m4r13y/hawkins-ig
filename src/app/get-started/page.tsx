import AnimatedFooter from "@/components/animated-footer"
import GetStartedFlow from "@/components/get-started-flow"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Started with Hawkins Insurance Group | Free Consultation',
  description: 'Begin your journey with Hawkins Insurance Group. Our guided process makes it easy to find the right insurance coverage. Get a free, no-obligation consultation today.',
  alternates: {
    canonical: '/get-started',
  },
}

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
