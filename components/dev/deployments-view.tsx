"use client"

import { useState } from "react"
import { GlowBadge, GlowButton } from "@/components/aura"
import {
  Rocket,
  Globe,
  Smartphone,
  Monitor,
  ExternalLink,
  RefreshCw,
  ChevronRight,
  X,
  ScrollText,
  Clock,
} from "lucide-react"

interface DeploymentRecord {
  id: string
  projectName: string
  projectId: string
  target: "web" | "mobile" | "desktop"
  provider: string
  status: "pending" | "building" | "ready" | "failed"
  artifactUrl: string | null
  createdAt: string
  duration: string
}

const mockDeployments: DeploymentRecord[] = [
  {
    id: "d_1",
    projectName: "AI Wallet App",
    projectId: "proj_1",
    target: "web",
    provider: "Vercel",
    status: "ready",
    artifactUrl: "https://ai-wallet-app.vercel.app",
    createdAt: "2026-02-05T14:22:00Z",
    duration: "42s",
  },
  {
    id: "d_2",
    projectName: "Task Manager Mobile",
    projectId: "proj_3",
    target: "mobile",
    provider: "GitHub Actions",
    status: "building",
    artifactUrl: null,
    createdAt: "2026-02-05T13:00:00Z",
    duration: "2m 14s",
  },
  {
    id: "d_3",
    projectName: "SaaS Landing Page",
    projectId: "proj_2",
    target: "web",
    provider: "Vercel",
    status: "ready",
    artifactUrl: "https://saas-landing.vercel.app",
    createdAt: "2026-02-04T11:45:00Z",
    duration: "28s",
  },
  {
    id: "d_4",
    projectName: "Admin Dashboard",
    projectId: "proj_4",
    target: "web",
    provider: "Vercel",
    status: "failed",
    artifactUrl: null,
    createdAt: "2026-02-03T16:20:00Z",
    duration: "1m 05s",
  },
  {
    id: "d_5",
    projectName: "AI Wallet App",
    projectId: "proj_1",
    target: "desktop",
    provider: "Local Runner",
    status: "ready",
    artifactUrl: null,
    createdAt: "2026-02-02T09:30:00Z",
    duration: "3m 52s",
  },
]

const targetIcons = {
  web: Globe,
  mobile: Smartphone,
  desktop: Monitor,
}

const statusVariants = {
  pending: "default" as const,
  building: "warning" as const,
  ready: "success" as const,
  failed: "destructive" as const,
}

export function DeploymentsView() {
  const [selectedDeploy, setSelectedDeploy] = useState<DeploymentRecord | null>(null)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Deployments
          </h1>
          <p className="text-sm text-muted-foreground">
            All project deployments across web, mobile, and desktop targets
          </p>
        </div>
        <div className="flex items-center gap-3">
          <GlowBadge variant="success">
            {mockDeployments.filter((d) => d.status === "ready").length} live
          </GlowBadge>
          <GlowBadge variant="warning">
            {mockDeployments.filter((d) => d.status === "building").length} building
          </GlowBadge>
        </div>
      </div>

      {/* Deployment table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-7 gap-4 bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <span>Project</span>
          <span>Target</span>
          <span>Provider</span>
          <span>Status</span>
          <span>Duration</span>
          <span>Created</span>
          <span>Actions</span>
        </div>

        {mockDeployments.map((deploy) => {
          const TargetIcon = targetIcons[deploy.target]
          return (
            <div
              key={deploy.id}
              className="grid grid-cols-7 gap-4 border-t border-border px-4 py-3 text-sm items-center hover:bg-muted/20 transition-colors cursor-pointer"
              onClick={() => setSelectedDeploy(deploy)}
            >
              <span className="font-medium text-foreground truncate">
                {deploy.projectName}
              </span>
              <div className="flex items-center gap-1.5">
                <TargetIcon className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-muted-foreground">{deploy.target}</span>
              </div>
              <span className="text-muted-foreground">{deploy.provider}</span>
              <GlowBadge variant={statusVariants[deploy.status]}>
                {deploy.status}
              </GlowBadge>
              <span className="text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {deploy.duration}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(deploy.createdAt).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-1">
                {deploy.artifactUrl && (
                  <a
                    href={deploy.artifactUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-md p-1.5 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
                <button
                  className="rounded-md p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Detail drawer */}
      {selectedDeploy && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-border bg-card glass shadow-2xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">
                Deployment Details
              </h2>
              <button
                onClick={() => setSelectedDeploy(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Rocket className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {selectedDeploy.projectName}
                    </h3>
                    <code className="text-xs font-mono text-muted-foreground">
                      {selectedDeploy.id}
                    </code>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "Target", value: selectedDeploy.target },
                    { label: "Provider", value: selectedDeploy.provider },
                    { label: "Status", value: selectedDeploy.status },
                    { label: "Duration", value: selectedDeploy.duration },
                  ].map((item) => (
                    <div key={item.label}>
                      <span className="text-xs text-muted-foreground">{item.label}</span>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                {selectedDeploy.artifactUrl && (
                  <div>
                    <span className="text-xs text-muted-foreground">Live URL</span>
                    <a
                      href={selectedDeploy.artifactUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline font-mono mt-0.5"
                    >
                      {selectedDeploy.artifactUrl}
                    </a>
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <GlowButton size="sm">
                    <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                    Re-deploy
                  </GlowButton>
                  <GlowButton size="sm" variant="outline">
                    <ScrollText className="mr-1.5 h-3.5 w-3.5" />
                    View Build Logs
                  </GlowButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
