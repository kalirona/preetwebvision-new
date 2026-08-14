import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return !!req.cookies.get('pwv-admin')?.value
}

type TestimonialRow = {
  id: string
  quote: string
  name: string
  role: string | null
  company: string | null
  rating: number
  initials: string | null
  accent: string | null
  active: number
  createdAt: string
}

function normalizeRow(r: TestimonialRow) {
  return {
    id: r.id,
    quote: r.quote,
    name: r.name,
    role: r.role || '',
    company: r.company || '',
    rating: Number(r.rating) || 5,
    initials: r.initials || '',
    accent: r.accent || 'from-orange-500 to-pink-500',
    active: !!r.active,
    createdAt: r.createdAt,
  }
}

// GET all testimonials (admin — includes inactive)
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const rows = (await db.$queryRaw`
      SELECT id, quote, name, role, company, rating, initials, accent, active, createdAt
      FROM Testimonial
      ORDER BY createdAt ASC
    `) as TestimonialRow[]
    return NextResponse.json({ ok: true, testimonials: rows.map(normalizeRow) })
  } catch (err) {
    console.error('Admin testimonials GET error:', err)
    return NextResponse.json({ ok: true, testimonials: [] })
  }
}

// POST create a new testimonial
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { quote, name, role, company, rating, initials, accent } = body

    if (!quote || !name) {
      return NextResponse.json({ ok: false, error: 'Quote and name are required' }, { status: 400 })
    }

    const id = `tst-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const now = new Date().toISOString()
    const safeRating = Math.max(1, Math.min(5, Number(rating) || 5))
    const safeInitials = (initials || name.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase())
    const safeAccent = accent || 'from-orange-500 to-pink-500'

    await db.$executeRaw`
      INSERT INTO Testimonial (id, quote, name, role, company, rating, initials, accent, active, createdAt)
      VALUES (${id}, ${quote}, ${name}, ${role || null}, ${company || null}, ${safeRating}, ${safeInitials}, ${safeAccent}, 1, ${now})
    `

    return NextResponse.json({
      ok: true,
      testimonial: {
        id,
        quote,
        name,
        role: role || '',
        company: company || '',
        rating: safeRating,
        initials: safeInitials,
        accent: safeAccent,
        active: true,
        createdAt: now,
      },
    })
  } catch (err) {
    console.error('Admin testimonials POST error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to create' }, { status: 500 })
  }
}

// PUT update a testimonial (full update or partial — supports `active` toggle)
export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { id, quote, name, role, company, rating, initials, accent, active } = body

    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 })
    }

    // Partial-update path: when only `id` + `active` are sent (toggle)
    const isToggle =
      active !== undefined &&
      quote === undefined &&
      name === undefined &&
      role === undefined &&
      company === undefined &&
      rating === undefined &&
      initials === undefined &&
      accent === undefined

    if (isToggle) {
      await db.$executeRaw`UPDATE Testimonial SET active = ${active ? 1 : 0} WHERE id = ${id}`
      return NextResponse.json({ ok: true })
    }

    // Full update path — fetch existing for fallback values
    const existing = (await db.$queryRaw`
      SELECT quote, name, role, company, rating, initials, accent FROM Testimonial WHERE id = ${id}
    `) as Array<{
      quote: string
      name: string
      role: string | null
      company: string | null
      rating: number
      initials: string | null
      accent: string | null
    }>

    if (existing.length === 0) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 })
    }

    const e = existing[0]
    const finalQuote = quote ?? e.quote
    const finalName = name ?? e.name
    const finalRole = role ?? e.role
    const finalCompany = company ?? e.company
    const finalRating = rating !== undefined ? Math.max(1, Math.min(5, Number(rating) || 5)) : Number(e.rating)
    const finalInitials = initials ?? e.initials
    const finalAccent = accent ?? e.accent

    await db.$executeRaw`
      UPDATE Testimonial SET
        quote = ${finalQuote},
        name = ${finalName},
        role = ${finalRole},
        company = ${finalCompany},
        rating = ${finalRating},
        initials = ${finalInitials},
        accent = ${finalAccent}
      WHERE id = ${id}
    `

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin testimonials PUT error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE a testimonial
export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 })
    }
    await db.$executeRaw`DELETE FROM Testimonial WHERE id = ${id}`
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin testimonials DELETE error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to delete' }, { status: 500 })
  }
}
