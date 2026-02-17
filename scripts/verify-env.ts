#!/usr/bin/env tsx
/**
 * verify-env.ts
 * 
 * Operator-grade environment variable validation script.
 * Verifies all required environment variables are present and valid before build/deploy.
 * 
 * Usage:
 *   pnpm tsx scripts/verify-env.ts
 *   NODE_ENV=production pnpm tsx scripts/verify-env.ts
 * 
 * Exit codes:
 *   0 - All environment variables valid
 *   1 - Missing or invalid environment variables
 */

// ASSUMPTION: Using standard Node.js env var patterns, no external deps needed
const REQUIRED_ENV_VARS = {
  // Database - Required for build (Prisma generate) and runtime
  DATABASE_URL: {
    required: true,
    format: /^postgresql:\/\/.+/,
    description: 'PostgreSQL connection string (e.g., postgresql://user:pass@host:5432/db)',
    buildTime: true,
    runtime: true,
  },
  
  // Authentication - Required for runtime
  NEXTAUTH_URL: {
    required: process.env.NODE_ENV === 'production',
    format: /^https?:\/\/.+/,
    description: 'Full URL of your application (e.g., https://aibuild.com)',
    buildTime: false,
    runtime: true,
  },
  
  NEXTAUTH_SECRET: {
    required: process.env.NODE_ENV === 'production',
    format: /.{32,}/, // At least 32 characters
    description: 'Random secret for JWT signing (min 32 chars)',
    buildTime: false,
    runtime: true,
  },
  
  // Optional but recommended
  NODE_ENV: {
    required: false,
    format: /^(development|test|production)$/,
    description: 'Environment mode (development, test, or production)',
    buildTime: true,
    runtime: true,
  },
} as const

interface ValidationResult {
  valid: boolean
  errors: string[]
  warnings: string[]
}

function validateEnvVar(
  name: string,
  config: typeof REQUIRED_ENV_VARS[keyof typeof REQUIRED_ENV_VARS]
): { valid: boolean; message?: string } {
  const value = process.env[name]
  
  // Check if required
  if (config.required && !value) {
    return {
      valid: false,
      message: `Missing required environment variable: ${name}\n  Description: ${config.description}`,
    }
  }
  
  // If not required and not set, skip format validation
  if (!value) {
    return { valid: true }
  }
  
  // Validate format
  if (config.format && !config.format.test(value)) {
    return {
      valid: false,
      message: `Invalid format for ${name}\n  Expected: ${config.description}\n  Got: ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`,
    }
  }
  
  return { valid: true }
}

function validateEnvironment(): ValidationResult {
  const result: ValidationResult = {
    valid: true,
    errors: [],
    warnings: [],
  }
  
  console.log('🔍 Verifying environment variables...\n')
  console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}`)
  console.log(`   Context: ${process.env.VERCEL ? 'Vercel' : 'Local'}\n`)
  
  // Validate each required environment variable
  for (const [name, config] of Object.entries(REQUIRED_ENV_VARS)) {
    const validation = validateEnvVar(name, config)
    
    if (!validation.valid) {
      result.valid = false
      result.errors.push(validation.message!)
    } else if (process.env[name]) {
      const phases = []
      if (config.buildTime) phases.push('build')
      if (config.runtime) phases.push('runtime')
      console.log(`   ✅ ${name} (${phases.join(', ')})`)
    }
  }
  
  // Additional warnings for production
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXTAUTH_URL) {
      result.warnings.push('NEXTAUTH_URL not set - authentication may fail in production')
    }
    
    if (!process.env.NEXTAUTH_SECRET || process.env.NEXTAUTH_SECRET.length < 32) {
      result.warnings.push('NEXTAUTH_SECRET should be at least 32 characters for production')
    }
  }
  
  return result
}

function generateEnvTemplate(): void {
  console.log('\n📋 Environment Variable Template:\n')
  console.log('# Copy this to .env.local and fill in your values\n')
  
  for (const [name, config] of Object.entries(REQUIRED_ENV_VARS)) {
    const phases = []
    if (config.buildTime) phases.push('build')
    if (config.runtime) phases.push('runtime')
    
    console.log(`# ${config.description}`)
    console.log(`# Required: ${config.required ? 'Yes' : 'No'} | Used at: ${phases.join(', ')}`)
    console.log(`${name}=`)
    console.log()
  }
}

function main(): void {
  const args = process.argv.slice(2)
  
  // Show template if --template flag is passed
  if (args.includes('--template')) {
    generateEnvTemplate()
    process.exit(0)
  }
  
  const result = validateEnvironment()
  
  // Display errors
  if (result.errors.length > 0) {
    console.log('\n❌ Environment validation failed:\n')
    result.errors.forEach((error) => {
      console.error(`   ${error}\n`)
    })
  }
  
  // Display warnings
  if (result.warnings.length > 0) {
    console.log('\n⚠️  Warnings:\n')
    result.warnings.forEach((warning) => {
      console.warn(`   ${warning}`)
    })
    console.log()
  }
  
  if (result.valid) {
    console.log('\n✅ Environment validation passed!\n')
    
    if (args.includes('--verbose')) {
      console.log('All required environment variables are set and valid.')
    }
    
    process.exit(0)
  } else {
    console.log('\n💡 Tip: Run with --template flag to see all required variables')
    console.log('   pnpm tsx scripts/verify-env.ts --template\n')
    process.exit(1)
  }
}

// Run validation
main()
