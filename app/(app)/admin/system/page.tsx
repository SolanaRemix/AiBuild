import type { Metadata } from "next"
import { AdminSystemView } from "@/components/admin/admin-system-view"

export const metadata: Metadata = {
  title: "Admin / System",
}

export default function AdminSystemPage() {
  return <AdminSystemView />
}
