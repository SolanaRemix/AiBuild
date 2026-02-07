import type { Metadata } from "next"
import { AdminAgentsView } from "@/components/admin/admin-agents-view"

export const metadata: Metadata = {
  title: "Admin / Agents",
}

export default function AdminAgentsPage() {
  return <AdminAgentsView />
}
