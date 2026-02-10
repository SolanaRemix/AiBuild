# AiBuild - Setup & Installation Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 20.x (LTS)
- PostgreSQL database (local or cloud via Neon.tech)
- npm or pnpm

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database - Get this from Neon.tech or your PostgreSQL instance
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth - Generate a secure secret: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-random-secret-key-here"
```

### 3. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma db push

# Seed with default users
npm run db:seed
```

This will create 3 users:
- **Admin**: admin@admin.com / Admin123$
- **User**: user@aibuild.com / Admin123$
- **Developer**: dev@aibuild.com / Admin123$

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Default Login Credentials

| Role      | Email              | Password   | Access       |
|-----------|--------------------|------------|--------------|
| Admin     | admin@admin.com    | Admin123$  | `/admin`     |
| User      | user@aibuild.com   | Admin123$  | `/dashboard` |
| Developer | dev@aibuild.com    | Admin123$  | `/dev`       |

---

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

---

## 🗃️ Database Commands

```bash
# Generate Prisma Client (after schema changes)
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Create a migration (production-ready)
npx prisma migrate dev --name <migration_name>

# Apply migrations (production)
npx prisma migrate deploy

# Seed database
npm run db:seed

# Open Prisma Studio (database GUI)
npx prisma studio
```

---

## 📁 Project Structure

```
/app
  /login              # Shared login page
  /api/auth           # NextAuth API routes
  /(app)              # Protected app routes
    /admin            # Admin panel (ADMIN role only)
    /dashboard        # User panel (USER role default)
    /dev              # Developer panel (DEV role only)

/components
  /aura               # Glow UI components
  /auth               # Auth provider components
  /admin              # Admin-specific components
  /dashboard          # Dashboard components
  /dev                # Dev panel components

/lib
  auth.ts             # NextAuth configuration
  sidebar-config.ts   # Navigation configuration

/prisma
  schema.prisma       # Database schema
  seed.ts             # Database seeding script

/types
  next-auth.d.ts      # NextAuth type extensions
```

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom Glow components + Radix UI
- **Authentication**: NextAuth.js v4
- **Database**: PostgreSQL
- **ORM**: Prisma v7
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

---

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
4. Deploy!

### GitHub Actions

The project includes a CI/CD workflow at `.github/workflows/ci-deploy.yml` that:
- Runs linting
- Builds the application
- Applies database migrations
- Deploys to Vercel (on main branch)

Required GitHub Secrets:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

---

## 🎨 UI/UX Design

- **Theme**: Dark mode with neon glow effects
- **Colors**: Green → Purple → Blue gradient accents
- **Typography**: Geist (sans) and Geist Mono
- **Layout**: Responsive, mobile-first
- **Style**: Glassmorphism with rounded frames

---

## 📋 Feature Overview

### Admin Panel
- User management
- Plugin (AI model) management with toggle
- Plans & billing overview
- System logs viewer
- Analytics dashboard

### User Panel
- Project dashboard
- Project creation and management
- Billing overview
- Profile settings

### Developer Panel
- Deployment history
- Real-time logs viewer
- API key management
- Webhook configuration
- System status monitoring

---

## 🔒 Security

- Passwords hashed with bcrypt
- JWT-based session management
- Role-based access control via middleware
- HTTP-only cookies
- Environment variables for secrets

---

## 📚 Documentation

- `ARCHITECTURE.md` - Complete system architecture
- `README_SETUP.md` - This file
- See `docs/` folder for additional documentation

---

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check if PostgreSQL is running
- Ensure database exists

### Build Errors
- Run `npx prisma generate` after schema changes
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install --legacy-peer-deps`

### Authentication Issues
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches your domain
- Clear browser cookies

---

## 📝 License

MIT

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

For more information, see `ARCHITECTURE.md`
