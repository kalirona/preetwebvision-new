import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET messages for a specific conversation
export async function GET(req: NextRequest) {
  try {
    const conversationId = req.nextUrl.searchParams.get('id')
    if (!conversationId) {
      return NextResponse.json({ ok: false, error: 'Missing conversation id.' }, { status: 400 })
    }

    const messages = (await db.$queryRaw`
      SELECT id, role, content, createdAt
      FROM ChatMessage
      WHERE conversationId = ${conversationId}
      ORDER BY createdAt ASC
    `) as Array<{ id: string; role: string; content: string; createdAt: string }>

    return NextResponse.json({ ok: true, messages })
  } catch (err) {
    console.error('Messages API error:', err)
    return NextResponse.json({ ok: true, messages: [] })
  }
}

// POST a manual reply (from the inbox — saved as assistant message)
export async function POST(req: NextRequest) {
  try {
    const { conversationId, content } = await req.json()
    if (!conversationId || !content || typeof content !== 'string') {
      return NextResponse.json({ ok: false, error: 'Missing conversationId or content.' }, { status: 400 })
    }

    const now = new Date().toISOString()
    const id = crypto.randomUUID()

    await db.$executeRaw`
      INSERT INTO ChatMessage (id, conversationId, role, content, createdAt)
      VALUES (${id}, ${conversationId}, 'assistant', ${content}, ${now})
    `
    // Mark conversation as replied
    await db.$executeRaw`
      UPDATE ChatConversation SET status = 'replied', updatedAt = ${now}
      WHERE id = ${conversationId}
    `

    return NextResponse.json({ ok: true, id })
  } catch (err) {
    console.error('Reply API error:', err)
    return NextResponse.json({ ok: false, error: 'Reply failed.' }, { status: 500 })
  }
}
