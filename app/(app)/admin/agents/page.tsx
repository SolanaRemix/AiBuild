"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockGlobalAgents } from "@/lib/mock-data"
import type { GlobalAgent } from "@/lib/types"
import { Blocks, Power, PowerOff, Settings2 } from "lucide-react"

const policyVariant = {
  primary: "cyan" as const,
  fallback: "purple" as const,
  "free-only": "success" as const,
}

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<GlobalAgent[]>(mockGlobalAgents)

  const toggleAgent = (id: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Global Agents</h1>
          <p className="text-sm text-muted-foreground">System-level AI agents and routing policies</p>
        </div>
        <GlowButton size="sm" variant="outline">
          <Settings2 className="mr-1.5 h-3.5 w-3.5" />
          Routing Config
        </GlowButton>
      </div>

      <div className="flex flex-col gap-4">
        {agents.map((agent) => (
          <GlowCard key={agent.id} variant={agent.enabled ? "cyan" : "default"} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Blocks className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{agent.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{agent.systemPrompt}</p>
                </div>
              </div>
              <button
                onClick={() => toggleAgent(agent.id)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${agent.enabled ? "bg-success/10 text-success hover:bg-success/20" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                aria-label={agent.enabled ? "Disable agent" : "Enable agent"}
              >
                {agent.enabled ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
              </button>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <GlowBadge variant={policyVariant[agent.routingPolicy]}>{agent.routingPolicy}</GlowBadge>
              <div className="flex flex-wrap gap-1.5">
                {agent.allowedModels.map((model) => (
                  <GlowBadge key={model}>{model}</GlowBadge>
                ))}
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
