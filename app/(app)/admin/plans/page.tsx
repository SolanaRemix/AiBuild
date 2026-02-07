import type { Metadata } from "next"
import { AdminPlansView } from "@/components/admin/admin-plans-view"

export const metadata: Metadata = {
  title: "Admin / Plans & Billing",
}

export default function AdminPlansPage() {
  return <AdminPlansView />
}
