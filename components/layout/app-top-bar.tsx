"use client"

import { usePathname } from "next/navigation"
import { GlowButton } from "@/components/aura"
import { Menu, PanelLeftClose, Bell, Search, Zap } from "lucide-react"
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
  "/dev/status": "System Status",
  "/admin/users": "Admin / Users",
  "/admin/models": "Admin / Models",
  "/admin/agents": "Admin / Agents",
  "/admin/plans": "Admin / Plans",
  "/admin/plugins": "Admin / Plugins",
  "/admin/affiliate": "Admin / Affiliate",
  "/admin/quests": "Admin / Quests",
  "/admin/system": "Admin / System",
  "/admin/flags": "Admin / Flags",
}

function getContextTitle(pathname: string): string {
  if (contextTitles[pathname]) return contextTitles[pathname]
  if (pathname.startsWith("/projects/")) return "Workspace"
  for (const [key, title] of Object.entries(contextTitles)) {
    if (pathname.startsWith(key + "/")) return title
  }
  return "AiBuild"
}

export function AppTopBar({ onToggleSidebar, onToggleMobile }: AppTopBarProps) {
  const pathname = usePathname()
  const title = getContextTitle(pathname)

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background/80 backdrop-blur-md px-4 lg:px-5">
      <div className="flex items-center gap-3">
        {/* Mobile: logo + menu */}
        <div className="flex md:hidden items-center gap-2">
          <button
            className="flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={onToggleMobile}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/" className="flex items-center gap-1.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary">
              <Zap className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold text-foreground">AiBuild</span>
          </Link>
        </div>

        {/* Desktop: sidebar toggle + breadcrumb */}
        <button
          className="hidden md:flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </button>

        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-muted-foreground">/</span>
          <h1 className="text-sm font-semibold text-foreground">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button className="flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </button>
        <button className="relative flex items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          <span className="sr-only">Notifications</span>
        </button>
        <Link href="/">
          <GlowButton variant="ghost" size="sm" className="hidden sm:inline-flex">
            ← Home
          </GlowButton>
        </Link>
      </div>
    </header>
  )
}
