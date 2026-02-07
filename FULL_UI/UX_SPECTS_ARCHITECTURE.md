# FULL_UI/UX_SPECS_ARCHITECTURE.md  
_AiBuild / CyberAi — Admin, Dev, User control planes with Aura FX Neo‑Glow_

---

## 1. Experience overview

AiBuild / CyberAi has **three primary control planes**, all v0‑style, minimal, and neon‑clean:

1. **Public landing** — marketing + instant “Try builder” entry.
2. **User dashboard** — projects, agents, billing, affiliate, quests.
3. **Admin & Dev panels** — full control over models, agents, users, billing, deployments.

All surfaces share:

- **Aura FX Neo‑Glow** theme (blue/green/purple).
- **Same layout grammar** (top bar + left rail + content).
- **Vercel‑first deployment** with auto environment config.

---

## 2. Global UI system

### 2.1 Layout primitives

- **Top bar**
  - Left: product logo “AiBuild / CyberAi”.
  - Center: context title (e.g. “Projects”, “Admin · Models”).
  - Right: user avatar, quick actions, theme toggle (Dark/Day).

- **Left rail**
  - Sectioned navigation:
    - User: Projects, Agents, Billing, Affiliate, Quests, Settings.
    - Dev: Deployments, Logs, SDK Keys, Webhooks.
    - Admin: Users, Models, Agents, Plans, System.

- **Content area**
  - Header row (title, filters, primary actions).
  - Main grid (cards, tables, editors).
  - Right‑side drawers for details when needed.

### 2.2 Aura FX Neo‑Glow theme

- **Palette**
  - Background dark: `#020617` (slate‑black).
  - Background light: `#f9fafb`.
  - Primary blue: `#38bdf8`.
  - Accent green: `#22c55e`.
  - Accent purple: `#a855f7`.

- **Glow**
  - Blue glow: `0 0 40px rgba(56, 189, 248, 0.45)`.
  - Green glow: `0 0 40px rgba(34, 197, 94, 0.45)`.
  - Purple glow: `0 0 40px rgba(168, 85, 247, 0.45)`.

- **Components**
  - **GlowShell**: gradient background, subtle noise.
  - **GlowCard**: glassmorphism, border, soft glow shadow.
  - **GlowButton**: pill, neon ring on hover, 180ms transitions.
  - **GlowTabs**: segmented control with glow underline.
  - **GlowSidebar**: blurred rail with subtle inner glow.

---

## 3. Public landing page

### 3.1 Structure

- **Hero section**
  - Left: headline “Multi‑model CyberAi code builder”.
  - Subcopy: “Prompt → Project → GitHub → Deploy across web, mobile, desktop.”
  - CTA buttons:
    - “Start building” (goes to sign‑in + project prompt).
    - “View docs” (SDK/API docs).

- **Feature grid**
  - Cards:
    - “Multi‑model agent (GPT, Gemini, Claude, Grok…)”
    - “Admin‑grade control planes”
    - “APK & desktop builds”
    - “Vercel‑native deployments”

- **Live demo strip**
  - Embedded v0‑style chat or mini prompt → UI preview.

- **Footer**
  - Links: Docs, Pricing, Status, GitHub, Terms.

### 3.2 UX guarantees

- Landing is **readable in 10 seconds**:
  - What it is.
  - What it does.
  - How to start.

---

## 4. User dashboard UX

### 4.1 Main navigation

Left rail sections:

- **Projects**
- **Agents**
- **Billing**
- **Affiliate**
- **Quests**
- **Settings**

### 4.2 Projects

- **List view**
  - Columns: Name, Target (Web/Mobile/Desktop), Status, Last updated, Actions.
  - Primary action: “New project” (opens prompt modal).

- **New project modal**
  - Fields:
    - Prompt (textarea).
    - Target: Web / Mobile / Desktop (segmented GlowTabs).
    - Template: Landing / Dashboard / SaaS / App / Custom.
  - CTA: “Generate with CyberAi”.

- **Project workspace**
  - Same as FULL_SPECS_ARCHITECTURE:
    - Left: file tree.
    - Center: code / tests / analysis tabs.
    - Right: preview / build status.
  - Top bar:
    - Target selector.
    - “Sync to GitHub”.
    - “Deploy / Build”.
    - Status pill.

### 4.3 Agents (user‑level)

- **List**
  - User‑scoped “personal agents” built on top of CyberAi:
    - Columns: Name, Base model, Role, Usage.
  - Actions: Edit, Duplicate, Archive.

- **Agent editor**
  - Tabs:
    - “Behavior”: system prompt, capabilities toggles (codegen, refactor, analysis).
    - “Models”: allowed models (GPT, Gemini, Claude, Grok, others).
    - “Limits”: max tokens, cost guardrails (if applicable).
  - UX: v0‑style form with live preview of “how this agent speaks”.

### 4.4 Billing

- **Overview**
  - Current plan, usage summary, next billing date.
- **Usage**
  - Charts: requests per day, per model, per project.
- **Payment**
  - Card management, invoices list.

### 4.5 Affiliate

- **Dashboard**
  - Referral link.
  - Stats: clicks, signups, conversions, earned.
- **Assets**
  - Pre‑made banners, copy snippets.

### 4.6 Quests

- **Gamified onboarding**
  - List of quests:
    - “Create your first project”
    - “Deploy to Vercel”
    - “Build an APK”
  - Each quest:
    - Progress bar.
    - Reward (badge, affiliate boost, etc.).

---

## 5. Dev panel UX

### 5.1 Navigation

Left rail sections (visible to devs):

- **Deployments**
- **Logs**
- **SDK & API**
- **Webhooks**
- **System status**

### 5.2 Deployments

- **Table**
  - Columns: Project, Target, Provider, Status, Created, Actions.
- **Detail drawer**
  - Logs link.
  - Artifact URLs (web URL, APK, desktop installer).
  - Re‑deploy / re‑build buttons.

### 5.3 Logs

- **Tabs**
  - “AI Prompts”
  - “Builds”
  - “Tests”
- **Filters**
  - Project, model, status, time range.
- **Detail**
  - Full prompt/response (redacted where needed).
  - Trace timeline (generation → sync → deploy).

### 5.4 SDK & API

- **SDK keys**
  - List of keys, scopes, last used.
  - Create / revoke flows.

- **Docs**
  - Inline docs for:
    - REST API.
    - JS/TS SDK.
    - Webhooks.

- **Example snippets**
  - “Create project via API”
  - “Trigger deploy”
  - “Query logs”

---

## 6. Admin panel UX

### 6.1 Navigation

Left rail sections (admin‑only):

- **Users**
- **Models**
- **Agents**
- **Plans & Billing**
- **Affiliate config**
- **Quests config**
- **System**

### 6.2 Users

- **Table**
  - Columns: Email, Role (user/dev/admin), Projects, Status.
- **Detail**
  - Roles, limits, flags (e.g. “beta access”).
  - Impersonate (view as user) for support.

### 6.3 Models & Agents (global)

- **Models**
  - List of all configured providers:
    - GPT, Gemini, Claude, Grok, others.
  - Fields:
    - Name, Model ID, Capabilities (code/chat/analysis), Cost tier (free/paid), Enabled toggle.
  - UX: admin can **enable/disable** models and set **routing hints**.

- **Global agents**
  - System‑level agents (e.g. “CyberAi Code Builder”, “Analyzer”).
  - Config:
    - System prompt.
    - Allowed models.
    - Routing policy (primary, fallback, free‑only).

### 6.4 Plans & Billing

- **Plans**
  - Free, Pro, Enterprise.
  - Controls:
    - Limits (projects, builds, requests).
    - Model access (which models per plan).

- **Billing overview**
  - High‑level usage and revenue charts.

### 6.5 Affiliate & Quests config

- **Affiliate**
  - Commission rates.
  - Payout rules.
  - Approval flows.

- **Quests**
  - Define quest steps, rewards, visibility.
  - Reorder quests.

### 6.6 System

- **Environment**
  - Vercel project bindings.
  - Webhook endpoints.
  - Background worker status.

- **Feature flags**
  - Toggle experimental features (e.g. new models, new targets).

---

## 7. Vercel deployment UX

### 7.1 Auto‑config behavior

- On first deploy:
  - Detect environment (Vercel project).
  - Auto‑create:
    - `OPENAI_API_KEY`, `GOOGLE_VERTEX_KEY`, `ANTHROPIC_KEY`, `GROK_KEY` (if provided).
    - `DATABASE_URL`, `NEXTAUTH_SECRET`, etc.
- Admin panel shows:
  - “Vercel integration: Connected”.
  - Link to Vercel dashboard.

### 7.2 Per‑project deploy UX

- In project workspace:
  - “Deploy to Vercel” button (web target).
  - Status chip: Pending → Building → Ready / Failed.
  - Link: “Open live app”.

---

## 8. SDK/API UX

### 8.1 Concept

The app exposes its own **SDK/API** so external tools can:

- Create projects.
- Trigger builds.
- Query deployments.
- Read logs.

### 8.2 UI

- In Dev panel → “SDK & API”:
  - Copy‑paste snippets (JS/TS, cURL).
  - Example flows:
    - “Create project from CLI”.
    - “Trigger APK build from CI”.
    - “Fetch last deployment URL”.

---

## 9. Responsive & platform UX

- **Web**
  - Full layout with left rail + top bar.
- **Tablet**
  - Collapsible left rail, persistent top bar.
- **Mobile**
  - Bottom nav for main sections (Projects, Agents, Billing, Profile).
  - Project workspace simplified:
    - Tabs for Code / Preview / Actions.

All views maintain **Aura FX** glow but reduce intensity on small screens for readability.

---

## 10. UX guarantees & principles

- **Single mental model:**  
  Every panel (user/dev/admin) uses the same navigation grammar.

- **No dead ends:**  
  Every status has a clear next action (e.g. failed deploy → “View logs” + “Retry”).

- **Observability first:**  
  Logs, prompts, and builds are always one click away from where the user is working.

- **Safe multi‑model control:**  
  Admin can see and control which models are active, which agents can use them, and which plans expose them.

- **Aura FX consistency:**  
  Blue/green/purple/yellow glow is consistent across landing, dashboards, and panels, with dark/day modes.