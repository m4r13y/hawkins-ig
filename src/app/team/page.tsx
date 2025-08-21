import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import TeamPage from "@/components/team-page"
import BackgroundPaths from "@/components/background-paths"

export default function Team() {
  return (
    <div className="relative min-h-screen bg-background">
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        <TeamPage />
        <AnimatedFooter />
      </div>
    </div>
  )
}
