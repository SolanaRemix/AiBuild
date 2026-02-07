# 🛠️ AiBuild Developer Guide

Comprehensive guide for developers working on the AiBuild codebase.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Local Development Setup](#local-development-setup)
3. [Working with the Codebase](#working-with-the-codebase)
4. [Adding New Features](#adding-new-features)
5. [Testing and Debugging](#testing-and-debugging)
6. [Code Quality Standards](#code-quality-standards)
7. [Security Best Practices](#security-best-practices)
8. [Performance Optimization](#performance-optimization)
9. [Contributing Code](#contributing-code)

---

## Project Structure

### Architecture Overview

AiBuild is built as a monolithic Next.js application with a modular architecture:

```
AiBuild/
├── app/                    # Next.js App Router
│   ├── (app)/             # Authenticated app routes
│   ├── (marketing)/       # Public marketing pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── aura/             # Aura FX design system
│   ├── dashboard/        # Dashboard components
│   ├── workspace/        # Workspace components
│   ├── dev/              # Developer panel components
│   ├── admin/            # Admin panel components
│   └── ui/               # Base UI components (shadcn)
├── core/                  # Core business logic
│   ├── ai/               # AI/CyberAi domain
│   │   ├── model-registry.ts
│   │   ├── project-generator.ts
│   │   ├── file-refiner.ts
│   │   ├── logic-flow-detector.ts
│   │   └── routing-policy.ts
│   └── domain/           # Business domain logic
│       ├── project-service.ts
│       ├── file-service.ts
│       ├── deployment-service.ts
│       └── github-service.ts
├── lib/                   # Utilities and helpers
│   ├── types.ts          # TypeScript types
│   ├── utils.ts          # Utility functions
│   ├── db.ts             # Database client
│   └── api-client.ts     # API client
├── prisma/                # Database schema
│   ├── schema.prisma     # Prisma schema
│   └── migrations/       # Database migrations
├── public/                # Static assets
├── docs/                  # Documentation
├── tests/                 # Test files
└── scripts/               # Build and utility scripts
```

### Key Directories Explained

#### `/app` - Next.js Application

**App Router Structure:**
- `(app)/` - Authenticated routes (requires login)
  - `projects/` - Project management pages
  - `dev/` - Developer panel pages
  - `admin/` - Admin panel pages
- `(marketing)/` - Public pages
  - `about/`, `pricing/`, `docs/`
- `api/` - API endpoints
  - `projects/` - Project CRUD APIs
  - `generate-project/` - Project generation
  - `deploy/` - Deployment endpoints

#### `/components` - React Components

**Organized by Domain:**
- `aura/` - Aura FX design system components
- `dashboard/` - User dashboard UI
- `workspace/` - Code workspace UI
- `dev/` - Developer panel UI
- `admin/` - Admin panel UI
- `ui/` - Base shadcn/ui components

**Component Guidelines:**
- Keep components focused and single-purpose
- Use TypeScript for all components
- Include prop type definitions
- Document complex components
- Co-locate tests with components

#### `/core` - Business Logic

**Domain-Driven Design:**
- Each service encapsulates a business domain
- Services are framework-agnostic
- Can be unit tested independently
- Reusable across API routes and server actions

**AI Domain (`/core/ai`):**
- `model-registry.ts` - Model configuration and management
- `project-generator.ts` - Project generation orchestration
- `file-refiner.ts` - File regeneration and refinement
- `logic-flow-detector.ts` - Code analysis and issue detection
- `routing-policy.ts` - Model selection strategy

**Business Domain (`/core/domain`):**
- `project-service.ts` - Project CRUD operations
- `file-service.ts` - File management
- `deployment-service.ts` - Deployment orchestration
- `github-service.ts` - GitHub integration

#### `/lib` - Shared Utilities

**Common Modules:**
- `types.ts` - Shared TypeScript types
- `utils.ts` - Helper functions
- `db.ts` - Database client (Prisma)
- `api-client.ts` - Client-side API wrapper

### Technology Stack

**Frontend:**
- **Next.js 14+** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Radix UI** - Accessible primitives
- **shadcn/ui** - Component library base
- **Monaco Editor** - Code editor

**Backend:**
- **Next.js API Routes** - RESTful APIs
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database
- **NextAuth** - Authentication

**AI/ML:**
- **Vercel AI SDK** - Model orchestration
- **OpenAI** - GPT models
- **Google AI** - Gemini models
- **Anthropic** - Claude models

**Infrastructure:**
- **Vercel** - Hosting and deployment
- **GitHub** - Version control and CI/CD
- **Neon/Supabase** - Managed PostgreSQL

---

## Local Development Setup

### Prerequisites

Ensure you have these tools installed:

```bash
# Node.js (v18+)
node --version

# pnpm (v8+)
pnpm --version

# Git
git --version

# PostgreSQL (v14+)
psql --version
```

### Initial Setup

#### 1. Clone Repository

```bash
git clone https://github.com/SolanaRemix/AiBuild.git
cd AiBuild
```

#### 2. Install Dependencies

```bash
pnpm install
```

#### 3. Set Up Database

**Option A: Local PostgreSQL**

```bash
# Create database
createdb aibuild_dev

# Update .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/aibuild_dev"
```

**Option B: Hosted Database (Neon/Supabase)**

1. Create account on Neon or Supabase
2. Create new database
3. Copy connection string to `.env.local`

#### 4. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Database
DATABASE_URL="postgresql://..."

# AI Models (get from respective providers)
OPENAI_API_KEY="sk_example_your_key"
GOOGLE_API_KEY="your_gemini_key"
ANTHROPIC_API_KEY="your_claude_key"

# GitHub OAuth (create GitHub App)
GITHUB_CLIENT_ID="your_client_id"
GITHUB_CLIENT_SECRET="your_client_secret"
GITHUB_TOKEN="ghp_your_pat"

# Vercel (optional for deployments)
VERCEL_TOKEN="your_vercel_token"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate_random_secret"

# App Config
NODE_ENV="development"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

#### 5. Initialize Database

```bash
# Run migrations
pnpm prisma migrate dev

# Generate Prisma client
pnpm prisma generate

# Seed database (optional)
pnpm prisma db seed
```

#### 6. Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### Development Tools

**Prisma Studio** - Database GUI:
```bash
pnpm prisma studio
```

**Type Checking** - TypeScript validation:
```bash
pnpm type-check
```

**Linting** - Code quality:
```bash
pnpm lint
```

**Tests** - Run test suite:
```bash
pnpm test
```

---

## Working with the Codebase

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write code
   - Add tests
   - Update documentation

3. **Test Locally**
   ```bash
   pnpm test
   pnpm type-check
   pnpm lint
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Working with Database

#### Creating Migrations

```bash
# Create new migration
pnpm prisma migrate dev --name add_user_settings

# Apply migrations
pnpm prisma migrate deploy
```

#### Schema Changes

Edit `prisma/schema.prisma`:

```prisma
model Project {
  id          String   @id @default(cuid())
  userId      String
  name        String
  slug        String   @unique
  prompt      String   @db.Text
  templateType String
  primaryTarget String
  status      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  files       File[]
  deployments Deployment[]
  
  @@index([userId])
  @@index([slug])
}
```

After changes:
```bash
pnpm prisma migrate dev
pnpm prisma generate
```

#### Querying Database

```typescript
import { db } from '@/lib/db'

// Create
const project = await db.project.create({
  data: {
    userId: 'user_123',
    name: 'My Project',
    slug: 'my-project',
    prompt: 'Build a...',
    templateType: 'app',
    primaryTarget: 'web',
    status: 'draft',
  }
})

// Read
const project = await db.project.findUnique({
  where: { id: 'proj_123' },
  include: { files: true }
})

// Update
const updated = await db.project.update({
  where: { id: 'proj_123' },
  data: { status: 'deployed' }
})

// Delete
await db.project.delete({
  where: { id: 'proj_123' }
})
```

### Working with AI Models

#### Using Model Registry

```typescript
import { modelRegistry } from '@/core/ai/model-registry'

// Get available models
const models = modelRegistry.getModels({
  capability: 'codegen',
  enabled: true
})

// Get specific model
const gpt4 = modelRegistry.getModel('gpt-4-turbo')

// Check model availability
const canUse = modelRegistry.canUseModel('gpt-4-turbo', userId)
```

#### Generating Code

```typescript
import { ProjectGenerator } from '@/core/ai/project-generator'

const generator = new ProjectGenerator({
  userId: 'user_123',
  modelRegistry,
  routingPolicy
})

const project = await generator.generateProject({
  prompt: 'Build a task manager',
  target: 'web',
  template: 'app'
})
```

#### Regenerating Files

```typescript
import { FileRefiner } from '@/core/ai/file-refiner'

const refiner = new FileRefiner({ modelRegistry })

const newContent = await refiner.refineFile({
  filePath: 'components/Button.tsx',
  currentContent: originalCode,
  instructions: 'Add loading state and error handling',
  projectContext
})
```

### Working with APIs

#### Creating API Routes

`app/api/projects/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { ProjectService } from '@/core/domain/project-service'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const projectService = new ProjectService()
    const projects = await projectService.getUserProjects(
      session.user.id
    )

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const projectService = new ProjectService()
    const project = await projectService.createProject({
      userId: session.user.id,
      ...body
    })

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

#### Using API Client (Client-Side)

```typescript
import { apiClient } from '@/lib/api-client'

// Fetch projects
const { projects } = await apiClient.get('/api/projects')

// Create project
const { project } = await apiClient.post('/api/projects', {
  name: 'My Project',
  prompt: 'Build a...',
  target: 'web'
})

// Update project
await apiClient.patch(`/api/projects/${id}`, {
  status: 'deployed'
})

// Delete project
await apiClient.delete(`/api/projects/${id}`)
```

### Working with Components

#### Creating Components

`components/workspace/file-tree.tsx`:

```typescript
"use client"

import { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react'
import type { ProjectFile } from '@/lib/types'

interface FileTreeProps {
  files: ProjectFile[]
  selectedPath: string | null
  onSelect: (path: string) => void
}

export function FileTree({ 
  files, 
  selectedPath, 
  onSelect 
}: FileTreeProps) {
  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(['/'])
  )

  const toggleFolder = (path: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col gap-1">
      {files.map(file => (
        <FileTreeItem
          key={file.path}
          file={file}
          selected={file.path === selectedPath}
          expanded={expanded.has(file.path)}
          onSelect={onSelect}
          onToggle={toggleFolder}
        />
      ))}
    </div>
  )
}
```

#### Using Aura FX Components

```typescript
import {
  GlowButton,
  GlowCard,
  GlowInput,
  GlowBadge
} from '@/components/aura'

export function MyComponent() {
  return (
    <GlowCard variant="cyan" className="p-6">
      <h2 className="text-lg font-semibold mb-4">
        My Feature
      </h2>
      
      <GlowInput
        label="Project Name"
        placeholder="Enter name..."
      />
      
      <div className="flex gap-2 mt-4">
        <GlowButton variant="primary">
          Save
        </GlowButton>
        <GlowButton variant="ghost">
          Cancel
        </GlowButton>
      </div>
      
      <GlowBadge variant="success">
        Active
      </GlowBadge>
    </GlowCard>
  )
}
```

---

## Adding New Features

### Feature Development Process

1. **Plan the Feature**
   - Define requirements
   - Design architecture
   - Identify dependencies
   - Plan testing strategy

2. **Database Changes** (if needed)
   - Update Prisma schema
   - Create migration
   - Update types

3. **Core Logic**
   - Add service methods
   - Implement business logic
   - Add error handling

4. **API Endpoints**
   - Create API routes
   - Add validation
   - Document endpoints

5. **UI Components**
   - Create components
   - Add to appropriate pages
   - Style with Aura FX

6. **Testing**
   - Write unit tests
   - Add integration tests
   - Manual testing

7. **Documentation**
   - Update relevant docs
   - Add code comments
   - Update changelog

### Example: Adding a Feature

**Feature: Project Templates**

#### 1. Database Schema

```prisma
// prisma/schema.prisma
model ProjectTemplate {
  id          String   @id @default(cuid())
  name        String
  description String?
  category    String
  icon        String?
  config      Json
  isPublic    Boolean  @default(false)
  createdBy   String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([category])
  @@index([createdBy])
}
```

```bash
pnpm prisma migrate dev --name add_project_templates
```

#### 2. Service Layer

```typescript
// core/domain/template-service.ts
import { db } from '@/lib/db'
import type { ProjectTemplate } from '@prisma/client'

export class TemplateService {
  async getPublicTemplates(category?: string) {
    return db.projectTemplate.findMany({
      where: {
        isPublic: true,
        ...(category && { category })
      },
      orderBy: { createdAt: 'desc' }
    })
  }

  async createTemplate(data: {
    name: string
    description?: string
    category: string
    config: any
    createdBy: string
  }): Promise<ProjectTemplate> {
    return db.projectTemplate.create({ data })
  }

  async getTemplate(id: string) {
    return db.projectTemplate.findUnique({
      where: { id }
    })
  }
}
```

#### 3. API Route

```typescript
// app/api/templates/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { TemplateService } from '@/core/domain/template-service'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category') || undefined

    const service = new TemplateService()
    const templates = await service.getPublicTemplates(category)

    return NextResponse.json({ templates })
  } catch (error) {
    console.error('Failed to fetch templates:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

#### 4. Component

```typescript
// components/dashboard/template-selector.tsx
"use client"

import { useState, useEffect } from 'react'
import { GlowCard, GlowButton } from '@/components/aura'
import type { ProjectTemplate } from '@prisma/client'

export function TemplateSelector({
  onSelect
}: {
  onSelect: (template: ProjectTemplate) => void
}) {
  const [templates, setTemplates] = useState<ProjectTemplate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => {
        setTemplates(data.templates)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <div>Loading templates...</div>
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map(template => (
        <GlowCard key={template.id} variant="cyan">
          <h3 className="font-semibold">{template.name}</h3>
          <p className="text-sm text-muted-foreground">
            {template.description}
          </p>
          <GlowButton
            onClick={() => onSelect(template)}
            className="mt-4"
          >
            Use Template
          </GlowButton>
        </GlowCard>
      ))}
    </div>
  )
}
```

#### 5. Tests

```typescript
// tests/template-service.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { TemplateService } from '@/core/domain/template-service'

describe('TemplateService', () => {
  let service: TemplateService

  beforeEach(() => {
    service = new TemplateService()
  })

  it('creates a template', async () => {
    const template = await service.createTemplate({
      name: 'Test Template',
      category: 'web',
      config: {},
      createdBy: 'user_123'
    })

    expect(template.id).toBeDefined()
    expect(template.name).toBe('Test Template')
  })

  it('fetches public templates', async () => {
    const templates = await service.getPublicTemplates()
    expect(Array.isArray(templates)).toBe(true)
  })

  it('filters templates by category', async () => {
    const templates = await service.getPublicTemplates('web')
    templates.forEach(t => {
      expect(t.category).toBe('web')
    })
  })
})
```

---

## Testing and Debugging

### Testing Strategy

**Test Pyramid:**
```
        /\
       /E2E\     ← Few, high-value tests
      /------\
     /Integration\ ← Moderate coverage
    /------------\
   /  Unit Tests  \ ← Most tests here
  /----------------\
```

### Unit Testing

**Testing Services:**

```typescript
// tests/project-service.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { ProjectService } from '@/core/domain/project-service'
import { mockDb } from './mocks/db'

describe('ProjectService', () => {
  let service: ProjectService

  beforeEach(() => {
    service = new ProjectService()
    mockDb.reset()
  })

  describe('createProject', () => {
    it('creates a project with valid data', async () => {
      const project = await service.createProject({
        userId: 'user_123',
        name: 'Test Project',
        prompt: 'Build a...',
        target: 'web',
        template: 'app'
      })

      expect(project.id).toBeDefined()
      expect(project.name).toBe('Test Project')
      expect(project.status).toBe('draft')
    })

    it('throws error with invalid target', async () => {
      await expect(
        service.createProject({
          userId: 'user_123',
          name: 'Test',
          prompt: 'Build...',
          target: 'invalid' as any,
          template: 'app'
        })
      ).rejects.toThrow('Invalid target')
    })
  })
})
```

**Testing Components:**

```typescript
// tests/components/file-tree.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { FileTree } from '@/components/workspace/file-tree'

describe('FileTree', () => {
  const mockFiles = [
    { path: 'src/index.ts', content: '...', language: 'typescript' },
    { path: 'src/app.ts', content: '...', language: 'typescript' }
  ]

  it('renders files', () => {
    const { getByText } = render(
      <FileTree
        files={mockFiles}
        selectedPath={null}
        onSelect={() => {}}
      />
    )

    expect(getByText('index.ts')).toBeInTheDocument()
    expect(getByText('app.ts')).toBeInTheDocument()
  })

  it('calls onSelect when file clicked', () => {
    const onSelect = vi.fn()
    const { getByText } = render(
      <FileTree
        files={mockFiles}
        selectedPath={null}
        onSelect={onSelect}
      />
    )

    fireEvent.click(getByText('index.ts'))
    expect(onSelect).toHaveBeenCalledWith('src/index.ts')
  })
})
```

### Integration Testing

```typescript
// tests/integration/project-generation.test.ts
import { describe, it, expect } from 'vitest'
import { ProjectGenerator } from '@/core/ai/project-generator'
import { modelRegistry } from '@/core/ai/model-registry'

describe('Project Generation Flow', () => {
  it('generates complete web project', async () => {
    const generator = new ProjectGenerator({
      userId: 'user_123',
      modelRegistry,
      routingPolicy: {}
    })

    const result = await generator.generateProject({
      prompt: 'Build a simple todo app',
      target: 'web',
      template: 'app'
    })

    expect(result.project).toBeDefined()
    expect(result.files.length).toBeGreaterThan(0)
    expect(result.files.some(f => 
      f.path === 'package.json'
    )).toBe(true)
  })
})
```

### E2E Testing

```typescript
// tests/e2e/project-workflow.spec.ts
import { test, expect } from '@playwright/test'

test('complete project workflow', async ({ page }) => {
  // Login
  await page.goto('http://localhost:3000')
  await page.click('text=Sign In')
  // ... auth flow

  // Create project
  await page.click('text=New Project')
  await page.fill('[placeholder="Describe your project"]', 
    'Build a todo app'
  )
  await page.click('text=Generate')

  // Wait for generation
  await page.waitForSelector('text=Ready', { timeout: 60000 })

  // Verify workspace
  await expect(page.locator('.file-tree')).toBeVisible()
  await expect(page.locator('.code-editor')).toBeVisible()
  await expect(page.locator('.preview-panel')).toBeVisible()

  // Edit file
  await page.click('text=app.tsx')
  await page.fill('.monaco-editor', '// Modified code')
  await page.keyboard.press('Control+S')

  // Deploy
  await page.click('text=Deploy')
  await page.click('text=Vercel')
  await page.waitForSelector('text=Deployed', { timeout: 120000 })
})
```

### Debugging

**Server-Side Debugging:**

```typescript
// Add debug logging
import { logger } from '@/lib/logger'

export async function generateProject(params) {
  logger.debug('Starting generation', { params })
  
  try {
    const result = await generator.generate(params)
    logger.info('Generation successful', { 
      projectId: result.id 
    })
    return result
  } catch (error) {
    logger.error('Generation failed', { error, params })
    throw error
  }
}
```

**Client-Side Debugging:**

```typescript
// Use React DevTools
// Add debug info to components
export function MyComponent() {
  useEffect(() => {
    console.log('[MyComponent] Mounted', { props })
    return () => {
      console.log('[MyComponent] Unmounted')
    }
  }, [])
  
  // Component code...
}
```

**Database Query Debugging:**

```typescript
// Enable Prisma logging
const db = new PrismaClient({
  log: ['query', 'error', 'warn']
})

// Or use Prisma Studio
// pnpm prisma studio
```

---

## Code Quality Standards

### TypeScript Guidelines

**Strict Type Safety:**

```typescript
// ✅ Good: Explicit types
interface ProjectConfig {
  name: string
  target: 'web' | 'mobile' | 'desktop'
  template: TemplateType
}

function createProject(config: ProjectConfig): Promise<Project> {
  // Implementation
}

// ❌ Bad: Implicit any
function createProject(config) {
  // ...
}
```

**Avoid Type Assertions:**

```typescript
// ✅ Good: Type guards
function isProject(obj: unknown): obj is Project {
  return typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj
}

if (isProject(data)) {
  // TypeScript knows data is Project
  console.log(data.name)
}

// ❌ Bad: Type assertion
const project = data as Project
```

### Code Style

**Formatting:**
- 2 spaces for indentation
- Single quotes for strings
- Semicolons required
- Trailing commas in multiline

**Naming Conventions:**
- `camelCase` for variables and functions
- `PascalCase` for components and classes
- `UPPER_SNAKE_CASE` for constants
- `kebab-case` for file names

**File Organization:**

```typescript
// 1. Imports (grouped)
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { ProjectService } from '@/core/domain/project-service'

import type { Project } from '@/lib/types'

// 2. Types/Interfaces
interface Props {
  project: Project
  onUpdate: (project: Project) => void
}

// 3. Constants
const MAX_RETRIES = 3

// 4. Component/Function
export function ProjectCard({ project, onUpdate }: Props) {
  // Implementation
}

// 5. Helper functions (private)
function formatDate(date: Date): string {
  // ...
}
```

### Error Handling

**Consistent Error Handling:**

```typescript
// Define error types
export class ProjectNotFoundError extends Error {
  constructor(projectId: string) {
    super(`Project not found: ${projectId}`)
    this.name = 'ProjectNotFoundError'
  }
}

// Use in service
export class ProjectService {
  async getProject(id: string): Promise<Project> {
    const project = await db.project.findUnique({
      where: { id }
    })
    
    if (!project) {
      throw new ProjectNotFoundError(id)
    }
    
    return project
  }
}

// Handle in API route
export async function GET(req: NextRequest) {
  try {
    const { id } = await req.json()
    const service = new ProjectService()
    const project = await service.getProject(id)
    
    return NextResponse.json({ project })
  } catch (error) {
    if (error instanceof ProjectNotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      )
    }
    
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Documentation

**JSDoc Comments:**

```typescript
/**
 * Generates a new project from a user prompt
 * 
 * @param params - Project generation parameters
 * @param params.prompt - User's project description
 * @param params.target - Target platform (web/mobile/desktop)
 * @param params.template - Template type to use
 * @returns Promise resolving to generated project
 * @throws {InvalidPromptError} If prompt is invalid
 * @throws {ModelUnavailableError} If no models available
 * 
 * @example
 * ```typescript
 * const project = await generateProject({
 *   prompt: 'Build a todo app',
 *   target: 'web',
 *   template: 'app'
 * })
 * ```
 */
export async function generateProject(
  params: GenerationParams
): Promise<Project> {
  // Implementation
}
```

---

## Security Best Practices

### Input Validation

**Validate All Inputs:**

```typescript
import { z } from 'zod'

const ProjectSchema = z.object({
  name: z.string().min(1).max(100),
  prompt: z.string().min(10).max(5000),
  target: z.enum(['web', 'mobile', 'desktop']),
  template: z.enum(['landing', 'dashboard', 'saas', 'app', 'custom'])
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  
  // Validate input
  const result = ProjectSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Invalid input', details: result.error },
      { status: 400 }
    )
  }
  
  // Process valid data
  const project = await createProject(result.data)
  return NextResponse.json({ project })
}
```

### Authentication

**Protect API Routes:**

```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // User is authenticated
  // Proceed with request
}
```

**Role-Based Access:**

```typescript
function requireRole(role: 'user' | 'dev' | 'admin') {
  return async (req: NextRequest) => {
    const session = await getServerSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    if (session.user.role !== role && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      )
    }
  }
}

// Usage
export const GET = requireRole('admin')(async (req) => {
  // Admin-only logic
})
```

### Secrets Management

**Never Commit Secrets:**

```typescript
// ❌ Bad: Hardcoded secret
const apiKey = 'sk_example_1234567890'

// ✅ Good: Environment variable
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

**Client-Side Exposure:**

```typescript
// ❌ Bad: Exposing secret to client
export default function Page() {
  const apiKey = process.env.SECRET_KEY // Exposed!
  return <div>{apiKey}</div>
}

// ✅ Good: Keep secrets server-side
// Use NEXT_PUBLIC_ prefix only for non-sensitive data
const publicUrl = process.env.NEXT_PUBLIC_APP_URL
```

### SQL Injection Prevention

**Use Prisma (Parameterized):**

```typescript
// ✅ Safe: Prisma handles parameterization
const user = await db.user.findUnique({
  where: { email: userInput }
})

// ❌ Dangerous: Raw SQL with interpolation
const user = await db.$queryRaw`
  SELECT * FROM users WHERE email = ${userInput}
`
```

### XSS Prevention

**Sanitize User Input:**

```typescript
import DOMPurify from 'isomorphic-dompurify'

// Sanitize HTML content
const clean = DOMPurify.sanitize(userInput)

// Use in React (automatically escapes)
return <div>{userInput}</div> // Safe

// ❌ Dangerous: dangerouslySetInnerHTML
return <div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ Safe: Sanitized HTML
return <div dangerouslySetInnerHTML={{ 
  __html: DOMPurify.sanitize(userInput) 
}} />
```

---

## Performance Optimization

### Database Optimization

**Efficient Queries:**

```typescript
// ❌ Bad: N+1 query problem
const projects = await db.project.findMany()
for (const project of projects) {
  const files = await db.file.findMany({
    where: { projectId: project.id }
  })
}

// ✅ Good: Use includes
const projects = await db.project.findMany({
  include: { files: true }
})

// ✅ Good: Pagination
const projects = await db.project.findMany({
  take: 20,
  skip: page * 20,
  orderBy: { createdAt: 'desc' }
})
```

**Indexing:**

```prisma
model Project {
  id     String @id
  userId String
  slug   String @unique
  
  @@index([userId])
  @@index([slug])
  @@index([userId, createdAt])
}
```

### React Performance

**Memoization:**

```typescript
import { memo, useMemo, useCallback } from 'react'

// Memoize expensive computations
const sortedFiles = useMemo(() => {
  return files.sort((a, b) => a.path.localeCompare(b.path))
}, [files])

// Memoize callbacks
const handleSelect = useCallback((path: string) => {
  setSelectedPath(path)
}, [])

// Memoize components
export const FileTree = memo(function FileTree({ files }: Props) {
  // Component code
})
```

**Code Splitting:**

```typescript
import dynamic from 'next/dynamic'

// Lazy load heavy components
const Monaco = dynamic(
  () => import('@monaco-editor/react'),
  { ssr: false, loading: () => <div>Loading editor...</div> }
)

export function CodeEditor() {
  return <Monaco />
}
```

### Caching

**API Response Caching:**

```typescript
import { unstable_cache } from 'next/cache'

export const getProjects = unstable_cache(
  async (userId: string) => {
    return db.project.findMany({
      where: { userId }
    })
  },
  ['user-projects'],
  {
    revalidate: 60, // Cache for 60 seconds
    tags: ['projects']
  }
)

// Revalidate cache
import { revalidateTag } from 'next/cache'
revalidateTag('projects')
```

---

## Contributing Code

### Contribution Workflow

1. **Fork Repository**
2. **Create Feature Branch**
3. **Make Changes**
4. **Write Tests**
5. **Update Documentation**
6. **Submit Pull Request**

### Pull Request Guidelines

**PR Title Format:**
```
feat: add project templates
fix: resolve workspace sync issue
docs: update deployment guide
chore: upgrade dependencies
```

**PR Description Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Code Review Process

1. **Automated Checks** - CI runs tests and linting
2. **Code Review** - Maintainer reviews code
3. **Feedback** - Address review comments
4. **Approval** - Maintainer approves
5. **Merge** - Code merged to main

### Commit Guidelines

**Conventional Commits:**

```bash
feat: add new feature
fix: resolve bug
docs: update documentation
style: formatting changes
refactor: code restructuring
test: add/update tests
chore: maintenance tasks
```

**Good Commits:**
```bash
git commit -m "feat: add project template selector component"
git commit -m "fix: resolve file tree race condition on mount"
git commit -m "docs: add deployment guide for mobile apps"
```

---

## Additional Resources

**Internal Documentation:**
- [Architecture Overview](../architecture.md)
- [API Reference](../api/overview.md)
- [User Guide](./user-guide.md)
- [Deployment Guide](./deployment.md)

**External Resources:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

**Community:**
- [GitHub Discussions](https://github.com/SolanaRemix/AiBuild/discussions)
- [Discord Server](https://discord.gg/aibuild)

---

**Ready to contribute?** Check out our [open issues](https://github.com/SolanaRemix/AiBuild/issues) or start building!
