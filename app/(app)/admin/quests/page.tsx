"use client"

import { useState } from "react"
import { GlowCard, GlowBadge, GlowButton } from "@/components/aura"
import { mockQuests } from "@/lib/mock-data"
import type { Quest } from "@/lib/types"
import { Gamepad2, GripVertical, Pencil, Plus } from "lucide-react"

export default function AdminQuestsPage() {
  const [quests] = useState(mockQuests)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Quests Config</h1>
          <p className="text-sm text-muted-foreground">Define quest steps, rewards, and visibility</p>
        </div>
        <GlowButton><Plus className="mr-2 h-4 w-4" />Add Quest</GlowButton>
      </div>

      <div className="flex flex-col gap-3">
        {quests.map((quest, i) => (
          <GlowCard key={quest.id} className="p-4">
            <div className="flex items-center gap-4">
              <GripVertical className="h-4 w-4 text-muted-foreground shrink-0 cursor-grab" />
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
                <Gamepad2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{quest.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{quest.description}</p>
              </div>
              <GlowBadge variant="cyan">{quest.reward}</GlowBadge>
              <span className="text-xs font-mono text-muted-foreground">{quest.total} steps</span>
              <button className="rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Edit quest">
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
