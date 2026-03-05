import { memoryLayer } from "@/core/memory"
import { StatCard } from "@/components/ui/stat-card"
import { Brain, Database, Globe, Activity } from "lucide-react"
import { MemoryTable } from "@/components/memory/memory-table"

export default function MemoryPage() {
  const entries = memoryLayer.getAll()
  const stats = memoryLayer.getStats()

  return (
    <div className="p-6 space-y-6 max-w-screen-2xl mx-auto">
      <div>
        <h1 className="text-xl font-bold font-mono text-foreground text-glow-blue">
          Memory Manager
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Inspect and manage agent memory entries
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Entries" value={stats.total} icon={Brain} glow="blue" />
        <StatCard title="Agent-Scoped" value={stats.withAgent} icon={Database} glow="green" />
        <StatCard title="Global" value={stats.global} icon={Globe} glow="amber" />
        <StatCard
          title="Total Accesses"
          value={stats.totalAccesses}
          icon={Activity}
          glow="blue"
        />
      </div>

      <MemoryTable entries={entries} />
    </div>
  )
}
