"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton, GlowInput } from "@/components/aura"
import {
  Receipt,
  Check,
  Pencil,
  X,
  Users,
  Zap,
  Crown,
  Infinity,
} from "lucide-react"

interface PlanConfig {
  id: string
  name: string
  slug: string
  monthlyPrice: number
  yearlyPrice: number
  projectLimit: number | null
  generationsPerDay: number | null
  deploymentsPerMonth: number | null
  features: string[]
  highlighted: boolean
  subscribers: number
  mrr: number
}

const mockPlans: PlanConfig[] = [
  {
    id: "plan_free",
    name: "Free",
    slug: "free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    projectLimit: 3,
    generationsPerDay: 10,
    deploymentsPerMonth: 5,
    features: [
      "3 active projects",
      "10 AI generations per day",
      "5 deployments per month",
      "Community support",
      "Free-tier models only",
    ],
    highlighted: false,
    subscribers: 2847,
    mrr: 0,
  },
  {
    id: "plan_pro",
    name: "Pro",
    slug: "pro",
    monthlyPrice: 29,
    yearlyPrice: 290,
    projectLimit: 25,
    generationsPerDay: 100,
    deploymentsPerMonth: 50,
    features: [
      "25 active projects",
      "100 AI generations per day",
      "50 deployments per month",
      "Priority support",
      "All model providers",
      "Custom agents",
      "Webhooks & API access",
    ],
    highlighted: true,
    subscribers: 412,
    mrr: 11948,
  },
  {
    id: "plan_team",
    name: "Team",
    slug: "team",
    monthlyPrice: 79,
    yearlyPrice: 790,
    projectLimit: null,
    generationsPerDay: null,
    deploymentsPerMonth: null,
    features: [
      "Unlimited projects",
      "Unlimited generations",
      "Unlimited deployments",
      "Dedicated support",
      "All model providers",
      "Custom agents",
      "Webhooks & API access",
      "Team collaboration",
      "Audit logs",
    ],
    highlighted: false,
    subscribers: 67,
    mrr: 5293,
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    slug: "enterprise",
    monthlyPrice: 0,
    yearlyPrice: 0,
    projectLimit: null,
    generationsPerDay: null,
    deploymentsPerMonth: null,
    features: [
      "Everything in Team",
      "Custom SLA",
      "SSO / SAML",
      "On-premise deployment",
      "Dedicated account manager",
      "Custom model hosting",
    ],
    highlighted: false,
    subscribers: 8,
    mrr: 12400,
  },
]

const planIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  free: Zap,
  pro: Crown,
  team: Users,
  enterprise: Infinity,
}

export function AdminPlansView() {
  const [plans, setPlans] = useState(mockPlans)
  const [editingPlan, setEditingPlan] = useState<PlanConfig | null>(null)

  const totalMrr = plans.reduce((acc, p) => acc + p.mrr, 0)
  const totalSubscribers = plans.reduce((acc, p) => acc + p.subscribers, 0)

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Plans & Billing
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure subscription plans, pricing tiers, and billing limits
          </p>
        </div>
        <GlowButton size="sm">
          <Receipt className="mr-1.5 h-3.5 w-3.5" />
          Add Plan
        </GlowButton>
      </div>

      {/* Revenue stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <GlowCard variant="cyan" className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Monthly Recurring Revenue
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            ${totalMrr.toLocaleString()}
          </p>
        </GlowCard>
        <GlowCard className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Total Subscribers
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {totalSubscribers.toLocaleString()}
          </p>
        </GlowCard>
        <GlowCard className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Active Plans
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {plans.length}
          </p>
        </GlowCard>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {plans.map((plan) => {
          const Icon = planIcons[plan.slug] || Zap
          return (
            <GlowCard
              key={plan.id}
              variant={plan.highlighted ? "cyan" : "default"}
              className="p-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                        plan.highlighted
                          ? "bg-primary/15"
                          : "bg-muted"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          plan.highlighted
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground">
                          {plan.name}
                        </h3>
                        {plan.highlighted && (
                          <GlowBadge variant="cyan">Popular</GlowBadge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {plan.monthlyPrice === 0 && plan.slug !== "enterprise"
                          ? "Free forever"
                          : plan.slug === "enterprise"
                            ? "Custom pricing"
                            : `$${plan.monthlyPrice}/mo or $${plan.yearlyPrice}/yr`}
                      </p>
                    </div>
                  </div>
                  <GlowButton
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingPlan(plan)}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    <span className="sr-only">Edit plan</span>
                  </GlowButton>
                </div>

                {/* Limits */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-md bg-muted/50 border border-border px-3 py-2 text-center">
                    <p className="text-xs text-muted-foreground">Projects</p>
                    <p className="text-sm font-semibold text-foreground">
                      {plan.projectLimit ?? "Unlimited"}
                    </p>
                  </div>
                  <div className="rounded-md bg-muted/50 border border-border px-3 py-2 text-center">
                    <p className="text-xs text-muted-foreground">Gens/day</p>
                    <p className="text-sm font-semibold text-foreground">
                      {plan.generationsPerDay ?? "Unlimited"}
                    </p>
                  </div>
                  <div className="rounded-md bg-muted/50 border border-border px-3 py-2 text-center">
                    <p className="text-xs text-muted-foreground">Deploys/mo</p>
                    <p className="text-sm font-semibold text-foreground">
                      {plan.deploymentsPerMonth ?? "Unlimited"}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-1.5">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check className="h-3.5 w-3.5 text-success shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Footer stats */}
                <div className="flex items-center justify-between pt-3 border-t border-border text-xs text-muted-foreground">
                  <span>{plan.subscribers.toLocaleString()} subscribers</span>
                  <span>
                    {plan.mrr > 0
                      ? `$${plan.mrr.toLocaleString()} MRR`
                      : "No revenue"}
                  </span>
                </div>
              </div>
            </GlowCard>
          )
        })}
      </div>

      {/* Edit modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 glass p-4">
          <GlowCard variant="cyan" className="w-full max-w-lg max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="text-lg font-semibold text-foreground">
                Edit: {editingPlan.name} Plan
              </h2>
              <button
                onClick={() => setEditingPlan(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <form className="flex flex-col gap-5">
                <GlowInput
                  id="plan-name"
                  label="Plan Name"
                  defaultValue={editingPlan.name}
                />
                <div className="grid grid-cols-2 gap-4">
                  <GlowInput
                    id="monthly-price"
                    label="Monthly Price ($)"
                    type="number"
                    defaultValue={editingPlan.monthlyPrice}
                  />
                  <GlowInput
                    id="yearly-price"
                    label="Yearly Price ($)"
                    type="number"
                    defaultValue={editingPlan.yearlyPrice}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <GlowInput
                    id="project-limit"
                    label="Project Limit"
                    type="number"
                    defaultValue={editingPlan.projectLimit ?? ""}
                    placeholder="Unlimited"
                  />
                  <GlowInput
                    id="gen-limit"
                    label="Gens / Day"
                    type="number"
                    defaultValue={editingPlan.generationsPerDay ?? ""}
                    placeholder="Unlimited"
                  />
                  <GlowInput
                    id="deploy-limit"
                    label="Deploys / Mo"
                    type="number"
                    defaultValue={editingPlan.deploymentsPerMonth ?? ""}
                    placeholder="Unlimited"
                  />
                </div>
              </form>
            </div>

            <div className="flex items-center gap-3 pt-4 mt-4 border-t border-border shrink-0">
              <GlowButton className="flex-1" onClick={() => setEditingPlan(null)}>
                Save Changes
              </GlowButton>
              <GlowButton variant="ghost" onClick={() => setEditingPlan(null)}>
                Cancel
              </GlowButton>
            </div>
          </GlowCard>
        </div>
      )}
    </div>
  )
}
