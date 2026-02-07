import { GlowCard, GlowButton } from "@/components/aura"
import { Gift, Percent, Users, DollarSign } from "lucide-react"

export default function AdminAffiliatePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Affiliate Config</h1>
        <p className="text-sm text-muted-foreground">Configure commission rates, payout rules, and approval flows</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <GlowCard variant="cyan" className="p-5">
          <div className="flex items-start justify-between">
            <div><span className="text-sm text-muted-foreground">Commission Rate</span><p className="text-2xl font-bold text-foreground mt-1">20%</p></div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><Percent className="h-4 w-4 text-primary" /></div>
          </div>
        </GlowCard>
        <GlowCard className="p-5">
          <div className="flex items-start justify-between">
            <div><span className="text-sm text-muted-foreground">Total Affiliates</span><p className="text-2xl font-bold text-foreground mt-1">28</p></div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><Users className="h-4 w-4 text-primary" /></div>
          </div>
        </GlowCard>
        <GlowCard className="p-5">
          <div className="flex items-start justify-between">
            <div><span className="text-sm text-muted-foreground">Total Payouts</span><p className="text-2xl font-bold text-foreground mt-1">$1,240</p></div>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><DollarSign className="h-4 w-4 text-primary" /></div>
          </div>
        </GlowCard>
      </div>

      <GlowCard className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Payout Rules</h2>
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-muted-foreground">Minimum Payout</label>
              <input type="number" defaultValue={50} className="rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-glow-cyan focus:glow-blue transition-all" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-muted-foreground">Payout Frequency</label>
              <select className="rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-glow-cyan focus:glow-blue transition-all">
                <option>Monthly</option>
                <option>Bi-weekly</option>
                <option>Weekly</option>
              </select>
            </div>
          </div>
          <GlowButton size="sm" className="self-start">Save Rules</GlowButton>
        </div>
      </GlowCard>
    </div>
  )
}
