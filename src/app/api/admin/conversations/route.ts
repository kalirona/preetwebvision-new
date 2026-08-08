import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return !!req.cookies.get('pwv-admin')?.value
}

// GET conversations with mode + status
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const rows = await db.$queryRaw`
      SELECT
        c.id, c.sessionId, c.email, c.name, c.status, c.mode, c.createdAt, c.updatedAt,
        (SELECT content FROM ChatMessage WHERE conversationId = c.id ORDER BY createdAt DESC LIMIT 1) as lastMessage,
        (SELECT role FROM ChatMessage WHERE conversationId = c.id ORDER BY createdAt DESC LIMIT 1) as lastRole,
        (SELECT COUNT(*) FROM ChatMessage WHERE conversationId = c.id) as messageCount
      FROM ChatConversation c
      ORDER BY c.updatedAt DESC
      LIMIT 200
    `
    return NextResponse.json({
      ok: true,
      conversations: (rows as unknown[]).map((r: unknown) => {
        const row = r as Record<string, unknown>
        return {
          ...row,
          mode: (row.mode as string) || 'ai',
          messageCount: Number(row.messageCount),
        }
      }),
    })
  } catch {
    return NextResponse.json({ ok: true, conversations: [] })
  }
}

// PATCH: update conversation status or mode (ai/human)
export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { conversationId, status, mode } = await req.json()

    if (status) {
      if (!['new', 'replied', 'archived'].includes(status)) {
        return NextResponse.json({ ok: false, error: 'Invalid status' }, { status: 400 })
      }
      await db.$executeRaw`
        UPDATE ChatConversation SET status = ${status}, updatedAt = ${new Date().toISOString()}
        WHERE id = ${conversationId}
      `
    }

    if (mode) {
      if (!['ai', 'human'].includes(mode)) {
        return NextResponse.json({ ok: false, error: 'Invalid mode' }, { status: 400 })
      }
      await db.$executeRaw`
        UPDATE ChatConversation SET mode = ${mode}, updatedAt = ${new Date().toISOString()}
        WHERE id = ${conversationId}
      `
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Update failed' }, { status: 500 })
  }
}
