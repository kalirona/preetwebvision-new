'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export default function AdminLoginPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Login failed')
      toast.success('Welcome back!', { description: 'Redirecting to dashboard…' })
      setTimeout(() => { window.location.href = '/admin/dashboard' }, 800)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-brand-gradient opacity-20 blur-[100px] animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full opacity-20 blur-[110px] animate-float"
          style={{ background: 'var(--brand-rose)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-2xl">
          <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand-gradient opacity-15 blur-3xl" />

          {/* Logo + header */}
          <div className="relative text-center">
            <span className="inline-grid size-14 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg">
              <ShieldCheck className="size-7" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold tracking-tight">
              Admin <span className="text-gradient-brand">Login</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to manage submissions, chats, and AI replies
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="mt-7 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 rounded-xl bg-muted/30 pl-10"
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 rounded-xl bg-muted/30 pl-10 pr-10"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-brand-gradient text-white"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <>
                  Sign in
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </form>

          <a
            href="/"
            className="mt-6 flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to website
          </a>
        </div>
      </motion.div>
    </div>
  )
}
