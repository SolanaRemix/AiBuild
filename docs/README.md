# 📚 AiBuild Documentation

Welcome to the comprehensive documentation for **AiBuild / CyberAi** — a multi-model AI code builder that transforms natural language prompts into fully deployable applications.

## 🚀 Quick Links

- [Getting Started](./getting-started.md)
- [Architecture Overview](./architecture.md)
- [Features](#features)
- [User Guide](./guides/user-guide.md)
- [Developer Guide](./guides/developer-guide.md)
- [API Reference](./api/overview.md)
- [Contributing](./contributing.md)

## 📖 Table of Contents

### 1. Introduction
- [Getting Started](./getting-started.md) - Quick start guide to get up and running
- [Architecture](./architecture.md) - System architecture and design principles

### 2. Features

#### Core Features
- [Auto Implementation Flows](./features/auto-implementation-flows.md) - Structured workflows that strictly follow architecture.md
- [Auto Config & Maintenance](./features/auto-config.md) - Automatic configuration, dependency management, and maintenance
- [Auto Sync](./features/auto-sync.md) - Automatic synchronization with GitHub, Vercel, and v0.app
- [Auto Test](./features/auto-test.md) - Automated testing and validation
- [Auto Analysis](./features/auto-analysis.md) - Intelligent code analysis and logic flow detection
- [Auto Fix](./features/auto-fix.md) - Automatic issue resolution with fix memory

#### Additional Features
- Multi-Model AI Agent - CyberAi orchestration across GPT, Gemini, Claude, Grok
- Multi-Target Support - Web (Next.js), Mobile (APK), Desktop (Electron/Tauri)
- Full Observability - Complete logging, tracing, and monitoring
- Plugin System - Dynamic modules and extensions

### 3. Guides
- [User Guide](./guides/user-guide.md) - Complete guide for end users
- [Developer Guide](./guides/developer-guide.md) - Development and integration guide
- [Deployment Guide](./guides/deployment.md) - Deployment strategies and best practices

### 4. API & SDK
- [API Overview](./api/overview.md) - REST API reference
- [SDK Documentation](./api/sdk.md) - TypeScript SDK usage

### 5. Contributing
- [Contributing Guidelines](./contributing.md) - How to contribute to AiBuild

## 🎯 What is AiBuild?

AiBuild (also known as CyberAi) is a production-ready AI code generation platform that:

- **Transforms prompts into apps** - Natural language → deployable code
- **Supports multiple platforms** - Web, mobile (APK), and desktop applications
- **Uses multiple AI models** - GPT, Gemini, Claude, Grok, and open-source models
- **Provides full control** - User, developer, and admin control planes
- **Ensures quality** - Built-in testing, analysis, and fix capabilities
- **Maintains observability** - Complete logs, traces, and monitoring

## 🌟 Key Highlights

### Multi-Model Intelligence
CyberAi intelligently routes tasks to the best AI model for each job:
- **GPT-4.x** for high-quality code generation
- **Gemini** for planning and analysis
- **Claude** for refactoring and clean code
- **Grok** for fast iteration
- **Open-source models** for cost-efficient bulk tasks

### Production-Ready Architecture
- **Reproducible** - Every artifact is deterministic and auditable
- **Observable** - Complete visibility into the generation pipeline
- **Debuggable** - Full logging and trace capabilities
- **Governed** - Role-based access control and policies

### Automated Workflows
- **Auto Config** - Automatic project setup and configuration
- **Auto Sync** - Seamless GitHub integration and deployment
- **Auto Test** - Continuous validation of generated code
- **Auto Analysis** - Proactive issue detection
- **Auto Fix** - Intelligent resolution of known issues
- **Auto Maintenance** - Keep projects healthy automatically

## 🏗️ System Architecture

AiBuild is built on a modern, scalable architecture:

```
┌─────────────────────────────────────────────────┐
│            User Interface Layer                  │
│  (Next.js App Router + Aura FX Neo-Glow UI)     │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────┐
│         Application Services Layer               │
│  (Project, File, Deployment, Target Services)   │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────┐
│           CyberAi Agent Layer                    │
│  (Multi-Model Orchestration + Routing Policy)   │
└────────────────┬────────────────────────────────┘
                 │
┌────────────────┴────────────────────────────────┐
│         Integration & Build Layer                │
│  (GitHub, Vercel, Build Workers, CI/CD)         │
└──────────────────────────────────────────────────┘
```

## 📦 Tech Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **UI Framework:** TailwindCSS, Radix UI, ShadCN
- **Design System:** Aura FX Neo-Glow (dark mode with neon accents)
- **AI Integration:** Vercel AI SDK with multiple providers
- **Database:** PostgreSQL (Prisma ORM)
- **Version Control:** GitHub API
- **Deployment:** Vercel, GitHub Actions, custom build workers

## 🎨 UI/UX Philosophy

AiBuild features the **Aura FX Neo-Glow** design system:
- Dark mode optimized (#020617 base)
- Neon blue/green/purple accent colors
- Glass morphism and blur effects
- Smooth animations and transitions
- Accessible and user-friendly

## 🔐 Security & Governance

- Role-based access control (User, Developer, Admin)
- Audit logs for all AI operations
- Secure API key management
- Rate limiting and usage quotas
- Privacy-focused data handling

## 🚦 Getting Started

Ready to build your first AI-powered application?

1. **[Install and Setup](./getting-started.md)** - Get AiBuild running locally
2. **[Create Your First Project](./guides/user-guide.md#creating-a-project)** - Generate code from a prompt
3. **[Deploy Your App](./guides/deployment.md)** - Ship to production

## 💡 Learn More

- Explore the [Architecture](./architecture.md) to understand system design
- Read about [Auto Features](./features/auto-sync.md) to leverage automation
- Check the [API Reference](./api/overview.md) for integration options
- Review [Contributing Guidelines](./contributing.md) to participate in development

## 📞 Support & Community

- **GitHub Issues:** Report bugs and request features
- **Discussions:** Ask questions and share ideas
- **Repository:** [github.com/SolanaRemix/AiBuild](https://github.com/SolanaRemix/AiBuild)

---

**Built with ❤️ by SolanaRemix / AiBuild Team**

Licensed under MIT
