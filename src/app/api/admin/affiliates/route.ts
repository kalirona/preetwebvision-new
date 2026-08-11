import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Check admin auth
function isAdmin(req: NextRequest) {
  const cookie = req.cookies.get('pwv-admin')
  return !!cookie?.value
}

// GET all affiliates (admin — includes inactive)
export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const affiliates = await db.affiliate.findMany({
      orderBy: { order: 'asc', createdAt: 'desc' },
    })
    return NextResponse.json({ ok: true, affiliates })
  } catch (err) {
    console.error('Admin affiliates GET error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to fetch' }, { status: 500 })
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
    // Get the highest order to append at the end
    const maxOrder = await db.affiliate.aggregate({
      _max: { order: true },
    })
    const nextOrder = (maxOrder._max.order ?? 0) + 1
    const affiliate = await db.affiliate.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        affiliateUrl,
        category,
        featured: !!featured,
        order: nextOrder,
      },
    })
    return NextResponse.json({ ok: true, affiliate })
  } catch (err) {
    console.error('Admin affiliates POST error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to create' }, { status: 500 })
  }
}

// PATCH update an affiliate (and optional reorder)
export async function PATCH(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { id, ...data } = body
    if (!id) {
      return NextResponse.json({ ok: false, error: 'Missing id' }, { status: 400 })
    }
    const affiliate = await db.affiliate.update({
      where: { id },
      data,
    })
    return NextResponse.json({ ok: true, affiliate })
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
    await db.affiliate.delete({ where: { id } })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Admin affiliates DELETE error:', err)
    return NextResponse.json({ ok: false, error: 'Failed to delete' }, { status: 500 })
  }
}
