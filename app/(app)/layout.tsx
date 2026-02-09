"use client"

import { useState } from "react"
import { GlowShell, GlowSidebar } from "@/components/aura"
import { AppHeader } from "@/components/layout/app-header"
import { userSections, devSections, adminSections } from "@/lib/sidebar-config"

const allSections = [...userSections, ...devSections, ...adminSections]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <GlowShell>
      <AppHeader
        onMobileMenuToggle={() => setMobileOpen(!mobileOpen)}
        mobileMenuOpen={mobileOpen}
      />

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>
        {/* Desktop sidebar */}
        <GlowSidebar
          sections={allSections}
          className="hidden lg:flex"
        />

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-background/60 glass lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed inset-y-14 left-0 z-50 lg:hidden">
              <GlowSidebar
                sections={allSections}
                className="h-full bg-background"
              />
            </div>
          </>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </GlowShell>
  )
}
