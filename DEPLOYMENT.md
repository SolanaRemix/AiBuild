# 🚢 Vercel Deployment Guide

Complete guide for deploying AiBuild to Vercel with proper configuration and environment variables.

---

## 📋 Prerequisites

Before deploying, ensure you have:

1. A **Vercel account** ([sign up here](https://vercel.com/signup))
2. A **PostgreSQL database** (recommended: [Neon.tech](https://neon.tech), [Supabase](https://supabase.com), or [Railway](https://railway.app))
3. Your code pushed to a **GitHub repository**

---

## 🔧 Required Environment Variables

AiBuild requires the following environment variables for both **build time** and **runtime**:

### 1. Database Configuration

| Variable | Purpose | Required | Example |
|----------|---------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ Build + Runtime | `postgresql://user:pass@host:5432/db` |

**How to get it:**
- **Neon.tech**: Dashboard → Connection Details → Copy connection string
- **Supabase**: Project Settings → Database → Connection string → URI
- **Railway**: Database → Connect → Copy connection URL

### 2. Authentication Configuration

| Variable | Purpose | Required | Example |
|----------|---------|----------|---------|
| `NEXTAUTH_SECRET` | JWT signing secret | ✅ Build + Runtime | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Public app URL | ✅ Runtime | `https://your-app.vercel.app` |

**Generate `NEXTAUTH_SECRET`:**
```bash
# On Linux/macOS/WSL
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# Or use Node.js (cross-platform)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Online generator (fallback)
# Visit: https://generate-secret.vercel.app/32
```

---

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Import Project**
   ```
   1. Go to https://vercel.com/new
   2. Select "Import Git Repository"
   3. Choose your GitHub repository
   ```

2. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Build Command**: `pnpm run build`
   - **Output Directory**: `.next` (default)
   - **Install Command**: `pnpm install --no-frozen-lockfile`
   - **Development Command**: `pnpm run dev`

3. **Add Environment Variables**
   ```
   Project Settings → Environment Variables → Add
   ```

   Add all three variables:
   - `DATABASE_URL` → Paste your PostgreSQL connection string
   - `NEXTAUTH_SECRET` → Paste generated secret (32+ characters)
   - `NEXTAUTH_URL` → Set to `https://your-project.vercel.app`

   **Important:** Set environment for **Production**, **Preview**, and **Development**

4. **Deploy**
   ```
   Click "Deploy" and wait for the build to complete
   ```

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Navigate to project directory
cd /path/to/AiBuild

# Deploy (follow prompts)
vercel

# For production deployment
vercel --prod
```

**Set environment variables via CLI:**
```bash
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
vercel env add NEXTAUTH_URL production
```

---

## 🗄️ Database Setup

After deploying, you need to initialize your database:

### 1. Run Migrations

```bash
# Via Vercel CLI (from local machine)
vercel env pull .env.local
pnpm exec prisma migrate deploy

# Or via Vercel dashboard
# Project → Settings → Functions → Add CRON job
# Run: pnpm exec prisma migrate deploy
```

### 2. Seed Database (Optional)

```bash
# For development only - creates demo users
pnpm run db:seed

# Default users created:
# - admin@admin.com / Admin123$ (ADMIN)
# - user@aibuild.com / Admin123$ (USER)
# - dev@aibuild.com / Admin123$ (DEV)
```

**⚠️ Warning:** Never run `db:seed` in production without `ALLOW_SEED_PRODUCTION=true`

---

## 🔒 Security Best Practices

### 1. Rotate Secrets Regularly

```bash
# Generate new NEXTAUTH_SECRET
openssl rand -base64 32

# Update in Vercel
vercel env rm NEXTAUTH_SECRET production
vercel env add NEXTAUTH_SECRET production
```

### 2. Use Database Connection Pooling

For production, enable connection pooling:

**Neon.tech:**
```
DATABASE_URL="postgresql://user:pass@host:5432/db?pgbouncer=true&connection_limit=1"
```

**Supabase:**
```
DATABASE_URL="postgresql://user:pass@host:6543/postgres?pgbouncer=true"
```

### 3. Enable Vercel's Security Features

- **DDoS Protection**: Enabled by default
- **Firewall Rules**: Project → Settings → Firewall
- **Environment Variable Encryption**: Automatic
- **HTTPS**: Enforced automatically

---

## 🏗️ Next.js Configuration

The project includes optimal Next.js configuration in `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ASSUMPTION: App Router with default output mode
  // For Docker/self-hosted, add: output: 'standalone'
}

export default nextConfig
```

**For standalone deployment (Docker):**
```javascript
const nextConfig = {
  output: 'standalone',
}
```

---

## 📊 Monitoring & Logs

### View Deployment Logs

```bash
# Via CLI
vercel logs

# Or via Dashboard
Project → Deployments → Click deployment → View Logs
```

### Common Build Errors

#### Error: `DATABASE_URL is not defined`
**Solution:** Add `DATABASE_URL` to environment variables in Vercel dashboard

#### Error: `NEXTAUTH_SECRET is not defined`
**Solution:** Add `NEXTAUTH_SECRET` to environment variables

#### Error: `Prisma Client not generated`
**Solution:** Ensure build command includes `prisma generate`
```bash
# Check vercel.json or package.json postinstall script
"postinstall": "prisma generate"
```

#### Error: `Cannot connect to database`
**Solution:** 
1. Verify `DATABASE_URL` is correct
2. Check database is accessible from Vercel IPs
3. Enable connection pooling

---

## 🔄 CI/CD Integration

The project includes automatic deployments via GitHub Actions:

### GitHub Secrets Required

Add these secrets to your repository:
```
Settings → Secrets and variables → Actions → New repository secret
```

| Secret | Description | How to Get |
|--------|-------------|------------|
| `DATABASE_URL` | PostgreSQL connection | Your database provider |
| `NEXTAUTH_SECRET` | JWT secret | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Production URL | `https://your-app.vercel.app` |
| `VERCEL_TOKEN` | Vercel API token | Vercel → Account Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel org ID | Run `vercel link` locally |
| `VERCEL_PROJECT_ID` | Project ID | Run `vercel link` locally |

### Workflow Behavior

- **Pull Requests**: Runs lint + build checks (uses test env vars)
- **Push to `main`**: Deploys to production + runs migrations

---

## 🧪 Testing Deployment

After deploying, verify everything works:

### 1. Check Health

```bash
curl https://your-app.vercel.app/api/health
```

### 2. Test Login

Visit: `https://your-app.vercel.app/login`

Use demo credentials:
- `admin@admin.com` / `Admin123$`
- `user@aibuild.com` / `Admin123$`
- `dev@aibuild.com` / `Admin123$`

### 3. Verify Role-Based Access

- `/admin` → ADMIN only
- `/dashboard` → USER only
- `/dev` → DEV only

---

## 📝 Post-Deployment Checklist

- [ ] All environment variables set correctly
- [ ] Database migrations applied (`prisma migrate deploy`)
- [ ] Database seeded (development only)
- [ ] Login page accessible
- [ ] Role-based routing works
- [ ] All three panels accessible with correct credentials
- [ ] HTTPS enabled (automatic)
- [ ] Custom domain configured (optional)
- [ ] Monitoring/alerts configured (optional)

---

## 🆘 Troubleshooting

### Deployment fails with network errors
**Google Fonts fetching issue in CI**

If you see font fetch errors, this is due to firewall restrictions in CI/CD environments. The build will still succeed in Vercel's environment where external requests are allowed.

### Database connection timeout
**Check connection pooling and limits**

```bash
# Add to DATABASE_URL
?connection_limit=1&pool_timeout=10
```

### Redirect loop after login
**Verify NEXTAUTH_URL matches deployment URL**

```bash
# Should be your actual domain
NEXTAUTH_URL=https://your-app.vercel.app
```

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma Deployment](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js Deployment](https://next-auth.js.org/deployment)

---

## 💡 Pro Tips

1. **Use Preview Deployments**: Every PR gets a preview URL automatically
2. **Enable Analytics**: Vercel → Project → Analytics → Enable
3. **Set up Alerts**: Get notified of deployment failures
4. **Use Edge Functions**: For better global performance
5. **Enable Caching**: Configure `Cache-Control` headers

---

**Need Help?** Open an issue at [github.com/SolanaRemix/AiBuild/issues](https://github.com/SolanaRemix/AiBuild/issues)
