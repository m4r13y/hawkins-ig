import AnimatedFooter from "@/components/animated-footer"
import MegaQuoter from "@/components/mega-quoter"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Instant Insurance Quotes | Hawkins Insurance Group',
  description: 'Receive free, instant quotes for a wide range of insurance products, including health, life, dental, and Medicare. Compare plans and find the best coverage for your needs with Hawkins Insurance Group.',
  alternates: {
    canonical: '/quotes',
  },
}

export default function QuotesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <MegaQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}
