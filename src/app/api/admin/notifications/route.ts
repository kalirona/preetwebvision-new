import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return !!req.cookies.get('pwv-admin')?.value
}

// GET notifications (auth-protected)
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const rows = (await db.$queryRaw`
      SELECT id, type, title, message, link, read, createdAt
      FROM Notification
      ORDER BY createdAt DESC
      LIMIT 50
    `) as Array<{ id: string; type: string; title: string; message: string; link: string; read: number; createdAt: string }>
    const unread = (await db.$queryRaw`SELECT COUNT(*) as c FROM Notification WHERE read = 0`) as Array<{ c: number }>
    return NextResponse.json({
      ok: true,
      notifications: rows.map((r) => ({ ...r, read: Boolean(r.read) })),
      unreadCount: Number(unread[0]?.c ?? 0),
    })
  } catch {
    return NextResponse.json({ ok: true, notifications: [], unreadCount: 0 })
  }
}

// PATCH: mark all as read or mark specific as read
export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id, markAllRead } = await req.json()
    if (markAllRead) {
      await db.$executeRaw`UPDATE Notification SET read = 1`
    } else if (id) {
      await db.$executeRaw`UPDATE Notification SET read = 1 WHERE id = ${id}`
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed' }, { status: 500 })
  }
}

// Helper function to create a notification (called from other APIs)
export async function createNotification(type: string, title: string, message: string, link?: string) {
  try {
    const { db } = await import('@/lib/db')
    const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const now = new Date().toISOString()
    await db.$executeRaw`
      INSERT INTO Notification (id, type, title, message, link, read, createdAt)
      VALUES (${id}, ${type}, ${title}, ${message}, ${link || null}, 0, ${now})
    `
  } catch {
    /* ignore */
  }
}
