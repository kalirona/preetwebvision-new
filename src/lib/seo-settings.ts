import { db } from '@/lib/db'

// Cache SEO settings to avoid repeated DB queries
let cachedSettings: Record<string, string> | null = null
let cacheTime = 0
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function getSeoSettings(): Promise<Record<string, string>> {
  // Return cache if fresh
  if (cachedSettings && Date.now() - cacheTime < CACHE_TTL) {
    return cachedSettings
  }

  try {
    const rows = (await db.$queryRaw`SELECT key, value FROM SeoSetting`) as Array<{ key: string; value: string }>
    const settings: Record<string, string> = {}
    for (const r of rows) settings[r.key] = r.value
    cachedSettings = settings
    cacheTime = Date.now()
    return settings
  } catch {
    return {}
  }
}

export function getSeoDefault(key: string, fallback: string): string {
  if (cachedSettings && cachedSettings[key]) return cachedSettings[key]
  return fallback
}

// Clear cache (call after admin updates settings)
export function clearSeoCache() {
  cachedSettings = null
  cacheTime = 0
}
