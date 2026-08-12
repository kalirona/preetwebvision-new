import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET published blog posts (public — no auth)
export async function GET(req: NextRequest) {
  try {
    const page = parseInt(req.nextUrl.searchParams.get('page') || '1')
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '9')
    const category = req.nextUrl.searchParams.get('category')
    const search = req.nextUrl.searchParams.get('search')
    const offset = (page - 1) * limit

    let rows: Array<Record<string, unknown>>
    let countResult: Array<{ c: number }>

    if (category && category !== 'All') {
      countResult = (await db.$queryRaw`SELECT COUNT(*) as c FROM BlogPost WHERE status = 'published' AND category = ${category}`) as Array<{ c: number }>
      rows = await db.$queryRaw`
        SELECT id, title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, createdAt
        FROM BlogPost
        WHERE status = 'published' AND category = ${category}
        ORDER BY featured DESC, createdAt DESC
        LIMIT ${limit} OFFSET ${offset}
      ` as Array<Record<string, unknown>>
    } else if (search) {
      const searchPattern = `%${search}%`
      countResult = (await db.$queryRaw`SELECT COUNT(*) as c FROM BlogPost WHERE status = 'published' AND (title LIKE ${searchPattern} OR excerpt LIKE ${searchPattern})`) as Array<{ c: number }>
      rows = await db.$queryRaw`
        SELECT id, title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, createdAt
        FROM BlogPost
        WHERE status = 'published' AND (title LIKE ${searchPattern} OR excerpt LIKE ${searchPattern})
        ORDER BY featured DESC, createdAt DESC
        LIMIT ${limit} OFFSET ${offset}
      ` as Array<Record<string, unknown>>
    } else {
      countResult = (await db.$queryRaw`SELECT COUNT(*) as c FROM BlogPost WHERE status = 'published'`) as Array<{ c: number }>
      rows = await db.$queryRaw`
        SELECT id, title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, createdAt
        FROM BlogPost
        WHERE status = 'published'
        ORDER BY featured DESC, createdAt DESC
        LIMIT ${limit} OFFSET ${offset}
      ` as Array<Record<string, unknown>>
    }

    const total = Number(countResult[0]?.c ?? 0)
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      ok: true,
      posts: rows.map((r) => ({
        ...r,
        featured: Boolean(r.featured),
      })),
      pagination: { page, limit, total, totalPages },
    })
  } catch (err) {
    console.error('Blog posts API error:', err)
    return NextResponse.json({ ok: true, posts: [], pagination: { page: 1, limit: 9, total: 0, totalPages: 0 } })
  }
}
