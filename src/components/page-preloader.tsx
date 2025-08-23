"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function PagePreloader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reduce loading time to minimize white flash
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        >
          <div className="flex flex-col items-center space-y-8">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <Image
                src="/hig-logo-navy.svg"
                alt="Hawkins Insurance Group"
                width={120}
                height={120}
                className="dark:hidden"
                priority
              />
              <Image
                src="/hig-logo-white.svg"
                alt="Hawkins Insurance Group"
                width={120}
                height={120}
                className="hidden dark:block"
                priority
              />
            </motion.div>

            {/* Loading animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex space-x-2"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-primary rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-sm font-medium text-muted-foreground"
            >
              Loading your insurance experience...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
