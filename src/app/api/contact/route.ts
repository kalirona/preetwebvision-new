import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

const SERVICE_OPTIONS = [
  'Website Design & Development',
  'AI Automations',
  'Web App Development',
  'SEO & Digital Growth',
  'Ecommerce Solutions',
]

const BUDGET_OPTIONS = ['<$5k', '$5k–$15k', '$15k–$50k', '$50k+']

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, service, budget, message } = body || {}

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ ok: false, error: 'Please enter your name.' }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 })
    }
    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json({ ok: false, error: 'Tell us a bit more about your project (min 10 chars).' }, { status: 400 })
    }

    const safeService =
      service && SERVICE_OPTIONS.includes(service) ? service : null
    const safeBudget =
      budget && BUDGET_OPTIONS.includes(budget) ? budget : null

    const submission = await db.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company?.trim() || null,
        service: safeService,
        budget: safeBudget,
        message: message.trim(),
      },
    })

    // Create admin notification
    try {
      const notifId = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      const now = new Date().toISOString()
      await db.$executeRaw`
        INSERT INTO Notification (id, type, title, message, link, read, createdAt)
        VALUES (${notifId}, 'form', 'New form submission', ${name + ' (' + email + ')' + (safeService ? ' — ' + safeService : '')}, '/admin/dashboard', 0, ${now})
      `
    } catch {
      /* ignore notification errors */
    }

    return NextResponse.json({ ok: true, id: submission.id })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { ok: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const count = await db.contactSubmission.count()
    return NextResponse.json({ ok: true, count })
  } catch {
    return NextResponse.json({ ok: true, count: 0 })
  }
}
