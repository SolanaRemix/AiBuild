"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockUserAgents, mockModels } from "@/lib/mock-data"
import type { UserAgent } from "@/lib/types"
import { Bot, Plus, Copy, Archive, Pencil, X, Brain, Code2, RefreshCw, Search } from "lucide-react"

export default function AgentsPage() {
  const [agents, setAgents] = useState(mockUserAgents)
  const [editing, setEditing] = useState<UserAgent | null>(null)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Agents</h1>
          <p className="text-sm text-muted-foreground">Personal AI agents built on CyberAi</p>
        </div>
        <GlowButton>
          <Plus className="mr-2 h-4 w-4" />
          New Agent
        </GlowButton>
      </div>

      {/* Agent list */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <GlowCard key={agent.id} className="p-5">
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                    <p className="text-xs text-muted-foreground">{agent.role}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Brain className="h-3 w-3" />
                <span className="font-mono">{agent.baseModel}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {agent.capabilities.map((cap) => (
                  <GlowBadge key={cap} variant="cyan">
                    {cap === "codegen" ? "Code Gen" : cap === "refactor" ? "Refactor" : "Analysis"}
                  </GlowBadge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">{agent.usage} uses</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditing(agent)}
                    className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Edit agent"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Duplicate agent"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className="rounded-md p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
                    aria-label="Archive agent"
                  >
                    <Archive className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Agent editor drawer */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 glass p-4">
          <GlowCard variant="cyan" className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">Edit Agent: {editing.name}</h2>
              <button
                onClick={() => setEditing(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close editor"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {/* Behavior */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-foreground">Behavior</h3>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground">System Prompt</label>
                  <textarea
                    defaultValue={editing.systemPrompt}
                    className="h-24 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground font-mono resize-none focus:outline-none focus:border-glow-cyan focus:glow-blue transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-3">
                  {(["codegen", "refactor", "analysis"] as const).map((cap) => (
                    <label key={cap} className="flex items-center gap-2 text-sm text-foreground">
                      <input
                        type="checkbox"
                        defaultChecked={editing.capabilities.includes(cap)}
                        className="rounded border-border"
                      />
                      {cap === "codegen" ? "Code Generation" : cap === "refactor" ? "Refactoring" : "Analysis"}
                    </label>
                  ))}
                </div>
              </div>

              {/* Models */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-foreground">Allowed Models</h3>
                <div className="flex flex-wrap gap-2">
                  {mockModels.filter(m => m.enabled).map((model) => (
                    <label key={model.id} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked={editing.allowedModels.includes(model.modelId)}
                        className="rounded border-border"
                      />
                      <span className="font-mono text-xs">{model.modelId}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Limits */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-foreground">Limits</h3>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-muted-foreground">Max tokens per request</label>
                  <input
                    type="number"
                    defaultValue={editing.maxTokens}
                    className="w-48 rounded-lg border border-border bg-muted px-3 py-2 text-sm text-foreground focus:outline-none focus:border-glow-cyan focus:glow-blue transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <GlowButton className="flex-1" onClick={() => setEditing(null)}>Save Changes</GlowButton>
                <GlowButton variant="ghost" onClick={() => setEditing(null)}>Cancel</GlowButton>
              </div>
            </div>
          </GlowCard>
        </div>
      )}
    </div>
  )
}
