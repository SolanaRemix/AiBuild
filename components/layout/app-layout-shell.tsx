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

  // Workspace pages get edge-to-edge layout
  const isWorkspace = pathname.startsWith("/projects/")

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar — desktop */}
      <div className="hidden md:flex shrink-0">
        <AppSidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Sidebar — mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 md:hidden transition-transform duration-250 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <AppSidebar collapsed={false} />
      </div>

      {/* Main column */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        <AppTopBar
          onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
          onToggleMobile={() => setMobileOpen((o) => !o)}
        />
        <main
          className={cn(
            "flex-1 overflow-y-auto",
            isWorkspace
              ? "p-4 lg:p-6"
              : "px-4 py-6 lg:px-6 lg:py-8"
          )}
        >
          <div className={cn("mx-auto w-full", isWorkspace ? "max-w-none" : "max-w-7xl")}>
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
