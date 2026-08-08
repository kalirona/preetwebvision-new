'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Star,
  Sparkles,
  Quote,
  Plus,
  Minus,
  CheckCircle2,
  Play,
  Zap,
  ChevronLeft,
  ChevronRight,
  Pause,
  Calculator,
  Clock,
  BookOpen,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Reveal,
  SectionHeading,
  StaggerGroup,
  staggerItem,
  Counter,
  Marquee,
  GradientText,
} from '@/components/site/primitives'
import { AmbientBackground } from '@/components/site/ambient-background'
import { RoiCalculator } from '@/components/site/roi-calculator'
import { FaqWithSearch } from '@/components/site/faq-with-search'
import { LiveStatsWidget } from '@/components/site/live-stats'
import { SvgDivider } from '@/components/site/svg-divider'
import { useNav } from '@/lib/nav-store'
import { BLOG_POSTS } from '@/lib/content-data'
import {
  SERVICES,
  STATS,
  PROCESS,
  PROJECTS,
  TESTIMONIALS,
  FAQS,
  TRUSTED_BY,
  FEATURES_GRID,
  AWARDS,
  TECH_STACK,
} from '@/lib/site-data'
import { cn } from '@/lib/utils'
import { useCursorGlow } from '@/hooks/use-cursor-glow'

/* ============================== HERO ============================== */
function Hero() {
  const { setPage } = useNav()
  const heroRef = useCursorGlow<HTMLElement>()
  return (
    <section ref={heroRef} className="cursor-glow relative overflow-hidden pb-20 pt-10 sm:pt-16">
      <AmbientBackground variant="strong" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: copy */}
          <div className="relative">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <span className="flex size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Now booking Q3 projects · 3 slots left
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                We build{' '}
                <span className="text-gradient-brand animate-gradient-pan bg-[length:220%_220%] text-glow-brand">
                  stunning
                </span>{' '}
                digital experiences that{' '}
                <span className="relative whitespace-nowrap">
                  <span className="text-gradient-warm text-glow-soft">grow</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 12"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M2 9C40 3 160 3 198 9"
                      stroke="url(#under)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="under" x1="0" y1="0" x2="200" y2="0">
                        <stop stopColor="var(--brand-orange)" />
                        <stop offset="1" stopColor="var(--brand-rose)" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>{' '}
                brands.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
                Preet Web Vision is a digital studio crafting{' '}
                <span className="text-foreground font-medium">websites, AI automations, web apps, SEO</span> and{' '}
                <span className="text-foreground font-medium">ecommerce</span> experiences — engineered to turn visitors into revenue.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => setPage('contact')}
                  className="group relative h-12 overflow-hidden rounded-full bg-brand-gradient px-6 text-base text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(255,45,117,0.85)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start your project
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
                  View our work
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-medium text-foreground">4.9/5</span>
                  <span>· 120+ reviews</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  98% client retention
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="size-4" style={{ color: 'var(--brand-orange)' }} />
                  14x avg. ROI
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: visual */}
          <Reveal delay={0.2} className="relative">
            <HeroVisual />
          </Reveal>
        </div>

        {/* Awards row */}
        <Reveal delay={0.3}>
          <div className="mt-16 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {AWARDS.map((a) => (
              <div
                key={a.label}
                className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 backdrop-blur"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-brand-gradient-soft">
                  <a.icon className="size-5" style={{ color: 'var(--brand-pink)' }} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold">{a.label}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* central orb */}
      <div className="absolute inset-1/4 rounded-full bg-brand-gradient opacity-30 blur-2xl animate-pulse-glow" />
      <div className="absolute inset-1/3 rounded-full bg-brand-gradient animate-gradient-pan bg-[length:200%_200%] shadow-[0_0_80px_-10px_rgba(255,45,117,0.7)]" />

      {/* orbit ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-border/50 animate-spin-slow" />
      <div className="absolute inset-[12%] rounded-full border border-border/40 animate-spin-slow [animation-direction:reverse]" />

      {/* floating cards */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-2 top-8 w-44 rounded-2xl glass-strong p-3.5 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-emerald-500/15 text-emerald-500">
            <Zap className="size-4" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">Conversion</p>
            <p className="font-display text-sm font-bold">+38%</p>
          </div>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-3/4 rounded-full bg-brand-gradient" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -right-2 top-1/3 w-44 rounded-2xl glass-strong p-3.5 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-fuchsia-500/15 text-fuchsia-500">
            <Sparkles className="size-4" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">AI tickets resolved</p>
            <p className="font-display text-sm font-bold">71% auto</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-end gap-1">
          {[40, 65, 50, 80, 70, 95, 60].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-brand-gradient opacity-80"
              style={{ height: `${h * 0.32}px` }}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-2 left-6 w-48 rounded-2xl glass-strong p-3.5 shadow-xl"
      >
        <p className="text-[11px] text-muted-foreground">Lighthouse</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="font-display text-2xl font-bold text-gradient-brand">96</p>
          <div className="flex gap-1">
            {['Perf', 'A11y', 'SEO'].map((t) => (
              <span key={t} className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                100
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

/* ============================== TRUSTED BY ============================== */
function TrustedBy() {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Trusted by 180+ ambitious brands worldwide
          </p>
        </Reveal>
        <div className="mt-6">
          <Marquee items={TRUSTED_BY} />
        </div>
      </div>
    </section>
  )
}

/* ============================== SERVICES OVERVIEW ============================== */
function ServicesOverview() {
  const { setPage } = useNav()
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title={
            <>
              Everything your brand needs to <GradientText>win online</GradientText>
            </>
          }
          description="Five core services, one integrated team. Pick one or combine them into a growth engine tailored to your goals."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.div key={s.id} variants={staggerItem} className="h-full">
              <ServiceCard service={s} index={i} />
            </motion.div>
          ))}
          {/* CTA card */}
          <motion.button
            variants={staggerItem}
            onClick={() => setPage('services')}
            className="group relative flex h-full min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-border/70 bg-muted/20 p-6 text-left transition-colors hover:border-border"
          >
            <span className="absolute -right-8 -top-8 size-32 rounded-full bg-brand-gradient opacity-10 blur-2xl transition-opacity group-hover:opacity-25" />
            <div>
              <span className="grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg">
                <ArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">
                See all services in detail
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Explore deliverables, process and outcomes for each capability.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
              Explore services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
        </StaggerGroup>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number]
  index: number
}) {
  const Icon = service.icon
  const ctaText: Record<string, string> = {
    'web-design': 'Explore web design',
    'ai-automation': 'Discover AI solutions',
    'web-apps': 'See app capabilities',
    'seo': 'Boost your rankings',
    'ecommerce': 'Grow your store',
  }
  const cta = ctaText[service.id] || 'Learn more'
  return (
    <a
      href={`/services/${service.slug}`}
      className="group card-sheen relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <span
        className={cn(
          'pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-30',
          service.accent
        )}
      />
      <div className="relative flex items-center justify-between">
        <span
          className={cn(
            'grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110',
            service.accent
          )}
        >
          <Icon className="size-6" />
        </span>
        <span className="font-mono text-xs text-muted-foreground/60">
          0{index + 1}
        </span>
      </div>
      <h3 className="relative mt-5 font-display text-xl font-bold tracking-tight">
        {service.title}
      </h3>
      <p className="relative mt-1 text-sm font-medium" style={{ color: 'var(--brand-pink)' }}>
        {service.tagline}
      </p>
      <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground/90">
        {service.description}
      </p>
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {service.features.slice(0, 3).map((f) => (
          <span
            key={f}
            className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground"
          >
            {f}
          </span>
        ))}
      </div>
      <span className="relative mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold">
        {cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </a>
  )
}

/* ============================== STATS ============================== */
function StatsBand() {
  return (
    <section className="relative py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 sm:p-10">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
          <div className="pointer-events-none absolute -left-20 top-1/2 size-64 -translate-y-1/2 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
          <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="text-center sm:text-left">
                <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                  <span className="text-gradient-brand">
                    <Counter value={s.value} suffix={s.suffix} />
                  </span>
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================== FEATURES / WHY US ============================== */
function WhyUs() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why Preet Web Vision"
              title={
                <>
                  Senior craft, <GradientText>AI-native</GradientText> thinking, real outcomes
                </>
              }
              description="We're not a body shop. We're a small, senior team that pairs design obsessiveness with modern engineering and AI — so every project ships beautiful, fast and measurable."
            />
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="rounded-full bg-brand-gradient text-white">
                  <Sparkles className="size-4" />
                  See our process
                </Button>
              </div>
            </Reveal>
          </div>
          <StaggerGroup className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FEATURES_GRID.map((f) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  variants={staggerItem}
                  className="group flex gap-3 rounded-2xl border border-border/60 bg-card p-4 transition-colors hover:border-border"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft">
                    <Icon className="size-5" style={{ color: 'var(--brand-pink)' }} />
                  </span>
                  <div>
                    <p className="font-display text-sm font-bold">{f.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                      {f.description}
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

/* ============================== PROCESS ============================== */
function Process() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How we work"
          title={
            <>
              A clear path from <GradientText>idea to impact</GradientText>
            </>
          }
          description="No black boxes. A proven four-step process that keeps you in the loop from kickoff to launch and beyond."
        />
        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p) => {
              const Icon = p.icon
              return (
                <motion.div key={p.step} variants={staggerItem} className="relative">
                  <div className="relative z-10 mx-auto grid size-14 place-items-center rounded-2xl border border-border/60 bg-card text-foreground shadow-sm lg:mx-0">
                    <Icon className="size-6" style={{ color: 'var(--brand-pink)' }} />
                    <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-brand-gradient text-[10px] font-bold text-white">
                      {p.step}
                    </span>
                  </div>
                  <div className="mt-5 text-center lg:text-left">
                    <h3 className="font-display text-lg font-bold">{p.title}</h3>
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

/* ============================== PORTFOLIO PREVIEW ============================== */
function PortfolioPreview() {
  const { setPage } = useNav()
  const featured = PROJECTS.slice(0, 4)
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Selected work"
            title={
              <>
                Results we&apos;re <GradientText>proud of</GradientText>
              </>
            }
            description="A glimpse of recent projects across ecommerce, AI, web apps and brand sites."
            className="max-w-xl"
          />
          <Reveal delay={0.1}>
            <Button
              onClick={() => setPage('portfolio')}
              variant="outline"
              className="rounded-full"
            >
              View all work
              <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2">
          {featured.map((p) => (
            <motion.button
              key={p.id}
              variants={staggerItem}
              onClick={() => setPage('portfolio')}
              className="group relative aspect-[16/11] overflow-hidden rounded-3xl border border-border/60 text-left"
            >
              <div className={cn('absolute inset-0 bg-gradient-to-br', p.gradient)} />
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {p.category}
              </span>
              <span className="absolute left-4 top-4 text-4xl drop-shadow-lg">{p.emoji}</span>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs text-white/70">{p.client} · {p.year}</p>
                <h3 className="mt-1 font-display text-lg font-bold text-white">{p.title}</h3>
                <p className="mt-1.5 text-sm text-white/80 line-clamp-2">{p.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {p.metric.map((m) => (
                    <div key={m.label} className="rounded-lg bg-white/10 px-2.5 py-1 backdrop-blur">
                      <p className="text-[10px] uppercase tracking-wide text-white/60">{m.label}</p>
                      <p className="text-sm font-bold text-white">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <span className="absolute right-4 top-1/2 grid size-11 -translate-y-1/2 translate-x-4 place-items-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                <ArrowRight className="size-5" />
              </span>
            </motion.button>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

/* ============================== TESTIMONIALS ============================== */
function Testimonials() {
  const [active, setActive] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const t = TESTIMONIALS[active]

  const go = React.useCallback(
    (dir: 1 | -1) => setActive((a) => (a + dir + TESTIMONIALS.length) % TESTIMONIALS.length),
    []
  )

  React.useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5500)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Client love"
          title={
            <>
              Don&apos;t take our word for it — <GradientText>take theirs</GradientText>
            </>
          }
        />
        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 rounded-[3rem] bg-brand-gradient opacity-10 blur-3xl" />
          <Reveal>
            <Card className="relative overflow-hidden rounded-3xl border-border/60 bg-card p-8 sm:p-10">
              <Quote className="absolute right-6 top-6 size-16 text-muted-foreground/10" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed sm:text-2xl">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-7 flex items-center gap-3">
                    <Avatar className="size-12 border-2 border-background">
                      <AvatarFallback className={cn('bg-gradient-to-br text-white', t.accent)}>
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-display font-bold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </Card>
          </Reveal>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid size-9 place-items-center rounded-full border border-border/70 bg-muted/30 text-muted-foreground transition-colors hover:text-foreground hover:border-border"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    i === active ? 'w-8 bg-brand-gradient' : 'w-2 bg-border hover:bg-muted-foreground/40'
                  )}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid size-9 place-items-center rounded-full border border-border/70 bg-muted/30 text-muted-foreground transition-colors hover:text-foreground hover:border-border"
            >
              <ChevronRight className="size-4" />
            </button>
            <span className="ml-1 flex items-center gap-1 text-[11px] text-muted-foreground">
              {paused ? <Pause className="size-3" /> : null}
              {paused ? 'Paused' : 'Auto'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================== AI DEMO CTA ============================== */
function AiDemoCta() {
  const { setPage } = useNav()
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-card p-8 sm:p-12 lg:p-16">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_right,#000,transparent_70%)]" />
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-brand-gradient opacity-20 blur-3xl animate-pulse-glow" />
          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <Reveal>
                <Badge className="rounded-full border-border/60 bg-brand-gradient-soft text-foreground">
                  <Sparkles className="size-3.5" />
                  AI Automation, live on this site
                </Badge>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  This chatbot is built by us. <GradientText>Yours could be next.</GradientText>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-lg text-muted-foreground">
                  Tap the glowing assistant in the corner — it&apos;s a real LLM agent trained on our services. We build the same for your business: support, sales, ops and beyond.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    onClick={() => setPage('contact')}
                    className="rounded-full bg-brand-gradient text-white"
                  >
                    Build my AI agent
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    onClick={() => setPage('services')}
                    variant="outline"
                    className="rounded-full"
                  >
                    Explore AI services
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="relative mx-auto w-full max-w-sm">
                <div className="rounded-3xl glass-strong p-5 shadow-2xl">
                  <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                    <span className="grid size-9 place-items-center rounded-full bg-brand-gradient text-white">
                      <Sparkles className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-bold">Vision AI</p>
                      <p className="text-[11px] text-emerald-500">● online</p>
                    </div>
                  </div>
                  <div className="space-y-2.5 py-4">
                    <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-brand-gradient px-3.5 py-2 text-sm text-white">
                      Can you automate my customer support?
                    </div>
                    <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-muted/70 px-3.5 py-2 text-sm">
                      Absolutely ✨ We deploy LLM agents with a RAG knowledge base of your docs — most clients see 60–80% of tickets auto-resolved. Want a demo?
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-muted/70 px-4 py-3 w-fit">
                      {[0, 1, 2].map((i) => (
                        <span key={i} className="size-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================== TECH STACK ============================== */
function TechStack() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Our modern, battle-tested stack
          </p>
        </Reveal>
        <div className="mt-6">
          <Marquee items={TECH_STACK} reverse />
        </div>
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
              Questions, <GradientText>answered</GradientText>
            </>
          }
        />
        <Reveal delay={0.1} className="mt-12">
          <FaqWithSearch faqs={FAQS} />
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== ROI CALCULATOR ============================== */
function RoiSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="See your potential"
          title={
            <>
              What could <GradientText>your growth</GradientText> look like?
            </>
          }
          description="A quick, interactive estimate based on the lifts our clients typically see. Drag, explore, and imagine the upside."
        />
        <Reveal delay={0.1} className="mt-12">
          <RoiCalculator />
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== BLOG PREVIEW ============================== */
function BlogPreview() {
  const { setPage } = useNav()
  const posts = BLOG_POSTS.slice(0, 3)
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="From the blog"
            title={
              <>
                Ideas worth <GradientText>stealing</GradientText>
              </>
            }
            description="Field-tested insights on web, AI, SEO and growth — from the team shipping them daily."
            className="max-w-xl"
          />
          <Reveal delay={0.1}>
            <Button
              onClick={() => setPage('blog')}
              variant="outline"
              className="rounded-full"
            >
              <BookOpen className="size-4" />
              Read the blog
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.button
              key={post.id}
              variants={staggerItem}
              onClick={() => setPage('blog')}
              className="group card-sheen relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl"
            >
              <div className={cn('relative h-36 overflow-hidden bg-gradient-to-br', post.gradient)}>
                <div className="absolute inset-0 grid-bg opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute left-4 top-4 text-4xl drop-shadow-lg">{post.emoji}</span>
                <span className="absolute right-3 top-3 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Clock className="size-3" />
                  {post.readingMinutes} min read
                </div>
                <h3 className="mt-2 font-display text-base font-bold leading-snug tracking-tight line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold">
                  Read article
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.button>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}

/* ============================== PAGE ============================== */
export function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <TrustedBy />
      <SvgDivider />
      <ServicesOverview />
      <SvgDivider />
      <StatsBand />
      <RoiSection />
      <SvgDivider />
      <WhyUs />
      <Process />
      <SvgDivider />
      <PortfolioPreview />
      <Testimonials />
      <AiDemoCta />
      <LiveStatsWidget />
      <SvgDivider />
      <BlogPreview />
      <TechStack />
      <FaqSection />
    </div>
  )
}
