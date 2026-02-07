"use client"

import { ModelManagement } from "@/components/admin/model-management"
import { mockModels } from "@/lib/mock-data"

export default function AdminModelsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Models</h1>
        <p className="text-sm text-muted-foreground">Configure AI model providers, capabilities, and routing</p>
      </div>
      <ModelManagement initialModels={mockModels} />
    </div>
  )
}
