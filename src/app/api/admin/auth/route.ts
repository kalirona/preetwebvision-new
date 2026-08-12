import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIP } from '@/lib/rate-limit'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@preetwebvision.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'preet2025'

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('pwv-admin')
  if (cookie?.value) {
    return NextResponse.json({ ok: true, authenticated: true })
  }
  return NextResponse.json({ ok: false, authenticated: false }, { status: 401 })
}

export async function POST(req: NextRequest) {
  try {
    // Brute force protection: 5 attempts per 15 minutes
    const ip = getClientIP(req)
    const { limited } = rateLimit(`admin-login-${ip}`, { limit: 5, window: 900000 })
    if (limited) {
      return NextResponse.json(
        { ok: false, error: 'Too many login attempts. Try again in 15 minutes.' },
        { status: 429 }
      )
    }

    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: 'Email and password required.' },
        { status: 400 }
      )
    }

    // Case-insensitive email + trim whitespace for both
    const inputEmail = String(email).trim().toLowerCase()
    const inputPassword = String(password).trim()
    const envEmail = ADMIN_EMAIL.trim().toLowerCase()
    const envPassword = ADMIN_PASSWORD.trim()

    if (inputEmail === envEmail && inputPassword === envPassword) {
      // Create a simple session token (in production, use JWT or signed cookies)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64')
      const res = NextResponse.json({ ok: true, token, email })
      res.cookies.set('pwv-admin', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
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
