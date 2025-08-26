import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import { PerformanceMonitor, ResourceHints, CriticalCSS } from '@/components/performance-monitor'
import CookieConsentOptimized from '@/components/cookie-consent-optimized'
import AdaAccessibilityWidgetSafe from '@/components/ada-accessibility-widget-safe'
import PagePreloader from '@/components/page-preloader'
import { ModalProvider } from '@/contexts/modal-context'
import GlobalPopupModals from '@/components/global-popup-modals'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hawkinsig.com'),
  title: {
    default: "Hawkins Insurance Group - Your Trusted Insurance Partner",
    template: `%s | Hawkins Insurance Group`,
  },
  description: "Hawkins Insurance Group offers personalized insurance solutions, including life, health, and Medicare, with a commitment to precision, protection, and exceptional service.",
  keywords: ["insurance", "life insurance", "health insurance", "Medicare", "insurance agency", "financial planning", "insurance quotes"],
  authors: [{ name: 'Hawkins Insurance Group', url: 'https://hawkinsig.com' }],
  creator: 'Hawkins Insurance Group',
  publisher: 'Hawkins Insurance Group',
  openGraph: {
    title: "Hawkins Insurance Group - Your Trusted Insurance Partner",
    description: "Personalized insurance solutions to protect what matters most. Get a free quote today.",
    url: 'https://hawkinsig.com',
    siteName: 'Hawkins Insurance Group',
    images: [
      {
        url: '/hig-logo-navy.svg',
        width: 800,
        height: 600,
        alt: 'Hawkins Insurance Group Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Hawkins Insurance Group - Your Trusted Insurance Partner",
    description: "Discover personalized insurance options with Hawkins Insurance Group. We're here to help you secure your future.",
    images: ['/hig-logo-navy.svg'],
  },
  icons: {
    icon: '/hig-logo-navy.svg',
    shortcut: '/hig-logo-navy.svg',
    apple: '/hig-logo-navy.svg',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" style={{ backgroundColor: 'rgb(2, 6, 23)' }} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#03002D" />
        
        {/* Explicit OpenGraph meta tags to ensure correct image is used */}
        <meta property="og:image" content="https://hawkinsig.com/hig-logo-navy.svg" />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content="Hawkins Insurance Group Logo" />
        <meta name="twitter:image" content="https://hawkinsig.com/hig-logo-navy.svg" />
        
        {/* Theme initialization script - runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
                  
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  // Fallback to dark mode if localStorage is not available
                  document.documentElement.classList.add('dark');
                }
              })();
            `
          }}
        />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/hig-logo-navy.svg" />
        <link rel="alternate icon" href="/hig-logo-navy.svg" />
        <link rel="mask-icon" href="/hig-logo-navy.svg" color="#03002D" />
        
        {/* DNS prefetch and preconnect for faster loading */}
        <link rel="dns-prefetch" href="//firebasestorage.googleapis.com" />
        <link rel="preconnect" href="https://firebasestorage.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Hawkins Insurance Group",
            "url": "https://hawkinsig.com",
            "logo": "https://hawkinsig.com/hig-logo-navy.svg",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-800-555-5555",
              "contactType": "customer service"
            }
          }) }}
        />
        
        <CriticalCSS />
        <ResourceHints />
      </head>
      <body 
        className={`${inter.className} bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-foreground antialiased`}
      >
        <ModalProvider>
          <PagePreloader />
          {children}
          <PerformanceMonitor />
          
          {/* Global UI Components */}
          <AdaAccessibilityWidgetSafe />
          <CookieConsentOptimized />
          <GlobalPopupModals />
        </ModalProvider>
      </body>
    </html>
  )
}
