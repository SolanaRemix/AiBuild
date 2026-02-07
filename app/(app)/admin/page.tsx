import type { Metadata } from "next"
import { AdminUsersView } from "@/components/admin/admin-users-view"

export const metadata: Metadata = {
  title: "Admin / Users",
}

export default function AdminPage() {
  return <AdminUsersView />
}
