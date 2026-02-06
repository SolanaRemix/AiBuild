import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface GlowCardProps {
  children: ReactNode
  className?: string
  variant?: "cyan" | "purple" | "default"
  hover?: boolean
}

export function GlowCard({
  children,
  className,
  variant = "default",
  hover = true,
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-lg border bg-card p-6 transition-all duration-300",
        variant === "cyan" && "border-glow-cyan glow-cyan",
        variant === "purple" && "border-glow-purple glow-purple",
        variant === "default" && "border-border",
        hover && "hover:border-glow-cyan hover:glow-cyan",
        className
      )}
    >
      {children}
    </div>
  )
}
