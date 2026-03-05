// ============================================================
// AiOS Tool Registry
// ============================================================

import type { Tool, ToolCategory, ToolCall } from "@/types"
import { nanoid } from "@/lib/utils"
import { eventBus } from "@/core/events"
import { logger } from "@/core/system/logger"

const DEFAULT_TOOLS: Tool[] = [
  {
    id: "tool_web_search",
    name: "web_search",
    description: "Search the web for current information using a query string.",
    category: "web",
    enabled: true,
    schema: {
      input: {
        query: { type: "string", description: "Search query", required: true },
        maxResults: {
          type: "number",
          description: "Max results to return",
          required: false,
          default: 5,
        },
      },
      output: {
        results: {
          type: "array",
          description: "Array of search result objects",
          required: true,
        },
      },
    },
    callCount: 1284,
    lastCalledAt: new Date(Date.now() - 300000).toISOString(),
    version: "1.2.0",
    author: "AiOS Core",
    sandboxed: false,
  },
  {
    id: "tool_code_exec",
    name: "code_exec",
    description: "Execute Python or JavaScript code in a secure sandboxed environment.",
    category: "code",
    enabled: true,
    schema: {
      input: {
        code: { type: "string", description: "Code to execute", required: true },
        language: {
          type: "string",
          description: "Programming language",
          required: false,
          default: "python",
        },
        timeout: {
          type: "number",
          description: "Execution timeout in ms",
          required: false,
          default: 30000,
        },
      },
      output: {
        stdout: { type: "string", description: "Standard output", required: true },
        stderr: { type: "string", description: "Standard error", required: false },
        exitCode: { type: "number", description: "Exit code", required: true },
      },
    },
    callCount: 567,
    lastCalledAt: new Date(Date.now() - 1800000).toISOString(),
    version: "2.0.1",
    author: "AiOS Core",
    sandboxed: true,
  },
  {
    id: "tool_http_request",
    name: "http_request",
    description: "Make HTTP requests to external APIs and services.",
    category: "web",
    enabled: true,
    schema: {
      input: {
        url: { type: "string", description: "Target URL", required: true },
        method: {
          type: "string",
          description: "HTTP method",
          required: false,
          default: "GET",
        },
        headers: { type: "object", description: "Request headers", required: false },
        body: { type: "object", description: "Request body", required: false },
      },
      output: {
        status: { type: "number", description: "HTTP status code", required: true },
        body: { type: "object", description: "Response body", required: true },
        headers: { type: "object", description: "Response headers", required: true },
      },
    },
    callCount: 892,
    lastCalledAt: new Date(Date.now() - 600000).toISOString(),
    version: "1.0.3",
    author: "AiOS Core",
    sandboxed: false,
  },
  {
    id: "tool_memory_recall",
    name: "memory_recall",
    description: "Retrieve relevant memories using semantic search.",
    category: "memory",
    enabled: true,
    schema: {
      input: {
        query: { type: "string", description: "Semantic search query", required: true },
        topK: {
          type: "number",
          description: "Number of results",
          required: false,
          default: 5,
        },
        agentId: {
          type: "string",
          description: "Filter by agent ID",
          required: false,
        },
      },
      output: {
        memories: { type: "array", description: "Array of memory entries", required: true },
      },
    },
    callCount: 234,
    lastCalledAt: new Date(Date.now() - 900000).toISOString(),
    version: "1.1.0",
    author: "AiOS Core",
    sandboxed: false,
  },
  {
    id: "tool_file_read",
    name: "file_read",
    description: "Read file contents from the system storage.",
    category: "system",
    enabled: true,
    schema: {
      input: {
        path: { type: "string", description: "File path", required: true },
        encoding: {
          type: "string",
          description: "File encoding",
          required: false,
          default: "utf-8",
        },
      },
      output: {
        content: { type: "string", description: "File contents", required: true },
        size: { type: "number", description: "File size in bytes", required: true },
      },
    },
    callCount: 341,
    lastCalledAt: new Date(Date.now() - 1200000).toISOString(),
    version: "1.0.0",
    author: "AiOS Core",
    sandboxed: true,
  },
  {
    id: "tool_calculator",
    name: "calculator",
    description: "Perform mathematical calculations and expressions.",
    category: "data",
    enabled: true,
    schema: {
      input: {
        expression: {
          type: "string",
          description: "Mathematical expression",
          required: true,
        },
      },
      output: {
        result: { type: "number", description: "Calculation result", required: true },
        formatted: { type: "string", description: "Formatted result", required: true },
      },
    },
    callCount: 189,
    lastCalledAt: new Date(Date.now() - 2400000).toISOString(),
    version: "1.0.0",
    author: "AiOS Core",
    sandboxed: true,
  },
  {
    id: "tool_email",
    name: "email",
    description: "Send emails via configured SMTP provider.",
    category: "communication",
    enabled: false,
    schema: {
      input: {
        to: { type: "string", description: "Recipient email", required: true },
        subject: { type: "string", description: "Email subject", required: true },
        body: { type: "string", description: "Email body", required: true },
      },
      output: {
        messageId: { type: "string", description: "Message ID", required: true },
      },
    },
    callCount: 45,
    version: "1.0.0",
    author: "AiOS Core",
    sandboxed: false,
  },
  {
    id: "tool_web_scrape",
    name: "web_scrape",
    description: "Scrape and extract structured content from web pages.",
    category: "web",
    enabled: true,
    schema: {
      input: {
        url: { type: "string", description: "Page URL to scrape", required: true },
        selector: {
          type: "string",
          description: "CSS selector for target content",
          required: false,
        },
      },
      output: {
        content: { type: "string", description: "Extracted content", required: true },
        links: { type: "array", description: "Extracted links", required: false },
      },
    },
    callCount: 203,
    lastCalledAt: new Date(Date.now() - 3600000).toISOString(),
    version: "1.3.0",
    author: "AiOS Core",
    sandboxed: false,
  },
]

class ToolRegistry {
  private tools: Map<string, Tool> = new Map()
  private calls: ToolCall[] = []

  constructor() {
    DEFAULT_TOOLS.forEach((t) => this.tools.set(t.id, t))
  }

  getAll(): Tool[] {
    return Array.from(this.tools.values())
  }

  getById(id: string): Tool | undefined {
    return this.tools.get(id)
  }

  getByName(name: string): Tool | undefined {
    return Array.from(this.tools.values()).find((t) => t.name === name)
  }

  getByCategory(category: ToolCategory): Tool[] {
    return Array.from(this.tools.values()).filter((t) => t.category === category)
  }

  register(tool: Omit<Tool, "id" | "callCount">): Tool {
    const newTool: Tool = {
      id: `tool_${nanoid()}`,
      callCount: 0,
      ...tool,
    }
    this.tools.set(newTool.id, newTool)
    logger.info(`Tool registered: ${tool.name}`, { toolId: newTool.id }, "tool-registry")
    return newTool
  }

  async execute(
    toolId: string,
    input: Record<string, unknown>,
    agentId?: string
  ): Promise<ToolCall> {
    const tool = this.tools.get(toolId)
    if (!tool) throw new Error(`Tool not found: ${toolId}`)
    if (!tool.enabled) throw new Error(`Tool disabled: ${tool.name}`)

    const callId = nanoid()
    const start = Date.now()

    eventBus.emit({
      type: "tool.called",
      toolId,
      agentId,
      message: `Tool ${tool.name} called`,
      data: { input },
    })

    // Stub execution
    const output = { result: "stub_output", ok: true }
    const durationMs = Date.now() - start

    const call: ToolCall = {
      id: callId,
      toolId,
      toolName: tool.name,
      input,
      output,
      durationMs,
      timestamp: new Date().toISOString(),
    }

    tool.callCount++
    tool.lastCalledAt = new Date().toISOString()
    this.calls.unshift(call)
    if (this.calls.length > 1000) this.calls.pop()

    eventBus.emit({
      type: "tool.result",
      toolId,
      agentId,
      message: `Tool ${tool.name} completed in ${durationMs}ms`,
    })

    return call
  }

  toggle(id: string): Tool {
    const tool = this.tools.get(id)
    if (!tool) throw new Error(`Tool not found: ${id}`)
    const updated = { ...tool, enabled: !tool.enabled }
    this.tools.set(id, updated)
    return updated
  }

  getRecentCalls(limit = 50): ToolCall[] {
    return this.calls.slice(0, limit)
  }

  getStats() {
    const all = this.getAll()
    return {
      total: all.length,
      enabled: all.filter((t) => t.enabled).length,
      disabled: all.filter((t) => !t.enabled).length,
      totalCalls: all.reduce((s, t) => s + t.callCount, 0),
    }
  }
}

export const toolRegistry = new ToolRegistry()
