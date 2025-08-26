import RevolutionaryMegaQuoter from "@/components/revolutionary-mega-quoter"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mega Quoter Demo | Hawkins Insurance Group',
  description: 'A demonstration of the revolutionary mega quoter for insurance products.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: '/mega-quoter-demo',
  },
}

export default function MegaQuoterDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/*  <RevolutionaryMegaQuoter /> */}
    </div>
  )
}
