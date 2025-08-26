import AnimatedFooter from "@/components/animated-footer"
import Navbar from "@/components/navbar"
import SuccessStoriesRedesign from "@/components/success-stories-redesign"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Success Stories | Hawkins Insurance Group',
  description: 'Read success stories from satisfied clients of Hawkins Insurance Group. Discover how we have helped individuals and families find the perfect insurance coverage.',
  alternates: {
    canonical: '/success-stories',
  },
}

export default function SuccessStoriesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <SuccessStoriesRedesign />
        <AnimatedFooter />
      </div>
    </div>
  )
}
