import AnimatedFooter from "@/components/animated-footer"
import ContactPage from "@/components/contact-page"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Hawkins Insurance Group | Get in Touch',
  description: 'Contact Hawkins Insurance Group for personalized insurance advice. Our team is ready to assist you with your health, life, and supplemental insurance questions. Reach out to us today.',
  alternates: {
    canonical: '/contact',
  },
}

export default function Contact() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <ContactPage />
        <AnimatedFooter />
      </div>
    </div>
  )
}
