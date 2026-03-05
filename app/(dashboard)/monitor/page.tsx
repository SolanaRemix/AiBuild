import { kernel } from "@/core/kernel"
import { agentRegistry } from "@/core/agents/registry"
import { toolRegistry } from "@/core/tools/registry"
import { memoryLayer } from "@/core/memory"
import { StatCard } from "@/components/ui/stat-card"
import { SystemMonitorCharts } from "@/components/monitor/monitor-charts"
import { SyscallTable } from "@/components/monitor/syscall-table"
import { Cpu, MemoryStick, Activity, Zap, Server, Radio } from "lucide-react"
import { formatUptime } from "@/lib/utils"
import { cn } from "@/lib/utils"

export default function MonitorPage() {
  const status = kernel.getStatus()
  const syscalls = kernel.getSyscalls()
  const agentStats = agentRegistry.getStats()
  const toolStats = toolRegistry.getStats()
  const memStats = memoryLayer.getStats()

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-mono text-foreground text-glow-blue">
            System Monitor
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Real-time kernel and resource metrics
          </p>
        </div>
        <div
          className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono",
            status.status === "healthy"
              ? "border-[hsl(var(--fx-glow-green))]/30 bg-[hsl(var(--fx-glow-green))]/5 text-[hsl(var(--fx-glow-green))]"
              : status.status === "degraded"
              ? "border-warning/30 bg-warning/5 text-warning"
              : "border-destructive/30 bg-destructive/5 text-destructive"
          )}
        >
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              status.status === "healthy" ? "bg-[hsl(var(--fx-glow-green))] animate-pulse" : "bg-warning"
            )}
          />
          {status.status.toUpperCase()}
        </div>
      </div>

      {/* Kernel info banner */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 px-5 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 glow-blue">
        {[
          { label: "Version", value: status.version },
          { label: "Uptime", value: formatUptime(status.uptime) },
          { label: "CPU", value: `${status.cpuPercent.toFixed(1)}%` },
          { label: "Memory", value: `${status.memoryPercent.toFixed(1)}%` },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              {label}
            </p>
            <p className="text-lg font-bold font-mono text-primary">{value}</p>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard title="Agents" value={agentStats.total} icon={Activity} glow="blue" />
        <StatCard title="Running" value={agentStats.running} icon={Radio} glow="green" />
        <StatCard title="Tools" value={toolStats.total} icon={Zap} glow="blue" />
        <StatCard title="Tool Calls" value={toolStats.totalCalls.toLocaleString()} icon={Server} glow="amber" />
        <StatCard title="Memory" value={memStats.total} icon={MemoryStick} glow="blue" />
        <StatCard title="Syscalls" value={syscalls.length} icon={Cpu} glow="blue" />
      </div>

      {/* Charts + syscalls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SystemMonitorCharts cpuPercent={status.cpuPercent} memPercent={status.memoryPercent} />
        <SyscallTable syscalls={syscalls} />
      </div>

      {/* Model status */}
      <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-sm font-semibold font-mono text-foreground">Model Provider Status</h2>
        </div>
        <div className="divide-y divide-border">
          {status.models.map((m) => (
            <div
              key={m.id}
              className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-3 hover:bg-[hsl(var(--fx-surface-elevated))] transition-colors"
            >
              <div>
                <p className="text-sm font-mono text-foreground">{m.id}</p>
                <p className="text-[10px] font-mono text-muted-foreground capitalize">{m.provider}</p>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {m.latencyMs}ms
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {m.requestsToday.toLocaleString()} req
              </span>
              <span className="text-xs font-mono text-muted-foreground">
                {(m.tokensToday / 1000).toFixed(0)}k tok
              </span>
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 text-[10px] font-mono",
                  m.status === "online" ? "text-[hsl(var(--fx-glow-green))]" : "text-warning"
                )}
              >
                <span
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    m.status === "online" ? "bg-[hsl(var(--fx-glow-green))]" : "bg-warning"
                  )}
                />
                {m.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
