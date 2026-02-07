"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { AppSidebar } from "./app-sidebar"
import { AppTopBar } from "./app-top-bar"
import { cn } from "@/lib/utils"

export function AppLayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Workspace pages need full height (e.g. project workspace)
  const isWorkspace = pathname.startsWith("/projects/")

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 glass md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - desktop */}
      <div className="hidden md:flex">
        <AppSidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Sidebar - mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <AppSidebar collapsed={false} />
      </div>

      {/* Main area */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <AppTopBar
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onToggleMobile={() => setMobileOpen(!mobileOpen)}
        />
        <main
          className={cn(
            "flex-1 overflow-y-auto",
            isWorkspace ? "p-4 lg:p-6" : "mx-auto w-full max-w-7xl px-4 py-8 lg:px-6"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  )
}
