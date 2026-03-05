import { agentRegistry } from "@/core/agents/registry"
import { AgentCard } from "@/components/agents/agent-card"
import { CreateAgentButton } from "@/components/agents/create-agent-button"
import { StatCard } from "@/components/ui/stat-card"
import { Bot, Play, Pause, AlertTriangle } from "lucide-react"

export default function AgentsPage() {
  const agents = agentRegistry.getAll()
  const stats = agentRegistry.getStats()

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-mono text-foreground text-glow-blue">
            Agent Studio
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Create, configure, and manage AI agents
          </p>
        </div>
        <CreateAgentButton />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Agents" value={stats.total} icon={Bot} glow="blue" />
        <StatCard title="Running" value={stats.running} icon={Play} glow="green" />
        <StatCard title="Paused" value={stats.paused} icon={Pause} glow="amber" />
        <StatCard title="Errors" value={stats.error} icon={AlertTriangle} glow="red" />
      </div>

      {/* Agent Grid */}
      <div>
        <h2 className="text-sm font-semibold font-mono text-muted-foreground uppercase tracking-widest mb-4">
          Registered Agents ({agents.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {agents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>
    </div>
  )
}
