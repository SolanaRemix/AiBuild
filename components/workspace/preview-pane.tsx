"use client"

import { cn } from "@/lib/utils"
import type { Project, Deployment } from "@/lib/types"
import { GlowBadge, GlowButton } from "@/components/aura"
import { ExternalLink, RefreshCw, Globe, Smartphone, Monitor } from "lucide-react"

interface PreviewPaneProps {
  project: Project
  deployment: Deployment | null
  className?: string
}

const targetIcons = {
  web: Globe,
  mobile: Smartphone,
  desktop: Monitor,
}

export function PreviewPane({ project, deployment, className }: PreviewPaneProps) {
  const TargetIcon = targetIcons[project.primaryTarget]

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Preview header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center gap-2">
          <TargetIcon className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">Preview</span>
          {deployment && (
            <GlowBadge
              variant={
                deployment.status === "ready"
                  ? "success"
                  : deployment.status === "building"
                    ? "warning"
                    : deployment.status === "failed"
                      ? "destructive"
                      : "default"
              }
            >
              {deployment.status}
            </GlowBadge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <GlowButton size="sm" variant="ghost">
            <RefreshCw className="h-3.5 w-3.5" />
          </GlowButton>
          {deployment?.artifactUrl && (
            <a
              href={deployment.artifactUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlowButton size="sm" variant="ghost">
                <ExternalLink className="h-3.5 w-3.5" />
              </GlowButton>
            </a>
          )}
        </div>
      </div>

      {/* Preview content */}
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        {deployment?.status === "ready" && deployment.artifactUrl ? (
          <div className="flex flex-col items-center gap-4 p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/10 border border-success/20">
              <Globe className="h-8 w-8 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Deployed successfully</p>
              <a
                href={deployment.artifactUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline font-mono"
              >
                {deployment.artifactUrl}
              </a>
            </div>
          </div>
        ) : deployment?.status === "building" ? (
          <div className="flex flex-col items-center gap-4 p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-warning/10 border border-warning/20">
              <RefreshCw className="h-8 w-8 text-warning animate-spin" />
            </div>
            <p className="text-sm text-muted-foreground">Building project...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted border border-border">
              <TargetIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No preview available. Deploy to see your project live.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
