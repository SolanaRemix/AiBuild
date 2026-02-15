import { AdminOverview } from "@/components/admin/admin-overview"
import { TraceLogViewer } from "@/components/admin/trace-log-viewer"
import { GlowButton } from "@/components/aura"
import { mockTraceLogs } from "@/lib/mock-data"
import Link from "next/link"
import { Users, Brain, Blocks, Receipt, Flag, Server } from "lucide-react"

const quickLinks = [
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Models", href: "/admin/models", icon: Brain },
  { label: "Agents", href: "/admin/agents", icon: Blocks },
  { label: "Plans", href: "/admin/plans", icon: Receipt },
  { label: "Flags", href: "/admin/flags", icon: Flag },
  { label: "System", href: "/admin/system", icon: Server },
]

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor system health, manage users, and configure platform settings</p>
      </div>

      {/* Quick nav */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-primary/50 hover:glow-blue hover:scale-105"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground">{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">System Overview</h2>
        <AdminOverview />
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <TraceLogViewer logs={mockTraceLogs} />
      </div>
    </div>
  )
}
