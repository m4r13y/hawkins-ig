import AnimatedFooter from "@/components/animated-footer"
import Navbar from "@/components/navbar"
import ServicesPage from "@/components/services-page"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Insurance Services | Hawkins Insurance Group',
  description: 'Explore the comprehensive insurance services offered by Hawkins Insurance Group, including health, life, and supplemental insurance. We provide tailored solutions to meet your needs.',
  alternates: {
    canonical: '/services',
  },
}

export default function Services() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <ServicesPage />
        <AnimatedFooter />
      </div>
    </div>
  )
}
