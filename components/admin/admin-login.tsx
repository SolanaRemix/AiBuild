"use client"

import { useState, type FormEvent } from "react"
import { useAdminAuth } from "@/lib/admin-auth"
import { GlowButton, GlowInput, GlowShell, GlowCard } from "@/components/aura"
import { Zap, Lock, AlertCircle, Loader2 } from "lucide-react"

export function AdminLogin() {
  const { login } = useAdminAuth()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(username, password)

    if (!result.success) {
      setError(result.error || "Invalid credentials")
    }

    setLoading(false)
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
                Admin Panel
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Sign in to access the AiBuild admin dashboard
              </p>
            </div>
          </div>

          <GlowCard variant="cyan" hover={false} className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <GlowInput
                id="username"
                label="Username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                disabled={loading}
              />

              <GlowInput
                id="password"
                label="Password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
              />

              <GlowButton type="submit" disabled={loading} className="mt-2 w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                )}
              </GlowButton>
            </form>
          </GlowCard>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Protected area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </GlowShell>
  )
}
