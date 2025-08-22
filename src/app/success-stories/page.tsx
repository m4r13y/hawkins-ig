import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import SuccessStoriesRedesign from "@/components/success-stories-redesign"

export default function SuccessStoriesPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative z-10">
        <Navbar />
        <SuccessStoriesRedesign />
        <AnimatedFooter />
      </div>
    </div>
  )
}
