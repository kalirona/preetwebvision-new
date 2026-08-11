import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Force dynamic — must re-query DB on every request, not serve build-time cache
export const dynamic = 'force-dynamic'

// Public endpoint — returns only active affiliates, ordered by `order` field
export async function GET() {
  try {
    const affiliates = await db.affiliate.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        imageUrl: true,
        affiliateUrl: true,
        category: true,
        featured: true,
      },
    })
    return NextResponse.json({ ok: true, affiliates })
  } catch (err) {
    console.error('Affiliates API error:', err)
    return NextResponse.json({ ok: true, affiliates: [] })
  }
}
