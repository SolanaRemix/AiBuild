import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockAdminUsers } from "@/lib/mock-data"
import { Users, Eye } from "lucide-react"

const roleVariant = {
  admin: "purple" as const,
  dev: "cyan" as const,
  user: "default" as const,
}
const statusVariant = {
  active: "success" as const,
  suspended: "destructive" as const,
  pending: "warning" as const,
}

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground">Manage user accounts, roles, and access</p>
        </div>
        <GlowBadge variant="cyan">{mockAdminUsers.length} users</GlowBadge>
      </div>

      <div className="rounded-lg border border-border overflow-hidden">
        <div className="grid grid-cols-6 gap-4 bg-muted/50 px-4 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide">
          <span>Email</span>
          <span>Role</span>
          <span>Projects</span>
          <span>Status</span>
          <span>Created</span>
          <span>Actions</span>
        </div>
        {mockAdminUsers.map((user) => (
          <div key={user.id} className="grid grid-cols-6 gap-4 border-t border-border px-4 py-3 text-sm items-center">
            <span className="font-medium text-foreground truncate">{user.email}</span>
            <GlowBadge variant={roleVariant[user.role]}>{user.role}</GlowBadge>
            <span className="text-muted-foreground">{user.projects}</span>
            <GlowBadge variant={statusVariant[user.status]}>{user.status}</GlowBadge>
            <span className="text-xs text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</span>
            <div className="flex items-center gap-1">
              <button className="rounded-md p-1.5 text-muted-foreground hover:text-primary hover:bg-muted transition-colors" aria-label="Impersonate user">
                <Eye className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
