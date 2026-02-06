import { NextResponse } from "next/server"
import { mockFiles } from "@/lib/mock-data"

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const files = mockFiles.filter((f) => f.projectId === id)
  return NextResponse.json({ files })
}
