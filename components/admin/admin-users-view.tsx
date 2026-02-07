"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton, GlowInput } from "@/components/aura"
import { AdminOverview } from "./admin-overview"
import {
  Users,
  Search,
  Eye,
  Shield,
  MoreHorizontal,
  ChevronRight,
  X,
} from "lucide-react"

interface UserRecord {
  id: string
  email: string
  name: string
  role: "user" | "dev" | "admin"
  projects: number
  status: "active" | "suspended" | "invited"
  lastLogin: string
  plan: "free" | "pro" | "enterprise"
  flags: string[]
}

const mockUsers: UserRecord[] = [
  {
    id: "u_1",
    email: "alice@example.com",
    name: "Alice Chen",
    role: "admin",
    projects: 12,
    status: "active",
    lastLogin: "2026-02-05T14:00:00Z",
    plan: "enterprise",
    flags: ["beta_access"],
  },
  {
    id: "u_2",
    email: "bob@example.com",
    name: "Bob Smith",
    role: "dev",
    projects: 8,
    status: "active",
    lastLogin: "2026-02-05T10:30:00Z",
    plan: "pro",
    flags: [],
  },
  {
    id: "u_3",
    email: "carol@example.com",
    name: "Carol Davis",
    role: "user",
    projects: 3,
    status: "active",
    lastLogin: "2026-02-04T16:00:00Z",
    plan: "free",
    flags: [],
  },
  {
    id: "u_4",
    email: "dave@example.com",
    name: "Dave Wilson",
    role: "user",
    projects: 1,
    status: "suspended",
    lastLogin: "2026-01-28T09:00:00Z",
    plan: "free",
    flags: [],
  },
  {
    id: "u_5",
    email: "eve@example.com",
    name: "Eve Johnson",
    role: "user",
    projects: 0,
    status: "invited",
    lastLogin: "",
    plan: "free",
    flags: ["beta_access"],
  },
]

const roleVariants = {
  user: "default" as const,
  dev: "cyan" as const,
  admin: "purple" as const,
}

const statusVariants = {
  active: "success" as const,
  suspended: "destructive" as const,
  invited: "warning" as const,
}

export function AdminUsersView() {
  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Users
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage platform users, roles, and permissions
          </p>
        </div>
        <div className="flex items-center gap-3">
          <GlowBadge variant="cyan">{mockUsers.length} total</GlowBadge>
          <GlowBadge variant="success">
            {mockUsers.filter((u) => u.status === "active").length} active
          </GlowBadge>
        </div>
      </div>

      {/* Overview */}
      <AdminOverview />

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-border bg-muted pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-glow-cyan focus:glow-cyan transition-all"
          />
        </div>
      </div>

      {/* Users table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-7 gap-4 bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Plan</span>
          <span>Projects</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="grid grid-cols-7 gap-4 border-t border-border px-4 py-3 text-sm items-center hover:bg-muted/20 transition-colors cursor-pointer"
            onClick={() => setSelectedUser(user)}
          >
            <span className="font-medium text-foreground truncate">{user.name}</span>
            <span className="text-muted-foreground truncate font-mono text-xs">{user.email}</span>
            <GlowBadge variant={roleVariants[user.role]}>{user.role}</GlowBadge>
            <GlowBadge>{user.plan}</GlowBadge>
            <span className="text-muted-foreground">{user.projects}</span>
            <GlowBadge variant={statusVariants[user.status]}>{user.status}</GlowBadge>
            <div className="flex items-center gap-1">
              <button
                className="rounded-md p-1.5 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="Impersonate user"
                title="Impersonate"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
              <button
                className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="More actions"
              >
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail drawer */}
      {selectedUser && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md border-l border-border bg-card glass shadow-2xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-semibold text-foreground">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                    <span className="text-xl font-bold text-primary">
                      {selectedUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{selectedUser.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-muted-foreground">Role</span>
                    <div className="mt-1">
                      <GlowBadge variant={roleVariants[selectedUser.role]}>
                        {selectedUser.role}
                      </GlowBadge>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Plan</span>
                    <p className="text-sm font-medium text-foreground mt-0.5">{selectedUser.plan}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Projects</span>
                    <p className="text-sm font-medium text-foreground mt-0.5">{selectedUser.projects}</p>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Status</span>
                    <div className="mt-1">
                      <GlowBadge variant={statusVariants[selectedUser.status]}>
                        {selectedUser.status}
                      </GlowBadge>
                    </div>
                  </div>
                </div>

                {selectedUser.lastLogin && (
                  <div>
                    <span className="text-xs text-muted-foreground">Last Login</span>
                    <p className="text-sm text-foreground mt-0.5">
                      {new Date(selectedUser.lastLogin).toLocaleString()}
                    </p>
                  </div>
                )}

                {selectedUser.flags.length > 0 && (
                  <div>
                    <span className="text-xs text-muted-foreground">Flags</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedUser.flags.map((flag) => (
                        <GlowBadge key={flag} variant="warning">{flag}</GlowBadge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <GlowButton size="sm" variant="outline">
                    <Eye className="mr-1.5 h-3.5 w-3.5" />
                    Impersonate User
                  </GlowButton>
                  <GlowButton size="sm" variant="outline">
                    <Shield className="mr-1.5 h-3.5 w-3.5" />
                    Change Role
                  </GlowButton>
                  {selectedUser.status === "active" && (
                    <GlowButton size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10">
                      Suspend Account
                    </GlowButton>
                  )}
                  {selectedUser.status === "suspended" && (
                    <GlowButton size="sm" variant="ghost" className="text-success hover:bg-success/10">
                      Reactivate Account
                    </GlowButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
