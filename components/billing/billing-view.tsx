"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import {
  CreditCard,
  Zap,
  TrendingUp,
  Download,
  ArrowUpRight,
  Brain,
  Globe,
  Smartphone,
} from "lucide-react"

const currentPlan = {
  name: "Free",
  price: "$0",
  period: "/month",
  limits: {
    projects: "5 projects",
    builds: "20 builds/month",
    models: "Free models only",
    storage: "1 GB",
  },
  nextBilling: "N/A",
}

const usageStats = [
  { label: "Projects Used", current: 4, max: 5, icon: Globe },
  { label: "Builds This Month", current: 12, max: 20, icon: Smartphone },
  { label: "AI Generations", current: 38, max: 100, icon: Brain },
  { label: "Storage Used", current: 0.3, max: 1, icon: TrendingUp, unit: "GB" },
]

const invoices = [
  { id: "inv_001", date: "2026-02-01", amount: "$0.00", status: "paid", plan: "Free" },
  { id: "inv_002", date: "2026-01-01", amount: "$0.00", status: "paid", plan: "Free" },
]

const plans = [
  {
    name: "Free",
    price: "$0",
    current: true,
    features: ["5 projects", "20 builds/month", "Free models only", "1 GB storage"],
  },
  {
    name: "Pro",
    price: "$29",
    current: false,
    features: ["Unlimited projects", "200 builds/month", "All models", "10 GB storage", "Priority support"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    current: false,
    features: ["Unlimited everything", "Custom models", "SSO", "SLA", "Dedicated support"],
  },
]

export function BillingView() {
  const [activeTab, setActiveTab] = useState<"overview" | "usage" | "invoices">("overview")

  const tabs = [
    { id: "overview" as const, label: "Overview" },
    { id: "usage" as const, label: "Usage" },
    { id: "invoices" as const, label: "Invoices" },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Billing
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your plan, usage, and payment methods
          </p>
        </div>
        <GlowButton variant="purple">
          <Zap className="mr-2 h-4 w-4" />
          Upgrade Plan
        </GlowButton>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="flex flex-col gap-6">
          {/* Current plan */}
          <GlowCard variant="cyan" className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-lg font-semibold text-foreground">
                    {currentPlan.name} Plan
                  </h2>
                  <GlowBadge variant="cyan">Current</GlowBadge>
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {currentPlan.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    {currentPlan.period}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                {Object.values(currentPlan.limits).map((limit) => (
                  <span key={limit} className="text-sm text-muted-foreground">
                    {limit}
                  </span>
                ))}
              </div>
            </div>
          </GlowCard>

          {/* Plans comparison */}
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Available Plans
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {plans.map((plan) => (
                <GlowCard
                  key={plan.name}
                  variant={plan.current ? "cyan" : "default"}
                  className="p-5"
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-foreground">
                        {plan.name}
                      </h3>
                      {plan.current && (
                        <GlowBadge variant="success">Active</GlowBadge>
                      )}
                    </div>
                    <p className="text-2xl font-bold text-foreground">
                      {plan.price}
                      {plan.price !== "Custom" && (
                        <span className="text-sm font-normal text-muted-foreground">/mo</span>
                      )}
                    </p>
                    <ul className="flex flex-col gap-2">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <GlowButton
                      variant={plan.current ? "ghost" : "outline"}
                      size="sm"
                      className="mt-auto"
                      disabled={plan.current}
                    >
                      {plan.current ? "Current Plan" : "Upgrade"}
                      {!plan.current && <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />}
                    </GlowButton>
                  </div>
                </GlowCard>
              ))}
            </div>
          </div>

          {/* Payment method */}
          <GlowCard className="p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    No payment method
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Add a card to upgrade your plan
                  </p>
                </div>
              </div>
              <GlowButton size="sm" variant="outline">
                Add Card
              </GlowButton>
            </div>
          </GlowCard>
        </div>
      )}

      {activeTab === "usage" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {usageStats.map((stat) => {
            const Icon = stat.icon
            const pct = (stat.current / stat.max) * 100
            return (
              <GlowCard key={stat.label} className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                    <p className="text-xl font-bold text-foreground mt-1">
                      {stat.current}
                      <span className="text-sm font-normal text-muted-foreground">
                        {" "}/ {stat.max}{stat.unit ? ` ${stat.unit}` : ""}
                      </span>
                    </p>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground mt-1.5 block">
                  {pct.toFixed(0)}% used
                </span>
              </GlowCard>
            )
          })}
        </div>
      )}

      {activeTab === "invoices" && (
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-5 gap-4 bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>Invoice</span>
            <span>Date</span>
            <span>Plan</span>
            <span>Amount</span>
            <span>Actions</span>
          </div>
          {invoices.map((inv) => (
            <div
              key={inv.id}
              className="grid grid-cols-5 gap-4 border-t border-border px-4 py-3 text-sm items-center"
            >
              <span className="font-mono text-xs text-muted-foreground">{inv.id}</span>
              <span className="text-muted-foreground">{inv.date}</span>
              <GlowBadge>{inv.plan}</GlowBadge>
              <span className="text-foreground font-medium">{inv.amount}</span>
              <button className="flex items-center gap-1 text-xs text-primary hover:underline">
                <Download className="h-3 w-3" />
                PDF
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
