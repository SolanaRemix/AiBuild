"use client"

import { Menu, Bell, User, LogIn } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { GlowButton } from "@/components/aura"
import { GlowButton } from "@/components/aura"
import { Zap, Menu, X, User, Moon, Sun } from "lucide-react"
import { useState } from "react"

interface AppHeaderProps {
  onMobileMenuToggle?: () => void
  mobileMenuOpen?: boolean
}

function getContextTitle(pathname: string): string {
  if (pathname.startsWith("/admin")) return "Admin Panel"
  if (pathname.startsWith("/dev")) return "Developer Tools"
  if (pathname.startsWith("/projects/")) return "Workspace"
  if (pathname.startsWith("/projects")) return "Projects"
  if (pathname.startsWith("/agents")) return "AI Agents"
  if (pathname.startsWith("/chat")) return "AI Chat"
  if (pathname.startsWith("/submissions")) return "App Submissions"
  if (pathname.startsWith("/frames")) return "Farcaster Frames"
  if (pathname.startsWith("/billing")) return "Billing & Plans"
  if (pathname.startsWith("/affiliate")) return "Affiliate Program"
  if (pathname.startsWith("/quests")) return "Quests & Rewards"
  if (pathname.startsWith("/settings")) return "Settings"
  if (pathname.startsWith("/dashboard")) return "Dashboard"
  return ""
}

export function AppHeader({ onMobileMenuToggle, mobileMenuOpen }: AppHeaderProps) {
  const pathname = usePathname()
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
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-semibold text-foreground px-3 py-1 rounded-md bg-muted/50 border border-border">
              {contextTitle}
            </span>
          </div>
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
          {pathname === "/" ? (
            <>
              <Link href="/login">
                <GlowButton variant="outline" size="sm">
                  Sign In
                </GlowButton>
              </Link>
              <Link href="/register">
                <GlowButton size="sm">
                  Get Started
                </GlowButton>
              </Link>
            </>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <User className="h-4 w-4 text-primary" />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
