# 🚀 AiBuild - Full-Stack SaaS Platform

> Multi-Role AI Code Builder with Admin, User, and Developer Control Planes

A production-ready, role-based SaaS platform built with Next.js, TypeScript, Prisma, and NextAuth. Features three distinct control panels with beautiful Aura FX Neo-Glow UI design.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748)](https://www.prisma.io/)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

---

## ✨ Features

### 🔐 Authentication & Security
- **NextAuth v4** with JWT-based credentials provider
- Role-based authentication (ADMIN, USER, DEV)
- Automatic role-based routing and middleware protection
- Production secret validation
- Prisma singleton pattern for optimal database connections

### 👥 Three Role-Based Panels

#### 🛡️ Admin Panel (`/admin`)
- User management (view, edit, delete, assign roles)
- Plugin manager with AI model toggles
- System logs and analytics viewer
- Plans & billing oversight
- Feature flags configuration

#### 👤 User Panel (`/dashboard`)
- Project creation and management
- Billing and subscription management
- Profile settings and customization
- Agent configuration
- Quest and affiliate tracking

#### 🧑‍💻 Developer Panel (`/dev`)
- Deployment history and status
- Real-time application logs
- SDK & API key management
- Webhook configuration
- System status monitoring

### 🎨 UI/UX Design
- **Aura FX Neo-Glow** theme (Blue/Green/Purple)
- Dark mode by default
- Glassmorphism and neon glow effects
- Fully responsive (mobile + desktop)
- Accessible components (ARIA labels, screen reader support)

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 20.x (LTS) or higher
- **pnpm** (recommended) or npm
- **PostgreSQL** database (local or cloud via [Neon.tech](https://neon.tech))

### 1. Install Dependencies

```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install --legacy-peer-deps
```

### 2. Environment Configuration

Create a `.env` file in the project root:

```env
# Database Connection
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-random-secret"  # Generate: openssl rand -base64 32
```

### 3. Database Setup

```bash
# Generate Prisma client
pnpm exec prisma generate

# Create database schema
pnpm exec prisma db push

# Seed database with default users
pnpm run db:seed
```

<details>
<summary>Using npm instead of pnpm</summary>

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```
</details>

### 4. Run Development Server

```bash
# Start the development server
pnpm dev

# Server will be available at http://localhost:3000
```

### 5. Login with Default Credentials

| Role      | Email              | Password   | Access Panel |
|-----------|-------------------|------------|--------------|
| Admin     | admin@admin.com   | Admin123$  | `/admin`     |
| User      | user@aibuild.com  | Admin123$  | `/dashboard` |
| Developer | dev@aibuild.com   | Admin123$  | `/dev`       |

---

## 📦 Available Commands

### Development

```bash
# Start development server with hot reload
pnpm dev

# Run TypeScript type checking
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

### Database Management

```bash
# Generate Prisma client (after schema changes)
pnpm exec prisma generate

# Push schema changes to database (development)
pnpm exec prisma db push

# Create a new migration (production-ready)
pnpm exec prisma migrate dev --name migration_name

# Apply migrations in production
pnpm exec prisma migrate deploy

# Seed database with initial data
pnpm run db:seed

# Open Prisma Studio (database GUI)
pnpm exec prisma studio
```

### Testing & Quality

```bash
# Run type checking
pnpm lint

# Format code
pnpm format  # if configured

# Run tests
pnpm test    # if configured
```

---

## 🗂️ Project Structure

```
.
├── app/                      # Next.js App Router
│   ├── (app)/               # Protected app routes
│   │   ├── admin/           # Admin panel pages
│   │   ├── dashboard/       # User dashboard pages
│   │   └── dev/             # Developer panel pages
│   ├── api/                 # API routes
│   │   └── auth/            # NextAuth endpoints
│   ├── login/               # Shared login page
│   └── layout.tsx           # Root layout
│
├── components/              # React components
│   ├── aura/               # Glow UI components
│   ├── admin/              # Admin-specific components
│   ├── dashboard/          # Dashboard components
│   ├── dev/                # Dev panel components
│   └── auth/               # Authentication components
│
├── lib/                     # Utility libraries
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma singleton
│   └── utils.ts            # Helper functions
│
├── prisma/                  # Database
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding
│
├── types/                   # TypeScript type definitions
├── middleware.ts            # Next.js middleware (auth)
├── .env.example            # Environment variables template
└── README.md               # This file
```

---

## 🗄️ Database Schema

### Models

- **User** - User accounts with role-based access
- **Project** - User-created projects
- **Deployment** - Deployment history and status

### Roles

- `ADMIN` - Full system access
- `USER` - Standard user access
- `DEV` - Developer tool access

See [`prisma/schema.prisma`](./prisma/schema.prisma) for complete schema definition.

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your production URL)
4. Deploy!

### Environment Variables

Required for production:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Secret for JWT signing (32+ characters)
- `NEXTAUTH_URL` - Public URL of your application

### CI/CD

The project includes a GitHub Actions workflow at `.github/workflows/ci-deploy.yml` that:

- Installs dependencies with pnpm
- Generates Prisma client
- Runs linting and type checking
- Builds the application
- Deploys to Vercel (on main branch)

Required GitHub Secrets:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## 🎨 UI Components

### Aura FX Glow Components

- `GlowButton` - Neon-glow button with hover effects
- `GlowCard` - Glassy card with gradient borders
- `GlowInput` - Styled input with focus ring
- `GlowTabs` - Tabbed navigation
- `GlowBadge` - Status badges
- `GlowSidebar` - Navigation sidebar

All components support:
- Dark mode
- Responsive design
- Accessibility (ARIA attributes)
- TypeScript type safety

---

## 🔒 Security

- ✅ Passwords hashed with bcrypt (10 rounds)
- ✅ JWT-based session management
- ✅ HTTP-only cookies
- ✅ Role-based access control via middleware
- ✅ Production secret validation
- ✅ Environment variable security
- ✅ Prisma singleton pattern (prevents connection leaks)

---

## 🛠️ Troubleshooting

### Database Connection Issues

```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Test database connection
pnpm exec prisma db push
```

### Build Errors

```bash
# Regenerate Prisma client
pnpm exec prisma generate

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules && pnpm install
```

### Authentication Issues

- Ensure `NEXTAUTH_SECRET` is set and matches across environments
- Verify `NEXTAUTH_URL` matches your domain
- Clear browser cookies and try again

---

## 📚 Documentation

- [Architecture Documentation](./ARCHITECTURE.md) - Complete system architecture
- [Setup Guide](./README_SETUP.md) - Detailed installation guide
- [Contributing Guidelines](./CONTRIBUTING.md) - How to contribute (if exists)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Database with [Prisma](https://www.prisma.io/)
- Authentication with [NextAuth.js](https://next-auth.js.org/)

---

## 📧 Support

For issues and questions:
- 🐛 [Report a bug](https://github.com/SolanaRemix/AiBuild/issues)
- 💡 [Request a feature](https://github.com/SolanaRemix/AiBuild/issues)
- 📖 [View documentation](./ARCHITECTURE.md)

---

**Maintained by [SolanaRemix](https://github.com/SolanaRemix)**

Repository: [github.com/SolanaRemix/AiBuild](https://github.com/SolanaRemix/AiBuild)
