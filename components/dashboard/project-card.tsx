import { GlowCard, GlowBadge } from "@/components/aura"
import type { Project } from "@/lib/types"
import Link from "next/link"
import { Globe, Smartphone, Monitor, ArrowRight } from "lucide-react"

const targetIcons = {
  web: Globe,
  mobile: Smartphone,
  desktop: Monitor,
}

const statusVariants = {
  draft: "default" as const,
  ready: "cyan" as const,
  synced: "purple" as const,
  deployed: "success" as const,
  building: "warning" as const,
}

export function ProjectCard({ project }: { project: Project }) {
  const TargetIcon = targetIcons[project.primaryTarget]

  return (
    <Link href={`/projects/${project.id}`}>
      <GlowCard className="group cursor-pointer p-5 h-full">
        <div className="flex flex-col gap-3 h-full">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <TargetIcon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {project.name}
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {project.slug}
                </span>
              </div>
            </div>
            <GlowBadge variant={statusVariants[project.status]}>
              {project.status}
            </GlowBadge>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {project.prompt}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <GlowBadge>{project.primaryTarget}</GlowBadge>
              <GlowBadge>{project.templateType}</GlowBadge>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </GlowCard>
    </Link>
  )
}
