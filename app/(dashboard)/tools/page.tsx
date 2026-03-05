import { toolRegistry } from "@/core/tools/registry"
import { ToolCard } from "@/components/tools/tool-card"
import { StatCard } from "@/components/ui/stat-card"
import { Wrench, CheckCircle, XCircle, Zap } from "lucide-react"

export default function ToolsPage() {
  const tools = toolRegistry.getAll()
  const stats = toolRegistry.getStats()

  const categories = Array.from(new Set(tools.map((t) => t.category)))

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold font-mono text-foreground text-glow-blue">
            Tool Manager
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage and configure agent tools
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Tools" value={stats.total} icon={Wrench} glow="blue" />
        <StatCard title="Enabled" value={stats.enabled} icon={CheckCircle} glow="green" />
        <StatCard title="Disabled" value={stats.disabled} icon={XCircle} glow="red" />
        <StatCard
          title="Total Calls"
          value={stats.totalCalls.toLocaleString()}
          icon={Zap}
          glow="amber"
        />
      </div>

      {categories.map((cat) => {
        const catTools = tools.filter((t) => t.category === cat)
        return (
          <div key={cat}>
            <h2 className="text-xs font-semibold font-mono text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {cat} ({catTools.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {catTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
