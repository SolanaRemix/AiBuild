import type { Metadata } from "next"
import { ProjectCard } from "@/components/dashboard/project-card"
import { NewProjectDialog } from "@/components/dashboard/new-project-dialog"
import { GlowBadge } from "@/components/aura"
import { mockProjects } from "@/lib/mock-data"

export const metadata: Metadata = {
  title: "Projects",
}

export default function ProjectsPage() {
  const projectsByStatus = {
    all: mockProjects,
    deployed: mockProjects.filter((p) => p.status === "deployed"),
    building: mockProjects.filter((p) => p.status === "building"),
    draft: mockProjects.filter((p) => p.status === "draft"),
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Projects
          </h1>
          <p className="text-sm text-muted-foreground">
            All your AiBuild projects in one place
          </p>
        </div>
        <NewProjectDialog />
      </div>

      {/* Status summary */}
      <div className="flex flex-wrap gap-3">
        <GlowBadge variant="cyan">
          {projectsByStatus.all.length} total
        </GlowBadge>
        <GlowBadge variant="success">
          {projectsByStatus.deployed.length} deployed
        </GlowBadge>
        <GlowBadge variant="warning">
          {projectsByStatus.building.length} building
        </GlowBadge>
        <GlowBadge>
          {projectsByStatus.draft.length} draft
        </GlowBadge>
      </div>

      {/* Project grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
