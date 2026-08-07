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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Reveal,
  SectionHeading,
  StaggerGroup,
  staggerItem,
  Counter,
  GradientText,
} from '@/components/site/primitives'
import { AmbientBackground } from '@/components/site/ambient-background'
import { RoiCalculator } from '@/components/site/roi-calculator'
import { useNav } from '@/lib/nav-store'
import {
  PRICING,
  SERVICES,
  STATS,
  TESTIMONIALS,
  FAQS,
  type PricingPlan,
} from '@/lib/site-data'
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
            Pricing · Transparent, flexible, fair
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Simple, <GradientText>transparent</GradientText> pricing
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
            Pick a plan that matches your stage. Every engagement is fixed-scope
            or retainer — no hidden fees, no surprises. Just senior craft,
            AI-native thinking and outcomes you can measure.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 text-sm text-muted-foreground">
            {reassurances.map((r) => (
              <span key={r} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-500" />
                {r}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.24}>
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
              <Headset className="size-4" />
              Talk to us
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== PRICING CARDS ============================== */
type BillingMode = 'project' | 'monthly'

// Monthly retainer equivalents (for the billing toggle)
const MONTHLY_PRICING: Record<string, { price: string; period: string }> = {
  Launch: { price: '$0', period: '/ one-time' },
  Growth: { price: '$1.9k', period: '/ month' },
  Enterprise: { price: 'Custom', period: '/ month' },
}

function BillingToggle({
  mode,
  onChange,
}: {
  mode: BillingMode
  onChange: (m: BillingMode) => void
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative inline-flex items-center rounded-full border border-border/60 bg-muted/30 p-1 backdrop-blur">
        {(['project', 'monthly'] as BillingMode[]).map((m) => {
          const active = mode === m
          return (
            <button
              key={m}
              onClick={() => onChange(m)}
              className={cn(
                'relative rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                active ? 'text-white' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {active && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-full bg-brand-gradient shadow-[0_4px_20px_-6px_rgba(255,45,117,0.6)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {m === 'project' ? 'One-time project' : 'Monthly retainer'}
                {m === 'monthly' && (
                  <span className={cn(
                    'rounded-full px-1.5 py-0.5 text-[10px] font-bold',
                    active ? 'bg-white/20 text-white' : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                  )}>
                    Save 20%
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function PricingCards() {
  const { setPage } = useNav()
  const [billing, setBilling] = React.useState<BillingMode>('project')
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <BillingToggle mode={billing} onChange={setBilling} />
        </Reveal>
        <StaggerGroup className="mt-10 grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
          {PRICING.map((plan) => (
            <motion.div key={plan.name} variants={staggerItem} className="h-full">
              <PricingCard
                plan={plan}
                billing={billing}
                onCta={() => setPage('contact')}
              />
            </motion.div>
          ))}
        </StaggerGroup>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            All plans include a{' '}
            <span className="font-medium text-foreground">free discovery call</span>,{' '}
            <span className="font-medium text-foreground">transparent timeline</span> and{' '}
            <span className="font-medium text-foreground">weekly demos</span>. Need something
            different? <button onClick={() => setPage('contact')} className="font-semibold text-foreground underline-offset-4 hover:underline">Tell us what you have in mind</button>.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function PricingCard({
  plan,
  billing,
  onCta,
}: {
  plan: PricingPlan
  billing: BillingMode
  onCta: () => void
}) {
  const featured = !!plan.featured
  const monthly = MONTHLY_PRICING[plan.name]
  const showPrice = billing === 'monthly' && monthly ? monthly.price : plan.price
  const showPeriod = billing === 'monthly' && monthly ? monthly.period : plan.period
  // For the Launch plan, monthly retainer isn't offered — show a note instead
  const launchMonthlyNote = billing === 'monthly' && plan.name === 'Launch'
  return (
    <div
      className={cn(
        'group card-sheen relative flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300',
        featured
          ? 'gradient-border glow-brand lg:scale-105 lg:-translate-y-2'
          : 'border border-border/60 bg-card hover:-translate-y-1 hover:border-border hover:shadow-xl'
      )}
    >
      {/* featured gradient header strip */}
      {featured && (
        <div
          className={cn(
            'h-1.5 w-full bg-gradient-to-r',
            plan.accent
          )}
          aria-hidden
        />
      )}

      {/* featured ambient glow */}
      {featured && (
        <div
          className="pointer-events-none absolute -top-20 left-1/2 size-64 -translate-x-1/2 rounded-full bg-brand-gradient opacity-20 blur-3xl"
          aria-hidden
        />
      )}

      <div className="relative flex flex-1 flex-col p-7 sm:p-8">
        {/* Plan header */}
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold tracking-tight">
            {plan.name}
          </h3>
          {featured ? (
            <Badge className="rounded-full border-0 bg-brand-gradient px-3 py-1 text-xs font-semibold text-white shadow-md">
              <Sparkles className="mr-1 size-3.5" />
              Most popular
            </Badge>
          ) : (
            <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
              Plan
            </span>
          )}
        </div>

        {/* Price */}
        <div className="mt-5 flex items-end gap-1.5">
          {launchMonthlyNote ? (
            <span className="font-display text-3xl font-bold tracking-tight text-muted-foreground">
              Retainer ready
            </span>
          ) : (
            <motion.span
              key={showPrice}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                'font-display text-5xl font-bold tracking-tight',
                featured && 'text-gradient-brand'
              )}
            >
              {showPrice}
            </motion.span>
          )}
          {!launchMonthlyNote && (
            <span className="mb-1.5 text-sm font-medium text-muted-foreground">
              {showPeriod}
            </span>
          )}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {launchMonthlyNote
            ? 'Launch is a one-time project. Upgrade to a Growth or Enterprise retainer for ongoing work.'
            : plan.description}
        </p>

        {/* CTA */}
        <div className="mt-6">
          {featured ? (
            <Button
              onClick={onCta}
              className="group/cta relative h-11 w-full overflow-hidden rounded-full bg-brand-gradient text-white shadow-[0_8px_30px_-8px_rgba(255,45,117,0.6)] hover:shadow-[0_12px_40px_-8px_rgba(255,45,117,0.85)]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {plan.cta}
                <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-1" />
              </span>
              <span className="absolute inset-0 animate-shimmer opacity-40" />
            </Button>
          ) : (
            <Button
              onClick={onCta}
              variant="outline"
              className="h-11 w-full rounded-full"
            >
              {plan.cta}
              <ArrowRight className="size-4" />
            </Button>
          )}
        </div>

        {/* Divider */}
        <div className="my-7 h-px w-full bg-border/60" />

        {/* Features */}
        <ul className="flex flex-1 flex-col gap-3.5">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm">
              <span
                className={cn(
                  'mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-gradient-to-br text-white shadow-sm',
                  plan.accent
                )}
              >
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              <span className="text-foreground/90">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* ============================== SERVICE MAPPING ============================== */
function ServiceMapping() {
  const { setPage } = useNav()
  // Map each service to a pricing hint tag
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
                  <span
                    className={cn(
                      'font-display text-sm font-bold text-gradient-brand'
                    )}
                  >
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
  // Pick the ROI-focused testimonial
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
                  <AvatarFallback
                    className={cn('bg-gradient-to-br text-white', t.accent)}
                  >
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
  // Lead with the most pricing-relevant FAQs
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
          <Accordion type="single" collapsible className="space-y-3">
            {pricingFaqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-border/60 bg-card px-5 data-[state=open]:border-border"
              >
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                  {f.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {f.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
                Book a free 30-minute consultation. We&apos;ll review your goals,
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
      <PricingCards />
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
              What&apos;s your <GradientText>return</GradientText>?
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
