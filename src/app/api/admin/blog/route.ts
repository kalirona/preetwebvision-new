import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return !!req.cookies.get('pwv-admin')?.value
}

// GET all blog posts (admin — includes drafts)
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const rows = await db.$queryRaw`
      SELECT id, title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, status, createdAt, updatedAt
      FROM BlogPost
      ORDER BY createdAt DESC
    `
    return NextResponse.json({ ok: true, posts: rows })
  } catch {
    return NextResponse.json({ ok: true, posts: [] })
  }
}

// POST create a new blog post
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, status } = body

    if (!title || !slug) {
      return NextResponse.json({ ok: false, error: 'Title and slug are required' }, { status: 400 })
    }

    const id = `blog-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const now = new Date().toISOString()
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content || [])

    await db.$executeRaw`
      INSERT INTO BlogPost (id, title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, status, createdAt, updatedAt)
      VALUES (${id}, ${title}, ${slug}, ${excerpt || null}, ${contentStr}, ${category || null}, ${author || 'Preet Kaur'}, ${authorRole || 'Founder'}, ${authorInitials || 'PK'}, ${authorAccent || 'from-orange-500 to-pink-500'}, ${imageUrl || null}, ${featured ? 1 : 0}, ${status || 'published'}, ${now}, ${now})
    `

    return NextResponse.json({ ok: true, id })
  } catch (err) {
    console.error('Blog POST error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to create post' }, { status: 500 })
  }
}

// PUT update a blog post
export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { id, title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, status } = body

    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 })
    }

    const now = new Date().toISOString()
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content || [])

    await db.$executeRaw`
      UPDATE BlogPost SET
        title = ${title || null},
        slug = ${slug || null},
        excerpt = ${excerpt || null},
        content = ${contentStr},
        category = ${category || null},
        author = ${author || null},
        authorRole = ${authorRole || null},
        authorInitials = ${authorInitials || null},
        authorAccent = ${authorAccent || null},
        imageUrl = ${imageUrl || null},
        featured = ${featured ? 1 : 0},
        status = ${status || 'published'},
        updatedAt = ${now}
      WHERE id = ${id}
    `

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Blog PUT error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to update post' }, { status: 500 })
  }
}

// DELETE a blog post
export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 })
    }
    await db.$executeRaw`DELETE FROM BlogPost WHERE id = ${id}`
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false, error: 'Failed to delete' }, { status: 500 })
  }
}
