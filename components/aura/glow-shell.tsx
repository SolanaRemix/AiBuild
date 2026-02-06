import { cn } from "@/lib/utils"
import { type ReactNode } from "react"

interface GlowShellProps {
  children: ReactNode
  className?: string
}

export function GlowShell({ children, className }: GlowShellProps) {
  return (
    <div className={cn("min-h-screen bg-background text-foreground relative overflow-hidden", className)}>
      {/* Ambient glow orbs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-primary/3 blur-3xl" />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
