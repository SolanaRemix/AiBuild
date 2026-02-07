# AiBuild REST API Reference

Complete REST API documentation for the AiBuild platform - a multi-model AI code generation system for building web, mobile, and desktop applications.

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [API Endpoints](#api-endpoints)
  - [Projects](#projects)
  - [Files](#files)
  - [Deployments](#deployments)
  - [Sync](#sync)
  - [Testing](#testing)
  - [Analysis](#analysis)
  - [Agents](#agents)
  - [Models](#models)
  - [Billing](#billing)
  - [Webhooks](#webhooks)
- [WebSocket API](#websocket-api)
- [Pagination](#pagination)

---

## Overview

**Base URL:** `https://api.aibuild.dev/v1`

**API Version:** v1

The AiBuild API follows REST principles with JSON request/response bodies. All requests must be authenticated using an API key.

### Content Type

All requests should use `Content-Type: application/json` header.

### Date Format

All timestamps use ISO 8601 format: `2024-01-15T10:30:00Z`

---

## Authentication

All API requests require authentication using an API key in the `Authorization` header.

```bash
curl https://api.aibuild.dev/v1/projects \
  -H "Authorization: Bearer sk_example_abc123xyz789"
```

### API Key Types

- **User Keys** (`sk_user_*`) - Full access to user resources
- **Project Keys** (`sk_proj_*`) - Scoped to specific project
- **Read-Only Keys** (`sk_read_*`) - Read-only access

### Getting Your API Key

1. Navigate to Settings → API Keys in the dashboard
2. Click "Create API Key"
3. Select scopes and permissions
4. Copy the key (shown only once)

---

## Rate Limiting

Rate limits vary by plan tier:

| Plan | Requests/min | Requests/day | Builds/day |
|------|-------------|--------------|------------|
| Free | 20 | 500 | 5 |
| Pro | 100 | 5,000 | 50 |
| Enterprise | 500 | 50,000 | 500 |

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1705320000
```

### Rate Limit Error Response

```json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Try again in 42 seconds.",
    "type": "rate_limit_error",
    "retry_after": 42
  }
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `201` | Created |
| `204` | No Content |
| `400` | Bad Request - Invalid input |
| `401` | Unauthorized - Invalid or missing API key |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `409` | Conflict - Resource already exists |
| `422` | Unprocessable Entity - Validation error |
| `429` | Too Many Requests - Rate limit exceeded |
| `500` | Internal Server Error |
| `503` | Service Unavailable |

### Error Response Format

```json
{
  "error": {
    "code": "validation_error",
    "message": "Invalid input provided",
    "type": "invalid_request_error",
    "details": {
      "prompt": ["Prompt must be at least 10 characters"],
      "templateType": ["Must be one of: landing, dashboard, saas, app, custom"]
    }
  }
}
```

### Error Codes

- `authentication_error` - Invalid API key
- `authorization_error` - Insufficient permissions
- `validation_error` - Input validation failed
- `not_found_error` - Resource not found
- `conflict_error` - Resource conflict
- `rate_limit_error` - Rate limit exceeded
- `quota_exceeded_error` - Plan quota exceeded
- `internal_error` - Server error
- `service_unavailable` - Service temporarily unavailable

---

## API Endpoints

## Projects

### List Projects

List all projects for the authenticated user.

**Endpoint:** `GET /projects`

**Query Parameters:**

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `page` | integer | Page number | 1 |
| `limit` | integer | Items per page (1-100) | 20 |
| `status` | string | Filter by status: `draft`, `ready`, `synced`, `deployed`, `building` | - |
| `template` | string | Filter by template type | - |
| `target` | string | Filter by target: `web`, `mobile`, `desktop` | - |
| `sort` | string | Sort by: `created`, `updated`, `name` | `created` |
| `order` | string | Sort order: `asc`, `desc` | `desc` |

**Example Request:**

```bash
curl https://api.aibuild.dev/v1/projects?status=ready&limit=10 \
  -H "Authorization: Bearer sk_example_abc123xyz789"
```

**Example Response:**

```json
{
  "projects": [
    {
      "id": "proj_abc123",
      "userId": "user_xyz789",
      "name": "E-commerce Dashboard",
      "slug": "ecommerce-dashboard",
      "prompt": "Create a modern e-commerce admin dashboard with analytics",
      "templateType": "dashboard",
      "primaryTarget": "web",
      "status": "ready",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:35:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 42,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

---

### Get Project

Get a specific project by ID.

**Endpoint:** `GET /projects/{projectId}`

**Example Request:**

```bash
curl https://api.aibuild.dev/v1/projects/proj_abc123 \
  -H "Authorization: Bearer sk_example_abc123xyz789"
```

**Example Response:**

```json
{
  "id": "proj_abc123",
  "userId": "user_xyz789",
  "name": "E-commerce Dashboard",
  "slug": "ecommerce-dashboard",
  "prompt": "Create a modern e-commerce admin dashboard with analytics",
  "templateType": "dashboard",
  "primaryTarget": "web",
  "status": "ready",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
```

---

### Create Project

Create a new project from a prompt.

**Endpoint:** `POST /projects/generate`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `prompt` | string | Yes | Project description (min 10 chars) |
| `templateType` | string | No | Template: `landing`, `dashboard`, `saas`, `app`, `custom` (default: `app`) |
| `primaryTarget` | string | No | Target platform: `web`, `mobile`, `desktop` (default: `web`) |
| `name` | string | No | Custom project name |
| `modelId` | string | No | Specific model to use |

**Example Request:**

```bash
curl -X POST https://api.aibuild.dev/v1/projects/generate \
  -H "Authorization: Bearer sk_example_abc123xyz789" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Build a task management app with drag-and-drop, real-time collaboration, and deadline tracking",
    "templateType": "app",
    "primaryTarget": "web"
  }'
```

**Example Response:**

```json
{
  "projectId": "proj_abc123",
  "slug": "task-management-app",
  "status": "building",
  "filesGenerated": 24,
  "estimatedTime": 45,
  "message": "Project generation started"
}
```

---

### Update Project

Update project metadata.

**Endpoint:** `PATCH /projects/{projectId}`

**Request Body:**

```json
{
  "name": "Updated Project Name",
  "status": "ready"
}
```

**Example Response:**

```json
{
  "id": "proj_abc123",
  "name": "Updated Project Name",
  "status": "ready",
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

---

### Delete Project

Delete a project and all associated files.

**Endpoint:** `DELETE /projects/{projectId}`

**Example Request:**

```bash
curl -X DELETE https://api.aibuild.dev/v1/projects/proj_abc123 \
  -H "Authorization: Bearer sk_example_abc123xyz789"
```

**Example Response:**

```json
{
  "id": "proj_abc123",
  "deleted": true,
  "deletedAt": "2024-01-15T11:00:00Z"
}
```

---

### Refine Project

Refine an existing project with additional instructions.

**Endpoint:** `POST /projects/{projectId}/refine`

**Request Body:**

```json
{
  "prompt": "Add authentication with email/password and social login",
  "preserveFiles": ["src/config/*", "package.json"]
}
```

**Example Response:**

```json
{
  "projectId": "proj_abc123",
  "status": "building",
  "filesModified": 8,
  "filesAdded": 5,
  "estimatedTime": 30
}
```

---

## Files

### List Files

List all files in a project.

**Endpoint:** `GET /projects/{projectId}/files`

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `path` | string | Filter by path prefix |
| `language` | string | Filter by language |
| `generatedBy` | string | Filter by: `ai`, `user` |
| `page` | integer | Page number |
| `limit` | integer | Items per page |

**Example Request:**

```bash
curl https://api.aibuild.dev/v1/projects/proj_abc123/files?path=src/components \
  -H "Authorization: Bearer sk_example_abc123xyz789"
```

**Example Response:**

```json
{
  "files": [
    {
      "id": "file_xyz123",
      "projectId": "proj_abc123",
      "path": "src/components/Header.tsx",
      "content": "import React from 'react'...",
      "language": "typescript",
      "generatedBy": "ai",
      "version": 1,
      "createdAt": "2024-01-15T10:35:00Z",
      "updatedAt": "2024-01-15T10:35:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 42,
    "totalPages": 1
  }
}
```

---

### Get File

Get a specific file by ID or path.

**Endpoint:** `GET /projects/{projectId}/files/{fileId}`

**Alternative:** `GET /projects/{projectId}/files?path={filePath}`

**Example Response:**

```json
{
  "id": "file_xyz123",
  "projectId": "proj_abc123",
  "path": "src/components/Header.tsx",
  "content": "import React from 'react'...",
  "language": "typescript",
  "generatedBy": "ai",
  "version": 1,
  "createdAt": "2024-01-15T10:35:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
```

---

### Create File

Create a new file in a project.

**Endpoint:** `POST /projects/{projectId}/files`

**Request Body:**

```json
{
  "path": "src/utils/helpers.ts",
  "content": "export const formatDate = (date: Date) => {...}",
  "language": "typescript"
}
```

**Example Response:**

```json
{
  "id": "file_new123",
  "projectId": "proj_abc123",
  "path": "src/utils/helpers.ts",
  "version": 1,
  "createdAt": "2024-01-15T11:00:00Z"
}
```

---

### Update File

Update an existing file.

**Endpoint:** `PUT /projects/{projectId}/files/{fileId}`

**Request Body:**

```json
{
  "content": "// Updated content...",
  "message": "Fixed bug in date formatting"
}
```

**Example Response:**

```json
{
  "id": "file_xyz123",
  "version": 2,
  "updatedAt": "2024-01-15T11:05:00Z"
}
```

---

### Delete File

Delete a file from a project.

**Endpoint:** `DELETE /projects/{projectId}/files/{fileId}`

**Example Response:**

```json
{
  "id": "file_xyz123",
  "deleted": true
}
```

---

### Regenerate File

Regenerate a specific file using AI.

**Endpoint:** `POST /projects/{projectId}/files/{fileId}/regenerate`

**Request Body:**

```json
{
  "prompt": "Add error handling and loading states",
  "preserveComments": true
}
```

**Example Response:**

```json
{
  "id": "file_xyz123",
  "status": "regenerating",
  "estimatedTime": 10
}
```

---

## Deployments

### List Deployments

List all deployments for a project.

**Endpoint:** `GET /projects/{projectId}/deployments`

**Example Response:**

```json
{
  "deployments": [
    {
      "id": "deploy_abc123",
      "projectId": "proj_abc123",
      "target": "web",
      "provider": "vercel",
      "providerProjectId": "vercel_proj_xyz",
      "artifactUrl": "https://ecommerce-dashboard.vercel.app",
      "status": "ready",
      "logsUrl": "https://vercel.com/logs/...",
      "createdAt": "2024-01-15T10:40:00Z",
      "updatedAt": "2024-01-15T10:42:00Z"
    }
  ]
}
```

---

### Create Deployment

Deploy a project to a target platform.

**Endpoint:** `POST /projects/{projectId}/deploy`

**Request Body:**

```json
{
  "target": "web",
  "provider": "vercel",
  "config": {
    "envVars": {
      "API_URL": "https://api.example.com"
    },
    "buildCommand": "npm run build",
    "outputDirectory": "dist"
  }
}
```

**Example Response:**

```json
{
  "id": "deploy_abc123",
  "projectId": "proj_abc123",
  "target": "web",
  "status": "pending",
  "message": "Deployment initiated"
}
```

---

### Get Deployment

Get deployment details.

**Endpoint:** `GET /deployments/{deploymentId}`

**Example Response:**

```json
{
  "id": "deploy_abc123",
  "projectId": "proj_abc123",
  "target": "web",
  "provider": "vercel",
  "status": "ready",
  "artifactUrl": "https://ecommerce-dashboard.vercel.app",
  "logsUrl": "https://vercel.com/logs/...",
  "buildTime": 42,
  "createdAt": "2024-01-15T10:40:00Z",
  "updatedAt": "2024-01-15T10:42:00Z"
}
```

---

### Build APK

Build an Android APK for mobile projects.

**Endpoint:** `POST /projects/{projectId}/build/apk`

**Request Body:**

```json
{
  "variant": "release",
  "config": {
    "appName": "TaskManager",
    "packageName": "com.example.taskmanager",
    "versionCode": 1,
    "versionName": "1.0.0"
  }
}
```

**Example Response:**

```json
{
  "buildId": "build_abc123",
  "status": "building",
  "estimatedTime": 300,
  "message": "APK build started"
}
```

---

### Build Desktop App

Build a desktop application (Electron/Tauri).

**Endpoint:** `POST /projects/{projectId}/build/desktop`

**Request Body:**

```json
{
  "platform": "windows",
  "architecture": "x64",
  "bundler": "electron"
}
```

**Example Response:**

```json
{
  "buildId": "build_desktop123",
  "status": "building",
  "estimatedTime": 180
}
```

---

### Get Build Status

Get build status and logs.

**Endpoint:** `GET /builds/{buildId}`

**Example Response:**

```json
{
  "id": "build_abc123",
  "projectId": "proj_abc123",
  "target": "mobile",
  "status": "ready",
  "artifactUrl": "https://cdn.aibuild.dev/builds/app.apk",
  "artifactSize": 15728640,
  "buildTime": 287,
  "logs": "https://api.aibuild.dev/v1/builds/build_abc123/logs",
  "createdAt": "2024-01-15T10:40:00Z",
  "completedAt": "2024-01-15T10:45:00Z"
}
```

---

## Sync

### Sync to GitHub

Sync project to a GitHub repository.

**Endpoint:** `POST /projects/{projectId}/sync/github`

**Request Body:**

```json
{
  "repository": "username/repo-name",
  "branch": "main",
  "commitMessage": "Initial project sync from AiBuild",
  "createRepo": true
}
```

**Example Response:**

```json
{
  "syncId": "sync_abc123",
  "repository": "username/repo-name",
  "branch": "main",
  "status": "syncing",
  "commitUrl": null
}
```

---

### Sync from GitHub

Import project from GitHub repository.

**Endpoint:** `POST /projects/sync/github/import`

**Request Body:**

```json
{
  "repository": "username/repo-name",
  "branch": "main",
  "name": "Imported Project"
}
```

**Example Response:**

```json
{
  "projectId": "proj_imported123",
  "status": "importing",
  "filesImported": 0
}
```

---

### Sync to v0.app

Sync project to v0.app for component generation.

**Endpoint:** `POST /projects/{projectId}/sync/v0`

**Request Body:**

```json
{
  "componentPaths": ["src/components/*"]
}
```

**Example Response:**

```json
{
  "syncId": "v0sync_abc123",
  "status": "syncing",
  "componentsCount": 12
}
```

---

## Testing

### Run Tests

Execute project tests.

**Endpoint:** `POST /projects/{projectId}/test`

**Request Body:**

```json
{
  "type": "unit",
  "files": ["src/**/*.test.ts"],
  "coverage": true,
  "watch": false
}
```

**Example Response:**

```json
{
  "testRunId": "test_run_abc123",
  "status": "running",
  "estimatedTime": 30
}
```

---

### Get Test Results

Get test execution results.

**Endpoint:** `GET /test-runs/{testRunId}`

**Example Response:**

```json
{
  "id": "test_run_abc123",
  "projectId": "proj_abc123",
  "status": "completed",
  "results": {
    "total": 156,
    "passed": 154,
    "failed": 2,
    "skipped": 0,
    "duration": 28.4
  },
  "coverage": {
    "lines": 87.5,
    "branches": 82.3,
    "functions": 90.1,
    "statements": 87.5
  },
  "failures": [
    {
      "test": "should handle invalid input",
      "file": "src/utils/validator.test.ts",
      "line": 42,
      "message": "Expected false, got true"
    }
  ],
  "createdAt": "2024-01-15T11:00:00Z",
  "completedAt": "2024-01-15T11:00:28Z"
}
```

---

### Get Coverage Report

Get detailed test coverage report.

**Endpoint:** `GET /test-runs/{testRunId}/coverage`

**Example Response:**

```json
{
  "testRunId": "test_run_abc123",
  "overall": {
    "lines": 87.5,
    "branches": 82.3,
    "functions": 90.1,
    "statements": 87.5
  },
  "files": [
    {
      "path": "src/utils/validator.ts",
      "lines": 95.2,
      "branches": 88.9,
      "functions": 100,
      "statements": 95.2
    }
  ]
}
```

---

## Analysis

### Run Analysis

Analyze code for issues and improvements.

**Endpoint:** `POST /projects/{projectId}/analyze`

**Request Body:**

```json
{
  "types": ["logic-flow", "security", "performance", "best-practices"],
  "severity": "warning",
  "autoFix": false
}
```

**Example Response:**

```json
{
  "analysisId": "analysis_abc123",
  "status": "analyzing",
  "estimatedTime": 60
}
```

---

### Get Analysis Results

Get code analysis results.

**Endpoint:** `GET /analysis/{analysisId}`

**Example Response:**

```json
{
  "id": "analysis_abc123",
  "projectId": "proj_abc123",
  "status": "completed",
  "issues": [
    {
      "kind": "missing-check",
      "severity": "warning",
      "path": "src/utils/api.ts",
      "line": 45,
      "message": "Potential null reference without check",
      "suggestion": "Add null check before accessing property",
      "autoFixable": true
    },
    {
      "kind": "unsafe-call",
      "severity": "error",
      "path": "src/auth/validate.ts",
      "line": 23,
      "message": "Unsafe eval() usage detected",
      "suggestion": "Use JSON.parse() instead of eval()",
      "autoFixable": false
    }
  ],
  "summary": {
    "total": 47,
    "errors": 2,
    "warnings": 38,
    "info": 7
  },
  "createdAt": "2024-01-15T11:00:00Z",
  "completedAt": "2024-01-15T11:01:00Z"
}
```

---

### Fix Issues

Automatically fix detected issues.

**Endpoint:** `POST /analysis/{analysisId}/fix`

**Request Body:**

```json
{
  "issueIds": ["issue_1", "issue_2"],
  "createBackup": true
}
```

**Example Response:**

```json
{
  "fixId": "fix_abc123",
  "status": "fixing",
  "issuesCount": 2,
  "estimatedTime": 15
}
```

---

## Agents

### List User Agents

List custom AI agents for the user.

**Endpoint:** `GET /agents`

**Example Response:**

```json
{
  "agents": [
    {
      "id": "agent_abc123",
      "userId": "user_xyz789",
      "name": "React Expert",
      "baseModel": "gpt-4",
      "role": "Frontend Developer",
      "capabilities": ["codegen", "refactor"],
      "allowedModels": ["gpt-4", "claude-3"],
      "maxTokens": 8000,
      "systemPrompt": "You are an expert React developer...",
      "usage": 245,
      "createdAt": "2024-01-10T09:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### Create Agent

Create a custom AI agent.

**Endpoint:** `POST /agents`

**Request Body:**

```json
{
  "name": "Vue.js Specialist",
  "baseModel": "gpt-4",
  "role": "Frontend Developer",
  "capabilities": ["codegen", "refactor", "analysis"],
  "allowedModels": ["gpt-4", "claude-3"],
  "maxTokens": 8000,
  "systemPrompt": "You are an expert Vue.js developer specializing in composition API and TypeScript..."
}
```

**Example Response:**

```json
{
  "id": "agent_new123",
  "name": "Vue.js Specialist",
  "createdAt": "2024-01-15T11:00:00Z"
}
```

---

### Update Agent

Update an existing agent.

**Endpoint:** `PATCH /agents/{agentId}`

**Request Body:**

```json
{
  "systemPrompt": "Updated system prompt...",
  "maxTokens": 16000
}
```

---

### Delete Agent

Delete a custom agent.

**Endpoint:** `DELETE /agents/{agentId}`

---

### Use Agent

Use a custom agent for a task.

**Endpoint:** `POST /agents/{agentId}/execute`

**Request Body:**

```json
{
  "task": "codegen",
  "projectId": "proj_abc123",
  "prompt": "Create a user profile component with avatar upload"
}
```

**Example Response:**

```json
{
  "executionId": "exec_abc123",
  "status": "executing",
  "estimatedTime": 20
}
```

---

## Models

### List Models

List available AI models.

**Endpoint:** `GET /models`

**Example Response:**

```json
{
  "models": [
    {
      "id": "model_gpt4",
      "name": "GPT-4",
      "modelId": "gpt-4-turbo-preview",
      "capabilities": ["codegen", "refactor", "analysis", "chat"],
      "costTier": "paid",
      "enabled": true,
      "contextWindow": 128000,
      "maxOutputTokens": 4096
    },
    {
      "id": "model_claude3",
      "name": "Claude 3 Opus",
      "modelId": "claude-3-opus-20240229",
      "capabilities": ["codegen", "refactor", "analysis"],
      "costTier": "paid",
      "enabled": true,
      "contextWindow": 200000,
      "maxOutputTokens": 4096
    }
  ]
}
```

---

## Billing

### Get Billing Overview

Get billing information and usage.

**Endpoint:** `GET /billing`

**Example Response:**

```json
{
  "plan": "pro",
  "usage": {
    "requests": 1250,
    "requestsLimit": 5000,
    "builds": 12,
    "buildsLimit": 50,
    "projects": 8,
    "projectsLimit": 50
  },
  "nextBillingDate": "2024-02-15T00:00:00Z",
  "amountDue": 29.99
}
```

---

### List Invoices

List billing invoices.

**Endpoint:** `GET /billing/invoices`

**Example Response:**

```json
{
  "invoices": [
    {
      "id": "inv_abc123",
      "date": "2024-01-15T00:00:00Z",
      "amount": 29.99,
      "status": "paid",
      "pdfUrl": "https://api.aibuild.dev/v1/invoices/inv_abc123.pdf"
    }
  ]
}
```

---

### Update Subscription

Update billing subscription.

**Endpoint:** `POST /billing/subscription`

**Request Body:**

```json
{
  "plan": "enterprise",
  "billingInterval": "annual"
}
```

---

## Webhooks

### List Webhooks

List configured webhooks.

**Endpoint:** `GET /webhooks`

**Example Response:**

```json
{
  "webhooks": [
    {
      "id": "webhook_abc123",
      "url": "https://example.com/webhooks/aibuild",
      "events": ["project.created", "deployment.completed", "build.failed"],
      "enabled": true,
      "lastTriggered": "2024-01-15T10:42:00Z",
      "createdAt": "2024-01-10T09:00:00Z"
    }
  ]
}
```

---

### Create Webhook

Create a new webhook.

**Endpoint:** `POST /webhooks`

**Request Body:**

```json
{
  "url": "https://example.com/webhooks/aibuild",
  "events": ["project.created", "deployment.completed"],
  "secret": "webhook_secret_key"
}
```

**Example Response:**

```json
{
  "id": "webhook_new123",
  "url": "https://example.com/webhooks/aibuild",
  "enabled": true,
  "createdAt": "2024-01-15T11:00:00Z"
}
```

---

### Update Webhook

Update webhook configuration.

**Endpoint:** `PATCH /webhooks/{webhookId}`

**Request Body:**

```json
{
  "events": ["project.created", "deployment.completed", "test.completed"],
  "enabled": false
}
```

---

### Delete Webhook

Delete a webhook.

**Endpoint:** `DELETE /webhooks/{webhookId}`

---

### Webhook Events

Available webhook events:

| Event | Description |
|-------|-------------|
| `project.created` | Project created |
| `project.updated` | Project updated |
| `project.deleted` | Project deleted |
| `deployment.started` | Deployment started |
| `deployment.completed` | Deployment completed |
| `deployment.failed` | Deployment failed |
| `build.started` | Build started |
| `build.completed` | Build completed |
| `build.failed` | Build failed |
| `test.completed` | Tests completed |
| `analysis.completed` | Analysis completed |
| `sync.completed` | GitHub sync completed |

### Webhook Payload

```json
{
  "event": "deployment.completed",
  "timestamp": "2024-01-15T10:42:00Z",
  "data": {
    "deploymentId": "deploy_abc123",
    "projectId": "proj_abc123",
    "status": "ready",
    "artifactUrl": "https://example.vercel.app"
  }
}
```

### Webhook Signature

Webhooks are signed using HMAC SHA-256:

```http
X-AiBuild-Signature: sha256=abc123...
X-AiBuild-Delivery: delivery_xyz789
X-AiBuild-Event: deployment.completed
```

**Verify signature:**

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}
```

---

## WebSocket API

Real-time updates via WebSocket.

**Endpoint:** `wss://api.aibuild.dev/v1/ws`

### Authentication

Send authentication message after connecting:

```json
{
  "type": "auth",
  "token": "sk_example_abc123xyz789"
}
```

### Subscribe to Events

```json
{
  "type": "subscribe",
  "channels": ["project:proj_abc123", "user:notifications"]
}
```

### Event Messages

**Project Update:**

```json
{
  "type": "event",
  "channel": "project:proj_abc123",
  "event": "file.updated",
  "data": {
    "fileId": "file_xyz123",
    "path": "src/App.tsx",
    "updatedAt": "2024-01-15T10:35:00Z"
  }
}
```

**Build Progress:**

```json
{
  "type": "event",
  "channel": "build:build_abc123",
  "event": "progress",
  "data": {
    "status": "building",
    "progress": 65,
    "message": "Compiling TypeScript..."
  }
}
```

**Test Results:**

```json
{
  "type": "event",
  "channel": "test:test_run_abc123",
  "event": "completed",
  "data": {
    "passed": 154,
    "failed": 2,
    "duration": 28.4
  }
}
```

---

## Pagination

All list endpoints support pagination.

**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20, max: 100)

**Response Format:**

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 156,
    "totalPages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

**Link Headers:**

```http
Link: <https://api.aibuild.dev/v1/projects?page=2>; rel="next",
      <https://api.aibuild.dev/v1/projects?page=8>; rel="last"
```

---

## Filtering and Sorting

Most list endpoints support filtering and sorting.

**Example:**

```bash
GET /projects?status=ready&template=dashboard&sort=updated&order=desc
```

**Available Operators:**

- Equality: `?status=ready`
- Multiple values: `?status=ready,deployed`
- Greater than: `?created_after=2024-01-01`
- Less than: `?created_before=2024-12-31`
- Search: `?search=dashboard`

---

## Rate Limit Best Practices

1. **Cache responses** when possible
2. **Use webhooks** instead of polling
3. **Batch operations** to reduce request count
4. **Implement exponential backoff** for retries
5. **Monitor rate limit headers** to avoid hitting limits

---

## Support

- **Documentation:** https://docs.aibuild.dev
- **API Status:** https://status.aibuild.dev
- **Support:** support@aibuild.dev
- **GitHub:** https://github.com/aibuild/aibuild

---

**API Version:** v1
