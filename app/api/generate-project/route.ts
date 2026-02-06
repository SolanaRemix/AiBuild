import { NextResponse } from "next/server"
import { projectService } from "@/core/domain/project-service"
import { z } from "zod"

const generateProjectSchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
  templateType: z.enum(["landing", "dashboard", "saas", "app", "custom"]).default("app"),
  primaryTarget: z.enum(["web", "mobile", "desktop"]).default("web"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = generateProjectSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { prompt, templateType, primaryTarget } = parsed.data

    const result = await projectService.createFromPrompt({
      prompt,
      templateType,
      primaryTarget,
      userId: "user_1", // In production, from auth session
    })

    return NextResponse.json({
      projectId: result.project.id,
      slug: result.project.slug,
      status: result.project.status,
      filesGenerated: result.files.length,
    })
  } catch (error) {
    console.error("Generate project error:", error)
    return NextResponse.json(
      { error: "Failed to generate project" },
      { status: 500 }
    )
  }
}
