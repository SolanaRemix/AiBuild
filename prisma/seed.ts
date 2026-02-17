import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  // ASSUMPTION: Refuse to seed in production without explicit override
  // Prevents accidental seeding of well-known credentials in production databases
  if (process.env.NODE_ENV === 'production' && process.env.ALLOW_SEED_PRODUCTION !== 'true') {
    console.error(
      '⛔ Refusing to run seed in production environment without explicit override.\n' +
      '   Set ALLOW_SEED_PRODUCTION="true" to override this safety check.'
    )
    process.exit(1)
  }

  const password = await bcrypt.hash('Admin123$', 10)

  // Create users
  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      password,
      role: 'ADMIN',
    },
  })

  await prisma.user.upsert({
    where: { email: 'user@aibuild.com' },
    update: {},
    create: {
      email: 'user@aibuild.com',
      password,
      role: 'USER',
    },
  })

  await prisma.user.upsert({
    where: { email: 'dev@aibuild.com' },
    update: {},
    create: {
      email: 'dev@aibuild.com',
      password,
      role: 'DEV',
    },
  })

  console.log('✓ Database seeded with 3 users')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
