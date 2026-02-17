"use client"

import { useAdminAuth } from "@/lib/admin-auth"
import { AdminLogin } from "./admin-login"
import { Loader2 } from "lucide-react"
import { GlowShell } from "@/components/aura"
import type { ReactNode } from "react"

export function AdminGuard({ children }: { children: ReactNode }) {
  const { authenticated, loading } = useAdminAuth()

  if (loading) {
    return (
      <GlowShell>
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </GlowShell>
    )
  }

  if (!authenticated) {
    return <AdminLogin />
  }

  return <>{children}</>
}
