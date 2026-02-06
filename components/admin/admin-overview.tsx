import { GlowCard } from "@/components/aura"
import {
  Users,
  FolderOpen,
  Brain,
  Activity,
  Server,
  Shield,
} from "lucide-react"

const adminStats = [
  { label: "Total Users", value: "142", icon: Users },
  { label: "Total Projects", value: "387", icon: FolderOpen },
  { label: "AI Generations", value: "2,841", icon: Brain },
  { label: "Active Builds", value: "12", icon: Server },
  { label: "Trace Logs", value: "18.4k", icon: Activity },
  { label: "Security Events", value: "0", icon: Shield },
]

export function AdminOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {adminStats.map((stat) => {
        const Icon = stat.icon
        return (
          <GlowCard key={stat.label} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {stat.value}
                </p>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" />
              </div>
            </div>
          </GlowCard>
        )
      })}
    </div>
  )
}
