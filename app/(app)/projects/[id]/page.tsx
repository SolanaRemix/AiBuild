import type { Metadata } from "next"
import { WorkspaceView } from "@/components/workspace/workspace-view"
import {
  mockProjects,
  mockFiles,
  mockDeployments,
  mockPromptLogs,
  mockTraceLogs,
  mockIssues,
} from "@/lib/mock-data"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const project = mockProjects.find((p) => p.id === id)
  return {
    title: project ? project.name : "Project Not Found",
  }
}

export default async function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = mockProjects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  const files = mockFiles.filter((f) => f.projectId === id)
  const deployment = mockDeployments.find((d) => d.projectId === id) || null
  const promptLogs = mockPromptLogs.filter((l) => l.projectId === id)
  const traceLogs = mockTraceLogs.filter((l) => l.projectId === id)

  return (
    <WorkspaceView
      project={project}
      files={files.length > 0 ? files : mockFiles}
      deployment={deployment}
      promptLogs={promptLogs.length > 0 ? promptLogs : mockPromptLogs}
      traceLogs={traceLogs.length > 0 ? traceLogs : mockTraceLogs}
      issues={mockIssues}
    />
  )
}
