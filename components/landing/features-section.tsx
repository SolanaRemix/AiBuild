import { GlowCard } from "@/components/aura"
import {
  Brain,
  GitBranch,
  Rocket,
  Shield,
  Layers,
  Terminal,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Multi-Model Agent",
    description:
      "CyberAi orchestrates GPT, Gemini, Claude, Grok, and open models through a unified routing policy. Always picks the best model for the task.",
    variant: "cyan" as const,
  },
  {
    icon: Layers,
    title: "Web, Mobile, Desktop",
    description:
      "Target any platform from a single prompt. Next.js for web, React Native for mobile APKs, Electron/Tauri for desktop installers.",
    variant: "purple" as const,
  },
  {
    icon: GitBranch,
    title: "GitHub Sync",
    description:
      "One-click sync to GitHub with automatic branch naming. Full version control for every generated artifact.",
    variant: "default" as const,
  },
  {
    icon: Rocket,
    title: "Instant Deploy",
    description:
      "Deploy to Vercel with auto-configuration. Build APKs and desktop binaries through the build orchestrator.",
    variant: "cyan" as const,
  },
  {
    icon: Shield,
    title: "Full Observability",
    description:
      "Every AI call is logged. Prompt logs, trace logs, sensors, and analyzers give you complete visibility into the generation pipeline.",
    variant: "default" as const,
  },
  {
    icon: Terminal,
    title: "Fix Memory",
    description:
      "CyberAi remembers fixes and patches per project. Known issues are automatically detected and resolved in future generations.",
    variant: "purple" as const,
  },
]

export function FeaturesSection() {
  return (
    <section className="px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything you need to ship
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            A factory for code, not a playground. Every artifact is reproducible,
            observable, and debuggable.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <GlowCard key={feature.title} variant={feature.variant}>
                <div className="flex flex-col gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </GlowCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
