"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Bot,
  Wrench,
  Database,
  Terminal,
  ScrollText,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Cpu,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/* ─── Navigation items ─────────────────────────────────── */
const NAV_ITEMS = [
  { label: "Dashboard",      href: "/dashboard", icon: LayoutDashboard },
  { label: "Agent Studio",   href: "/agents",    icon: Bot             },
  { label: "Tool Manager",   href: "/tools",     icon: Wrench          },
  { label: "Memory",         href: "/memory",    icon: Database        },
  { label: "Terminal",       href: "/terminal",  icon: Terminal        },
  { label: "Logs & Events",  href: "/logs",      icon: ScrollText      },
  { label: "System Monitor", href: "/monitor",   icon: Activity        },
  { label: "Settings",       href: "/settings",  icon: Settings        },
]

/* ─── Context — shared between Sidebar and Topbar ──────── */
interface SidebarCtx {
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}

export const SidebarContext = React.createContext<SidebarCtx>({
  mobileOpen: false,
  setMobileOpen: () => {},
  collapsed: false,
  setCollapsed: () => {},
})

export function useSidebar() {
  return React.useContext(SidebarContext)
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [collapsed, setCollapsed] = React.useState(false)
  return (
    <SidebarContext.Provider value={{ mobileOpen, setMobileOpen, collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

/* ─── Shared nav link ───────────────────────────────────── */
function NavLink({
  item,
  collapsed,
  onClick,
}: {
  item: (typeof NAV_ITEMS)[0]
  collapsed: boolean
  onClick?: () => void
}) {
  const pathname = usePathname()
  const active = pathname === item.href || pathname.startsWith(item.href + "/")
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
        "transition-all duration-150 min-h-[44px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        collapsed && "justify-center px-0",
        active
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0 transition-colors",
          active
            ? "text-primary"
            : "text-muted-foreground group-hover:text-foreground"
        )}
      />
      {!collapsed && (
        <span className="truncate leading-none">{item.label}</span>
      )}
      {active && !collapsed && (
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
      )}
    </Link>
  )
}

/* ─── Logo mark ─────────────────────────────────────────── */
function LogoMark({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 h-14 px-3 border-b border-border shrink-0",
        collapsed && "justify-center px-0"
      )}
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/25">
        <Cpu className="h-3.5 w-3.5 text-primary" />
      </div>
      {!collapsed && (
        <span className="font-semibold text-sm tracking-tight text-foreground select-none">
          Ai<span className="text-primary">OS</span>
        </span>
      )}
    </div>
  )
}

/* ─── Kernel status strip ───────────────────────────────── */
function StatusStrip({ collapsed }: { collapsed: boolean }) {
  if (collapsed) return null
  return (
    <div className="shrink-0 p-3 border-t border-border">
      <div className="rounded-lg bg-fx-surface-elevated border border-border px-3 py-2 flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-accent shrink-0 animate-pulse" />
        <span className="text-xs text-muted-foreground font-mono truncate">
          Kernel <span className="text-accent">online</span>
        </span>
      </div>
    </div>
  )
}

/* ─── Desktop sidebar (hidden on mobile) ────────────────── */
export function DesktopSidebar() {
  const { collapsed, setCollapsed } = useSidebar()

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col h-screen sticky top-0 shrink-0",
        "bg-fx-rail border-r border-border",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-[60px]" : "w-[220px]"
      )}
    >
      <LogoMark collapsed={collapsed} />

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <StatusStrip collapsed={collapsed} />

      <div className="shrink-0 border-t border-border p-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full h-8 text-muted-foreground hover:text-foreground",
            collapsed ? "px-0 justify-center" : "justify-start gap-2"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span className="text-xs">Collapse</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}

/* ─── Mobile drawer (visible only on mobile) ────────────── */
export function MobileDrawer() {
  const { mobileOpen, setMobileOpen } = useSidebar()
  const pathname = usePathname()

  // Close on route change
  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname, setMobileOpen])

  // Lock body scroll while open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      />

      {/* Panel */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col w-72 max-w-[85vw]",
          "bg-fx-rail border-r border-border",
          "transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        aria-label="Navigation menu"
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 border border-primary/25">
              <Cpu className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-foreground select-none">
              Ai<span className="text-primary">OS</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(false)}
            className="h-9 w-9 text-muted-foreground hover:text-foreground"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-3 flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              collapsed={false}
              onClick={() => setMobileOpen(false)}
            />
          ))}
        </nav>

        <StatusStrip collapsed={false} />
      </aside>
    </>
  )
}

/* ─── Default export kept for any legacy imports ────────── */
export function Sidebar() {
  return <DesktopSidebar />
}
