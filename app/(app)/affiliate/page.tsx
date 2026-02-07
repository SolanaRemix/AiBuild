"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockAffiliate } from "@/lib/mock-data"
import { Copy, Check, Link2, Users, TrendingUp, DollarSign, Percent } from "lucide-react"

export default function AffiliatePage() {
  const [copied, setCopied] = useState(false)
  const stats = mockAffiliate

  const handleCopy = () => {
    navigator.clipboard.writeText(stats.referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Affiliate Program</h1>
        <p className="text-sm text-muted-foreground">Earn by referring developers to AiBuild</p>
      </div>

      {/* Referral link */}
      <GlowCard variant="cyan" className="p-6">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Your Referral Link</h2>
        <div className="flex items-center gap-3">
          <div className="flex-1 flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-4 py-2.5">
            <Link2 className="h-4 w-4 text-primary shrink-0" />
            <span className="text-sm font-mono text-foreground truncate">{stats.referralLink}</span>
          </div>
          <GlowButton size="sm" onClick={handleCopy}>
            {copied ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </GlowButton>
        </div>
      </GlowCard>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Clicks", value: stats.clicks.toLocaleString(), icon: TrendingUp, variant: "default" as const },
          { label: "Signups", value: stats.signups.toLocaleString(), icon: Users, variant: "cyan" as const },
          { label: "Conversions", value: stats.conversions.toLocaleString(), icon: TrendingUp, variant: "purple" as const },
          { label: "Earned", value: `$${stats.earned}`, icon: DollarSign, variant: "cyan" as const },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <GlowCard key={stat.label} variant={stat.variant} className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </GlowCard>
          )
        })}
      </div>

      {/* Commission info */}
      <GlowCard className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Percent className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Commission Details</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <span className="text-sm text-muted-foreground">Commission Rate</span>
            <p className="text-2xl font-bold text-primary mt-1">{stats.commissionRate * 100}%</p>
            <p className="text-xs text-muted-foreground mt-1">Per conversion on first payment</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <span className="text-sm text-muted-foreground">Conversion Rate</span>
            <p className="text-2xl font-bold text-foreground mt-1">
              {stats.clicks > 0 ? ((stats.conversions / stats.clicks) * 100).toFixed(1) : 0}%
            </p>
            <p className="text-xs text-muted-foreground mt-1">From clicks to paid conversions</p>
          </div>
        </div>
      </GlowCard>

      {/* Assets */}
      <GlowCard className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Marketing Assets</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { name: "Banner 728x90", type: "Image" },
            { name: "Banner 300x250", type: "Image" },
            { name: "Email Copy - Launch", type: "Text" },
            { name: "Social Post Template", type: "Text" },
          ].map((asset) => (
            <div key={asset.name} className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3">
              <div>
                <p className="text-sm font-medium text-foreground">{asset.name}</p>
                <p className="text-xs text-muted-foreground">{asset.type}</p>
              </div>
              <GlowButton size="sm" variant="ghost">Download</GlowButton>
            </div>
          ))}
        </div>
      </GlowCard>
    </div>
  )
}
