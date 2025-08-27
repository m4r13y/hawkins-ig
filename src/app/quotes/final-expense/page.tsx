import AnimatedFooter from "@/components/animated-footer"
import FinalExpenseQuoter from "@/components/final-expense-quoter"
import Navbar from "@/components/navbar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Final Expense Insurance Quotes | Hawkins Insurance Group',
  description: 'Plan for end-of-life costs with final expense insurance. Get instant quotes to find affordable coverage for funeral expenses, medical bills, and other debts.',
  alternates: {
    canonical: '/quotes/final-expense',
  },
}

export default function FinalExpenseQuotesPage() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <FinalExpenseQuoter />
        <AnimatedFooter />
      </div>
    </div>
  )
}

