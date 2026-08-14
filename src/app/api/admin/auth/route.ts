import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, getClientIP } from '@/lib/rate-limit'
import { createHash, timingSafeEqual } from 'crypto'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@preetwebvision.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'preet2025'

// Hash password with SHA-256 + salt for comparison
function hashPassword(password: string): string {
  return createHash('sha256').update(password.trim() + '|pwv-salt-2025').digest('hex')
}

// Timing-safe comparison to prevent timing attacks
function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

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

    // Case-insensitive email + trim whitespace + hashed password comparison
    const inputEmail = String(email).trim().toLowerCase()
    const inputPasswordHash = hashPassword(String(password))
    const envEmail = ADMIN_EMAIL.trim().toLowerCase()
    const envPasswordHash = hashPassword(ADMIN_PASSWORD)

    if (inputEmail === envEmail && safeCompare(inputPasswordHash, envPasswordHash)) {
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
