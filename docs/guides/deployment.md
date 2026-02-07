# 🚀 AiBuild Deployment Guide

Comprehensive guide for deploying AiBuild applications across all platforms.

## Table of Contents

1. [Deployment Strategies](#deployment-strategies)
2. [Vercel Deployment (Web)](#vercel-deployment-web)
3. [Mobile APK Builds](#mobile-apk-builds)
4. [Desktop Application Builds](#desktop-application-builds)
5. [Environment Configuration](#environment-configuration)
6. [Domain Setup](#domain-setup)
7. [CI/CD Integration](#cicd-integration)
8. [Monitoring and Maintenance](#monitoring-and-maintenance)
9. [Troubleshooting Deployments](#troubleshooting-deployments)

---

## Deployment Strategies

### Overview

AiBuild supports three deployment targets:

- **Web** → Vercel (primary), Netlify, or self-hosted
- **Mobile** → Android APK (iOS coming soon)
- **Desktop** → Electron/Tauri installers (Windows, macOS, Linux)

### Deployment Flow

```
┌─────────────┐
│   Prompt    │
└──────┬──────┘
       │
       v
┌─────────────┐
│  Generate   │
└──────┬──────┘
       │
       v
┌─────────────┐
│   Review    │
└──────┬──────┘
       │
       v
┌─────────────┐
│  Sync Git   │
└──────┬──────┘
       │
       v
┌─────────────┐
│   Deploy    │
└──────┬──────┘
       │
       v
┌─────────────┐
│    Live     │
└─────────────┘
```

### Pre-Deployment Checklist

**Code Quality:**
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] Linting passed
- [ ] Code reviewed

**Configuration:**
- [ ] Environment variables configured
- [ ] Secrets properly set
- [ ] Build settings verified
- [ ] Domain configured (if applicable)

**Testing:**
- [ ] Local testing completed
- [ ] Preview deployment tested
- [ ] Cross-browser tested (web)
- [ ] Device tested (mobile/desktop)

**Documentation:**
- [ ] README updated
- [ ] Deployment notes added
- [ ] Changelog updated
- [ ] User guide current

---

## Vercel Deployment (Web)

### Why Vercel?

- **Optimized for Next.js** - Native support
- **Global CDN** - Fast edge network
- **Automatic HTTPS** - Free SSL certificates
- **Preview Deployments** - Every Git push
- **Serverless Functions** - API routes scale automatically
- **Analytics** - Built-in performance monitoring

### Initial Setup

#### 1. Install Vercel CLI

```bash
npm i -g vercel
vercel login
```

#### 2. Link Project

```bash
cd your-project
vercel link
```

Follow prompts:
```
? Set up and deploy "~/your-project"? [Y/n] y
? Which scope do you want to deploy to? Your Name
? Link to existing project? [y/N] n
? What's your project's name? your-project
? In which directory is your code located? ./
```

#### 3. Configure Project

Create `vercel.json`:

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["iad1", "sfo1"],
  "env": {
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_SECRET": "@nextauth_secret"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_APP_URL": "https://your-app.vercel.app"
    }
  }
}
```

### Deployment Methods

#### Method 1: Through AiBuild UI

1. **Open workspace** for your project
2. Click **Deploy** button
3. Select **Vercel**
4. **Configure deployment:**
   ```
   Project Name: my-awesome-app
   Branch: main
   Environment: Production
   ```
5. Click **Deploy**
6. Monitor progress in Logs panel
7. Visit deployment URL when complete

#### Method 2: Vercel CLI

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

#### Method 3: Git Integration (Recommended)

1. **Connect GitHub:**
   - Go to Vercel dashboard
   - Click "Add New Project"
   - Import from GitHub
   - Select repository

2. **Configure Build:**
   ```
   Framework Preset: Next.js
   Root Directory: ./
   Build Command: pnpm build
   Output Directory: .next
   Install Command: pnpm install
   ```

3. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add production secrets
   - Save configuration

4. **Deploy:**
   - Automatic on every push to main
   - Preview on every PR

### Environment Variables

#### Add via Vercel Dashboard

1. Go to Project Settings → Environment Variables
2. Add variables:

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your_secret_here

# AI Models
OPENAI_API_KEY=sk_...
GOOGLE_API_KEY=...
ANTHROPIC_API_KEY=...

# GitHub Integration
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITHUB_TOKEN=...

# Vercel Integration (for nested deployments)
VERCEL_TOKEN=...
```

3. Select environments:
   - ☑️ Production
   - ☑️ Preview
   - ☑️ Development

#### Add via CLI

```bash
# Add secret
vercel env add DATABASE_URL production

# Pull secrets locally
vercel env pull .env.local
```

### Build Configuration

#### Custom Build Command

If you need custom build steps:

```json
{
  "scripts": {
    "vercel-build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

#### Build Performance

**Optimize Build Time:**

```typescript
// next.config.js
module.exports = {
  // Skip type checking during build (run in CI separately)
  typescript: {
    ignoreBuildErrors: false,
  },
  // Skip linting during build
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Reduce bundle size
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}
```

### Advanced Configuration

#### Custom Domains

1. **Add domain in Vercel:**
   - Project Settings → Domains
   - Add domain: `yourdomain.com`
   - Add `www.yourdomain.com` (optional)

2. **Configure DNS:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Verify domain:**
   - Wait for DNS propagation (up to 48h)
   - Vercel auto-provisions SSL

#### Edge Functions

Deploy API routes to edge locations:

```typescript
// app/api/health/route.ts
export const runtime = 'edge'

export async function GET() {
  return new Response(JSON.stringify({ status: 'ok' }), {
    headers: { 'content-type': 'application/json' },
  })
}
```

#### Redirects and Rewrites

```typescript
// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
}
```

#### Caching Strategy

```typescript
// app/api/projects/route.ts
export async function GET() {
  const projects = await getProjects()
  
  return new Response(JSON.stringify(projects), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
```

### Monitoring

#### Vercel Analytics

Enable in dashboard:
1. Project Settings → Analytics
2. Enable Web Analytics
3. View metrics in dashboard

#### Custom Monitoring

```typescript
// lib/monitoring.ts
export function trackDeployment(info: {
  version: string
  environment: string
  timestamp: Date
}) {
  // Send to monitoring service
  fetch('https://your-monitoring.com/events', {
    method: 'POST',
    body: JSON.stringify({
      type: 'deployment',
      ...info
    })
  })
}
```

### Rollback

#### Quick Rollback

1. Go to Vercel dashboard
2. Deployments tab
3. Find previous deployment
4. Click "⋯" → Promote to Production

#### Via CLI

```bash
# List deployments
vercel ls

# Promote specific deployment
vercel promote <deployment-url>
```

---

## Mobile APK Builds

### Android App Generation

AiBuild generates React Native apps with Expo for easy APK creation.

### Build Methods

#### Method 1: AiBuild Build Worker (Easiest)

1. **Prepare project:**
   - Ensure target is "mobile"
   - Sync to GitHub first

2. **Start build:**
   - Click **Deploy** → **Build APK**
   - Configure build settings
   - Click **Build**

3. **Build configuration:**
   ```json
   {
     "appName": "MyApp",
     "packageName": "com.mycompany.myapp",
     "versionCode": 1,
     "versionName": "1.0.0",
     "icon": "https://..../icon.png",
     "splash": "https://..../splash.png",
     "orientation": "portrait",
     "permissions": [
       "INTERNET",
       "ACCESS_NETWORK_STATE"
     ]
   }
   ```

4. **Wait for build:**
   - Builds take 5-15 minutes
   - Monitor in Logs panel
   - Download APK when complete

#### Method 2: Expo EAS Build

**Setup:**

```bash
npm install -g eas-cli
eas login
```

**Configure project:**

Create `eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

**Build:**

```bash
# Development build
eas build --profile development --platform android

# Production APK
eas build --profile preview --platform android

# Play Store bundle
eas build --profile production --platform android
```

#### Method 3: Local Build

**Prerequisites:**
- Android Studio
- Java Development Kit (JDK)
- Android SDK

**Build steps:**

```bash
# Install dependencies
npm install

# Generate Android project
npx expo prebuild

# Build APK
cd android
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

### App Configuration

#### App.json

```json
{
  "expo": {
    "name": "MyApp",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#020617"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": ["**/*"],
    "android": {
      "package": "com.mycompany.myapp",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#020617"
      },
      "permissions": [
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ]
    }
  }
}
```

### App Signing

#### Development Signing

Expo manages certificates automatically for development.

#### Production Signing

**Generate keystore:**

```bash
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore my-app.keystore \
  -alias my-app \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Configure in `gradle.properties`:**

```properties
MYAPP_UPLOAD_STORE_FILE=my-app.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-app
MYAPP_UPLOAD_STORE_PASSWORD=***
MYAPP_UPLOAD_KEY_PASSWORD=***
```

**Update `android/app/build.gradle`:**

```gradle
android {
    signingConfigs {
        release {
            storeFile file(MYAPP_UPLOAD_STORE_FILE)
            storePassword MYAPP_UPLOAD_STORE_PASSWORD
            keyAlias MYAPP_UPLOAD_KEY_ALIAS
            keyPassword MYAPP_UPLOAD_KEY_PASSWORD
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### Distribution

#### Internal Testing

**Via AiBuild:**
1. Download APK
2. Share download link
3. Users install directly

**Via Google Play (Internal Testing):**
1. Build app bundle (AAB)
2. Upload to Play Console
3. Add internal testers
4. Share testing link

#### Production Release

**Google Play Store:**

1. **Prepare assets:**
   - App icon (512x512)
   - Feature graphic (1024x500)
   - Screenshots (at least 2)
   - App description
   - Privacy policy URL

2. **Create release:**
   - Build signed AAB
   - Upload to Play Console
   - Complete store listing
   - Set pricing (free/paid)
   - Submit for review

3. **Review process:**
   - Usually 1-3 days
   - Address any issues
   - Approve publication

**Alternative stores:**
- Amazon Appstore
- Samsung Galaxy Store
- F-Droid (open source)
- Direct APK download

### Over-the-Air Updates

Use Expo Updates for instant updates:

```typescript
// app.config.js
export default {
  expo: {
    updates: {
      url: "https://u.expo.dev/your-project-id"
    },
    runtimeVersion: {
      policy: "sdkVersion"
    }
  }
}
```

**Publish update:**

```bash
eas update --branch production --message "Bug fixes"
```

Users get updates automatically without reinstalling.

---

## Desktop Application Builds

### Build Options

**Electron** (Default):
- Mature ecosystem
- Rich features
- Chromium-based
- ~100-200MB installers

**Tauri** (Alternative):
- Smaller size (~10-20MB)
- Better performance
- Rust-based
- More secure

### Electron Builds

#### Setup

```bash
npm install electron electron-builder --save-dev
```

#### Configuration

Create `electron-builder.json`:

```json
{
  "appId": "com.mycompany.myapp",
  "productName": "MyApp",
  "copyright": "Copyright © 2024",
  "directories": {
    "buildResources": "build",
    "output": "dist"
  },
  "files": [
    "out/**/*",
    "node_modules/**/*",
    "package.json"
  ],
  "mac": {
    "category": "public.app-category.productivity",
    "icon": "build/icon.icns",
    "target": ["dmg", "zip"]
  },
  "win": {
    "icon": "build/icon.ico",
    "target": ["nsis", "portable"]
  },
  "linux": {
    "icon": "build/icon.png",
    "target": ["AppImage", "deb", "rpm"],
    "category": "Utility"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true
  }
}
```

#### Main Process

Create `electron/main.ts`:

```typescript
import { app, BrowserWindow } from 'electron'
import path from 'path'

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Load app
  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:3000')
    win.webContents.openDevTools()
  } else {
    win.loadFile('out/index.html')
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

#### Build Scripts

Update `package.json`:

```json
{
  "scripts": {
    "electron:dev": "electron .",
    "electron:build": "next build && electron-builder",
    "electron:build:mac": "electron-builder --mac",
    "electron:build:win": "electron-builder --win",
    "electron:build:linux": "electron-builder --linux"
  }
}
```

#### Build Process

```bash
# Build for all platforms (requires macOS for Mac builds)
npm run electron:build

# Build for specific platform
npm run electron:build:win
npm run electron:build:mac
npm run electron:build:linux
```

**Output:**
```
dist/
├── MyApp-1.0.0.dmg          # macOS
├── MyApp Setup 1.0.0.exe    # Windows installer
├── MyApp 1.0.0.exe          # Windows portable
├── MyApp-1.0.0.AppImage     # Linux AppImage
├── myapp_1.0.0_amd64.deb    # Debian package
└── myapp-1.0.0.x86_64.rpm   # RPM package
```

### Tauri Builds

#### Setup

```bash
# Install Tauri CLI
npm install -D @tauri-apps/cli

# Initialize Tauri
npx tauri init
```

#### Configuration

Edit `src-tauri/tauri.conf.json`:

```json
{
  "package": {
    "productName": "MyApp",
    "version": "1.0.0"
  },
  "build": {
    "beforeBuildCommand": "npm run build",
    "beforeDevCommand": "npm run dev",
    "devPath": "http://localhost:3000",
    "distDir": "../out"
  },
  "tauri": {
    "bundle": {
      "identifier": "com.mycompany.myapp",
      "icon": [
        "icons/32x32.png",
        "icons/128x128.png",
        "icons/icon.icns",
        "icons/icon.ico"
      ],
      "targets": ["dmg", "msi", "deb", "appimage"]
    },
    "windows": [
      {
        "title": "MyApp",
        "width": 1200,
        "height": 800,
        "resizable": true,
        "fullscreen": false
      }
    ]
  }
}
```

#### Build

```bash
# Development
npm run tauri dev

# Production build
npm run tauri build

# Platform-specific
npm run tauri build -- --target x86_64-pc-windows-msvc
npm run tauri build -- --target x86_64-apple-darwin
npm run tauri build -- --target x86_64-unknown-linux-gnu
```

### Auto-Updates

#### Electron Auto-Updater

```typescript
import { autoUpdater } from 'electron-updater'

autoUpdater.setFeedURL({
  provider: 'github',
  owner: 'your-username',
  repo: 'your-repo',
  private: false
})

autoUpdater.checkForUpdatesAndNotify()

autoUpdater.on('update-available', () => {
  // Notify user update is available
})

autoUpdater.on('update-downloaded', () => {
  // Prompt user to restart
  autoUpdater.quitAndInstall()
})
```

#### Tauri Updater

```json
{
  "tauri": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://releases.myapp.com/{{target}}/{{current_version}}"
      ],
      "dialog": true,
      "pubkey": "your-public-key"
    }
  }
}
```

### Code Signing

#### macOS

**Get Apple Developer Certificate:**
1. Join Apple Developer Program
2. Create certificate in Apple Developer portal
3. Download and install certificate

**Sign app:**

```bash
codesign --deep --force --verify --verbose \
  --sign "Developer ID Application: Your Name" \
  MyApp.app
```

**Notarize:**

```bash
xcrun altool --notarize-app \
  --primary-bundle-id "com.mycompany.myapp" \
  --username "your@email.com" \
  --password "@keychain:AC_PASSWORD" \
  --file MyApp.dmg
```

#### Windows

**Get Code Signing Certificate:**
1. Purchase from CA (DigiCert, Sectigo, etc.)
2. Install certificate

**Sign with electron-builder:**

```json
{
  "win": {
    "certificateFile": "cert.pfx",
    "certificatePassword": "your-password",
    "signingHashAlgorithms": ["sha256"],
    "sign": "./customSign.js"
  }
}
```

---

## Environment Configuration

### Environment Tiers

**Development:**
- Local development
- Debug logging enabled
- Hot reload active
- Test data

**Preview/Staging:**
- Feature testing
- Production-like environment
- Real-ish data
- Performance testing

**Production:**
- Live users
- Minimal logging
- Optimized builds
- Real data

### Managing Secrets

#### Development

`.env.local` (not committed):
```env
DATABASE_URL="postgresql://localhost:5432/dev"
OPENAI_API_KEY="sk_test_..."
NEXTAUTH_SECRET="dev-secret"
```

#### Production

**Vercel:**
- Add via dashboard
- Or use `vercel env add`

**Environment files:**
```env
# .env.production
DATABASE_URL="${DATABASE_URL}"
OPENAI_API_KEY="${OPENAI_API_KEY}"
NEXTAUTH_SECRET="${NEXTAUTH_SECRET}"
```

**CI/CD secrets:**
- GitHub Secrets
- GitLab CI/CD Variables
- Environment-specific configs

### Configuration Best Practices

**Use environment variables:**
```typescript
// ✅ Good
const apiKey = process.env.OPENAI_API_KEY

// ❌ Bad
const apiKey = "sk_live_hardcoded"
```

**Validate configuration:**
```typescript
function validateConfig() {
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'OPENAI_API_KEY'
  ]
  
  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required env var: ${key}`)
    }
  }
}

validateConfig()
```

**Type-safe config:**
```typescript
// lib/config.ts
import { z } from 'zod'

const configSchema = z.object({
  database: z.object({
    url: z.string().url(),
  }),
  ai: z.object({
    openai: z.string().startsWith('sk_'),
    google: z.string(),
  }),
  auth: z.object({
    secret: z.string().min(32),
    url: z.string().url(),
  }),
})

export const config = configSchema.parse({
  database: {
    url: process.env.DATABASE_URL,
  },
  ai: {
    openai: process.env.OPENAI_API_KEY,
    google: process.env.GOOGLE_API_KEY,
  },
  auth: {
    secret: process.env.NEXTAUTH_SECRET,
    url: process.env.NEXTAUTH_URL,
  },
})
```

---

## Domain Setup

### Custom Domain Configuration

#### Vercel Domains

1. **Add domain:**
   - Project Settings → Domains
   - Enter domain: `yourdomain.com`

2. **Configure DNS:**

**Option A: Vercel Nameservers (Recommended)**
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: A/CNAME Records**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

3. **Wait for propagation** (up to 48 hours)
4. **SSL auto-provisioned** by Vercel

#### Custom Domain Providers

**Cloudflare:**
1. Add site to Cloudflare
2. Update nameservers at registrar
3. Add DNS records
4. Set SSL/TLS to "Full"
5. Enable Cloudflare proxy (orange cloud)

**Route53 (AWS):**
1. Create hosted zone
2. Update nameservers at registrar
3. Add A/CNAME records
4. Point to Vercel IPs

**Namecheap:**
1. Go to Advanced DNS
2. Add records:
   ```
   A Record: @ → 76.76.21.21
   CNAME: www → cname.vercel-dns.com
   ```
3. Save changes

### SSL/TLS Configuration

**Automatic (Recommended):**
- Vercel auto-provisions Let's Encrypt certificates
- Renews automatically
- No configuration needed

**Custom Certificate:**
1. Obtain certificate from CA
2. Upload to Vercel:
   - Settings → Domains → Certificate
   - Upload `.crt` and `.key` files

### Subdomain Setup

**Multiple Environments:**
```
app.yourdomain.com      → Production
staging.yourdomain.com  → Staging
dev.yourdomain.com      → Development
```

**Configuration:**
```
Type: CNAME
Name: app
Value: cname.vercel-dns.com

Type: CNAME
Name: staging
Value: staging-cname.vercel-dns.com
```

---

## CI/CD Integration

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'
      
      - name: Install dependencies
        run: pnpm install
      
      - name: Run tests
        run: pnpm test
      
      - name: Type check
        run: pnpm type-check
      
      - name: Lint
        run: pnpm lint

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Mobile Build Workflow

```yaml
name: Build APK

on:
  workflow_dispatch:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: npm install
      
      - name: Build APK
        run: eas build --platform android --non-interactive
      
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-release
          path: '*.apk'
```

### Desktop Build Workflow

```yaml
name: Build Desktop

on:
  workflow_dispatch:
  push:
    tags:
      - 'v*'

jobs:
  build:
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    
    runs-on: ${{ matrix.os }}
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run electron:build
      
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: ${{ matrix.os }}-build
          path: dist/*
```

---

## Monitoring and Maintenance

### Deployment Monitoring

**Vercel Analytics:**
- Real-time metrics
- Core Web Vitals
- Page load times
- User geography

**Custom Monitoring:**

```typescript
// lib/monitoring.ts
export async function trackMetric(
  name: string,
  value: number,
  tags?: Record<string, string>
) {
  if (process.env.NODE_ENV === 'production') {
    await fetch('https://metrics.example.com/track', {
      method: 'POST',
      body: JSON.stringify({ name, value, tags, timestamp: Date.now() })
    })
  }
}

// Usage
trackMetric('deployment_duration', duration, {
  environment: 'production',
  version: '1.0.0'
})
```

### Error Tracking

**Sentry Integration:**

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
})

export default Sentry
```

### Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database
    await db.$queryRaw`SELECT 1`
    
    // Check external services
    const services = await Promise.all([
      checkOpenAI(),
      checkGitHub(),
      checkVercel(),
    ])
    
    return Response.json({
      status: 'healthy',
      services,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    )
  }
}
```

### Performance Monitoring

```typescript
// lib/performance.ts
export function measurePerformance(
  name: string,
  fn: () => Promise<any>
) {
  return async (...args: any[]) => {
    const start = Date.now()
    try {
      const result = await fn(...args)
      const duration = Date.now() - start
      
      trackMetric(`${name}_duration`, duration)
      trackMetric(`${name}_success`, 1)
      
      return result
    } catch (error) {
      trackMetric(`${name}_error`, 1)
      throw error
    }
  }
}
```

### Backup Strategy

**Database Backups:**

```bash
# Daily backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${DATE}.sql"

# Backup database
pg_dump $DATABASE_URL > $BACKUP_FILE

# Upload to S3
aws s3 cp $BACKUP_FILE s3://backups/db/

# Keep only last 30 days
find backups/ -mtime +30 -delete
```

**Automated Backups (Vercel):**
- Neon/Supabase provide automated backups
- Configure retention period
- Test restore process regularly

---

## Troubleshooting Deployments

### Common Issues

#### Build Failures

**Error: Module not found**
```
Solution: Ensure all dependencies in package.json
- Check imports are correct
- Run `pnpm install`
- Clear build cache
```

**Error: Out of memory**
```
Solution: Increase memory limit
- Update vercel.json: "maxDuration": 60
- Or build locally and deploy
```

**Error: TypeScript errors**
```
Solution: Fix type errors
- Run `pnpm type-check` locally
- Address all errors
- Don't use `@ts-ignore` unless necessary
```

#### Deployment Failures

**Error: Environment variable missing**
```
Solution: Add missing env vars
- Check Vercel dashboard
- Add required variables
- Redeploy
```

**Error: Database connection failed**
```
Solution: Check database URL
- Verify DATABASE_URL is correct
- Check database is accessible
- Verify SSL settings
```

#### Runtime Errors

**Error: API route returns 500**
```
Solution: Check logs
- View Vercel logs
- Check error tracking (Sentry)
- Test API route locally
- Add error handling
```

**Error: Page not found (404)**
```
Solution: Check routing
- Verify file structure
- Check next.config.js redirects
- Ensure build completed successfully
```

### Debug Checklist

1. **Check build logs** - Look for errors during build
2. **Verify environment variables** - Ensure all required vars are set
3. **Test locally** - Reproduce issue in development
4. **Check network** - Verify external services are accessible
5. **Review recent changes** - What changed since last successful deploy?
6. **Rollback if needed** - Promote previous deployment
7. **Monitor logs** - Watch real-time logs for errors

### Getting Help

**Vercel Support:**
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

**AiBuild Support:**
- [GitHub Issues](https://github.com/SolanaRemix/AiBuild/issues)
- [Discord Server](https://discord.gg/aibuild)
- Email: support@aibuild.app

---

## Summary

You now have comprehensive knowledge of deploying AiBuild applications:

- ✅ **Web deployments** via Vercel with automatic HTTPS
- ✅ **Mobile apps** as Android APKs (iOS coming soon)
- ✅ **Desktop apps** for Windows, macOS, and Linux
- ✅ **Environment management** across development, staging, production
- ✅ **CI/CD pipelines** for automated deployments
- ✅ **Monitoring and maintenance** for production systems

**Next Steps:**
1. Deploy your first project
2. Set up custom domain
3. Configure monitoring
4. Implement CI/CD
5. Plan backup strategy

**Additional Resources:**
- [User Guide](./user-guide.md)
- [Developer Guide](./developer-guide.md)
- [Architecture Documentation](../architecture.md)

---

**Happy Deploying! 🚀**
