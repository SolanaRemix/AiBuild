"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton, GlowInput } from "@/components/aura"
import {
  Webhook,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  AlertCircle,
  Clock,
  RotateCcw,
} from "lucide-react"

interface WebhookConfig {
  id: string
  url: string
  events: string[]
  status: "active" | "disabled" | "failing"
  lastTriggered: string | null
  failCount: number
  createdAt: string
}

const mockWebhooks: WebhookConfig[] = [
  {
    id: "wh_1",
    url: "https://myapp.com/webhooks/aibuild",
    events: ["project.created", "deployment.ready", "deployment.failed"],
    status: "active",
    lastTriggered: "2026-02-05T14:22:00Z",
    failCount: 0,
    createdAt: "2026-01-20T10:00:00Z",
  },
  {
    id: "wh_2",
    url: "https://ci.example.com/hooks/builds",
    events: ["build.started", "build.completed"],
    status: "active",
    lastTriggered: "2026-02-04T16:30:00Z",
    failCount: 0,
    createdAt: "2026-02-01T09:00:00Z",
  },
  {
    id: "wh_3",
    url: "https://slack.example.com/incoming/webhook",
    events: ["deployment.ready", "deployment.failed"],
    status: "failing",
    lastTriggered: "2026-02-03T12:00:00Z",
    failCount: 3,
    createdAt: "2026-01-25T14:00:00Z",
  },
]

const availableEvents = [
  "project.created",
  "project.updated",
  "project.deleted",
  "build.started",
  "build.completed",
  "build.failed",
  "deployment.ready",
  "deployment.failed",
  "generation.completed",
]

export function WebhooksView() {
  const [creating, setCreating] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Webhooks
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure HTTP endpoints to receive real-time event notifications
          </p>
        </div>
        <GlowButton onClick={() => setCreating(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Webhook
        </GlowButton>
      </div>

      {/* Webhook list */}
      <div className="flex flex-col gap-4">
        {mockWebhooks.map((wh) => (
          <GlowCard
            key={wh.id}
            variant={wh.status === "failing" ? "default" : "cyan"}
            className="p-5"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      wh.status === "failing"
                        ? "bg-destructive/10"
                        : "bg-primary/10"
                    }`}
                  >
                    <Webhook
                      className={`h-5 w-5 ${
                        wh.status === "failing" ? "text-destructive" : "text-primary"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <code className="text-sm font-mono text-foreground block truncate">
                      {wh.url}
                    </code>
                    <span className="text-xs text-muted-foreground">
                      Created {new Date(wh.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <GlowBadge
                    variant={
                      wh.status === "active"
                        ? "success"
                        : wh.status === "failing"
                          ? "destructive"
                          : "default"
                    }
                  >
                    {wh.status}
                  </GlowBadge>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {wh.events.map((event) => (
                  <GlowBadge key={event}>{event}</GlowBadge>
                ))}
              </div>

              {wh.status === "failing" && (
                <div className="flex items-center gap-2 rounded-md bg-destructive/5 border border-destructive/20 px-3 py-2">
                  <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
                  <span className="text-xs text-destructive">
                    {wh.failCount} consecutive failures. Last attempt: {wh.lastTriggered ? new Date(wh.lastTriggered).toLocaleString() : "N/A"}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last triggered: {wh.lastTriggered ? new Date(wh.lastTriggered).toLocaleString() : "Never"}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Test webhook"
                    title="Send test event"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Edit webhook"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    className="rounded-md p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    aria-label="Delete webhook"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Create modal */}
      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 glass p-4">
          <GlowCard variant="cyan" className="w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                Add Webhook
              </h2>
              <button
                onClick={() => setCreating(false)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault()
                setCreating(false)
              }}
            >
              <GlowInput
                id="webhook-url"
                label="Endpoint URL"
                placeholder="https://your-app.com/webhooks"
                type="url"
              />

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-muted-foreground">
                  Events
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableEvents.map((event) => (
                    <button
                      key={event}
                      type="button"
                      className="rounded-lg px-3 py-1.5 text-xs font-medium border border-border bg-muted text-muted-foreground hover:text-foreground hover:border-glow-cyan transition-all"
                    >
                      {event}
                    </button>
                  ))}
                </div>
              </div>

              <GlowInput
                id="webhook-secret"
                label="Signing Secret (optional)"
                placeholder="whsec_..."
              />

              <div className="flex items-center gap-3 pt-2">
                <GlowButton type="submit" className="flex-1">
                  Create Webhook
                </GlowButton>
                <GlowButton variant="ghost" type="button" onClick={() => setCreating(false)}>
                  Cancel
                </GlowButton>
              </div>
            </form>
          </GlowCard>
        </div>
      )}
    </div>
  )
}
