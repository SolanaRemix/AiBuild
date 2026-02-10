import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
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
