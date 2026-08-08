import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return !!req.cookies.get('pwv-admin')?.value
}

function csvEscape(value: string | null | undefined): string {
  if (!value) return ''
  const v = String(value)
  if (v.includes(',') || v.includes('"') || v.includes('\n')) {
    return `"${v.replace(/"/g, '""')}"`
  }
  return v
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }

  const type = req.nextUrl.searchParams.get('type') || 'submissions'

  try {
    if (type === 'submissions') {
      const rows = (await db.$queryRaw`
        SELECT name, email, company, service, budget, message, status, createdAt
        FROM ContactSubmission
        ORDER BY createdAt DESC
      `) as Array<Record<string, unknown>>

      const headers = ['Name', 'Email', 'Company', 'Service', 'Budget', 'Message', 'Status', 'Date']
      const csv = [
        headers.join(','),
        ...rows.map((r) =>
          [
            csvEscape(r.name as string),
            csvEscape(r.email as string),
            csvEscape(r.company as string),
            csvEscape(r.service as string),
            csvEscape(r.budget as string),
            csvEscape(r.message as string),
            csvEscape(r.status as string),
            csvEscape(r.createdAt as string),
          ].join(',')
        ),
      ].join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="submissions-${Date.now()}.csv"`,
        },
      })
    }

    if (type === 'chats') {
      const rows = (await db.$queryRaw`
        SELECT
          c.sessionId, c.email, c.status, c.mode, c.createdAt,
          (SELECT content FROM ChatMessage WHERE conversationId = c.id ORDER BY createdAt ASC LIMIT 1) as firstMessage,
          (SELECT COUNT(*) FROM ChatMessage WHERE conversationId = c.id) as messageCount
        FROM ChatConversation c
        ORDER BY c.createdAt DESC
      `) as Array<Record<string, unknown>>

      const headers = ['Session', 'Email', 'Status', 'Mode', 'Messages', 'First Message', 'Created']
      const csv = [
        headers.join(','),
        ...rows.map((r) =>
          [
            csvEscape(r.sessionId as string),
            csvEscape(r.email as string),
            csvEscape(r.status as string),
            csvEscape(r.mode as string),
            String(r.messageCount || 0),
            csvEscape(r.firstMessage as string),
            csvEscape(r.createdAt as string),
          ].join(',')
        ),
      ].join('\n')

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="chats-${Date.now()}.csv"`,
        },
      })
    }

    return NextResponse.json({ ok: false, error: 'Invalid export type' }, { status: 400 })
  } catch (err) {
    console.error('Export error:', err)
    return NextResponse.json({ ok: false, error: 'Export failed' }, { status: 500 })
  }
}
