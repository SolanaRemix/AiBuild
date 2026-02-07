"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import {
  Users2,
  Link as LinkIcon,
  Copy,
  TrendingUp,
  DollarSign,
  MousePointerClick,
  UserPlus,
  Check,
  Image,
  FileText,
} from "lucide-react"

const affiliateStats = [
  { label: "Total Clicks", value: "1,247", change: "+84 this week", icon: MousePointerClick },
  { label: "Signups", value: "38", change: "+5 this week", icon: UserPlus },
  { label: "Conversions", value: "12", change: "31.6% rate", icon: TrendingUp },
  { label: "Earned", value: "$142.00", change: "$29 pending", icon: DollarSign },
]

const assets = [
  {
    type: "banner",
    name: "Hero Banner (1200x628)",
    description: "Large banner for social media and blog posts",
    icon: Image,
  },
  {
    type: "banner",
    name: "Sidebar Banner (300x250)",
    description: "Compact banner for sidebar placements",
    icon: Image,
  },
  {
    type: "copy",
    name: "Email Template",
    description: "Pre-written email copy for newsletters",
    icon: FileText,
  },
  {
    type: "copy",
    name: "Social Media Post",
    description: "Ready-to-post copy for Twitter/X and LinkedIn",
    icon: FileText,
  },
]

export function AffiliateView() {
  const [copied, setCopied] = useState(false)
  const referralLink = "https://aibuild.app/ref/user_1_abc123"

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Affiliate Program
          </h1>
          <p className="text-sm text-muted-foreground">
            Earn commissions by referring new users to AiBuild
          </p>
        </div>
        <GlowBadge variant="success">Active</GlowBadge>
      </div>

      {/* Referral link */}
      <GlowCard variant="cyan" className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">
              Your Referral Link
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 rounded-lg border border-border bg-muted px-4 py-2.5 font-mono text-sm text-foreground truncate">
              {referralLink}
            </div>
            <GlowButton size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="mr-1.5 h-3.5 w-3.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                  Copy
                </>
              )}
            </GlowButton>
          </div>
          <p className="text-sm text-muted-foreground">
            Share this link with your audience. You earn <span className="text-primary font-medium">20%</span> commission
            on every Pro plan signup within 30 days of the referral click.
          </p>
        </div>
      </GlowCard>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {affiliateStats.map((stat) => {
          const Icon = stat.icon
          return (
            <GlowCard key={stat.label} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  <span className="text-xs text-muted-foreground">{stat.change}</span>
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </div>
            </GlowCard>
          )
        })}
      </div>

      {/* Assets */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Marketing Assets
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {assets.map((asset) => {
            const Icon = asset.icon
            return (
              <GlowCard key={asset.name} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">
                      {asset.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {asset.description}
                    </p>
                    <GlowButton variant="ghost" size="sm" className="self-start mt-2">
                      Download
                    </GlowButton>
                  </div>
                </div>
              </GlowCard>
            )
          })}
        </div>
      </div>
    </div>
  )
}
