# 📖 AiBuild User Guide

Complete guide to using AiBuild for building web, mobile, and desktop applications with AI.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Creating Projects](#creating-projects)
3. [Using the Workspace](#using-the-workspace)
4. [Editing and Regenerating Code](#editing-and-regenerating-code)
5. [Testing Projects](#testing-projects)
6. [Syncing to GitHub](#syncing-to-github)
7. [Deploying Applications](#deploying-applications)
8. [Managing Agents](#managing-agents)
9. [Settings and Preferences](#settings-and-preferences)
10. [Best Practices](#best-practices)
11. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Creating Your Account

1. Navigate to [AiBuild](https://aibuild.app)
2. Click **Sign Up** or **Sign in with GitHub**
3. Complete your profile setup
4. Verify your email address

### Initial Configuration

Before creating your first project, configure your AI models:

1. Go to **Settings** → **Models**
2. Add API keys for your preferred AI providers:
   - OpenAI (GPT-4)
   - Google (Gemini)
   - Anthropic (Claude)
   - Grok (optional)
3. Enable the models you want to use
4. Save your configuration

---

## Creating Projects

### Understanding Project Types

AiBuild supports three primary target platforms:

- **Web** - Next.js applications with React
- **Mobile** - React Native apps with Expo (APK generation)
- **Desktop** - Electron or Tauri desktop applications

### Template Types

Choose from predefined templates:

- **Landing Page** - Marketing or product landing pages
- **Dashboard** - Admin dashboards or analytics panels
- **SaaS App** - Multi-user SaaS applications
- **Application** - General-purpose applications
- **Custom** - Start from scratch with your own structure

### Creating a New Project

#### Step 1: Open the New Project Dialog

1. From your dashboard, click **New Project**
2. Or use the keyboard shortcut: `Cmd/Ctrl + N`

#### Step 2: Describe Your Project

Write a clear, detailed prompt describing what you want to build:

**Good Prompt Examples:**

```
Build a crypto portfolio tracker with real-time price updates,
dark mode support, and charts showing historical performance.
Include wallet connection with MetaMask.
```

```
Create a mobile task management app with categories,
due dates, reminders, and a calendar view. Support
offline mode and sync to cloud when online.
```

```
Design a desktop music player with playlist management,
audio visualizer, and support for local files and streaming.
Include keyboard shortcuts and mini player mode.
```

**Tips for Better Prompts:**
- Be specific about features you need
- Mention design preferences (dark mode, color scheme)
- Specify integrations (APIs, services)
- Include user roles if applicable
- Describe key workflows

#### Step 3: Select Target Platform

Click on your desired platform:
- 🌐 **Web** - For browser-based applications
- 📱 **Mobile** - For Android/iOS apps
- 🖥️ **Desktop** - For Windows/macOS/Linux apps

#### Step 4: Choose Template Type

Select the template that best matches your project type:
- **Landing** - Marketing sites
- **Dashboard** - Data visualization
- **SaaS** - Full applications
- **App** - General purpose
- **Custom** - Blank slate

#### Step 5: Generate

Click **Generate Project** and wait while CyberAi:

1. Analyzes your prompt
2. Plans the project structure
3. Generates files and code
4. Validates the output
5. Prepares the preview

This typically takes 30-90 seconds depending on project complexity.

### Project Generation Process

Watch the generation progress in real-time:

1. **Analyzing** - Understanding your requirements
2. **Planning** - Creating project structure
3. **Generating** - Writing code files
4. **Validating** - Checking for errors
5. **Optimizing** - Refining code quality

### What Gets Generated

AiBuild creates a complete project including:

- **Project structure** - Organized folder hierarchy
- **Configuration files** - package.json, tsconfig.json, etc.
- **Source code** - All necessary components and pages
- **Styling** - CSS/TailwindCSS with design system
- **Dependencies** - Required packages and libraries
- **Documentation** - README with project overview

---

## Using the Workspace

The workspace is your primary development environment with four main areas:

### Layout Overview

```
┌─────────────────────────────────────────────────────┐
│  Header: Project Name, Status, Actions              │
├──────────┬──────────────────────┬───────────────────┤
│          │                      │                   │
│  File    │   Code Editor        │   Preview         │
│  Tree    │   (Monaco)           │   or              │
│          │                      │   Logs            │
│          │                      │                   │
└──────────┴──────────────────────┴───────────────────┘
```

### 1. File Tree Panel

Navigate and manage your project files:

**Features:**
- **Hierarchical view** - Nested folder structure
- **File icons** - Visual file type indicators
- **Quick search** - Filter files by name
- **Context menu** - Right-click for operations
- **Expand/collapse** - Manage folder visibility

**File Operations:**
- **Select file** - Click to open in editor
- **Create file** - Right-click folder → New File
- **Create folder** - Right-click → New Folder
- **Rename** - Right-click → Rename
- **Delete** - Right-click → Delete

**Keyboard Shortcuts:**
- `↑/↓` - Navigate files
- `Enter` - Open selected file
- `Delete` - Delete selected file
- `F2` - Rename selected file

### 2. Code Editor

Monaco editor (VS Code's editor) with full features:

**Features:**
- **Syntax highlighting** - For all major languages
- **IntelliSense** - Auto-completion
- **Multi-cursor editing** - Edit multiple lines
- **Find and replace** - Search within file
- **Code folding** - Collapse sections
- **Minimap** - File overview

**Keyboard Shortcuts:**
- `Cmd/Ctrl + S` - Save file
- `Cmd/Ctrl + F` - Find
- `Cmd/Ctrl + H` - Replace
- `Cmd/Ctrl + /` - Toggle comment
- `Alt + ↑/↓` - Move line up/down
- `Cmd/Ctrl + D` - Select next occurrence
- `Cmd/Ctrl + Shift + K` - Delete line

**Editor Actions:**
- **Save** - Saves current file
- **Regenerate** - Re-generate file with AI
- **Format** - Auto-format code
- **Copy** - Copy file content

### 3. Preview Panel

Real-time application preview:

**Web Projects:**
- Live preview with hot reload
- Responsive device testing
- Console output
- Network requests
- Performance metrics

**Mobile Projects:**
- Device frame preview
- Multiple device sizes
- Orientation toggle
- Touch simulation

**Desktop Projects:**
- Window preview
- Platform-specific UI
- Keyboard shortcuts
- Menu bar simulation

**Preview Controls:**
- **Refresh** - Reload preview
- **Device** - Change device size
- **Open in tab** - Full-screen preview
- **Share** - Get preview link

### 4. Logs Panel

Monitor all project activities:

**Log Types:**

**AI Logs** - Model interactions
```
[GPT-4] Generating HomePage component...
[Gemini] Analyzing project structure...
[Claude] Refactoring UserService...
```

**Build Logs** - Compilation output
```
> Building for production...
✓ Compiled successfully
✓ Collecting page data
✓ Generating static pages
```

**Test Logs** - Test execution
```
PASS  components/Button.test.tsx
PASS  pages/HomePage.test.tsx
Tests: 15 passed, 15 total
```

**Deployment Logs** - Deploy status
```
Deploying to Vercel...
Building project...
Running build command...
Deployment complete: https://...
```

**Log Filters:**
- Filter by type (AI, Build, Test, Deploy)
- Filter by severity (Info, Warning, Error)
- Search log content
- Export logs

### Header Actions

Quick access to common operations:

**Status Badge** - Shows project status:
- 🟡 **Draft** - Being created
- 🟢 **Ready** - Ready to use
- 🟣 **Synced** - Synced to GitHub
- 🔵 **Deployed** - Live deployment
- 🟠 **Building** - Build in progress

**Action Buttons:**
- **Sync to GitHub** - Push code to repository
- **Deploy** - Deploy to production
- **Refresh** - Regenerate project
- **Settings** - Project settings

---

## Editing and Regenerating Code

### Manual Editing

Edit any file directly in the Monaco editor:

1. Select file from file tree
2. Make your changes
3. Save with `Cmd/Ctrl + S`
4. Preview updates automatically

**Best Practices:**
- Save frequently
- Test changes in preview
- Keep backups of working versions
- Use meaningful commit messages

### AI-Powered Regeneration

#### Regenerating a Single File

1. Open the file in the editor
2. Click the **Regenerate** button
3. Optionally provide instructions:
   ```
   Add error handling and loading states
   ```
4. Wait for AI to regenerate
5. Review the changes
6. Accept or revert

#### Regenerating Multiple Files

1. Select files in the file tree (Cmd/Ctrl + Click)
2. Right-click → **Regenerate Selected**
3. Provide batch instructions
4. Review changes for each file

#### Partial Regeneration

Regenerate specific sections:

1. Select code in the editor
2. Right-click → **Regenerate Selection**
3. Describe the change:
   ```
   Make this function async and add try-catch
   ```
4. AI regenerates only the selection

### Code Refinement

Use AI to improve existing code:

**Refactoring:**
```
Refactor this component to use custom hooks
```

**Optimization:**
```
Optimize this function for better performance
```

**Bug Fixing:**
```
Fix the issue where the modal doesn't close on mobile
```

**Style Improvements:**
```
Update this component to use the Aura FX design system
```

### Version History

Track changes and revert if needed:

1. Click **History** in the editor toolbar
2. View all versions of the file
3. Compare versions side-by-side
4. Restore previous version if needed

---

## Testing Projects

### Automatic Testing

AiBuild automatically generates and runs tests:

**Test Types:**
- **Unit Tests** - Component and function tests
- **Integration Tests** - Feature and workflow tests
- **E2E Tests** - Full application tests
- **Visual Tests** - UI regression tests

### Running Tests

**Run All Tests:**
1. Click **Run Tests** in the workspace
2. View results in the Logs panel
3. Review failed tests
4. Fix issues and rerun

**Run Specific Tests:**
1. Right-click a file
2. Select **Run Tests for This File**
3. View results

**Continuous Testing:**
- Enable in Settings → Testing
- Tests run automatically on save
- Get instant feedback

### Test Coverage

View coverage metrics:

1. Go to **Dev Panel** → **Tests**
2. View coverage report:
   - Line coverage
   - Branch coverage
   - Function coverage
   - File-by-file breakdown
3. Identify untested code
4. Generate additional tests

### Adding Custom Tests

Write your own tests:

1. Create test file (e.g., `Button.test.tsx`)
2. Write test cases:
   ```typescript
   import { render, fireEvent } from '@testing-library/react'
   import { Button } from './Button'
   
   describe('Button', () => {
     it('renders correctly', () => {
       const { getByText } = render(<Button>Click me</Button>)
       expect(getByText('Click me')).toBeInTheDocument()
     })
     
     it('calls onClick when clicked', () => {
       const onClick = jest.fn()
       const { getByText } = render(
         <Button onClick={onClick}>Click me</Button>
       )
       fireEvent.click(getByText('Click me'))
       expect(onClick).toHaveBeenCalled()
     })
   })
   ```
3. Run tests
4. View results

---

## Syncing to GitHub

### First-Time Setup

#### Connect GitHub Account

1. Go to **Settings** → **Integrations**
2. Click **Connect GitHub**
3. Authorize AiBuild GitHub App
4. Grant repository access

#### Create Repository

**Option 1: New Repository**
1. Click **Sync to GitHub** in workspace
2. Select **Create New Repository**
3. Enter repository name
4. Choose visibility (Public/Private)
5. Click **Create & Sync**

**Option 2: Existing Repository**
1. Click **Sync to GitHub**
2. Select **Use Existing Repository**
3. Choose from your repositories
4. Select branch (or create new)
5. Click **Sync**

### Syncing Changes

#### Manual Sync

1. Make changes to your project
2. Click **Sync to GitHub**
3. Enter commit message
4. Click **Push Changes**

#### Auto-Sync

Enable automatic synchronization:

1. Go to Project Settings → **Auto Sync**
2. Toggle **Enable Auto Sync**
3. Choose trigger:
   - On save
   - On generation
   - On deployment
   - Scheduled (hourly, daily)
4. Save settings

### Branch Management

**Creating Branches:**
1. Click branch selector in workspace
2. Click **New Branch**
3. Enter branch name
4. Choose base branch
5. Create branch

**Switching Branches:**
1. Click branch selector
2. Choose branch from list
3. Workspace updates to branch code

**Merging Branches:**
1. Go to **Dev Panel** → **GitHub**
2. Select branches to merge
3. Preview changes
4. Create pull request
5. Merge when ready

### Pull Requests

Create pull requests from AiBuild:

1. Make changes on a branch
2. Click **Create Pull Request**
3. Fill in details:
   - Title
   - Description
   - Reviewers
   - Labels
4. Submit pull request
5. Track status in Dev Panel

---

## Deploying Applications

### Web Deployment (Vercel)

#### Initial Setup

1. Connect Vercel account:
   - Go to **Settings** → **Integrations**
   - Click **Connect Vercel**
   - Authorize AiBuild
2. Sync project to GitHub first
3. Configure environment variables

#### Deploy to Vercel

1. Click **Deploy** in workspace
2. Select **Vercel**
3. Configure deployment:
   - **Project Name** - Vercel project name
   - **Environment** - Production/Preview
   - **Domain** - Custom domain (optional)
   - **Build Settings** - Auto-detected
   - **Environment Variables** - Add secrets
4. Click **Deploy**
5. Monitor deployment in Logs panel

#### Deployment Process

```
1. Preparing deployment...
2. Pushing to GitHub...
3. Creating Vercel project...
4. Configuring build settings...
5. Starting build...
6. Installing dependencies...
7. Running build command...
8. Optimizing assets...
9. Deploying to Vercel edge...
10. Deployment complete! 🎉
```

#### Custom Domains

1. Go to **Dev Panel** → **Deployments**
2. Select your Vercel deployment
3. Click **Add Domain**
4. Enter domain name
5. Configure DNS settings
6. Verify domain

### Mobile Deployment (APK)

#### Building Android APK

1. Ensure project target is **Mobile**
2. Click **Deploy** → **Build APK**
3. Configure build:
   - **App Name** - Display name
   - **Package Name** - com.example.app
   - **Version** - 1.0.0
   - **Icon** - Upload icon (optional)
   - **Signing** - Use AiBuild key or custom
4. Click **Build**
5. Wait for build to complete (5-15 minutes)

#### Build Process

The build worker:
1. Prepares React Native environment
2. Installs dependencies
3. Configures Expo build
4. Compiles Android app
5. Signs APK
6. Uploads to storage
7. Notifies completion

#### Download APK

1. Build completes
2. Download link appears in Logs
3. Click **Download APK**
4. Install on Android device:
   - Enable "Install from Unknown Sources"
   - Open APK file
   - Follow installation prompts

#### iOS Apps

iOS builds coming soon. Current options:
- Use Expo Go for testing
- Build locally with Xcode
- Use Expo EAS Build service

### Desktop Deployment

#### Building Desktop Apps

1. Ensure project target is **Desktop**
2. Click **Deploy** → **Build Desktop**
3. Select platforms:
   - ☑️ Windows (EXE/MSI)
   - ☑️ macOS (DMG/PKG)
   - ☑️ Linux (AppImage/DEB)
4. Configure:
   - **App Name**
   - **Version**
   - **Icon**
   - **Auto-updater** (optional)
5. Click **Build**

#### Build Options

**Electron (Default):**
- Cross-platform support
- Rich ecosystem
- Larger file size
- Chromium-based

**Tauri (Alternative):**
- Smaller file size
- Native performance
- Rust-based
- Modern alternative

#### Download Installers

After build completes:
1. Download installers from Logs panel
2. Test on target platforms
3. Distribute to users
4. Set up auto-updates (optional)

### Environment Variables

Configure secrets and settings:

1. Go to Project Settings → **Environment**
2. Add variables:
   ```
   API_KEY=your_secret_key
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_APP_URL=https://app.com
   ```
3. Separate environments:
   - Development
   - Preview
   - Production
4. Variables sync to deployments automatically

**Security Best Practices:**
- Never commit secrets to code
- Use `NEXT_PUBLIC_` prefix for client-side vars
- Rotate keys regularly
- Use different keys per environment

---

## Managing Agents

### What are Agents?

Agents are customizable AI assistants with:
- Specific model configurations
- Custom behaviors and personas
- Specialized knowledge domains
- Task-specific optimizations

### Creating Custom Agents

1. Go to **Dashboard** → **Agents**
2. Click **Create Agent**
3. Configure agent:

**Basic Settings:**
- **Name** - Agent identifier
- **Description** - Purpose and use case
- **Icon** - Visual identifier
- **Color** - Theme color

**Model Configuration:**
```yaml
Primary Model: GPT-4 Turbo
Fallback Models:
  - Claude 3 Opus
  - Gemini Pro
Temperature: 0.7
Max Tokens: 4000
```

**Behavior Settings:**
- **Persona** - Agent personality and tone
- **Instructions** - System prompt
- **Context** - Domain knowledge
- **Constraints** - Rules and limitations

**Example Configurations:**

**Frontend Specialist:**
```
Persona: Expert React/Next.js developer
Focus: UI components, styling, accessibility
Models: GPT-4 (primary), Claude 3 (refactoring)
Temperature: 0.5 (consistent output)
```

**Backend Specialist:**
```
Persona: Senior backend engineer
Focus: APIs, databases, performance
Models: Gemini (planning), GPT-4 (implementation)
Temperature: 0.3 (precise logic)
```

**Mobile Expert:**
```
Persona: React Native specialist
Focus: Mobile UI, native features, performance
Models: GPT-4 (primary), Grok (iteration)
Temperature: 0.6 (balanced creativity)
```

### Using Custom Agents

**Assign to Project:**
1. Open project settings
2. Go to **Agent** section
3. Select custom agent
4. Save settings
5. Future generations use this agent

**One-Time Use:**
1. In workspace, click **Regenerate**
2. Select **Choose Agent**
3. Pick custom agent
4. Regenerate with selected agent

### Agent Marketplace

Browse and install community agents:

1. Go to **Agents** → **Marketplace**
2. Browse categories:
   - Web Development
   - Mobile Development
   - Backend APIs
   - UI/UX Design
   - DevOps
3. Install agent
4. Configure for your needs
5. Use in projects

### Managing Agents

**Edit Agent:**
1. Go to **Agents** dashboard
2. Click agent to edit
3. Modify settings
4. Save changes

**Duplicate Agent:**
1. Select agent
2. Click **Duplicate**
3. Modify copy
4. Save as new agent

**Delete Agent:**
1. Select agent
2. Click **Delete**
3. Confirm deletion
4. Projects using agent revert to default

---

## Settings and Preferences

### User Settings

Access via **Settings** menu:

#### Profile

- **Name** - Display name
- **Email** - Contact email
- **Avatar** - Profile picture
- **Bio** - Short description
- **Website** - Personal website

#### Preferences

**Interface:**
- **Theme** - Dark/Light/Auto
- **Glow Mode** - Aura FX intensity
- **Layout** - Workspace layout preference
- **Font Size** - Editor font size
- **Font Family** - Editor font

**Editor:**
- **Tab Size** - 2 or 4 spaces
- **Line Numbers** - Show/hide
- **Minimap** - Enable/disable
- **Word Wrap** - Enable/disable
- **Auto Save** - Enable/disable
- **Format on Save** - Auto-format

**Behavior:**
- **Auto Preview** - Update preview on save
- **Auto Sync** - Sync to GitHub automatically
- **Notifications** - Email/in-app notifications
- **Keyboard Shortcuts** - Customize shortcuts

#### AI Models

Configure model preferences:

**Provider Keys:**
- OpenAI API Key
- Google API Key
- Anthropic API Key
- Grok API Key

**Model Selection:**
- Enable/disable specific models
- Set priority order
- Configure fallbacks
- Set token limits

**Cost Controls:**
- Monthly budget limit
- Cost alerts
- Model cost preferences
- Usage tracking

#### Integrations

Connect external services:

**GitHub:**
- OAuth connection
- Repository access
- Webhook configuration
- Personal access token

**Vercel:**
- Account connection
- Team selection
- Deploy permissions

**Analytics:**
- Google Analytics
- Plausible
- Custom analytics

### Project Settings

Per-project configuration:

#### General

- **Project Name**
- **Description**
- **Target Platform**
- **Template Type**
- **Visibility** (Private/Public)

#### Build & Deploy

- **Build Command**
- **Output Directory**
- **Install Command**
- **Development Command**

#### Environment Variables

Add secrets and configuration:
```
NODE_ENV=production
API_URL=https://api.example.com
NEXT_PUBLIC_SITE_NAME=MyApp
```

#### Auto Features

- **Auto Sync** - Sync changes to GitHub
- **Auto Test** - Run tests on changes
- **Auto Deploy** - Deploy on sync
- **Auto Fix** - Apply fixes automatically

#### Agent Configuration

- **Default Agent** - Agent for this project
- **Model Override** - Specific models to use
- **Custom Instructions** - Project-specific prompts

---

## Best Practices

### Writing Effective Prompts

**Be Specific:**
```
❌ Build a todo app
✅ Build a todo app with categories, due dates, priority levels,
   drag-and-drop reordering, and dark mode. Use Aura FX design.
```

**Include Technical Details:**
```
✅ Create a Next.js dashboard with:
   - Chart.js for analytics
   - TailwindCSS for styling
   - Prisma for database
   - NextAuth for authentication
```

**Describe User Experience:**
```
✅ The user should be able to:
   - Create tasks with a quick-add button
   - Filter by category and status
   - Sort by date, priority, or name
   - View tasks in list or kanban view
```

**Specify Design Preferences:**
```
✅ Design style:
   - Dark mode optimized
   - Neon blue/purple accents
   - Glass morphism effects
   - Smooth animations
```

### Organizing Projects

**Folder Structure:**
```
my-app/
├── components/     # Reusable components
├── pages/         # Application pages
├── lib/           # Utilities and helpers
├── styles/        # Global styles
├── public/        # Static assets
├── types/         # TypeScript types
└── tests/         # Test files
```

**File Naming:**
- Use kebab-case: `user-profile.tsx`
- Component files: PascalCase `UserProfile.tsx`
- Test files: `UserProfile.test.tsx`
- Type files: `UserProfile.types.ts`

### Code Quality

**Review Generated Code:**
1. Check for logical errors
2. Verify edge cases are handled
3. Ensure proper error handling
4. Test all user flows
5. Review security practices

**Customize for Your Needs:**
- Add custom business logic
- Integrate with your APIs
- Adjust styling to brand
- Add analytics and monitoring
- Implement additional features

**Keep Dependencies Updated:**
1. Review generated dependencies
2. Update to latest stable versions
3. Remove unused packages
4. Check for security vulnerabilities

### Testing Strategy

**Test Early and Often:**
- Run tests after generation
- Test after each major change
- Test before deploying
- Test on target devices/browsers

**Comprehensive Coverage:**
- Unit test utilities and hooks
- Integration test features
- E2E test critical flows
- Visual test UI components

**Manual Testing:**
- Test on real devices
- Test with real data
- Test edge cases
- Test accessibility

### Deployment Strategy

**Staging First:**
1. Deploy to preview environment
2. Test thoroughly
3. Get stakeholder approval
4. Deploy to production

**Environment Separation:**
- Development: `dev.app.com`
- Staging: `staging.app.com`
- Production: `app.com`

**Rollback Plan:**
- Keep previous deployments
- Document rollback procedure
- Test rollback process
- Monitor after deployment

### Security Best Practices

**Authentication:**
- Use secure authentication
- Implement rate limiting
- Enable 2FA for admin accounts
- Regularly rotate secrets

**Data Protection:**
- Encrypt sensitive data
- Sanitize user inputs
- Validate API requests
- Use HTTPS everywhere

**API Security:**
- Implement API keys
- Use CORS properly
- Rate limit endpoints
- Log security events

### Performance Optimization

**Initial Load:**
- Code splitting
- Lazy loading
- Image optimization
- Font optimization

**Runtime Performance:**
- Minimize re-renders
- Use proper caching
- Optimize database queries
- Implement pagination

**Monitoring:**
- Set up error tracking
- Monitor performance metrics
- Track user analytics
- Set up alerts

---

## Troubleshooting

### Generation Issues

**Generation Fails:**
1. Check AI model API keys
2. Verify prompt is clear
3. Try simpler prompt first
4. Check model quotas
5. Try different model

**Incomplete Generation:**
1. Review generation logs
2. Regenerate missing files
3. Increase token limits
4. Use more capable model

**Poor Code Quality:**
1. Improve prompt specificity
2. Use higher-quality models
3. Add constraints and requirements
4. Regenerate with different agent

### Workspace Issues

**Preview Not Loading:**
1. Check build logs for errors
2. Verify all dependencies installed
3. Check for syntax errors
4. Restart preview server

**Editor Lag:**
1. Close unused files
2. Disable unnecessary extensions
3. Reduce minimap scope
4. Clear editor cache

**Files Not Saving:**
1. Check network connection
2. Verify project permissions
3. Check storage quota
4. Try saving manually

### Sync Issues

**GitHub Sync Fails:**
1. Verify GitHub connection
2. Check repository permissions
3. Ensure branch exists
4. Check for merge conflicts

**Sync Takes Too Long:**
1. Check file sizes
2. Review number of changes
3. Check network connection
4. Try manual sync

**Lost Changes:**
1. Check version history
2. Look in GitHub repository
3. Check local backups
4. Contact support

### Deployment Issues

**Vercel Deploy Fails:**
1. Check build logs
2. Verify environment variables
3. Check build settings
4. Ensure GitHub sync completed

**APK Build Fails:**
1. Check React Native compatibility
2. Verify dependencies
3. Check build logs
4. Ensure valid package name

**Desktop Build Issues:**
1. Verify platform compatibility
2. Check Electron/Tauri config
3. Review build logs
4. Test build locally first

### Common Errors

**API Key Invalid:**
```
Error: Invalid API key for OpenAI
Solution: Update key in Settings → Models
```

**Rate Limit Exceeded:**
```
Error: Rate limit exceeded for Gemini
Solution: Wait and retry, or use different model
```

**Build Failed:**
```
Error: Module not found: 'package-name'
Solution: Add to dependencies or install manually
```

**Database Connection Failed:**
```
Error: Can't connect to database
Solution: Check DATABASE_URL environment variable
```

### Getting Help

**Documentation:**
- [Getting Started Guide](../getting-started.md)
- [Developer Guide](./developer-guide.md)
- [API Documentation](../api/overview.md)
- [Architecture](../architecture.md)

**Community:**
- [GitHub Issues](https://github.com/SolanaRemix/AiBuild/issues)
- [Discussions](https://github.com/SolanaRemix/AiBuild/discussions)
- [Discord Server](https://discord.gg/aibuild)

**Support:**
- Email: support@aibuild.app
- In-app chat support
- Enterprise support available

---

## Next Steps

Now that you understand how to use AiBuild:

1. **Create your first project** - Put your knowledge to practice
2. **Explore advanced features** - Dive into [Auto Features](../features/index.md)
3. **Join the community** - Share and learn from others
4. **Read developer docs** - Learn to extend and customize [Developer Guide](./developer-guide.md)

---

**Need more help?** Check out our [comprehensive documentation](../README.md) or reach out to the community!
