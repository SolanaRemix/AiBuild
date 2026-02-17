"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton, GlowInput } from "@/components/aura"
import {
  Key,
  Copy,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Check,
  Code2,
  Terminal,
  FileText,
} from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  scopes: string[]
  lastUsed: string
  createdAt: string
}

const mockKeys: ApiKey[] = [
  {
    id: "key_1",
    name: "Production Key",
    key: "sk_live_abc123...x9f8",
    scopes: ["projects:read", "projects:write", "deployments:write"],
    lastUsed: "2026-02-05T12:00:00Z",
    createdAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "key_2",
    name: "CI/CD Key",
    key: "sk_live_def456...k2m7",
    scopes: ["deployments:write", "logs:read"],
    lastUsed: "2026-02-04T08:30:00Z",
    createdAt: "2026-02-01T09:00:00Z",
  },
]

type DocTab = "rest" | "sdk" | "examples"

const codeExamples = {
  createProject: `// Create a project via API
const response = await fetch('https://api.aibuild.app/v1/projects', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    prompt: 'Build a SaaS landing page with pricing',
    templateType: 'landing',
    primaryTarget: 'web',
  }),
});

const { projectId, slug, status } = await response.json();`,
  triggerDeploy: `// Trigger a deployment
const response = await fetch(
  'https://api.aibuild.app/v1/projects/proj_123/deploy',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer sk_live_...',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ target: 'web' }),
  }
);

const { status, deploymentId } = await response.json();`,
  queryLogs: `// Query build logs
const response = await fetch(
  'https://api.aibuild.app/v1/logs?project=proj_123&type=build',
  {
    headers: {
      'Authorization': 'Bearer sk_live_...',
    },
  }
);

const { logs } = await response.json();`,
  curlExample: `# Create a project via cURL
curl -X POST https://api.aibuild.app/v1/projects \\
  -H "Authorization: Bearer sk_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Build a task management app",
    "templateType": "app",
    "primaryTarget": "web"
  }'`,
}

export function SdkApiView() {
  const [docTab, setDocTab] = useState<DocTab>("rest")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            SDK & API
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage API keys and access documentation for programmatic access
          </p>
        </div>
      </div>

      {/* API Keys */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">API Keys</h2>
          <GlowButton size="sm">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Create Key
          </GlowButton>
        </div>

        {mockKeys.map((apiKey) => (
          <GlowCard key={apiKey.id} className="p-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Key className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {apiKey.name}
                    </h3>
                    <code className="text-xs font-mono text-muted-foreground">
                      {apiKey.key}
                    </code>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopy(apiKey.key, apiKey.id)}
                    className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    aria-label="Copy key"
                  >
                    {copiedId === apiKey.id ? (
                      <Check className="h-3.5 w-3.5 text-success" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                  <button
                    className="rounded-md p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    aria-label="Revoke key"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {apiKey.scopes.map((scope) => (
                  <GlowBadge key={scope}>{scope}</GlowBadge>
                ))}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                <span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </GlowCard>
        ))}
      </div>

      {/* Documentation */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Documentation</h2>

        <div className="flex border-b border-border">
          {[
            { id: "rest" as const, label: "REST API", icon: Globe },
            { id: "sdk" as const, label: "JS/TS SDK", icon: Code2 },
            { id: "examples" as const, label: "Examples", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setDocTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  docTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {docTab === "rest" && (
          <div className="flex flex-col gap-4">
            <GlowCard className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Base URL
              </h3>
              <code className="block rounded-md bg-muted px-4 py-2 text-sm font-mono text-primary">
                https://api.aibuild.app/v1
              </code>
            </GlowCard>

            <GlowCard className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Endpoints
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { method: "POST", path: "/projects", desc: "Create a new project" },
                  { method: "GET", path: "/projects", desc: "List all projects" },
                  { method: "GET", path: "/projects/:id", desc: "Get project details" },
                  { method: "POST", path: "/projects/:id/deploy", desc: "Trigger deployment" },
                  { method: "GET", path: "/projects/:id/files", desc: "Get project files" },
                  { method: "GET", path: "/logs", desc: "Query logs" },
                  { method: "GET", path: "/models", desc: "List available models" },
                ].map((endpoint) => (
                  <div
                    key={endpoint.path + endpoint.method}
                    className="flex items-center gap-3 rounded-md border border-border px-4 py-2.5"
                  >
                    <GlowBadge
                      variant={endpoint.method === "POST" ? "cyan" : "default"}
                    >
                      {endpoint.method}
                    </GlowBadge>
                    <code className="text-sm font-mono text-foreground">
                      {endpoint.path}
                    </code>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {endpoint.desc}
                    </span>
                  </div>
                ))}
              </div>
            </GlowCard>
          </div>
        )}

        {docTab === "sdk" && (
          <div className="flex flex-col gap-4">
            <GlowCard className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Installation
              </h3>
              <div className="rounded-md bg-muted p-4">
                <code className="text-sm font-mono text-foreground">
                  npm install @aibuild/sdk
                </code>
              </div>
            </GlowCard>

            <GlowCard className="p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Quick Start
              </h3>
              <pre className="rounded-md bg-muted p-4 text-sm font-mono text-foreground overflow-auto leading-relaxed">
{`import { AiBuild } from '@aibuild/sdk';

const client = new AiBuild({
  apiKey: process.env.AIBUILD_API_KEY,
});

// Create a project
const project = await client.projects.create({
  prompt: 'Build a SaaS landing page',
  templateType: 'landing',
  target: 'web',
});

// Deploy it
const deployment = await client.deploy(project.id, {
  target: 'web',
});`}
              </pre>
            </GlowCard>
          </div>
        )}

        {docTab === "examples" && (
          <div className="flex flex-col gap-4">
            {[
              { title: "Create Project via API", code: codeExamples.createProject, id: "create" },
              { title: "Trigger Deploy", code: codeExamples.triggerDeploy, id: "deploy" },
              { title: "Query Logs", code: codeExamples.queryLogs, id: "logs" },
              { title: "cURL Example", code: codeExamples.curlExample, id: "curl" },
            ].map((example) => (
              <GlowCard key={example.id} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    {example.title}
                  </h3>
                  <button
                    onClick={() => handleCopy(example.code, example.id)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {copiedId === example.id ? (
                      <><Check className="h-3 w-3 text-success" /> Copied</>
                    ) : (
                      <><Copy className="h-3 w-3" /> Copy</>
                    )}
                  </button>
                </div>
                <pre className="rounded-md bg-muted p-4 text-xs font-mono text-foreground overflow-auto leading-relaxed">
                  {example.code}
                </pre>
              </GlowCard>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function Globe({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  )
}
