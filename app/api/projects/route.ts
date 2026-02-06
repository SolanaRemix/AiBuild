import { NextResponse } from "next/server"
import { mockProjects } from "@/lib/mock-data"

export async function GET() {
  return NextResponse.json({ projects: mockProjects })
}
