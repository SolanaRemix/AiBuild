import type { Metadata } from "next"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ProjectCard } from "@/components/dashboard/project-card"
import { NewProjectDialog } from "@/components/dashboard/new-project-dialog"
import { mockProjects } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Dashboard",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Overview of your AiBuild projects and activity
          </p>
        </div>
        <NewProjectDialog />
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Projects */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Recent Projects
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
