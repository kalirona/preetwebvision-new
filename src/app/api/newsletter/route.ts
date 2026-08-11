import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 3 signups per hour per IP
    const ip = getClientIP(req)
    const { limited } = rateLimit(`newsletter-${ip}`, { limit: 3, window: 3600000 })
    if (limited) {
      return NextResponse.json(
        { ok: false, error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
    const { email, source } = (await req.json()) || {}
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }
    const safeEmail = email.trim().toLowerCase()
    const safeSource =
      typeof source === 'string' && source.length <= 40 ? source : 'footer'

    // Use raw SQL to be resilient to any Prisma client delegate staleness
    // in the dev server. INSERT OR IGNORE handles the unique constraint.
    await db.$executeRaw`
      INSERT OR IGNORE INTO NewsletterLead (id, email, source, createdAt)
      VALUES (${crypto.randomUUID()}, ${safeEmail}, ${safeSource}, ${new Date().toISOString()})
    `

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Newsletter API error:', err)
    return NextResponse.json(
      { ok: false, error: 'Could not subscribe. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const rows = (await db.$queryRaw`SELECT COUNT(*) as count FROM NewsletterLead`) as Array<{ count: number }>
    return NextResponse.json({ ok: true, count: Number(rows[0]?.count ?? 0) })
  } catch {
    return NextResponse.json({ ok: true, count: 0 })
  }
}
