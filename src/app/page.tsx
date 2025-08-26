import OptimizedHome from "@/components/optimized-home"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Affordable Insurance for Families & Businesses | Hawkins Insurance Group',
  description: 'Get expert advice and personalized quotes for health, life, and supplemental insurance. Hawkins Insurance Group helps families and businesses secure their future with trusted solutions.',
  alternates: {
    canonical: '/',
  },
}

export default function Home() {
  return <OptimizedHome />
}
