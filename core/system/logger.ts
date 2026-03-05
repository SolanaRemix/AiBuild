// ============================================================
// AiOS System Logger
// ============================================================

import type { LogEntry, LogLevel } from "@/types"
import { nanoid } from "@/lib/utils"

class Logger {
  private entries: LogEntry[] = []
  private maxEntries = 5000

  private write(
    level: LogLevel,
    message: string,
    source: string,
    data?: Record<string, unknown>,
    agentId?: string
  ): LogEntry {
    const entry: LogEntry = {
      id: nanoid(),
      level,
      message,
      source,
      agentId,
      correlationId: nanoid(),
      data,
      timestamp: new Date().toISOString(),
    }
    this.entries.unshift(entry)
    if (this.entries.length > this.maxEntries) this.entries.pop()

    const prefix = `[AiOS:${source}]`
    if (level === "debug") console.debug(prefix, message, data ?? "")
    else if (level === "info") console.info(prefix, message, data ?? "")
    else if (level === "warn") console.warn(prefix, message, data ?? "")
    else if (level === "error" || level === "fatal")
      console.error(prefix, message, data ?? "")

    return entry
  }

  debug(message: string, data?: Record<string, unknown>, source = "kernel") {
    return this.write("debug", message, source, data)
  }

  info(message: string, data?: Record<string, unknown>, source = "kernel") {
    return this.write("info", message, source, data)
  }

  warn(message: string, data?: Record<string, unknown>, source = "kernel") {
    return this.write("warn", message, source, data)
  }

  error(
    message: string,
    data?: Record<string, unknown>,
    source = "kernel",
    agentId?: string
  ) {
    return this.write("error", message, source, data, agentId)
  }

  fatal(message: string, data?: Record<string, unknown>, source = "kernel") {
    return this.write("fatal", message, source, data)
  }

  getLogs(limit = 200, level?: LogLevel, source?: string): LogEntry[] {
    let result = this.entries
    if (level) result = result.filter((e) => e.level === level)
    if (source) result = result.filter((e) => e.source === source)
    return result.slice(0, limit)
  }

  clearLogs(): void {
    this.entries = []
  }
}

export const logger = new Logger()
