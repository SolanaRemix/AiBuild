// ============================================================
// AiOS Kernel — LLM-driven OS abstraction layer
// ============================================================

import type {
  KernelStatus,
  AgentModel,
  ModelStatus,
  SystemCall,
  SystemEvent,
  EventType,
  LogLevel,
} from "@/types"
import { eventBus } from "@/core/events"
import { logger } from "@/core/system/logger"

const KERNEL_VERSION = "1.0.0"

class AiOSKernel {
  private bootTime: Date
  private systemCalls: Map<string, SystemCall> = new Map()
  private _status: "healthy" | "degraded" | "critical" = "healthy"

  constructor() {
    this.bootTime = new Date()
    this.registerDefaultSyscalls()
  }

  private registerDefaultSyscalls() {
    const syscalls: SystemCall[] = [
      {
        id: "sys_agent_spawn",
        name: "agent_spawn",
        description: "Spawn a new agent process",
        handler: "AgentRuntime.spawn",
        privileged: false,
        callCount: 0,
      },
      {
        id: "sys_agent_kill",
        name: "agent_kill",
        description: "Terminate an agent process",
        handler: "AgentRuntime.kill",
        privileged: true,
        callCount: 0,
      },
      {
        id: "sys_mem_read",
        name: "mem_read",
        description: "Read from agent memory",
        handler: "MemoryLayer.read",
        privileged: false,
        callCount: 0,
      },
      {
        id: "sys_mem_write",
        name: "mem_write",
        description: "Write to agent memory",
        handler: "MemoryLayer.write",
        privileged: false,
        callCount: 0,
      },
      {
        id: "sys_tool_exec",
        name: "tool_exec",
        description: "Execute a registered tool",
        handler: "ToolingLayer.execute",
        privileged: false,
        callCount: 0,
      },
      {
        id: "sys_event_emit",
        name: "event_emit",
        description: "Emit a system event",
        handler: "EventBus.emit",
        privileged: false,
        callCount: 0,
      },
      {
        id: "sys_log",
        name: "log",
        description: "Write to system log",
        handler: "Logger.write",
        privileged: false,
        callCount: 0,
      },
      {
        id: "sys_shutdown",
        name: "shutdown",
        description: "Graceful kernel shutdown",
        handler: "Kernel.shutdown",
        privileged: true,
        callCount: 0,
      },
    ]
    syscalls.forEach((sc) => this.systemCalls.set(sc.name, sc))
  }

  async boot(): Promise<void> {
    this.bootTime = new Date()
    logger.info("AiOS Kernel booting...", { version: KERNEL_VERSION })
    eventBus.emit({ type: "kernel.boot", message: "Kernel boot complete" })
    logger.info("AiOS Kernel online", { uptime: 0 })
  }

  async shutdown(): Promise<void> {
    logger.info("AiOS Kernel shutting down...")
    eventBus.emit({ type: "kernel.shutdown", message: "Kernel shutdown initiated" })
  }

  syscall(name: string, args?: Record<string, unknown>): unknown {
    const sc = this.systemCalls.get(name)
    if (!sc) throw new Error(`Unknown syscall: ${name}`)
    sc.callCount++
    logger.debug(`syscall: ${name}`, args)
    return { ok: true, syscall: name }
  }

  getStatus(): KernelStatus {
    const uptimeSec = Math.floor((Date.now() - this.bootTime.getTime()) / 1000)
    return {
      version: KERNEL_VERSION,
      uptime: uptimeSec,
      status: this._status,
      activeAgents: 0,
      totalAgents: 0,
      totalTools: 0,
      totalMemoryEntries: 0,
      eventsPerMinute: 0,
      cpuPercent: Math.random() * 30 + 5,
      memoryPercent: Math.random() * 40 + 20,
      models: this.getModelStatuses(),
    }
  }

  getSyscalls(): SystemCall[] {
    return Array.from(this.systemCalls.values())
  }

  private getModelStatuses(): ModelStatus[] {
    const models: AgentModel[] = [
      "openai/gpt-4o",
      "openai/gpt-4o-mini",
      "anthropic/claude-3-5-sonnet",
      "anthropic/claude-3-haiku",
      "groq/llama-3.3-70b-versatile",
    ]
    return models.map((id) => ({
      id,
      provider: id.split("/")[0],
      status: "online" as const,
      latencyMs: Math.floor(Math.random() * 400 + 100),
      requestsToday: Math.floor(Math.random() * 1000),
      tokensToday: Math.floor(Math.random() * 500000),
      costToday: parseFloat((Math.random() * 10).toFixed(4)),
    }))
  }
}

export const kernel = new AiOSKernel()
