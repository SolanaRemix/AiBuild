// ============================================================
// AiOS Event Bus
// ============================================================

import type { SystemEvent, EventType, LogLevel } from "@/types"
import { nanoid } from "@/lib/utils"

type EventHandler = (event: SystemEvent) => void

class EventBus {
  private handlers: Map<EventType | "*", EventHandler[]> = new Map()
  private history: SystemEvent[] = []
  private maxHistory = 1000

  emit(opts: {
    type: EventType
    agentId?: string
    toolId?: string
    level?: LogLevel
    message: string
    data?: Record<string, unknown>
    correlationId?: string
  }): SystemEvent {
    const event: SystemEvent = {
      id: nanoid(),
      type: opts.type,
      agentId: opts.agentId,
      toolId: opts.toolId,
      level: opts.level ?? "info",
      message: opts.message,
      data: opts.data,
      correlationId: opts.correlationId ?? nanoid(),
      timestamp: new Date().toISOString(),
    }

    // Store history
    this.history.unshift(event)
    if (this.history.length > this.maxHistory) {
      this.history.pop()
    }

    // Dispatch to specific handlers
    const typeHandlers = this.handlers.get(opts.type) ?? []
    const wildcardHandlers = this.handlers.get("*") ?? []
    ;[...typeHandlers, ...wildcardHandlers].forEach((h) => {
      try {
        h(event)
      } catch (err) {
        console.error("[EventBus] Handler error:", err)
      }
    })

    return event
  }

  on(type: EventType | "*", handler: EventHandler): () => void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, [])
    }
    this.handlers.get(type)!.push(handler)

    return () => {
      const list = this.handlers.get(type) ?? []
      this.handlers.set(
        type,
        list.filter((h) => h !== handler)
      )
    }
  }

  getHistory(limit = 100, type?: EventType): SystemEvent[] {
    const filtered = type
      ? this.history.filter((e) => e.type === type)
      : this.history
    return filtered.slice(0, limit)
  }

  clearHistory(): void {
    this.history = []
  }
}

export const eventBus = new EventBus()
