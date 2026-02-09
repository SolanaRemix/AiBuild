"use client"

import Link from "next/link"
import { useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

function usePathnameStable() {
  return useSyncExternalStore(
    (cb) => {
      window.addEventListener("popstate", cb)
      return () => window.removeEventListener("popstate", cb)
    },
    () => window.location.pathname,
    () => "/"
  )
}
import {
  FolderOpen,
  Bot,
  CreditCard,
  Users2,
  Sword,
  Settings,
  Rocket,
  ScrollText,
  Key,
  Webhook,
  Users,
  Brain,
  Layers,
  Receipt,
  Server,
  ChevronRight,
  Zap,
} from "lucide-react"
import { useState } from "react"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavSection {
  title: string
  items: NavItem[]
}

const userSection: NavSection = {
  title: "Workspace",
  items: [
    { label: "Projects", href: "/dashboard", icon: FolderOpen },
    { label: "Agents", href: "/agents", icon: Bot },
    { label: "Billing", href: "/billing", icon: CreditCard },
    { label: "Affiliate", href: "/affiliate", icon: Users2 },
    { label: "Quests", href: "/quests", icon: Sword },
    { label: "Settings", href: "/settings", icon: Settings },
  ],
}

const devSection: NavSection = {
  title: "Developer",
  items: [
    { label: "Deployments", href: "/dev/deployments", icon: Rocket },
    { label: "Logs", href: "/dev/logs", icon: ScrollText },
    { label: "SDK & API", href: "/dev/sdk", icon: Key },
    { label: "Webhooks", href: "/dev/webhooks", icon: Webhook },
  ],
}

const adminSection: NavSection = {
  title: "Admin",
  items: [
    { label: "Users", href: "/admin", icon: Users },
    { label: "Models", href: "/admin/models", icon: Brain },
    { label: "Agents", href: "/admin/agents", icon: Layers },
    { label: "Plans & Billing", href: "/admin/plans", icon: Receipt },
    { label: "System", href: "/admin/system", icon: Server },
  ],
}

const allSections = [userSection, devSection, adminSection]

function SidebarSection({
  section,
  pathname,
  collapsed,
}: {
  section: NavSection
  pathname: string
  collapsed: boolean
}) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="flex flex-col">
      {!collapsed && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronRight
            className={cn(
              "h-3 w-3 transition-transform",
              expanded && "rotate-90"
            )}
          />
          {section.title}
        </button>
      )}
      {(collapsed || expanded) && (
        <nav className="flex flex-col gap-0.5 px-2" aria-label={`${section.title} navigation`}>
          {section.items.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href + "/"))
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary/10 text-primary border-glow-cyan glow-cyan"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>
      )}
    </div>
  )
}

interface AppSidebarProps {
  collapsed?: boolean
}

export function AppSidebar({ collapsed = false }: AppSidebarProps) {
  const pathname = usePathnameStable()

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card/50 glass shrink-0 overflow-y-auto",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center border-b border-border h-14 shrink-0",
        collapsed ? "justify-center px-2" : "gap-2 px-4"
      )}>
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="text-lg font-bold tracking-tight text-foreground">
              AiBuild
            </span>
          )}
        </Link>
      </div>

      {/* Nav sections */}
      <div className="flex flex-1 flex-col gap-4 py-4 overflow-y-auto">
        {allSections.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            pathname={pathname}
            collapsed={collapsed}
          />
        ))}
      </div>

      {/* Bottom */}
      {!collapsed && (
        <div className="border-t border-border p-3">
          <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20">
              <span className="text-xs font-bold text-primary">U</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-foreground truncate">User</span>
              <span className="text-xs text-muted-foreground truncate">Free plan</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
