"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import {
  Server,
  Activity,
  Database,
  Cpu,
  HardDrive,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Clock,
} from "lucide-react"

interface HealthCheck {
  name: string
  status: "healthy" | "degraded" | "down"
  latency: string
  lastChecked: string
}

interface FeatureFlag {
  id: string
  name: string
  description: string
  enabled: boolean
  scope: "global" | "pro-only" | "internal"
}

interface EnvVar {
  key: string
  value: string
  source: "vercel" | "manual" | "integration"
  masked: boolean
}

const mockHealthChecks: HealthCheck[] = [
  { name: "API Server", status: "healthy", latency: "12ms", lastChecked: "2 min ago" },
  { name: "Database (Postgres)", status: "healthy", latency: "8ms", lastChecked: "2 min ago" },
  { name: "AI Gateway", status: "healthy", latency: "45ms", lastChecked: "2 min ago" },
  { name: "Redis Cache", status: "healthy", latency: "3ms", lastChecked: "2 min ago" },
  { name: "Deployment Pipeline", status: "degraded", latency: "890ms", lastChecked: "2 min ago" },
  { name: "Webhook Delivery", status: "healthy", latency: "22ms", lastChecked: "2 min ago" },
]

const mockFeatureFlags: FeatureFlag[] = [
  {
    id: "ff_1",
    name: "multi_target_deploy",
    description: "Allow deployment to multiple targets (web, mobile, desktop) simultaneously",
    enabled: true,
    scope: "global",
  },
  {
    id: "ff_2",
    name: "agent_marketplace",
    description: "Enable the community agent marketplace for browsing and installing custom agents",
    enabled: false,
    scope: "global",
  },
  {
    id: "ff_3",
    name: "advanced_analytics",
    description: "Show detailed analytics dashboard with cost breakdowns and usage heatmaps",
    enabled: true,
    scope: "pro-only",
  },
  {
    id: "ff_4",
    name: "code_review_agent",
    description: "Enable automated code review agent for generated projects",
    enabled: true,
    scope: "global",
  },
  {
    id: "ff_5",
    name: "experimental_models",
    description: "Access experimental AI models not yet in general availability",
    enabled: false,
    scope: "internal",
  },
  {
    id: "ff_6",
    name: "team_collaboration",
    description: "Enable real-time team collaboration features on workspace",
    enabled: false,
    scope: "pro-only",
  },
]

const mockEnvVars: EnvVar[] = [
  { key: "DATABASE_URL", value: "postgresql://***", source: "integration", masked: true },
  { key: "OPENAI_API_KEY", value: "sk-***", source: "manual", masked: true },
  { key: "GOOGLE_AI_KEY", value: "AIza***", source: "manual", masked: true },
  { key: "ANTHROPIC_API_KEY", value: "sk-ant-***", source: "manual", masked: true },
  { key: "VERCEL_TOKEN", value: "***", source: "vercel", masked: true },
  { key: "REDIS_URL", value: "redis://***", source: "integration", masked: true },
  { key: "STRIPE_SECRET_KEY", value: "sk_live_***", source: "manual", masked: true },
  { key: "WEBHOOK_SECRET", value: "whsec_***", source: "manual", masked: true },
]

const statusVariant: Record<string, "success" | "warning" | "destructive"> = {
  healthy: "success",
  degraded: "warning",
  down: "destructive",
}

const statusIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  healthy: CheckCircle2,
  degraded: AlertTriangle,
  down: AlertTriangle,
}

const scopeVariant: Record<string, "cyan" | "purple" | "warning"> = {
  global: "cyan",
  "pro-only": "purple",
  internal: "warning",
}

export function AdminSystemView() {
  const [flags, setFlags] = useState(mockFeatureFlags)
  const [refreshing, setRefreshing] = useState(false)

  const toggleFlag = (id: string) => {
    setFlags((prev) =>
      prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
    )
  }

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  const healthyCount = mockHealthChecks.filter((h) => h.status === "healthy").length
  const totalChecks = mockHealthChecks.length

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            System
          </h1>
          <p className="text-sm text-muted-foreground">
            Infrastructure health, feature flags, and environment configuration
          </p>
        </div>
        <GlowButton size="sm" variant="outline" onClick={handleRefresh}>
          <RefreshCw
            className={`mr-1.5 h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </GlowButton>
      </div>

      {/* Health checks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Infrastructure Health
          </h2>
          <GlowBadge variant={healthyCount === totalChecks ? "success" : "warning"}>
            {healthyCount}/{totalChecks} healthy
          </GlowBadge>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mockHealthChecks.map((check) => {
            const StatusIcon = statusIcon[check.status]
            return (
              <GlowCard
                key={check.name}
                variant={check.status === "healthy" ? "default" : "default"}
                className="p-4"
                hover={false}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <StatusIcon
                      className={`h-4 w-4 ${
                        check.status === "healthy"
                          ? "text-success"
                          : check.status === "degraded"
                            ? "text-warning"
                            : "text-destructive"
                      }`}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {check.name}
                    </span>
                  </div>
                  <GlowBadge variant={statusVariant[check.status]}>
                    {check.status}
                  </GlowBadge>
                </div>
                <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Cpu className="h-3 w-3" />
                    {check.latency}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {check.lastChecked}
                  </span>
                </div>
              </GlowCard>
            )
          })}
        </div>
      </section>

      {/* Feature flags */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Server className="h-5 w-5 text-primary" />
            Feature Flags
          </h2>
          <GlowBadge variant="cyan">
            {flags.filter((f) => f.enabled).length} enabled
          </GlowBadge>
        </div>
        <div className="flex flex-col gap-3">
          {flags.map((flag) => (
            <GlowCard key={flag.id} className="p-4" hover={false}>
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono font-medium text-foreground">
                      {flag.name}
                    </code>
                    <GlowBadge variant={scopeVariant[flag.scope]}>
                      {flag.scope}
                    </GlowBadge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                    {flag.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleFlag(flag.id)}
                  className="ml-4 shrink-0 transition-colors"
                  aria-label={`Toggle ${flag.name}`}
                >
                  {flag.enabled ? (
                    <ToggleRight className="h-7 w-7 text-success" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-muted-foreground" />
                  )}
                </button>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* Environment variables */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Environment Variables
          </h2>
          <GlowButton size="sm" variant="outline">
            Add Variable
          </GlowButton>
        </div>
        <GlowCard className="p-0 overflow-hidden" hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Key
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Value
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockEnvVars.map((envVar) => (
                  <tr
                    key={envVar.key}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <code className="text-sm font-mono text-foreground">
                        {envVar.key}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-sm font-mono text-muted-foreground">
                        {envVar.masked ? envVar.value : envVar.value}
                      </code>
                    </td>
                    <td className="px-4 py-3">
                      <GlowBadge
                        variant={
                          envVar.source === "integration"
                            ? "cyan"
                            : envVar.source === "vercel"
                              ? "purple"
                              : "default"
                        }
                      >
                        {envVar.source}
                      </GlowBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlowCard>
      </section>

      {/* System info */}
      <section>
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-4">
          <HardDrive className="h-5 w-5 text-primary" />
          System Info
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Runtime", value: "Next.js 16.1.6" },
            { label: "Node.js", value: "v22.4.0" },
            { label: "Region", value: "iad1 (US East)" },
            { label: "Uptime", value: "14d 7h 32m" },
          ].map((item) => (
            <GlowCard key={item.label} className="p-4" hover={false}>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {item.value}
              </p>
            </GlowCard>
          ))}
        </div>
      </section>
    </div>
  )
}
