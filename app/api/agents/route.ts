import { NextRequest, NextResponse } from "next/server"
import { agentRegistry } from "@/core/agents/registry"

export async function GET() {
  try {
    const agents = agentRegistry.getAll()
    return NextResponse.json({ agents, stats: agentRegistry.getStats() })
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch agents" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const agent = agentRegistry.create(body)
    return NextResponse.json({ agent }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Failed to create agent" }, { status: 400 })
  }
}
