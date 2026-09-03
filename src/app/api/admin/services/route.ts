import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return !!req.cookies.get('pwv-admin')?.value
}

type ServiceRow = {
  id: string
  title: string
  slug: string
  tagline: string | null
  description: string | null
  features: string | null
  deliverables: string | null
  accent: string | null
  icon: string | null
  active: number
  createdAt: string
}

function safeParseArray(raw: string | null): string[] {
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed.map((x) => String(x))
  } catch {
    /* fall through */
  }
  // Fall back to comma-separated
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function normalizeRow(r: ServiceRow) {
  return {
    id: r.id,
    title: r.title,
    slug: r.slug,
    tagline: r.tagline || '',
    description: r.description || '',
    features: safeParseArray(r.features),
    deliverables: safeParseArray(r.deliverables),
    accent: r.accent || 'from-orange-500 to-pink-500',
    icon: r.icon || 'Palette',
    active: !!r.active,
    createdAt: r.createdAt,
  }
}

// GET all services (admin — includes inactive)
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const rows = (await db.$queryRaw`
      SELECT id, title, slug, tagline, description, features, deliverables, accent, icon, active, createdAt
      FROM Service
      ORDER BY createdAt ASC
    `) as ServiceRow[]
    return NextResponse.json({ ok: true, services: rows.map(normalizeRow) })
  } catch (err) {
    console.error('Admin services GET error:', err)
    return NextResponse.json({ ok: true, services: [] })
  }
}

// POST create a new service
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { title, slug, tagline, description, features, deliverables, accent, icon } = body

    if (!title || !slug) {
      return NextResponse.json({ ok: false, error: 'Title and slug are required' }, { status: 400 })
    }

    const id = `svc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const now = new Date().toISOString()
    const featuresStr = JSON.stringify(normalizeList(features))
    const deliverablesStr = JSON.stringify(normalizeList(deliverables))
    const safeAccent = accent || 'from-orange-500 to-pink-500'
    const safeIcon = icon || 'Palette'

    await db.$executeRaw`
      INSERT INTO Service (id, title, slug, tagline, description, features, deliverables, accent, icon, active, createdAt)
      VALUES (${id}, ${title}, ${slug}, ${tagline || null}, ${description || null}, ${featuresStr}, ${deliverablesStr}, ${safeAccent}, ${safeIcon}, 1, ${now})
    `

    return NextResponse.json({
      ok: true,
      service: {
        id,
        title,
        slug,
        tagline: tagline || '',
        description: description || '',
        features: normalizeList(features),
        deliverables: normalizeList(deliverables),
        accent: safeAccent,
        icon: safeIcon,
        active: true,
        createdAt: now,
      },
    })
  } catch (err) {
    console.error('Admin services POST error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to create' }, { status: 500 })
  }
}

// PUT update a service (full update or partial — supports `active` toggle)
export async function PUT(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { id, title, slug, tagline, description, features, deliverables, accent, icon, active } = body

    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 })
    }

    // Partial-update path: when only `id` + `active` are sent (toggle)
    const isToggle =
      active !== undefined &&
      title === undefined &&
      slug === undefined &&
      tagline === undefined &&
      description === undefined &&
      features === undefined &&
      deliverables === undefined &&
      accent === undefined &&
      icon === undefined

    if (isToggle) {
      await db.$executeRaw`UPDATE Service SET active = ${active ? 1 : 0} WHERE id = ${id}`
      return NextResponse.json({ ok: true })
    }

    // Full update path — fetch existing for fallback values
    const existing = (await db.$queryRaw`
      SELECT title, slug, tagline, description, features, deliverables, accent, icon FROM Service WHERE id = ${id}
    `) as Array<{
      title: string
      slug: string
      tagline: string | null
      description: string | null
      features: string | null
      deliverables: string | null
      accent: string | null
      icon: string | null
    }>

    if (existing.length === 0) {
      return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 })
    }

    const e = existing[0]
    const finalTitle = title ?? e.title
    const finalSlug = slug ?? e.slug
    const finalTagline = tagline ?? e.tagline
    const finalDescription = description ?? e.description
    const finalFeatures =
      features !== undefined ? JSON.stringify(normalizeList(features)) : e.features
    const finalDeliverables =
      deliverables !== undefined ? JSON.stringify(normalizeList(deliverables)) : e.deliverables
    const finalAccent = accent ?? e.accent
    const finalIcon = icon ?? e.icon

    await db.$executeRaw`
      UPDATE Service SET
        title = ${finalTitle},
        slug = ${finalSlug},
        tagline = ${finalTagline},
        description = ${finalDescription},
        features = ${finalFeatures},
        deliverables = ${finalDeliverables},
        accent = ${finalAccent},
        icon = ${finalIcon}
      WHERE id = ${id}
    `

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin services PUT error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE a service
export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 })
    }
    await db.$executeRaw`DELETE FROM Service WHERE id = ${id}`
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin services DELETE error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to delete' }, { status: 500 })
  }
}

// Helper: accept either a JSON array, a comma-separated string, or undefined
function normalizeList(input: unknown): string[] {
  if (input == null) return []
  if (Array.isArray(input)) return input.map((x) => String(x)).filter(Boolean)
  if (typeof input === 'string') {
    return input
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}
