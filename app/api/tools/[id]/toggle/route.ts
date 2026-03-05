import { NextRequest, NextResponse } from "next/server"
import { toolRegistry } from "@/core/tools/registry"

export async function POST(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const tool = toolRegistry.toggle(id)
    return NextResponse.json({ tool })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 404 })
  }
}
