import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockPlans } from "@/lib/mock-data"
import { Receipt, Check } from "lucide-react"

const tierVariant = {
  free: "default" as const,
  pro: "cyan" as const,
  enterprise: "purple" as const,
}

export default function AdminPlansPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Plans & Billing</h1>
        <p className="text-sm text-muted-foreground">Configure plan tiers, limits, and model access</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockPlans.map((plan) => (
          <GlowCard key={plan.tier} variant={tierVariant[plan.tier]} className="p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                <GlowBadge variant={tierVariant[plan.tier]}>{plan.tier}</GlowBadge>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-success" />
                  {plan.limits.projects === -1 ? "Unlimited" : plan.limits.projects} projects
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-success" />
                  {plan.limits.builds === -1 ? "Unlimited" : plan.limits.builds} builds
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-success" />
                  {plan.limits.requests === -1 ? "Unlimited" : plan.limits.requests.toLocaleString()} requests
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-4 border-t border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Model Access</span>
                <div className="flex flex-wrap gap-1.5">
                  {plan.modelAccess.map((model) => (
                    <GlowBadge key={model} variant="cyan">{model}</GlowBadge>
                  ))}
                </div>
              </div>
              <GlowButton size="sm" variant="outline" className="mt-2">Edit Plan</GlowButton>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
