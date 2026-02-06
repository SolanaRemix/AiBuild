import { GlowBadge } from "@/components/aura"
import type { TraceLogEntry } from "@/lib/types"

interface TraceLogViewerProps {
  logs: TraceLogEntry[]
}

export function TraceLogViewer({ logs }: TraceLogViewerProps) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          Recent Trace Logs
        </h2>
        <p className="text-sm text-muted-foreground">
          System-wide AI generation and deployment activity
        </p>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-5 gap-4 bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <span>Status</span>
          <span>Kind</span>
          <span>Project</span>
          <span>Details</span>
          <span>Time</span>
        </div>

        {/* Table rows */}
        {logs.map((log) => (
          <div
            key={log.id}
            className="grid grid-cols-5 gap-4 border-t border-border px-4 py-3 text-sm items-center"
          >
            <div>
              <GlowBadge
                variant={log.status === "ok" ? "success" : "destructive"}
              >
                {log.status}
              </GlowBadge>
            </div>
            <div>
              <GlowBadge>{log.kind}</GlowBadge>
            </div>
            <div className="font-mono text-xs text-muted-foreground truncate">
              {log.projectId}
            </div>
            <div className="font-mono text-xs text-muted-foreground truncate">
              {JSON.stringify(log.metadata).slice(0, 50)}...
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(log.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
