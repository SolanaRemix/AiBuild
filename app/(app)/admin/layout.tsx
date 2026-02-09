"use client"

import { AdminAuthProvider } from "@/lib/admin-auth"
import { AdminGuard } from "@/components/admin/admin-guard"
import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminGuard>{children}</AdminGuard>
    </AdminAuthProvider>
  )
}
