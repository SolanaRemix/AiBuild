import type { ModelStatus } from "@/types"
import { cn } from "@/lib/utils"
import { Cpu } from "lucide-react"

interface ModelStatusGridProps {
  models: ModelStatus[]
}

export function ModelStatusGrid({ models }: ModelStatusGridProps) {
  return (
    <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
        <Cpu className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-semibold font-mono text-foreground">Model Status</h2>
      </div>
      <div className="divide-y divide-border">
        {models.map((model) => (
          <div
            key={model.id}
            className="flex items-center justify-between px-5 py-3 hover:bg-[hsl(var(--fx-surface-elevated))] transition-colors"
          >
            <div className="min-w-0">
              <p className="text-xs font-mono text-foreground truncate">
                {model.id.split("/")[1]}
              </p>
              <p className="text-[10px] text-muted-foreground font-mono capitalize">
                {model.provider}
              </p>
            </div>
            <div className="flex items-center gap-2 ml-2 flex-shrink-0">
              <span className="text-[10px] font-mono text-muted-foreground">
                {model.latencyMs}ms
              </span>
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  model.status === "online"
                    ? "bg-[hsl(var(--fx-glow-green))]"
                    : model.status === "rate_limited"
                    ? "bg-warning"
                    : "bg-destructive"
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
