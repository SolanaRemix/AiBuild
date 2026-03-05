"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Bot,
  Wrench,
  Brain,
  ScrollText,
  Activity,
  Settings,
  Terminal,
  Code2,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Zap,
} from "lucide-react"
import { useState } from "react"

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Agent Studio", href: "/agents", icon: Bot },
  { label: "Tool Manager", href: "/tools", icon: Wrench },
  { label: "Memory", href: "/memory", icon: Brain },
  { label: "Terminal", href: "/terminal", icon: Terminal },
  { label: "Logs & Events", href: "/logs", icon: ScrollText },
  { label: "System Monitor", href: "/monitor", icon: Activity },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "relative flex flex-col h-full border-r border-border bg-[hsl(var(--fx-rail))] transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 py-5 border-b border-border",
          collapsed && "justify-center px-0"
        )}
      >
        <div className="relative flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center glow-blue">
          <Cpu className="w-4 h-4 text-primary" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold font-mono text-foreground text-glow-blue">
              AiOS
            </p>
            <p className="text-[10px] text-muted-foreground font-mono">v1.0.0 — KERNEL</p>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[4.5rem] z-10 w-6 h-6 rounded-full border border-border bg-[hsl(var(--fx-surface))] flex items-center justify-center hover:border-primary/50 hover:text-primary transition-colors text-muted-foreground"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 min-h-[44px]",
                collapsed && "justify-center px-0",
                active
                  ? "bg-primary/10 text-primary border border-primary/20 glow-blue"
                  : "text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--fx-surface-elevated))]"
              )}
            >
              <Icon className={cn("flex-shrink-0", active ? "w-4 h-4" : "w-4 h-4")} />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Status strip */}
      {!collapsed && (
        <div className="p-3 border-t border-border">
          <div className="rounded-lg bg-[hsl(var(--fx-surface-elevated))] border border-border px-3 py-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--fx-glow-green))] glow-green flex-shrink-0" />
            <span className="text-xs text-muted-foreground font-mono">
              Kernel <span className="text-[hsl(var(--fx-glow-green))]">online</span>
            </span>
          </div>
        </div>
      )}
    </aside>
  )
}
