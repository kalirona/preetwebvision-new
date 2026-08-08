import { NextRequest, NextResponse } from 'next/server'

// Simple credential-based admin auth
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@preetwebvision.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'preet2025'

// GET: check if authenticated
export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('pwv-admin')
  if (cookie?.value) {
    return NextResponse.json({ ok: true, authenticated: true })
  }
  return NextResponse.json({ ok: false, authenticated: false }, { status: 401 })
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: 'Email and password required.' },
        { status: 400 }
      )
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Create a simple session token (in production, use JWT or signed cookies)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')
      const res = NextResponse.json({ ok: true, token, email })
      res.cookies.set('pwv-admin', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
      return res
    }

    return NextResponse.json(
      { ok: false, error: 'Invalid credentials.' },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Authentication failed.' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.delete('pwv-admin')
  return res
}
