"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Eye, EyeOff, Plus, Trash2, Copy, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ApiKeyRow {
  id: string
  name: string
  prefix: string
  createdAt: string
}

const INITIAL_KEYS: ApiKeyRow[] = [
  { id: "key_01", name: "Production", prefix: "aios_prod_****", createdAt: "2026-01-01" },
  { id: "key_02", name: "Development", prefix: "aios_dev_*****", createdAt: "2026-02-15" },
]

const SECTIONS = [
  { id: "api-keys", label: "API Keys" },
  { id: "models", label: "Model Providers" },
  { id: "security", label: "Security" },
  { id: "system", label: "System" },
]

export function SettingsClient() {
  const [activeSection, setActiveSection] = useState("api-keys")
  const [apiKeys, setApiKeys] = useState<ApiKeyRow[]>(INITIAL_KEYS)
  const [showKey, setShowKey] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [newKeyName, setNewKeyName] = useState("")

  const [modelSettings, setModelSettings] = useState({
    openaiKey: "",
    anthropicKey: "",
    groqKey: "",
    defaultModel: "openai/gpt-4o",
  })

  const [systemSettings, setSystemSettings] = useState({
    loggingEnabled: true,
    debugMode: false,
    maxAgents: "20",
    memoryTTL: "86400",
    sandboxAll: true,
  })

  function handleCopy(text: string, id: string) {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  function handleDeleteKey(id: string) {
    setApiKeys((ks) => ks.filter((k) => k.id !== id))
  }

  function handleAddKey() {
    if (!newKeyName.trim()) return
    setApiKeys((ks) => [
      ...ks,
      {
        id: `key_${Date.now()}`,
        name: newKeyName.trim(),
        prefix: `aios_${newKeyName.toLowerCase().replace(/\s/g, "_")}_****`,
        createdAt: new Date().toISOString().split("T")[0],
      },
    ])
    setNewKeyName("")
  }

  return (
    <div className="flex gap-6">
      {/* Sidebar nav */}
      <nav className="w-48 space-y-1 shrink-0">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-lg text-sm font-mono transition-colors",
              activeSection === s.id
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--fx-surface-elevated))]"
            )}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-6">
        {/* API Keys */}
        {activeSection === "api-keys" && (
          <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold font-mono text-foreground">API Keys</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage AiOS operator API keys
              </p>
            </div>
            <div className="divide-y divide-border">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div>
                    <p className="text-sm font-mono text-foreground">{key.name}</p>
                    <p className="text-xs font-mono text-muted-foreground mt-0.5">
                      {showKey === key.id ? "aios_live_sk_examplekey1234567890" : key.prefix}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-muted-foreground">{key.createdAt}</span>
                    <button
                      onClick={() => setShowKey(showKey === key.id ? null : key.id)}
                      className="w-8 h-8 flex items-center justify-center rounded text-muted-foreground hover:text-foreground"
                    >
                      {showKey === key.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleCopy(key.prefix, key.id)}
                      className="w-8 h-8 flex items-center justify-center rounded text-muted-foreground hover:text-primary"
                    >
                      {copied === key.id ? (
                        <CheckCircle className="w-3.5 h-3.5 text-[hsl(var(--fx-glow-green))]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteKey(key.id)}
                      className="w-8 h-8 flex items-center justify-center rounded text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-3 px-5 py-4 border-t border-border">
              <Input
                placeholder="Key name (e.g. Staging)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="h-8 text-sm font-mono bg-[hsl(var(--fx-rail))] max-w-xs"
                onKeyDown={(e) => e.key === "Enter" && handleAddKey()}
              />
              <Button
                size="sm"
                onClick={handleAddKey}
                disabled={!newKeyName.trim()}
                className="gap-1.5 font-mono bg-primary text-primary-foreground"
              >
                <Plus className="w-3.5 h-3.5" />
                Generate Key
              </Button>
            </div>
          </div>
        )}

        {/* Model Providers */}
        {activeSection === "models" && (
          <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold font-mono text-foreground">Model Providers</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Configure API keys for model providers
              </p>
            </div>
            <div className="p-5 space-y-4">
              {[
                { id: "openaiKey", label: "OpenAI API Key", placeholder: "sk-..." },
                { id: "anthropicKey", label: "Anthropic API Key", placeholder: "sk-ant-..." },
                { id: "groqKey", label: "Groq API Key", placeholder: "gsk_..." },
              ].map(({ id, label, placeholder }) => (
                <div key={id} className="space-y-1.5">
                  <Label className="text-xs font-mono text-muted-foreground">{label}</Label>
                  <Input
                    type="password"
                    placeholder={placeholder}
                    value={(modelSettings as any)[id]}
                    onChange={(e) =>
                      setModelSettings((s) => ({ ...s, [id]: e.target.value }))
                    }
                    className="font-mono text-sm bg-[hsl(var(--fx-rail))] max-w-md"
                  />
                </div>
              ))}
              <Button className="font-mono bg-primary text-primary-foreground mt-2">
                Save Keys
              </Button>
            </div>
          </div>
        )}

        {/* Security */}
        {activeSection === "security" && (
          <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold font-mono text-foreground">Security</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { id: "sandboxAll", label: "Sandbox all tool executions", desc: "Forces all tool calls through a secure execution sandbox" },
              ].map(({ id, label, desc }) => (
                <div key={id} className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-mono text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                  <Switch
                    checked={(systemSettings as any)[id]}
                    onCheckedChange={(v) => setSystemSettings((s) => ({ ...s, [id]: v }))}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System */}
        {activeSection === "system" && (
          <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h2 className="text-sm font-semibold font-mono text-foreground">System</h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { id: "loggingEnabled", label: "Enable system logging" },
                { id: "debugMode", label: "Debug mode" },
              ].map(({ id, label }) => (
                <div key={id} className="flex items-center justify-between">
                  <p className="text-sm font-mono text-foreground">{label}</p>
                  <Switch
                    checked={(systemSettings as any)[id]}
                    onCheckedChange={(v) => setSystemSettings((s) => ({ ...s, [id]: v }))}
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { id: "maxAgents", label: "Max concurrent agents" },
                  { id: "memoryTTL", label: "Memory TTL (seconds)" },
                ].map(({ id, label }) => (
                  <div key={id} className="space-y-1.5">
                    <Label className="text-xs font-mono text-muted-foreground">{label}</Label>
                    <Input
                      type="number"
                      value={(systemSettings as any)[id]}
                      onChange={(e) => setSystemSettings((s) => ({ ...s, [id]: e.target.value }))}
                      className="font-mono text-sm bg-[hsl(var(--fx-rail))]"
                    />
                  </div>
                ))}
              </div>
              <Button className="font-mono bg-primary text-primary-foreground mt-2">
                Save System Settings
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
