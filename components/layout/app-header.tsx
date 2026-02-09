"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { GlowButton } from "@/components/aura"
import { Zap, Menu, X, User, Moon, Sun } from "lucide-react"
import { useState, useSyncExternalStore } from "react"

interface AppHeaderProps {
  onMobileMenuToggle?: () => void
  mobileMenuOpen?: boolean
}

function getContextTitle(pathname: string): string {
  if (pathname.startsWith("/admin")) return "Admin"
  if (pathname.startsWith("/dev")) return "Dev"
  if (pathname.startsWith("/projects/")) return "Workspace"
  if (pathname.startsWith("/projects")) return "Projects"
  if (pathname.startsWith("/agents")) return "Agents"
  if (pathname.startsWith("/billing")) return "Billing"
  if (pathname.startsWith("/affiliate")) return "Affiliate"
  if (pathname.startsWith("/quests")) return "Quests"
  if (pathname.startsWith("/settings")) return "Settings"
  if (pathname.startsWith("/dashboard")) return "Dashboard"
  return ""
}

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

export function AppHeader({ onMobileMenuToggle, mobileMenuOpen }: AppHeaderProps) {
  const pathname = usePathnameStable()
  const [darkMode, setDarkMode] = useState(true)
  const contextTitle = getContextTitle(pathname)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 glass">
      <div className="flex h-14 items-center justify-between px-4 lg:px-6">
        {/* Left: Logo + mobile menu */}
        <div className="flex items-center gap-3">
          <button
            className="flex lg:hidden items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={onMobileMenuToggle}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              AiBuild
            </span>
            <span className="hidden sm:inline text-xs text-muted-foreground font-mono">
              / CyberAi
            </span>
          </Link>
        </div>

        {/* Center: context title */}
        {contextTitle && (
          <span className="hidden md:block text-sm font-medium text-muted-foreground">
            {contextTitle}
          </span>
        )}

        {/* Right: user actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
            <User className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>
    </header>
  )
}
