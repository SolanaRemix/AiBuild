import type { SystemEvent } from "@/types"
import { LogLevelBadge } from "@/components/ui/status-badge"
import { formatRelativeTime } from "@/lib/utils"
import { Activity } from "lucide-react"

interface RecentEventsProps {
  events: SystemEvent[]
}

export function RecentEvents({ events }: RecentEventsProps) {
  return (
    <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden h-full">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold font-mono text-foreground">Recent Events</h2>
        </div>
        <a href="/logs" className="text-xs font-mono text-primary hover:underline">
          View all
        </a>
      </div>

      {events.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-muted-foreground text-sm font-mono">
          No events yet
        </div>
      ) : (
        <div className="divide-y divide-border">
          {events.map((event) => (
            <div
              key={event.id}
              className="px-5 py-3 hover:bg-[hsl(var(--fx-surface-elevated))] transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-1">
                <LogLevelBadge level={event.level} />
                <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                  {formatRelativeTime(event.timestamp)}
                </span>
              </div>
              <p className="text-xs font-mono text-muted-foreground truncate">{event.type}</p>
              <p className="text-xs text-foreground/80 truncate">{event.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
