import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Financial Planning Tools | Hawkins Insurance Group',
  description: 'Take control of your financial future with our comprehensive financial planning tools. Plan for retirement, manage your estate, and achieve your financial goals with Hawkins Insurance Group.',
  alternates: {
    canonical: '/finances',
  },
}

export default function FinancesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
