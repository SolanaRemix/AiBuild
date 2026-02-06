import type { Metadata } from "next"
import { AdminOverview } from "@/components/admin/admin-overview"
import { ModelManagement } from "@/components/admin/model-management"
import { TraceLogViewer } from "@/components/admin/trace-log-viewer"
import { mockModels, mockTraceLogs } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Admin Panel",
}

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Admin Panel
        </h1>
        <p className="text-sm text-muted-foreground">
          System overview, model configuration, and observability
        </p>
      </div>

      {/* Overview stats */}
      <AdminOverview />

      {/* Model management */}
      <ModelManagement initialModels={mockModels} />

      {/* Trace logs */}
      <TraceLogViewer logs={mockTraceLogs} />
    </div>
  )
}
