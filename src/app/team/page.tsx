import AnimatedFooter from "@/components/animated-footer"
import Navbar from "@/components/navbar"
import TeamPage from "@/components/team-page"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Meet Our Team | Hawkins Insurance Group',
  description: 'Get to know the experienced and dedicated team at Hawkins Insurance Group. Our agents are committed to providing you with the best insurance solutions and personalized service.',
  alternates: {
    canonical: '/team',
  },
}

export default function Team() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <TeamPage />
        <AnimatedFooter />
      </div>
    </div>
  )
}
