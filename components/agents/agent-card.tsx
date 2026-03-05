import type { Agent } from "@/types"
import { AgentStatusBadge } from "@/components/ui/status-badge"
import { formatRelativeTime } from "@/lib/utils"
import { Bot, Brain, Wrench, Thermometer, Play, Settings } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const TEMPLATE_COLORS: Record<string, string> = {
  general: "text-primary border-primary/20 bg-primary/10",
  research: "text-[hsl(var(--fx-glow-green))] border-[hsl(var(--fx-glow-green))]/20 bg-[hsl(var(--fx-glow-green))]/10",
  coding: "text-warning border-warning/20 bg-warning/10",
  automation: "text-[hsl(var(--fx-glow-purple))] border-[hsl(var(--fx-glow-purple))]/20 bg-[hsl(var(--fx-glow-purple))]/10",
  terminal: "text-muted-foreground border-border bg-muted/20",
  browser: "text-destructive border-destructive/20 bg-destructive/10",
}

export function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] hover:border-primary/30 hover:glow-blue transition-all duration-200 overflow-hidden group">
      {/* Header */}
      <div className="flex items-start justify-between p-5 pb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold font-mono text-foreground truncate">{agent.name}</p>
            <span
              className={cn(
                "inline-block text-[10px] font-mono border rounded px-1.5 py-0.5 mt-0.5 capitalize",
                TEMPLATE_COLORS[agent.template] ?? TEMPLATE_COLORS.general
              )}
            >
              {agent.template}
            </span>
          </div>
        </div>
        <AgentStatusBadge status={agent.status} />
      </div>

      {/* Description */}
      <p className="px-5 pb-4 text-xs text-muted-foreground leading-relaxed line-clamp-2">
        {agent.description}
      </p>

      {/* Meta */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-2 text-xs font-mono">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Thermometer className="w-3 h-3" />
          <span>temp {agent.temperature}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Wrench className="w-3 h-3" />
          <span>{agent.tools.length} tools</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Brain className="w-3 h-3" />
          <span>{agent.memoryEnabled ? "memory on" : "no memory"}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Play className="w-3 h-3" />
          <span>{agent.runCount} runs</span>
        </div>
      </div>

      {/* Model chip */}
      <div className="px-5 pb-3">
        <span className="inline-block text-[10px] font-mono bg-[hsl(var(--fx-rail))] border border-border rounded px-2 py-0.5 text-muted-foreground">
          {agent.model}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-[hsl(var(--fx-rail))]">
        <span className="text-[10px] text-muted-foreground font-mono">
          {agent.lastRunAt ? `Last run ${formatRelativeTime(agent.lastRunAt)}` : "Never run"}
        </span>
        <div className="flex items-center gap-2">
          <Link
            href={`/agents/${agent.id}`}
            className="flex items-center gap-1 text-xs font-mono text-primary hover:underline"
          >
            <Settings className="w-3 h-3" />
            Configure
          </Link>
        </div>
      </div>
    </div>
  )
}
