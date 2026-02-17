# ⚙️ Auto Configuration & Maintenance

AiBuild's comprehensive automatic configuration and maintenance system that keeps your projects healthy, up-to-date, and conflict-free with minimal manual intervention.

## Overview

Auto Configuration & Maintenance provides intelligent automation for:

- **Auto Config** - Automatic project configuration and setup
- **Auto Reset** - Reset JSON files and configurations to optimal state
- **Auto Refresh** - Clean and refresh dependencies automatically
- **Auto Repair** - Detect and repair broken configurations
- **Auto Resolve Conflicts** - Intelligent conflict resolution
- **Free Auto Sync** - Zero-cost synchronization capabilities
- **Auto Deploy to Vercel** - Seamless deployment automation
- **Auto Env Config** - Environment variable management

## Features

### 1. Auto Config

Automatically configure projects with optimal settings based on target platform and detected frameworks.

#### Key Capabilities

**Project Detection:**
- Detect framework and dependencies
- Analyze project structure
- Identify configuration files
- Determine build requirements

**Auto Configuration:**
- Generate optimal config files
- Set up build scripts
- Configure linters and formatters
- Initialize testing frameworks
- Set up type checking

#### How It Works

```typescript
async function autoConfig(projectId: string) {
  const project = await projectService.get(projectId)
  const files = await fileService.getAllFiles(projectId)
  
  // 1. Detect frameworks and tools
  const detection = await detectFrameworks(files)
  
  // 2. Generate configurations
  const configs = await generateConfigs({
    framework: detection.framework,
    target: project.primaryTarget,
    dependencies: detection.dependencies,
  })
  
  // 3. Apply configurations
  for (const config of configs) {
    await fileService.createOrUpdate(projectId, {
      path: config.path,
      content: config.content,
      generatedBy: 'system',
    })
  }
  
  // 4. Update package.json scripts
  await updatePackageScripts(projectId, detection.framework)
  
  return {
    configured: true,
    configs: configs.map(c => c.path),
  }
}
```

#### Generated Configurations

**TypeScript Config:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

**ESLint Config:**
```json
{
  "extends": [
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}
```

**Prettier Config:**
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always"
}
```

### 2. Auto Reset JSON Files

Automatically reset and repair JSON configuration files that become corrupted or misconfigured.

#### Key Capabilities

- **JSON Validation** - Detect malformed JSON
- **Schema Validation** - Verify against known schemas
- **Automatic Repair** - Fix common JSON issues
- **Backup & Restore** - Keep backups before resetting
- **Smart Defaults** - Apply sensible default values

#### How It Works

```typescript
async function autoResetJSON(projectId: string, filePath: string) {
  // 1. Read current file
  const file = await fileService.getByPath(projectId, filePath)
  
  // 2. Validate JSON
  let parsed
  try {
    parsed = JSON.parse(file.content)
  } catch (error) {
    // JSON is malformed
    console.log('Malformed JSON detected, resetting...')
    parsed = null
  }
  
  // 3. Backup current version
  await fileService.createBackup(file.id)
  
  // 4. Determine file type and reset
  const fileType = detectJSONType(filePath)
  let resetContent
  
  switch (fileType) {
    case 'package':
      resetContent = await generatePackageJSON(projectId)
      break
    case 'tsconfig':
      resetContent = await generateTSConfig(projectId)
      break
    case 'eslint':
      resetContent = await generateESLintConfig(projectId)
      break
    default:
      resetContent = parsed || {}
  }
  
  // 5. Apply reset
  await fileService.update(file.id, {
    content: JSON.stringify(resetContent, null, 2),
  })
  
  return {
    reset: true,
    backup: true,
    file: filePath,
  }
}
```

#### Reset Triggers

- **Manual** - User-initiated reset
- **On Error** - Automatic on parse errors
- **On Sync** - Reset before GitHub sync
- **On Deploy** - Validate before deployment
- **Scheduled** - Periodic validation

### 3. Auto Refresh & Clean Dependencies

Automatically clean, update, and optimize project dependencies.

#### Key Capabilities

**Dependency Management:**
- Remove unused dependencies
- Update outdated packages
- Resolve version conflicts
- Clean node_modules
- Prune lock files

**Cache Management:**
- Clear build caches
- Clean temporary files
- Reset package manager cache
- Remove stale artifacts

#### How It Works

```typescript
async function autoRefreshDependencies(projectId: string) {
  const project = await projectService.get(projectId)
  
  // 1. Analyze dependencies
  const packageJSON = await getPackageJSON(projectId)
  const analysis = await analyzeDependencies(packageJSON)
  
  // 2. Remove unused dependencies
  const unused = analysis.unused
  for (const dep of unused) {
    delete packageJSON.dependencies[dep]
    delete packageJSON.devDependencies[dep]
  }
  
  // 3. Update outdated packages (patch versions only)
  const outdated = analysis.outdated.filter(d => d.type === 'patch')
  for (const dep of outdated) {
    if (packageJSON.dependencies[dep.name]) {
      packageJSON.dependencies[dep.name] = `^${dep.latest}`
    }
    if (packageJSON.devDependencies[dep.name]) {
      packageJSON.devDependencies[dep.name] = `^${dep.latest}`
    }
  }
  
  // 4. Save updated package.json
  await fileService.updateByPath(projectId, 'package.json', {
    content: JSON.stringify(packageJSON, null, 2),
  })
  
  // 5. Clean and reinstall
  await cleanDependencies(projectId)
  await installDependencies(projectId)
  
  return {
    removed: unused.length,
    updated: outdated.length,
    cleaned: true,
  }
}

async function cleanDependencies(projectId: string) {
  // Remove node_modules, lock files, and caches
  await executeCommand(projectId, 'rm -rf node_modules pnpm-lock.yaml .next .turbo')
  await executeCommand(projectId, 'pnpm store prune')
}
```

#### Cleaning Strategies

**Aggressive:**
- Remove all node_modules
- Delete all lock files
- Clear all caches
- Fresh install

**Conservative:**
- Prune unused packages
- Update lock file only
- Keep cache
- Incremental update

**Smart:**
- Analyze before cleaning
- Keep critical dependencies
- Update safely
- Verify after changes

### 4. Auto Repair

Automatically detect and repair common project issues.

#### Key Capabilities

**Issue Detection:**
- Missing dependencies
- Broken imports
- Configuration errors
- Build failures
- Type errors

**Automatic Repairs:**
- Install missing packages
- Fix import paths
- Repair configurations
- Resolve build issues
- Fix type errors

#### How It Works

```typescript
async function autoRepair(projectId: string) {
  const issues: Issue[] = []
  const repairs: Repair[] = []
  
  // 1. Detect issues
  const detectionResults = await Promise.all([
    detectMissingDependencies(projectId),
    detectBrokenImports(projectId),
    detectConfigErrors(projectId),
    detectBuildFailures(projectId),
    detectTypeErrors(projectId),
  ])
  
  issues.push(...detectionResults.flat())
  
  // 2. Attempt repairs
  for (const issue of issues) {
    try {
      const repair = await repairIssue(projectId, issue)
      repairs.push(repair)
    } catch (error) {
      console.error(`Failed to repair ${issue.type}:`, error)
    }
  }
  
  // 3. Validate repairs
  const validation = await validateProject(projectId)
  
  return {
    issues: issues.length,
    repaired: repairs.filter(r => r.success).length,
    failed: repairs.filter(r => !r.success).length,
    validation,
  }
}

async function repairIssue(projectId: string, issue: Issue): Promise<Repair> {
  switch (issue.type) {
    case 'missing-dependency':
      // Install missing package
      await installPackage(projectId, issue.package)
      return { success: true, type: issue.type, action: 'installed' }
      
    case 'broken-import':
      // Fix import path
      await fixImportPath(projectId, issue.file, issue.import)
      return { success: true, type: issue.type, action: 'fixed-path' }
      
    case 'config-error':
      // Reset configuration
      await autoResetJSON(projectId, issue.file)
      return { success: true, type: issue.type, action: 'reset-config' }
      
    case 'build-failure':
      // Rebuild from scratch
      await cleanAndBuild(projectId)
      return { success: true, type: issue.type, action: 'rebuilt' }
      
    case 'type-error':
      // Generate missing types
      await generateTypes(projectId, issue.file)
      return { success: true, type: issue.type, action: 'generated-types' }
      
    default:
      return { success: false, type: issue.type, action: 'unknown' }
  }
}
```

### 5. Auto Resolve Conflicts

Intelligent automatic resolution of merge conflicts and file conflicts.

#### Key Capabilities

**Conflict Detection:**
- Git merge conflicts
- File version conflicts
- Dependency conflicts
- Configuration conflicts

**Resolution Strategies:**
- **Auto-merge** - Merge non-conflicting changes
- **Prefer-theirs** - Accept incoming changes
- **Prefer-ours** - Keep current changes
- **Smart-merge** - AI-powered resolution
- **Interactive** - Prompt user for decision

#### How It Works

```typescript
async function autoResolveConflicts(projectId: string) {
  // 1. Detect conflicts
  const conflicts = await detectConflicts(projectId)
  
  if (conflicts.length === 0) {
    return { hasConflicts: false }
  }
  
  const resolutions: Resolution[] = []
  
  // 2. Attempt automatic resolution
  for (const conflict of conflicts) {
    const strategy = determineStrategy(conflict)
    
    try {
      const resolution = await resolveConflict(projectId, conflict, strategy)
      resolutions.push(resolution)
    } catch (error) {
      // Cannot auto-resolve, mark for manual resolution
      resolutions.push({
        conflict,
        resolved: false,
        requiresManual: true,
      })
    }
  }
  
  // 3. Apply resolutions
  const applied = resolutions.filter(r => r.resolved)
  for (const resolution of applied) {
    await applyResolution(projectId, resolution)
  }
  
  return {
    total: conflicts.length,
    resolved: applied.length,
    manual: resolutions.filter(r => r.requiresManual).length,
  }
}

function determineStrategy(conflict: Conflict): ResolutionStrategy {
  // Smart strategy selection based on conflict type
  if (conflict.type === 'dependency') {
    return 'prefer-latest'
  }
  if (conflict.type === 'config') {
    return 'smart-merge'
  }
  if (conflict.type === 'generated-code') {
    return 'prefer-theirs'
  }
  if (conflict.type === 'user-code') {
    return 'prefer-ours'
  }
  return 'interactive'
}

async function resolveConflict(
  projectId: string,
  conflict: Conflict,
  strategy: ResolutionStrategy
): Promise<Resolution> {
  switch (strategy) {
    case 'auto-merge':
      return await autoMergeConflict(conflict)
      
    case 'prefer-theirs':
      return { resolved: true, content: conflict.theirs }
      
    case 'prefer-ours':
      return { resolved: true, content: conflict.ours }
      
    case 'smart-merge':
      // Use AI to intelligently merge
      const merged = await aiService.mergeConflict({
        base: conflict.base,
        ours: conflict.ours,
        theirs: conflict.theirs,
      })
      return { resolved: true, content: merged }
      
    case 'interactive':
      throw new Error('Requires manual resolution')
      
    default:
      throw new Error('Unknown strategy')
  }
}
```

### 6. Free Auto Sync

Zero-cost automatic synchronization for free tier users.

#### Key Capabilities

**Free Tier Features:**
- Unlimited GitHub sync (no API costs)
- Basic Vercel deployment
- Manual trigger sync
- Standard conflict resolution
- Basic logging

**Optimizations:**
- Batch operations
- Smart caching
- Efficient delta sync
- Minimal API calls

#### How It Works

```typescript
async function freeAutoSync(projectId: string) {
  // 1. Check free tier limits
  const usage = await usageService.getUsage(projectId)
  
  if (usage.syncs >= FREE_TIER_SYNC_LIMIT) {
    throw new Error('Free tier sync limit reached')
  }
  
  // 2. Optimize sync for free tier
  const optimization = {
    batch: true,           // Batch multiple changes
    deltaOnly: true,       // Only sync changes
    compress: true,        // Compress payloads
    cacheResults: true,    // Cache sync results
  }
  
  // 3. Execute optimized sync
  const result = await syncToGitHub(projectId, {
    ...optimization,
    createPR: false,       // No auto PR on free tier
  })
  
  // 4. Update usage
  await usageService.incrementSync(projectId)
  
  return result
}
```

#### Free Tier Limits

| Feature | Free Tier | Pro Tier |
|---------|-----------|----------|
| Syncs/month | 100 | Unlimited |
| Auto-sync | Manual | Automatic |
| Conflict resolution | Basic | AI-powered |
| PR creation | Manual | Automatic |
| Deployment | Basic | Advanced |

### 7. Auto Deploy to Vercel

Seamless automatic deployment to Vercel with full configuration management.

#### Key Capabilities

**Deployment Automation:**
- One-click deployment
- Auto environment setup
- Domain configuration
- SSL certificate management
- Preview deployments

**Configuration Management:**
- Detect framework automatically
- Set optimal build settings
- Configure environment variables
- Set up custom domains
- Enable edge functions

#### How It Works

```typescript
async function autoDeployVercel(projectId: string) {
  const project = await projectService.get(projectId)
  
  // 1. Ensure GitHub sync
  await ensureGitHubSync(projectId)
  
  // 2. Auto-configure Vercel project
  const vercelConfig = await autoConfigureVercel(project)
  
  // 3. Set up environment variables
  await setupEnvironmentVariables(projectId, vercelConfig)
  
  // 4. Configure build settings
  await configureBuildSettings(projectId, vercelConfig)
  
  // 5. Deploy
  const deployment = await vercelClient.deploy({
    projectId: vercelConfig.id,
    gitSource: {
      type: 'github',
      repo: project.githubRepo,
      ref: 'main',
    },
  })
  
  // 6. Configure domain (if needed)
  if (project.domain) {
    await configureCustomDomain(vercelConfig.id, project.domain)
  }
  
  return {
    deployed: true,
    url: deployment.url,
    domains: [deployment.url, project.domain].filter(Boolean),
  }
}

async function autoConfigureVercel(project: Project) {
  // 1. Create or get Vercel project
  const vercelProject = await vercelClient.ensureProject({
    name: project.slug,
    framework: detectFramework(project),
  })
  
  // 2. Link GitHub repo
  await vercelClient.linkGitHub({
    projectId: vercelProject.id,
    repo: project.githubRepo,
  })
  
  // 3. Configure build settings
  const buildSettings = generateBuildSettings(project)
  await vercelClient.updateBuildSettings({
    projectId: vercelProject.id,
    ...buildSettings,
  })
  
  return vercelProject
}

function generateBuildSettings(project: Project) {
  const framework = detectFramework(project)
  
  const settings: BuildSettings = {
    framework,
    buildCommand: null,        // Use framework default
    outputDirectory: null,     // Use framework default
    installCommand: 'pnpm install',
    devCommand: 'pnpm dev',
  }
  
  // Override for specific frameworks
  if (framework === 'nextjs') {
    settings.buildCommand = 'pnpm build'
    settings.outputDirectory = '.next'
  }
  
  return settings
}
```

### 8. Auto Env Config

Automatic environment variable configuration and management.

#### Key Capabilities

**Environment Detection:**
- Detect required variables
- Find missing configurations
- Suggest optimal values
- Validate variable formats

**Auto Configuration:**
- Generate .env files
- Set up Vercel env vars
- Configure secrets
- Sync across environments

#### How It Works

```typescript
async function autoEnvConfig(projectId: string) {
  const project = await projectService.get(projectId)
  const files = await fileService.getAllFiles(projectId)
  
  // 1. Detect required environment variables
  const required = await detectRequiredEnvVars(files)
  
  // 2. Check existing configuration
  const existing = await getExistingEnvVars(projectId)
  
  // 3. Find missing variables
  const missing = required.filter(v => !existing.has(v.name))
  
  // 4. Generate values for missing variables
  const generated: EnvVar[] = []
  for (const envVar of missing) {
    const value = await generateEnvValue(envVar)
    generated.push({ ...envVar, value })
  }
  
  // 5. Create .env files
  await createEnvFiles(projectId, [...existing, ...generated])
  
  // 6. Sync to Vercel if deployed
  if (project.vercelProjectId) {
    await syncEnvToVercel(project.vercelProjectId, generated)
  }
  
  return {
    total: required.length,
    existing: existing.size,
    generated: generated.length,
  }
}

async function detectRequiredEnvVars(files: ProjectFile[]): Promise<EnvVarDef[]> {
  const envVars: Set<EnvVarDef> = new Set()
  
  for (const file of files) {
    // Look for process.env usage
    const matches = file.content.matchAll(/process\.env\.(\w+)/g)
    
    for (const match of matches) {
      const varName = match[1]
      envVars.add({
        name: varName,
        description: inferDescription(varName),
        required: true,
        type: inferType(varName),
      })
    }
  }
  
  return Array.from(envVars)
}

async function generateEnvValue(envVar: EnvVarDef): Promise<string> {
  // Generate appropriate values based on variable name
  if (envVar.name.includes('SECRET') || envVar.name.includes('KEY')) {
    return generateSecureToken()
  }
  
  if (envVar.name.includes('URL')) {
    return 'http://localhost:3000'
  }
  
  if (envVar.name.includes('DATABASE')) {
    return 'postgresql://localhost:5432/aibuild'
  }
  
  if (envVar.name === 'NODE_ENV') {
    return 'development'
  }
  
  return ''  // Requires manual configuration
}

function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex')
}
```

## Configuration

### Auto Maintenance Config

```typescript
interface AutoMaintenanceConfig {
  enabled: boolean
  
  autoConfig: {
    enabled: boolean
    onProjectCreate: boolean
    onFrameworkChange: boolean
  }
  
  autoReset: {
    enabled: boolean
    files: string[]              // Files to auto-reset
    onError: boolean             // Reset on parse errors
    backup: boolean              // Keep backups
  }
  
  autoRefresh: {
    enabled: boolean
    schedule: string             // Cron schedule
    strategy: 'aggressive' | 'conservative' | 'smart'
    updatePatches: boolean       // Auto-update patch versions
  }
  
  autoRepair: {
    enabled: boolean
    onBuildFailure: boolean
    maxAttempts: number
  }
  
  autoResolve: {
    enabled: boolean
    strategy: ResolutionStrategy
    requireConfirmation: boolean
  }
  
  freeAutoSync: {
    enabled: boolean
    limit: number                // Monthly limit
  }
  
  autoDeployVercel: {
    enabled: boolean
    onSync: boolean              // Deploy after GitHub sync
    environment: 'production' | 'preview'
  }
  
  autoEnvConfig: {
    enabled: boolean
    generateMissing: boolean
    syncToVercel: boolean
  }
}
```

## Best Practices

### 1. Enable Auto Config for New Projects

```typescript
await projectService.updateSettings(projectId, {
  autoMaintenance: {
    autoConfig: {
      enabled: true,
      onProjectCreate: true,
    },
  },
})
```

### 2. Regular Dependency Refresh

```typescript
// Schedule weekly dependency refresh
await scheduleTask({
  projectId,
  task: 'autoRefresh',
  schedule: '0 0 * * 0',  // Every Sunday
  config: {
    strategy: 'smart',
    updatePatches: true,
  },
})
```

### 3. Safe Conflict Resolution

```typescript
// Use smart merge with confirmation for important conflicts
await projectService.updateSettings(projectId, {
  autoMaintenance: {
    autoResolve: {
      enabled: true,
      strategy: 'smart-merge',
      requireConfirmation: true,
    },
  },
})
```

### 4. Optimize Free Tier Usage

```typescript
// Batch operations to minimize API calls
await batchOperations([
  () => freeAutoSync(projectId),
  () => autoDeployVercel(projectId),
])
```

## Troubleshooting

### Common Issues

**Auto Config Fails:**
- Check file permissions
- Verify framework detection
- Review generated configs
- Check for syntax errors

**Dependencies Not Updating:**
- Clear package manager cache
- Check network connectivity
- Verify registry access
- Review lock file

**Conflicts Not Resolving:**
- Check conflict complexity
- Review strategy selection
- Use manual resolution for complex cases
- Verify AI service availability

## API Reference

```typescript
// Auto config
POST /api/projects/:id/auto/config

// Auto reset JSON
POST /api/projects/:id/auto/reset
Body: { files: string[] }

// Auto refresh dependencies
POST /api/projects/:id/auto/refresh
Body: { strategy: 'aggressive' | 'conservative' | 'smart' }

// Auto repair
POST /api/projects/:id/auto/repair

// Auto resolve conflicts
POST /api/projects/:id/auto/resolve
Body: { strategy: ResolutionStrategy }

// Free auto sync
POST /api/projects/:id/auto/sync/free

// Auto deploy to Vercel
POST /api/projects/:id/auto/deploy/vercel

// Auto env config
POST /api/projects/:id/auto/env/config
```

## Learn More

- [Auto Sync Documentation](./auto-sync.md)
- [Auto Fix Documentation](./auto-fix.md)
- [Deployment Guide](../guides/deployment.md)
- [Configuration Best Practices](../guides/developer-guide.md#configuration)

---

**Auto Configuration & Maintenance keeps your projects healthy and up-to-date automatically.**
