# AiBuild — Full System Architecture & UI/UX Specs

## 🧱 SYSTEM ARCHITECTURE

### Overview

AiBuild is a full-stack, role-based SaaS platform built with:

| Layer        | Stack |
|--------------|-------|
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS |
| **Backend**  | Next.js API Routes, Prisma ORM |
| **Database** | PostgreSQL (via Neon.tech) |
| **Auth**     | `next-auth` with credentials provider |
| **CI/CD**    | GitHub Actions + Vercel |
| **Hosting**  | Vercel (auto-deploy from GitHub) |

### Folder Structure

```
/app
  /api
    /auth/[...nextauth]  # NextAuth API routes
  /login                 # Shared login page
  /(app)
    /admin               # Admin panel
    /dashboard           # User panel
    /dev                 # Developer panel
/components
  /aura                  # Glow UI components
  /admin                 # Admin-specific components
  /dashboard             # Dashboard components
  /dev                   # Dev panel components
/lib
  auth.ts               # NextAuth configuration
  sidebar-config.ts     # Sidebar navigation config
/prisma
  schema.prisma         # Database schema
  seed.ts               # Database seeding
/types
  next-auth.d.ts        # NextAuth type extensions
```

---

## 🎨 UI/UX DESIGN SYSTEM

### Design Language

- **Theme**: Dark mode by default
- **Visual Style**: Aura FX Neo‑Glow (green → purple → blue)
- **Layout**: Responsive, mobile-first, glassmorphism
- **Typography**: Geist (sans) and Geist Mono, 16px base
- **Spacing**: Tailwind spacing scale (4, 8, 16, 24, 32...)

### Shared Components

| Component     | Description |
|---------------|-------------|
| `GlowButton`  | Neon-glow button with hover/active states |
| `GlowCard`    | Rounded, glassy card with gradient border |
| `GlowInput`   | Styled input with focus ring and label |
| `GlowTabs`    | Tabbed navigation with animated underline |
| `GlowSidebar` | Navigation sidebar with sections |

### Pages & Panels

#### 🔐 Login (`/login`)
- Email + password fields
- Predefined users:
  - `admin@admin.com` / `Admin123$` → ADMIN role
  - `user@aibuild.com` / `Admin123$` → USER role
  - `dev@aibuild.com` / `Admin123$` → DEV role
- Role-based redirection after login

#### 🧑‍💼 Admin Panel (`/admin`)
- Tabs: Users, Plugins, Plans, Logs
- Features:
  - User management (view/edit/delete users)
  - Plugin manager with toggle and versioning
  - System logs viewer
  - Analytics overview
- Access: ADMIN role only

#### 👤 User Panel (`/dashboard`)
- Tabs: Projects, Billing, Settings
- Features:
  - Project cards with status, edit, delete
  - Billing summary and plan selector
  - Profile settings form
  - Agent configuration
- Access: USER role (default for non-admin/dev users)

#### 🧑‍💻 Developer Panel (`/dev`)
- Tabs: Deployments, Logs, API Keys, Webhooks
- Features:
  - Deployment history table
  - Real-time logs viewer
  - API key generator (SDK & API)
  - Webhook configuration form
  - System status monitoring
- Access: DEV role only

---

## 🗃️ DATABASE SCHEMA (Prisma + PostgreSQL)

### Schema

```prisma
enum Role {
  ADMIN
  USER
  DEV
}

model User {
  id        String    @id @default(cuid())
  email     String    @unique
  password  String    # bcrypt hashed
  role      Role
  projects  Project[]
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
}

model Project {
  id          String       @id @default(cuid())
  name        String
  ownerId     String
  owner       User         @relation(fields: [ownerId], references: [id])
  status      String
  deployments Deployment[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Deployment {
  id        String   @id @default(cuid())
  projectId String
  project   Project  @relation(fields: [projectId], references: [id])
  status    String
  logs      String   @default("")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Create migration
npx prisma migrate dev --name init

# Apply migrations (production)
npx prisma migrate deploy

# Seed database
npm run db:seed
```

---

## 🔐 AUTHENTICATION

### NextAuth Configuration

- **Provider**: Credentials (email/password)
- **Session**: JWT-based
- **Pages**: Custom login at `/login`
- **Middleware**: Role-based route protection

### Environment Variables

```env
DATABASE_URL="postgresql://user:pass@host:5432/aibuild"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
```

### Predefined Users

| Email              | Password    | Role  |
|--------------------|-------------|-------|
| admin@admin.com    | Admin123$   | ADMIN |
| user@aibuild.com   | Admin123$   | USER  |
| dev@aibuild.com    | Admin123$   | DEV   |

---

## 🚀 CI/CD PIPELINE

### GitHub Actions Workflow

Located at `.github/workflows/ci-deploy.yml`:

1. **Install Dependencies**: `npm install --legacy-peer-deps`
2. **Generate Prisma Client**: `npx prisma generate`
3. **Lint**: `npm run lint`
4. **Build**: `npm run build`
5. **Migrate** (main only): `npx prisma migrate deploy`
6. **Deploy** (main only): Deploy to Vercel

### Required Secrets

- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Secret for JWT signing
- `NEXTAUTH_URL`: Public URL of the application
- `VERCEL_TOKEN`: Vercel deployment token
- `VERCEL_ORG_ID`: Vercel organization ID
- `VERCEL_PROJECT_ID`: Vercel project ID

---

## 🛠️ DEVELOPMENT

### Setup

```bash
# Install dependencies
npm install --legacy-peer-deps

# Setup database
npx prisma generate
npx prisma db push
npm run db:seed

# Run development server
npm run dev
```

### Build

```bash
npm run build
npm start
```

---

## 📋 FEATURE CHECKLIST

### Authentication ✅
- [x] Shared login page
- [x] Role-based authentication
- [x] JWT sessions
- [x] Middleware protection
- [x] Auto-redirect based on role

### Admin Panel ✅
- [x] Users management
- [x] Plugins (AI models) management
- [x] Plans & billing overview
- [x] System logs viewer

### User Panel ✅
- [x] Project dashboard
- [x] Project management
- [x] Billing overview
- [x] Settings page

### Developer Panel ✅
- [x] Deployments history
- [x] Logs viewer
- [x] API Keys (SDK & API)
- [x] Webhooks configuration
- [x] System status

### Infrastructure ✅
- [x] Prisma + PostgreSQL
- [x] NextAuth integration
- [x] GitHub Actions CI/CD
- [x] Vercel deployment config
- [x] Test IDs for components
