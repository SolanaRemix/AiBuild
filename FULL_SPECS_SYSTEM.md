🌐 AiBuild / CyberAi — FULL SYSTEM SPECIFICATION

Unified Architecture • UI/UX • Agent • Build System • Plugins • SDK • API • Control Planes • Governance • Docs

---

1. 🎯 Vision & Purpose

AiBuild / CyberAi is a multi‑model AI code‑generation platform that transforms natural language prompts into fully deployable applications across:

• Web (Next.js)
• Mobile (React Native → APK)
• Desktop (Electron/Tauri)
• APIs
• SDKs
• Plugins
• Modules


The system is:

• Multi‑model (GPT, Gemini, Claude, Grok, OSS)
• Multi‑target (web/mobile/desktop)
• Multi‑plane (user/dev/admin)
• Multi‑plugin (dynamic modules)
• Multi‑build (APK/desktop/web)
• Fully observable (logs/traces/sensors)
• Fully governed (policies, roles, permissions)
• Fully reproducible (deterministic flows)


---

2. 🏗️ Monorepo Structure

/apps/web              → Next.js App Router (UI)
/apps/agent            → CyberAi multi‑model agent runtime
/apps/build-worker     → APK + desktop build orchestrator
/packages/ui           → Aura FX Neo‑Glow UI library
/packages/sdk          → TypeScript SDK
/packages/api          → API client + schemas
/packages/config       → Shared config (env, models, routing)
/prisma                → Database schema
/docs                  → Documentation suite


---

3. 🧬 Database Schema (Prisma)

Core Tables

Table	Purpose	
Project	Stores project metadata	
File	Stores project files	
Deployment	Stores deployment metadata	
Build	Stores build metadata	
GitHubBinding	GitHub repo linkage	
ModelProviderConfig	Model settings	
PromptLog	AI prompt logs	
TraceLog	System event logs	
FixMemory	Known fixes & patches	


---

4. 🧠 CyberAi Multi‑Model Agent

Components

• Agent Core
• Model Registry
• Model Adapters
• Routing Policy Engine
• Prompt Logger
• Trace Logger
• Logic‑Flow Detector
• Fix‑Memory Engine
• Safety Layer
• Plugin Hooks
• Agent Events
• Agent API


Supported Models

• GPT‑4.x
• Gemini
• Claude
• Grok
• Llama / Mistral / OSS models


---

5. 🧩 Plugin / Module System

Plugin Capabilities

• UI components
• Agent behaviors
• Model adapters
• Build pipelines
• Deployment providers
• Analytics modules
• Templates
• Code packs


Plugin Manifest

id
name
version
description
author
permissions
capabilities
hooks
ui
api
assets
models
targets
sandbox
signature


Plugin Hooks

• onProjectCreate
• onFileUpdate
• onAgentTaskStart
• onModelSelect
• onBuildStart
• onDeployComplete


---

6. ⚙️ Build System (APK + Desktop + Web)

Build Worker Responsibilities

• Queue management
• Worker pool
• Build isolation
• Build logs
• Build artifacts
• Build security
• Build retries
• Build cancellation
• Build metadata


Build Targets

Target	Output	
Web	Vercel deployment	
Mobile	Signed APK	
Desktop	Windows EXE + macOS DMG	


---

7. 🖥️ Control Planes

User Dashboard

• Projects
• Project workspace
• Agents
• Billing
• Affiliate
• Quests
• Settings


Dev Panel

• Deployments
• Logs
• SDK keys
• Webhooks
• System status


Admin Panel

• Users
• Models
• Agents
• Plans
• Affiliate config
• Quests config
• Plugins
• System flags


---

8. 🎨 Aura FX Neo‑Glow UI Library

Components

• GlowShell
• GlowCard
• GlowButton
• GlowInput
• GlowTabs
• GlowSidebar
• GlowTopbar
• GlowBreadcrumbs
• GlowBadge
• GlowModal
• GlowTable
• GlowToast


Design Tokens

• Neon blue/green/purple
• Glassmorphism
• Blur layers
• Glow shadows
• Dark/day mode


---

9. 📡 API Specification

Endpoints

• /api/generate-project
• /api/projects/*
• /api/agent/*
• /api/plugins/*
• /api/build/*
• /api/deploy/*
• /api/logs/*


Features

• Zod validation
• Error normalization
• Pagination
• Rate limits
• Webhooks


---

10. 📦 SDK Specification

Modules

• projects
• files
• agents
• deployments
• builds
• billing
• affiliate
• quests
• plugins
• models
• logs
• webhooks


Example

import { AiBuild } from "@aibuild/sdk";

const client = new AiBuild({ apiKey: process.env.AIBUILD_KEY });

const project = await client.projects.create({
  prompt: "Build a crypto dashboard",
  target: "web",
});


---

11. 🔐 Authentication & Access Control

Roles

• user
• developer
• admin


Middleware

• Route protection
• Role enforcement
• Session validation


---

12. 🔍 Observability

Systems

• Prompt logs
• Trace logs
• Build logs
• Agent logs
• Plugin logs


UI

• Log viewer
• Trace viewer
• Build viewer


---

13. 📚 Documentation Suite

• README.md
• CONTRIBUTING.md
• SECURITY.md
• ROADMAP.md
• DEPLOYMENT.md
• MODULES.md
• GOVERNANCE.md
• BRANDING.md
• API_REFERENCE.md
• SDK_REFERENCE.md
• USER_GUIDE.md
• ADMIN_GUIDE.md
• DEV_GUIDE.md
• ARCHITECTURE_OVERVIEW.md
• CHANGELOG.md


---

14. 🧪 Testing Strategy

Test Types

• Unit tests
• Integration tests
• Build tests
• Agent tests
• Plugin tests
• UI tests
• API tests


---

15. 🚀 Deployment

Web

• Vercel auto‑config
• GitHub integration


Mobile

• Build worker → APK


Desktop

• Build worker → EXE/DMG


---

16. 🛡️ Governance

Rules

• Deterministic builds
• No hidden state
• No drift
• No untracked changes
• All flows logged
• All models auditable
• All plugins sandboxed


---

17. 🧭 Operator Guarantees

• Reproducibility
• Observability
• Safety
• Determinism
• Extensibility
• Governance
• Modularity


---

18. 🧩 Integration Map

Systems Connected

• Agent ↔ Plugins
• Agent ↔ Build worker
• Agent ↔ UI
• UI ↔ SDK
• SDK ↔ API
• API ↔ DB
• Build worker ↔ API
• Plugins ↔ UI
• Plugins ↔ Agent


---

19. 🔗 Full System Diagram (ASCII)

User → Web UI → SDK → API → Services → DB
                      ↓
                 CyberAi Agent
                      ↓
               Build Orchestrator
                      ↓
               Build Worker Pool
                      ↓
             APK / Desktop / Web


---

20. 🧩 Final Summary

This document is the single executable specification for the entire AiBuild / CyberAi platform.

It defines:

• Architecture
• UI/UX
• Agent
• Build system
• Plugins
• SDK
• API
• Control planes
• Governance
• Observability
• Deployment
• Documentation
• Testing