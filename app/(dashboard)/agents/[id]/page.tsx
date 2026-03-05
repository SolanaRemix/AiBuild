import { agentRegistry } from "@/core/agents/registry"
import { toolRegistry } from "@/core/tools/registry"
import { notFound } from "next/navigation"
import { AgentStatusBadge } from "@/components/ui/status-badge"
import { AgentDetailClient } from "@/components/agents/agent-detail-client"
import { Bot, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function AgentDetailPage({ params }: Props) {
  const { id } = await params
  const agent = agentRegistry.getById(id)
  if (!agent) notFound()

  const allTools = toolRegistry.getAll()

  return (
    <div className="p-6 space-y-6 max-w-screen-xl mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href="/agents"
          className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Agents
        </Link>
        <span className="text-muted-foreground">/</span>
        <span className="text-xs font-mono text-foreground">{agent.name}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-blue">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold font-mono text-foreground">{agent.name}</h1>
            <AgentStatusBadge status={agent.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{agent.description}</p>
        </div>
      </div>

      <AgentDetailClient agent={agent} allTools={allTools} />
    </div>
  )
}
