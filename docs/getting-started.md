# 🚀 Getting Started with AiBuild

This guide will help you get AiBuild up and running on your local machine in minutes.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher (recommended) or npm
- **Git** for version control
- **PostgreSQL** database (or use a hosted service like Neon/Supabase)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SolanaRemix/AiBuild.git
cd AiBuild
```

### 2. Install Dependencies

Using pnpm (recommended):

```bash
pnpm install
```

Or using npm:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Configure the following essential environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/aibuild"

# AI Model Providers
OPENAI_API_KEY="sk_example_your_openai_key_here"
GOOGLE_API_KEY="your_google_gemini_key_here"
ANTHROPIC_API_KEY="your_anthropic_claude_key_here"

# GitHub Integration
GITHUB_CLIENT_ID="your_github_oauth_app_id"
GITHUB_CLIENT_SECRET="your_github_oauth_secret"
GITHUB_TOKEN="your_github_personal_access_token"

# Vercel Integration (for auto-deploy)
VERCEL_TOKEN="your_vercel_token"

# NextAuth (Authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_random_secret_key_here"

# Application
NODE_ENV="development"
```

> **Security Note:** Always use the `sk_example_` prefix for mock API keys in documentation to avoid triggering secret scanners.

### 4. Initialize the Database

Run Prisma migrations to set up your database schema:

```bash
pnpm prisma migrate dev
```

Seed the database with initial data (optional):

```bash
pnpm prisma db seed
```

### 5. Start the Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## First Steps

### 1. Create an Account

1. Navigate to [http://localhost:3000](http://localhost:3000)
2. Click "Sign Up" or use GitHub OAuth
3. Complete your profile setup

### 2. Configure AI Models

1. Go to Settings → Models
2. Add your AI provider API keys
3. Enable the models you want to use
4. Configure routing policies (optional)

### 3. Create Your First Project

1. Click "New Project" from the dashboard
2. Enter a descriptive prompt (e.g., "Build a crypto price dashboard with dark mode")
3. Select your target platform (Web, Mobile, or Desktop)
4. Choose a template type (Landing, Dashboard, SaaS, etc.)
5. Click "Generate"

CyberAi will analyze your prompt and generate a complete project structure with code.

### 4. Explore the Generated Code

- Use the **File Tree** to navigate project files
- Open files in the **Monaco Editor**
- Preview your app in the **Preview Panel**
- Review generation logs in the **Logs Panel**

### 5. Sync to GitHub (Optional)

1. Click "Sync to GitHub" in the workspace
2. Authorize the GitHub integration
3. Select or create a repository
4. Choose a branch name
5. Push your code

### 6. Deploy Your Project

#### For Web Projects (Vercel):
1. Click "Deploy to Vercel"
2. Authorize Vercel integration
3. Configure deployment settings
4. Deploy with one click

#### For Mobile Projects (APK):
1. Click "Build APK"
2. Wait for the build orchestrator to complete
3. Download the generated APK file

#### For Desktop Projects:
1. Click "Build Desktop"
2. Select target OS (Windows/macOS/Linux)
3. Download the installer

## Development Workflow

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Linting & Formatting

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

### Building for Production

```bash
# Build the application
pnpm build

# Start production server
pnpm start
```

## Understanding the Interface

### Dashboard
Your central hub for managing projects, agents, billing, and settings.

### Workspace
The main development environment with:
- **File Tree** - Navigate project files
- **Code Editor** - Monaco editor with syntax highlighting
- **Preview Panel** - Live preview of your application
- **Logs Panel** - View generation, sync, and deployment logs
- **AI Panel** - Interact with CyberAi for regeneration

### Developer Panel
Advanced tools for developers:
- Deployment history
- API logs and traces
- SDK keys management
- Webhooks configuration
- System status monitoring

### Admin Panel
Administrative controls (for admin users):
- User management
- Model configuration
- Agent management
- Billing plans
- System settings

## Configuration

### Model Configuration

Configure which AI models to use in `core/ai/model-registry.ts`:

```typescript
const modelRegistry: ModelProviderConfig[] = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    capabilities: ["codegen", "refactor", "analysis"],
    costTier: "paid",
    enabled: true,
  },
  // Add more models...
]
```

### Routing Policy

Customize task routing in `core/ai/routing-policy.ts`:

```typescript
const routingPolicy = {
  codegen: ["gpt-4-turbo", "claude-3-opus"],
  refactor: ["claude-3-opus", "gpt-4-turbo"],
  analysis: ["gemini-pro", "gpt-4-turbo"],
}
```

## Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify PostgreSQL is running
2. Check `DATABASE_URL` in `.env.local`
3. Run `pnpm prisma migrate reset` to reset the database

### AI Model API Errors

If AI models fail to respond:

1. Verify API keys are correct in `.env.local`
2. Check API key permissions and quotas
3. Review error messages in the Logs Panel
4. Ensure model IDs match provider documentation

### Build Failures

If the build fails:

1. Clear the build cache: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && pnpm install`
3. Check for TypeScript errors: `pnpm type-check`

### Port Already in Use

If port 3000 is already in use:

```bash
# Use a different port
PORT=3001 pnpm dev
```

## Next Steps

Now that you have AiBuild running:

1. **[Read the User Guide](./guides/user-guide.md)** - Learn all features in detail
2. **[Explore Auto Features](./features/auto-sync.md)** - Leverage automation capabilities
3. **[Review Architecture](./architecture.md)** - Understand system design
4. **[API Integration](./api/overview.md)** - Integrate AiBuild into your workflow

## Additional Resources

- [Developer Guide](./guides/developer-guide.md) - For advanced development
- [Deployment Guide](./guides/deployment.md) - Production deployment strategies
- [Contributing](./contributing.md) - Contribute to AiBuild development

---

Need help? Check our [GitHub Issues](https://github.com/SolanaRemix/AiBuild/issues) or start a [Discussion](https://github.com/SolanaRemix/AiBuild/discussions).
