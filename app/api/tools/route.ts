import { NextRequest, NextResponse } from "next/server"
import { toolRegistry } from "@/core/tools/registry"

export async function GET() {
  try {
    const tools = toolRegistry.getAll()
    return NextResponse.json({ tools, stats: toolRegistry.getStats() })
  } catch {
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const tool = toolRegistry.register(body)
    return NextResponse.json({ tool }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
