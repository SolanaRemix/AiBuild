import { NextResponse } from "next/server"
import { z } from "zod"

const deploySchema = z.object({
  target: z.enum(["web", "mobile", "desktop"]).default("web"),
})

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const parsed = deploySchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    // In production, this calls VercelDeployer or BuildOrchestrator
    return NextResponse.json({
      projectId: id,
      target: parsed.data.target,
      status: "pending",
      message: `Deploy initiated for project ${id} targeting ${parsed.data.target}`,
    })
  } catch (error) {
    console.error("Deploy error:", error)
    return NextResponse.json(
      { error: "Failed to initiate deployment" },
      { status: 500 }
    )
  }
}
