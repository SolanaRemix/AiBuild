import { AdminOverview } from "@/components/admin/admin-overview"
import { AdminHeaderBar } from "@/components/admin/admin-header-bar"
import { TraceLogViewer } from "@/components/admin/trace-log-viewer"
import { mockTraceLogs } from "@/lib/mock-data"
import Link from "next/link"
import { Users, Puzzle, Receipt, Server } from "lucide-react"

const quickLinks = [
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Plugins", href: "/admin/plugins", icon: Puzzle },
  { label: "Plans", href: "/admin/plans", icon: Receipt },
  { label: "Logs", href: "/admin/system", icon: Server },
]

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-10">
      <AdminHeaderBar />

      {/* Quick nav */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-4">
        {quickLinks.map((link) => {
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-all hover:border-glow-cyan hover:glow-blue"
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-foreground">{link.label}</span>
            </Link>
          )
        })}
      </div>

      <AdminOverview />
      <TraceLogViewer logs={mockTraceLogs} />
    </div>
  )
}
