import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: { value: number; label: string }
  glow?: "blue" | "green" | "amber" | "red"
  className?: string
}

const GLOW_MAP = {
  blue: "border-primary/20 bg-primary/5 glow-blue",
  green: "border-[hsl(var(--fx-glow-green))]/20 bg-[hsl(var(--fx-glow-green))]/5 glow-green",
  amber: "border-warning/20 bg-warning/5",
  red: "border-destructive/20 bg-destructive/5",
}

const ICON_MAP = {
  blue: "text-primary bg-primary/10 border-primary/20",
  green:
    "text-[hsl(var(--fx-glow-green))] bg-[hsl(var(--fx-glow-green))]/10 border-[hsl(var(--fx-glow-green))]/20",
  amber: "text-warning bg-warning/10 border-warning/20",
  red: "text-destructive bg-destructive/10 border-destructive/20",
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  glow = "blue",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-all duration-200 hover:scale-[1.01]",
        GLOW_MAP[glow],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
            {title}
          </p>
          <p className="text-2xl font-bold font-mono text-foreground truncate">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1 truncate">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-mono mt-1",
                trend.value >= 0
                  ? "text-[hsl(var(--fx-glow-green))]"
                  : "text-destructive"
              )}
            >
              {trend.value >= 0 ? "+" : ""}
              {trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div
          className={cn(
            "w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ml-3",
            ICON_MAP[glow]
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  )
}
