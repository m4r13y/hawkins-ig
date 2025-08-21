import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import ADAAccessibilityWidget from '@/components/ada-accessibility-widget-safe'
import CookieConsent from '@/components/cookie-consent'
import DarkModeToggle from '@/components/dark-mode-toggle'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hawkins Insurance Group",
  description: "Insurance brokerage specializing in quality coverage and personalized service.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
        <ADAAccessibilityWidget />
        <DarkModeToggle />
        {/* Temporarily disabled cookie consent for testing */}
        {/* <CookieConsent /> */}
      </body>
    </html>
  )
}
