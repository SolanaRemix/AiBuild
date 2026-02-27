"use client"

import { useRouter } from "next/navigation"
import { GlowButton, GlowInput, GlowShell, GlowCard } from "@/components/aura"
import { Zap, Lock } from "lucide-react"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/dashboard")
  }

  return (
    <GlowShell>
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary glow-blue">
              <Zap className="h-7 w-7 text-primary-foreground" />
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Welcome to AiBuild
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in to access your dashboard
              </p>
            </div>
          </div>

          <GlowCard variant="cyan" className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <GlowInput
                id="email"
                label="Email"
                type="email"
                placeholder="admin@aibuild.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <GlowInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <GlowButton type="submit" className="mt-2 w-full">
                <Lock className="mr-2 h-4 w-4" />
                Sign In
              </GlowButton>
            </form>
          </GlowCard>

          <div className="mt-6 space-y-1 text-center text-xs text-muted-foreground">
            <p className="font-medium">Demo — no password required</p>
            <p>admin@aibuild.dev / user@aibuild.dev / dev@aibuild.dev</p>
          </div>
        </div>
      </div>
    </GlowShell>
  )
}
