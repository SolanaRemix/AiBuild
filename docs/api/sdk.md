# AiBuild SDK Documentation

Official TypeScript/JavaScript SDK for the AiBuild platform - build web, mobile, and desktop applications with AI.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Authentication](#authentication)
- [Client Initialization](#client-initialization)
- [Projects API](#projects-api)
- [Files API](#files-api)
- [Deployments API](#deployments-api)
- [Testing API](#testing-api)
- [Analysis API](#analysis-api)
- [Agents API](#agents-api)
- [Models API](#models-api)
- [Billing API](#billing-api)
- [Webhooks API](#webhooks-api)
- [WebSocket Client](#websocket-client)
- [Error Handling](#error-handling)
- [TypeScript Types](#typescript-types)
- [Advanced Usage](#advanced-usage)
- [Best Practices](#best-practices)

---

## Installation

### npm

```bash
npm install @aibuild/sdk
```

### yarn

```bash
yarn add @aibuild/sdk
```

### pnpm

```bash
pnpm add @aibuild/sdk
```

---

## Quick Start

```typescript
import { AiBuildClient } from '@aibuild/sdk';

// Initialize client
const client = new AiBuildClient({
  apiKey: 'sk_example_abc123xyz789',
});

// Generate a project
const project = await client.projects.generate({
  prompt: 'Create a modern task management app',
  templateType: 'app',
  primaryTarget: 'web',
});

console.log(`Project created: ${project.projectId}`);
```

---

## Authentication

The SDK requires an API key for authentication. Get your API key from the [AiBuild Dashboard](https://app.aibuild.dev/settings/api-keys).

### API Key Types

- **User Keys** (`sk_user_*`) - Full access to user resources
- **Project Keys** (`sk_proj_*`) - Scoped to specific project
- **Read-Only Keys** (`sk_read_*`) - Read-only access

### Environment Variables

```bash
# .env.local
AIBUILD_API_KEY=sk_example_abc123xyz789
```

```typescript
import { AiBuildClient } from '@aibuild/sdk';

const client = new AiBuildClient({
  apiKey: process.env.AIBUILD_API_KEY,
});
```

---

## Client Initialization

### Basic Configuration

```typescript
import { AiBuildClient } from '@aibuild/sdk';

const client = new AiBuildClient({
  apiKey: 'sk_example_abc123xyz789',
});
```

### Advanced Configuration

```typescript
const client = new AiBuildClient({
  apiKey: 'sk_example_abc123xyz789',
  baseURL: 'https://api.aibuild.dev/v1',
  timeout: 30000, // 30 seconds
  maxRetries: 3,
  retryDelay: 1000,
  onRateLimitError: (retryAfter) => {
    console.log(`Rate limited. Retry after ${retryAfter}s`);
  },
  onError: (error) => {
    console.error('SDK Error:', error);
  },
});
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | **Required** | API key for authentication |
| `baseURL` | string | `https://api.aibuild.dev/v1` | API base URL |
| `timeout` | number | `60000` | Request timeout in ms |
| `maxRetries` | number | `3` | Max retry attempts |
| `retryDelay` | number | `1000` | Delay between retries in ms |
| `onRateLimitError` | function | - | Rate limit callback |
| `onError` | function | - | Error callback |

---

## Projects API

### Generate Project

Create a new project from a natural language prompt.

```typescript
const result = await client.projects.generate({
  prompt: 'Build a task management app with drag-and-drop and real-time collaboration',
  templateType: 'app',
  primaryTarget: 'web',
  name: 'TaskMaster', // optional
  modelId: 'gpt-4', // optional
});

console.log(`Project ID: ${result.projectId}`);
console.log(`Files generated: ${result.filesGenerated}`);
console.log(`Estimated time: ${result.estimatedTime}s`);
```

**Parameters:**

```typescript
interface GenerateProjectParams {
  prompt: string;                    // Min 10 characters
  templateType?: TemplateType;       // 'landing' | 'dashboard' | 'saas' | 'app' | 'custom'
  primaryTarget?: TargetType;        // 'web' | 'mobile' | 'desktop'
  name?: string;                     // Custom project name
  modelId?: string;                  // Specific model to use
}
```

**Returns:**

```typescript
interface GenerateProjectResult {
  projectId: string;
  slug: string;
  status: ProjectStatus;
  filesGenerated: number;
  estimatedTime: number;
  message: string;
}
```

---

### List Projects

Retrieve all projects with filtering and pagination.

```typescript
const { projects, pagination } = await client.projects.list({
  status: 'ready',
  template: 'dashboard',
  page: 1,
  limit: 20,
  sort: 'updated',
  order: 'desc',
});

projects.forEach(project => {
  console.log(`${project.name} - ${project.status}`);
});

console.log(`Total: ${pagination.total} projects`);
```

**Parameters:**

```typescript
interface ListProjectsParams {
  page?: number;
  limit?: number;              // Max 100
  status?: ProjectStatus;
  template?: TemplateType;
  target?: TargetType;
  sort?: 'created' | 'updated' | 'name';
  order?: 'asc' | 'desc';
}
```

---

### Get Project

Retrieve a specific project by ID.

```typescript
const project = await client.projects.get('proj_abc123');

console.log(`Name: ${project.name}`);
console.log(`Status: ${project.status}`);
console.log(`Created: ${project.createdAt}`);
```

---

### Update Project

Update project metadata.

```typescript
const updated = await client.projects.update('proj_abc123', {
  name: 'Updated Project Name',
  status: 'ready',
});

console.log(`Updated: ${updated.updatedAt}`);
```

---

### Delete Project

Delete a project and all associated files.

```typescript
const result = await client.projects.delete('proj_abc123');

console.log(`Deleted: ${result.deleted}`);
```

---

### Refine Project

Refine an existing project with additional instructions.

```typescript
const result = await client.projects.refine('proj_abc123', {
  prompt: 'Add authentication with email/password and Google OAuth',
  preserveFiles: ['src/config/*', 'package.json'],
});

console.log(`Files modified: ${result.filesModified}`);
console.log(`Files added: ${result.filesAdded}`);
```

**Parameters:**

```typescript
interface RefineProjectParams {
  prompt: string;
  preserveFiles?: string[];    // Glob patterns of files to preserve
}
```

---

## Files API

### List Files

List all files in a project.

```typescript
const { files, pagination } = await client.files.list('proj_abc123', {
  path: 'src/components',
  language: 'typescript',
  generatedBy: 'ai',
  page: 1,
  limit: 50,
});

files.forEach(file => {
  console.log(`${file.path} (${file.language})`);
});
```

**Parameters:**

```typescript
interface ListFilesParams {
  path?: string;              // Filter by path prefix
  language?: string;          // Filter by language
  generatedBy?: 'ai' | 'user';
  page?: number;
  limit?: number;
}
```

---

### Get File

Get a specific file by ID or path.

```typescript
// By file ID
const file = await client.files.get('proj_abc123', 'file_xyz123');

// By path
const file = await client.files.getByPath('proj_abc123', 'src/App.tsx');

console.log(`Content:\n${file.content}`);
```

---

### Create File

Create a new file in a project.

```typescript
const file = await client.files.create('proj_abc123', {
  path: 'src/utils/helpers.ts',
  content: `
    export const formatDate = (date: Date): string => {
      return date.toLocaleDateString();
    };
  `,
  language: 'typescript',
});

console.log(`File created: ${file.id}`);
```

**Parameters:**

```typescript
interface CreateFileParams {
  path: string;
  content: string;
  language?: string;
}
```

---

### Update File

Update an existing file.

```typescript
const updated = await client.files.update('proj_abc123', 'file_xyz123', {
  content: '// Updated content...',
  message: 'Fixed bug in date formatting',
});

console.log(`Version: ${updated.version}`);
```

---

### Delete File

Delete a file from a project.

```typescript
await client.files.delete('proj_abc123', 'file_xyz123');
```

---

### Regenerate File

Regenerate a file using AI.

```typescript
const result = await client.files.regenerate('proj_abc123', 'file_xyz123', {
  prompt: 'Add error handling and loading states',
  preserveComments: true,
});

console.log(`Status: ${result.status}`);
console.log(`Estimated time: ${result.estimatedTime}s`);
```

---

## Deployments API

### Deploy to Vercel

Deploy a web project to Vercel.

```typescript
const deployment = await client.deployments.create('proj_abc123', {
  target: 'web',
  provider: 'vercel',
  config: {
    envVars: {
      API_URL: 'https://api.example.com',
      NODE_ENV: 'production',
    },
    buildCommand: 'npm run build',
    outputDirectory: 'dist',
  },
});

console.log(`Deployment ID: ${deployment.id}`);
console.log(`Status: ${deployment.status}`);
```

**Parameters:**

```typescript
interface CreateDeploymentParams {
  target: TargetType;
  provider?: 'vercel' | 'github-actions' | 'local-runner';
  config?: {
    envVars?: Record<string, string>;
    buildCommand?: string;
    outputDirectory?: string;
    [key: string]: any;
  };
}
```

---

### Build APK

Build an Android APK.

```typescript
const build = await client.deployments.buildApk('proj_abc123', {
  variant: 'release',
  config: {
    appName: 'TaskMaster',
    packageName: 'com.example.taskmaster',
    versionCode: 1,
    versionName: '1.0.0',
  },
});

console.log(`Build ID: ${build.buildId}`);
console.log(`Estimated time: ${build.estimatedTime}s`);

// Wait for build to complete
const completed = await client.deployments.waitForBuild(build.buildId);
console.log(`APK URL: ${completed.artifactUrl}`);
```

---

### Build Desktop App

Build a desktop application.

```typescript
const build = await client.deployments.buildDesktop('proj_abc123', {
  platform: 'windows',
  architecture: 'x64',
  bundler: 'electron',
});

console.log(`Build ID: ${build.buildId}`);
```

---

### Get Deployment

Get deployment details.

```typescript
const deployment = await client.deployments.get('deploy_abc123');

console.log(`Status: ${deployment.status}`);
console.log(`URL: ${deployment.artifactUrl}`);
console.log(`Build time: ${deployment.buildTime}s`);
```

---

### List Deployments

List all deployments for a project.

```typescript
const { deployments } = await client.deployments.list('proj_abc123');

deployments.forEach(deployment => {
  console.log(`${deployment.target}: ${deployment.status}`);
});
```

---

### Get Build Status

Get build status with polling support.

```typescript
const build = await client.deployments.getBuild('build_abc123');

console.log(`Status: ${build.status}`);
console.log(`Progress: ${build.progress}%`);
```

---

### Wait for Build

Wait for a build to complete.

```typescript
const completed = await client.deployments.waitForBuild('build_abc123', {
  pollInterval: 5000,  // Check every 5 seconds
  timeout: 600000,     // 10 minutes timeout
  onProgress: (build) => {
    console.log(`Progress: ${build.progress}%`);
  },
});

console.log(`Artifact URL: ${completed.artifactUrl}`);
```

---

## Testing API

### Run Tests

Execute project tests.

```typescript
const testRun = await client.testing.runTests('proj_abc123', {
  type: 'unit',
  files: ['src/**/*.test.ts'],
  coverage: true,
  watch: false,
});

console.log(`Test run ID: ${testRun.testRunId}`);
```

**Parameters:**

```typescript
interface RunTestsParams {
  type: 'unit' | 'integration' | 'e2e';
  files?: string[];
  coverage?: boolean;
  watch?: boolean;
}
```

---

### Get Test Results

Get test execution results.

```typescript
const results = await client.testing.getResults('test_run_abc123');

console.log(`Passed: ${results.results.passed}`);
console.log(`Failed: ${results.results.failed}`);
console.log(`Coverage: ${results.coverage.lines}%`);

// Print failures
results.failures.forEach(failure => {
  console.error(`${failure.test}: ${failure.message}`);
});
```

---

### Wait for Tests

Wait for tests to complete.

```typescript
const results = await client.testing.waitForTests('test_run_abc123', {
  pollInterval: 3000,
  timeout: 300000,
  onProgress: (status) => {
    console.log(`Status: ${status}`);
  },
});

console.log(`Tests completed: ${results.results.total}`);
```

---

### Get Coverage

Get detailed coverage report.

```typescript
const coverage = await client.testing.getCoverage('test_run_abc123');

console.log(`Overall coverage: ${coverage.overall.lines}%`);

coverage.files.forEach(file => {
  console.log(`${file.path}: ${file.lines}%`);
});
```

---

## Analysis API

### Run Analysis

Analyze code for issues.

```typescript
const analysis = await client.analysis.run('proj_abc123', {
  types: ['logic-flow', 'security', 'performance', 'best-practices'],
  severity: 'warning',
  autoFix: false,
});

console.log(`Analysis ID: ${analysis.analysisId}`);
```

**Parameters:**

```typescript
interface RunAnalysisParams {
  types: Array<'logic-flow' | 'security' | 'performance' | 'best-practices'>;
  severity?: 'error' | 'warning' | 'info';
  autoFix?: boolean;
}
```

---

### Get Analysis Results

Get analysis results.

```typescript
const results = await client.analysis.getResults('analysis_abc123');

console.log(`Total issues: ${results.summary.total}`);
console.log(`Errors: ${results.summary.errors}`);
console.log(`Warnings: ${results.summary.warnings}`);

results.issues.forEach(issue => {
  console.log(`[${issue.severity}] ${issue.path}:${issue.line}`);
  console.log(`  ${issue.message}`);
  if (issue.suggestion) {
    console.log(`  Suggestion: ${issue.suggestion}`);
  }
});
```

---

### Wait for Analysis

Wait for analysis to complete.

```typescript
const results = await client.analysis.waitForAnalysis('analysis_abc123', {
  pollInterval: 5000,
  timeout: 300000,
});

console.log(`Analysis complete: ${results.summary.total} issues found`);
```

---

### Fix Issues

Automatically fix issues.

```typescript
const fix = await client.analysis.fixIssues('analysis_abc123', {
  issueIds: ['issue_1', 'issue_2'],
  createBackup: true,
});

console.log(`Fix ID: ${fix.fixId}`);
```

---

### Wait for Fixes

Wait for fixes to complete.

```typescript
const completed = await client.analysis.waitForFixes('fix_abc123');

console.log(`Fixed ${completed.issuesFixed} issues`);
```

---

## Agents API

### List Agents

List custom AI agents.

```typescript
const { agents } = await client.agents.list();

agents.forEach(agent => {
  console.log(`${agent.name} (${agent.baseModel})`);
  console.log(`  Usage: ${agent.usage} requests`);
});
```

---

### Get Agent

Get a specific agent.

```typescript
const agent = await client.agents.get('agent_abc123');

console.log(`Name: ${agent.name}`);
console.log(`Role: ${agent.role}`);
console.log(`Capabilities: ${agent.capabilities.join(', ')}`);
```

---

### Create Agent

Create a custom agent.

```typescript
const agent = await client.agents.create({
  name: 'Vue.js Specialist',
  baseModel: 'gpt-4',
  role: 'Frontend Developer',
  capabilities: ['codegen', 'refactor', 'analysis'],
  allowedModels: ['gpt-4', 'claude-3'],
  maxTokens: 8000,
  systemPrompt: `You are an expert Vue.js developer specializing in:
    - Composition API
    - TypeScript integration
    - State management with Pinia
    - Performance optimization`,
});

console.log(`Agent created: ${agent.id}`);
```

**Parameters:**

```typescript
interface CreateAgentParams {
  name: string;
  baseModel: string;
  role: string;
  capabilities: Array<'codegen' | 'refactor' | 'analysis'>;
  allowedModels: string[];
  maxTokens: number;
  systemPrompt: string;
}
```

---

### Update Agent

Update an agent.

```typescript
const updated = await client.agents.update('agent_abc123', {
  systemPrompt: 'Updated system prompt...',
  maxTokens: 16000,
});

console.log(`Updated: ${updated.updatedAt}`);
```

---

### Delete Agent

Delete an agent.

```typescript
await client.agents.delete('agent_abc123');
```

---

### Execute Agent Task

Use an agent for a task.

```typescript
const execution = await client.agents.execute('agent_abc123', {
  task: 'codegen',
  projectId: 'proj_abc123',
  prompt: 'Create a user profile component with avatar upload and bio editing',
});

console.log(`Execution ID: ${execution.executionId}`);

// Wait for completion
const result = await client.agents.waitForExecution(execution.executionId);
console.log(`Completed: ${result.status}`);
```

---

## Models API

### List Models

List available AI models.

```typescript
const { models } = await client.models.list();

models.forEach(model => {
  console.log(`${model.name} (${model.modelId})`);
  console.log(`  Capabilities: ${model.capabilities.join(', ')}`);
  console.log(`  Context: ${model.contextWindow} tokens`);
  console.log(`  Cost: ${model.costTier}`);
});
```

---

### Get Model

Get specific model details.

```typescript
const model = await client.models.get('model_gpt4');

console.log(`Name: ${model.name}`);
console.log(`Context window: ${model.contextWindow}`);
console.log(`Max output: ${model.maxOutputTokens}`);
```

---

## Billing API

### Get Billing Overview

Get billing information and usage.

```typescript
const billing = await client.billing.getOverview();

console.log(`Plan: ${billing.plan}`);
console.log(`Requests: ${billing.usage.requests}/${billing.usage.requestsLimit}`);
console.log(`Builds: ${billing.usage.builds}/${billing.usage.buildsLimit}`);
console.log(`Projects: ${billing.usage.projects}/${billing.usage.projectsLimit}`);
console.log(`Next billing: ${billing.nextBillingDate}`);
console.log(`Amount due: $${billing.amountDue}`);
```

---

### List Invoices

List billing invoices.

```typescript
const { invoices } = await client.billing.listInvoices();

invoices.forEach(invoice => {
  console.log(`${invoice.date}: $${invoice.amount} - ${invoice.status}`);
});
```

---

### Update Subscription

Update billing subscription.

```typescript
await client.billing.updateSubscription({
  plan: 'enterprise',
  billingInterval: 'annual',
});
```

---

## Webhooks API

### List Webhooks

List configured webhooks.

```typescript
const { webhooks } = await client.webhooks.list();

webhooks.forEach(webhook => {
  console.log(`${webhook.url} - ${webhook.enabled ? 'Enabled' : 'Disabled'}`);
  console.log(`  Events: ${webhook.events.join(', ')}`);
});
```

---

### Create Webhook

Create a new webhook.

```typescript
const webhook = await client.webhooks.create({
  url: 'https://example.com/webhooks/aibuild',
  events: ['project.created', 'deployment.completed', 'build.failed'],
  secret: 'webhook_secret_key',
});

console.log(`Webhook created: ${webhook.id}`);
```

---

### Update Webhook

Update webhook configuration.

```typescript
await client.webhooks.update('webhook_abc123', {
  events: ['project.created', 'deployment.completed', 'test.completed'],
  enabled: false,
});
```

---

### Delete Webhook

Delete a webhook.

```typescript
await client.webhooks.delete('webhook_abc123');
```

---

### Verify Webhook Signature

Verify webhook payload signature.

```typescript
import { verifyWebhookSignature } from '@aibuild/sdk';

const isValid = verifyWebhookSignature(
  payload,        // Request body as string
  signature,      // X-AiBuild-Signature header
  secret          // Your webhook secret
);

if (!isValid) {
  throw new Error('Invalid webhook signature');
}
```

---

## WebSocket Client

Real-time updates via WebSocket.

### Connect

```typescript
const ws = client.createWebSocket();

ws.on('connected', () => {
  console.log('WebSocket connected');
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

ws.connect();
```

---

### Subscribe to Channels

```typescript
ws.subscribe(['project:proj_abc123', 'user:notifications']);

ws.on('event', (event) => {
  console.log(`Event: ${event.event}`);
  console.log(`Channel: ${event.channel}`);
  console.log('Data:', event.data);
});
```

---

### Event Handlers

```typescript
// Project events
ws.on('project:updated', (data) => {
  console.log(`Project ${data.projectId} updated`);
});

// Build progress
ws.on('build:progress', (data) => {
  console.log(`Build progress: ${data.progress}%`);
});

// Test results
ws.on('test:completed', (data) => {
  console.log(`Tests: ${data.passed}/${data.total} passed`);
});
```

---

### Unsubscribe

```typescript
ws.unsubscribe(['project:proj_abc123']);
```

---

### Disconnect

```typescript
ws.disconnect();
```

---

## Error Handling

### Error Types

The SDK throws typed errors for different scenarios:

```typescript
import { 
  AiBuildError,
  AuthenticationError,
  ValidationError,
  NotFoundError,
  RateLimitError,
  QuotaExceededError,
  ServerError 
} from '@aibuild/sdk';
```

---

### Basic Error Handling

```typescript
try {
  const project = await client.projects.generate({
    prompt: 'Build an app',
    templateType: 'app',
  });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Validation failed:', error.details);
  } else if (error instanceof RateLimitError) {
    console.error(`Rate limited. Retry after ${error.retryAfter}s`);
  } else if (error instanceof QuotaExceededError) {
    console.error('Quota exceeded. Upgrade plan.');
  } else if (error instanceof AuthenticationError) {
    console.error('Invalid API key');
  } else if (error instanceof NotFoundError) {
    console.error('Resource not found');
  } else if (error instanceof ServerError) {
    console.error('Server error:', error.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

---

### Error Properties

```typescript
interface AiBuildError extends Error {
  code: string;              // Error code
  type: string;              // Error type
  statusCode: number;        // HTTP status code
  details?: any;             // Additional details
  retryAfter?: number;       // Retry delay (for rate limit)
}
```

---

### Retry Logic

```typescript
import { retry } from '@aibuild/sdk';

const project = await retry(
  () => client.projects.generate({
    prompt: 'Build a dashboard',
    templateType: 'dashboard',
  }),
  {
    maxAttempts: 3,
    delay: 1000,
    backoff: 2,  // Exponential backoff multiplier
    onRetry: (attempt, error) => {
      console.log(`Retry attempt ${attempt}: ${error.message}`);
    },
  }
);
```

---

## TypeScript Types

### Core Types

```typescript
import type {
  // Project types
  Project,
  ProjectStatus,
  TemplateType,
  TargetType,
  
  // File types
  ProjectFile,
  GeneratedFile,
  
  // Deployment types
  Deployment,
  
  // Agent types
  UserAgent,
  
  // Analysis types
  LogicFlowIssue,
  
  // Billing types
  BillingOverview,
  Invoice,
  PlanTier,
  
  // Webhook types
  WebhookConfig,
} from '@aibuild/sdk';
```

---

### Project Types

```typescript
type TargetType = 'web' | 'mobile' | 'desktop';

type ProjectStatus = 'draft' | 'ready' | 'synced' | 'deployed' | 'building';

type TemplateType = 'landing' | 'dashboard' | 'saas' | 'app' | 'custom';

interface Project {
  id: string;
  userId: string;
  name: string;
  slug: string;
  prompt: string;
  templateType: TemplateType;
  primaryTarget: TargetType;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}
```

---

### File Types

```typescript
interface ProjectFile {
  id: string;
  projectId: string;
  path: string;
  content: string;
  language: string | null;
  generatedBy: 'ai' | 'user';
  version: number;
  createdAt: string;
  updatedAt: string;
}
```

---

### Deployment Types

```typescript
interface Deployment {
  id: string;
  projectId: string;
  target: TargetType;
  provider: 'vercel' | 'github-actions' | 'local-runner';
  providerProjectId: string | null;
  artifactUrl: string | null;
  status: 'pending' | 'building' | 'ready' | 'failed';
  logsUrl: string | null;
  createdAt: string;
  updatedAt: string;
}
```

---

### Agent Types

```typescript
interface UserAgent {
  id: string;
  userId: string;
  name: string;
  baseModel: string;
  role: string;
  capabilities: Array<'codegen' | 'refactor' | 'analysis'>;
  allowedModels: string[];
  maxTokens: number;
  systemPrompt: string;
  usage: number;
  createdAt: string;
  updatedAt: string;
}
```

---

### Analysis Types

```typescript
interface LogicFlowIssue {
  kind: 'missing-check' | 'unsafe-call' | 'dead-code' | 'unhandled-error';
  path: string;
  line?: number;
  message: string;
  suggestion?: string;
  severity?: 'error' | 'warning' | 'info';
  autoFixable?: boolean;
}
```

---

### Billing Types

```typescript
type PlanTier = 'free' | 'pro' | 'enterprise';

interface BillingOverview {
  plan: PlanTier;
  usage: {
    requests: number;
    requestsLimit: number;
    builds: number;
    buildsLimit: number;
    projects: number;
    projectsLimit: number;
  };
  nextBillingDate: string;
  amountDue: number;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  pdfUrl?: string;
}
```

---

## Advanced Usage

### Streaming Responses

Stream generation progress in real-time.

```typescript
const stream = await client.projects.generateStream({
  prompt: 'Build a dashboard',
  templateType: 'dashboard',
});

for await (const chunk of stream) {
  console.log(`Progress: ${chunk.progress}%`);
  console.log(`Status: ${chunk.status}`);
  
  if (chunk.fileGenerated) {
    console.log(`Generated: ${chunk.fileGenerated.path}`);
  }
}
```

---

### Batch Operations

Process multiple operations efficiently.

```typescript
// Batch create files
const files = await client.files.batchCreate('proj_abc123', [
  { path: 'src/utils/helpers.ts', content: '...' },
  { path: 'src/utils/validators.ts', content: '...' },
  { path: 'src/utils/formatters.ts', content: '...' },
]);

console.log(`Created ${files.length} files`);
```

---

### Custom Timeouts

Override default timeout for specific operations.

```typescript
// Long-running operation with custom timeout
const project = await client.projects.generate(
  {
    prompt: 'Build a complex enterprise app',
    templateType: 'app',
  },
  { timeout: 300000 } // 5 minutes
);
```

---

### Concurrent Operations

Execute multiple operations in parallel.

```typescript
const [project1, project2, project3] = await Promise.all([
  client.projects.generate({ prompt: 'App 1', templateType: 'app' }),
  client.projects.generate({ prompt: 'App 2', templateType: 'app' }),
  client.projects.generate({ prompt: 'App 3', templateType: 'app' }),
]);

console.log('All projects created');
```

---

### Custom Headers

Add custom headers to requests.

```typescript
const client = new AiBuildClient({
  apiKey: 'sk_example_abc123xyz789',
  headers: {
    'X-Custom-Header': 'value',
    'X-Request-ID': 'unique-id',
  },
});
```

---

### Request Interceptors

Intercept and modify requests.

```typescript
const client = new AiBuildClient({
  apiKey: 'sk_example_abc123xyz789',
  onRequest: (config) => {
    console.log(`Request: ${config.method} ${config.url}`);
    return config;
  },
  onResponse: (response) => {
    console.log(`Response: ${response.status}`);
    return response;
  },
});
```

---

## Best Practices

### 1. Use Environment Variables

Never hardcode API keys.

```typescript
// ✅ Good
const client = new AiBuildClient({
  apiKey: process.env.AIBUILD_API_KEY,
});

// ❌ Bad
const client = new AiBuildClient({
  apiKey: 'sk_example_abc123xyz789',
});
```

---

### 2. Handle Errors Gracefully

Always wrap SDK calls in try-catch.

```typescript
try {
  const project = await client.projects.generate({
    prompt: 'Build an app',
    templateType: 'app',
  });
} catch (error) {
  if (error instanceof RateLimitError) {
    await new Promise(resolve => setTimeout(resolve, error.retryAfter * 1000));
    // Retry request
  } else {
    console.error('Failed to generate project:', error);
  }
}
```

---

### 3. Use TypeScript

Leverage TypeScript for type safety.

```typescript
import type { Project, ProjectStatus } from '@aibuild/sdk';

const project: Project = await client.projects.get('proj_abc123');
const status: ProjectStatus = project.status;
```

---

### 4. Implement Retry Logic

Retry failed requests with exponential backoff.

```typescript
import { retry } from '@aibuild/sdk';

const project = await retry(
  () => client.projects.generate({ prompt: 'App', templateType: 'app' }),
  { maxAttempts: 3, delay: 1000, backoff: 2 }
);
```

---

### 5. Cache Responses

Cache frequently accessed data to reduce API calls.

```typescript
const cache = new Map<string, Project>();

async function getProject(id: string): Promise<Project> {
  if (cache.has(id)) {
    return cache.get(id)!;
  }
  
  const project = await client.projects.get(id);
  cache.set(id, project);
  return project;
}
```

---

### 6. Use Webhooks

Use webhooks instead of polling for long-running operations.

```typescript
// ✅ Good: Use webhooks
await client.webhooks.create({
  url: 'https://example.com/webhook',
  events: ['build.completed'],
});

const build = await client.deployments.buildApk('proj_abc123', {...});

// ❌ Bad: Poll for status
let status = 'building';
while (status === 'building') {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const build = await client.deployments.getBuild('build_abc123');
  status = build.status;
}
```

---

### 7. Monitor Rate Limits

Track rate limit headers to avoid hitting limits.

```typescript
const client = new AiBuildClient({
  apiKey: 'sk_example_abc123xyz789',
  onResponse: (response) => {
    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');
    
    if (remaining && parseInt(remaining) < 10) {
      console.warn(`Rate limit low: ${remaining} requests remaining`);
    }
    
    return response;
  },
});
```

---

### 8. Clean Up Resources

Clean up resources when done.

```typescript
// Close WebSocket connections
const ws = client.createWebSocket();
// ... use websocket
ws.disconnect();

// Cancel long-running operations if needed
const controller = new AbortController();
client.projects.generate(
  { prompt: 'App', templateType: 'app' },
  { signal: controller.signal }
);

// Later: controller.abort();
```

---

### 9. Test Error Scenarios

Test error handling in your application.

```typescript
import { MockAiBuildClient } from '@aibuild/sdk/testing';

const mockClient = new MockAiBuildClient();

// Mock successful response
mockClient.projects.generate.mockResolvedValue({
  projectId: 'proj_test123',
  slug: 'test-app',
  status: 'building',
});

// Mock error response
mockClient.projects.generate.mockRejectedValue(
  new RateLimitError('Rate limit exceeded', 60)
);
```

---

### 10. Log Operations

Log SDK operations for debugging.

```typescript
const client = new AiBuildClient({
  apiKey: process.env.AIBUILD_API_KEY,
  onRequest: (config) => {
    console.log(`[SDK] ${config.method} ${config.url}`, config.data);
    return config;
  },
  onResponse: (response) => {
    console.log(`[SDK] Response ${response.status}`, response.data);
    return response;
  },
  onError: (error) => {
    console.error('[SDK] Error:', error);
  },
});
```

---

## Examples

### Complete Application

```typescript
import { AiBuildClient } from '@aibuild/sdk';

const client = new AiBuildClient({
  apiKey: process.env.AIBUILD_API_KEY,
});

async function main() {
  try {
    // 1. Generate project
    console.log('Generating project...');
    const result = await client.projects.generate({
      prompt: 'Build a task management app with kanban board',
      templateType: 'app',
      primaryTarget: 'web',
    });
    
    console.log(`Project created: ${result.projectId}`);
    
    // 2. Wait for generation to complete
    let project = await client.projects.get(result.projectId);
    while (project.status === 'building') {
      await new Promise(resolve => setTimeout(resolve, 5000));
      project = await client.projects.get(result.projectId);
      console.log(`Status: ${project.status}`);
    }
    
    // 3. List generated files
    const { files } = await client.files.list(result.projectId);
    console.log(`Generated ${files.length} files`);
    
    // 4. Deploy to Vercel
    console.log('Deploying to Vercel...');
    const deployment = await client.deployments.create(result.projectId, {
      target: 'web',
      provider: 'vercel',
    });
    
    console.log(`Deployment ID: ${deployment.id}`);
    
    // 5. Run tests
    console.log('Running tests...');
    const testRun = await client.testing.runTests(result.projectId, {
      type: 'unit',
      coverage: true,
    });
    
    const testResults = await client.testing.waitForTests(testRun.testRunId);
    console.log(`Tests: ${testResults.results.passed}/${testResults.results.total} passed`);
    console.log(`Coverage: ${testResults.coverage.lines}%`);
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
```

---

## Support

- **Documentation:** https://docs.aibuild.dev
- **SDK Reference:** https://sdk.aibuild.dev
- **GitHub:** https://github.com/aibuild/aibuild-sdk
- **Discord:** https://discord.gg/aibuild
- **Support:** support@aibuild.dev

---

**Last Updated:** January 2024  
**SDK Version:** 1.0.0
