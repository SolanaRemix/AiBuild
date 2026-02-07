import { GlowCard, GlowButton, GlowBadge } from "@/components/aura"
import { User, Mail, Key, Shield, Trash2 } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account preferences and security</p>
      </div>

      {/* Profile */}
      <GlowCard className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Profile</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">Developer</p>
              <p className="text-sm text-muted-foreground">dev@aibuild.dev</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-muted-foreground">Display Name</label>
              <input
                type="text"
                defaultValue="Developer"
                className="rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-glow-cyan focus:glow-blue transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <input
                type="email"
                defaultValue="dev@aibuild.dev"
                className="rounded-lg border border-border bg-muted px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-glow-cyan focus:glow-blue transition-all"
              />
            </div>
          </div>
          <div>
            <GlowButton size="sm">Save Changes</GlowButton>
          </div>
        </div>
      </GlowCard>

      {/* Security */}
      <GlowCard className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Security</h2>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              <Key className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Password</p>
                <p className="text-xs text-muted-foreground">Last changed 30 days ago</p>
              </div>
            </div>
            <GlowButton size="sm" variant="outline">Change</GlowButton>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
              </div>
            </div>
            <GlowBadge variant="warning">Not Enabled</GlowBadge>
          </div>
        </div>
      </GlowCard>

      {/* Danger zone */}
      <GlowCard className="p-6 border-destructive/20">
        <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4">
          <div className="flex items-center gap-3">
            <Trash2 className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-sm font-medium text-foreground">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
            </div>
          </div>
          <GlowButton size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
            Delete
          </GlowButton>
        </div>
      </GlowCard>
    </div>
  )
}
