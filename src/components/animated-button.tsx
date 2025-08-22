"use client"

import type * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost" | "slim"
  size?: "default" | "sm" | "lg"
  onClick?: () => void
  type?: "button" | "submit"
  href?: string
  disabled?: boolean
}

export default function AnimatedButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  type = "button",
  href,
  disabled = false,
}: AnimatedButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-2.5",
    lg: "px-8 py-3 text-lg",
  }

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-border bg-transparent hover:bg-background/80",
    ghost: "bg-transparent hover:bg-background/80",
    slim: "bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 text-sm",
  }

  const buttonContent = (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  )

  if (href) {
    return (
      <a href={href} className="inline-block">
        <motion.div
          className={cn(
            "relative inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
            sizeClasses[size],
            variantClasses[variant],
            disabled && "opacity-50 cursor-not-allowed",
            className,
          )}
          whileHover={disabled ? undefined : { scale: 1.02 }}
          whileTap={disabled ? undefined : { scale: 0.98 }}
        >
          {children}
        </motion.div>
      </a>
    )
  }

  return buttonContent
}
