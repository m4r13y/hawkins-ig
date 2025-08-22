"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface GlowButtonProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  onClick?: () => void
  type?: "button" | "submit"
}

export default function GlowButton({
  children,
  className,
  variant = "default",
  size = "default",
  onClick,
  type = "button",
}: GlowButtonProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/80 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-300 group-hover:duration-200" />
      <Button
        type={type}
        variant={variant}
        size={size}
        className={cn(
          "relative bg-primary hover:bg-primary/90 text-primary-foreground border-0 transition-all duration-200",
          className,
        )}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  )
}
