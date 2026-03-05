"use client"

import type { MemoryEntry } from "@/types"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { formatRelativeTime, truncate } from "@/lib/utils"
import { Search, Brain, Tag, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface MemoryTableProps {
  entries: MemoryEntry[]
}

export function MemoryTable({ entries }: MemoryTableProps) {
  const [query, setQuery] = useState("")
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = query
    ? entries.filter(
        (e) =>
          e.key.toLowerCase().includes(query.toLowerCase()) ||
          e.value.toLowerCase().includes(query.toLowerCase()) ||
          e.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : entries

  return (
    <div className="rounded-xl border border-border bg-[hsl(var(--fx-surface))] overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search keys, values, tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-8 text-xs font-mono bg-[hsl(var(--fx-rail))] border-border"
          />
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          {filtered.length} / {entries.length}
        </span>
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[1fr_2fr_auto_auto] gap-4 px-5 py-2 border-b border-border bg-[hsl(var(--fx-rail))]">
        {["Key", "Value", "Tags", "Accessed"].map((h) => (
          <span key={h} className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            {h}
          </span>
        ))}
      </div>

      {/* Rows */}
      <div className="divide-y divide-border">
        {filtered.length === 0 && (
          <div className="py-16 text-center text-sm font-mono text-muted-foreground">
            No memory entries found
          </div>
        )}
        {filtered.map((entry) => (
          <div key={entry.id}>
            <button
              onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
              className="w-full grid grid-cols-[1fr_2fr_auto_auto] gap-4 px-5 py-3 hover:bg-[hsl(var(--fx-surface-elevated))] transition-colors text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Brain className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="text-xs font-mono text-foreground truncate">{entry.key}</span>
              </div>
              <span className="text-xs text-muted-foreground truncate">
                {truncate(entry.value, 80)}
              </span>
              <div className="flex items-center gap-1 flex-wrap">
                {entry.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-mono bg-primary/10 border border-primary/20 text-primary rounded px-1.5 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
                {entry.tags.length > 2 && (
                  <span className="text-[9px] font-mono text-muted-foreground">
                    +{entry.tags.length - 2}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground">
                <Clock className="w-3 h-3" />
                {entry.accessCount}
              </div>
            </button>

            {/* Expanded detail */}
            {expanded === entry.id && (
              <div className="px-5 pb-4 bg-[hsl(var(--fx-rail))] border-t border-border">
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      Agent ID:
                    </span>
                    <span className="text-[10px] font-mono text-foreground">
                      {entry.agentId ?? "global"}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground ml-4 uppercase">
                      Updated:
                    </span>
                    <span className="text-[10px] font-mono text-foreground">
                      {formatRelativeTime(entry.updatedAt)}
                    </span>
                  </div>
                  <div className="rounded-lg bg-[hsl(var(--fx-surface))] border border-border p-3">
                    <p className="text-xs font-mono text-foreground leading-relaxed whitespace-pre-wrap break-all">
                      {entry.value}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
