# FULL_SPECS_ARCHITECTURE.md  
_AiBuild / CyberAi — multi‑model v0‑style code builder with Aura FX Neo‑Glow_

---

## 1. Product vision

**AiBuild / CyberAi** is a **governed, multi‑model AI code builder**:

- **Prompt → Project → GitHub → Deploy** as the golden path.
- **Multi‑model agent** (all configured public/free coding‑capable models) behind a **single CyberAi code builder agent**.
- **Structured, audited, testable**: sensors, listeners, logs, analyzers, prompt/logic‑flow detector, and fix‑memory.
- **One parallel container per project** for **preview, edit, test**.
- Targets:
  - **Web** (Next.js)
  - **Mobile** (React Native / Expo, Android APK)
  - **Desktop** (Electron / Tauri for Windows/macOS)

AiBuild is a **factory**, not a playground: every artifact is reproducible, observable, and debuggable.

---

## 2. High‑level architecture

### 2.1 Core stack

- **Runtime:** Next.js (App Router, TypeScript)
- **UI:** React, TailwindCSS, ShadCN, Aura FX design system
- **AI orchestration:** Vercel AI SDK + pluggable providers:
  - OpenAI (GPT)
  - Google (Gemini / Vertex AI Studio)
  - Other public/free coding‑capable models (via HTTP APIs)
- **DB:** Postgres (Neon/Supabase) via Prisma
- **Storage:** S3‑compatible (optional; DB text for MVP)
- **Auth:** NextAuth (GitHub OAuth) or JWT
- **Git:** GitHub App (preferred) or PAT
- **Deploy (web):** Vercel API
- **Build (mobile/desktop):** CI jobs / build workers (e.g. GitHub Actions, custom runner)
- **Runtime sandbox:** per‑project “parallel container” (Docker or lightweight VM) for preview/tests.

### 2.2 Logical modules

- **Core domain**
  - `ProjectService`
  - `FileService`
  - `DeploymentService`
  - `TargetService` (web/mobile/desktop)
- **AI domain (CyberAi agent)**
  - `ModelRegistry` (all configured models)
  - `RoutingPolicy` (which model for which task)
  - `ProjectGenerator` (prompt → plan + file tree)
  - `FileRefiner` (per‑file regeneration)
  - `LogicFlowDetector` (detects flows, side effects, missing checks)
  - `FixMemory` (stores known fixes / patches per project)
- **Observability domain**
  - `PromptLog`
  - `TraceLog`
  - `SensorBus` (events from editor, tests, builds)
  - `Analyzer` (static + runtime analysis)
- **Integration domain**
  - `GitHubSync`
  - `VercelDeployer`
  - `BuildOrchestrator` (APK / desktop builds)
- **Presentation**
  - App shell, project dashboard, editor, preview, logs/analysis views.

All modules live under `src/core/**` and are imported by API routes and server actions.

---

## 3. Domain model

### 3.1 Entities

```ts
type ProjectId = string;

type TargetType = "web" | "mobile" | "desktop";

interface Project {
  id: ProjectId;
  userId: string;
  name: string;
  slug: string;
  prompt: string;
  templateType: "landing" | "dashboard" | "saas" | "app" | "custom";
  primaryTarget: TargetType;          // default: "web"
  status: "draft" | "ready" | "synced" | "deployed" | "building";
  createdAt: Date;
  updatedAt: Date;
}

interface File {
  id: string;
  projectId: ProjectId;
  path: string;
  content: string;
  language: string | null;
  generatedBy: "ai" | "user";
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Deployment {
  id: string;
  projectId: ProjectId;
  target: TargetType;                 // web/mobile/desktop
  provider: "vercel" | "github-actions" | "local-runner";
  providerProjectId: string | null;
  artifactUrl: string | null;         // web URL, APK download, installer URL
  status: "pending" | "building" | "ready" | "failed";
  logsUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface GitHubBinding {
  id: string;
  projectId: ProjectId;
  installationId: string | null;
  owner: string;
  repo: string;
  defaultBranch: string;
  lastSyncedCommitSha: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ModelProviderConfig {
  id: string;
  name: "openai" | "google" | "other";
  modelId: string;
  capabilities: ("code" | "chat" | "analysis")[];
  costTier: "free" | "paid";
  enabled: boolean;
}

interface PromptLog {
  id: string;
  projectId: ProjectId;
  providerId: string;
  modelId: string;
  role: "system" | "user" | "assistant";
  content: string;
  createdAt: Date;
}

interface TraceLog {
  id: string;
  projectId: ProjectId;
  kind: "generation" | "refine" | "sync" | "deploy" | "test";
  status: "ok" | "error";
  metadata: Record<string, any>;
  createdAt: Date;
}

interface FixMemory {
  id: string;
  projectId: ProjectId;
  fingerprint: string;                // hash of error + context
  description: string;
  patch: string;                      // diff or replacement snippet
  createdAt: Date;
}


---

4. Database schema (Prisma‑style)

model Project {
  id           String   @id @default(cuid())
  userId       String
  name         String
  slug         String   @unique
  prompt       String
  templateType String
  primaryTarget String  // web | mobile | desktop
  status       String   // draft | ready | synced | deployed | building
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  files        File[]
  deployments  Deployment[]
  github       GitHubBinding?
  promptLogs   PromptLog[]
  traceLogs    TraceLog[]
  fixMemories  FixMemory[]
}

model File {
  id          String   @id @default(cuid())
  projectId   String
  path        String
  content     String
  language    String?
  generatedBy String
  version     Int      @default(1)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  project     Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
  @@index([projectId, path])
}

model Deployment {
  id                String   @id @default(cuid())
  projectId         String
  target            String   // web | mobile | desktop
  provider          String   // vercel | github-actions | local-runner
  providerProjectId String?
  artifactUrl       String?
  status            String   // pending | building | ready | failed
  logsUrl           String?
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt

  project           Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
}

model GitHubBinding {
  id                  String   @id @default(cuid())
  projectId           String   @unique
  installationId      String?
  owner               String
  repo                String
  defaultBranch       String
  lastSyncedCommitSha String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt

  project             Project  @relation(fields: [projectId], references: [id])
}

model ModelProviderConfig {
  id          String   @id @default(cuid())
  name        String
  modelId     String
  capabilities String  // comma‑separated
  costTier    String   // free | paid
  enabled     Boolean  @default(true)
}

model PromptLog {
  id         String   @id @default(cuid())
  projectId  String
  providerId String
  modelId    String
  role       String
  content    String
  createdAt  DateTime @default(now())

  project    Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
}

model TraceLog {
  id         String   @id @default(cuid())
  projectId  String
  kind       String
  status     String
  metadata   Json
  createdAt  DateTime @default(now())

  project    Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
}

model FixMemory {
  id          String   @id @default(cuid())
  projectId   String
  fingerprint String
  description String
  patch       String
  createdAt   DateTime @default(now())

  project     Project  @relation(fields: [projectId], references: [id])

  @@index([projectId])
}


---

5. CyberAi multi‑model agent contracts

5.1 Model registry

interface ModelRegistry {
  list(): Promise<ModelProviderConfig[]>;
  getEnabledCodeModels(): Promise<ModelProviderConfig[]>;
}


5.2 Routing policy

type TaskKind = "plan" | "codegen" | "refine" | "analysis";

interface RoutingPolicy {
  chooseModel(task: TaskKind, constraints: { freeOnly?: boolean }): Promise<ModelProviderConfig>;
}


5.3 Project generation

interface GenerateProjectInput {
  prompt: string;
  templateType?: string;
  userId: string;
  primaryTarget: TargetType;
}

interface GeneratedProjectPlan {
  name: string;
  targets: TargetType[];
  pages: string[];
  components: string[];
  extraArtifacts?: string[]; // e.g. "android-apk", "desktop-installer"
}

interface GeneratedFile {
  path: string;
  content: string;
}

interface GenerateProjectResult {
  plan: GeneratedProjectPlan;
  files: GeneratedFile[];
}


LLM response is validated against this schema before persisting.

5.4 Logic flow detector

interface LogicFlowIssue {
  kind: "missing-check" | "unsafe-call" | "dead-code" | "unhandled-error";
  path: string;
  message: string;
  suggestion?: string;
}

interface LogicFlowDetector {
  analyze(projectId: ProjectId): Promise<LogicFlowIssue[]>;
}


5.5 Fix memory

interface FixMemoryService {
  remember(projectId: ProjectId, fingerprint: string, description: string, patch: string): Promise<void>;
  lookup(projectId: ProjectId, fingerprint: string): Promise<FixMemory | null>;
}


---

6. API surface

All routes are Next.js App Router route.ts handlers.

6.1 Project generation

POST /api/generate-project

• Body:


{
  "prompt": "Build a minimal multi‑platform AI wallet app.",
  "templateType": "app",
  "primaryTarget": "web"
}


• Flow:• Resolve userId.
• Use RoutingPolicy to pick a free coding model.
• Call ProjectGenerator.generate.
• Persist Project + File[].
• Log prompts/traces.
• Return { projectId, status: "ready" }.



6.2 Files

Same as previous spec, plus:

• POST /api/projects/[id]/files/refine
Body: { path, instruction } → uses FileRefiner + FixMemory.


6.3 GitHub sync

Same as before, but materialization depends on target:

• Web: Next.js app.
• Mobile: React Native / Expo app.
• Desktop: Electron/Tauri app.


Branch naming convention:

• aibuild-web-<projectId>
• aibuild-mobile-<projectId>
• aibuild-desktop-<projectId>


6.4 Deploy / build

• Web: POST /api/projects/[id]/deploy/vercel
• Mobile APK: POST /api/projects/[id]/build/apk
• Desktop: POST /api/projects/[id]/build/desktop


Each calls BuildOrchestrator, which:

• Creates CI job / worker task.
• Streams logs to TraceLog.
• Stores resulting artifact URL in Deployment.artifactUrl.


---

7. Frontend architecture

src/
  app/
    layout.tsx
    page.tsx
    projects/
      page.tsx
      [id]/
        page.tsx          // Workspace: tree + editor + preview + logs
        logs/
          page.tsx        // Prompt/trace/analysis views
    api/ ...              // Routes above

  core/
    ai/
      ModelRegistry.ts
      RoutingPolicy.ts
      ProjectGenerator.ts
      FileRefiner.ts
      LogicFlowDetector.ts
      FixMemoryService.ts
    domain/
      ProjectService.ts
      FileService.ts
      DeploymentService.ts
      TargetService.ts
    integrations/
      GitHubSync.ts
      VercelDeployer.ts
      BuildOrchestrator.ts
    observability/
      SensorBus.ts
      Analyzer.ts
    db/
      prisma.ts

  components/
    aura/
      GlowShell.tsx
      GlowCard.tsx
      GlowButton.tsx
      GlowInput.tsx
      GlowTabs.tsx
      GlowSidebar.tsx
    editor/
      FileTree.tsx
      CodeEditor.tsx
      PreviewPane.tsx
      TestPanel.tsx
      LogsPanel.tsx
    layout/
      AppHeader.tsx
      AppSidebar.tsx


Workspace UI (`/projects/[id]`)

• Left: GlowSidebar file tree.
• Center tabs: Code, Tests, Analysis.
• Right: PreviewPane (web iframe or build status).
• Top bar:• Target selector: Web / Mobile / Desktop.
• “Regenerate file”, “Sync to GitHub”, “Deploy / Build”.
• Status pill + last build result.



---

8. Aura FX Neo‑Glow design system

Same tokens as before, applied across:

• Web app.
• Mobile (React Native theme constants).
• Desktop (Electron/Tauri CSS / theme).


:root {
  --fx-bg-dark: #050509;
  --fx-bg-light: #f9fafb;

  --fx-glow-cyan: rgba(34, 211, 238, 0.6);
  --fx-glow-purple: rgba(168, 85, 247, 0.6);

  --fx-border-subtle: rgba(148, 163, 184, 0.25);
  --fx-card-bg-dark: rgba(15, 23, 42, 0.9);
  --fx-card-bg-light: rgba(255, 255, 255, 0.9);

  --fx-radius-lg: 18px;
  --fx-radius-md: 12px;
  --fx-radius-sm: 8px;

  --fx-transition-fast: 180ms ease-out;
}


---

9. Parallel container / test harness

For each project:

• Container spec:• Node.js + PNPM/Yarn.
• Next.js, React Native CLI/Expo, Electron/Tauri toolchain (as needed).

• Capabilities:• Install deps.
• Run tests (npm test, lint, typecheck).
• Run dev server for preview (web).
• Build APK / desktop artifacts.

• Integration:• Controlled via BuildOrchestrator.
• Emits logs to TraceLog.
• Sensors (listeners) push events to SensorBus (test failures, build errors, runtime logs).



---

10. Golden operator flow (canonical)

1. Prompt• Operator opens /, chooses target (web/mobile/desktop), enters prompt.

2. Generate project• POST /api/generate-project.
• CyberAi chooses a free coding model, generates plan + files.
• Project created; redirect to /projects/[id].

3. Inspect & tweak• Browse file tree, edit code.
• Use “Regenerate file” (AI) and see analysis issues from LogicFlowDetector.

4. Sync to GitHub• Click “Sync to GitHub”.
• AiBuild materializes target‑specific app and pushes to branch.

5. Deploy / Build• Web: “Deploy to Vercel”.
• Mobile: “Build APK”.
• Desktop: “Build desktop app”.
• Status + logs visible in workspace.

6. Open / download• Web: open live URL.
• Mobile: download APK.
• Desktop: download installer / binary.



---

11. Operational guarantees

• Multi‑model, single agent:
All models (GPT, Gemini, others) are abstracted behind ModelRegistry + RoutingPolicy.
• Audited prompts and flows:
Every AI call and build step is logged (PromptLog, TraceLog).
• Dynamic, configurable:
Models and routing are configured in DB/env, no code changes required.
• Sensors & analyzers:
Tests, builds, and runtime logs feed into SensorBus and Analyzer.
• Fix memory:
Known fixes are stored and reused per project.
• Rebuildable:
Any project can be re‑materialized into a repo and rebuilt from DB.
• Platform‑agnostic:
Same CyberAi agent drives web, mobile, and desktop targets.



If you want, next step we can pick **one target first** (e.g. web) and I’ll generate the concrete `src/core/ai/ProjectGenerator.ts` + minimal Next.js app tree that matches this spec.