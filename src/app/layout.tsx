import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import { PerformanceMonitor, ResourceHints, CriticalCSS } from '@/components/performance-monitor'
import CookieConsentOptimized from '@/components/cookie-consent-optimized'
import AdaAccessibilityWidgetSafe from '@/components/ada-accessibility-widget-safe'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: "Hawkins Insurance Group",
  description: "Enhanced insurance experience with precision, protection, and personalized service.",
  icons: {
    icon: '/hig-logo-navy.svg',
    shortcut: '/hig-logo-navy.svg',
    apple: '/hig-logo-navy.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#03002D" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/hig-logo-navy.svg" />
        <link rel="alternate icon" href="/hig-logo-navy.svg" />
        <link rel="mask-icon" href="/hig-logo-navy.svg" color="#03002D" />
        
        {/* DNS prefetch and preconnect for faster loading */}
        <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        <CriticalCSS />
        <ResourceHints />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
        <PerformanceMonitor />
        
        {/* Global UI Components */}
        <AdaAccessibilityWidgetSafe />
        <CookieConsentOptimized />
      </body>
    </html>
  )
}
