"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton, GlowTabs } from "@/components/aura"
import { mockSdkKeys } from "@/lib/mock-data"
import { Key, Plus, Trash2, Copy, Check, Code2, Terminal, Webhook } from "lucide-react"

type Tab = "keys" | "docs" | "examples"

const exampleSnippets = [
  {
    title: "Create project from CLI",
    language: "bash",
    code: `curl -X POST https://api.aibuild.dev/v1/projects \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Build a SaaS dashboard", "target": "web"}'`,
  },
  {
    title: "Trigger deploy via SDK",
    language: "typescript",
    code: `import { AiBuild } from '@aibuild/sdk'

const client = new AiBuild({ apiKey: process.env.AIBUILD_KEY })

const deployment = await client.deployments.create({
  projectId: 'proj_1',
  target: 'web',
  provider: 'vercel',
})

console.log(deployment.url)`,
  },
  {
    title: "Query logs",
    language: "typescript",
    code: `const logs = await client.logs.list({
  projectId: 'proj_1',
  kind: 'generation',
  limit: 10,
})

logs.forEach(log => console.log(log.status, log.metadata))`,
  },
]

export default function SdkPage() {
  const [tab, setTab] = useState<Tab>("keys")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">SDK & API</h1>
          <p className="text-sm text-muted-foreground">Manage API keys and view SDK documentation</p>
        </div>
        <GlowTabs
          tabs={[
            { id: "keys" as Tab, label: "SDK Keys" },
            { id: "docs" as Tab, label: "Docs" },
            { id: "examples" as Tab, label: "Examples" },
          ]}
          active={tab}
          onTabChange={setTab}
        />
      </div>

      {/* SDK Keys */}
      {tab === "keys" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">API Keys</h2>
            <GlowButton size="sm"><Plus className="mr-1.5 h-3.5 w-3.5" />Create Key</GlowButton>
          </div>
          {mockSdkKeys.map((key) => (
            <GlowCard key={key.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{key.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-xs font-mono text-muted-foreground">{key.key}</code>
                      <button
                        onClick={() => handleCopy(key.key, key.id)}
                        className="rounded p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Copy key"
                      >
                        {copiedId === key.id ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                </div>
                <button className="rounded-md p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted transition-colors" aria-label="Revoke key">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {key.scopes.map((scope) => (
                  <GlowBadge key={scope}>{scope}</GlowBadge>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Last used: {key.lastUsed ? new Date(key.lastUsed).toLocaleString() : "Never"}
              </p>
            </GlowCard>
          ))}
        </div>
      )}

      {/* Docs */}
      {tab === "docs" && (
        <div className="flex flex-col gap-4">
          {[
            { title: "REST API", desc: "Full API reference for all endpoints", icon: Code2 },
            { title: "JS/TS SDK", desc: "Install @aibuild/sdk for type-safe access", icon: Terminal },
            { title: "Webhooks", desc: "Event-driven integrations for your workflows", icon: Webhook },
          ].map((doc) => {
            const Icon = doc.icon
            return (
              <GlowCard key={doc.title} className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{doc.title}</h3>
                    <p className="text-xs text-muted-foreground">{doc.desc}</p>
                  </div>
                  <GlowButton size="sm" variant="outline">View Docs</GlowButton>
                </div>
              </GlowCard>
            )
          })}
        </div>
      )}

      {/* Examples */}
      {tab === "examples" && (
        <div className="flex flex-col gap-4">
          {exampleSnippets.map((snippet) => (
            <GlowCard key={snippet.title} className="p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">{snippet.title}</h3>
                <div className="flex items-center gap-2">
                  <GlowBadge variant="cyan">{snippet.language}</GlowBadge>
                  <button
                    onClick={() => handleCopy(snippet.code, snippet.title)}
                    className="rounded p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Copy snippet"
                  >
                    {copiedId === snippet.title ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <pre className="rounded-lg border border-border bg-muted/50 p-4 overflow-auto text-xs font-mono text-foreground leading-relaxed">
                {snippet.code}
              </pre>
            </GlowCard>
          ))}
        </div>
      )}
    </div>
  )
}
