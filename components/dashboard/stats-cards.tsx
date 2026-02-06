import { GlowCard } from "@/components/aura"
import { FolderOpen, Rocket, GitBranch, Brain } from "lucide-react"

const stats = [
  {
    label: "Total Projects",
    value: "4",
    change: "+2 this month",
    icon: FolderOpen,
    variant: "cyan" as const,
  },
  {
    label: "Deployments",
    value: "7",
    change: "3 active",
    icon: Rocket,
    variant: "purple" as const,
  },
  {
    label: "GitHub Syncs",
    value: "12",
    change: "Last: 2h ago",
    icon: GitBranch,
    variant: "default" as const,
  },
  {
    label: "AI Generations",
    value: "38",
    change: "4.2s avg",
    icon: Brain,
    variant: "cyan" as const,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <GlowCard key={stat.label} variant={stat.variant} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
                <span className="text-2xl font-bold text-foreground">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stat.change}
                </span>
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
