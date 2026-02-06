"use client"

import { GlowButton } from "@/components/aura"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative flex flex-col items-center px-4 pt-24 pb-20 text-center lg:pt-36 lg:pb-28">
      {/* Announcement chip */}
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-glow-cyan bg-primary/5 px-4 py-1.5 text-sm text-primary">
        <Sparkles className="h-3.5 w-3.5" />
        <span>CyberAi Multi-Model Agent is live</span>
      </div>

      <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-7xl">
        Build anything with{" "}
        <span className="text-primary text-glow-cyan">AI</span>
      </h1>

      <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
        Prompt to project to deploy. AiBuild is a governed, multi-model AI code
        builder that ships web, mobile, and desktop apps from a single prompt.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link href="/dashboard">
          <GlowButton size="lg">
            Start Building
            <ArrowRight className="ml-2 h-4 w-4" />
          </GlowButton>
        </Link>
        <Link href="/projects">
          <GlowButton variant="outline" size="lg">
            View Projects
          </GlowButton>
        </Link>
      </div>

      {/* Prompt preview demo */}
      <div className="mt-16 w-full max-w-3xl">
        <div className="rounded-lg border border-border bg-card p-4 text-left">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-3 w-3 rounded-full bg-destructive/50" />
            <div className="h-3 w-3 rounded-full bg-warning/50" />
            <div className="h-3 w-3 rounded-full bg-success/50" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">
              cyberai-terminal
            </span>
          </div>
          <div className="space-y-2 font-mono text-sm">
            <p className="text-muted-foreground">
              <span className="text-primary">$</span> Enter your prompt:
            </p>
            <p className="text-foreground">
              {'"Build a minimal multi-platform AI wallet app with crypto tracking and portfolio analytics."'}
            </p>
            <p className="text-muted-foreground mt-3">
              <span className="text-success">{">"}</span> CyberAi routing to{" "}
              <span className="text-primary">gemini-2.0-flash</span> (free
              tier)
            </p>
            <p className="text-muted-foreground">
              <span className="text-success">{">"}</span> Generating plan: 3
              pages, 5 components, 1 API route
            </p>
            <p className="text-muted-foreground">
              <span className="text-success">{">"}</span> Project{" "}
              <span className="text-foreground">ai-wallet-app</span> created
              successfully
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
