import { GlowCard, GlowBadge } from "@/components/aura"
import { mockModels } from "@/lib/mock-data"
import { Check, X } from "lucide-react"

export function ModelsSection() {
  return (
    <section className="px-4 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Powered by every model
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            CyberAi dynamically routes tasks to the best available model.
            Configure, enable, and monitor from the admin panel.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockModels.map((model) => (
            <GlowCard
              key={model.id}
              variant={model.enabled ? "cyan" : "default"}
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">
                    {model.name}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    {model.enabled ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <X className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span
                      className={`text-xs ${model.enabled ? "text-success" : "text-muted-foreground"}`}
                    >
                      {model.enabled ? "Active" : "Disabled"}
                    </span>
                  </div>
                </div>
                <code className="text-sm font-mono text-muted-foreground">
                  {model.modelId}
                </code>
                <div className="flex flex-wrap gap-1.5">
                  {model.capabilities.map((cap) => (
                    <GlowBadge key={cap} variant="cyan">
                      {cap}
                    </GlowBadge>
                  ))}
                  <GlowBadge
                    variant={model.costTier === "free" ? "success" : "warning"}
                  >
                    {model.costTier}
                  </GlowBadge>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  )
}
