"use client"

import type { SystemEvent, LogLevel, EventType } from "@/types"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { LogLevelBadge } from "@/components/ui/status-badge"
import { formatRelativeTime } from "@/lib/utils"
import { Search, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

// Seed some demo events so the page isn't empty
const SEED_EVENTS: SystemEvent[] = Array.from({ length: 20 }, (_, i) => {
  const types: EventType[] = [
    "agent.started", "agent.stopped", "tool.called", "tool.result",
    "memory.read", "memory.write", "kernel.boot", "agent.error",
  ]
  const levels: LogLevel[] = ["info", "info", "info", "warn", "debug", "error", "info", "info"]
  const idx = i % types.length
  return {
    id: `seed_${i}`,
    type: types[idx],
    level: levels[idx],
    message: `Sample event: ${types[idx]} occurred on subsystem ${i + 1}`,
    correlationId: `corr_${i}`,
    agentId: i % 3 === 0 ? `agent_general_0${(i % 3) + 1}` : undefined,
    timestamp: new Date(Date.now() - i * 120000).toISOString(),
  }
})

interface LogsClientProps {
  initialEvents: SystemEvent[]
}

const LEVEL_OPTIONS: (LogLevel | "all")[] = ["all", "debug", "info", "warn", "error", "fatal"]

export function LogsClient({ initialEvents }: LogsClientProps) {
  const allEvents = [...initialEvents, ...SEED_EVENTS]
  const [query, setQuery] = useState("")
  const [levelFilter, setLevelFilter] = useState<LogLevel | "all">("all")
  const router = useRouter()

  const filtered = useMemo(() => {
    return allEvents.filter((e) => {
      const matchLevel = levelFilter === "all" || e.level === levelFilter
      const matchQuery =
        !query ||
        e.message.toLowerCase().includes(query.toLowerCase()) ||
        e.type.toLowerCase().includes(query.toLowerCase()) ||
        (e.agentId ?? "").toLowerCase().includes(query.toLowerCase())
      return matchLevel && matchQuery
    })
  }, [allEvents, query, levelFilter])

  return (
    <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 px-5 py-4 border-b border-border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-8 text-xs font-mono bg-[hsl(var(--fx-rail))]"
          />
        </div>
        <div className="flex items-center gap-1">
          {LEVEL_OPTIONS.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={cn(
                "px-2.5 py-1 rounded text-[11px] font-mono border transition-colors",
                levelFilter === lvl
                  ? "bg-primary/20 border-primary/40 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--fx-surface-elevated))]"
              )}
            >
              {lvl}
            </button>
          ))}
        </div>
        <Button
          size="sm"
          variant="ghost"
          className="h-8 gap-1.5 text-xs font-mono ml-auto"
          onClick={() => router.refresh()}
        >
          <RefreshCw className="w-3 h-3" />
          Refresh
        </Button>
      </div>

      {/* Count */}
      <div className="px-5 py-2 border-b border-border bg-[hsl(var(--fx-rail))]">
        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          {filtered.length} events
        </span>
      </div>

      {/* Log rows */}
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm font-mono text-muted-foreground">
            No events match your filters
          </div>
        )}
        {filtered.map((event) => (
          <div
            key={event.id}
            className="grid grid-cols-[auto_auto_1fr_auto] gap-3 items-start px-5 py-3 hover:bg-[hsl(var(--fx-surface-elevated))] transition-colors"
          >
            <LogLevelBadge level={event.level} />
            <span className="text-[10px] font-mono text-primary/70 whitespace-nowrap pt-0.5">
              {event.type}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-mono text-foreground/90 truncate">{event.message}</p>
              {event.agentId && (
                <p className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  agent: {event.agentId}
                </p>
              )}
            </div>
            <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
              {formatRelativeTime(event.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
