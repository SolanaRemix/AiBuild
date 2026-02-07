"use client"

import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockWebhooks } from "@/lib/mock-data"
import { Webhook, Plus, Power, PowerOff, Trash2 } from "lucide-react"
import { useState } from "react"
import type { WebhookConfig } from "@/lib/types"

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>(mockWebhooks)

  const toggleWebhook = (id: string) => {
    setWebhooks((prev) =>
      prev.map((wh) => (wh.id === id ? { ...wh, enabled: !wh.enabled } : wh))
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Webhooks</h1>
          <p className="text-sm text-muted-foreground">Configure event-driven integrations</p>
        </div>
        <GlowButton><Plus className="mr-2 h-4 w-4" />Add Webhook</GlowButton>
      </div>

      <div className="flex flex-col gap-4">
        {webhooks.map((wh) => (
          <GlowCard key={wh.id} variant={wh.enabled ? "cyan" : "default"} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Webhook className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-mono text-foreground">{wh.url}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Last triggered: {wh.lastTriggered ? new Date(wh.lastTriggered).toLocaleString() : "Never"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleWebhook(wh.id)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${wh.enabled ? "bg-success/10 text-success hover:bg-success/20" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                  aria-label={wh.enabled ? "Disable webhook" : "Enable webhook"}
                >
                  {wh.enabled ? <Power className="h-4 w-4" /> : <PowerOff className="h-4 w-4" />}
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted transition-colors" aria-label="Delete webhook">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {wh.events.map((event) => (
                <GlowBadge key={event} variant="cyan">{event}</GlowBadge>
              ))}
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
