export type TargetType = "web" | "mobile" | "desktop"

export type ProjectStatus = "draft" | "ready" | "synced" | "deployed" | "building"

export type TemplateType = "landing" | "dashboard" | "saas" | "app" | "custom"

export interface Project {
  id: string
  userId: string
  name: string
  slug: string
  prompt: string
  templateType: TemplateType
  primaryTarget: TargetType
  status: ProjectStatus
  createdAt: string
  updatedAt: string
}

export interface ProjectFile {
  id: string
  projectId: string
  path: string
  content: string
  language: string | null
  generatedBy: "ai" | "user"
  version: number
  createdAt: string
  updatedAt: string
}

export interface Deployment {
  id: string
  projectId: string
  target: TargetType
  provider: "vercel" | "github-actions" | "local-runner"
  providerProjectId: string | null
  artifactUrl: string | null
  status: "pending" | "building" | "ready" | "failed"
  logsUrl: string | null
  createdAt: string
  updatedAt: string
}

export interface ModelProviderConfig {
  id: string
  name: string
  modelId: string
  capabilities: string[]
  costTier: "free" | "paid"
  enabled: boolean
}

export interface PromptLogEntry {
  id: string
  projectId: string
  providerId: string
  modelId: string
  role: "system" | "user" | "assistant"
  content: string
  createdAt: string
}

export interface TraceLogEntry {
  id: string
  projectId: string
  kind: "generation" | "refine" | "sync" | "deploy" | "test"
  status: "ok" | "error"
  metadata: Record<string, unknown>
  createdAt: string
}

export type TaskKind = "plan" | "codegen" | "refine" | "analysis"

export interface GeneratedProjectPlan {
  name: string
  targets: TargetType[]
  pages: string[]
  components: string[]
  extraArtifacts?: string[]
}

export interface GeneratedFile {
  path: string
  content: string
}

export interface LogicFlowIssue {
  kind: "missing-check" | "unsafe-call" | "dead-code" | "unhandled-error"
  path: string
  message: string
  suggestion?: string
}
