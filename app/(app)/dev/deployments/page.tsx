"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockDeployments, mockProjects } from "@/lib/mock-data"
import type { Deployment } from "@/lib/types"
import { Rocket, ExternalLink, RefreshCw, ScrollText, X, Globe, Smartphone, Monitor } from "lucide-react"

const targetIcons = { web: Globe, mobile: Smartphone, desktop: Monitor }
const statusVariant = {
  pending: "default" as const,
  building: "warning" as const,
  ready: "success" as const,
  failed: "destructive" as const,
}

export default function DeploymentsPage() {
  const [detail, setDetail] = useState<Deployment | null>(null)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Deployments</h1>
        <p className="text-sm text-muted-foreground">All project deployments across providers</p>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-6 gap-4 bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <span>Project</span>
          <span>Target</span>
          <span>Provider</span>
          <span>Status</span>
          <span>Created</span>
          <span>Actions</span>
        </div>
        {mockDeployments.map((d) => {
          const project = mockProjects.find((p) => p.id === d.projectId)
          const TargetIcon = targetIcons[d.target]
          return (
            <div key={d.id} className="grid grid-cols-6 gap-4 border-t border-border px-4 py-3 text-sm items-center">
              <span className="font-medium text-foreground truncate">{project?.name ?? d.projectId}</span>
              <div className="flex items-center gap-1.5">
                <TargetIcon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">{d.target}</span>
              </div>
              <span className="text-muted-foreground capitalize">{d.provider}</span>
              <GlowBadge variant={statusVariant[d.status]}>{d.status}</GlowBadge>
              <span className="text-xs text-muted-foreground">{new Date(d.createdAt).toLocaleDateString()}</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setDetail(d)} className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="View details">
                  <ScrollText className="h-3.5 w-3.5" />
                </button>
                {d.artifactUrl && (
                  <a href={d.artifactUrl} target="_blank" rel="noopener noreferrer" className="rounded-md p-1.5 text-muted-foreground hover:text-primary hover:bg-muted transition-colors" aria-label="Open deployment">
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail drawer */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 glass p-4">
          <GlowCard variant="cyan" className="w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Deployment Details</h2>
              <button onClick={() => setDetail(null)} className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div><span className="text-xs text-muted-foreground">Target</span><p className="text-sm font-medium text-foreground capitalize mt-1">{detail.target}</p></div>
                <div><span className="text-xs text-muted-foreground">Provider</span><p className="text-sm font-medium text-foreground capitalize mt-1">{detail.provider}</p></div>
                <div><span className="text-xs text-muted-foreground">Status</span><div className="mt-1"><GlowBadge variant={statusVariant[detail.status]}>{detail.status}</GlowBadge></div></div>
                <div><span className="text-xs text-muted-foreground">Created</span><p className="text-sm text-foreground mt-1">{new Date(detail.createdAt).toLocaleString()}</p></div>
              </div>
              {detail.artifactUrl && (
                <div><span className="text-xs text-muted-foreground">Artifact URL</span><a href={detail.artifactUrl} target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline font-mono mt-1">{detail.artifactUrl}</a></div>
              )}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <GlowButton size="sm" variant="outline"><RefreshCw className="mr-1.5 h-3.5 w-3.5" />Re-deploy</GlowButton>
                <GlowButton size="sm" variant="ghost"><ScrollText className="mr-1.5 h-3.5 w-3.5" />View Logs</GlowButton>
              </div>
            </div>
          </GlowCard>
        </div>
      )}
    </div>
  )
}
