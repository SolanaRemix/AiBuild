"use client"

import { useState, useRef, useEffect } from "react"
import { GlowCard, GlowButton, GlowBadge } from "@/components/aura"
import { Send, Sparkles, Code, Terminal, Copy, Check, Bot, User as UserIcon, Zap } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  tools?: { name: string; status: "running" | "complete" }[]
  code?: string
}

const mockModels = [
  { id: "gpt-4", name: "GPT-4 Turbo", provider: "OpenAI" },
  { id: "claude-3", name: "Claude 3 Opus", provider: "Anthropic" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "Google" },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI assistant. I can help you with code generation, debugging, architecture decisions, and more. What would you like to build today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState(mockModels[0])
  const [isStreaming, setIsStreaming] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsStreaming(true)

    // Simulate AI response with streaming
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I understand you want to build that. Let me help you with a solution...",
        timestamp: new Date(),
        tools: [
          { name: "Code Analysis", status: "complete" },
          { name: "File Generation", status: "running" },
        ],
        code: `function example() {\n  console.log('Generated code');\n  return true;\n}`,
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsStreaming(false)
    }, 1500)
  }

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Chat</h1>
          <p className="text-muted-foreground">Advanced conversational AI for development</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedModel.id}
            onChange={(e) => {
              const model = mockModels.find((m) => m.id === e.target.value)
              if (model) setSelectedModel(model)
            }}
          >
            {mockModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          <GlowBadge variant="cyan">
            {selectedModel.provider}
          </GlowBadge>
        </div>
      </div>

      {/* Chat Messages */}
      <GlowCard className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  message.role === "user"
                    ? "bg-primary/10"
                    : "bg-muted glow-blue"
                )}
              >
                {message.role === "user" ? (
                  <UserIcon className="h-4 w-4 text-primary" />
                ) : (
                  <Bot className="h-4 w-4 text-foreground" />
                )}
              </div>
              <div className="flex-1 space-y-3">
                <div
                  className={cn(
                    "rounded-xl px-4 py-3 max-w-3xl",
                    message.role === "user"
                      ? "bg-primary/10 text-foreground ml-auto"
                      : "bg-muted text-foreground"
                  )}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Tool usage indicators */}
                {message.tools && (
                  <div className="flex flex-wrap gap-2">
                    {message.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5"
                      >
                        <Terminal className="h-3 w-3 text-primary" />
                        <span className="text-xs text-muted-foreground">{tool.name}</span>
                        {tool.status === "running" ? (
                          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                        ) : (
                          <Check className="h-3 w-3 text-success" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Code block */}
                {message.code && (
                  <div className="rounded-lg border border-border bg-background overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
                      <div className="flex items-center gap-2">
                        <Code className="h-4 w-4 text-primary" />
                        <span className="text-xs font-medium text-foreground">Generated Code</span>
                      </div>
                      <button
                        onClick={() => copyCode(message.code!, message.id)}
                        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="h-3 w-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-sm text-foreground overflow-x-auto">
                      <code>{message.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isStreaming && (
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted glow-blue">
                <Bot className="h-4 w-4 text-foreground" />
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-3">
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="h-2 w-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-xs text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder="Ask anything... (Shift+Enter for new line)"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isStreaming}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
            </div>
            <GlowButton
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="px-6"
            >
              <Send className="h-4 w-4" />
            </GlowButton>
          </div>
          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-muted-foreground">
              AI can make mistakes. Verify important information.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Zap className="h-3 w-3" />
              <span>Powered by {selectedModel.name}</span>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  )
}
