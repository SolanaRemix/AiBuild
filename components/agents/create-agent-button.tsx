"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function CreateAgentButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    description: "",
    model: "openai/gpt-4o",
    template: "general",
    systemPrompt: "You are a helpful AI assistant.",
    temperature: "0.7",
    maxTokens: "4096",
  })

  async function handleCreate() {
    if (!form.name.trim()) return
    setLoading(true)
    try {
      await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tools: [],
          memoryEnabled: false,
          temperature: parseFloat(form.temperature),
          maxTokens: parseInt(form.maxTokens, 10),
          tags: [form.template],
        }),
      })
      setOpen(false)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 glow-blue"
      >
        <Plus className="w-4 h-4" />
        New Agent
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-[hsl(var(--fx-surface))] border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-mono text-foreground">Create New Agent</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-mono text-muted-foreground">Name</Label>
                <Input
                  placeholder="MyAgent"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="font-mono text-sm bg-[hsl(var(--fx-rail))]"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-mono text-muted-foreground">Template</Label>
                <Select
                  value={form.template}
                  onValueChange={(v) => setForm((f) => ({ ...f, template: v }))}
                >
                  <SelectTrigger className="font-mono text-sm bg-[hsl(var(--fx-rail))]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[hsl(var(--fx-surface))] border-border font-mono text-sm">
                    {["general", "research", "coding", "automation", "terminal", "browser"].map(
                      (t) => (
                        <SelectItem key={t} value={t} className="capitalize">
                          {t}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-mono text-muted-foreground">Description</Label>
              <Input
                placeholder="What does this agent do?"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="font-mono text-sm bg-[hsl(var(--fx-rail))]"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-mono text-muted-foreground">Model</Label>
              <Select
                value={form.model}
                onValueChange={(v) => setForm((f) => ({ ...f, model: v }))}
              >
                <SelectTrigger className="font-mono text-sm bg-[hsl(var(--fx-rail))]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[hsl(var(--fx-surface))] border-border font-mono text-sm">
                  {[
                    "openai/gpt-4o",
                    "openai/gpt-4o-mini",
                    "anthropic/claude-3-5-sonnet",
                    "anthropic/claude-3-haiku",
                    "groq/llama-3.3-70b-versatile",
                  ].map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-mono text-muted-foreground">System Prompt</Label>
              <Textarea
                placeholder="You are a helpful AI assistant..."
                value={form.systemPrompt}
                onChange={(e) => setForm((f) => ({ ...f, systemPrompt: e.target.value }))}
                className="font-mono text-sm bg-[hsl(var(--fx-rail))] resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-mono text-muted-foreground">
                  Temperature (0–1)
                </Label>
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
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="font-mono border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={!form.name.trim() || loading}
              className="font-mono bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Creating..." : "Create Agent"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
