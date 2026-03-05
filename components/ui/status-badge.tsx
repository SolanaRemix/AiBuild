import { cn } from "@/lib/utils"
import type { AgentStatus, LogLevel } from "@/types"

const STATUS_STYLES: Record<AgentStatus, { dot: string; text: string; bg: string }> = {
  running: {
    dot: "bg-[hsl(var(--fx-glow-green))] animate-pulse",
    text: "text-[hsl(var(--fx-glow-green))]",
    bg: "bg-[hsl(var(--fx-glow-green))]/10 border-[hsl(var(--fx-glow-green))]/20",
  },
  idle: {
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
    bg: "bg-muted/30 border-border",
  },
  paused: {
    dot: "bg-warning",
    text: "text-warning",
    bg: "bg-warning/10 border-warning/20",
  },
  error: {
    dot: "bg-destructive",
    text: "text-destructive",
    bg: "bg-destructive/10 border-destructive/20",
  },
  completed: {
    dot: "bg-primary",
    text: "text-primary",
    bg: "bg-primary/10 border-primary/20",
  },
}

const LEVEL_STYLES: Record<LogLevel, { text: string; bg: string }> = {
  debug: { text: "text-muted-foreground", bg: "bg-muted/30 border-border" },
  info: { text: "text-primary", bg: "bg-primary/10 border-primary/20" },
  warn: { text: "text-warning", bg: "bg-warning/10 border-warning/20" },
  error: { text: "text-destructive", bg: "bg-destructive/10 border-destructive/20" },
  fatal: { text: "text-destructive font-bold", bg: "bg-destructive/20 border-destructive/40" },
}

interface AgentStatusBadgeProps {
  status: AgentStatus
  className?: string
}

export function AgentStatusBadge({ status, className }: AgentStatusBadgeProps) {
  const s = STATUS_STYLES[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-mono font-medium uppercase tracking-wide",
        s.bg,
        s.text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", s.dot)} />
      {status}
    </span>
  )
}

interface LogLevelBadgeProps {
  level: LogLevel
  className?: string
}

export function LogLevelBadge({ level, className }: LogLevelBadgeProps) {
  const s = LEVEL_STYLES[level]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-widest",
        s.bg,
        s.text,
        className
      )}
    >
      {level}
    </span>
  )
}
