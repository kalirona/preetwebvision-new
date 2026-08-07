'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Star,
  Play,
  Calendar,
  TrendingUp,
  ShoppingCart,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Reveal,
  SectionHeading,
  GradientText,
  StaggerGroup,
  staggerItem,
  Counter,
  Marquee,
} from '@/components/site/primitives'
import { FaqWithSearch } from '@/components/site/faq-with-search'
import { AmbientBackground } from '@/components/site/ambient-background'
import { useNav } from '@/lib/nav-store'
import {
  SERVICES,
  PROCESS,
  FAQS,
  FEATURES_GRID,
  TECH_STACK,
  type Service,
} from '@/lib/site-data'
import { cn } from '@/lib/utils'

/* ----------------------------- Local data ----------------------------- */
const TRUST_STATS = [
  { value: 180, suffix: '+', label: 'Projects shipped' },
  { value: 98, suffix: '%', label: 'Client retention' },
  { value: 14, suffix: 'x', label: 'Avg. ROI' },
  { value: 40, suffix: '+', label: 'Senior experts' },
]

/* ============================== HERO ============================== */
function Hero() {
  const { setPage } = useNav()
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pt-16">
      <AmbientBackground variant="strong" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="size-3.5" style={{ color: 'var(--brand-pink)' }} />
              Our Services
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Services that{' '}
              <GradientText className="animate-gradient-pan bg-[length:220%_220%]">
                compound
              </GradientText>{' '}
              your growth
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              Five integrated capabilities — design, AI, engineering, growth and
              commerce — delivered by one senior team. Pick a single service or
              combine them into a compounding growth engine tailored to your goals.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                onClick={() => setPage('contact')}
                className="group relative h-12 overflow-hidden rounded-full bg-brand-gradient px-6 text-base text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(255,45,117,0.85)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Start a project
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 animate-shimmer opacity-40" />
              </Button>
              <Button
                onClick={() => setPage('portfolio')}
                variant="outline"
                className="h-12 rounded-full px-6 text-base backdrop-blur"
              >
                <Play className="size-4" />
                View work
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="flex flex-col items-center sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="font-display text-2xl font-bold sm:text-3xl">
                    <span className="text-gradient-brand">
                      <Counter value={s.value} suffix={s.suffix} />
                    </span>
                  </span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Floating orbit visual */}
        <Reveal delay={0.3}>
          <HeroOrbit />
        </Reveal>
      </div>
    </section>
  )
}

function HeroOrbit() {
  return (
    <div className="relative mx-auto mt-14 h-52 w-full max-w-2xl sm:mt-16 sm:h-60">
      {/* center glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative grid size-20 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_0_60px_-10px_rgba(255,45,117,0.7)] animate-pulse-glow sm:size-24">
          <Sparkles className="size-8" />
        </div>
      </div>
      {/* orbit rings */}
      <div className="absolute left-1/2 top-1/2 size-52 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/50 animate-spin-slow sm:size-72" />
      <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 hidden rounded-full border border-border/30 animate-spin-slow [animation-direction:reverse] sm:block" />
      {/* service icons around the ring */}
      {SERVICES.map((s, i) => {
        const Icon = s.icon
        const angle = (i / SERVICES.length) * Math.PI * 2 - Math.PI / 2
        const radius = 104
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return (
          <div
            key={s.id}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            >
              <div
                className={cn(
                  'grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg sm:size-14',
                  s.accent
                )}
                title={s.title}
              >
                <Icon className="size-5 sm:size-6" />
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

/* ============================== SERVICES DETAILED ============================== */
function ServicesDetailed() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Five services, <GradientText>one integrated team</GradientText>
            </>
          }
          description="Each capability is senior-led and engineered to compound with the others. Explore the deliverables, scope and outcomes for every service we offer."
        />

        <div className="mt-16 flex flex-col gap-16 sm:gap-24 sm:mt-20">
          {SERVICES.map((service, i) => (
            <ServiceRow key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceRow({
  service,
  index,
}: {
  service: Service
  index: number
}) {
  const { setPage } = useNav()
  const Icon = service.icon
  const reversed = index % 2 === 1

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {/* Content */}
      <Reveal delay={0.05} className={cn(reversed && 'lg:order-2')}>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              'grid size-14 place-items-center rounded-2xl bg-gradient-to-br text-white',
              service.accent,
              service.glow
            )}
          >
            <Icon className="size-7" />
          </span>
          <span className="font-mono text-sm text-muted-foreground/60">
            0{index + 1} / 05
          </span>
        </div>

        <h3 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          {service.title}
        </h3>
        <p
          className="mt-1.5 text-sm font-semibold"
          style={{ color: 'var(--brand-pink)' }}
        >
          {service.tagline}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {service.description}
        </p>

        {/* Features grid */}
        <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {service.features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <span className="text-foreground/90">{f}</span>
            </div>
          ))}
        </div>

        {/* Deliverables */}
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Deliverables
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {service.deliverables.map((d) => (
              <span
                key={d}
                className="rounded-full border border-border/60 bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground/90 backdrop-blur"
              >
                {d}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            onClick={() => setPage('contact')}
            className={cn(
              'group rounded-full bg-gradient-to-br text-white shadow-md',
              service.accent
            )}
          >
            Start this project
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            onClick={() => setPage('portfolio')}
            variant="outline"
            className="rounded-full"
          >
            See related work
          </Button>
        </div>
      </Reveal>

      {/* Visual */}
      <Reveal delay={0.15} className={cn('relative', reversed && 'lg:order-1')}>
        <ServiceVisual service={service} index={index} />
      </Reveal>
    </div>
  )
}

function ServiceVisual({
  service,
  index,
}: {
  service: Service
  index: number
}) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* gradient orb backdrop */}
      <div
        className={cn(
          'absolute inset-6 rounded-full bg-gradient-to-br opacity-25 blur-3xl',
          service.accent
        )}
      />
      <div
        className={cn(
          'absolute inset-1/4 rounded-full bg-gradient-to-br opacity-20 blur-2xl animate-pulse-glow',
          service.accent
        )}
      />
      {/* orbit ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-border/40 animate-spin-slow" />

      {/* content centered */}
      <div className="absolute inset-0 grid place-items-center p-6">
        {index === 0 && <WebDesignVisual />}
        {index === 1 && <AiVisual />}
        {index === 2 && <WebAppVisual service={service} />}
        {index === 3 && <SeoVisual service={service} />}
        {index === 4 && <EcomVisual />}
      </div>
    </div>
  )
}

/* ---------- Visual 1: Web Design — browser mock + swatches ---------- */
function WebDesignVisual() {
  return (
    <div className="relative w-[90%] max-w-sm">
      <div className="overflow-hidden rounded-2xl glass-strong shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-rose-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 truncate rounded-md bg-muted/60 px-2 py-0.5 text-[10px] text-muted-foreground">
            preetwebvision.com
          </span>
        </div>
        <div className="space-y-3 p-4">
          <div className="h-2.5 w-2/3 rounded-full bg-muted" />
          <div className="h-2 w-1/2 rounded-full bg-muted/70" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-12 rounded-lg bg-brand-gradient opacity-90" />
            <div className="h-12 rounded-lg bg-muted/60" />
            <div className="h-12 rounded-lg bg-muted/40" />
          </div>
          <div className="h-7 rounded-full bg-brand-gradient opacity-90" />
        </div>
      </div>

      {/* Floating swatch card */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-4 -left-4 w-32 rounded-xl glass-strong p-2.5 shadow-xl"
      >
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
          Design system
        </p>
        <div className="mt-1.5 flex gap-1">
          <span className="size-4 rounded-full" style={{ background: 'var(--brand-orange)' }} />
          <span className="size-4 rounded-full" style={{ background: 'var(--brand-pink)' }} />
          <span className="size-4 rounded-full" style={{ background: 'var(--brand-rose)' }} />
          <span className="size-4 rounded-full" style={{ background: 'var(--brand-amber)' }} />
        </div>
      </motion.div>

      {/* Floating a11y badge */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -top-3 -right-3 rounded-xl glass-strong px-3 py-2 shadow-xl"
      >
        <p className="text-[9px] text-muted-foreground">Lighthouse</p>
        <p className="font-display text-lg font-bold text-gradient-brand">
          <Counter value={96} />
        </p>
      </motion.div>
    </div>
  )
}

/* ---------- Visual 2: AI Automation — chatbot mock ---------- */
function AiVisual() {
  return (
    <div className="relative w-[90%] max-w-sm">
      <div className="rounded-2xl glass-strong p-4 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <span className="grid size-8 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 text-white">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-xs font-bold">Support Agent</p>
            <p className="text-[10px] text-emerald-500">● online</p>
          </div>
        </div>
        <div className="space-y-2 py-3">
          <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-muted/70 px-3 py-1.5 text-[11px]">
            Hi! How can I help with your order today?
          </div>
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-bl-sm bg-brand-gradient px-3 py-1.5 text-[11px] text-white">
            Where is my refund?
          </div>
          <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-muted/70 px-3 py-1.5 text-[11px]">
            Found it — refund of $48 issued ✨ ETA 2 business days.
          </div>
          <div className="flex items-center gap-1 w-fit rounded-2xl rounded-br-sm bg-muted/70 px-3 py-2.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-3 -left-4 w-36 rounded-xl glass-strong p-2.5 shadow-xl"
      >
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
          Auto-resolved
        </p>
        <div className="mt-0.5 flex items-end justify-between">
          <p className="font-display text-xl font-bold text-gradient-brand">
            <Counter value={71} suffix="%" />
          </p>
          <TrendingUp className="size-4 text-emerald-500" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
        className="absolute -top-3 -right-3 rounded-xl glass-strong px-3 py-2 shadow-xl"
      >
        <p className="text-[9px] text-muted-foreground">Resp. time</p>
        <p className="font-display text-sm font-bold text-emerald-500">-89%</p>
      </motion.div>
    </div>
  )
}

/* ---------- Visual 3: Web App — dashboard mock ---------- */
function WebAppVisual({ service }: { service: Service }) {
  const stats = [
    { l: 'Users', v: '12k' },
    { l: 'MRR', v: '$48k' },
    { l: 'Churn', v: '1.2%' },
  ]
  return (
    <div className="relative w-[90%] max-w-sm">
      <div className="overflow-hidden rounded-2xl glass-strong shadow-2xl">
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-2.5">
          <p className="text-xs font-bold">Atlas Dashboard</p>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-500">
            LIVE
          </span>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div key={s.l} className="rounded-lg bg-muted/40 p-2">
                <p className="text-[9px] text-muted-foreground">{s.l}</p>
                <p className="font-display text-sm font-bold">{s.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-lg bg-muted/30 p-3">
            <div className="flex items-center justify-between">
              <p className="text-[9px] text-muted-foreground">Events / day</p>
              <span className="text-[9px] font-semibold text-emerald-500">+18%</span>
            </div>
            <div className="mt-2 flex items-end gap-1">
              {[40, 55, 48, 70, 62, 85, 75, 95, 80, 100, 88, 92].map((h, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex-1 rounded-sm bg-gradient-to-t opacity-80',
                    service.accent
                  )}
                  style={{ height: `${h * 0.32}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-3 -left-4 w-32 rounded-xl glass-strong p-2.5 shadow-xl"
      >
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
          Uptime
        </p>
        <p className="font-display text-lg font-bold text-emerald-500">99.98%</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute -top-3 -right-3 rounded-xl glass-strong px-3 py-2 shadow-xl"
      >
        <p className="text-[9px] text-muted-foreground">API calls</p>
        <p className="font-display text-sm font-bold text-gradient-brand">
          <Counter value={2} suffix="M+" />
        </p>
      </motion.div>
    </div>
  )
}

/* ---------- Visual 4: SEO — ranking chart mock ---------- */
function SeoVisual({ service }: { service: Service }) {
  const keywords = [
    { kw: 'best skincare brand', pos: 1 },
    { kw: 'organic face wash', pos: 2 },
    { kw: 'vitamin c serum', pos: 3 },
    { kw: 'cruelty free products', pos: 5 },
  ]
  return (
    <div className="relative w-[90%] max-w-sm">
      <div className="rounded-2xl glass-strong p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">Keyword rankings</p>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[9px] font-semibold text-emerald-500">
            +217% traffic
          </span>
        </div>
        <div className="mt-3 space-y-2">
          {keywords.map((k) => (
            <div
              key={k.kw}
              className="flex items-center justify-between rounded-lg bg-muted/40 px-2.5 py-1.5"
            >
              <span className="truncate text-[11px] text-foreground/90">{k.kw}</span>
              <span className="flex shrink-0 items-center gap-1 pl-2">
                <span className="font-display text-sm font-bold text-gradient-brand">
                  #{k.pos}
                </span>
                <TrendingUp className="size-3 text-emerald-500" />
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-muted/30 p-2.5">
          <div className="flex items-end gap-1">
            {[8, 12, 10, 18, 24, 30, 45, 60, 75, 92].map((h, i) => (
              <div
                key={i}
                className={cn(
                  'flex-1 rounded-sm bg-gradient-to-t opacity-80',
                  service.accent
                )}
                style={{ height: `${h * 0.3}px` }}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-3 -left-4 w-32 rounded-xl glass-strong p-2.5 shadow-xl"
      >
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
          Keywords #1
        </p>
        <p className="font-display text-lg font-bold text-gradient-brand">
          <Counter value={140} />
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute -top-3 -right-3 rounded-xl glass-strong px-3 py-2 shadow-xl"
      >
        <p className="text-[9px] text-muted-foreground">Leads</p>
        <p className="font-display text-sm font-bold text-emerald-500">+3.4x</p>
      </motion.div>
    </div>
  )
}

/* ---------- Visual 5: Ecommerce — product card mock ---------- */
function EcomVisual() {
  return (
    <div className="relative w-[90%] max-w-sm">
      <div className="overflow-hidden rounded-2xl glass-strong shadow-2xl">
        <div className="relative h-28 bg-gradient-to-br from-rose-500 to-pink-500">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <span className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-semibold text-white backdrop-blur">
            -20%
          </span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">
            🛍️
          </span>
        </div>
        <div className="p-3.5">
          <p className="text-[10px] text-muted-foreground">Lumen Beauty</p>
          <p className="font-display text-sm font-bold">Glow Serum</p>
          <div className="mt-1.5 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-base font-bold text-gradient-brand">
                $38
              </span>
              <span className="text-[10px] text-muted-foreground line-through">
                $48
              </span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <div className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-full bg-brand-gradient py-1.5 text-[11px] font-semibold text-white">
            <ShoppingCart className="size-3.5" />
            Add to cart
          </div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-3 -left-4 w-32 rounded-xl glass-strong p-2.5 shadow-xl"
      >
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
          Conv. rate
        </p>
        <p className="font-display text-lg font-bold text-emerald-500">+38%</p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        className="absolute -top-3 -right-3 rounded-xl glass-strong px-3 py-2 shadow-xl"
      >
        <p className="text-[9px] text-muted-foreground">Revenue</p>
        <p className="font-display text-sm font-bold text-gradient-brand">+62%</p>
      </motion.div>
    </div>
  )
}

/* ============================== PROCESS ============================== */
function ProcessSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A proven path from <GradientText>idea to impact</GradientText>
            </>
          }
          description="No black boxes. A four-step process that keeps you in the loop from kickoff to launch and beyond — and keeps the work shipping on time."
        />

        <div className="relative mt-16">
          {/* horizontal connecting line — desktop */}
          <div className="absolute left-8 right-8 top-8 hidden h-px bg-gradient-to-r from-orange-500/30 via-pink-500/40 to-rose-500/30 lg:block" />
          {/* vertical connecting line — mobile / tablet */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-orange-500/30 via-pink-500/40 to-rose-500/30 lg:hidden" />

          <StaggerGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {PROCESS.map((p, i) => {
              const Icon = p.icon
              return (
                <motion.div key={p.step} variants={staggerItem} className="relative pl-20 sm:pl-0 lg:pl-0">
                  <div className="relative z-10 grid size-16 place-items-center rounded-2xl border border-border/60 bg-card shadow-sm lg:mx-0 sm:absolute sm:left-0 sm:top-0 lg:static">
                    <Icon className="size-6" style={{ color: 'var(--brand-pink)' }} />
                    <span className="absolute -right-2 -top-2 grid size-7 place-items-center rounded-full bg-brand-gradient text-[11px] font-bold text-white shadow-md ring-4 ring-background">
                      {p.step}
                    </span>
                  </div>
                  <div className="mt-5 sm:mt-24 lg:mt-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
                      Step {p.step}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}

/* ============================== TECH STACK ============================== */
function TechStackSection() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Built on a modern, battle-tested stack
          </p>
        </Reveal>
        <div className="mt-6">
          <Marquee items={TECH_STACK} reverse />
        </div>
      </div>
    </section>
  )
}

/* ============================== WHY CHOOSE US ============================== */
function WhyChooseUs() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why teams choose us"
          title={
            <>
              Built different, <GradientText>end to end</GradientText>
            </>
          }
          description="From the first wireframe to the last automation, every layer of your product is engineered to perform — fast, secure, measurable and beautiful."
        />

        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES_GRID.map((f) => {
            const Icon = f.icon
            return (
              <motion.div key={f.title} variants={staggerItem}>
                <div className="group h-full rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-border">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-gradient-soft transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" style={{ color: 'var(--brand-pink)' }} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-bold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {f.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}

/* ============================== FAQ ============================== */
function FaqSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Good to know"
          title={
            <>
              Services <GradientText>FAQ</GradientText>
            </>
          }
          description="Everything you need to know about how we scope, price and deliver our services. Still curious? Just ask."
        />
        <Reveal delay={0.1} className="mt-12">
          <FaqWithSearch faqs={FAQS} />
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== FINAL CTA ============================== */
function FinalCta() {
  const { setPage } = useNav()
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative rounded-[2.5rem] bg-gradient-to-br from-orange-500/70 via-pink-500/50 to-rose-500/40 p-[1.5px] shadow-2xl">
            <div className="relative overflow-hidden rounded-[calc(2.5rem-1.5px)] border border-border/40 bg-card p-8 sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
              <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-brand-gradient opacity-25 blur-3xl animate-pulse-glow" />
              <div
                className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full opacity-20 blur-3xl animate-float"
                style={{ background: 'var(--brand-amber)' }}
              />

              <div className="relative mx-auto max-w-2xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  3 project slots left this quarter
                </span>
                <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl">
                  Ready to build <GradientText>with us?</GradientText>
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
                  Tell us where you want to grow — we&apos;ll bring the design,
                  engineering, AI and growth to get you there. First call is on us.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Button
                    onClick={() => setPage('contact')}
                    className="group relative h-12 overflow-hidden rounded-full bg-brand-gradient px-6 text-base text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(255,45,117,0.85)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Start a project
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 animate-shimmer opacity-40" />
                  </Button>
                  <Button
                    onClick={() => setPage('contact')}
                    variant="outline"
                    className="h-12 rounded-full px-6 text-base backdrop-blur"
                  >
                    <Calendar className="size-4" />
                    Book a call
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== PAGE ============================== */
export function ServicesPage() {
  return (
    <div className="relative">
      <Hero />
      <ServicesDetailed />
      <ProcessSection />
      <TechStackSection />
      <WhyChooseUs />
      <FaqSection />
      <FinalCta />
    </div>
  )
}
