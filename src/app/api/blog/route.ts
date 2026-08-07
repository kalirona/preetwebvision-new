import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Track a blog view (POST { slug })
export async function POST(req: NextRequest) {
  try {
    const { slug } = (await req.json()) || {}
    if (typeof slug !== 'string' || slug.length > 200 || !/^[a-z0-9-]+$/.test(slug)) {
      return NextResponse.json({ ok: false, error: 'Invalid slug.' }, { status: 400 })
    }
    await db.$executeRaw`
      INSERT INTO BlogView (id, slug, createdAt)
      VALUES (${crypto.randomUUID()}, ${slug}, ${new Date().toISOString()})
    `
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Blog view error:', err)
    return NextResponse.json({ ok: true }) // fail open — tracking is non-critical
  }
}

// Get view counts (GET ?slug=foo returns count for one slug; otherwise totals)
export async function GET(req: NextRequest) {
  try {
    const slug = req.nextUrl.searchParams.get('slug')
    if (slug) {
      const rows = (await db.$queryRaw`SELECT COUNT(*) as count FROM BlogView WHERE slug = ${slug}`) as Array<{ count: number }>
      return NextResponse.json({ ok: true, count: Number(rows[0]?.count ?? 0) })
    }
    const rows = (await db.$queryRaw`SELECT COUNT(*) as count FROM BlogView`) as Array<{ count: number }>
    return NextResponse.json({ ok: true, count: Number(rows[0]?.count ?? 0) })
  } catch {
    return NextResponse.json({ ok: true, count: 0 })
  }
}
