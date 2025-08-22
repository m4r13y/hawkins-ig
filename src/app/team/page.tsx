import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import TeamPage from "@/components/team-page"

export default function Team() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="relative z-10">
        <Navbar />
        <TeamPage />
        <AnimatedFooter />
      </div>
    </div>
  )
}
