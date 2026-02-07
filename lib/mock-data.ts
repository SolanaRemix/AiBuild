import type {
  Project,
  ProjectFile,
  Deployment,
  ModelProviderConfig,
  PromptLogEntry,
  TraceLogEntry,
  LogicFlowIssue,
  UserAgent,
  BillingOverview,
  Invoice,
  AffiliateStats,
  Quest,
  AdminUser,
  GlobalAgent,
  PlanConfig,
  FeatureFlag,
  SdkKey,
  WebhookConfig,
} from "./types"

export const mockModels: ModelProviderConfig[] = [
  { id: "m1", name: "OpenAI", modelId: "gpt-4o", capabilities: ["code", "chat", "analysis"], costTier: "paid", enabled: true },
  { id: "m2", name: "Google", modelId: "gemini-2.0-flash", capabilities: ["code", "chat"], costTier: "free", enabled: true },
  { id: "m3", name: "Anthropic", modelId: "claude-sonnet-4-20250514", capabilities: ["code", "chat", "analysis"], costTier: "paid", enabled: true },
  { id: "m4", name: "xAI", modelId: "grok-3", capabilities: ["code", "chat"], costTier: "free", enabled: false },
  { id: "m5", name: "DeepSeek", modelId: "deepseek-coder", capabilities: ["code"], costTier: "free", enabled: true },
]

export const mockProjects: Project[] = [
  { id: "proj_1", userId: "user_1", name: "AI Wallet App", slug: "ai-wallet-app", prompt: "Build a minimal multi-platform AI wallet app with crypto tracking and portfolio analytics.", templateType: "app", primaryTarget: "web", status: "deployed", createdAt: "2025-12-15T10:30:00Z", updatedAt: "2026-01-20T14:22:00Z" },
  { id: "proj_2", userId: "user_1", name: "SaaS Landing Page", slug: "saas-landing", prompt: "Create a modern SaaS landing page with pricing, features, and testimonials sections.", templateType: "landing", primaryTarget: "web", status: "ready", createdAt: "2026-01-05T08:00:00Z", updatedAt: "2026-01-18T11:45:00Z" },
  { id: "proj_3", userId: "user_1", name: "Task Manager Mobile", slug: "task-manager-mobile", prompt: "Build a task management mobile app with kanban boards, reminders, and team collaboration.", templateType: "app", primaryTarget: "mobile", status: "building", createdAt: "2026-01-28T16:00:00Z", updatedAt: "2026-02-01T09:30:00Z" },
  { id: "proj_4", userId: "user_1", name: "Admin Dashboard", slug: "admin-dashboard", prompt: "Build a comprehensive admin dashboard with user management, analytics, and settings.", templateType: "dashboard", primaryTarget: "web", status: "draft", createdAt: "2026-02-03T12:00:00Z", updatedAt: "2026-02-03T12:00:00Z" },
]

export const mockFiles: ProjectFile[] = [
  { id: "f1", projectId: "proj_1", path: "app/layout.tsx", content: `import type { Metadata } from "next"\nimport "./globals.css"\n\nexport const metadata: Metadata = {\n  title: "AI Wallet",\n  description: "AI-powered crypto wallet",\n}\n\nexport default function RootLayout({\n  children,\n}: {\n  children: React.ReactNode\n}) {\n  return (\n    <html lang="en">\n      <body>{children}</body>\n    </html>\n  )\n}`, language: "tsx", generatedBy: "ai", version: 1, createdAt: "2025-12-15T10:30:00Z", updatedAt: "2025-12-15T10:30:00Z" },
  { id: "f2", projectId: "proj_1", path: "app/page.tsx", content: `export default function Home() {\n  return (\n    <main className="flex min-h-screen flex-col items-center justify-center">\n      <h1 className="text-4xl font-bold">AI Wallet</h1>\n      <p className="mt-4 text-lg text-muted-foreground">Your intelligent crypto companion</p>\n    </main>\n  )\n}`, language: "tsx", generatedBy: "ai", version: 2, createdAt: "2025-12-15T10:30:00Z", updatedAt: "2026-01-10T09:00:00Z" },
  { id: "f3", projectId: "proj_1", path: "app/globals.css", content: `@tailwind base;\n@tailwind components;\n@tailwind utilities;`, language: "css", generatedBy: "ai", version: 1, createdAt: "2025-12-15T10:30:00Z", updatedAt: "2025-12-15T10:30:00Z" },
  { id: "f4", projectId: "proj_1", path: "components/wallet-card.tsx", content: `"use client"\n\nimport { Card } from "@/components/ui/card"\n\nexport function WalletCard({ balance }: { balance: number }) {\n  return (\n    <Card className="p-6">\n      <h2 className="text-sm text-muted-foreground">Total Balance</h2>\n      <p className="text-3xl font-bold">\${balance.toLocaleString()}</p>\n    </Card>\n  )\n}`, language: "tsx", generatedBy: "ai", version: 1, createdAt: "2025-12-15T10:30:00Z", updatedAt: "2025-12-15T10:30:00Z" },
  { id: "f5", projectId: "proj_1", path: "package.json", content: `{\n  "name": "ai-wallet-app",\n  "version": "0.1.0",\n  "private": true,\n  "scripts": {\n    "dev": "next dev",\n    "build": "next build"\n  },\n  "dependencies": {\n    "next": "16.1.6",\n    "react": "^19",\n    "react-dom": "^19"\n  }\n}`, language: "json", generatedBy: "ai", version: 1, createdAt: "2025-12-15T10:30:00Z", updatedAt: "2025-12-15T10:30:00Z" },
]

export const mockDeployments: Deployment[] = [
  { id: "d1", projectId: "proj_1", target: "web", provider: "vercel", providerProjectId: "prj_abc123", artifactUrl: "https://ai-wallet-app.vercel.app", status: "ready", logsUrl: null, createdAt: "2026-01-20T14:00:00Z", updatedAt: "2026-01-20T14:22:00Z" },
  { id: "d2", projectId: "proj_3", target: "mobile", provider: "github-actions", providerProjectId: null, artifactUrl: null, status: "building", logsUrl: null, createdAt: "2026-02-01T09:00:00Z", updatedAt: "2026-02-01T09:30:00Z" },
  { id: "d3", projectId: "proj_2", target: "web", provider: "vercel", providerProjectId: "prj_def456", artifactUrl: "https://saas-landing.vercel.app", status: "ready", logsUrl: null, createdAt: "2026-01-18T12:00:00Z", updatedAt: "2026-01-18T12:15:00Z" },
  { id: "d4", projectId: "proj_1", target: "web", provider: "vercel", providerProjectId: "prj_abc123", artifactUrl: null, status: "failed", logsUrl: null, createdAt: "2026-01-19T10:00:00Z", updatedAt: "2026-01-19T10:05:00Z" },
]

export const mockPromptLogs: PromptLogEntry[] = [
  { id: "pl1", projectId: "proj_1", providerId: "m2", modelId: "gemini-2.0-flash", role: "user", content: "Build a minimal multi-platform AI wallet app with crypto tracking and portfolio analytics.", createdAt: "2025-12-15T10:30:00Z" },
  { id: "pl2", projectId: "proj_1", providerId: "m2", modelId: "gemini-2.0-flash", role: "assistant", content: "I'll create an AI wallet app with the following structure: app/layout.tsx, app/page.tsx, components/wallet-card.tsx, components/portfolio-chart.tsx...", createdAt: "2025-12-15T10:30:05Z" },
]

export const mockTraceLogs: TraceLogEntry[] = [
  { id: "tl1", projectId: "proj_1", kind: "generation", status: "ok", metadata: { filesGenerated: 5, model: "gemini-2.0-flash", durationMs: 4200 }, createdAt: "2025-12-15T10:30:05Z" },
  { id: "tl2", projectId: "proj_1", kind: "deploy", status: "ok", metadata: { target: "web", provider: "vercel", url: "https://ai-wallet-app.vercel.app" }, createdAt: "2026-01-20T14:22:00Z" },
  { id: "tl3", projectId: "proj_3", kind: "generation", status: "ok", metadata: { filesGenerated: 12, model: "gemini-2.0-flash", durationMs: 8100 }, createdAt: "2026-01-28T16:00:30Z" },
  { id: "tl4", projectId: "proj_2", kind: "sync", status: "ok", metadata: { branch: "main", files: 8 }, createdAt: "2026-01-18T11:45:00Z" },
  { id: "tl5", projectId: "proj_1", kind: "test", status: "error", metadata: { failedTests: 2, totalTests: 8 }, createdAt: "2026-01-19T09:00:00Z" },
]

export const mockIssues: LogicFlowIssue[] = [
  { kind: "missing-check", path: "app/page.tsx", message: "No null check for wallet balance data before rendering", suggestion: "Add a loading state or fallback when balance is undefined" },
  { kind: "unhandled-error", path: "components/wallet-card.tsx", message: "API fetch has no error boundary or try-catch", suggestion: "Wrap fetch call in try-catch and show error state to user" },
]

// Agents
export const mockUserAgents: UserAgent[] = [
  { id: "a1", userId: "user_1", name: "CodeBot", baseModel: "gpt-4o", role: "Full-stack code generator", capabilities: ["codegen", "refactor"], allowedModels: ["gpt-4o", "gemini-2.0-flash"], maxTokens: 8192, systemPrompt: "You are a full-stack code generator. Produce clean, tested code.", usage: 142, createdAt: "2026-01-10T08:00:00Z", updatedAt: "2026-02-01T12:00:00Z" },
  { id: "a2", userId: "user_1", name: "Analyzer", baseModel: "claude-sonnet-4-20250514", role: "Code review & analysis", capabilities: ["analysis"], allowedModels: ["claude-sonnet-4-20250514"], maxTokens: 4096, systemPrompt: "You are a code analyzer. Find bugs, suggest improvements.", usage: 57, createdAt: "2026-01-15T10:00:00Z", updatedAt: "2026-01-28T15:00:00Z" },
  { id: "a3", userId: "user_1", name: "RefactorBot", baseModel: "gemini-2.0-flash", role: "Code refactoring specialist", capabilities: ["refactor", "analysis"], allowedModels: ["gemini-2.0-flash", "deepseek-coder"], maxTokens: 6144, systemPrompt: "You are a refactoring specialist. Improve code quality without changing behavior.", usage: 23, createdAt: "2026-01-20T14:00:00Z", updatedAt: "2026-01-25T09:00:00Z" },
]

// Billing
export const mockBilling: BillingOverview = {
  plan: "pro",
  usage: { requests: 2841, requestsLimit: 10000, builds: 47, buildsLimit: 100, projects: 4, projectsLimit: 25 },
  nextBillingDate: "2026-03-01T00:00:00Z",
  amountDue: 29,
}

export const mockInvoices: Invoice[] = [
  { id: "inv_1", date: "2026-02-01T00:00:00Z", amount: 29, status: "paid" },
  { id: "inv_2", date: "2026-01-01T00:00:00Z", amount: 29, status: "paid" },
  { id: "inv_3", date: "2025-12-01T00:00:00Z", amount: 29, status: "paid" },
]

// Affiliate
export const mockAffiliate: AffiliateStats = {
  referralLink: "https://aibuild.dev/ref/user_1",
  clicks: 342,
  signups: 28,
  conversions: 12,
  earned: 156,
  commissionRate: 0.2,
}

// Quests
export const mockQuests: Quest[] = [
  { id: "q1", title: "Create your first project", description: "Create a new project using the CyberAi builder", progress: 1, total: 1, reward: "Builder Badge", completed: true },
  { id: "q2", title: "Deploy to Vercel", description: "Deploy any project to Vercel for the first time", progress: 1, total: 1, reward: "Deployer Badge", completed: true },
  { id: "q3", title: "Build an APK", description: "Generate a mobile APK build from your project", progress: 0, total: 1, reward: "Mobile Pioneer Badge", completed: false },
  { id: "q4", title: "Sync 5 projects to GitHub", description: "Push 5 different projects to GitHub repositories", progress: 3, total: 5, reward: "10% affiliate boost", completed: false },
  { id: "q5", title: "Invite 3 friends", description: "Refer 3 users who sign up and create a project", progress: 1, total: 3, reward: "Pro trial week", completed: false },
]

// Admin users
export const mockAdminUsers: AdminUser[] = [
  { id: "user_1", email: "dev@aibuild.dev", role: "admin", projects: 4, status: "active", createdAt: "2025-11-01T00:00:00Z" },
  { id: "user_2", email: "alice@example.com", role: "dev", projects: 8, status: "active", createdAt: "2025-12-15T00:00:00Z" },
  { id: "user_3", email: "bob@example.com", role: "user", projects: 2, status: "active", createdAt: "2026-01-01T00:00:00Z" },
  { id: "user_4", email: "carol@example.com", role: "user", projects: 0, status: "pending", createdAt: "2026-02-01T00:00:00Z" },
  { id: "user_5", email: "dave@example.com", role: "user", projects: 1, status: "suspended", createdAt: "2026-01-15T00:00:00Z" },
]

// Global agents
export const mockGlobalAgents: GlobalAgent[] = [
  { id: "ga1", name: "CyberAi Code Builder", systemPrompt: "You are the core code generation agent...", allowedModels: ["gpt-4o", "gemini-2.0-flash", "claude-sonnet-4-20250514"], routingPolicy: "primary", enabled: true },
  { id: "ga2", name: "Analyzer", systemPrompt: "You are the code analysis agent...", allowedModels: ["claude-sonnet-4-20250514", "gpt-4o"], routingPolicy: "fallback", enabled: true },
  { id: "ga3", name: "Free Tier Bot", systemPrompt: "You are the free tier code assistant...", allowedModels: ["gemini-2.0-flash", "deepseek-coder"], routingPolicy: "free-only", enabled: true },
]

// Plans
export const mockPlans: PlanConfig[] = [
  { tier: "free", name: "Free", price: 0, limits: { projects: 3, builds: 10, requests: 500 }, modelAccess: ["gemini-2.0-flash", "deepseek-coder"] },
  { tier: "pro", name: "Pro", price: 29, limits: { projects: 25, builds: 100, requests: 10000 }, modelAccess: ["gpt-4o", "gemini-2.0-flash", "claude-sonnet-4-20250514", "deepseek-coder"] },
  { tier: "enterprise", name: "Enterprise", price: 199, limits: { projects: -1, builds: -1, requests: -1 }, modelAccess: ["gpt-4o", "gemini-2.0-flash", "claude-sonnet-4-20250514", "grok-3", "deepseek-coder"] },
]

// Feature flags
export const mockFeatureFlags: FeatureFlag[] = [
  { id: "ff1", name: "desktop_builds", description: "Enable desktop build targets (Electron/Tauri)", enabled: false },
  { id: "ff2", name: "grok_model", description: "Enable xAI Grok model for all users", enabled: false },
  { id: "ff3", name: "team_collab", description: "Enable team collaboration features", enabled: false },
  { id: "ff4", name: "ai_analysis", description: "Enable AI-powered code analysis", enabled: true },
  { id: "ff5", name: "webhook_v2", description: "Use v2 webhook delivery system", enabled: true },
]

// SDK keys
export const mockSdkKeys: SdkKey[] = [
  { id: "sk1", name: "Production", key: "sk_live_abc...xyz", scopes: ["projects:read", "projects:write", "deployments:write"], lastUsed: "2026-02-05T14:00:00Z", createdAt: "2026-01-01T00:00:00Z" },
  { id: "sk2", name: "Development", key: "sk_test_def...uvw", scopes: ["projects:read"], lastUsed: "2026-02-04T10:00:00Z", createdAt: "2026-01-15T00:00:00Z" },
]

// Webhooks
export const mockWebhooks: WebhookConfig[] = [
  { id: "wh1", url: "https://api.example.com/webhooks/aibuild", events: ["project.created", "deployment.ready"], enabled: true, lastTriggered: "2026-02-05T12:00:00Z" },
  { id: "wh2", url: "https://slack.example.com/hooks/builds", events: ["deployment.ready", "deployment.failed"], enabled: true, lastTriggered: "2026-02-04T15:00:00Z" },
]
