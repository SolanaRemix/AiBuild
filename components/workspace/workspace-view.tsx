"use client"

import { useState } from "react"
import { FileTree } from "./file-tree"
import { CodeEditor } from "./code-editor"
import { PreviewPane } from "./preview-pane"
import { LogsPanel } from "./logs-panel"
import { GlowButton, GlowBadge } from "@/components/aura"
import type { Project, ProjectFile, Deployment, PromptLogEntry, TraceLogEntry, LogicFlowIssue } from "@/lib/types"
import { GitBranch, Rocket, RefreshCw, Globe, Smartphone, Monitor } from "lucide-react"

interface WorkspaceViewProps {
  project: Project
  files: ProjectFile[]
  deployment: Deployment | null
  promptLogs: PromptLogEntry[]
  traceLogs: TraceLogEntry[]
  issues: LogicFlowIssue[]
}

type RightPanel = "preview" | "logs"

const targetIcons = {
  web: Globe,
  mobile: Smartphone,
  desktop: Monitor,
}

export function WorkspaceView({
  project,
  files,
  deployment,
  promptLogs,
  traceLogs,
  issues,
}: WorkspaceViewProps) {
  const [selectedPath, setSelectedPath] = useState<string | null>(
    files[0]?.path || null
  )
  const [rightPanel, setRightPanel] = useState<RightPanel>("preview")

  const selectedFile = files.find((f) => f.path === selectedPath) || null
  const TargetIcon = targetIcons[project.primaryTarget]

  const statusVariants = {
    draft: "default" as const,
    ready: "cyan" as const,
    synced: "purple" as const,
    deployed: "success" as const,
    building: "warning" as const,
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Workspace toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <TargetIcon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">{project.name}</h1>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">
                {project.slug}
              </span>
              <GlowBadge variant={statusVariants[project.status]}>
                {project.status}
              </GlowBadge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <GlowButton size="sm" variant="ghost">
            <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
            Regenerate
          </GlowButton>
          <GlowButton size="sm" variant="outline">
            <GitBranch className="mr-1.5 h-3.5 w-3.5" />
            Sync to GitHub
          </GlowButton>
          <GlowButton size="sm">
            <Rocket className="mr-1.5 h-3.5 w-3.5" />
            Deploy
          </GlowButton>
        </div>
      </div>

      {/* Workspace body */}
      <div className="flex flex-1 gap-0 overflow-hidden rounded-lg border border-border bg-card min-h-[600px]">
        {/* File tree sidebar */}
        <div className="w-56 shrink-0 border-r border-border overflow-auto hidden md:block">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Files
            </span>
            <span className="text-xs text-muted-foreground">{files.length}</span>
          </div>
          <FileTree
            files={files}
            selectedPath={selectedPath}
            onSelect={setSelectedPath}
          />
        </div>

        {/* Center - code editor */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <CodeEditor file={selectedFile} className="flex-1 overflow-auto" />
        </div>

        {/* Right panel */}
        <div className="w-80 shrink-0 border-l border-border flex flex-col hidden lg:flex">
          <div className="flex border-b border-border">
            <button
              onClick={() => setRightPanel("preview")}
              className={`flex-1 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                rightPanel === "preview"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setRightPanel("logs")}
              className={`flex-1 px-3 py-2 text-xs font-medium border-b-2 transition-colors ${
                rightPanel === "logs"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Logs & Analysis
            </button>
          </div>

          {rightPanel === "preview" ? (
            <PreviewPane
              project={project}
              deployment={deployment}
              className="flex-1"
            />
          ) : (
            <LogsPanel
              promptLogs={promptLogs}
              traceLogs={traceLogs}
              issues={issues}
              className="flex-1"
            />
          )}
        </div>
      </div>
    </div>
  )
}
