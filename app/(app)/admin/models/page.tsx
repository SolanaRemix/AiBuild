import type { Metadata } from "next"
import { ModelManagement } from "@/components/admin/model-management"
import { mockModels } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Admin / Models",
}

export default function AdminModelsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Model Registry
        </h1>
        <p className="text-sm text-muted-foreground">
          Configure AI model providers, routing policies, and capabilities
        </p>
      </div>
      <ModelManagement initialModels={mockModels} />
    </div>
  )
}
