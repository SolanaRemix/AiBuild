"use client"

import { usePathname } from "next/navigation"
import { Bell, Search, User, Sun, Moon, Monitor, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { useSidebar } from "@/components/layout/sidebar"

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/agents":    "Agent Studio",
  "/tools":     "Tool Manager",
  "/memory":    "Memory",
  "/terminal":  "Terminal",
  "/logs":      "Logs & Events",
  "/monitor":   "System Monitor",
  "/settings":  "Settings",
}

export function Topbar() {
  const pathname = usePathname()
  const base = "/" + pathname.split("/")[1]
  const title = PAGE_TITLES[base] ?? "AiOS"

  const { theme, setTheme, resolvedTheme } = useTheme()
  const { setMobileOpen } = useSidebar()

  return (
    <header className="h-14 flex items-center justify-between gap-3 px-4 md:px-5 border-b border-border bg-fx-surface shrink-0">

      {/* Left: hamburger (mobile) + breadcrumb */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Hamburger — mobile only */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-9 w-9 shrink-0 text-muted-foreground hover:text-foreground"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation"
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-1.5 min-w-0">
          <span className="hidden sm:inline text-xs text-muted-foreground font-mono shrink-0">
            AiOS /
          </span>
          <span className="text-sm font-semibold font-mono text-foreground truncate">
            {title}
          </span>
        </div>
      </div>

      {/* Center: search (desktop) */}
      <div className="hidden md:flex items-center w-64 lg:w-80 relative">
        <Search className="absolute left-3 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search agents, tools, logs..."
          className="pl-9 h-8 text-xs bg-fx-rail border-border focus-visible:ring-primary/50 font-mono"
        />
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1 shrink-0">

        {/* Theme toggle dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className="gap-2 cursor-pointer"
            >
              <Sun className="h-3.5 w-3.5" />
              <span>Light</span>
              {theme === "light" && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className="gap-2 cursor-pointer"
            >
              <Moon className="h-3.5 w-3.5" />
              <span>Dark</span>
              {theme === "dark" && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className="gap-2 cursor-pointer"
            >
              <Monitor className="h-3.5 w-3.5" />
              <span>System</span>
              {theme === "system" && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button
          size="icon"
          variant="ghost"
          className="h-9 w-9 text-muted-foreground hover:text-foreground relative"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        </Button>

        {/* Avatar */}
        <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0 ml-1">
          <User className="h-4 w-4" />
        </div>
      </div>
    </header>
  )
}
