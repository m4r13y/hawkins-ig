"use client"

import React from 'react'
import { motion } from 'framer-motion'

const ConstructionPage = () => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-900 relative overflow-hidden" style={{ backgroundColor: '#0f172a' }}>
      {/* Patriotic floating particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              i % 3 === 0 ? 'bg-red-600/40' : 
              i % 3 === 1 ? 'bg-blue-800/40' : 
              'bg-white/30'
            }`}
            animate={{
              y: [-100, typeof window !== 'undefined' ? window.innerHeight + 100 : 800],
              x: [Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200), Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200)],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%'
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">

          <div className="relative w-80 h-80 mx-auto">
            {/* Center logo - HIG Shield */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div 
                className="w-64 h-64 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(255, 255, 255, 0.3)",
                    "0 0 40px rgba(220, 38, 38, 0.5)",
                    "0 0 30px rgba(30, 58, 138, 0.5)",
                    "0 0 20px rgba(255, 255, 255, 0.3)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <svg width="160" height="160" viewBox="0 0 512 512" className="text-white">
                    <path d="M249.203 12.6198C253.073 9.53128 257.708 10.3021 261.578 12.6198C320.344 46.6459 382.974 74.4792 447.922 93.0365C454.885 95.3594 466.479 96.1302 466.479 106.182C466.479 144.073 466.479 181.958 466.479 219.849C466.479 260.057 457.974 300.266 441.74 337.38C419.313 390.729 379.88 437.125 332.714 470.375C312.609 484.292 291.734 496.661 267.76 503.625C260.031 505.943 250.75 505.943 243.021 503.625C220.594 496.661 198.943 484.292 179.615 471.146C128.578 435.578 86.8282 385.318 64.4011 327.328C53.5782 298.719 46.6198 267.786 44.2969 236.859C42.75 192.786 43.5261 149.484 43.5261 106.182C42.75 99.9948 48.9375 96.9063 53.5782 95.3594C122.396 76.8021 188.12 48.1927 249.203 12.6198ZM64.4011 113.917C64.4011 147.938 64.4011 181.188 64.4011 215.208C65.1771 260.828 75.2292 307.224 96.8802 347.432C124.714 400.781 169.563 444.859 222.141 472.693C232.193 477.333 243.021 483.521 254.615 484.292C266.214 484.292 276.266 478.88 286.318 474.24C320.344 457.229 350.495 433.26 375.24 405.422C411.583 365.214 434.781 313.406 443.286 260.057C448.698 224.484 446.38 188.917 447.151 152.578C447.151 139.432 447.922 127.063 446.38 114.688C379.88 95.3594 315.703 68.2969 255.391 33.5C195.078 68.2969 130.901 94.5834 64.4011 113.917Z" fill="currentColor"/>
                    <path d="M164.151 175.771C187.344 175.771 209.771 175.771 232.969 175.771C232.969 177.318 232.969 181.187 232.193 182.734C224.464 183.505 212.089 183.505 211.318 193.557C208.995 212.115 210.542 231.448 210.542 250.005C240.698 250.005 270.083 250.005 300.24 250.005C300.24 232.995 300.24 216.755 300.24 199.745C300.24 195.104 299.464 188.917 295.599 186.599C290.187 183.505 284 183.505 277.812 182.734C277.812 180.411 277.812 178.094 277.812 175.771C301.01 175.771 323.432 175.771 346.63 175.771C346.63 177.318 346.63 181.187 346.63 182.734C340.448 183.505 333.484 183.505 328.073 186.599C323.432 190.463 323.432 198.198 323.432 203.609C323.432 241.5 323.432 279.385 323.432 317.276C324.208 323.458 323.432 330.422 328.073 334.286C333.484 337.38 340.448 337.38 346.63 338.151C346.63 339.698 346.63 343.562 346.63 345.109C323.432 345.109 299.464 345.109 276.266 345.109C276.266 343.562 276.266 339.698 276.266 338.151C283.224 336.604 292.505 338.151 297.917 332.74C301.786 326.552 301.01 318.047 301.01 311.088C301.01 294.078 301.01 277.068 301.01 260.828C270.854 260.828 241.474 260.828 211.318 260.828C211.318 280.161 211.318 300.266 211.318 319.594C211.318 325.005 211.318 331.193 216.729 335.057C222.141 338.151 229.099 338.151 235.286 338.927C235.286 340.469 235.286 344.338 235.286 345.885C212.089 345.885 188.891 345.885 166.469 345.885C166.469 344.338 166.469 340.469 166.469 338.927C172.656 338.151 179.615 338.151 185.026 335.057C189.667 331.193 189.667 323.458 189.667 318.047C189.667 280.161 189.667 242.271 189.667 204.385C188.891 198.198 189.667 191.24 185.026 187.37C179.615 183.505 172.656 184.281 165.698 183.505C164.151 181.187 164.151 178.094 164.151 175.771Z" fill="currentColor"/>
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Coming Soon Text */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-bold text-white mb-4"
            >
              COMING SOON
            </motion.h1>
            

          </motion.div>
    
        
      </div>
    </div>
  )
}

export default ConstructionPage
