import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import FinalExpenseQuoter from "@/components/final-expense-quoter"

export default function FinalExpenseQuotesPage() {
  return (
    <div className="relative min-h-screen bg-background bg-noise">
      <div className="relative z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <FinalExpenseQuoter />
        </div>
        <AnimatedFooter />
      </div>
    </div>
  )
}
