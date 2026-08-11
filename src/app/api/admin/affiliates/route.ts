import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return !!req.cookies.get('pwv-admin')?.value
}

// GET all affiliates (admin — includes inactive)
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const rows = await db.$queryRaw`
      SELECT id, title, description, price, imageUrl, affiliateUrl, category, featured, active, "order", createdAt
      FROM Affiliate
      ORDER BY "order" ASC, createdAt DESC
    `
    return NextResponse.json({ ok: true, affiliates: rows })
  } catch (err) {
    console.error('Admin affiliates GET error:', err)
    return NextResponse.json({ ok: true, affiliates: [] })
  }
}

// POST create a new affiliate
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { title, description, price, imageUrl, affiliateUrl, category, featured } = await req.json()
    if (!title || !affiliateUrl) {
      return NextResponse.json({ ok: false, error: 'Title and affiliateUrl are required' }, { status: 400 })
    }

    const id = `aff-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const now = new Date().toISOString()

    // Get max order
    const maxRows = (await db.$queryRaw`SELECT COALESCE(MAX("order"), 0) as maxOrder FROM Affiliate`) as Array<{ maxOrder: number }>
    const nextOrder = Number(maxRows[0]?.maxOrder ?? 0) + 1

    await db.$executeRaw`
      INSERT INTO Affiliate (id, title, description, price, imageUrl, affiliateUrl, category, featured, active, "order", createdAt)
      VALUES (${id}, ${title}, ${description || null}, ${price || null}, ${imageUrl || null}, ${affiliateUrl}, ${category || null}, ${featured ? 1 : 0}, 1, ${nextOrder}, ${now})
    `

    return NextResponse.json({ ok: true, affiliate: { id, title, description, price, imageUrl, affiliateUrl, category, featured: !!featured, active: true, order: nextOrder } })
  } catch (err) {
    console.error('Admin affiliates POST error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to create' }, { status: 500 })
  }
}

// PATCH update an affiliate
export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { id, title, description, price, imageUrl, affiliateUrl, category, featured, active } = body
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 })
    }

    const updates: string[] = []
    const values: unknown[] = []

    if (title !== undefined) { updates.push('title = ?'); values.push(title) }
    if (description !== undefined) { updates.push('description = ?'); values.push(description) }
    if (price !== undefined) { updates.push('price = ?'); values.push(price) }
    if (imageUrl !== undefined) { updates.push('imageUrl = ?'); values.push(imageUrl) }
    if (affiliateUrl !== undefined) { updates.push('affiliateUrl = ?'); values.push(affiliateUrl) }
    if (category !== undefined) { updates.push('category = ?'); values.push(category) }
    if (featured !== undefined) { updates.push('featured = ?'); values.push(featured ? 1 : 0) }
    if (active !== undefined) { updates.push('active = ?'); values.push(active ? 1 : 0) }

    if (updates.length === 0) {
      return NextResponse.json({ ok: false, error: 'No updates' }, { status: 400 })
    }

    values.push(id)
    await db.$executeRawUnsafe(`UPDATE Affiliate SET ${updates.join(', ')} WHERE id = ?`, ...values)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin affiliates PATCH error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE an affiliate
export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await req.json()
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 })
    }
    await db.$executeRaw`DELETE FROM Affiliate WHERE id = ${id}`
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin affiliates DELETE error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to delete' }, { status: 500 })
  }
}
