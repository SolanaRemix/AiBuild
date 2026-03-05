import type { SystemCall } from "@/types"
import { ShieldCheck, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

interface SyscallTableProps {
  syscalls: SystemCall[]
}

export function SyscallTable({ syscalls }: SyscallTableProps) {
  return (
    <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold font-mono text-foreground">System Calls</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{syscalls.length} registered syscalls</p>
      </div>
      <div className="divide-y divide-border max-h-80 overflow-y-auto">
        {syscalls.map((sc) => (
          <div
            key={sc.id}
            className="flex items-start justify-between gap-3 px-5 py-3 hover:bg-[hsl(var(--fx-surface-elevated))] transition-colors"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-primary">{sc.name}</span>
                {sc.privileged ? (
                  <span className="flex items-center gap-0.5 text-[9px] font-mono text-warning border border-warning/20 bg-warning/10 rounded px-1">
                    <ShieldCheck className="w-2.5 h-2.5" />
                    PRIV
                  </span>
                ) : (
                  <span className="flex items-center gap-0.5 text-[9px] font-mono text-muted-foreground border border-border rounded px-1">
                    <Shield className="w-2.5 h-2.5" />
                    USER
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{sc.description}</p>
              <p className="text-[10px] font-mono text-muted-foreground/60">{sc.handler}</p>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground shrink-0">
              {sc.callCount} calls
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
