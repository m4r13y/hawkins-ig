import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import { PerformanceMonitor, ResourceHints, CriticalCSS } from '@/components/performance-monitor'
import ConstructionPage from '@/components/construction-page'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: "Hawkins Insurance Group - Coming Soon",
  description: "Big things coming soon at hawkinsig.com - Enhanced insurance experience with precision, protection, and personalized service.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Always show construction page for now
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        
        {/* DNS prefetch and preconnect for faster loading */}
        <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        <CriticalCSS />
        <ResourceHints />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <ConstructionPage />
        <PerformanceMonitor />
      </body>
    </html>
  )
}
