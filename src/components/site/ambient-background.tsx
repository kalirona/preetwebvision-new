'use client'

import { cn } from '@/lib/utils'

export function AmbientBackground({ variant = 'default' }: { variant?: 'default' | 'soft' | 'strong' }) {
  const opacity = variant === 'strong' ? 'opacity-100' : variant === 'soft' ? 'opacity-50' : 'opacity-80'
  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', opacity)} aria-hidden>
      {/* grid */}
      <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      {/* orbs */}
      <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-brand-gradient opacity-30 blur-[100px] animate-float-slow" />
      <div
        className="absolute top-1/3 -right-24 h-80 w-80 rounded-full opacity-25 blur-[110px] animate-float"
        style={{ background: 'var(--brand-rose)' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full opacity-20 blur-[100px] animate-pulse-glow"
        style={{ background: 'var(--brand-amber)' }}
      />
    </div>
  )
}
