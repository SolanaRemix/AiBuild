import { GlowCard } from "@/components/aura"
import {
  Users,
  FolderOpen,
  Brain,
  Activity,
  Server,
  Shield,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

const adminStats = [
  { label: "Total Users", value: "142", icon: Users, change: "+12%", trend: "up" },
  { label: "Total Projects", value: "387", icon: FolderOpen, change: "+8%", trend: "up" },
  { label: "AI Generations", value: "2,841", icon: Brain, change: "+24%", trend: "up" },
  { label: "Active Builds", value: "12", icon: Server, change: "-2%", trend: "down" },
  { label: "Trace Logs", value: "18.4k", icon: Activity, change: "+15%", trend: "up" },
  { label: "Security Events", value: "0", icon: Shield, change: "0%", trend: "neutral" },
]

export function AdminOverview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {adminStats.map((stat) => {
        const Icon = stat.icon
        const TrendIcon = stat.trend === "up" ? TrendingUp : stat.trend === "down" ? TrendingDown : Activity
        return (
          <GlowCard key={stat.label} className="p-6 hover:border-primary/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                stat.trend === "up" 
                  ? "bg-success/10 text-success" 
                  : stat.trend === "down" 
                  ? "bg-destructive/10 text-destructive" 
                  : "bg-muted text-muted-foreground"
              }`}>
                <TrendIcon className="h-3 w-3" />
                {stat.change}
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <p className="text-3xl font-bold text-foreground mt-1">
                {stat.value}
              </p>
            </div>
          </GlowCard>
        )
      })}
    </div>
  )
}
