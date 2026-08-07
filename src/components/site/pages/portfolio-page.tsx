'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Quote,
  Star,
  Filter,
  Lightbulb,
  PenTool,
  Code2,
  Rocket,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Reveal,
  SectionHeading,
  GradientText,
  StaggerGroup,
  staggerItem,
  Counter,
  Marquee,
} from '@/components/site/primitives'
import { AmbientBackground } from '@/components/site/ambient-background'
import { useNav } from '@/lib/nav-store'
import {
  PROJECTS,
  STATS,
  TESTIMONIALS,
  TRUSTED_BY,
  type Project,
} from '@/lib/site-data'
import { cn } from '@/lib/utils'

/* ============================== HERO ============================== */
function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pt-16">
      <AmbientBackground variant="strong" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
              <span className="size-1.5 rounded-full bg-brand-gradient" />
              Selected Work
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Work that <GradientText className="animate-gradient-pan bg-[length:220%_220%]">moves metrics</GradientText>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              A selection of recent projects across ecommerce, AI automation, web apps,
              SEO and brand sites. Each one engineered to look stunning and perform even better.
            </p>
          </Reveal>
        </div>

        {/* Stats strip — glass band */}
        <Reveal delay={0.18}>
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/60 glass-strong p-6 sm:p-8">
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
            <div className="pointer-events-none absolute -left-20 top-1/2 size-56 -translate-y-1/2 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 top-1/2 size-56 -translate-y-1/2 rounded-full opacity-15 blur-3xl" style={{ background: 'var(--brand-rose)' }} />
            <div className="relative grid grid-cols-2 gap-6 sm:grid-cols-4">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.07} className="text-center sm:text-left">
                  <p className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                    <span className="text-gradient-brand">
                      <Counter value={s.value} suffix={s.suffix} />
                    </span>
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== FILTER BAR ============================== */
type FilterId = 'All' | Project['category']

function FilterBar({
  active,
  onChange,
  categories,
  counts,
}: {
  active: FilterId
  onChange: (id: FilterId) => void
  categories: FilterId[]
  counts: Record<string, number>
}) {
  return (
    <Reveal>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="size-4" />
          <span>Filter by category</span>
        </div>
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((cat) => {
            const isActive = active === cat
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => onChange(cat)}
                className={cn(
                  'group relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300',
                  isActive
                    ? 'text-white shadow-[0_8px_24px_-8px_rgba(255,107,53,0.6)]'
                    : 'border border-border/60 bg-card/60 text-muted-foreground hover:border-border hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-brand-gradient"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
                <span
                  className={cn(
                    'relative z-10 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums',
                    isActive ? 'bg-white/20 text-white' : 'bg-muted text-muted-foreground'
                  )}
                >
                  {counts[cat] ?? 0}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </Reveal>
  )
}

/* ============================== PROJECT CARD ============================== */
function ProjectCard({ project }: { project: Project }) {
  const { setPage } = useNav()
  return (
    <motion.button
      layout
      variants={staggerItem}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
      onClick={() => setPage('contact')}
      aria-label={`View case study: ${project.title}`}
      className="group relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-border/60 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {/* Gradient backdrop */}
      <div className={cn('absolute inset-0 bg-gradient-to-br', project.gradient)} />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      {/* Dark overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

      {/* Emoji top-left */}
      <span className="absolute left-4 top-4 text-4xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
        {project.emoji}
      </span>

      {/* Category badge top-right */}
      <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md ring-1 ring-white/20">
        {project.category}
      </span>

      {/* Hover "View case study" arrow — slides in from right */}
      <span className="absolute right-4 top-1/2 z-20 flex -translate-y-1/2 translate-x-6 items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        View case study
        <ArrowRight className="size-3.5" />
      </span>

      {/* Hover metrics overlay */}
      <div className="absolute inset-x-4 top-1/2 z-10 -translate-y-1/2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex flex-wrap gap-2">
          {project.metric.map((m) => (
            <div
              key={m.label}
              className="rounded-xl bg-black/40 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/15"
            >
              <p className="text-[9px] uppercase tracking-wider text-white/60">{m.label}</p>
              <p className="text-sm font-bold text-white">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-xs font-medium text-white/70">
          {project.client} · {project.year}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold leading-tight text-white">
          {project.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-white/80">{project.blurb}</p>
        {/* Metric chips — always visible */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  )
}

/* ============================== PROJECT GALLERY ============================== */
function ProjectGallery() {
  const categories: FilterId[] = React.useMemo(() => {
    const unique = Array.from(new Set(PROJECTS.map((p) => p.category)))
    return ['All', ...unique]
  }, [])

  const counts = React.useMemo(() => {
    const c: Record<string, number> = { All: PROJECTS.length }
    for (const p of PROJECTS) c[p.category] = (c[p.category] ?? 0) + 1
    return c
  }, [])

  const [active, setActive] = React.useState<FilterId>('All')

  const filtered = React.useMemo(
    () => (active === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  )

  return (
    <section id="gallery" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          align="left"
          eyebrow="The work"
          title={
            <>
              Projects that <GradientText>ship outcomes</GradientText>
            </>
          }
          description="Filter by discipline to explore how we&apos;ve helped brands grow with design, engineering, AI and growth."
          className="max-w-2xl"
        />

        <div className="mt-10">
          <FilterBar
            active={active}
            onChange={setActive}
            categories={categories}
            counts={counts}
          />
        </div>

        {/* Grid with AnimatePresence + layout for smooth reflow */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state — defensive */}
        {filtered.length === 0 && (
          <div className="mt-10 rounded-3xl border border-dashed border-border/60 p-12 text-center text-muted-foreground">
            No projects in this category yet.
          </div>
        )}

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl border border-border/60 bg-card/60 p-6 sm:flex-row sm:p-8">
            <div>
              <p className="font-display text-lg font-bold">Don&apos;t see your industry?</p>
              <p className="mt-1 text-sm text-muted-foreground">
                We&apos;ve shipped 180+ projects across nearly every vertical. Let&apos;s talk about yours.
              </p>
            </div>
            <StartProjectButton />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== PROCESS STRIP ============================== */
const APPROACH = [
  {
    step: '01',
    title: 'Discover',
    description: 'We dig into your goals, users and metrics to shape a sharp, prioritized roadmap.',
    icon: Lightbulb,
  },
  {
    step: '02',
    title: 'Design',
    description: 'Prototypes, design systems and motion studies you can feel before we build.',
    icon: PenTool,
  },
  {
    step: '03',
    title: 'Build',
    description: 'Clean, scalable engineering with AI and automation wired in from day one.',
    icon: Code2,
  },
  {
    step: '04',
    title: 'Launch & Scale',
    description: 'We ship, measure and optimize — turning launches into compounding growth.',
    icon: Rocket,
  },
]

function ProcessStrip() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How we approach projects"
          title={
            <>
              From <GradientText>discovery to scale</GradientText> — without the chaos
            </>
          }
          description="A proven four-step process that keeps you in the loop from kickoff to launch and beyond."
        />

        <div className="relative mt-16">
          {/* connecting gradient line — desktop */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
          <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {APPROACH.map((p) => {
              const Icon = p.icon
              return (
                <motion.div key={p.step} variants={staggerItem} className="relative">
                  <div className="relative z-10 mx-auto grid size-14 place-items-center rounded-2xl border border-border/60 bg-card shadow-sm transition-transform duration-300 hover:-translate-y-1 lg:mx-0">
                    <span className="absolute inset-0 rounded-2xl bg-brand-gradient opacity-0 blur-md transition-opacity duration-300 hover:opacity-30" />
                    <Icon className="size-6 relative" style={{ color: 'var(--brand-pink)' }} />
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

/* ============================== TRUSTED BY ============================== */
function TrustedBy() {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Brands we&apos;ve partnered with
          </p>
        </Reveal>
        <div className="mt-6">
          <Marquee items={TRUSTED_BY} />
        </div>
      </div>
    </section>
  )
}

/* ============================== TESTIMONIALS ============================== */
function TestimonialSection() {
  const featured = TESTIMONIALS[0]
  const rest = TESTIMONIALS.slice(1, 4)

  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Client love"
          title={
            <>
              Outcomes our clients <GradientText>talk about</GradientText>
            </>
          }
          description="Real words from real partners — across ecommerce, SaaS, finance and beyond."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Featured large quote card */}
          <Reveal>
            <Card className="relative h-full overflow-hidden rounded-3xl border-border/60 bg-card p-8 sm:p-10">
              <div className="pointer-events-none absolute -inset-x-10 -top-10 bottom-0 rounded-[3rem] bg-brand-gradient opacity-10 blur-3xl" />
              <Quote className="absolute right-6 top-6 size-16 text-muted-foreground/10" />
              <div className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-brand-gradient" />
              <div className="relative">
                <div className="flex gap-1">
                  {[...Array(featured.rating)].map((_, i) => (
                    <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed sm:text-2xl">
                  &ldquo;{featured.quote}&rdquo;
                </blockquote>
                <div className="mt-7 flex items-center gap-3">
                  <Avatar className="size-12 border-2 border-background">
                    <AvatarFallback
                      className={cn('bg-gradient-to-br text-white', featured.accent)}
                    >
                      {featured.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-display font-bold">{featured.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {featured.role}, {featured.company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>

          {/* Smaller cards grid */}
          <StaggerGroup className="grid gap-4">
            {rest.map((t) => (
              <motion.div key={t.name} variants={staggerItem}>
                <Card className="group h-full rounded-2xl border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <Quote className="size-5 shrink-0 text-muted-foreground/20 transition-colors group-hover:text-muted-foreground/40" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/90 line-clamp-3">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2.5">
                    <Avatar className="size-8 border border-background">
                      <AvatarFallback
                        className={cn('bg-gradient-to-br text-xs font-bold text-white', t.accent)}
                      >
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="leading-tight">
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}

/* ============================== SHARED CTA BUTTON ============================== */
function StartProjectButton() {
  const { setPage } = useNav()
  return (
    <Button
      onClick={() => setPage('contact')}
      className="rounded-full bg-brand-gradient text-white"
    >
      Start a project
      <ArrowRight className="size-4" />
    </Button>
  )
}

/* ============================== FINAL CTA ============================== */
function FinalCta() {
  const { setPage } = useNav()
  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-border/60 p-[1px]">
            {/* Gradient border wrapper */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-brand-gradient opacity-80" />
            <div className="relative rounded-[calc(2.5rem-1px)] bg-card">
              {/* Ambient glow + grid bg */}
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
              <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-brand-gradient opacity-20 blur-3xl animate-pulse-glow" />
              <div
                className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full opacity-20 blur-3xl animate-float-slow"
                style={{ background: 'var(--brand-rose)' }}
              />

              <div className="relative px-6 py-12 text-center sm:px-12 sm:py-16 lg:py-20">
                <Reveal>
                  <Badge className="rounded-full border-border/60 bg-brand-gradient-soft text-foreground">
                    <Sparkles className="size-3.5" />
                    Let&apos;s build something stunning
                  </Badge>
                </Reveal>
                <Reveal delay={0.05}>
                  <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                    Have a project <GradientText>in mind?</GradientText>
                  </h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
                    Tell us about your goals and we&apos;ll craft a plan to get you there —
                    with design, engineering, AI and growth working as one.
                  </p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Button
                      onClick={() => setPage('contact')}
                      className="rounded-full bg-brand-gradient text-white"
                    >
                      Start a project
                      <ArrowRight className="size-4" />
                    </Button>
                    <Button
                      onClick={() => setPage('services')}
                      variant="outline"
                      className="rounded-full"
                    >
                      Explore services
                      <ArrowUpRight className="size-4" />
                    </Button>
                  </div>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="mt-6 text-xs text-muted-foreground">
                    Replies within 24 hours · No pressure, no jargon
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== PAGE ============================== */
export function PortfolioPage() {
  return (
    <div className="relative">
      <Hero />
      <ProjectGallery />
      <ProcessStrip />
      <TrustedBy />
      <TestimonialSection />
      <FinalCta />
    </div>
  )
}
