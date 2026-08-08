import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return !!req.cookies.get('pwv-admin')?.value
}

// GET all settings (auth-protected)
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const rows = (await db.$queryRaw`SELECT key, value FROM SiteSetting`) as Array<{ key: string; value: string }>
    const settings: Record<string, string> = {}
    for (const r of rows) settings[r.key] = r.value
    return NextResponse.json({ ok: true, settings })
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to load settings' }, { status: 500 })
  }
}

// PUT update settings (auth-protected)
export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const now = new Date().toISOString()
    for (const [key, value] of Object.entries(body)) {
      // Try update first, then insert if not exists
      const existing = (await db.$queryRaw`SELECT id FROM SiteSetting WHERE key = ${key}`) as Array<{ id: string }>
      if (existing.length > 0) {
        await db.$executeRaw`UPDATE SiteSetting SET value = ${String(value)}, updatedAt = ${now} WHERE key = ${key}`
      } else {
        const id = `set-${key}-${Date.now()}`
        await db.$executeRaw`INSERT INTO SiteSetting (id, key, value, updatedAt) VALUES (${id}, ${key}, ${String(value)}, ${now})`
      }
    }
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Settings update error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to save settings' }, { status: 500 })
  }
}
