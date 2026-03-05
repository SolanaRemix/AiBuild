"use client"

import type { Tool } from "@/types"
import { cn, formatRelativeTime } from "@/lib/utils"
import { Wrench, ShieldCheck, Shield, Zap, Power } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

const CATEGORY_COLORS: Record<string, string> = {
  web: "text-primary border-primary/20 bg-primary/10",
  code: "text-warning border-warning/20 bg-warning/10",
  data: "text-[hsl(var(--fx-glow-green))] border-[hsl(var(--fx-glow-green))]/20 bg-[hsl(var(--fx-glow-green))]/10",
  system: "text-[hsl(var(--fx-glow-purple))] border-[hsl(var(--fx-glow-purple))]/20 bg-[hsl(var(--fx-glow-purple))]/10",
  memory: "text-destructive border-destructive/20 bg-destructive/10",
  communication: "text-muted-foreground border-border bg-muted/20",
  custom: "text-muted-foreground border-border bg-muted/20",
}

export function ToolCard({ tool: initialTool }: { tool: Tool }) {
  const [tool, setTool] = useState(initialTool)
  const [toggling, setToggling] = useState(false)
  const router = useRouter()

  async function handleToggle() {
    setToggling(true)
    try {
      const res = await fetch(`/api/tools/${tool.id}/toggle`, { method: "POST" })
      if (res.ok) {
        const data = await res.json()
        setTool(data.tool)
      }
    } finally {
      setToggling(false)
    }
  }

  return (
    <div
      className={cn(
        "rounded-xl border bg-[hsl(var(--fx-surface))] transition-all duration-200 hover:border-primary/30 overflow-hidden",
        tool.enabled ? "border-border" : "border-border opacity-60"
      )}
    >
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0",
                tool.enabled
                  ? "bg-primary/10 border-primary/20 text-primary"
                  : "bg-muted/30 border-border text-muted-foreground"
              )}
            >
              <Wrench className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold font-mono text-sm text-foreground">{tool.name}</p>
              <span
                className={cn(
                  "text-[10px] font-mono border rounded px-1.5 py-0.5 capitalize",
                  CATEGORY_COLORS[tool.category] ?? CATEGORY_COLORS.custom
                )}
              >
                {tool.category}
              </span>
            </div>
          </div>

          <button
            onClick={handleToggle}
            disabled={toggling}
            title={tool.enabled ? "Disable tool" : "Enable tool"}
            className={cn(
              "w-8 h-8 rounded-full border flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]",
              tool.enabled
                ? "border-[hsl(var(--fx-glow-green))]/30 bg-[hsl(var(--fx-glow-green))]/10 text-[hsl(var(--fx-glow-green))] hover:bg-[hsl(var(--fx-glow-green))]/20"
                : "border-border bg-muted/20 text-muted-foreground hover:text-foreground"
            )}
          >
            <Power className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
          {tool.description}
        </p>

        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            {tool.callCount.toLocaleString()} calls
          </span>
          {tool.sandboxed ? (
            <span className="flex items-center gap-1 text-[hsl(var(--fx-glow-green))]">
              <ShieldCheck className="w-3 h-3" />
              sandboxed
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3" />
              live
            </span>
          )}
          <span className="ml-auto">v{tool.version}</span>
        </div>
      </div>

      <div className="flex items-center justify-between px-5 py-2.5 border-t border-border bg-[hsl(var(--fx-rail))]">
        <span className="text-[10px] font-mono text-muted-foreground">
          {tool.lastCalledAt ? `Last used ${formatRelativeTime(tool.lastCalledAt)}` : "Never used"}
        </span>
        <span className="text-[10px] font-mono text-muted-foreground">{tool.author}</span>
      </div>
    </div>
  )
}
