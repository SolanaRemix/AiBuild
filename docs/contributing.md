# 🤝 Contributing to AiBuild

Thank you for your interest in contributing to AiBuild! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Our Standards

**Examples of behavior that contributes to a positive environment:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Examples of unacceptable behavior:**
- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher
- **Git** for version control
- **PostgreSQL** database
- A **GitHub account**

### Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:

```bash
git clone https://github.com/YOUR_USERNAME/AiBuild.git
cd AiBuild
```

3. **Add upstream remote**:

```bash
git remote add upstream https://github.com/SolanaRemix/AiBuild.git
```

4. **Install dependencies**:

```bash
pnpm install
```

5. **Set up environment**:

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

6. **Initialize database**:

```bash
pnpm prisma migrate dev
```

7. **Start development server**:

```bash
pnpm dev
```

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `chore/` - Maintenance tasks

### 2. Make Changes

- Write clean, readable code
- Follow the [code standards](#code-standards)
- Add tests for new features
- Update documentation as needed
- Keep commits focused and atomic

### 3. Commit Changes

Write clear, descriptive commit messages:

```bash
git add .
git commit -m "feat: add project template selection"
```

**Commit message format:**

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `chore:` - Maintenance tasks

**Examples:**

```bash
feat(workspace): add file tree search functionality
fix(deploy): resolve Vercel environment variable issue
docs(api): update authentication section
refactor(ai): simplify model routing logic
test(projects): add integration tests for project creation
```

### 4. Keep Your Branch Updated

Regularly sync with upstream:

```bash
git fetch upstream
git rebase upstream/main
```

### 5. Push Changes

Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

### 6. Open Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill out the PR template
5. Submit the pull request

## Code Standards

### TypeScript

- **Use TypeScript** for all new code
- **Enable strict mode** - No `any` types without justification
- **Define interfaces** for complex objects
- **Export types** that may be reused

**Good:**
```typescript
interface UserProfile {
  id: string
  name: string
  email: string
  createdAt: Date
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  // Implementation
}
```

**Bad:**
```typescript
export async function getUserProfile(userId: any): Promise<any> {
  // Implementation
}
```

### Code Style

- **Use Prettier** for formatting (automatic on save)
- **Use ESLint** for linting
- **2 spaces** for indentation
- **Single quotes** for strings
- **Semicolons** at end of statements
- **Trailing commas** in multi-line objects/arrays

### Naming Conventions

- **camelCase** for variables and functions
- **PascalCase** for types, interfaces, and components
- **UPPER_CASE** for constants
- **kebab-case** for file names

```typescript
// Variables and functions
const userName = "John Doe"
function fetchUserData() {}

// Types and interfaces
interface UserProfile {}
type ProjectStatus = "draft" | "ready"

// Components
function UserCard() {}

// Constants
const MAX_RETRY_ATTEMPTS = 3

// Files
user-profile.tsx
project-service.ts
```

### React Components

- **Use functional components** with hooks
- **Use TypeScript** for prop types
- **Avoid inline functions** in JSX when possible
- **Use semantic HTML**
- **Add accessibility attributes**

**Good:**
```typescript
interface UserCardProps {
  user: User
  onEdit: (userId: string) => void
}

export function UserCard({ user, onEdit }: UserCardProps) {
  const handleEdit = useCallback(() => {
    onEdit(user.id)
  }, [user.id, onEdit])

  return (
    <div role="article" aria-label={`Profile of ${user.name}`}>
      <h2>{user.name}</h2>
      <button type="button" onClick={handleEdit}>
        Edit
      </button>
    </div>
  )
}
```

### Button Types in Forms

**Important:** Always specify explicit button types inside forms:

```typescript
// Good - Explicit type
<form>
  <button type="button" onClick={handleCancel}>Cancel</button>
  <button type="submit">Submit</button>
</form>

// Bad - Missing type (defaults to submit)
<form>
  <button onClick={handleCancel}>Cancel</button>
  <button>Submit</button>
</form>
```

### API Keys in Documentation

Always use the `sk_example_` prefix for mock API keys:

```typescript
// Good
const apiKey = "sk_example_abc123def456"

// Bad - Hard-coded key committed to source
const apiKey = "sk_example_live_abc123def456"
```

### Comments

- **Write self-documenting code** when possible
- **Add comments** for complex logic
- **Use JSDoc** for functions and classes
- **Explain "why"** not "what"

```typescript
/**
 * Generates a unique slug from a project name.
 * Handles special characters and ensures uniqueness.
 */
export function generateProjectSlug(name: string, existingSlugs: string[]): string {
  // Remove special characters and convert to lowercase
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  // Add numeric suffix if slug already exists
  let slug = baseSlug
  let counter = 1
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}
```

## Testing Guidelines

### Test Coverage

- **Aim for 80%+ coverage** for new code
- **Test edge cases** and error conditions
- **Test user-facing functionality** thoroughly
- **Mock external dependencies**

### Test Structure

Use **Arrange-Act-Assert** pattern:

```typescript
describe('ProjectService', () => {
  describe('createProject', () => {
    it('should create a project with valid input', async () => {
      // Arrange
      const input = {
        name: 'Test Project',
        prompt: 'Build a todo app',
        primaryTarget: 'web' as const,
      }

      // Act
      const project = await projectService.createProject(userId, input)

      // Assert
      expect(project.name).toBe('Test Project')
      expect(project.userId).toBe(userId)
      expect(project.status).toBe('draft')
    })
  })
})
```

### Test Types

**Unit Tests:**
```bash
pnpm test:unit
```

**Integration Tests:**
```bash
pnpm test:integration
```

**E2E Tests:**
```bash
pnpm test:e2e
```

**All Tests:**
```bash
pnpm test
```

## Pull Request Process

### Before Submitting

1. **Run tests**: Ensure all tests pass
   ```bash
   pnpm test
   ```

2. **Run linter**: Fix any linting errors
   ```bash
   pnpm lint
   ```

3. **Build project**: Ensure it builds successfully
   ```bash
   pnpm build
   ```

4. **Update documentation**: Add/update relevant docs

5. **Check types**: Ensure TypeScript compiles
   ```bash
   pnpm type-check
   ```

### PR Template

Fill out the PR template completely:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project standards
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### PR Guidelines

- **Keep PRs focused** - One feature/fix per PR
- **Write clear descriptions** - Explain what and why
- **Reference issues** - Link related issues
- **Request reviews** - Tag relevant reviewers
- **Respond to feedback** - Address review comments promptly
- **Keep it up to date** - Rebase on main regularly

### Review Process

1. **Automated checks** run first (tests, linting, build)
2. **Code review** by maintainers
3. **Feedback** - Address any comments
4. **Approval** - At least one approval required
5. **Merge** - Maintainers will merge when ready

## Issue Guidelines

### Reporting Bugs

Use the bug report template:

```markdown
**Describe the bug**
Clear description of the issue

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment**
- OS: [e.g., macOS]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]
```

### Feature Requests

Use the feature request template:

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
What you want to happen

**Describe alternatives you've considered**
Alternative solutions

**Additional context**
Any other context
```

### Issue Labels

- `bug` - Something isn't working
- `feature` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `question` - Further information requested

## Community

### Communication Channels

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - Questions and ideas
- **Pull Requests** - Code contributions

### Getting Help

- Check existing documentation
- Search existing issues
- Ask in GitHub Discussions
- Review code examples

### Recognition

Contributors are recognized in:
- Release notes
- Contributors page
- Special thanks in documentation

## Development Tips

### Useful Commands

```bash
# Development
pnpm dev                  # Start dev server
pnpm build               # Build for production
pnpm start               # Start production server

# Testing
pnpm test                # Run all tests
pnpm test:watch          # Run tests in watch mode
pnpm test:coverage       # Generate coverage report

# Code Quality
pnpm lint                # Run ESLint
pnpm lint:fix            # Fix linting issues
pnpm format              # Format with Prettier
pnpm type-check          # Check TypeScript types

# Database
pnpm prisma studio       # Open Prisma Studio
pnpm prisma migrate dev  # Run migrations
pnpm prisma generate     # Generate Prisma client
```

### Debugging

- Use VS Code debugger
- Add breakpoints in code
- Use `console.log` sparingly
- Check browser DevTools
- Review server logs

### Performance

- Use React DevTools Profiler
- Monitor bundle sizes
- Use Lighthouse for audits
- Profile database queries
- Check memory usage

## Areas for Contribution

### High Priority

- Bug fixes
- Documentation improvements
- Test coverage
- Performance optimizations
- Accessibility improvements

### Feature Ideas

- New AI model integrations
- Additional deployment targets
- Enhanced testing capabilities
- Improved UI/UX
- Plugin system enhancements

### Good First Issues

Look for issues labeled `good first issue`:
- Documentation updates
- Minor bug fixes
- Test additions
- Code style improvements

## Questions?

If you have questions about contributing:

1. Check the [documentation](./README.md)
2. Search [existing issues](https://github.com/SolanaRemix/AiBuild/issues)
3. Ask in [Discussions](https://github.com/SolanaRemix/AiBuild/discussions)
4. Reach out to maintainers

---

Thank you for contributing to AiBuild! 🚀

Your contributions help make AI-powered development more accessible to everyone.
