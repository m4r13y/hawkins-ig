import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import TeamPage from "@/components/team-page"

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
