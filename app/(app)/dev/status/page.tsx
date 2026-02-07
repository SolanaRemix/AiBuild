import { GlowCard, GlowBadge } from "@/components/aura"
import { Activity, Server, Database, Globe, Cpu } from "lucide-react"

const services = [
  { name: "API Gateway", status: "operational", latency: "12ms", icon: Globe },
  { name: "AI Agent Service", status: "operational", latency: "145ms", icon: Cpu },
  { name: "Build Workers", status: "operational", latency: "230ms", icon: Server },
  { name: "Database", status: "operational", latency: "3ms", icon: Database },
  { name: "CDN & Preview", status: "operational", latency: "8ms", icon: Activity },
]

export default function SystemStatusPage() {
  const allOperational = services.every((s) => s.status === "operational")

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">System Status</h1>
        <p className="text-sm text-muted-foreground">Real-time health of AiBuild infrastructure</p>
      </div>

      {/* Overall status */}
      <GlowCard variant={allOperational ? "cyan" : "default"} className="p-6">
        <div className="flex items-center gap-4">
          <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${allOperational ? "bg-success/10 border-success/20" : "bg-warning/10 border-warning/20"}`}>
            <Activity className={`h-7 w-7 ${allOperational ? "text-success" : "text-warning"}`} />
          </div>
          <div>
            <p className="text-lg font-semibold text-foreground">
              {allOperational ? "All Systems Operational" : "Partial Outage Detected"}
            </p>
            <p className="text-sm text-muted-foreground">Last checked: just now</p>
          </div>
        </div>
      </GlowCard>

      {/* Services */}
      <div className="flex flex-col gap-3">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <GlowCard key={service.name} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">{service.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground">{service.latency}</span>
                  <GlowBadge variant={service.status === "operational" ? "success" : "warning"}>
                    {service.status}
                  </GlowBadge>
                </div>
              </div>
            </GlowCard>
          )
        })}
      </div>
    </div>
  )
}
