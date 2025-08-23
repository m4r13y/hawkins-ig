"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Merriweather } from "next/font/google"
import { useEffect, useRef } from "react"
import AnimatedButton from "./animated-button"
import CountingStats from "./counting-stats"
import Link from "next/link"
import { cn } from "@/lib/utils"

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-merriweather",
})

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  
  const stats = [
    { value: 5000, suffix: "+", label: "Happy Clients Served" },
    { value: 38, suffix: "+", label: "Years Combined Experience" },
    { value: 3, suffix: "", label: "Licensed Agents" },
  ]

  useEffect(() => {
    const refreshVideo = () => {
      if (videoRef.current) {
        const video = videoRef.current
        const currentTime = video.currentTime
        
        // Force reload the video source
        video.load()
        
        // Resume from where it left off after a brief delay
        video.addEventListener('loadeddata', () => {
          video.currentTime = currentTime
          video.play().catch(console.error)
        }, { once: true })
      }
    }

    // Refresh video every 5 minutes (300 seconds)
    const interval = setInterval(refreshVideo, 300000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Video with Fallback */}
      <div className="absolute inset-0 z-0">
        {/* Fallback Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900" />
        
        {/* Video Background with optimized loading */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Crect width='100%25' height='100%25' fill='%23334155'/%3E%3C/svg%3E"
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.7) contrast(1.1)",
          }}
          onLoadStart={() => console.log('Video loading started')}
          onCanPlay={() => console.log('Video can play')}
        >
          {/* Use only the optimized video to reduce loading time */}
          <source 
            src="https://firebasestorage.googleapis.com/v0/b/medicareally.firebasestorage.app/o/public-videos%2Fbg-video-webop.mp4?alt=media&token=a1899d2a-a33a-42be-a10a-7eb602600648" 
            type="video/mp4" 
          />
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>
        
        {/* Theme-aware overlay - lighter in light mode, darker in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/5 to-white/10 dark:from-black/20 dark:via-black/30 dark:to-black/50" />
        <div className="absolute inset-0 bg-black/0" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center lg:text-left">
          {/* Cloudy background for text visibility */}
          <div className="relative bg-black/10 dark:bg-black/20 backdrop-blur-xsm rounded-3xl p-8 lg:p-12 border border-white/10">
            {/* Subtle cloud-like pattern overlay */}
            <div className="absolute inset-0 opacity-30 rounded-3xl" 
                 style={{
                   backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 40%),
                                   radial-gradient(circle at 80% 60%, rgba(255,255,255,0.08) 0%, transparent 40%),
                                   radial-gradient(circle at 40% 80%, rgba(255,255,255,0.06) 0%, transparent 40%)`,
                 }}>
            </div>
            
            {/* Reduce animation intensity to prevent CLS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10 space-y-8"
            >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500/20 via-white/10 to-blue-500/20 border border-white/30 rounded-full text-sm text-white font-medium backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
                <span>Trusted Insurance Solutions</span>
              </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
            >

              <span className="block text-white mb-4">INSURANCE FOR</span>
              <span
                className={cn(
                  "block mb-2 bg-gradient-to-r from-red-400 via-white to-blue-400 bg-clip-text text-transparent font-black tracking-wide",
                  merriweather.className,
                )}
                style={{
                  textShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                }}
              >
                Families & Business
              </span>
              
            </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto lg:mx-0"
              >
                {"Hawkins Insurance Group gives you honest advice and real support. We help families and businesses find the right health, life and supplemental insurance, always with a personal touch."}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col gap-6 items-center justify-center lg:justify-start lg:items-start"
            >
              <Link href="/get-started">
                <AnimatedButton 
                  variant="slim"
                  className="bg-white hover:bg-white/90 text-black font-semibold shadow-lg"
                >
                  <span className="flex items-center">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </AnimatedButton>
              </Link>

              <div className="hidden sm:flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Licensed Agents</p>
                    <p className="text-xs text-gray-400">Nationwide</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Family Owned</p>
                    <p className="text-xs text-gray-400">Local Business</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.09 6.26L20 9.27l-5 4.87 1.18 6.88L12 17.77l-4.18 3.25L9 14.14 4 9.27l5.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Experienced</p>
                    <p className="text-xs text-gray-400">Agent Team</p>
                  </div>
                </div>
              </div>

              {/* Stats moved below badges */}
              <div className="hidden sm:block">
                <CountingStats stats={stats} />
              </div>
            </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
