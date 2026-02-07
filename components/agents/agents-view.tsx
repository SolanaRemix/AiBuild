"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton, GlowInput } from "@/components/aura"
import {
  Bot,
  Plus,
  Pencil,
  Copy,
  Archive,
  X,
  Sparkles,
  MessageSquare,
  Code2,
  Search as SearchIcon,
} from "lucide-react"

interface Agent {
  id: string
  name: string
  baseModel: string
  role: string
  capabilities: string[]
  usage: number
  systemPrompt: string
  maxTokens: number
  status: "active" | "archived"
}

const mockAgents: Agent[] = [
  {
    id: "ag_1",
    name: "Code Assistant",
    baseModel: "gpt-4o",
    role: "Full-stack code generation and review",
    capabilities: ["codegen", "refactor", "analysis"],
    usage: 142,
    systemPrompt:
      "You are an expert full-stack developer. Generate clean, well-structured code with proper error handling.",
    maxTokens: 8192,
    status: "active",
  },
  {
    id: "ag_2",
    name: "UI Designer",
    baseModel: "claude-sonnet-4-20250514",
    role: "UI/UX code generation with Tailwind",
    capabilities: ["codegen"],
    usage: 87,
    systemPrompt:
      "You are a UI/UX expert. Create beautiful, accessible components using React and Tailwind CSS.",
    maxTokens: 4096,
    status: "active",
  },
  {
    id: "ag_3",
    name: "Code Reviewer",
    baseModel: "gemini-2.0-flash",
    role: "Code analysis and quality checks",
    capabilities: ["analysis", "refactor"],
    usage: 56,
    systemPrompt:
      "You analyze code for bugs, security issues, and best practices. Provide actionable suggestions.",
    maxTokens: 4096,
    status: "active",
  },
  {
    id: "ag_4",
    name: "API Builder",
    baseModel: "gpt-4o",
    role: "REST and GraphQL API scaffolding",
    capabilities: ["codegen"],
    usage: 23,
    systemPrompt:
      "You design and generate API endpoints with validation, error handling, and documentation.",
    maxTokens: 8192,
    status: "archived",
  },
]

const capabilityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  codegen: Code2,
  refactor: Sparkles,
  analysis: SearchIcon,
  chat: MessageSquare,
}

function AgentEditorModal({
  agent,
  onClose,
}: {
  agent: Agent | null
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = useState<"behavior" | "models" | "limits">("behavior")
  const isNew = !agent

  const tabs = [
    { id: "behavior" as const, label: "Behavior" },
    { id: "models" as const, label: "Models" },
    { id: "limits" as const, label: "Limits" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 glass p-4">
      <GlowCard variant="cyan" className="w-full max-w-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between mb-4 shrink-0">
          <h2 className="text-lg font-semibold text-foreground">
            {isNew ? "Create Agent" : `Edit: ${agent.name}`}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border mb-4 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto">
          {activeTab === "behavior" && (
            <div className="flex flex-col gap-4">
              <GlowInput
                id="agent-name"
                label="Agent Name"
                defaultValue={agent?.name || ""}
                placeholder="My Custom Agent"
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-muted-foreground">
                  System Prompt
                </label>
                <textarea
                  className="flex min-h-[120px] w-full rounded-lg border border-border bg-muted px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:outline-none focus:border-glow-cyan focus:glow-cyan"
                  defaultValue={agent?.systemPrompt || ""}
                  placeholder="Describe how this agent should behave..."
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-muted-foreground">
                  Capabilities
                </label>
                <div className="flex flex-wrap gap-2">
                  {["codegen", "refactor", "analysis", "chat"].map((cap) => {
                    const isSelected = agent?.capabilities.includes(cap) ?? false
                    return (
                      <button
                        key={cap}
                        className={`rounded-lg px-3 py-1.5 text-sm font-medium border transition-all ${
                          isSelected
                            ? "border-glow-cyan bg-primary/10 text-primary"
                            : "border-border bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cap}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === "models" && (
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Select which models this agent can access. The routing policy will
                choose the best available model at runtime.
              </p>
              <div className="flex flex-col gap-2">
                {["gpt-4o", "gemini-2.0-flash", "claude-sonnet-4-20250514", "grok-3", "deepseek-coder"].map(
                  (model) => {
                    const selected = model === agent?.baseModel
                    return (
                      <label
                        key={model}
                        className={`flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-all ${
                          selected
                            ? "border-glow-cyan bg-primary/5"
                            : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                            selected
                              ? "border-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {selected && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <code className="text-sm font-mono text-foreground">
                          {model}
                        </code>
                      </label>
                    )
                  }
                )}
              </div>
            </div>
          )}

          {activeTab === "limits" && (
            <div className="flex flex-col gap-4">
              <GlowInput
                id="max-tokens"
                label="Max Output Tokens"
                type="number"
                defaultValue={agent?.maxTokens || 4096}
              />
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-muted-foreground">
                  Cost Guardrail
                </label>
                <div className="flex flex-wrap gap-2">
                  {["No limit", "Free models only", "$5/day cap", "$50/month cap"].map(
                    (opt) => (
                      <button
                        key={opt}
                        className="rounded-lg px-3 py-1.5 text-sm font-medium border border-border bg-muted text-muted-foreground hover:text-foreground transition-all"
                      >
                        {opt}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border shrink-0">
          <GlowButton className="flex-1">
            {isNew ? "Create Agent" : "Save Changes"}
          </GlowButton>
          <GlowButton variant="ghost" onClick={onClose}>
            Cancel
          </GlowButton>
        </div>
      </GlowCard>
    </div>
  )
}

export function AgentsView() {
  const [editingAgent, setEditingAgent] = useState<Agent | null | "new">(null)
  const agents = mockAgents

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Agents
          </h1>
          <p className="text-sm text-muted-foreground">
            Personal AI agents built on CyberAi. Customize behavior, models, and limits.
          </p>
        </div>
        <GlowButton onClick={() => setEditingAgent("new")}>
          <Plus className="mr-2 h-4 w-4" />
          New Agent
        </GlowButton>
      </div>

      {/* Agent cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {agents.map((agent) => (
          <GlowCard
            key={agent.id}
            variant={agent.status === "active" ? "cyan" : "default"}
            className="p-5"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {agent.name}
                    </h3>
                    <code className="text-xs font-mono text-muted-foreground">
                      {agent.baseModel}
                    </code>
                  </div>
                </div>
                <GlowBadge
                  variant={agent.status === "active" ? "success" : "default"}
                >
                  {agent.status}
                </GlowBadge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {agent.role}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {agent.capabilities.map((cap) => {
                  const CapIcon = capabilityIcons[cap] || Code2
                  return (
                    <GlowBadge key={cap} variant="cyan">
                      <CapIcon className="mr-1 h-3 w-3" />
                      {cap}
                    </GlowBadge>
                  )
                })}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {agent.usage} generations
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setEditingAgent(agent)}
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
                    className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
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

      {/* Editor modal */}
      {editingAgent !== null && (
        <AgentEditorModal
          agent={editingAgent === "new" ? null : editingAgent}
          onClose={() => setEditingAgent(null)}
        />
      )}
    </div>
  )
}
