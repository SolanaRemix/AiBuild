"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  FolderOpen,
  Bot,
  CreditCard,
  Users2,
  Trophy,
  Settings,
  Rocket,
  ScrollText,
  Key,
  Webhook,
  Activity,
  Users,
  Brain,
  Layers,
  Receipt,
  Server,
  Flag,
  Gift,
  Gamepad2,
  Puzzle,
  LayoutDashboard,
  Zap,
  ChevronDown,
} from "lucide-react"
import { useState } from "react"

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

const userSection: NavSection = {
  title: "Workspace",
  items: [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/projects", icon: FolderOpen, badge: "4" },
    { label: "Agents", href: "/agents", icon: Bot },
    { label: "Billing", href: "/billing", icon: CreditCard },
    { label: "Affiliate", href: "/affiliate", icon: Users2 },
    { label: "Quests", href: "/quests", icon: Trophy, badge: "3" },
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
    { label: "Status", href: "/dev/status", icon: Activity },
  ],
}

const adminSection: NavSection = {
  title: "Admin",
  items: [
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Models", href: "/admin/models", icon: Brain },
    { label: "Agents", href: "/admin/agents", icon: Layers },
    { label: "Plans", href: "/admin/plans", icon: Receipt },
    { label: "Plugins", href: "/admin/plugins", icon: Puzzle },
    { label: "Affiliate", href: "/admin/affiliate", icon: Gift },
    { label: "Quests", href: "/admin/quests", icon: Gamepad2 },
    { label: "System", href: "/admin/system", icon: Server },
    { label: "Flags", href: "/admin/flags", icon: Flag },
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
  const [open, setOpen] = useState(true)

  return (
    <div className="flex flex-col">
      {!collapsed && (
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70 hover:text-muted-foreground transition-colors"
        >
          <span>{section.title}</span>
          <ChevronDown
            className={cn(
              "h-3 w-3 transition-transform duration-200",
              !open && "-rotate-90"
            )}
          />
        </button>
      )}
      {(collapsed || open) && (
        <nav className="flex flex-col gap-0.5 px-2" aria-label={`${section.title} navigation`}>
          {section.items.map((item) => {
            const Icon = item.icon
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                {!collapsed && (
                  <>
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
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
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-border bg-card/60 backdrop-blur-md shrink-0 overflow-y-auto h-full",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center border-b border-border h-14 shrink-0",
          collapsed ? "justify-center px-2" : "gap-2 px-4"
        )}
      >
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shrink-0">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold tracking-tight text-foreground leading-tight">
                AiBuild
              </span>
              <span className="text-[10px] text-muted-foreground font-mono leading-tight">
                CyberAi
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Nav sections */}
      <div className="flex flex-1 flex-col gap-3 py-3 overflow-y-auto">
        {allSections.map((section) => (
          <SidebarSection
            key={section.title}
            section={section}
            pathname={pathname}
            collapsed={collapsed}
          />
        ))}
      </div>

      {/* User chip */}
      {!collapsed && (
        <div className="border-t border-border p-3">
          <Link
            href="/settings"
            className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2 hover:bg-muted transition-colors"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 shrink-0">
              <span className="text-xs font-bold text-primary">U</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-foreground truncate leading-tight">
                User
              </span>
              <span className="text-xs text-muted-foreground truncate leading-tight">
                Free plan
              </span>
            </div>
          </Link>
        </div>
      )}
    </aside>
  )
}
