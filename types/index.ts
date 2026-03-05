// ============================================================
// AiOS Core Types
// ============================================================

export type AgentStatus = "idle" | "running" | "paused" | "error" | "completed"
export type AgentModel =
  | "openai/gpt-4o"
  | "openai/gpt-4o-mini"
  | "anthropic/claude-3-5-sonnet"
  | "anthropic/claude-3-haiku"
  | "groq/llama-3.3-70b-versatile"
  | "groq/mixtral-8x7b"
  | "local/ollama"

export type ToolCategory =
  | "web"
  | "code"
  | "data"
  | "system"
  | "memory"
  | "communication"
  | "custom"

export type LogLevel = "debug" | "info" | "warn" | "error" | "fatal"
export type EventType =
  | "agent.started"
  | "agent.stopped"
  | "agent.error"
  | "agent.completed"
  | "tool.called"
  | "tool.result"
  | "tool.error"
  | "memory.read"
  | "memory.write"
  | "system.call"
  | "kernel.boot"
  | "kernel.shutdown"

// ============================================================
// Agent Types
// ============================================================

export interface Agent {
  id: string
  name: string
  description: string
  model: AgentModel
  status: AgentStatus
  template: AgentTemplate
  tools: string[]
  memoryEnabled: boolean
  systemPrompt: string
  maxTokens: number
  temperature: number
  createdAt: string
  updatedAt: string
  lastRunAt?: string
  runCount: number
  tags: string[]
}

export type AgentTemplate =
  | "general"
  | "research"
  | "coding"
  | "automation"
  | "terminal"
  | "browser"

export interface AgentRun {
  id: string
  agentId: string
  status: AgentStatus
  startedAt: string
  completedAt?: string
  durationMs?: number
  tokensUsed: number
  cost: number
  messages: AgentMessage[]
  toolCalls: ToolCall[]
  error?: string
  correlationId: string
}

export interface AgentMessage {
  id: string
  role: "user" | "assistant" | "system" | "tool"
  content: string
  timestamp: string
  tokens?: number
}

// ============================================================
// Tool Types
// ============================================================

export interface Tool {
  id: string
  name: string
  description: string
  category: ToolCategory
  enabled: boolean
  schema: ToolSchema
  callCount: number
  lastCalledAt?: string
  version: string
  author: string
  sandboxed: boolean
}

export interface ToolSchema {
  input: Record<string, ToolSchemaField>
  output: Record<string, ToolSchemaField>
}

export interface ToolSchemaField {
  type: "string" | "number" | "boolean" | "object" | "array"
  description: string
  required: boolean
  default?: unknown
}

export interface ToolCall {
  id: string
  toolId: string
  toolName: string
  input: Record<string, unknown>
  output?: Record<string, unknown>
  error?: string
  durationMs: number
  timestamp: string
}

// ============================================================
// Memory Types
// ============================================================

export interface MemoryEntry {
  id: string
  agentId?: string
  key: string
  value: string
  embedding?: number[]
  tags: string[]
  ttl?: number
  createdAt: string
  updatedAt: string
  accessCount: number
  similarity?: number
}

export interface MemorySearchResult {
  entry: MemoryEntry
  score: number
}

// ============================================================
// Event Types
// ============================================================

export interface SystemEvent {
  id: string
  type: EventType
  agentId?: string
  toolId?: string
  level: LogLevel
  message: string
  data?: Record<string, unknown>
  correlationId: string
  timestamp: string
}

// ============================================================
// System / Kernel Types
// ============================================================

export interface KernelStatus {
  version: string
  uptime: number
  status: "healthy" | "degraded" | "critical"
  activeAgents: number
  totalAgents: number
  totalTools: number
  totalMemoryEntries: number
  eventsPerMinute: number
  cpuPercent: number
  memoryPercent: number
  models: ModelStatus[]
}

export interface ModelStatus {
  id: AgentModel
  provider: string
  status: "online" | "offline" | "rate_limited"
  latencyMs: number
  requestsToday: number
  tokensToday: number
  costToday: number
}

export interface SystemCall {
  id: string
  name: string
  description: string
  handler: string
  privileged: boolean
  callCount: number
}

// ============================================================
// Auth / User Types
// ============================================================

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "developer" | "viewer"
  avatarUrl?: string
  createdAt: string
  apiKeys: ApiKey[]
}

export interface ApiKey {
  id: string
  name: string
  prefix: string
  permissions: string[]
  createdAt: string
  lastUsedAt?: string
  expiresAt?: string
}

// ============================================================
// Log Types
// ============================================================

export interface LogEntry {
  id: string
  level: LogLevel
  message: string
  source: string
  agentId?: string
  correlationId: string
  data?: Record<string, unknown>
  timestamp: string
}

// ============================================================
// Dashboard / Analytics Types
// ============================================================

export interface DashboardStats {
  activeAgents: number
  totalRuns: number
  successRate: number
  avgDurationMs: number
  tokensUsed: number
  estimatedCost: number
  eventsToday: number
  toolCalls: number
}

export interface TimeSeriesPoint {
  timestamp: string
  value: number
  label?: string
}
