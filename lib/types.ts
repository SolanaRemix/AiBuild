export type TargetType = "web" | "mobile" | "desktop"

export type ProjectStatus = "draft" | "ready" | "synced" | "deployed" | "building"

export type TemplateType = "landing" | "dashboard" | "saas" | "app" | "custom"

export type UserRole = "user" | "dev" | "admin"

export type PlanTier = "free" | "pro" | "enterprise"

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

// Agent types
export interface UserAgent {
  id: string
  userId: string
  name: string
  baseModel: string
  role: string
  capabilities: ("codegen" | "refactor" | "analysis")[]
  allowedModels: string[]
  maxTokens: number
  systemPrompt: string
  usage: number
  createdAt: string
  updatedAt: string
}

// Billing types
export interface BillingOverview {
  plan: PlanTier
  usage: {
    requests: number
    requestsLimit: number
    builds: number
    buildsLimit: number
    projects: number
    projectsLimit: number
  }
  nextBillingDate: string
  amountDue: number
}

export interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
}

// Affiliate types
export interface AffiliateStats {
  referralLink: string
  clicks: number
  signups: number
  conversions: number
  earned: number
  commissionRate: number
}

// Quest types
export interface Quest {
  id: string
  title: string
  description: string
  progress: number
  total: number
  reward: string
  completed: boolean
}

// Admin user type
export interface AdminUser {
  id: string
  email: string
  role: UserRole
  projects: number
  status: "active" | "suspended" | "pending"
  createdAt: string
}

// Global agent type
export interface GlobalAgent {
  id: string
  name: string
  systemPrompt: string
  allowedModels: string[]
  routingPolicy: "primary" | "fallback" | "free-only"
  enabled: boolean
}

// Plan config
export interface PlanConfig {
  tier: PlanTier
  name: string
  price: number
  limits: {
    projects: number
    builds: number
    requests: number
  }
  modelAccess: string[]
}

// Feature flag
export interface FeatureFlag {
  id: string
  name: string
  description: string
  enabled: boolean
}

// SDK key
export interface SdkKey {
  id: string
  name: string
  key: string
  scopes: string[]
  lastUsed: string | null
  createdAt: string
}

// Webhook
export interface WebhookConfig {
  id: string
  url: string
  events: string[]
  enabled: boolean
  lastTriggered: string | null
}
