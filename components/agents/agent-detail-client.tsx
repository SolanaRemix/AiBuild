"use client"

import type { Agent, Tool } from "@/types"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AgentStatusBadge } from "@/components/ui/status-badge"
import { cn, formatRelativeTime } from "@/lib/utils"
import {
  Play,
  Square,
  Pause,
  Save,
  Trash2,
  Wrench,
  Brain,
  Terminal,
  BarChart2,
  Settings2,
} from "lucide-react"

type TabId = "overview" | "config" | "tools" | "runs"

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: BarChart2 },
  { id: "config", label: "Config", icon: Settings2 },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "runs", label: "Run History", icon: Terminal },
]

const MODELS = [
  "openai/gpt-4o",
  "openai/gpt-4o-mini",
  "anthropic/claude-3-5-sonnet",
  "anthropic/claude-3-haiku",
  "groq/llama-3.3-70b-versatile",
]

interface AgentDetailClientProps {
  agent: Agent
  allTools: Tool[]
}

export function AgentDetailClient({ agent: initial, allTools }: AgentDetailClientProps) {
  const [agent, setAgent] = useState(initial)
  const [tab, setTab] = useState<TabId>("overview")
  const [saving, setSaving] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const router = useRouter()

  const [form, setForm] = useState({
    name: agent.name,
    description: agent.description,
    model: agent.model,
    systemPrompt: agent.systemPrompt,
    temperature: agent.temperature.toString(),
    maxTokens: agent.maxTokens.toString(),
    memoryEnabled: agent.memoryEnabled,
    tools: agent.tools,
  })

  async function handleStatusChange(status: "running" | "paused" | "idle") {
    setActionLoading(true)
    try {
      const res = await fetch(`/api/agents/${agent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (res.ok) {
        const data = await res.json()
        setAgent(data.agent)
      }
    } finally {
      setActionLoading(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch(`/api/agents/${agent.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          temperature: parseFloat(form.temperature),
          maxTokens: parseInt(form.maxTokens, 10),
        }),
      })
      if (res.ok) {
        const data = await res.json()
        setAgent(data.agent)
        router.refresh()
      }
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm(`Delete agent "${agent.name}"? This cannot be undone.`)) return
    await fetch(`/api/agents/${agent.id}`, { method: "DELETE" })
    router.push("/agents")
  }

  function toggleTool(toolName: string) {
    setForm((f) => ({
      ...f,
      tools: f.tools.includes(toolName)
        ? f.tools.filter((t) => t !== toolName)
        : [...f.tools, toolName],
    }))
  }

  return (
    <div className="space-y-6">
      {/* Action bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button
          size="sm"
          disabled={agent.status === "running" || actionLoading}
          onClick={() => handleStatusChange("running")}
          className="gap-1.5 bg-[hsl(var(--fx-glow-green))]/20 border border-[hsl(var(--fx-glow-green))]/30 text-[hsl(var(--fx-glow-green))] hover:bg-[hsl(var(--fx-glow-green))]/30 font-mono"
          variant="ghost"
        >
          <Play className="w-3.5 h-3.5" />
          Start
        </Button>
        <Button
          size="sm"
          disabled={agent.status !== "running" || actionLoading}
          onClick={() => handleStatusChange("paused")}
          className="gap-1.5 font-mono"
          variant="outline"
        >
          <Pause className="w-3.5 h-3.5" />
          Pause
        </Button>
        <Button
          size="sm"
          disabled={agent.status === "idle" || actionLoading}
          onClick={() => handleStatusChange("idle")}
          className="gap-1.5 font-mono"
          variant="outline"
        >
          <Square className="w-3.5 h-3.5" />
          Stop
        </Button>
        <div className="flex-1" />
        <Button
          size="sm"
          variant="ghost"
          onClick={handleDelete}
          className="gap-1.5 text-destructive hover:bg-destructive/10 font-mono ml-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </Button>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-border pb-0">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 text-sm font-mono border-b-2 transition-colors",
              tab === id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stats panel */}
          <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] p-5 space-y-4">
            <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">
              Agent Stats
            </h3>
            {[
              { label: "Status", value: <AgentStatusBadge status={agent.status} /> },
              { label: "Template", value: <span className="font-mono text-sm capitalize text-foreground">{agent.template}</span> },
              { label: "Model", value: <span className="font-mono text-xs text-primary">{agent.model}</span> },
              { label: "Total Runs", value: <span className="font-mono text-sm text-foreground">{agent.runCount}</span> },
              { label: "Memory", value: <span className={cn("font-mono text-xs", agent.memoryEnabled ? "text-[hsl(var(--fx-glow-green))]" : "text-muted-foreground")}>{agent.memoryEnabled ? "Enabled" : "Disabled"}</span> },
              { label: "Temperature", value: <span className="font-mono text-sm text-foreground">{agent.temperature}</span> },
              { label: "Max Tokens", value: <span className="font-mono text-sm text-foreground">{agent.maxTokens.toLocaleString()}</span> },
              { label: "Last Run", value: <span className="font-mono text-xs text-muted-foreground">{agent.lastRunAt ? formatRelativeTime(agent.lastRunAt) : "Never"}</span> },
              { label: "Created", value: <span className="font-mono text-xs text-muted-foreground">{formatRelativeTime(agent.createdAt)}</span> },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between gap-4">
                <span className="text-xs text-muted-foreground font-mono">{label}</span>
                {value}
              </div>
            ))}
          </div>

          {/* System prompt preview */}
          <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] p-5 space-y-3">
            <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest">
              System Prompt
            </h3>
            <pre className="text-xs font-mono text-muted-foreground bg-[hsl(var(--fx-rail))] rounded-lg p-4 whitespace-pre-wrap leading-relaxed border border-border">
              {agent.systemPrompt}
            </pre>

            <h3 className="text-xs font-mono font-semibold text-muted-foreground uppercase tracking-widest pt-2">
              Tags
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {agent.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono bg-muted/30 border border-border rounded px-2 py-0.5 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Config */}
      {tab === "config" && (
        <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] p-6 space-y-5 max-w-2xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono text-muted-foreground">Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="font-mono text-sm bg-[hsl(var(--fx-rail))]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-mono text-muted-foreground">Model</Label>
              <Select
                value={form.model}
                onValueChange={(v) => setForm((f) => ({ ...f, model: v as Agent["model"] }))}
              >
                <SelectTrigger className="font-mono text-sm bg-[hsl(var(--fx-rail))]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(var(--fx-surface))] border-border font-mono text-sm">
                  {MODELS.map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono text-muted-foreground">Description</Label>
            <Input
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              className="font-mono text-sm bg-[hsl(var(--fx-rail))]"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs font-mono text-muted-foreground">System Prompt</Label>
            <Textarea
              value={form.systemPrompt}
              onChange={(e) => setForm((f) => ({ ...f, systemPrompt: e.target.value }))}
              className="font-mono text-sm bg-[hsl(var(--fx-rail))] resize-none"
              rows={5}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-mono text-muted-foreground">Temperature (0–1)</Label>
              <Input
                type="number"
                min={0}
                max={1}
                step={0.1}
                value={form.temperature}
                onChange={(e) => setForm((f) => ({ ...f, temperature: e.target.value }))}
                className="font-mono text-sm bg-[hsl(var(--fx-rail))]"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-mono text-muted-foreground">Max Tokens</Label>
              <Input
                type="number"
                value={form.maxTokens}
                onChange={(e) => setForm((f) => ({ ...f, maxTokens: e.target.value }))}
                className="font-mono text-sm bg-[hsl(var(--fx-rail))]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-border">
            <div>
              <p className="text-sm font-mono text-foreground">Memory Enabled</p>
              <p className="text-xs text-muted-foreground">Allow agent to read/write memory layer</p>
            </div>
            <Switch
              checked={form.memoryEnabled}
              onCheckedChange={(v) => setForm((f) => ({ ...f, memoryEnabled: v }))}
            />
          </div>

          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-1.5 bg-primary text-primary-foreground font-mono"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      )}

      {/* Tools */}
      {tab === "tools" && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground font-mono">
            Select which tools this agent has access to. Changes are saved with the Config tab.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {allTools.map((tool) => {
              const enabled = form.tools.includes(tool.name)
              return (
                <button
                  key={tool.id}
                  onClick={() => toggleTool(tool.name)}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-150",
                    enabled
                      ? "border-primary/30 bg-primary/5 glow-blue"
                      : "border-border bg-[hsl(var(--fx-surface))] hover:border-primary/20"
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0",
                      enabled ? "bg-primary/10 border-primary/20 text-primary" : "bg-muted/20 border-border text-muted-foreground"
                    )}
                  >
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-mono text-foreground truncate">{tool.name}</p>
                    <p className="text-[10px] text-muted-foreground capitalize truncate">{tool.category}</p>
                  </div>
                  <div
                    className={cn(
                      "ml-auto w-4 h-4 rounded-full border flex-shrink-0",
                      enabled ? "bg-primary border-primary" : "border-border"
                    )}
                  />
                </button>
              )
            })}
          </div>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="gap-1.5 bg-primary text-primary-foreground font-mono mt-2"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Tool Selection"}
          </Button>
        </div>
      )}

      {/* Runs */}
      {tab === "runs" && (
        <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold font-mono text-foreground">Run History</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{agent.runCount} total runs recorded</p>
          </div>
          <div className="p-8 text-center text-muted-foreground font-mono text-sm">
            <Brain className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p>Run history persists in the agent memory layer.</p>
            <p className="text-xs mt-1 text-muted-foreground/60">
              Connect a database integration for full run storage.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
