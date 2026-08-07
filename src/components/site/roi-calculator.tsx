'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
  Sparkles,
  ArrowRight,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal, GradientText } from '@/components/site/primitives'
import { useNav } from '@/lib/nav-store'
import { cn } from '@/lib/utils'

type Service = 'web' | 'ai' | 'seo' | 'ecom'

const SERVICE_OPTIONS: {
  id: Service
  label: string
  icon: typeof TrendingUp
  baseLift: number // % conversion lift
  accent: string
}[] = [
  { id: 'web', label: 'Website Redesign', icon: Users, baseLift: 38, accent: 'from-orange-500 to-pink-500' },
  { id: 'ai', label: 'AI Automation', icon: Sparkles, baseLift: 55, accent: 'from-fuchsia-500 to-rose-500' },
  { id: 'seo', label: 'SEO & Growth', icon: TrendingUp, baseLift: 120, accent: 'from-emerald-500 to-teal-500' },
  { id: 'ecom', label: 'Ecommerce', icon: ShoppingCart, baseLift: 42, accent: 'from-rose-500 to-pink-500' },
]

function formatCurrency(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (v) => v.toLocaleString(),
  icon: Icon,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (v: number) => void
  format?: (v: number) => string
  icon: typeof TrendingUp
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Icon className="size-4" style={{ color: 'var(--brand-pink)' }} />
          {label}
        </label>
        <span className="font-display text-sm font-bold tabular-nums">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2.5 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted outline-none
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-brand-gradient [&::-webkit-slider-thumb]:shadow-[0_2px_12px_rgba(255,45,117,0.6)]
          [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
          [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[var(--brand-pink)]"
        style={{
          background: `linear-gradient(90deg, var(--brand-orange) 0%, var(--brand-pink) ${pct}%, var(--muted) ${pct}%, var(--muted) 100%)`,
        }}
      />
    </div>
  )
}

export function RoiCalculator({ compact = false }: { compact?: boolean }) {
  const { setPage } = useNav()
  const [service, setService] = React.useState<Service>('web')
  const [monthlyVisitors, setMonthlyVisitors] = React.useState(8000)
  const [conversionRate, setConversionRate] = React.useState(2.0)
  const [avgOrder, setAvgOrder] = React.useState(120)

  const selected = SERVICE_OPTIONS.find((s) => s.id === service)!
  const newConvRate = conversionRate * (1 + selected.baseLift / 100)

  const currentRevenue = monthlyVisitors * (conversionRate / 100) * avgOrder
  const projectedRevenue = monthlyVisitors * (newConvRate / 100) * avgOrder
  const monthlyUplift = projectedRevenue - currentRevenue
  const annualUplift = monthlyUplift * 12
  const roiMultiple = annualUplift > 0 && currentRevenue > 0 ? annualUplift / currentRevenue : 0

  const reset = () => {
    setService('web')
    setMonthlyVisitors(8000)
    setConversionRate(2.0)
    setAvgOrder(120)
  }

  return (
    <div className={cn('relative overflow-hidden rounded-3xl', !compact && 'gradient-border')}>
      <div className="relative grid gap-0 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: inputs */}
        <div className="relative p-6 sm:p-8">
          <div className="pointer-events-none absolute -left-16 -top-16 size-48 rounded-full bg-brand-gradient opacity-10 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Interactive
              </span>
              <button
                onClick={reset}
                className="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="size-3" />
                Reset
              </button>
            </div>
            <h3 className={cn('mt-4 font-display font-bold tracking-tight', compact ? 'text-xl' : 'text-2xl sm:text-3xl')}>
              Growth <GradientText>Calculator</GradientText>
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Drag the sliders to estimate the revenue impact of working with us.
            </p>

            {/* Service selector */}
            <div className="mt-5">
              <p className="mb-2 text-sm font-medium text-muted-foreground">What are you looking for?</p>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_OPTIONS.map((s) => {
                  const Icon = s.icon
                  const active = service === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => setService(s.id)}
                      className={cn(
                        'group flex items-center gap-2 rounded-xl border px-3 py-2.5 text-left text-sm font-medium transition-all',
                        active
                          ? 'border-transparent bg-brand-gradient text-white shadow-[0_6px_20px_-6px_rgba(255,45,117,0.6)]'
                          : 'border-border/70 bg-muted/30 text-muted-foreground hover:border-border hover:text-foreground'
                      )}
                    >
                      <Icon className="size-4 shrink-0" />
                      <span className="truncate">{s.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Sliders */}
            <div className="mt-6 space-y-5">
              <Slider
                label="Monthly visitors"
                value={monthlyVisitors}
                min={500}
                max={100000}
                step={500}
                onChange={setMonthlyVisitors}
                icon={Users}
                format={(v) => v.toLocaleString()}
              />
              <Slider
                label="Current conversion rate"
                value={conversionRate}
                min={0.5}
                max={8}
                step={0.1}
                onChange={setConversionRate}
                icon={TrendingUp}
                format={(v) => `${v.toFixed(1)}%`}
              />
              <Slider
                label="Average order value"
                value={avgOrder}
                min={20}
                max={2000}
                step={10}
                onChange={setAvgOrder}
                icon={DollarSign}
                format={(v) => formatCurrency(v)}
              />
            </div>
          </div>
        </div>

        {/* Right: results */}
        <div className="relative overflow-hidden border-t border-border/60 bg-muted/20 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <div className="pointer-events-none absolute -right-16 -bottom-16 size-56 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Projected impact
            </p>

            {/* Big number */}
            <div className="mt-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={Math.round(annualUplift)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                    <span className="text-gradient-brand">+{formatCurrency(annualUplift)}</span>
                  </p>
                </motion.div>
              </AnimatePresence>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Estimated additional revenue per year with {selected.label.toLowerCase()}
              </p>
            </div>

            {/* Metrics grid */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <ResultCard
                label="Monthly uplift"
                value={`+${formatCurrency(monthlyUplift)}`}
                accent="from-orange-500 to-pink-500"
              />
              <ResultCard
                label="New conv. rate"
                value={`${newConvRate.toFixed(1)}%`}
                accent="from-fuchsia-500 to-rose-500"
              />
              <ResultCard
                label="Conv. lift"
                value={`+${selected.baseLift}%`}
                accent="from-amber-500 to-orange-500"
              />
              <ResultCard
                label="ROI multiple"
                value={`${roiMultiple.toFixed(1)}x`}
                accent="from-emerald-500 to-teal-500"
              />
            </div>

            {/* mini bar comparison */}
            <div className="mt-6 rounded-2xl border border-border/60 bg-card/50 p-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Monthly revenue</span>
                <span className="font-semibold">Now vs After</span>
              </div>
              <div className="mt-3 space-y-2.5">
                <div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>Now</span>
                    <span className="tabular-nums">{formatCurrency(currentRevenue)}</span>
                  </div>
                  <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-muted-foreground/40" style={{ width: '100%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-muted-foreground">
                    <span>After</span>
                    <span className="tabular-nums font-semibold text-foreground">{formatCurrency(projectedRevenue)}</span>
                  </div>
                  <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-brand-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((projectedRevenue / Math.max(currentRevenue, 1)) * 100, 100)}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setPage('contact')}
              className="mt-6 w-full rounded-full bg-brand-gradient text-white shadow-[0_8px_30px_-8px_rgba(255,45,117,0.6)]"
            >
              Claim this growth
              <ArrowRight className="size-4" />
            </Button>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Estimates based on our average client outcomes. Your results may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResultCard({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent: string
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-3.5">
      <div className={cn('absolute -right-6 -top-6 size-16 rounded-full bg-gradient-to-br opacity-15 blur-xl', accent)} />
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-bold tabular-nums">{value}</p>
    </div>
  )
}
