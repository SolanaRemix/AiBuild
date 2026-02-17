# 🏗️ AiBuild Architecture

This document provides a comprehensive overview of AiBuild's system architecture, design principles, and technical implementation.

## Architecture Overview

AiBuild follows a layered, modular architecture designed for scalability, maintainability, and extensibility.

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                        │
│   Next.js App Router + Aura FX Neo-Glow UI Components       │
│      (Dashboard, Workspace, Admin, Developer Panels)         │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                  Application Services Layer                  │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐   │
│  │   Project    │ │     File     │ │   Deployment     │   │
│  │   Service    │ │   Service    │ │    Service       │   │
│  └──────────────┘ └──────────────┘ └──────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                    CyberAi Agent Layer                       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐   │
│  │    Model     │ │   Routing    │ │    Project       │   │
│  │   Registry   │ │    Policy    │ │   Generator      │   │
│  └──────────────┘ └──────────────┘ └──────────────────┘   │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐   │
│  │ Logic Flow   │ │     Fix      │ │   Observability  │   │
│  │   Detector   │ │    Memory    │ │   (Logs/Traces)  │   │
│  └──────────────┘ └──────────────┘ └──────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│              Integration & Build Layer                       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐   │
│  │   GitHub     │ │    Vercel    │ │      Build       │   │
│  │     Sync     │ │   Deployer   │ │  Orchestrator    │   │
│  └──────────────┘ └──────────────┘ └──────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
┌────────────────────────┴────────────────────────────────────┐
│                   Data Persistence Layer                     │
│           PostgreSQL (via Prisma ORM)                        │
│  Projects | Files | Deployments | Logs | Fix Memory         │
└──────────────────────────────────────────────────────────────┘
```

## Design Principles

### 1. Factory, Not Playground
AiBuild is designed as a **production code factory** with:
- **Reproducibility** - Every generation is deterministic
- **Auditability** - Complete logs and traces
- **Testability** - Built-in testing and validation
- **Debuggability** - Full observability into the pipeline

### 2. Multi-Model Intelligence
CyberAi leverages multiple AI models through intelligent routing:
- Each model has specific strengths
- Tasks are routed to the best-suited model
- Fallback mechanisms ensure reliability
- Cost optimization through smart model selection

### 3. Separation of Concerns
Clear boundaries between layers:
- **Presentation** - UI/UX only, no business logic
- **Services** - Business logic, orchestration
- **Domain** - Core AI and domain models
- **Integration** - External system interactions
- **Persistence** - Data storage and retrieval

### 4. Extensibility
Plugin architecture for:
- Custom UI components
- Agent behaviors
- Model adapters
- Build pipelines
- Deployment providers

## Core Components

### Presentation Layer

Built with **Next.js App Router** and **React 19**, the presentation layer provides:

#### Components
- **Aura FX Neo-Glow UI Library** - Custom design system with glass morphism and neon accents
- **GlowShell** - Main application shell
- **GlowCard** - Card components with glow effects
- **GlowButton** - Interactive buttons with hover effects
- **GlowInput** - Form inputs with focus effects
- **GlowTabs** - Tabbed interfaces

#### Pages & Routes
- `/` - Landing page
- `/dashboard` - User dashboard
- `/workspace/[projectId]` - Project workspace
- `/admin` - Admin control panel
- `/dev` - Developer tools panel
- `/api/*` - REST API endpoints

### Application Services Layer

#### ProjectService
Manages project lifecycle:
```typescript
class ProjectService {
  async create(prompt: string, options: ProjectOptions): Promise<Project>
  async update(projectId: string, updates: Partial<Project>): Promise<Project>
  async delete(projectId: string): Promise<void>
  async syncToGitHub(projectId: string, options: SyncOptions): Promise<void>
  async deploy(projectId: string, target: TargetType): Promise<Deployment>
}
```

#### FileService
Handles file operations:
```typescript
class FileService {
  async create(projectId: string, file: FileInput): Promise<ProjectFile>
  async update(fileId: string, content: string): Promise<ProjectFile>
  async delete(fileId: string): Promise<void>
  async regenerate(fileId: string, prompt?: string): Promise<ProjectFile>
}
```

#### DeploymentService
Orchestrates deployments:
```typescript
class DeploymentService {
  async deployToVercel(projectId: string): Promise<Deployment>
  async buildAPK(projectId: string): Promise<Build>
  async buildDesktop(projectId: string, os: OS): Promise<Build>
  async getStatus(deploymentId: string): Promise<DeploymentStatus>
}
```

### CyberAi Agent Layer

The heart of AiBuild's intelligence.

#### Model Registry
Centralized model configuration and management:

```typescript
interface ModelProviderConfig {
  id: string
  name: string
  modelId: string
  capabilities: ("codegen" | "refactor" | "analysis")[]
  costTier: "free" | "paid"
  priority: number
  enabled: boolean
}
```

Models are registered with their capabilities:
- **GPT-4 Turbo** - Primary codegen, high quality
- **Gemini Pro** - Planning, analysis, reasoning
- **Claude 3 Opus** - Refactoring, clean structured code
- **Grok** - Fast iteration, cost-efficient
- **Open models** - Bulk tasks, experimentation

#### Routing Policy
Intelligent task routing based on:

1. **Task Type** - Different models for different tasks
2. **Cost Constraints** - Optimize for budget
3. **Quality Requirements** - Balance speed vs quality
4. **Model Availability** - Fallback strategies
5. **Historical Performance** - Learn from past results

```typescript
interface RoutingPolicy {
  codegen: string[]      // e.g., ["gpt-4-turbo", "claude-3-opus"]
  refactor: string[]     // e.g., ["claude-3-opus", "gpt-4-turbo"]
  analysis: string[]     // e.g., ["gemini-pro", "gpt-4-turbo"]
  planning: string[]     // e.g., ["gemini-pro", "gpt-4-turbo"]
}
```

#### Project Generator
Transforms prompts into complete projects:

**Process Flow:**
1. **Prompt Analysis** - Understand user intent
2. **Planning** - Generate project structure
3. **Code Generation** - Create files and content
4. **Validation** - Check for errors and issues
5. **Optimization** - Refine and improve code

```typescript
interface GeneratedProjectPlan {
  name: string
  targets: TargetType[]
  pages: string[]
  components: string[]
  extraArtifacts?: string[]
}
```

#### Logic Flow Detector
Analyzes code for potential issues:

```typescript
type IssueKind = 
  | "missing-check"      // Missing null/undefined checks
  | "unsafe-call"        // Potentially unsafe operations
  | "dead-code"          // Unreachable code
  | "unhandled-error"    // Missing error handling

interface LogicFlowIssue {
  kind: IssueKind
  path: string
  line?: number
  message: string
  suggestion?: string
  severity: "error" | "warning" | "info"
}
```

#### Fix Memory
Remembers and applies known fixes:

**Capabilities:**
- Store fixes per project
- Pattern matching for similar issues
- Automatic application of known solutions
- Learning from user corrections

```typescript
interface FixMemory {
  id: string
  projectId: string
  issuePattern: string
  fixPattern: string
  applicableFiles: string[]
  successRate: number
  createdAt: Date
}
```

#### Observability
Complete visibility into operations:

**Prompt Logs:**
```typescript
interface PromptLogEntry {
  id: string
  projectId: string
  providerId: string
  modelId: string
  role: "system" | "user" | "assistant"
  content: string
  tokens: number
  cost: number
  createdAt: Date
}
```

**Trace Logs:**
```typescript
interface TraceLogEntry {
  id: string
  projectId: string
  kind: "generation" | "refine" | "sync" | "deploy" | "test"
  status: "ok" | "error"
  duration: number
  metadata: Record<string, unknown>
  createdAt: Date
}
```

### Integration & Build Layer

#### GitHub Sync
Seamless version control integration:
- OAuth-based authentication
- Automatic repository creation
- Branch management
- Commit and push automation
- Pull request creation

#### Vercel Deployer
One-click web deployments:
- Automatic project configuration
- Environment variable injection
- Build hook setup
- Domain management
- Preview deployments

#### Build Orchestrator
Multi-platform build pipeline:

**Mobile (APK):**
- React Native compilation
- Android SDK integration
- APK signing and optimization
- Distribution ready output

**Desktop:**
- Electron/Tauri packaging
- Platform-specific installers
- Code signing
- Auto-update configuration

### Data Persistence Layer

**Database Schema (Prisma):**

```prisma
model Project {
  id            String    @id @default(cuid())
  userId        String
  name          String
  slug          String
  prompt        String    @db.Text
  templateType  String
  primaryTarget String
  status        String
  files         File[]
  deployments   Deployment[]
  logs          TraceLog[]
  fixMemory     FixMemory[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model File {
  id          String   @id @default(cuid())
  projectId   String
  path        String
  content     String   @db.Text
  language    String?
  generatedBy String
  version     Int      @default(1)
  project     Project  @relation(fields: [projectId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Deployment {
  id                String   @id @default(cuid())
  projectId         String
  target            String
  provider          String
  providerProjectId String?
  artifactUrl       String?
  status            String
  logsUrl           String?
  project           Project  @relation(fields: [projectId], references: [id])
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}
```

## Security Architecture

### Authentication & Authorization
- **NextAuth** for session management
- **OAuth** with GitHub
- **JWT** tokens for API access
- **Role-based access control** (User, Developer, Admin)

### API Security
- **Rate limiting** per user/API key
- **API key rotation** and revocation
- **Request validation** with Zod schemas
- **CORS** configuration
- **HTTPS** enforcement in production

### Data Protection
- **Encrypted secrets** in database
- **Sanitized inputs** to prevent injection
- **Audit logs** for sensitive operations
- **Privacy controls** for user data

## Performance Optimization

### Caching Strategy
- **React Server Components** for static content
- **API response caching** with SWR
- **Database query optimization** with Prisma
- **CDN** for static assets

### Code Splitting
- **Route-based splitting** with Next.js
- **Lazy loading** for heavy components
- **Dynamic imports** for optional features

### Monitoring
- **Real-time metrics** collection
- **Error tracking** with detailed context
- **Performance monitoring** for bottlenecks
- **Usage analytics** for optimization

## Scalability Considerations

### Horizontal Scaling
- **Stateless services** for easy replication
- **Load balancing** across instances
- **Database connection pooling**
- **Distributed caching** with Redis

### Asynchronous Processing
- **Job queues** for long-running tasks
- **Webhooks** for async notifications
- **Background workers** for builds
- **Event-driven architecture** for loose coupling

## Future Architecture Enhancements

### Planned Improvements
1. **Microservices** - Break monolith into services
2. **Real-time Collaboration** - WebSocket-based live editing
3. **Advanced Caching** - Redis integration
4. **Kubernetes** - Container orchestration
5. **GraphQL** - Alternative API layer
6. **Streaming** - Real-time generation updates

## Technology Decisions

### Why Next.js?
- Server-side rendering for SEO
- API routes for backend logic
- File-based routing simplicity
- React Server Components
- Excellent developer experience

### Why Prisma?
- Type-safe database access
- Automatic migrations
- Intuitive schema definition
- Excellent TypeScript integration
- Active community

### Why Multi-Model?
- No single model is perfect
- Cost optimization opportunities
- Redundancy and reliability
- Flexibility for different tasks
- Future-proof architecture

## Best Practices

### Code Organization
```
/core
  /ai              # AI orchestration
  /domain          # Business logic
  /integrations    # External services
/components        # React components
/lib              # Utilities and types
/app              # Next.js routes
```

### Type Safety
- Strict TypeScript configuration
- Zod for runtime validation
- Prisma for database types
- Consistent interface definitions

### Error Handling
- Try-catch blocks for async operations
- Proper error messages
- Logging for debugging
- User-friendly error displays

---

**Next Steps:**
- [Explore Auto Features](./features/auto-sync.md)
- [Read Developer Guide](./guides/developer-guide.md)
- [Review API Reference](./api/overview.md)
