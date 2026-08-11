'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Star,
  Sparkles,
  Quote,
  Check,
  CheckCircle2,
  Zap,
  Bot,
  Search,
  ShieldCheck,
  Calendar,
  Headset,
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
  GradientText,
} from '@/components/site/primitives'
import { FaqWithSearch } from '@/components/site/faq-with-search'
import { AmbientBackground } from '@/components/site/ambient-background'
import { RoiCalculator } from '@/components/site/roi-calculator'
import { useNav } from '@/lib/nav-store'
import { SERVICES, STATS, TESTIMONIALS, FAQS } from '@/lib/site-data'
import { AffiliateBox, type AffiliateBoxItem } from '@/components/site/affiliate-box'
import { cn } from '@/lib/utils'

/* ============================== HERO ============================== */
function Hero() {
  const { setPage } = useNav()
  const reassurances = [
    'No long-term contracts',
    'Senior team, no juniors',
    'Money-back guarantee',
  ]
  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pt-16">
      <AmbientBackground variant="strong" />
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="flex size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Partners & affiliates
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Tools we <GradientText>recommend</GradientText>
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
            Remote-friendly prices and affiliate links to the tools and services we use and trust.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== AFFILIATES ============================== */
function AffiliateSection() {
  const [items, setItems] = React.useState<AffiliateBoxItem[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch('/api/affiliates')
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled && d.ok) setItems(d.affiliates)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {loading ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-3xl bg-muted/60" />
            ))}
          </div>
        ) : (
          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
              <motion.div key={item.id} variants={staggerItem} className="h-full">
                <AffiliateBox item={item} index={i} />
              </motion.div>
            ))}
          </StaggerGroup>
        )}
      </div>
    </section>
  )
}

/* ============================== SERVICE MAPPING ============================== */
function ServiceMapping() {
  const { setPage } = useNav()
  const pricingHint: Record<string, string> = {
    'web-design': 'Starts at $2.4k',
    'ai-automation': 'Included in Growth',
    'web-apps': 'Enterprise',
    'seo': 'From $1.2k/mo',
    'ecommerce': 'From $4.5k',
  }
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What you get"
          title={
            <>
              Every plan, <GradientText>every capability</GradientText>
            </>
          }
          description="All five of our core services can be mixed into any plan or engaged standalone. Here's how they map to pricing."
        />

        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2">
          {SERVICES.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.id}
                variants={staggerItem}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-lg"
              >
                <span
                  className={cn(
                    'pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25',
                    s.accent
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    'relative grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg',
                    s.accent
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <div className="relative min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold tracking-tight">
                      {s.title}
                    </h3>
                    <span className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                      {pricingHint[s.id]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                </div>
              </motion.div>
            )
          })}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setPage('services')}
              variant="outline"
              className="rounded-full"
            >
              Compare services in detail
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== ADD-ONS ============================== */
const ADDONS = [
  {
    icon: Bot,
    name: 'AI Chatbot Agent',
    desc: 'Custom-trained LLM assistant with RAG, deployed on your site in days.',
    price: 'from $1.8k',
    accent: 'from-fuchsia-500 to-rose-500',
  },
  {
    icon: Search,
    name: 'Monthly SEO Retainer',
    desc: 'Ongoing technical, content & link building to compound rankings.',
    price: 'from $1.2k/mo',
    accent: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Zap,
    name: 'CRO Experimentation',
    desc: 'A/B testing & funnel optimization to squeeze more revenue from traffic.',
    price: 'from $2.5k/mo',
    accent: 'from-amber-500 to-orange-500',
  },
  {
    icon: ShieldCheck,
    name: '24/7 Priority Support',
    desc: 'Round-the-clock monitoring, SLAs and same-day fixes for mission-critical apps.',
    price: 'Custom',
    accent: 'from-orange-500 to-pink-500',
  },
] as const

function AddOns() {
  const { setPage } = useNav()
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Optional add-ons"
          title={
            <>
              Stack on <GradientText>extras</GradientText> as you grow
            </>
          }
          description="Modular upgrades you can bolt onto any plan — from AI agents to growth retainers and priority support."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADDONS.map((a) => {
            const Icon = a.icon
            return (
              <motion.div
                key={a.name}
                variants={staggerItem}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass-strong p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span
                  className={cn(
                    'pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br opacity-15 blur-2xl transition-opacity duration-300 group-hover:opacity-35',
                    a.accent
                  )}
                  aria-hidden
                />
                <span
                  className={cn(
                    'relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg',
                    a.accent
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <h3 className="relative mt-5 font-display text-lg font-bold tracking-tight">
                  {a.name}
                </h3>
                <p className="relative mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {a.desc}
                </p>
                <div className="relative mt-5 flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-gradient-brand">
                    {a.price}
                  </span>
                  <button
                    onClick={() => setPage('contact')}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Add it
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}

/* ============================== STATS BAND ============================== */
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

/* ============================== TESTIMONIAL HIGHLIGHT ============================== */
function TestimonialHighlight() {
  const t = TESTIMONIALS[0]
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Real ROI"
              title={
                <>
                  Investment that <GradientText>pays for itself</GradientText>
                </>
              }
              description="Our clients don't just get pretty websites — they get measurable returns. Here's one of them."
            />
          </div>

          <Reveal delay={0.1}>
            <Card className="relative overflow-hidden rounded-3xl border-border/60 bg-card p-8 sm:p-9">
              <div className="pointer-events-none absolute -inset-x-8 -top-8 bottom-0 rounded-[3rem] bg-brand-gradient opacity-10 blur-3xl" />
              <Quote className="absolute right-6 top-6 size-14 text-muted-foreground/10" />
              <div className="relative flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <blockquote className="relative mt-5 font-display text-lg font-medium leading-relaxed sm:text-xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="relative mt-7 flex items-center gap-3">
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
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================== FAQ ============================== */
function FaqSection() {
  const pricingFaqs = [FAQS[5], FAQS[0], FAQS[2], FAQS[1], FAQS[4]]
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Good to know"
          title={
            <>
              Pricing <GradientText>FAQ</GradientText>
            </>
          }
          description="Everything you need to know about how we price, scope and deliver projects."
        />
        <Reveal delay={0.1} className="mt-12">
          <FaqWithSearch faqs={pricingFaqs} />
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
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="gradient-border relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12 lg:p-14">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
          <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-brand-gradient opacity-20 blur-3xl animate-pulse-glow" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 size-72 rounded-full bg-brand-gradient opacity-15 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
                <Calendar className="size-3.5" style={{ color: 'var(--brand-pink)' }} />
                Free consultation
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Not sure which plan <GradientText>fits?</GradientText>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
                Book a free 30-minute consultation. We'll review your goals,
                scope and timeline — then recommend the right plan (or a custom
                blend) with a transparent quote.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => setPage('contact')}
                  className="group relative h-12 overflow-hidden rounded-full bg-brand-gradient px-6 text-base text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(255,45,117,0.85)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book a free consultation
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 animate-shimmer opacity-40" />
                </Button>
                <Button
                  onClick={() => setPage('services')}
                  variant="outline"
                  className="h-12 rounded-full px-6 text-base backdrop-blur"
                >
                  Compare services
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================== PAGE ============================== */
export function PricingPage() {
  return (
    <div className="relative">
      <Hero />
      <AffiliateSection />
      <ServiceMapping />
      <AddOns />
      <RoiSection />
      <StatsBand />
      <TestimonialHighlight />
      <FaqSection />
      <FinalCta />
    </div>
  )
}

function RoiSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="See the upside"
          title={
            <>
              What's your <GradientText>return</GradientText>?
            </>
          }
          description="Drag the sliders to estimate the revenue upside of each plan. Numbers speak louder than price tags."
        />
        <Reveal delay={0.1} className="mt-12">
          <RoiCalculator compact />
        </Reveal>
      </div>
    </section>
  )
}