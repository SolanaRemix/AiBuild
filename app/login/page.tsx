"use client"

import { useState, type FormEvent } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { GlowButton, GlowInput, GlowShell, GlowCard } from "@/components/aura"
import { Zap, Lock, AlertCircle, Loader2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        setLoading(false)
        return
      }

      // Redirect based on role will be handled by middleware
      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setError("An error occurred. Please try again.")
      setLoading(false)
    }
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

          <GlowCard variant="cyan" hover={false} className="p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" data-testid="login-form">
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <GlowInput
                id="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={loading}
                data-testid="email-input"
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
                disabled={loading}
                data-testid="password-input"
              />

              <GlowButton 
                type="submit" 
                disabled={loading} 
                className="mt-2 w-full"
                data-testid="signin-button"
              >
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

          <div className="mt-6 space-y-2 text-center text-xs text-muted-foreground">
            <p>Demo credentials:</p>
            <p>Admin: admin@admin.com / Admin123$</p>
            <p>User: user@aibuild.com / Admin123$</p>
            <p>Dev: dev@aibuild.com / Admin123$</p>
          </div>
        </div>
      </div>
    </GlowShell>
  )
}
