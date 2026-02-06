"use client"

import { useState } from "react"
import { GlowButton, GlowInput, GlowCard } from "@/components/aura"
import { Plus, X, Globe, Smartphone, Monitor } from "lucide-react"

const targets = [
  { value: "web", label: "Web", icon: Globe },
  { value: "mobile", label: "Mobile", icon: Smartphone },
  { value: "desktop", label: "Desktop", icon: Monitor },
] as const

const templates = [
  { value: "landing", label: "Landing Page" },
  { value: "dashboard", label: "Dashboard" },
  { value: "saas", label: "SaaS App" },
  { value: "app", label: "Application" },
  { value: "custom", label: "Custom" },
] as const

export function NewProjectDialog() {
  const [open, setOpen] = useState(false)
  const [target, setTarget] = useState<string>("web")
  const [template, setTemplate] = useState<string>("app")

  if (!open) {
    return (
      <GlowButton onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        New Project
      </GlowButton>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 glass p-4">
      <GlowCard variant="cyan" className="w-full max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            New Project
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          className="flex flex-col gap-5"
          onSubmit={(e) => {
            e.preventDefault()
            setOpen(false)
          }}
        >
          <GlowInput
            id="prompt"
            label="Describe your project"
            placeholder="Build a minimal multi-platform AI wallet app..."
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-muted-foreground">
              Target Platform
            </label>
            <div className="flex gap-2">
              {targets.map((t) => {
                const Icon = t.icon
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setTarget(t.value)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium border transition-all ${
                      target === t.value
                        ? "border-glow-cyan bg-primary/10 text-primary"
                        : "border-border bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {t.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-muted-foreground">
              Template
            </label>
            <div className="flex flex-wrap gap-2">
              {templates.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setTemplate(t.value)}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium border transition-all ${
                    template === t.value
                      ? "border-glow-cyan bg-primary/10 text-primary"
                      : "border-border bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <GlowButton type="submit" className="flex-1">
              Generate Project
            </GlowButton>
            <GlowButton
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </GlowButton>
          </div>
        </form>
      </GlowCard>
    </div>
  )
}
