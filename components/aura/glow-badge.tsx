import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface GlowBadgeProps {
  children: ReactNode
  className?: string
  variant?: "cyan" | "purple" | "success" | "warning" | "destructive" | "default"
}

export function GlowBadge({
  children,
  className,
  variant = "default",
}: GlowBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
        variant === "cyan" && "bg-primary/15 text-primary border border-primary/20",
        variant === "purple" && "bg-secondary/15 text-secondary border border-secondary/20",
        variant === "success" && "bg-success/15 text-success border border-success/20",
        variant === "warning" && "bg-warning/15 text-warning border border-warning/20",
        variant === "destructive" && "bg-destructive/15 text-destructive border border-destructive/20",
        variant === "default" && "bg-muted text-muted-foreground border border-border",
        className
      )}
    >
      {children}
    </span>
  )
}
