"use client"

import { usePathname } from "next/navigation"
import { GlowButton } from "@/components/aura"
import { Menu, PanelLeftClose, Bell, Search } from "lucide-react"
import Link from "next/link"

interface AppTopBarProps {
  onToggleSidebar: () => void
  onToggleMobile: () => void
}

const contextTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/agents": "Agents",
  "/billing": "Billing",
  "/affiliate": "Affiliate Program",
  "/quests": "Quests",
  "/settings": "Settings",
  "/dev/deployments": "Deployments",
  "/dev/logs": "Logs",
  "/dev/sdk": "SDK & API",
  "/dev/webhooks": "Webhooks",
  "/admin": "Admin / Users",
  "/admin/models": "Admin / Models",
  "/admin/agents": "Admin / Agents",
  "/admin/plans": "Admin / Plans & Billing",
  "/admin/system": "Admin / System",
}

function getContextTitle(pathname: string): string {
  // Exact match first
  if (contextTitles[pathname]) return contextTitles[pathname]
  // Project workspace
  if (pathname.startsWith("/projects/")) return "Workspace"
  // Prefix match
  for (const [key, title] of Object.entries(contextTitles)) {
    if (pathname.startsWith(key + "/")) return title
  }
  return "AiBuild"
}

export function AppTopBar({ onToggleSidebar, onToggleMobile }: AppTopBarProps) {
  const pathname = usePathname()
  const title = getContextTitle(pathname)

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/80 glass px-4 lg:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          className="flex md:hidden items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          onClick={onToggleMobile}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop sidebar toggle */}
        <button
          className="hidden md:flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>

        <h1 className="text-sm font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </button>
        <button className="flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </button>
        <Link href="/">
          <GlowButton variant="ghost" size="sm">
            Home
          </GlowButton>
        </Link>
      </div>
    </header>
  )
}
