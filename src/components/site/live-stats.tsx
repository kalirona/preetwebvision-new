'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Eye, Users, Mail, TrendingUp, Activity } from 'lucide-react'
import { Reveal, GradientText } from '@/components/site/primitives'
import { cn } from '@/lib/utils'

type Metrics = {
  newsletter: number
  contacts: number
  blogViews: number
  chatLeads: number
}

export function LiveStatsWidget() {
  const [metrics, setMetrics] = React.useState<Metrics | null>(null)
  const [pulse, setPulse] = React.useState(false)

  const fetchMetrics = React.useCallback(async () => {
    try {
      const [nl, ct, bv] = await Promise.all([
        fetch('/api/newsletter').then((r) => r.json()),
        fetch('/api/contact').then((r) => r.json()),
        fetch('/api/blog').then((r) => r.json()),
      ])
      setMetrics({
        newsletter: nl?.count ?? 0,
        contacts: ct?.count ?? 0,
        blogViews: bv?.count ?? 0,
        chatLeads: 0,
      })
      setPulse(true)
      setTimeout(() => setPulse(false), 600)
    } catch {
      /* ignore */
    }
  }, [])

  React.useEffect(() => {
    fetchMetrics()
    const id = setInterval(fetchMetrics, 30000) // refresh every 30s
    return () => clearInterval(id)
  }, [fetchMetrics])

  const stats = [
    { label: 'Newsletter subscribers', value: metrics?.newsletter ?? '—', icon: Mail, accent: 'from-orange-500 to-pink-500', live: true },
    { label: 'Project inquiries', value: metrics?.contacts ?? '—', icon: Users, accent: 'from-fuchsia-500 to-rose-500', live: true },
    { label: 'Blog views', value: metrics?.blogViews ?? '—', icon: Eye, accent: 'from-amber-500 to-orange-500', live: true },
    { label: 'Avg. ROI delivered', value: '14x', icon: TrendingUp, accent: 'from-emerald-500 to-teal-500', live: false },
  ]

  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_right,#000,transparent_70%)]" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  Live studio metrics
                </span>
                <h3 className="mt-3 font-display text-xl font-bold tracking-tight sm:text-2xl">
                  The studio is <GradientText>alive</GradientText>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Real numbers from our systems, refreshing every 30 seconds.
                </p>
              </div>
              <button
                onClick={fetchMetrics}
                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/30 px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <Activity className={cn('size-3.5', pulse && 'text-emerald-500')} />
                Refresh
              </button>
            </div>

            <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className={cn(
                      'relative overflow-hidden rounded-2xl border border-border/60 bg-background/40 p-4',
                      pulse && 'glow-entrance'
                    )}
                  >
                    <div className={cn('pointer-events-none absolute -right-4 -top-4 size-12 rounded-full bg-gradient-to-br opacity-20 blur-xl', stat.accent)} />
                    <div className="relative flex items-center justify-between">
                      <span className={cn('grid size-9 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md', stat.accent)}>
                        <Icon className="size-4" />
                      </span>
                      {stat.live && (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-500">
                          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                          LIVE
                        </span>
                      )}
                    </div>
                    <p className="relative mt-3 font-display text-2xl font-bold tabular-nums">
                      {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                    </p>
                    <p className="relative mt-0.5 text-[11px] text-muted-foreground">{stat.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
