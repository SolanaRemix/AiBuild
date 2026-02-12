#!/usr/bin/env tsx
/**
 * prepare-vercel.ts
 * 
 * Operator-grade Vercel deployment preparation script.
 * Validates environment, generates Prisma client, and prepares build artifacts.
 * 
 * Usage:
 *   pnpm tsx scripts/prepare-vercel.ts
 * 
 * This script is designed to run in Vercel's build pipeline but can also
 * be used locally to test the build process.
 * 
 * Exit codes:
 *   0 - Preparation successful
 *   1 - Preparation failed
 */

import { execSync } from 'child_process'
import { existsSync } from 'fs'
import { join } from 'path'

// ASSUMPTION: Running from project root, standard Next.js structure
const PROJECT_ROOT = process.cwd()
const PRISMA_SCHEMA = join(PROJECT_ROOT, 'prisma', 'schema.prisma')

interface PreparationStep {
  name: string
  command?: string
  check?: () => boolean
  required: boolean
}

const PREPARATION_STEPS: PreparationStep[] = [
  {
    name: 'Verify Prisma schema exists',
    check: () => existsSync(PRISMA_SCHEMA),
    required: true,
  },
  {
    name: 'Generate Prisma client',
    command: 'prisma generate',
    required: true,
  },
  {
    name: 'Verify environment variables',
    command: 'tsx scripts/verify-env.ts',
    required: false, // Non-blocking, will show warnings
  },
]

function runCommand(command: string, stepName: string): boolean {
  try {
    console.log(`   Running: ${command}`)
    execSync(command, {
      stdio: 'inherit',
      cwd: PROJECT_ROOT,
      env: process.env,
    })
    return true
  } catch (error) {
    console.error(`   ❌ Failed: ${stepName}`)
    if (error instanceof Error) {
      console.error(`   Error: ${error.message}`)
    }
    return false
  }
}

function executePreparationStep(step: PreparationStep): boolean {
  console.log(`\n📦 ${step.name}...`)
  
  // Run check if provided
  if (step.check) {
    const checkResult = step.check()
    if (!checkResult) {
      console.error(`   ❌ Check failed: ${step.name}`)
      return false
    }
    console.log(`   ✅ Check passed`)
    return true
  }
  
  // Run command if provided
  if (step.command) {
    return runCommand(step.command, step.name)
  }
  
  return true
}

function displayEnvironmentInfo(): void {
  console.log('\n🔍 Environment Information:')
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`)
  console.log(`   Platform: ${process.env.VERCEL ? 'Vercel' : 'Local'}`)
  console.log(`   Node version: ${process.version}`)
  console.log(`   Working directory: ${PROJECT_ROOT}`)
  
  if (process.env.VERCEL) {
    console.log(`   Vercel Environment: ${process.env.VERCEL_ENV || 'unknown'}`)
    console.log(`   Git Branch: ${process.env.VERCEL_GIT_COMMIT_REF || 'unknown'}`)
    console.log(`   Git Commit: ${process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'unknown'}`)
  }
}

function main(): void {
  console.log('🚀 Preparing for Vercel deployment...\n')
  console.log('=' .repeat(60))
  
  displayEnvironmentInfo()
  
  console.log('\n' + '=' .repeat(60))
  console.log('\n📋 Running preparation steps...')
  
  let allSucceeded = true
  let criticalFailure = false
  
  for (const step of PREPARATION_STEPS) {
    const success = executePreparationStep(step)
    
    if (!success) {
      if (step.required) {
        criticalFailure = true
        console.error(`\n❌ Critical failure: ${step.name} is required but failed`)
      } else {
        console.warn(`\n⚠️  Optional step failed: ${step.name}`)
      }
      allSucceeded = false
    }
  }
  
  console.log('\n' + '=' .repeat(60))
  
  if (criticalFailure) {
    console.error('\n❌ Preparation failed due to critical errors')
    console.error('\nPlease fix the errors above and try again.\n')
    process.exit(1)
  }
  
  if (allSucceeded) {
    console.log('\n✅ All preparation steps completed successfully!')
  } else {
    console.log('\n⚠️  Preparation completed with warnings')
    console.log('Some optional steps failed but build can proceed.\n')
  }
  
  console.log('\n💡 Next steps:')
  console.log('   1. Run `pnpm build` to build the application')
  console.log('   2. Run `pnpm start` to test the production build')
  console.log('   3. Deploy to Vercel\n')
  
  process.exit(0)
}

// Run preparation
main()
