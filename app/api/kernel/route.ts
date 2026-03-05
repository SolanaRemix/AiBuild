import { NextResponse } from "next/server"
import { kernel } from "@/core/kernel"

export async function GET() {
  try {
    const status = kernel.getStatus()
    const syscalls = kernel.getSyscalls()
    return NextResponse.json({ status, syscalls })
  } catch {
    return NextResponse.json({ error: "Kernel unavailable" }, { status: 500 })
  }
}
