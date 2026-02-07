import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { Server, Database, Webhook, Link2, ExternalLink, Activity } from "lucide-react"

export default function AdminSystemPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">System</h1>
        <p className="text-sm text-muted-foreground">Environment configuration, integrations, and worker status</p>
      </div>

      {/* Vercel integration */}
      <GlowCard variant="cyan" className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <svg viewBox="0 0 76 65" className="h-6 w-6 text-primary fill-current"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" /></svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Vercel Integration</h2>
              <p className="text-sm text-muted-foreground">Connected to project prj_pRbNxNm94uzYteAS2WaStynVHFHt</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GlowBadge variant="success">Connected</GlowBadge>
            <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer">
              <GlowButton size="sm" variant="ghost"><ExternalLink className="h-3.5 w-3.5" /></GlowButton>
            </a>
          </div>
        </div>
      </GlowCard>

      {/* Environment vars */}
      <GlowCard className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Environment Variables</h2>
        <div className="flex flex-col gap-2">
          {[
            { key: "OPENAI_API_KEY", set: true },
            { key: "GOOGLE_VERTEX_KEY", set: true },
            { key: "ANTHROPIC_KEY", set: true },
            { key: "GROK_KEY", set: false },
            { key: "DATABASE_URL", set: true },
            { key: "NEXTAUTH_SECRET", set: true },
          ].map((env) => (
            <div key={env.key} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-2.5">
              <code className="text-sm font-mono text-foreground">{env.key}</code>
              <GlowBadge variant={env.set ? "success" : "warning"}>{env.set ? "Set" : "Missing"}</GlowBadge>
            </div>
          ))}
        </div>
      </GlowCard>

      {/* Workers */}
      <GlowCard className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Background Workers</h2>
        <div className="flex flex-col gap-2">
          {[
            { name: "Build Orchestrator", status: "running", tasks: 3 },
            { name: "GitHub Sync Worker", status: "idle", tasks: 0 },
            { name: "APK Builder", status: "running", tasks: 1 },
            { name: "Desktop Builder", status: "stopped", tasks: 0 },
          ].map((worker) => (
            <div key={worker.name} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-3">
                <span className={`h-2.5 w-2.5 rounded-full ${worker.status === "running" ? "bg-success animate-glow-pulse" : worker.status === "idle" ? "bg-warning" : "bg-muted-foreground"}`} />
                <div>
                  <span className="text-sm font-medium text-foreground">{worker.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">{worker.tasks} active tasks</span>
                </div>
              </div>
              <GlowBadge variant={worker.status === "running" ? "success" : worker.status === "idle" ? "warning" : "default"}>
                {worker.status}
              </GlowBadge>
            </div>
          ))}
        </div>
      </GlowCard>
    </div>
  )
}
