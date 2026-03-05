// ============================================================
// AiOS Memory Layer
// ============================================================

import type { MemoryEntry, MemorySearchResult } from "@/types"
import { nanoid } from "@/lib/utils"
import { eventBus } from "@/core/events"

const SEED_ENTRIES: MemoryEntry[] = [
  {
    id: "mem_001",
    agentId: "agent_research_01",
    key: "project_context",
    value:
      "Working on AiOS platform documentation. Key stakeholders: engineering team. Priority: P0.",
    tags: ["project", "context"],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    accessCount: 14,
  },
  {
    id: "mem_002",
    agentId: "agent_general_01",
    key: "user_preference",
    value: "User prefers concise bullet-point responses. Uses markdown. Timezone: UTC-5.",
    tags: ["user", "preference"],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    accessCount: 32,
  },
  {
    id: "mem_003",
    key: "api_key_openai",
    value: "[REDACTED - stored securely]",
    tags: ["secrets", "api"],
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    accessCount: 89,
  },
  {
    id: "mem_004",
    agentId: "agent_coding_01",
    key: "codebase_summary",
    value:
      "Next.js 16 app using TypeScript strict mode, Tailwind CSS, shadcn/ui components. Testing with Vitest.",
    tags: ["code", "architecture"],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    accessCount: 7,
  },
  {
    id: "mem_005",
    agentId: "agent_research_01",
    key: "research_notes_llm",
    value:
      "Latest LLM benchmarks: Claude 3.5 Sonnet leads on coding. GPT-4o best for general tasks. Llama 3.3 70B competitive for open-source.",
    tags: ["research", "llm", "benchmarks"],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    accessCount: 3,
  },
]

class MemoryLayer {
  private entries: Map<string, MemoryEntry> = new Map()

  constructor() {
    SEED_ENTRIES.forEach((e) => this.entries.set(e.id, e))
  }

  read(id: string): MemoryEntry | undefined {
    const entry = this.entries.get(id)
    if (entry) {
      entry.accessCount++
      eventBus.emit({ type: "memory.read", message: `Memory read: ${id}` })
    }
    return entry
  }

  write(opts: {
    key: string
    value: string
    agentId?: string
    tags?: string[]
    ttl?: number
  }): MemoryEntry {
    const existing = Array.from(this.entries.values()).find(
      (e) => e.key === opts.key && e.agentId === opts.agentId
    )

    if (existing) {
      const updated = {
        ...existing,
        value: opts.value,
        tags: opts.tags ?? existing.tags,
        ttl: opts.ttl,
        updatedAt: new Date().toISOString(),
      }
      this.entries.set(existing.id, updated)
      eventBus.emit({ type: "memory.write", message: `Memory updated: ${opts.key}` })
      return updated
    }

    const entry: MemoryEntry = {
      id: `mem_${nanoid()}`,
      key: opts.key,
      value: opts.value,
      agentId: opts.agentId,
      tags: opts.tags ?? [],
      ttl: opts.ttl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      accessCount: 0,
    }
    this.entries.set(entry.id, entry)
    eventBus.emit({ type: "memory.write", message: `Memory written: ${opts.key}` })
    return entry
  }

  delete(id: string): void {
    this.entries.delete(id)
  }

  search(query: string, agentId?: string, topK = 5): MemorySearchResult[] {
    const queryLower = query.toLowerCase()
    return Array.from(this.entries.values())
      .filter((e) => !agentId || e.agentId === agentId)
      .map((entry) => {
        const valueMatch = entry.value.toLowerCase().includes(queryLower) ? 0.9 : 0
        const keyMatch = entry.key.toLowerCase().includes(queryLower) ? 0.8 : 0
        const tagMatch = entry.tags.some((t) => t.includes(queryLower)) ? 0.7 : 0
        const score = Math.max(valueMatch, keyMatch, tagMatch)
        return { entry, score }
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
  }

  getAll(agentId?: string): MemoryEntry[] {
    const all = Array.from(this.entries.values())
    return agentId ? all.filter((e) => e.agentId === agentId) : all
  }

  getStats() {
    const all = this.getAll()
    return {
      total: all.length,
      withAgent: all.filter((e) => !!e.agentId).length,
      global: all.filter((e) => !e.agentId).length,
      totalAccesses: all.reduce((s, e) => s + e.accessCount, 0),
    }
  }
}

export const memoryLayer = new MemoryLayer()
