"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockPromptLogs, mockTraceLogs } from "@/lib/mock-data"
import {
  MessageSquare,
  Activity,
  TestTube,
  Filter,
  ChevronDown,
  Clock,
} from "lucide-react"

type LogTab = "prompts" | "builds" | "tests"

const mockBuildLogs = [
  {
    id: "bl_1",
    project: "AI Wallet App",
    type: "build",
    status: "success" as const,
    message: "Build completed successfully in 42s",
    timestamp: "2026-02-05T14:22:00Z",
    details: {
      target: "web",
      provider: "Vercel",
      filesProcessed: 12,
      outputSize: "2.4 MB",
    },
  },
  {
    id: "bl_2",
    project: "Task Manager Mobile",
    type: "build",
    status: "running" as const,
    message: "Building APK artifact...",
    timestamp: "2026-02-05T13:00:00Z",
    details: {
      target: "mobile",
      provider: "GitHub Actions",
      filesProcessed: 18,
      outputSize: "--",
    },
  },
  {
    id: "bl_3",
    project: "Admin Dashboard",
    type: "build",
    status: "error" as const,
    message: "Build failed: TypeScript compilation error in app/page.tsx",
    timestamp: "2026-02-03T16:20:00Z",
    details: {
      target: "web",
      provider: "Vercel",
      filesProcessed: 8,
      outputSize: "--",
    },
  },
]

const mockTestLogs = [
  {
    id: "tl_1",
    project: "AI Wallet App",
    suite: "Unit Tests",
    passed: 12,
    failed: 0,
    skipped: 1,
    timestamp: "2026-02-05T14:20:00Z",
  },
  {
    id: "tl_2",
    project: "SaaS Landing Page",
    suite: "E2E Tests",
    passed: 5,
    failed: 1,
    skipped: 0,
    timestamp: "2026-02-04T11:40:00Z",
  },
]

const tabs = [
  { id: "prompts" as const, label: "AI Prompts", icon: MessageSquare },
  { id: "builds" as const, label: "Builds", icon: Activity },
  { id: "tests" as const, label: "Tests", icon: TestTube },
]

export function DevLogsView() {
  const [activeTab, setActiveTab] = useState<LogTab>("prompts")

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Logs
          </h1>
          <p className="text-sm text-muted-foreground">
            AI prompt logs, build output, and test results across all projects
          </p>
        </div>
        <GlowButton variant="outline" size="sm">
          <Filter className="mr-1.5 h-3.5 w-3.5" />
          Filters
        </GlowButton>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Prompt logs */}
      {activeTab === "prompts" && (
        <div className="flex flex-col gap-3">
          {[...mockPromptLogs, ...mockTraceLogs.map((t) => ({
            id: t.id,
            projectId: t.projectId,
            providerId: "system",
            modelId: (t.metadata as Record<string, string>).model || "system",
            role: "assistant" as const,
            content: `[${t.kind}] ${JSON.stringify(t.metadata)}`,
            createdAt: t.createdAt,
          }))].map((log) => (
            <GlowCard key={log.id} className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <GlowBadge variant={log.role === "user" ? "cyan" : "purple"}>
                  {log.role}
                </GlowBadge>
                <code className="text-xs font-mono text-muted-foreground">
                  {log.modelId}
                </code>
                <span className="text-xs text-muted-foreground font-mono">
                  {log.projectId}
                </span>
                <span className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
              <pre className="text-sm text-foreground leading-relaxed whitespace-pre-wrap font-mono bg-muted/30 rounded-md p-3">
                {log.content}
              </pre>
            </GlowCard>
          ))}
        </div>
      )}

      {/* Build logs */}
      {activeTab === "builds" && (
        <div className="flex flex-col gap-3">
          {mockBuildLogs.map((log) => (
            <GlowCard
              key={log.id}
              variant={log.status === "success" ? "cyan" : log.status === "error" ? "default" : "default"}
              className="p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <GlowBadge
                    variant={
                      log.status === "success"
                        ? "success"
                        : log.status === "error"
                          ? "destructive"
                          : "warning"
                    }
                  >
                    {log.status}
                  </GlowBadge>
                  <span className="text-sm font-medium text-foreground">
                    {log.project}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-foreground mb-3">{log.message}</p>
              <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span>Target: <span className="text-foreground">{log.details.target}</span></span>
                <span>Provider: <span className="text-foreground">{log.details.provider}</span></span>
                <span>Files: <span className="text-foreground">{log.details.filesProcessed}</span></span>
                <span>Output: <span className="text-foreground">{log.details.outputSize}</span></span>
              </div>
            </GlowCard>
          ))}
        </div>
      )}

      {/* Test logs */}
      {activeTab === "tests" && (
        <div className="flex flex-col gap-3">
          {mockTestLogs.map((log) => (
            <GlowCard key={log.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {log.project} - {log.suite}
                  </h3>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-sm text-foreground">{log.passed} passed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-destructive" />
                  <span className="text-sm text-foreground">{log.failed} failed</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                  <span className="text-sm text-foreground">{log.skipped} skipped</span>
                </div>
              </div>
              {/* Simple progress bar */}
              <div className="flex h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-success"
                  style={{ width: `${(log.passed / (log.passed + log.failed + log.skipped)) * 100}%` }}
                />
                <div
                  className="bg-destructive"
                  style={{ width: `${(log.failed / (log.passed + log.failed + log.skipped)) * 100}%` }}
                />
                <div
                  className="bg-muted-foreground"
                  style={{ width: `${(log.skipped / (log.passed + log.failed + log.skipped)) * 100}%` }}
                />
              </div>
            </GlowCard>
          ))}
        </div>
      )}
    </div>
  )
}
