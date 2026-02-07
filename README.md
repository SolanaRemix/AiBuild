🚀 AiBuild / CyberAi

Multi‑Model AI Code Builder • Web • Mobile • Desktop • Admin/Dev/User Control Planes • Aura FX Neo‑Glow UI



---

🌌 Overview

AiBuild / CyberAi is a v0‑style, multi‑model AI code builder that turns natural language prompts into fully deployable applications across:

• Web (Next.js)
• Mobile (React Native / Expo → APK)
• Desktop (Electron / Tauri)
• APIs & SDKs
• Plugins / Modules


Powered by a multi‑model CyberAi agent (GPT, Gemini, Claude, Grok, and free/public coding models), AiBuild provides:

• ⚡ Prompt → Project → GitHub → Deploy
• 📱 APK & Desktop builds
• 🧠 Logic‑flow detection + fix‑memory
• 🧩 Dynamic plugins & modules
• 🛠️ Admin, Dev, and User control panels
• 🌈 Aura FX Neo‑Glow UI (Blue/Green/Purple)
• 🔍 Full observability (logs, traces, sensors)
• 🔐 Secure, governed, operator‑grade architecture


---

🧬 Architecture Summary

AiBuild is built as a modular monorepo:

/apps/web              → Next.js app (landing, user, dev, admin)
/apps/agent            → CyberAi multi‑model agent runtime
/apps/build-worker     → APK + desktop build orchestrator
/packages/ui           → Aura FX Neo‑Glow component library
/packages/sdk          → Public JS/TS SDK
/packages/api          → Shared API types + client
/packages/config       → Shared config (env, models, routing)
/prisma                → Database schema


---

🧠 CyberAi Multi‑Model Agent

Model	Role	Notes	
GPT‑4.x	Primary codegen	High‑quality generation	
Gemini	Planning + analysis	Strong reasoning	
Claude	Refactoring	Clean, structured output	
Grok	Fast iteration	Free/low‑cost cycles	
Open‑source models	Bulk tasks	Cost‑efficient	


CyberAi includes:

• Model registry
• Routing policy
• Prompt logging
• Trace logging
• Fix‑memory
• Logic‑flow detector
• Safety guards
• JSON schema validation


---

🗄️ Database Schema (Prisma)

Core tables:

• Project
• File
• Deployment
• GitHubBinding
• ModelProviderConfig
• PromptLog
• TraceLog
• FixMemory


Designed for:

• Full rebuildability
• Auditability
• Multi‑target builds
• Multi‑model routing


---

🖥️ Control Planes

👤 User Dashboard

• Projects
• Agents
• Billing
• Affiliate
• Quests
• Settings


🧑‍💻 Developer Panel

• Deployments
• Logs (AI, builds, tests)
• SDK keys
• Webhooks
• System status


🛡️ Admin Panel

• Users
• Models
• Agents
• Plans & Billing
• Affiliate config
• Quests config
• System flags


---

🎨 Aura FX Neo‑Glow UI System

Mode	Palette	Effects	
Dark	#020617 + neon blue/green/purple	Glow, glass, blur	
Light	#f9fafb + pastel glow	Soft, minimal	


Components:

• GlowShell
• GlowCard
• GlowButton
• GlowInput
• GlowTabs
• GlowSidebar


---

🧩 Modules & Plugins

AiBuild supports dynamic add‑ons:

• UI templates
• Component packs
• Agent behaviors
• Model adapters
• Build pipelines
• Deployment providers
• Analytics plugins


Each plugin is a self‑contained package with:

• Manifest
• Config
• Hooks
• UI components
• API routes


---

⚙️ API & SDK

REST API

Endpoints include:

• /api/generate-project
• /api/projects
• /api/projects/[id]
• /api/projects/[id]/files
• /api/projects/[id]/sync/github
• /api/projects/[id]/deploy/vercel
• /api/projects/[id]/build/apk
• /api/projects/[id]/build/desktop


SDK (TypeScript)

import { AiBuild } from "@aibuild/sdk";

const client = new AiBuild({ apiKey: process.env.AIBUILD_KEY });

const project = await client.projects.create({
  prompt: "Build a crypto dashboard",
  target: "web",
});


---

🚀 Deployment

AiBuild is Vercel‑native:

• Auto‑detects environment
• Auto‑creates required env vars
• Auto‑binds GitHub repo
• Auto‑configures build hooks
• Auto‑deploys web targets


Mobile & desktop builds run via:

• Build worker
• GitHub Actions
• Local runners


---

🧪 Testing

Includes:

• Unit tests
• Integration tests
• Build tests
• Agent tests
• API tests


---

📊 Comparison Table

Feature	Vercel v0	AiBuild v0	AiBuild CyberAi	
Prompt → App	✅	✅	⚡ Enhanced multi‑model	
Multi‑model agent	❌	⚠️ Limited	🧠 GPT + Gemini + Claude + Grok	
Mobile APK builds	❌	❌	📱 Yes	
Desktop builds	❌	❌	🖥️ Yes	
Admin panel	❌	❌	🛡️ Full	
Dev panel	❌	❌	🧑‍💻 Full	
User dashboard	Basic	Good	✨ Full suite	
Plugins/modules	❌	⚠️ Partial	🧩 Dynamic	
Observability	Basic	Good	🔍 Full logs/traces/sensors	
UI theme	Minimal	Good	🌈 Aura FX Neo‑Glow	


---

📚 User Guide

1. Create a Project

1. Go to dashboard
2. Click New Project
3. Enter prompt
4. Choose target (Web/Mobile/Desktop)
5. Generate


2. Edit Code

• Use file tree
• Use Monaco editor
• Use AI “Regenerate file”


3. Sync to GitHub

• Click Sync to GitHub
• Choose repo/branch


4. Deploy

• Web → Vercel
• Mobile → APK build
• Desktop → Installer build


5. Manage Agents

• Create personal agents
• Choose models
• Configure behavior


6. Admin/Dev Panels

• Manage users, models, plans
• View logs, deployments
• Configure system


---

🛠️ Local Development

pnpm install
pnpm dev


---

🤝 Contributing

We welcome:

• Plugins
• Templates
• Model adapters
• Build pipelines
• UI components


---

📄 License

MIT

---

❤️ Maintained by SolanaRemix / AiBuild

Repo: https://github.com/SolanaRemix/AiBuild

---

 README is aligned with your entire architecture.

  CONTRIBUTING.md
• A SECURITY.md
• A ROADMAP.md
• A MODULES.md (plugin system spec)
• A DEPLOYMENT.md
• A GOVERNANCE.md
• A BRANDING.md