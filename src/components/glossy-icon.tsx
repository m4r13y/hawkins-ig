"use client"

import type React from "react"

interface GlossyIconProps {
  children: React.ReactNode
  color: "red" | "blue" | "green" | "slate"
  size?: "sm" | "md" | "lg"
  className?: string
}

export default function GlossyIcon({ children, color, size = "md", className = "" }: GlossyIconProps) {
  const colorClasses = {
    red: {
      bg: "bg-gradient-to-br from-red-400 to-red-600",
      glow: "shadow-red-500/25",
      outerGlow: "shadow-[0_0_20px_rgba(239,68,68,0.15)]",
    },
    blue: {
      bg: "bg-gradient-to-br from-blue-400 to-blue-600",
      glow: "shadow-blue-500/25",
      outerGlow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    },
    green: {
      bg: "bg-gradient-to-br from-green-400 to-green-600",
      glow: "shadow-green-500/25",
      outerGlow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]",
    },
    slate: {
      bg: "bg-gradient-to-br from-slate-400 to-slate-600",
      glow: "shadow-slate-500/25",
      outerGlow: "shadow-[0_0_20px_rgba(100,116,139,0.15)]",
    },
  }

  const sizeClasses = {
    sm: "w-10 h-10 p-2",
    md: "w-12 h-12 p-3",
    lg: "w-16 h-16 p-4",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  }

  return (
    <div
      className={`
        relative ${sizeClasses[size]} ${colorClasses[color].bg} ${colorClasses[color].outerGlow}
        rounded-2xl flex items-center justify-center text-white
        shadow-lg ${colorClasses[color].glow} hover:shadow-xl
        transition-all duration-300 hover:scale-105
        before:absolute before:inset-0 before:rounded-2xl
        before:bg-gradient-to-br before:from-white/30 before:via-white/10 before:to-transparent
        before:opacity-80 hover:before:opacity-100
        ${className}
      `}
    >
      <div className={`relative z-10 ${iconSizes[size]}`}>{children}</div>
    </div>
  )
}
