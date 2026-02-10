"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton, GlowTabs } from "@/components/aura"
import { mockModels } from "@/lib/mock-data"
import { Brain, Toggle, Package } from "lucide-react"

type Tab = "models" | "integrations"

export default function PluginsPage() {
  const [tab, setTab] = useState<Tab>("models")
  const [models, setModels] = useState(mockModels)

  const toggleModel = (id: string) => {
    setModels(prev => 
      prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m)
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Plugins
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage AI models and system integrations
          </p>
        </div>
        <GlowTabs
          tabs={[
            { id: "models" as Tab, label: "AI Models" },
            { id: "integrations" as Tab, label: "Integrations" },
          ]}
          active={tab}
          onTabChange={setTab}
        />
      </div>

      {/* Models tab */}
      {tab === "models" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {models.map((model) => (
            <GlowCard key={model.id} className="p-6" data-testid={`plugin-${model.id}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{model.name}</h3>
                    <p className="text-xs text-muted-foreground font-mono">{model.modelId}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleModel(model.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    model.enabled ? "bg-primary" : "bg-muted"
                  }`}
                  data-testid={`toggle-${model.id}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      model.enabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {model.capabilities.map((cap) => (
                  <GlowBadge key={cap} size="sm" variant="default">
                    {cap}
                  </GlowBadge>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">
                  Cost: <span className="capitalize">{model.costTier}</span>
                </span>
                <GlowBadge variant={model.enabled ? "success" : "default"} size="sm">
                  {model.enabled ? "Active" : "Disabled"}
                </GlowBadge>
              </div>
            </GlowCard>
          ))}
        </div>
      )}

      {/* Integrations tab */}
      {tab === "integrations" && (
        <GlowCard className="p-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <Package className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Integration plugins will be available soon
            </p>
          </div>
        </GlowCard>
      )}
    </div>
  )
}
