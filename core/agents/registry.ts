// ============================================================
// AiOS Agent Registry
// ============================================================

import type { Agent, AgentRun, AgentStatus, AgentTemplate, AgentModel } from "@/types"
import { nanoid } from "@/lib/utils"
import { eventBus } from "@/core/events"
import { logger } from "@/core/system/logger"

const DEFAULT_AGENTS: Agent[] = [
  {
    id: "agent_general_01",
    name: "GeneralAI",
    description: "A versatile general-purpose LLM agent for any task.",
    model: "openai/gpt-4o",
    status: "idle",
    template: "general",
    tools: ["web_search", "calculator", "code_exec"],
    memoryEnabled: true,
    systemPrompt:
      "You are a helpful, accurate, and concise AI assistant. Complete tasks efficiently.",
    maxTokens: 4096,
    temperature: 0.7,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    lastRunAt: new Date(Date.now() - 3600000).toISOString(),
    runCount: 42,
    tags: ["general", "production"],
  },
  {
    id: "agent_research_01",
    name: "ResearchBot",
    description: "Deep research agent with web access and memory.",
    model: "anthropic/claude-3-5-sonnet",
    status: "running",
    template: "research",
    tools: ["web_search", "web_scrape", "summarize", "memory_recall"],
    memoryEnabled: true,
    systemPrompt:
      "You are a thorough research assistant. Gather, analyze, and synthesize information accurately.",
    maxTokens: 8192,
    temperature: 0.3,
    createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    updatedAt: new Date().toISOString(),
    lastRunAt: new Date().toISOString(),
    runCount: 128,
    tags: ["research", "production", "web"],
  },
  {
    id: "agent_coding_01",
    name: "CodeAgent",
    description: "Expert coding assistant with execution sandbox.",
    model: "anthropic/claude-3-5-sonnet",
    status: "idle",
    template: "coding",
    tools: ["code_exec", "file_read", "file_write", "terminal"],
    memoryEnabled: false,
    systemPrompt:
      "You are an expert software engineer. Write clean, efficient, well-documented code.",
    maxTokens: 16384,
    temperature: 0.1,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 7200000).toISOString(),
    lastRunAt: new Date(Date.now() - 7200000).toISOString(),
    runCount: 67,
    tags: ["coding", "dev"],
  },
  {
    id: "agent_automation_01",
    name: "AutoFlow",
    description: "Task automation agent for scheduled workflows.",
    model: "openai/gpt-4o-mini",
    status: "paused",
    template: "automation",
    tools: ["http_request", "cron", "email", "webhook"],
    memoryEnabled: true,
    systemPrompt:
      "You are an automation specialist. Execute tasks reliably and report results clearly.",
    maxTokens: 2048,
    temperature: 0.2,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 1800000).toISOString(),
    runCount: 312,
    tags: ["automation", "scheduled"],
  },
  {
    id: "agent_terminal_01",
    name: "TerminalOps",
    description: "System operations agent with terminal access.",
    model: "groq/llama-3.3-70b-versatile",
    status: "error",
    template: "terminal",
    tools: ["terminal", "file_read", "file_write", "process_list"],
    memoryEnabled: false,
    systemPrompt:
      "You are a system administrator AI. Execute commands safely and report outcomes precisely.",
    maxTokens: 4096,
    temperature: 0.0,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 900000).toISOString(),
    lastRunAt: new Date(Date.now() - 900000).toISOString(),
    runCount: 19,
    tags: ["terminal", "ops"],
  },
]

class AgentRegistry {
  private agents: Map<string, Agent> = new Map()
  private runs: Map<string, AgentRun[]> = new Map()

  constructor() {
    DEFAULT_AGENTS.forEach((a) => this.agents.set(a.id, a))
  }

  getAll(): Agent[] {
    return Array.from(this.agents.values())
  }

  getById(id: string): Agent | undefined {
    return this.agents.get(id)
  }

  create(opts: {
    name: string
    description: string
    model: AgentModel
    template: AgentTemplate
    tools: string[]
    systemPrompt: string
    memoryEnabled: boolean
    maxTokens: number
    temperature: number
    tags: string[]
  }): Agent {
    const agent: Agent = {
      id: `agent_${nanoid()}`,
      ...opts,
      status: "idle",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      runCount: 0,
    }
    this.agents.set(agent.id, agent)
    logger.info(`Agent created: ${agent.name}`, { agentId: agent.id }, "agent-registry")
    eventBus.emit({
      type: "agent.started",
      agentId: agent.id,
      message: `Agent ${agent.name} registered`,
    })
    return agent
  }

  update(id: string, updates: Partial<Agent>): Agent {
    const existing = this.agents.get(id)
    if (!existing) throw new Error(`Agent not found: ${id}`)
    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() }
    this.agents.set(id, updated)
    return updated
  }

  delete(id: string): void {
    const agent = this.agents.get(id)
    if (!agent) throw new Error(`Agent not found: ${id}`)
    this.agents.delete(id)
    logger.info(`Agent deleted: ${agent.name}`, { agentId: id }, "agent-registry")
  }

  setStatus(id: string, status: AgentStatus): void {
    const agent = this.agents.get(id)
    if (!agent) return
    this.agents.set(id, { ...agent, status, updatedAt: new Date().toISOString() })
    const eventMap: Record<AgentStatus, string> = {
      idle: "agent.stopped",
      running: "agent.started",
      paused: "agent.stopped",
      error: "agent.error",
      completed: "agent.completed",
    }
    eventBus.emit({
      type: eventMap[status] as never,
      agentId: id,
      message: `Agent ${agent.name} status: ${status}`,
    })
  }

  getRuns(agentId: string): AgentRun[] {
    return this.runs.get(agentId) ?? []
  }

  getStats() {
    const all = this.getAll()
    return {
      total: all.length,
      running: all.filter((a) => a.status === "running").length,
      idle: all.filter((a) => a.status === "idle").length,
      error: all.filter((a) => a.status === "error").length,
      paused: all.filter((a) => a.status === "paused").length,
    }
  }
}

export const agentRegistry = new AgentRegistry()
