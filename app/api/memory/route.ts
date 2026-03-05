import { NextRequest, NextResponse } from "next/server"
import { memoryLayer } from "@/core/memory"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const agentId = searchParams.get("agentId") ?? undefined
  const query = searchParams.get("q")

  if (query) {
    const results = memoryLayer.search(query, agentId)
    return NextResponse.json({ results, stats: memoryLayer.getStats() })
  }

  const entries = memoryLayer.getAll(agentId)
  return NextResponse.json({ entries, stats: memoryLayer.getStats() })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const entry = memoryLayer.write(body)
    return NextResponse.json({ entry }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
