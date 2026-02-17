"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton, GlowInput } from "@/components/aura"
import {
  Layers,
  Bot,
  Pencil,
  Power,
  PowerOff,
  ChevronRight,
  X,
} from "lucide-react"

interface GlobalAgent {
  id: string
  name: string
  description: string
  systemPrompt: string
  allowedModels: string[]
  routingPolicy: "primary" | "fallback" | "free-only"
  enabled: boolean
  totalUsage: number
}

const mockGlobalAgents: GlobalAgent[] = [
  {
    id: "ga_1",
    name: "CyberAi Code Builder",
    description: "Primary code generation agent. Handles project scaffolding, page generation, and component creation.",
    systemPrompt: "You are the CyberAi Code Builder. Generate clean, production-ready code with proper TypeScript types, error handling, and Next.js best practices.",
    allowedModels: ["gpt-4o", "gemini-2.0-flash", "claude-sonnet-4-20250514"],
    routingPolicy: "primary",
    enabled: true,
    totalUsage: 1842,
  },
  {
    id: "ga_2",
    name: "Analyzer",
    description: "Code analysis agent. Detects logic flow issues, missing checks, dead code, and security vulnerabilities.",
    systemPrompt: "You are a code quality analyzer. Examine code for bugs, security issues, performance problems, and best practice violations. Return structured issue reports.",
    allowedModels: ["gpt-4o", "claude-sonnet-4-20250514"],
    routingPolicy: "primary",
    enabled: true,
    totalUsage: 567,
  },
  {
    id: "ga_3",
    name: "Refiner",
    description: "Iterative code refiner. Applies fixes, patches, and improvements based on analyzer feedback.",
    systemPrompt: "You are a code refiner. Given source code and a list of issues, apply targeted fixes while preserving the overall architecture and intent.",
    allowedModels: ["gemini-2.0-flash", "deepseek-coder"],
    routingPolicy: "free-only",
    enabled: true,
    totalUsage: 312,
  },
  {
    id: "ga_4",
    name: "Test Generator",
    description: "Generates unit and integration tests for generated code.",
    systemPrompt: "You generate comprehensive test suites. Write unit tests for functions and integration tests for API routes. Use vitest as the test runner.",
    allowedModels: ["gemini-2.0-flash"],
    routingPolicy: "free-only",
    enabled: false,
    totalUsage: 89,
  },
]

const routingVariants = {
  primary: "cyan" as const,
  fallback: "warning" as const,
  "free-only": "success" as const,
}

export function AdminAgentsView() {
  const [agents, setAgents] = useState(mockGlobalAgents)
  const [editingAgent, setEditingAgent] = useState<GlobalAgent | null>(null)

  const toggleAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Global Agents
          </h1>
          <p className="text-sm text-muted-foreground">
            System-level agents that power the CyberAi pipeline. Configure behavior, models, and routing.
          </p>
        </div>
        <GlowBadge variant="cyan">
          {agents.filter((a) => a.enabled).length} of {agents.length} active
        </GlowBadge>
      </div>

      {/* Agent cards */}
      <div className="flex flex-col gap-4">
        {agents.map((agent) => (
          <GlowCard
            key={agent.id}
            variant={agent.enabled ? "cyan" : "default"}
            className="p-6"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {agent.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleAgent(agent.id)}
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                      agent.enabled
                        ? "bg-success/10 text-success hover:bg-success/20"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    aria-label={agent.enabled ? "Disable agent" : "Enable agent"}
                  >
                    {agent.enabled ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="rounded-md bg-muted/50 border border-border p-3">
                <p className="text-xs text-muted-foreground font-mono leading-relaxed line-clamp-2">
                  {agent.systemPrompt}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <span className="text-xs text-muted-foreground">Models</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {agent.allowedModels.map((model) => (
                      <GlowBadge key={model}>{model}</GlowBadge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    Routing: <GlowBadge variant={routingVariants[agent.routingPolicy]}>{agent.routingPolicy}</GlowBadge>
                  </span>
                  <span>{agent.totalUsage.toLocaleString()} total generations</span>
                </div>
                <GlowButton
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingAgent(agent)}
                >
                  <Pencil className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </GlowButton>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Edit modal */}
      {editingAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 glass p-4">
          <GlowCard variant="cyan" className="w-full max-w-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-lg font-semibold text-foreground">
                Edit: {editingAgent.name}
              </h2>
              <button
                onClick={() => setEditingAgent(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <form className="flex flex-col gap-5">
                <GlowInput
                  id="agent-name"
                  label="Agent Name"
                  defaultValue={editingAgent.name}
                />
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-muted-foreground">System Prompt</label>
                  <textarea
                    className="flex min-h-[120px] w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-glow-cyan focus:glow-cyan"
                    defaultValue={editingAgent.systemPrompt}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-muted-foreground">
                    Routing Policy
                  </label>
                  <div className="flex gap-2">
                    {(["primary", "fallback", "free-only"] as const).map((policy) => (
                      <button
                        key={policy}
                        type="button"
                        className={`rounded-lg px-4 py-2 text-sm font-medium border transition-all ${
                          editingAgent.routingPolicy === policy
                            ? "border-glow-cyan bg-primary/10 text-primary"
                            : "border-border bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {policy}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-muted-foreground">
                    Allowed Models
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["gpt-4o", "gemini-2.0-flash", "claude-sonnet-4-20250514", "grok-3", "deepseek-coder"].map(
                      (model) => {
                        const selected = editingAgent.allowedModels.includes(model)
                        return (
                          <button
                            key={model}
                            type="button"
                            className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                              selected
                                ? "border-glow-cyan bg-primary/10 text-primary"
                                : "border-border bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {model}
                          </button>
                        )
                      }
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border shrink-0">
              <GlowButton className="flex-1" onClick={() => setEditingAgent(null)}>
                Save Changes
              </GlowButton>
              <GlowButton variant="ghost" onClick={() => setEditingAgent(null)}>
                Cancel
              </GlowButton>
            </div>
          </GlowCard>
        </div>
      )}
    </div>
  )
}
