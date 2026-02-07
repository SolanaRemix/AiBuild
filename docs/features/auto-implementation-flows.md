# 🔄 Auto Implementation Flows

Automatic structured workflows that strictly follow the architecture.md design principles for implementing and repairing code, files, database, UI/UX, API, and SDK components.

## Overview

This document defines **structured implementation flows** that automatically apply architecture-compliant repairs and implementations across all system layers, ensuring consistency with the architecture.md design and keeping documentation synchronized with actual implementations.

## Architecture-Driven Implementation Principles

### Core Principle: Strict Architecture Adherence

All automatic implementations and repairs **must** follow the layered architecture:

```
Presentation Layer → Services Layer → CyberAi Layer → Integration Layer → Data Layer
```

**Rules:**
1. **No Layer Skipping** - Always go through proper layers
2. **Separation of Concerns** - UI has no business logic, services orchestrate, domain contains core logic
3. **Single Responsibility** - Each component has one clear purpose
4. **Dependency Direction** - Lower layers never depend on upper layers

### When to Apply Automatic Repairs

Repairs are **only applied when necessary** based on detection:

1. **Critical Issues** - Security vulnerabilities, data loss risks, build failures
2. **Architecture Violations** - Code that breaks layer boundaries
3. **Broken Functionality** - Failed API calls, missing dependencies, type errors
4. **Sync Inconsistencies** - Documentation out of sync with implementation

**Do NOT apply repairs for:**
- Stylistic preferences
- Minor optimizations
- Working code that could be "better"

## Implementation Flow Templates

### Flow 1: Code Repair (Application Layer)

**Trigger:** Code issues detected in services or domain logic

**Architecture Context:**
- Layer: Application Services or CyberAi Agent
- Components: ProjectService, FileService, DeploymentService, ModelRegistry
- Location: `/core/domain/` or `/core/ai/`

**Automatic Repair Flow:**

```typescript
async function repairCodeLayer(issue: CodeIssue): Promise<RepairResult> {
  // 1. Validate issue requires repair
  if (!isCriticalIssue(issue)) {
    return { applied: false, reason: 'Not critical' }
  }
  
  // 2. Identify architecture layer
  const layer = identifyLayer(issue.filePath)
  
  // 3. Apply layer-specific repair
  switch (layer) {
    case 'presentation':
      return await repairPresentationCode(issue)
    
    case 'services':
      return await repairServiceCode(issue)
    
    case 'cyberai':
      return await repairCyberAiCode(issue)
    
    case 'integration':
      return await repairIntegrationCode(issue)
    
    default:
      return { applied: false, reason: 'Unknown layer' }
  }
}

async function repairServiceCode(issue: CodeIssue): Promise<RepairResult> {
  // Services must:
  // - Orchestrate business logic
  // - Not contain presentation logic
  // - Call domain/integration layers
  // - Return typed results
  
  const file = await readFile(issue.filePath)
  
  // Check for architecture violations
  const violations = detectArchitectureViolations(file, 'services')
  
  if (violations.length > 0) {
    // Refactor to comply with architecture
    const refactored = await refactorToArchitecture(file, {
      layer: 'services',
      principles: [
        'no-ui-logic',
        'orchestration-only',
        'typed-returns',
      ],
    })
    
    await writeFile(issue.filePath, refactored)
    await syncDocumentation(issue.filePath)
    
    return { applied: true, changes: ['refactored-architecture'] }
  }
  
  // Apply specific fix
  const fixed = await applyCodeFix(file, issue)
  await writeFile(issue.filePath, fixed)
  
  return { applied: true, changes: ['fixed-issue'] }
}
```

**Architecture Compliance Checks:**

| Layer | Must Have | Must NOT Have |
|-------|-----------|---------------|
| Presentation | React components, UI logic, event handlers | Business logic, API calls (use hooks), direct DB access |
| Services | Business orchestration, validation, coordination | UI rendering, direct DOM manipulation |
| CyberAi | AI orchestration, model selection, prompt management | UI logic, direct HTTP requests |
| Integration | External API calls, third-party SDK usage | Business logic, UI components |
| Data | Database operations, data models | Business logic, UI components |

### Flow 2: File System Repair

**Trigger:** Missing files, broken imports, incorrect structure

**Architecture Context:**
- Follows project structure in architecture.md
- Maintains separation: `/app`, `/components`, `/core`, `/lib`

**Automatic Repair Flow:**

```typescript
async function repairFileSystem(issue: FileSystemIssue): Promise<RepairResult> {
  // 1. Determine correct location by architecture
  const correctLocation = determineArchitecturalLocation(issue)
  
  // 2. Check if file exists in wrong location
  const misplaced = await findMisplacedFile(issue.fileName)
  
  if (misplaced) {
    // Move to correct location
    await moveFile(misplaced.current, correctLocation)
    await updateAllImports(misplaced.current, correctLocation)
    await syncDocumentation('file-structure')
    
    return { applied: true, changes: ['moved-file', 'updated-imports'] }
  }
  
  // 3. If truly missing, generate based on architecture
  if (issue.type === 'missing-service') {
    const serviceFile = await generateServiceFile({
      name: issue.serviceName,
      layer: 'services',
      template: 'domain-service',
    })
    
    await writeFile(correctLocation, serviceFile)
    await syncDocumentation('services')
    
    return { applied: true, changes: ['generated-service'] }
  }
  
  return { applied: false, reason: 'Cannot auto-repair' }
}

function determineArchitecturalLocation(issue: FileSystemIssue): string {
  // Map file types to architectural locations
  const locationMap = {
    'service': '/core/domain/',
    'ai-component': '/core/ai/',
    'integration': '/core/integrations/',
    'ui-component': '/components/',
    'page': '/app/',
    'utility': '/lib/',
    'type': '/lib/types.ts',
  }
  
  return locationMap[issue.fileType] || '/lib/'
}
```

**File Structure Enforcement:**

```
/app                    → Next.js App Router pages only
  /(app)               → Authenticated app routes
  /(marketing)         → Public marketing routes
  /api                 → API routes (thin wrappers)

/components            → React components by domain
  /aura                → Design system components
  /dashboard           → Dashboard-specific components
  /workspace           → Workspace-specific components
  /admin               → Admin panel components

/core                  → Core business logic
  /ai                  → AI orchestration (CyberAi)
  /domain              → Domain services
  /integrations        → External integrations

/lib                   → Shared utilities and types
  /types.ts            → TypeScript type definitions
  /utils.ts            → Utility functions
```

### Flow 3: Database Repair

**Trigger:** Schema inconsistencies, migration failures, data integrity issues

**Architecture Context:**
- Layer: Data Persistence Layer
- Tool: Prisma ORM
- Location: `/prisma/schema.prisma`

**Automatic Repair Flow:**

```typescript
async function repairDatabase(issue: DatabaseIssue): Promise<RepairResult> {
  // 1. Only repair critical database issues
  if (!isCriticalDatabaseIssue(issue)) {
    return { applied: false, reason: 'Not critical' }
  }
  
  // 2. Identify issue type
  switch (issue.type) {
    case 'schema-drift':
      return await repairSchemaDrift(issue)
    
    case 'missing-migration':
      return await generateMigration(issue)
    
    case 'data-integrity':
      return await repairDataIntegrity(issue)
    
    default:
      return { applied: false, reason: 'Unknown issue type' }
  }
}

async function repairSchemaDrift(issue: DatabaseIssue): Promise<RepairResult> {
  // Compare Prisma schema with actual database
  const schemaState = await prisma.$queryRaw`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public'
  `
  
  const prismaSchema = await parsePrismaSchema()
  const drift = compareSchemaToDrift(prismaSchema, schemaState)
  
  if (drift.length === 0) {
    return { applied: false, reason: 'No drift detected' }
  }
  
  // Generate migration to resolve drift
  await execCommand('pnpm prisma migrate dev --name fix-schema-drift')
  await syncDocumentation('database-schema')
  
  return { applied: true, changes: ['migration-applied'] }
}

async function generateMigration(issue: DatabaseIssue): Promise<RepairResult> {
  // Generate migration for schema changes
  const migrationName = `fix-${issue.description.replace(/\s+/g, '-')}`
  
  await execCommand(`pnpm prisma migrate dev --name ${migrationName}`)
  await execCommand('pnpm prisma generate')
  
  // Update architecture documentation
  await syncDocumentation('database-schema')
  
  return { applied: true, changes: ['migration-created'] }
}
```

**Database Architecture Compliance:**

| Component | Responsibility | Must Follow |
|-----------|---------------|-------------|
| Schema | Define data models | Prisma schema syntax, naming conventions |
| Migrations | Version control schema | Incremental, reversible, tested |
| Services | Access data | Use Prisma client, not raw SQL |
| Types | TypeScript definitions | Auto-generated from schema |

### Flow 4: UI/UX Repair

**Trigger:** Broken components, styling issues, accessibility violations

**Architecture Context:**
- Layer: Presentation Layer
- Design System: Aura FX Neo-Glow
- Components: `/components/aura/`

**Automatic Repair Flow:**

```typescript
async function repairUIUX(issue: UIUXIssue): Promise<RepairResult> {
  // 1. Only repair critical UI issues
  if (!isCriticalUIIssue(issue)) {
    return { applied: false, reason: 'Not critical' }
  }
  
  // 2. Identify issue category
  switch (issue.category) {
    case 'component-broken':
      return await repairBrokenComponent(issue)
    
    case 'accessibility':
      return await repairAccessibility(issue)
    
    case 'design-system-violation':
      return await enforceDesignSystem(issue)
    
    default:
      return { applied: false, reason: 'Unknown category' }
  }
}

async function repairBrokenComponent(issue: UIUXIssue): Promise<RepairResult> {
  const component = await readFile(issue.componentPath)
  
  // Check for common issues
  const issues = detectComponentIssues(component)
  
  for (const componentIssue of issues) {
    switch (componentIssue.type) {
      case 'missing-button-type':
        // Fix: Add type="button" or type="submit" to buttons in forms
        component = fixButtonTypes(component)
        break
      
      case 'missing-aria-label':
        // Fix: Add accessibility attributes
        component = addAriaLabels(component)
        break
      
      case 'non-aura-component':
        // Fix: Replace with Aura FX component
        component = replaceWithAuraComponent(component)
        break
    }
  }
  
  await writeFile(issue.componentPath, component)
  await syncDocumentation('ui-components')
  
  return { applied: true, changes: ['fixed-component'] }
}

async function enforceDesignSystem(issue: UIUXIssue): Promise<RepairResult> {
  // Enforce Aura FX Neo-Glow design system
  const component = await readFile(issue.componentPath)
  
  // Replace standard components with Aura components
  const replacements = {
    '<button': '<GlowButton type="button"',
    '<input': '<GlowInput',
    '<div className="card"': '<GlowCard',
  }
  
  let updated = component
  for (const [from, to] of Object.entries(replacements)) {
    updated = updated.replaceAll(from, to)
  }
  
  // Ensure imports
  updated = ensureAuraImports(updated)
  
  await writeFile(issue.componentPath, updated)
  
  return { applied: true, changes: ['enforced-design-system'] }
}
```

**UI Architecture Principles:**

1. **Always use Aura FX components** - GlowButton, GlowCard, GlowInput, etc.
2. **Explicit button types** - Always specify `type="button"` or `type="submit"`
3. **Accessibility first** - ARIA labels, semantic HTML, keyboard navigation
4. **No business logic in components** - Use hooks and services
5. **Dark mode optimized** - Follow Aura FX color palette

### Flow 5: API Repair

**Trigger:** Broken endpoints, type mismatches, error handling issues

**Architecture Context:**
- Layer: Application Services (called from API routes)
- Location: `/app/api/`
- Pattern: Thin API route → Service layer

**Automatic Repair Flow:**

```typescript
async function repairAPI(issue: APIIssue): Promise<RepairResult> {
  // 1. Only repair critical API issues
  if (!isCriticalAPIIssue(issue)) {
    return { applied: false, reason: 'Not critical' }
  }
  
  // 2. Identify issue type
  switch (issue.type) {
    case 'missing-error-handling':
      return await addErrorHandling(issue)
    
    case 'type-mismatch':
      return await fixTypeMismatch(issue)
    
    case 'fat-controller':
      return await refactorToService(issue)
    
    default:
      return { applied: false, reason: 'Unknown type' }
  }
}

async function refactorToService(issue: APIIssue): Promise<RepairResult> {
  // API routes should be thin - move logic to services
  const apiRoute = await readFile(issue.routePath)
  
  // Detect business logic in API route
  const businessLogic = extractBusinessLogic(apiRoute)
  
  if (businessLogic.length === 0) {
    return { applied: false, reason: 'No business logic found' }
  }
  
  // Create or update service
  const serviceName = determineServiceName(issue.routePath)
  const servicePath = `/core/domain/${serviceName}.ts`
  
  const serviceMethod = await generateServiceMethod({
    name: extractMethodName(issue.routePath),
    logic: businessLogic,
    returns: extractReturnType(apiRoute),
  })
  
  // Update or create service file
  await updateOrCreateService(servicePath, serviceMethod)
  
  // Refactor API route to call service
  const thinRoute = generateThinAPIRoute({
    path: issue.routePath,
    serviceName,
    methodName: serviceMethod.name,
  })
  
  await writeFile(issue.routePath, thinRoute)
  await syncDocumentation('api-structure')
  
  return { applied: true, changes: ['refactored-to-service'] }
}

async function addErrorHandling(issue: APIIssue): Promise<RepairResult> {
  const apiRoute = await readFile(issue.routePath)
  
  // Wrap in try-catch if missing
  if (!apiRoute.includes('try {') || !apiRoute.includes('catch')) {
    const wrapped = wrapInErrorHandling(apiRoute)
    await writeFile(issue.routePath, wrapped)
    
    return { applied: true, changes: ['added-error-handling'] }
  }
  
  return { applied: false, reason: 'Already has error handling' }
}
```

**API Architecture Template:**

```typescript
// CORRECT: Thin API route
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const validated = validateSchema(body)
    
    // Call service layer
    const result = await projectService.create(validated)
    
    return NextResponse.json(result)
  } catch (error) {
    return handleAPIError(error)
  }
}

// WRONG: Fat API route with business logic
export async function POST(request: Request) {
  const body = await request.json()
  
  // Business logic should be in service!
  const files = await db.file.findMany({ where: { projectId: body.id } })
  const processed = files.map(f => processFile(f))
  // ... more logic
  
  return NextResponse.json(processed)
}
```

### Flow 6: SDK Repair

**Trigger:** Type inconsistencies, missing methods, breaking changes

**Architecture Context:**
- Layer: Integration (external-facing)
- Location: `/packages/sdk/` (conceptual)
- Sync: Must match API endpoints and types

**Automatic Repair Flow:**

```typescript
async function repairSDK(issue: SDKIssue): Promise<RepairResult> {
  // 1. Only repair critical SDK issues
  if (!isCriticalSDKIssue(issue)) {
    return { applied: false, reason: 'Not critical' }
  }
  
  // 2. Sync SDK with API
  switch (issue.type) {
    case 'type-mismatch':
      return await syncSDKTypes(issue)
    
    case 'missing-method':
      return await generateSDKMethod(issue)
    
    case 'outdated-endpoint':
      return await updateSDKEndpoint(issue)
    
    default:
      return { applied: false, reason: 'Unknown type' }
  }
}

async function syncSDKTypes(issue: SDKIssue): Promise<RepairResult> {
  // Get types from lib/types.ts (source of truth)
  const appTypes = await readFile('/lib/types.ts')
  
  // Extract relevant types
  const relevantTypes = extractTypes(appTypes, issue.typeNames)
  
  // Update SDK types
  const sdkTypesPath = '/packages/sdk/src/types.ts'
  const sdkTypes = await readFile(sdkTypesPath)
  
  // Merge or replace types
  const updated = mergeTypes(sdkTypes, relevantTypes)
  
  await writeFile(sdkTypesPath, updated)
  await syncDocumentation('sdk-types')
  
  return { applied: true, changes: ['synced-types'] }
}

async function generateSDKMethod(issue: SDKIssue): Promise<RepairResult> {
  // Generate SDK method from API endpoint
  const apiRoute = await findAPIRoute(issue.endpoint)
  
  if (!apiRoute) {
    return { applied: false, reason: 'API route not found' }
  }
  
  // Analyze API route to generate SDK method
  const method = await analyzeAndGenerateSDKMethod(apiRoute)
  
  // Add to SDK client
  const sdkClient = await readFile('/packages/sdk/src/client.ts')
  const updated = addMethodToClient(sdkClient, method)
  
  await writeFile('/packages/sdk/src/client.ts', updated)
  await syncDocumentation('sdk-methods')
  
  return { applied: true, changes: ['generated-method'] }
}
```

## Auto Documentation Sync

All repairs automatically sync with documentation to maintain consistency.

### Sync Flow

```typescript
async function syncDocumentation(changeType: string): Promise<void> {
  switch (changeType) {
    case 'services':
      await updateArchitectureDoc('services')
      await updateDeveloperGuide('services')
      break
    
    case 'api-structure':
      await updateAPIOverview()
      await updateArchitectureDoc('api')
      break
    
    case 'database-schema':
      await updateArchitectureDoc('data-layer')
      await updateDeveloperGuide('database')
      break
    
    case 'ui-components':
      await updateArchitectureDoc('presentation')
      await updateUserGuide('ui')
      break
    
    case 'sdk-types':
    case 'sdk-methods':
      await updateSDKDoc()
      await updateAPIOverview()
      break
  }
}

async function updateArchitectureDoc(section: string): Promise<void> {
  // Read current implementation
  const implementation = await scanImplementation(section)
  
  // Read architecture.md
  const archDoc = await readFile('/docs/architecture.md')
  
  // Find section to update
  const sectionContent = findSection(archDoc, section)
  
  // Generate updated content based on implementation
  const updated = generateDocSection(implementation, section)
  
  // Replace section
  const newDoc = replaceSection(archDoc, section, updated)
  
  await writeFile('/docs/architecture.md', newDoc)
}
```

## Decision Matrix: When to Apply Repairs

| Issue Type | Severity | Auto-Repair? | Requires Confirmation? |
|------------|----------|--------------|------------------------|
| Security vulnerability | Critical | ✅ Always | ❌ No - Fix immediately |
| Data loss risk | Critical | ✅ Always | ❌ No - Fix immediately |
| Build failure | High | ✅ Yes | ❌ No |
| Architecture violation | High | ✅ Yes | ⚠️ If major refactor |
| Type error | Medium | ✅ Yes | ❌ No |
| Missing error handling | Medium | ✅ Yes | ❌ No |
| Style inconsistency | Low | ❌ No | N/A |
| Minor optimization | Low | ❌ No | N/A |
| Preference change | None | ❌ No | N/A |

## Validation After Repair

All repairs must pass validation:

```typescript
async function validateRepair(repair: RepairResult): Promise<boolean> {
  // 1. Check syntax
  const syntaxValid = await checkSyntax(repair.filePath)
  if (!syntaxValid) return false
  
  // 2. Check types
  const typeValid = await checkTypes(repair.filePath)
  if (!typeValid) return false
  
  // 3. Run affected tests
  const testsPass = await runAffectedTests(repair.filePath)
  if (!testsPass) return false
  
  // 4. Verify architecture compliance
  const architectureValid = await verifyArchitecture(repair.filePath)
  if (!architectureValid) return false
  
  // 5. Check documentation sync
  const docsInSync = await verifyDocumentationSync(repair.changeType)
  if (!docsInSync) return false
  
  return true
}
```

## Emergency Rollback

If repair causes issues:

```typescript
async function rollbackRepair(repairId: string): Promise<void> {
  // 1. Get repair record
  const repair = await getRepair(repairId)
  
  // 2. Restore from backup
  await restoreFromBackup(repair.filePath, repair.backupId)
  
  // 3. Revert documentation
  await revertDocumentation(repair.changeType)
  
  // 4. Mark as rolled back
  await markRepairRolledBack(repairId)
}
```

## Best Practices

### 1. Always Validate Architecture Compliance

```typescript
// Before applying any change
const compliant = await verifyArchitectureCompliance(change)
if (!compliant) {
  throw new Error('Change violates architecture')
}
```

### 2. Keep Documentation in Sync

```typescript
// After every code change
await syncDocumentation(changeType)
```

### 3. Test After Repairs

```typescript
// Run tests specific to the change
await runTargetedTests(affectedFiles)
```

### 4. Backup Before Repair

```typescript
// Always create backup before modifying
const backupId = await createBackup(filePath)
```

## Integration with Auto Features

This implementation flow integrates with other auto features:

- **Auto Config** - Uses these flows to configure new projects
- **Auto Repair** - Direct implementation of repair strategies
- **Auto Fix** - Applies targeted fixes following these flows
- **Auto Analysis** - Detects issues that trigger these flows

## Learn More

- [Architecture Documentation](../architecture.md)
- [Auto Config & Maintenance](./auto-config.md)
- [Auto Fix Documentation](./auto-fix.md)
- [Developer Guide](../guides/developer-guide.md)

---

**Auto Implementation Flows ensure all changes strictly follow architecture.md and maintain documentation sync.**
