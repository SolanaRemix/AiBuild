"use client"

import { useState } from "react"
import { GlowCard, GlowBadge } from "@/components/aura"
import { mockFeatureFlags } from "@/lib/mock-data"
import type { FeatureFlag } from "@/lib/types"
import { Flag } from "lucide-react"

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlag[]>(mockFeatureFlags)

  const toggleFlag = (id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Feature Flags</h1>
        <p className="text-sm text-muted-foreground">Toggle experimental features across the platform</p>
      </div>

      <div className="flex flex-col gap-3">
        {flags.map((flag) => (
          <GlowCard key={flag.id} variant={flag.enabled ? "cyan" : "default"} className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Flag className={`h-5 w-5 ${flag.enabled ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-foreground">{flag.name}</h3>
                    <GlowBadge variant={flag.enabled ? "success" : "default"}>
                      {flag.enabled ? "Enabled" : "Disabled"}
                    </GlowBadge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{flag.description}</p>
                </div>
              </div>
              <button
                onClick={() => toggleFlag(flag.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${flag.enabled ? "bg-primary" : "bg-muted"}`}
                role="switch"
                aria-checked={flag.enabled}
                aria-label={`Toggle ${flag.name}`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-foreground shadow-lg transition-transform duration-200 ${flag.enabled ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
