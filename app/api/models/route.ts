import { NextResponse } from "next/server"
import { registry } from "@/core/ai/model-registry"

export async function GET() {
  const models = await registry.list()
  return NextResponse.json({ models })
}
