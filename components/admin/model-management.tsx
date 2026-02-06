"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import type { ModelProviderConfig } from "@/lib/types"
import { Settings2, Power, PowerOff } from "lucide-react"

interface ModelManagementProps {
  initialModels: ModelProviderConfig[]
}

export function ModelManagement({ initialModels }: ModelManagementProps) {
  const [models, setModels] = useState(initialModels)

  const toggleModel = (id: string) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    )
  }

  const enabledCount = models.filter((m) => m.enabled).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Model Registry
          </h2>
          <p className="text-sm text-muted-foreground">
            {enabledCount} of {models.length} models enabled
          </p>
        </div>
        <GlowButton size="sm" variant="outline">
          <Settings2 className="mr-1.5 h-3.5 w-3.5" />
          Routing Policy
        </GlowButton>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {models.map((model) => (
          <GlowCard
            key={model.id}
            variant={model.enabled ? "cyan" : "default"}
            className="p-5"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {model.name}
                  </h3>
                  <code className="text-xs font-mono text-muted-foreground">
                    {model.modelId}
                  </code>
                </div>
                <button
                  onClick={() => toggleModel(model.id)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                    model.enabled
                      ? "bg-success/10 text-success hover:bg-success/20"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  aria-label={model.enabled ? "Disable model" : "Enable model"}
                >
                  {model.enabled ? (
                    <Power className="h-4 w-4" />
                  ) : (
                    <PowerOff className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {model.capabilities.map((cap) => (
                  <GlowBadge key={cap} variant="cyan">
                    {cap}
                  </GlowBadge>
                ))}
                <GlowBadge
                  variant={model.costTier === "free" ? "success" : "warning"}
                >
                  {model.costTier}
                </GlowBadge>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span
                  className={`h-2 w-2 rounded-full ${model.enabled ? "bg-success" : "bg-muted-foreground"}`}
                />
                {model.enabled ? "Active in routing" : "Disabled"}
              </div>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
