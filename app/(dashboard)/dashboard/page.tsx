import { StatCard } from "@/components/ui/stat-card"
import { AgentStatusBadge } from "@/components/ui/status-badge"
import { agentRegistry } from "@/core/agents/registry"
import { toolRegistry } from "@/core/tools/registry"
import { memoryLayer } from "@/core/memory"
import { eventBus } from "@/core/events"
import { Bot, Wrench, Brain, Zap } from "lucide-react"
import { formatRelativeTime, formatDuration } from "@/lib/utils"
import { DashboardCharts } from "@/components/dashboard/charts"
import { RecentEvents } from "@/components/dashboard/recent-events"
import { ModelStatusGrid } from "@/components/dashboard/model-status-grid"
import { kernel } from "@/core/kernel"

export default function DashboardPage() {
  const agentStats = agentRegistry.getStats()
  const toolStats = toolRegistry.getStats()
  const memStats = memoryLayer.getStats()
  const agents = agentRegistry.getAll()
  const recentAgents = agents.slice(0, 5)
  const events = eventBus.getHistory(8)
  const kernelStatus = kernel.getStatus()

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-mono text-foreground text-glow-blue">
            System Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            AiOS Kernel v{kernelStatus.version} — uptime{" "}
            <span className="font-mono text-primary">
              {Math.floor(kernelStatus.uptime / 60)}m
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[hsl(var(--fx-glow-green))]/30 bg-[hsl(var(--fx-glow-green))]/5">
          <span className="w-2 h-2 rounded-full bg-[hsl(var(--fx-glow-green))] animate-pulse" />
          <span className="text-xs font-mono text-[hsl(var(--fx-glow-green))]">
            KERNEL ONLINE
          </span>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Agents"
          value={agentStats.running}
          subtitle={`${agentStats.total} total registered`}
          icon={Bot}
          trend={{ value: 12, label: "vs last hour" }}
          glow="green"
        />
        <StatCard
          title="Tools Available"
          value={toolStats.enabled}
          subtitle={`${toolStats.total} total, ${toolStats.disabled} disabled`}
          icon={Wrench}
          glow="blue"
        />
        <StatCard
          title="Memory Entries"
          value={memStats.total}
          subtitle={`${memStats.totalAccesses} total accesses`}
          icon={Brain}
          glow="amber"
        />
        <StatCard
          title="Tool Calls Today"
          value={toolStats.totalCalls.toLocaleString()}
          subtitle="Across all agents"
          icon={Zap}
          trend={{ value: 8, label: "vs yesterday" }}
          glow="blue"
        />
      </div>

      {/* Charts + Events */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>
        <div>
          <RecentEvents events={events} />
        </div>
      </div>

      {/* Agent Table + Model Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Agents */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="text-sm font-semibold font-mono text-foreground">Agent Registry</h2>
            <a
              href="/agents"
              className="text-xs font-mono text-primary hover:underline"
            >
              View all
            </a>
          </div>
          <div className="divide-y divide-border">
            {recentAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex items-center justify-between px-5 py-3 hover:bg-[hsl(var(--fx-surface-elevated))] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium font-mono text-foreground truncate">
                      {agent.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {agent.model} · {agent.runCount} runs
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-3 flex-shrink-0">
                  <AgentStatusBadge status={agent.status} />
                  {agent.lastRunAt && (
                    <span className="text-xs text-muted-foreground font-mono hidden sm:block">
                      {formatRelativeTime(agent.lastRunAt)}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Status */}
        <ModelStatusGrid models={kernelStatus.models} />
      </div>
    </div>
  )
}
