"use client"

import { cn } from "@/lib/utils"
import { GlowBadge } from "@/components/aura"
import type { PromptLogEntry, TraceLogEntry, LogicFlowIssue } from "@/lib/types"
import { useState } from "react"
import { MessageSquare, Activity, AlertTriangle } from "lucide-react"

interface LogsPanelProps {
  promptLogs: PromptLogEntry[]
  traceLogs: TraceLogEntry[]
  issues: LogicFlowIssue[]
  className?: string
}

type Tab = "prompts" | "traces" | "analysis"

export function LogsPanel({
  promptLogs,
  traceLogs,
  issues,
  className,
}: LogsPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>("traces")

  const tabs: { id: Tab; label: string; icon: typeof MessageSquare; count: number }[] = [
    { id: "prompts", label: "Prompts", icon: MessageSquare, count: promptLogs.length },
    { id: "traces", label: "Traces", icon: Activity, count: traceLogs.length },
    { id: "analysis", label: "Analysis", icon: AlertTriangle, count: issues.length },
  ]

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Tab bar */}
      <div className="flex items-center border-b border-border px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
              <span className="ml-1 rounded-full bg-muted px-1.5 py-0.5 text-xs">
                {tab.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-3">
        {activeTab === "prompts" && (
          <div className="flex flex-col gap-2">
            {promptLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-md border border-border bg-muted/30 p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <GlowBadge
                    variant={log.role === "user" ? "cyan" : "purple"}
                  >
                    {log.role}
                  </GlowBadge>
                  <span className="text-xs text-muted-foreground font-mono">
                    {log.modelId}
                  </span>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap line-clamp-4">
                  {log.content}
                </p>
              </div>
            ))}
            {promptLogs.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No prompt logs yet
              </p>
            )}
          </div>
        )}

        {activeTab === "traces" && (
          <div className="flex flex-col gap-2">
            {traceLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-md border border-border bg-muted/30 p-3"
              >
                <div className="flex items-center gap-2">
                  <GlowBadge
                    variant={log.status === "ok" ? "success" : "destructive"}
                  >
                    {log.status}
                  </GlowBadge>
                  <GlowBadge>{log.kind}</GlowBadge>
                  <span className="text-xs text-muted-foreground ml-auto">
                    {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
                <pre className="mt-2 text-xs text-muted-foreground font-mono overflow-auto">
                  {JSON.stringify(log.metadata, null, 2)}
                </pre>
              </div>
            ))}
            {traceLogs.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No trace logs yet
              </p>
            )}
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="flex flex-col gap-2">
            {issues.map((issue, i) => (
              <div
                key={i}
                className="rounded-md border border-border bg-muted/30 p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  <GlowBadge variant="warning">{issue.kind}</GlowBadge>
                  <span className="text-xs font-mono text-muted-foreground">
                    {issue.path}
                  </span>
                </div>
                <p className="text-xs text-foreground">{issue.message}</p>
                {issue.suggestion && (
                  <p className="mt-1 text-xs text-primary">
                    Suggestion: {issue.suggestion}
                  </p>
                )}
              </div>
            ))}
            {issues.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-8">
                No issues detected
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
