import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockBilling, mockInvoices } from "@/lib/mock-data"
import { CreditCard, Calendar, TrendingUp } from "lucide-react"

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

export default function BillingPage() {
  const { plan, usage, nextBillingDate, amountDue } = mockBilling

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Billing</h1>
        <p className="text-sm text-muted-foreground">Manage your plan, usage, and payment methods</p>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        <GlowCard variant="cyan" className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Current Plan</span>
              <p className="text-2xl font-bold text-foreground capitalize mt-1">{plan}</p>
            </div>
            <GlowBadge variant="cyan">${amountDue}/mo</GlowBadge>
          </div>
        </GlowCard>
        <GlowCard className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Next Billing</span>
              <p className="text-lg font-semibold text-foreground mt-1">{new Date(nextBillingDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
          </div>
        </GlowCard>
        <GlowCard className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Total Requests</span>
              <p className="text-lg font-semibold text-foreground mt-1">{usage.requests.toLocaleString()}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-4 w-4 text-primary" />
            </div>
          </div>
        </GlowCard>
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
