"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowTabs } from "@/components/aura"
import { mockPromptLogs, mockTraceLogs } from "@/lib/mock-data"
import { MessageSquare, Activity, Filter } from "lucide-react"

type Tab = "prompts" | "builds" | "traces"

export default function DevLogsPage() {
  const [tab, setTab] = useState<Tab>("traces")

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Logs</h1>
          <p className="text-sm text-muted-foreground">AI prompts, build logs, and trace timelines</p>
        </div>
        <GlowTabs
          tabs={[
            { id: "prompts" as Tab, label: "AI Prompts" },
            { id: "builds" as Tab, label: "Builds" },
            { id: "traces" as Tab, label: "Traces" },
          ]}
          active={tab}
          onTabChange={setTab}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
          <Filter className="h-3.5 w-3.5" />
          <span>All Projects</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
          <span>All Models</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-muted-foreground">
          <span>Last 7 days</span>
        </div>
      </div>

      {/* Prompt logs */}
      {tab === "prompts" && (
        <div className="flex flex-col gap-3">
          {mockPromptLogs.map((log) => (
            <GlowCard key={log.id} className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <MessageSquare className="h-4 w-4 text-primary" />
                <GlowBadge variant={log.role === "user" ? "cyan" : "purple"}>{log.role}</GlowBadge>
                <span className="text-xs font-mono text-muted-foreground">{log.modelId}</span>
                <span className="text-xs text-muted-foreground ml-auto">{new Date(log.createdAt).toLocaleString()}</span>
              </div>
              <pre className="text-sm text-foreground whitespace-pre-wrap leading-relaxed font-mono">{log.content}</pre>
            </GlowCard>
          ))}
        </div>
      )}

      {/* Build logs (placeholder) */}
      {tab === "builds" && (
        <GlowCard className="p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <Activity className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">Build logs will appear here during active builds</p>
          </div>
        </GlowCard>
      )}

      {/* Trace logs */}
      {tab === "traces" && (
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-5 gap-4 bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>Status</span>
            <span>Kind</span>
            <span>Project</span>
            <span>Details</span>
            <span>Time</span>
          </div>
          {mockTraceLogs.map((log) => (
            <div key={log.id} className="grid grid-cols-5 gap-4 border-t border-border px-4 py-3 text-sm items-center">
              <GlowBadge variant={log.status === "ok" ? "success" : "destructive"}>{log.status}</GlowBadge>
              <GlowBadge>{log.kind}</GlowBadge>
              <span className="font-mono text-xs text-muted-foreground truncate">{log.projectId}</span>
              <span className="font-mono text-xs text-muted-foreground truncate">{JSON.stringify(log.metadata).slice(0, 50)}...</span>
              <span className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
