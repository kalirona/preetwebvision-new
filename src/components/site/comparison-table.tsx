'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Check, Minus, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Reveal,
  SectionHeading,
  GradientText,
  StaggerGroup,
  staggerItem,
} from '@/components/site/primitives'
import { useNav } from '@/lib/nav-store'
import { cn } from '@/lib/utils'

/* ----------------------------- Data model ----------------------------- */

type Cell =
  | { kind: 'check'; label?: string }
  | { kind: 'cross' }
  | { kind: 'text'; value: string }

type FeatureRow = {
  label: string
  /** Ordered: [Launch, Growth, Enterprise] */
  cells: [Cell, Cell, Cell]
}

type FeatureSection = {
  title: string
  rows: FeatureRow[]
}

type Plan = {
  name: string
  price: string
  period: string
  featured: boolean
}

const PLANS: Plan[] = [
  { name: 'Launch', price: '$2.4k', period: '/ project', featured: false },
  { name: 'Growth', price: '$6.9k', period: '/ project', featured: true },
  { name: 'Enterprise', price: 'Custom', period: '/ retainer', featured: false },
]

const SECTIONS: FeatureSection[] = [
  {
    title: 'Project scope',
    rows: [
      {
        label: 'Custom pages',
        cells: [
          { kind: 'text', value: '5' },
          { kind: 'text', value: '12' },
          { kind: 'text', value: 'Unlimited' },
        ],
      },
      {
        label: 'CMS integration',
        cells: [{ kind: 'cross' }, { kind: 'check' }, { kind: 'check' }],
      },
      {
        label: 'Design system',
        cells: [{ kind: 'cross' }, { kind: 'check' }, { kind: 'check' }],
      },
      {
        label: 'Revisions',
        cells: [
          { kind: 'text', value: '2' },
          { kind: 'text', value: '∞' },
          { kind: 'text', value: '∞' },
        ],
      },
    ],
  },
  {
    title: 'AI & Automation',
    rows: [
      {
        label: 'AI chatbot agent',
        cells: [
          { kind: 'cross' },
          { kind: 'check' },
          { kind: 'check', label: 'Custom' },
        ],
      },
      {
        label: 'Automation workflows',
        cells: [
          { kind: 'cross' },
          { kind: 'text', value: '3' },
          { kind: 'text', value: 'Unlimited' },
        ],
      },
      {
        label: 'RAG knowledge base',
        cells: [{ kind: 'cross' }, { kind: 'check' }, { kind: 'check' }],
      },
      {
        label: 'Custom AI agents',
        cells: [{ kind: 'cross' }, { kind: 'cross' }, { kind: 'check' }],
      },
    ],
  },
  {
    title: 'Growth & support',
    rows: [
      {
        label: 'SEO setup',
        cells: [
          { kind: 'text', value: 'Basic' },
          { kind: 'text', value: 'Advanced' },
          { kind: 'text', value: 'Full retainer' },
        ],
      },
      {
        label: 'Analytics dashboard',
        cells: [
          { kind: 'check' },
          { kind: 'check' },
          { kind: 'text', value: 'Custom' },
        ],
      },
      {
        label: 'Priority support',
        cells: [
          { kind: 'cross' },
          { kind: 'check' },
          { kind: 'check', label: 'SLA' },
        ],
      },
      {
        label: 'Dedicated team',
        cells: [{ kind: 'cross' }, { kind: 'cross' }, { kind: 'check' }],
      },
      {
        label: 'Monthly optimization',
        cells: [{ kind: 'cross' }, { kind: 'cross' }, { kind: 'check' }],
      },
    ],
  },
]

/* ----------------------------- Cell renderer ----------------------------- */

function CellContent({ cell, size = 'md' }: { cell: Cell; size?: 'sm' | 'md' }) {
  const iconSize = size === 'sm' ? 'size-3.5' : 'size-4'
  const checkTile = size === 'sm' ? 'size-5' : 'size-6'
  const textSize = size === 'sm' ? 'text-sm' : 'text-sm sm:text-base'

  if (cell.kind === 'check') {
    return (
      <span className="inline-flex items-center gap-2">
        <span
          className={cn(
            'grid place-items-center rounded-full bg-brand-gradient text-white shadow-[0_2px_10px_-2px_rgba(255,45,117,0.55)]',
            checkTile
          )}
        >
          <Check className={iconSize} strokeWidth={3} />
        </span>
        {cell.label && (
          <span className={cn('font-semibold text-foreground', textSize)}>{cell.label}</span>
        )}
      </span>
    )
  }

  if (cell.kind === 'cross') {
    return (
      <span className="inline-flex items-center text-muted-foreground/40" aria-label="Not included">
        <Minus className={iconSize} strokeWidth={2.5} />
        <span className="sr-only">Not included</span>
      </span>
    )
  }

  return (
    <span className={cn('font-semibold text-foreground tracking-tight', textSize)}>{cell.value}</span>
  )
}

/* ----------------------------- Desktop table ----------------------------- */

function DesktopTable() {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-border/60 glass-strong card-sheen shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border/60">
                <th
                  scope="col"
                  className="sticky left-0 z-20 bg-card/95 px-6 pb-5 pt-6 align-bottom backdrop-blur"
                  style={{ width: '36%' }}
                >
                  <span className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    Feature
                  </span>
                </th>
                {PLANS.map((plan) => (
                  <th
                    key={plan.name}
                    scope="col"
                    className={cn(
                      'px-6 pb-5 pt-6 align-bottom',
                      plan.featured && 'bg-brand-gradient'
                    )}
                    style={{ width: '21.33%' }}
                  >
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      {plan.featured ? (
                        <span className="order-first inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur-md">
                          <Sparkles className="size-3" /> Most popular
                        </span>
                      ) : null}
                      <span
                        className={cn(
                          'font-display text-base font-bold',
                          plan.featured ? 'text-white' : 'text-foreground'
                        )}
                      >
                        {plan.name}
                      </span>
                      <span
                        className={cn(
                          'font-display text-2xl font-bold leading-none',
                          plan.featured ? 'text-white' : 'text-gradient-brand'
                        )}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={cn(
                          'text-xs',
                          plan.featured ? 'text-white/75' : 'text-muted-foreground'
                        )}
                      >
                        {plan.period}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {SECTIONS.map((section) => (
              <tbody key={section.title}>
                <tr>
                  <th
                    scope="colgroup"
                    colSpan={4}
                    className="sticky left-0 z-10 border-b border-border/60 bg-muted/40 px-6 py-2.5 text-left backdrop-blur"
                  >
                    <span className="font-display text-[11px] font-bold uppercase tracking-[0.24em] text-gradient-brand">
                      {section.title}
                    </span>
                  </th>
                </tr>
                {section.rows.map((row) => (
                  <tr key={row.label} className="cmp-row border-b border-border/40 last:border-0">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-card/95 px-6 py-4 text-left backdrop-blur"
                    >
                      <span className="text-sm font-medium text-foreground/90">{row.label}</span>
                    </th>
                    {row.cells.map((cell, i) => (
                      <td
                        key={i}
                        className={cn(
                          'px-6 py-4 text-center align-middle',
                          i === 1 && 'bg-brand-gradient-soft'
                        )}
                      >
                        <div className="flex items-center justify-center">
                          <CellContent cell={cell} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </Reveal>
  )
}

/* ----------------------------- Mobile cards ----------------------------- */

function MobileCards() {
  return (
    <StaggerGroup className="space-y-5">
      {PLANS.map((plan, planIndex) => (
        <motion.div key={plan.name} variants={staggerItem}>
          <Card
            className={cn(
              'relative overflow-hidden p-0 transition-all',
              plan.featured
                ? 'gradient-border glow-brand'
                : 'border border-border/60 bg-card/80 hover:border-border'
            )}
          >
            {plan.featured && <div className="h-1.5 w-full bg-brand-gradient" />}
            <div className="p-6">
              {/* Plan header */}
              <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <span className="font-display text-lg font-bold text-foreground">{plan.name}</span>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={cn(
                        'font-display text-3xl font-bold leading-none',
                        plan.featured ? 'text-gradient-brand' : 'text-foreground'
                      )}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{plan.period}</span>
                  </div>
                </div>
                {plan.featured && (
                  <Badge className="shrink-0 border-transparent bg-brand-gradient text-white hover:bg-brand-gradient">
                    <Sparkles className="size-3" />
                    Most popular
                  </Badge>
                )}
              </div>

              {/* Feature sections */}
              <div className="space-y-5">
                {SECTIONS.map((section) => (
                  <div key={section.title}>
                    <div className="mb-2 font-display text-[11px] font-bold uppercase tracking-[0.22em] text-gradient-brand">
                      {section.title}
                    </div>
                    <ul className="divide-y divide-border/40">
                      {section.rows.map((row) => (
                        <li
                          key={row.label}
                          className="flex items-center justify-between gap-3 py-2.5"
                        >
                          <span className="text-sm text-foreground/80">{row.label}</span>
                          <span className="shrink-0">
                            <CellContent cell={row.cells[planIndex]} size="sm" />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </StaggerGroup>
  )
}

/* ----------------------------- Section ----------------------------- */

export function ComparisonTable() {
  const { setPage } = useNav()

  return (
    <section className="relative py-20 sm:py-28">
      {/* Decorative grid backdrop with radial mask */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/4 -z-10 size-72 rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--brand-orange) 30%, transparent), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-1/4 -z-10 size-80 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, color-mix(in oklch, var(--brand-rose) 28%, transparent), transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Compare plans"
          title={
            <>
              Every feature, <GradientText>side by side</GradientText>
            </>
          }
          description="See exactly what's included in each plan."
        />

        {/* Desktop: real table (lg+) */}
        <div className="mt-12 hidden lg:block">
          <DesktopTable />
        </div>

        {/* Mobile: stacked cards (<lg) */}
        <div className="mt-12 lg:hidden">
          <MobileCards />
        </div>

        {/* CTA */}
        <Reveal className="mt-14 flex flex-col items-center justify-center gap-5 text-center sm:flex-row sm:gap-7">
          <p className="font-display text-xl text-foreground sm:text-2xl text-balance">
            Not sure? <GradientText>Talk to us</GradientText>
          </p>
          <Button
            size="lg"
            onClick={() => setPage('contact')}
            className="h-12 rounded-full bg-brand-gradient px-7 text-white shadow-[0_10px_40px_-10px_rgba(255,45,117,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_50px_-8px_rgba(255,45,117,0.7)]"
          >
            Talk to us
            <ArrowRight className="size-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
