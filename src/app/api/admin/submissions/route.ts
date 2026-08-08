import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Check admin auth
function isAdmin(req: NextRequest) {
  const cookie = req.cookies.get('pwv-admin')
  return !!cookie?.value
}

// GET all contact submissions
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const status = req.nextUrl.searchParams.get('status')

    let rows
    if (status && status !== 'all') {
      rows = await db.$queryRaw`
        SELECT id, name, email, company, service, budget, message, status, createdAt
        FROM ContactSubmission
        WHERE status = ${status}
        ORDER BY createdAt DESC
        LIMIT 200
      `
    } else {
      rows = await db.$queryRaw`
        SELECT id, name, email, company, service, budget, message, status, createdAt
        FROM ContactSubmission
        ORDER BY createdAt DESC
        LIMIT 200
      `
    }

    return NextResponse.json({ ok: true, submissions: rows })
  } catch (err) {
    console.error('Submissions API error:', err)
    return NextResponse.json({ ok: true, submissions: [] })
  }
}

// PATCH update submission status
export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id, status } = await req.json()
    if (!id || !['new', 'read', 'replied', 'archived'].includes(status)) {
      return NextResponse.json({ ok: false, error: 'Invalid params' }, { status: 400 })
    }
    await db.$executeRaw`
      UPDATE ContactSubmission SET status = ${status} WHERE id = ${id}
    `
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Update failed' }, { status: 500 })
  }
}
