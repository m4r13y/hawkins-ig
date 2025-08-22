import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import ContactPage from "@/components/contact-page"

export default function Contact() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative z-10">
        <Navbar />
        <ContactPage />
        <AnimatedFooter />
      </div>
    </div>
  )
}