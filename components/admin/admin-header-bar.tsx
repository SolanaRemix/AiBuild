"use client"

import { useAdminAuth } from "@/lib/admin-auth"
import { GlowButton, GlowBadge } from "@/components/aura"
import { LogOut, Shield } from "lucide-react"

export function AdminHeaderBar() {
  const { user, logout } = useAdminAuth()

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Panel</h1>
        <p className="text-sm text-muted-foreground">System overview and quick access to all admin tools</p>
      </div>
      <div className="flex items-center gap-3">
        <GlowBadge variant="purple">
          <Shield className="mr-1 h-3 w-3" />
          {user}
        </GlowBadge>
        <GlowButton variant="ghost" size="sm" onClick={logout}>
          <LogOut className="mr-1.5 h-3.5 w-3.5" />
          Logout
        </GlowButton>
      </div>
    </div>
  )
}
