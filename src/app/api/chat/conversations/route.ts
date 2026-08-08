import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET conversations list (with latest message preview)
export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get('status') // new, replied, archived, all

    // Build query conditionally to avoid Prisma parameterizing the WHERE clause
    let rows: Array<{
      id: string
      sessionId: string
      email: string | null
      name: string | null
      status: string
      createdAt: string
      updatedAt: string
      lastMessage: string | null
      lastRole: string | null
      messageCount: number
    }>

    if (status && status !== 'all') {
      rows = (await db.$queryRaw`
        SELECT
          c.id, c.sessionId, c.email, c.name, c.status, c.createdAt, c.updatedAt,
          (SELECT content FROM ChatMessage WHERE conversationId = c.id ORDER BY createdAt DESC LIMIT 1) as lastMessage,
          (SELECT role FROM ChatMessage WHERE conversationId = c.id ORDER BY createdAt DESC LIMIT 1) as lastRole,
          (SELECT COUNT(*) FROM ChatMessage WHERE conversationId = c.id) as messageCount
        FROM ChatConversation c
        WHERE c.status = ${status}
        ORDER BY c.updatedAt DESC
        LIMIT 100
      `) as typeof rows
    } else {
      rows = (await db.$queryRaw`
        SELECT
          c.id, c.sessionId, c.email, c.name, c.status, c.createdAt, c.updatedAt,
          (SELECT content FROM ChatMessage WHERE conversationId = c.id ORDER BY createdAt DESC LIMIT 1) as lastMessage,
          (SELECT role FROM ChatMessage WHERE conversationId = c.id ORDER BY createdAt DESC LIMIT 1) as lastRole,
          (SELECT COUNT(*) FROM ChatMessage WHERE conversationId = c.id) as messageCount
        FROM ChatConversation c
        ORDER BY c.updatedAt DESC
        LIMIT 100
      `) as typeof rows
    }

    return NextResponse.json({
      ok: true,
      conversations: rows.map((r) => ({
        ...r,
        messageCount: Number(r.messageCount),
      })),
    })
  } catch (err) {
    console.error('Conversations API error:', err)
    return NextResponse.json({ ok: true, conversations: [] })
  }
}

// Update conversation status (archive, mark replied)
export async function PATCH(req: NextRequest) {
  try {
    const { conversationId, status } = await req.json()
    if (!conversationId || !['new', 'replied', 'archived'].includes(status)) {
      return NextResponse.json({ ok: false, error: 'Invalid params.' }, { status: 400 })
    }
    await db.$executeRaw`
      UPDATE ChatConversation SET status = ${status}, updatedAt = ${new Date().toISOString()}
      WHERE id = ${conversationId}
    `
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Conversation update error:', err)
    return NextResponse.json({ ok: false, error: 'Update failed.' }, { status: 500 })
  }
}
