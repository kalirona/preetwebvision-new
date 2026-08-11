import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Self-healing: if a cached client is missing newer models (e.g. after a
// schema change without a dev-server restart), bust the cache and recreate.
let cached = globalForPrisma.prisma
if (cached && typeof (cached as unknown as Record<string, unknown>).affiliate === 'undefined') {
  // Stale client — discard so a fresh one is built with the latest schema.
  cached = undefined
  globalForPrisma.prisma = undefined
}

export const db =
  cached ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
