import type { Project, ProjectFile, TargetType, TemplateType } from "@/lib/types"
import { projectGenerator } from "@/core/ai/project-generator"

/**
 * Project Service - manages project CRUD and generation.
 * In production, this persists to Postgres via Prisma.
 * For now, operates in-memory.
 */
export class ProjectService {
  private projects: Map<string, Project> = new Map()
  private files: Map<string, ProjectFile[]> = new Map()

  async createFromPrompt(input: {
    prompt: string
    templateType: TemplateType
    primaryTarget: TargetType
    userId: string
  }): Promise<{ project: Project; files: ProjectFile[] }> {
    const result = await projectGenerator.generate({
      prompt: input.prompt,
      templateType: input.templateType,
      userId: input.userId,
      primaryTarget: input.primaryTarget,
    })

    const projectId = `proj_${Date.now()}`
    const slug = result.plan.name.toLowerCase().replace(/[^a-z0-9-]/g, "-")

    const project: Project = {
      id: projectId,
      userId: input.userId,
      name: result.plan.name,
      slug,
      prompt: input.prompt,
      templateType: input.templateType,
      primaryTarget: input.primaryTarget,
      status: "ready",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const projectFiles: ProjectFile[] = result.files.map((f, i) => ({
      id: `f_${Date.now()}_${i}`,
      projectId,
      path: f.path,
      content: f.content,
      language: f.path.split(".").pop() || null,
      generatedBy: "ai" as const,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))

    this.projects.set(projectId, project)
    this.files.set(projectId, projectFiles)

    return { project, files: projectFiles }
  }

  async getById(id: string): Promise<Project | null> {
    return this.projects.get(id) || null
  }

  async listByUser(userId: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter((p) => p.userId === userId)
  }

  async getFiles(projectId: string): Promise<ProjectFile[]> {
    return this.files.get(projectId) || []
  }
}

export const projectService = new ProjectService()
