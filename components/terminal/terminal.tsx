"use client"

import { useState, useRef, useEffect, KeyboardEvent } from "react"
import { cn } from "@/lib/utils"

interface TerminalLine {
  id: string
  type: "input" | "output" | "error" | "info" | "success"
  text: string
  timestamp: string
}

const HELP_TEXT = `
AiOS Terminal v1.0.0 — Operator Shell
──────────────────────────────────────
Commands:
  help                   Show this help message
  agents                 List all registered agents
  agents start <id>      Start an agent
  agents stop <id>       Stop an agent
  tools                  List all tools
  tools enable <name>    Enable a tool
  tools disable <name>   Disable a tool
  memory                 List memory entries
  memory search <query>  Search memory
  kernel status          Show kernel status
  kernel syscalls        List system calls
  events                 Show recent events
  clear                  Clear terminal
  version                Show AiOS version
`.trim()

async function executeCommand(input: string): Promise<{ type: TerminalLine["type"]; text: string }[]> {
  const parts = input.trim().split(/\s+/)
  const cmd = parts[0]?.toLowerCase()

  if (!cmd) return []

  switch (cmd) {
    case "help":
      return [{ type: "info", text: HELP_TEXT }]

    case "version":
      return [{ type: "success", text: "AiOS v1.0.0 — Kernel ONLINE — Build 20260101" }]

    case "clear":
      return [{ type: "output", text: "__CLEAR__" }]

    case "agents": {
      const sub = parts[1]
      if (!sub) {
        const res = await fetch("/api/agents")
        const data = await res.json()
        const lines = data.agents.map(
          (a: any) => `  ${a.id.padEnd(24)} ${a.name.padEnd(20)} [${a.status.padEnd(10)}] ${a.model}`
        )
        return [
          { type: "info", text: `AGENTS (${data.agents.length}):\n  ${"ID".padEnd(24)} ${"NAME".padEnd(20)} ${"STATUS".padEnd(12)} MODEL` },
          { type: "output", text: lines.join("\n") },
        ]
      }
      if (sub === "start" || sub === "stop") {
        const id = parts[2]
        if (!id) return [{ type: "error", text: `Usage: agents ${sub} <agent_id>` }]
        const status = sub === "start" ? "running" : "idle"
        await fetch(`/api/agents/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        })
        return [{ type: "success", text: `Agent ${id} → ${status}` }]
      }
      return [{ type: "error", text: `Unknown subcommand: ${sub}. Try 'help'.` }]
    }

    case "tools": {
      const sub = parts[1]
      if (!sub) {
        const res = await fetch("/api/tools")
        const data = await res.json()
        const lines = data.tools.map(
          (t: any) =>
            `  ${t.name.padEnd(20)} [${t.enabled ? "ENABLED " : "DISABLED"}] ${t.category} — ${t.callCount} calls`
        )
        return [
          { type: "info", text: `TOOLS (${data.tools.length}):` },
          { type: "output", text: lines.join("\n") },
        ]
      }
      if (sub === "enable" || sub === "disable") {
        const name = parts[2]
        if (!name) return [{ type: "error", text: `Usage: tools ${sub} <name>` }]
        const res = await fetch("/api/tools")
        const data = await res.json()
        const tool = data.tools.find((t: any) => t.name === name)
        if (!tool) return [{ type: "error", text: `Tool not found: ${name}` }]
        await fetch(`/api/tools/${tool.id}/toggle`, { method: "POST" })
        return [{ type: "success", text: `Tool '${name}' ${sub}d` }]
      }
      return [{ type: "error", text: `Unknown subcommand: ${sub}. Try 'help'.` }]
    }

    case "memory": {
      const sub = parts[1]
      const queryStr = parts.slice(2).join(" ")
      const url = sub === "search" && queryStr
        ? `/api/memory?q=${encodeURIComponent(queryStr)}`
        : "/api/memory"
      const res = await fetch(url)
      const data = await res.json()
      const items = data.entries ?? data.results?.map((r: any) => r.entry) ?? []
      if (items.length === 0) return [{ type: "info", text: "No memory entries found." }]
      const lines = items.map((e: any) => `  ${e.key.padEnd(28)} ${e.value.slice(0, 60)}`)
      return [
        { type: "info", text: `MEMORY (${items.length}):` },
        { type: "output", text: lines.join("\n") },
      ]
    }

    case "kernel": {
      const sub = parts[1]
      const res = await fetch("/api/kernel")
      const data = await res.json()
      if (sub === "status") {
        const s = data.status
        return [
          {
            type: "info",
            text: [
              `KERNEL STATUS`,
              `  Version   : ${s.version}`,
              `  Uptime    : ${Math.floor(s.uptime / 60)}m ${s.uptime % 60}s`,
              `  Status    : ${s.status.toUpperCase()}`,
              `  CPU       : ${s.cpuPercent.toFixed(1)}%`,
              `  Memory    : ${s.memoryPercent.toFixed(1)}%`,
              `  Models    : ${s.models.length} registered`,
            ].join("\n"),
          },
        ]
      }
      if (sub === "syscalls") {
        const lines = data.syscalls.map(
          (sc: any) =>
            `  ${sc.name.padEnd(20)} [${sc.privileged ? "PRIV" : "    "}] ${sc.description}`
        )
        return [
          { type: "info", text: `SYSCALLS (${data.syscalls.length}):` },
          { type: "output", text: lines.join("\n") },
        ]
      }
      return [{ type: "error", text: "Usage: kernel status | kernel syscalls" }]
    }

    case "events": {
      const res = await fetch("/api/events?limit=10")
      const data = await res.json()
      if (!data.events?.length) return [{ type: "info", text: "No events in history." }]
      const lines = data.events.map(
        (e: any) =>
          `  [${e.level.toUpperCase().padEnd(5)}] ${e.type.padEnd(24)} ${e.message}`
      )
      return [
        { type: "info", text: "RECENT EVENTS:" },
        { type: "output", text: lines.join("\n") },
      ]
    }

    default:
      return [
        { type: "error", text: `Command not found: '${cmd}'. Type 'help' for available commands.` },
      ]
  }
}

let lineCounter = 0
function makeId() {
  return `tl_${++lineCounter}`
}

export function AiOSTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: makeId(),
      type: "info",
      text: "AiOS Terminal v1.0.0 — Type 'help' for available commands.",
      timestamp: new Date().toISOString(),
    },
    {
      id: makeId(),
      type: "info",
      text: `Kernel ONLINE — ${new Date().toLocaleString()}`,
      timestamp: new Date().toISOString(),
    },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [running, setRunning] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines])

  async function handleSubmit() {
    if (!input.trim() || running) return
    const cmd = input.trim()
    setInput("")
    setHistory((h) => [cmd, ...h.slice(0, 49)])
    setHistoryIdx(-1)
    setRunning(true)

    const inputLine: TerminalLine = {
      id: makeId(),
      type: "input",
      text: cmd,
      timestamp: new Date().toISOString(),
    }

    setLines((l) => [...l, inputLine])

    const results = await executeCommand(cmd)

    if (results.some((r) => r.text === "__CLEAR__")) {
      setLines([])
    } else {
      const newLines: TerminalLine[] = results.map((r) => ({
        id: makeId(),
        type: r.type,
        text: r.text,
        timestamp: new Date().toISOString(),
      }))
      setLines((l) => [...l, ...newLines])
    }

    setRunning(false)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const next = Math.min(historyIdx + 1, history.length - 1)
      setHistoryIdx(next)
      setInput(history[next] ?? "")
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      const next = Math.max(historyIdx - 1, -1)
      setHistoryIdx(next)
      setInput(next === -1 ? "" : history[next] ?? "")
    }
  }

  return (
    <div
      className="flex flex-col h-full rounded-xl border border-primary/20 bg-[#080c12] overflow-hidden glow-blue font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-[hsl(var(--fx-rail))]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-destructive/70" />
          <span className="w-3 h-3 rounded-full bg-warning/70" />
          <span className="w-3 h-3 rounded-full bg-[hsl(var(--fx-glow-green))]/70" />
        </div>
        <span className="text-xs text-muted-foreground ml-2">aios — operator shell</span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--fx-glow-green))] animate-pulse" />
          <span className="text-[10px] text-[hsl(var(--fx-glow-green))]">CONNECTED</span>
        </span>
      </div>

      {/* Output */}
      <div className="flex-1 overflow-y-auto p-4 text-sm space-y-0.5">
        {lines.map((line) => (
          <div key={line.id} className="leading-relaxed">
            {line.type === "input" ? (
              <div className="flex items-start gap-2">
                <span className="text-primary select-none shrink-0">aios@kernel:~$</span>
                <span className="text-foreground whitespace-pre-wrap">{line.text}</span>
              </div>
            ) : (
              <div
                className={cn(
                  "whitespace-pre-wrap pl-0",
                  line.type === "error" && "text-destructive",
                  line.type === "success" && "text-[hsl(var(--fx-glow-green))]",
                  line.type === "info" && "text-primary/80",
                  line.type === "output" && "text-muted-foreground"
                )}
              >
                {line.text}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-border bg-[hsl(var(--fx-rail))]">
        <span className="text-primary text-sm select-none shrink-0">aios@kernel:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={running}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent text-sm text-foreground outline-none caret-primary placeholder:text-muted-foreground/50 min-h-[44px]"
          placeholder={running ? "running..." : "type a command..."}
        />
        {running && (
          <span className="text-[10px] text-muted-foreground animate-pulse">executing</span>
        )}
      </div>
    </div>
  )
}
