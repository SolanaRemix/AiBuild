import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockBilling, mockInvoices } from "@/lib/mock-data"
import { CreditCard, Calendar, TrendingUp, Zap, ArrowUpRight, Check } from "lucide-react"

function UsageBar({ label, used, limit }: { label: string; used: number; limit: number }) {
  const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{used.toLocaleString()} / {limit > 0 ? limit.toLocaleString() : "Unlimited"}</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

const plans = [
  {
    name: "Free",
    price: 0,
    features: ["100 API requests/mo", "3 Projects", "5 Builds/mo", "Community support"],
  },
  {
    name: "Pro",
    price: 29,
    features: ["10,000 API requests/mo", "Unlimited Projects", "Unlimited Builds", "Priority support", "Advanced AI models"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    features: ["Unlimited API requests", "Unlimited Projects", "Unlimited Builds", "24/7 dedicated support", "All AI models", "Custom integrations"],
  },
]

export default function BillingPage() {
  const { plan, usage, nextBillingDate, amountDue } = mockBilling

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing & Plans</h1>
        <p className="text-muted-foreground">Manage your subscription, usage, and payment methods</p>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <GlowCard variant="cyan" className="p-6 border-2 border-primary/30">
          <div className="flex items-start justify-between mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <GlowBadge variant="cyan">${amountDue}/mo</GlowBadge>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Current Plan</span>
            <p className="text-2xl font-bold text-foreground capitalize mt-1">{plan}</p>
          </div>
        </GlowCard>
        <GlowCard className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <Calendar className="h-5 w-5 text-foreground" />
            </div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Next Billing</span>
            <p className="text-lg font-semibold text-foreground mt-1">{new Date(nextBillingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
          </div>
        </GlowCard>
        <GlowCard className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
              <TrendingUp className="h-5 w-5 text-foreground" />
            </div>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Total Requests</span>
            <p className="text-lg font-semibold text-foreground mt-1">{usage.requests.toLocaleString()}</p>
          </div>
        </GlowCard>
      </div>

      {/* Plan Selection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Available Plans</h2>
          <span className="text-sm text-muted-foreground">Upgrade or downgrade anytime</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((planItem) => (
            <GlowCard 
              key={planItem.name}
              className={`p-6 ${planItem.popular ? 'border-2 border-primary/50 glow-blue' : ''} ${plan === planItem.name.toLowerCase() ? 'bg-muted/30' : ''}`}
            >
              {planItem.popular && (
                <GlowBadge variant="cyan" className="mb-3">Most Popular</GlowBadge>
              )}
              {plan === planItem.name.toLowerCase() && (
                <GlowBadge variant="success" className="mb-3">Current Plan</GlowBadge>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-1">{planItem.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-bold text-foreground">${planItem.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="flex flex-col gap-3 mb-6">
                {planItem.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <GlowButton 
                className="w-full" 
                variant={plan === planItem.name.toLowerCase() ? 'outline' : planItem.popular ? 'default' : 'outline'}
                disabled={plan === planItem.name.toLowerCase()}
              >
                {plan === planItem.name.toLowerCase() ? 'Current Plan' : 'Upgrade'}
                {plan !== planItem.name.toLowerCase() && <ArrowUpRight className="h-4 w-4 ml-1" />}
              </GlowButton>
            </GlowCard>
          ))}
        </div>
      </div>

      {/* Usage */}
      <GlowCard className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Usage</h2>
        <div className="flex flex-col gap-4">
          <UsageBar label="API Requests" used={usage.requests} limit={usage.requestsLimit} />
          <UsageBar label="Builds" used={usage.builds} limit={usage.buildsLimit} />
          <UsageBar label="Projects" used={usage.projects} limit={usage.projectsLimit} />
        </div>
      </GlowCard>

      {/* Payment */}
      <GlowCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Payment Method</h2>
          <GlowButton size="sm" variant="outline">Update Card</GlowButton>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-4">
          <CreditCard className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
            <p className="text-xs text-muted-foreground">Expires 12/2027</p>
          </div>
        </div>
      </GlowCard>

      {/* Invoices */}
      <GlowCard className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Invoices</h2>
        <div className="rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-4 gap-4 bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
            <span>Action</span>
          </div>
          {mockInvoices.map((inv) => (
            <div key={inv.id} className="grid grid-cols-4 gap-4 border-t border-border px-4 py-3 text-sm items-center">
              <span className="text-foreground">{new Date(inv.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              <span className="font-mono text-foreground">${inv.amount}</span>
              <GlowBadge variant={inv.status === "paid" ? "success" : inv.status === "pending" ? "warning" : "destructive"}>
                {inv.status}
              </GlowBadge>
              <button className="text-primary text-sm hover:underline text-left">Download</button>
            </div>
          ))}
        </div>
      </GlowCard>
    </div>
  )
}
