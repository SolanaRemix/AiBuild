"use client"

import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef } from "react"

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "cyan" | "purple" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "cyan", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          variant === "cyan" &&
            "bg-primary text-primary-foreground hover:glow-cyan-strong active:scale-[0.98]",
          variant === "purple" &&
            "bg-secondary text-secondary-foreground hover:glow-purple-strong active:scale-[0.98]",
          variant === "outline" &&
            "border border-glow-cyan bg-transparent text-foreground hover:bg-primary/10 hover:glow-cyan",
          variant === "ghost" &&
            "bg-transparent text-foreground hover:bg-muted",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-5 py-2.5 text-sm",
          size === "lg" && "px-8 py-3 text-base",
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

GlowButton.displayName = "GlowButton"
