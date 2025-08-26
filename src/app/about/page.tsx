import AboutUsTabs from "@/components/about-us-tabs"
import AnimatedFooter from "@/components/animated-footer"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Hawkins Insurance Group | Our Mission and Values',
  description: 'Learn about Hawkins Insurance Group, our commitment to our clients, and our experienced team of insurance professionals. Discover our story and why we are a trusted partner for your insurance needs.',
  alternates: {
    canonical: '/about',
  },
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <AboutUsTabs />
        <AnimatedFooter />
      </div>
    </div>
  )
}
