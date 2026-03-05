import { NextRequest, NextResponse } from "next/server"
import { eventBus } from "@/core/events"
import type { EventType } from "@/types"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get("limit") ?? "100", 10)
  const type = searchParams.get("type") as EventType | null
  const events = eventBus.getHistory(limit, type ?? undefined)
  return NextResponse.json({ events })
}
