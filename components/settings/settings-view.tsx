"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton, GlowInput } from "@/components/aura"
import {
  User,
  Shield,
  Bell,
  Palette,
  Globe,
  Key,
  Trash2,
  Save,
} from "lucide-react"

type SettingsTab = "profile" | "security" | "notifications" | "appearance"

const tabs = [
  { id: "profile" as const, label: "Profile", icon: User },
  { id: "security" as const, label: "Security", icon: Shield },
  { id: "notifications" as const, label: "Notifications", icon: Bell },
  { id: "appearance" as const, label: "Appearance", icon: Palette },
]

export function SettingsView() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile save logic
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement password update logic
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account, security, and preferences
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Sidebar tabs */}
        <nav className="flex lg:flex-col gap-1 lg:w-48 shrink-0" aria-label="Settings sections">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            )
          })}
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeTab === "profile" && (
            <GlowCard className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Profile Information
              </h2>
              <form className="flex flex-col gap-5" onSubmit={handleProfileSubmit}>
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-2xl font-bold text-primary">U</span>
                  </div>
                  <div>
                    <GlowButton type="button" size="sm" variant="outline">
                      Change Avatar
                    </GlowButton>
                    <p className="text-xs text-muted-foreground mt-1">
                      JPG, PNG, or WebP. Max 2MB.
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <GlowInput id="first-name" label="First Name" defaultValue="Test" />
                  <GlowInput id="last-name" label="Last Name" defaultValue="User" />
                </div>
                <GlowInput id="email" label="Email" type="email" defaultValue="user@example.com" />
                <GlowInput id="username" label="Username" defaultValue="user_1" />
                <div className="flex items-center gap-3 pt-2">
                  <GlowButton type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </GlowButton>
                </div>
              </form>
            </GlowCard>
          )}

          {activeTab === "security" && (
            <div className="flex flex-col gap-6">
              <GlowCard className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Change Password
                </h2>
                <form className="flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
                  <GlowInput
                    id="current-password"
                    label="Current Password"
                    type="password"
                    placeholder="Enter current password"
                  />
                  <GlowInput
                    id="new-password"
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                  />
                  <GlowInput
                    id="confirm-password"
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                  <GlowButton type="submit" className="self-start">Update Password</GlowButton>
                </form>
              </GlowCard>

              <GlowCard className="p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  API Keys
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Manage your personal API keys for programmatic access.
                </p>
                <div className="rounded-lg border border-border p-4 bg-muted/30 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Personal Access Token
                      </p>
                      <code className="text-xs font-mono text-muted-foreground">
                        sk_live_...a3f8
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <GlowBadge variant="success">Active</GlowBadge>
                      <GlowButton size="sm" variant="ghost">
                        Revoke
                      </GlowButton>
                    </div>
                  </div>
                </div>
                <GlowButton variant="outline" size="sm">
                  <Key className="mr-2 h-3.5 w-3.5" />
                  Generate New Key
                </GlowButton>
              </GlowCard>

              <GlowCard className="p-6 border-destructive/20">
                <h2 className="text-lg font-semibold text-destructive mb-2">
                  Danger Zone
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete your account and all associated data.
                </p>
                <GlowButton variant="ghost" className="text-destructive hover:bg-destructive/10">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </GlowButton>
              </GlowCard>
            </div>
          )}

          {activeTab === "notifications" && (
            <GlowCard className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Notification Preferences
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Build completions", description: "Get notified when a build finishes or fails" },
                  { label: "Deployment status", description: "Updates on deployment progress and status changes" },
                  { label: "Agent activity", description: "Notifications when your agents complete tasks" },
                  { label: "Billing alerts", description: "Usage limits, upcoming invoices, and payment issues" },
                  { label: "Quest completions", description: "Celebrate when you complete a quest" },
                  { label: "Product updates", description: "New features and platform announcements" },
                ].map((pref) => (
                  <div
                    key={pref.label}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {pref.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {pref.description}
                      </p>
                    </div>
                    <button
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors"
                      role="switch"
                      aria-checked="true"
                      aria-label={pref.label}
                    >
                      <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-primary-foreground transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            </GlowCard>
          )}

          {activeTab === "appearance" && (
            <GlowCard className="p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6">
                Appearance
              </h2>
              <div className="flex flex-col gap-6">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Theme
                  </label>
                  <div className="flex gap-3">
                    {[
                      { label: "Dark", active: true },
                      { label: "Light", active: false },
                      { label: "System", active: false },
                    ].map((theme) => (
                      <button
                        key={theme.label}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium border transition-all ${
                          theme.active
                            ? "border-glow-cyan bg-primary/10 text-primary"
                            : "border-border bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Aura FX Intensity
                  </label>
                  <div className="flex gap-3">
                    {["Subtle", "Normal", "Vivid"].map((level) => (
                      <button
                        key={level}
                        className={`rounded-lg px-4 py-2.5 text-sm font-medium border transition-all ${
                          level === "Normal"
                            ? "border-glow-cyan bg-primary/10 text-primary"
                            : "border-border bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-3 block">
                    Editor Font Size
                  </label>
                  <div className="flex gap-3">
                    {["12px", "14px", "16px"].map((size) => (
                      <button
                        key={size}
                        className={`rounded-lg px-4 py-2.5 text-sm font-medium border transition-all ${
                          size === "14px"
                            ? "border-glow-cyan bg-primary/10 text-primary"
                            : "border-border bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>
          )}
        </div>
      </div>
    </div>
  )
}
