"use client"

import { usePathname } from "next/navigation"
import { Bell, Search, User, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/agents": "Agent Studio",
  "/tools": "Tool Manager",
  "/memory": "Memory Manager",
  "/terminal": "Terminal",
  "/logs": "Logs & Events",
  "/monitor": "System Monitor",
  "/settings": "Settings",
}

export function Topbar() {
  const pathname = usePathname()
  const base = "/" + pathname.split("/")[1]
  const title = PAGE_TITLES[base] ?? "AiOS"

  return (
    <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-[hsl(var(--fx-surface))] shrink-0">
      {/* Left: breadcrumb */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground font-mono">AiOS /</span>
        <span className="text-sm font-semibold font-mono text-foreground">{title}</span>
      </div>

      {/* Center: search */}
      <div className="hidden md:flex items-center w-72 relative">
        <Search className="absolute left-3 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search agents, tools, logs..."
          className="pl-9 h-8 text-xs bg-[hsl(var(--fx-rail))] border-border focus-visible:ring-primary/50 font-mono"
        />
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8 text-muted-foreground hover:text-foreground relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
          <User className="w-4 h-4" />
        </div>
      </div>
    </header>
  )
}
