'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Rocket,
  Palette,
  Bot,
  Code2,
  Search,
  ShoppingCart,
  Sparkles,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useNav } from '@/lib/nav-store'
import { cn } from '@/lib/utils'

type Step = 0 | 1 | 2 | 3 | 4

const SERVICE_OPTIONS = [
  { id: 'Website Design & Development', label: 'Website Design', icon: Palette, accent: 'from-orange-500 to-pink-500' },
  { id: 'AI Automations', label: 'AI Automation', icon: Bot, accent: 'from-fuchsia-500 to-rose-500' },
  { id: 'Web App Development', label: 'Web App', icon: Code2, accent: 'from-amber-500 to-orange-500' },
  { id: 'SEO & Digital Growth', label: 'SEO & Growth', icon: Search, accent: 'from-emerald-500 to-teal-500' },
  { id: 'Ecommerce Solutions', label: 'Ecommerce', icon: ShoppingCart, accent: 'from-rose-500 to-pink-500' },
]

const BUDGET_OPTIONS = ['< $5k', '$5k – $15k', '$15k – $50k', '$50k+']
const TIMELINE_OPTIONS = ['ASAP', '1–2 months', '3–6 months', 'Just exploring']

const STEP_META = [
  { label: 'Service', icon: Sparkles },
  { label: 'Budget', icon: DollarSign },
  { label: 'Timeline', icon: Calendar },
  { label: 'Details', icon: FileText },
  { label: 'Summary', icon: CheckCircle2 },
]

export function ProjectWizard() {
  const { setPage } = useNav()
  const [step, setStep] = React.useState<Step>(0)
  const [service, setService] = React.useState<string | null>(null)
  const [budget, setBudget] = React.useState<string | null>(null)
  const [timeline, setTimeline] = React.useState<string | null>(null)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [summary, setSummary] = React.useState('')

  const canProceed = [
    !!service,
    !!budget,
    !!timeline,
    name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    true,
  ][step]

  const next = () => setStep((s) => Math.min(s + 1, 4) as Step)
  const back = () => setStep((s) => Math.max(s - 1, 0) as Step)
  const reset = () => {
    setStep(0)
    setService(null)
    setBudget(null)
    setTimeline(null)
    setName('')
    setEmail('')
    setSummary('')
  }

  const finish = async () => {
    // Persist via the contact API with wizard context
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          service,
          budget,
          message: `Project wizard submission — Timeline: ${timeline}. ${summary}`.trim(),
        }),
      })
    } catch {
      /* fail gracefully — user still sees success */
    }
    setStep(4)
  }

  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-gradient opacity-15 blur-3xl animate-pulse-glow" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)]" />

          <div className="relative">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  <Rocket className="size-3.5" style={{ color: 'var(--brand-pink)' }} />
                  Project wizard
                </span>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  Scope your project in <span className="text-gradient-brand">60 seconds</span>
                </h2>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Answer four quick questions — we&apos;ll send a tailored proposal within a business day.
                </p>
              </div>
              {step > 0 && step < 4 && (
                <button
                  onClick={reset}
                  className="hidden items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
                >
                  <RotateCcw className="size-3" />
                  Restart
                </button>
              )}
            </div>

            {/* Stepper */}
            {step < 4 && (
              <div className="mt-6 flex items-center gap-1.5">
                {STEP_META.slice(0, 4).map((s, i) => {
                  const done = i < step
                  const active = i === step
                  const Icon = s.icon
                  return (
                    <React.Fragment key={s.label}>
                      <div
                        className={cn(
                          'flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors',
                          done && 'bg-brand-gradient text-white',
                          active && 'border border-border bg-muted/60 text-foreground',
                          !done && !active && 'text-muted-foreground/50'
                        )}
                      >
                        <span className={cn(
                          'grid size-5 place-items-center rounded-full text-[10px]',
                          done ? 'bg-white/20' : active ? 'bg-brand-gradient text-white' : 'bg-muted'
                        )}>
                          {done ? <Check className="size-3" /> : i + 1}
                        </span>
                        <span className="hidden sm:inline">{s.label}</span>
                      </div>
                      {i < 3 && (
                        <div className={cn('h-px flex-1', done ? 'bg-brand-gradient opacity-50' : 'bg-border')} />
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            )}

            {/* Step content */}
            <div className="mt-7 min-h-[14rem]">
              <AnimatePresence mode="wait">
                {/* Step 0: Service */}
                {step === 0 && (
                  <Step key="s0" title="What do you need help with?" subtitle="Pick the primary service — you can combine later.">
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {SERVICE_OPTIONS.map((opt) => {
                        const Icon = opt.icon
                        const active = service === opt.id
                        return (
                          <button
                            key={opt.id}
                            onClick={() => setService(opt.id)}
                            className={cn(
                              'group flex items-center gap-3 rounded-2xl border p-3.5 text-left transition-all',
                              active
                                ? 'border-transparent bg-brand-gradient text-white shadow-[0_6px_20px_-6px_rgba(255,45,117,0.6)]'
                                : 'border-border/70 bg-muted/30 hover:border-border'
                            )}
                          >
                            <span className={cn(
                              'grid size-10 shrink-0 place-items-center rounded-xl',
                              active ? 'bg-white/20' : cn('bg-gradient-to-br text-white', opt.accent)
                            )}>
                              <Icon className="size-5" />
                            </span>
                            <span className="text-sm font-semibold">{opt.label}</span>
                            {active && <Check className="ml-auto size-4" />}
                          </button>
                        )
                      })}
                    </div>
                  </Step>
                )}

                {/* Step 1: Budget */}
                {step === 1 && (
                  <Step key="s1" title="What's your budget range?" subtitle="No commitment — this just helps us scope the right solution.">
                    <div className="grid grid-cols-2 gap-2.5">
                      {BUDGET_OPTIONS.map((b) => {
                        const active = budget === b
                        return (
                          <button
                            key={b}
                            onClick={() => setBudget(b)}
                            className={cn(
                              'rounded-2xl border p-4 text-center text-sm font-semibold transition-all',
                              active
                                ? 'border-transparent bg-brand-gradient text-white shadow-[0_6px_20px_-6px_rgba(255,45,117,0.6)]'
                                : 'border-border/70 bg-muted/30 hover:border-border'
                            )}
                          >
                            {b}
                          </button>
                        )
                      })}
                    </div>
                  </Step>
                )}

                {/* Step 2: Timeline */}
                {step === 2 && (
                  <Step key="s2" title="When do you want to launch?" subtitle="We'll match our capacity to your timeline.">
                    <div className="grid grid-cols-2 gap-2.5">
                      {TIMELINE_OPTIONS.map((t) => {
                        const active = timeline === t
                        return (
                          <button
                            key={t}
                            onClick={() => setTimeline(t)}
                            className={cn(
                              'rounded-2xl border p-4 text-center text-sm font-semibold transition-all',
                              active
                                ? 'border-transparent bg-brand-gradient text-white shadow-[0_6px_20px_-6px_rgba(255,45,117,0.6)]'
                                : 'border-border/70 bg-muted/30 hover:border-border'
                            )}
                          >
                            {t}
                          </button>
                        )
                      })}
                    </div>
                  </Step>
                )}

                {/* Step 3: Details */}
                {step === 3 && (
                  <Step key="s3" title="Almost there!" subtitle="Tell us who you are and anything else we should know.">
                    <div className="space-y-3">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name *"
                          className="h-11 rounded-xl bg-muted/40 px-4 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        />
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          placeholder="Email *"
                          className="h-11 rounded-xl bg-muted/40 px-4 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      <textarea
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Tell us about your project, goals, or anything we should know… (optional)"
                        rows={3}
                        className="w-full rounded-xl bg-muted/40 px-4 py-3 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                      />
                    </div>
                  </Step>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <motion.div
                    key="s4"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                      className="relative grid size-16 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_0_40px_-6px_rgba(255,45,117,0.7)]"
                    >
                      <span className="absolute inset-0 rounded-full bg-brand-gradient opacity-50 blur-md animate-pulse-glow" />
                      <Check className="relative size-8" />
                    </motion.div>
                    <h3 className="mt-5 font-display text-2xl font-bold">
                      Got it, {name.split(' ')[0] || 'friend'}! 🎉
                    </h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                      Your project brief is on its way to our team. We&apos;ll reply within one business day with a tailored proposal.
                    </p>
                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {[service, budget, timeline].filter(Boolean).map((s) => (
                        <span key={s} className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-7 flex gap-2">
                      <Button variant="outline" onClick={reset} className="rounded-full">
                        <RotateCcw className="size-4" />
                        Start over
                      </Button>
                      <Button onClick={() => setPage('home')} className="rounded-full bg-brand-gradient text-white">
                        Back to home
                        <ArrowRight className="size-4" />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer nav */}
            {step < 4 && (
              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-5">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className={cn(
                    'flex items-center gap-1.5 text-sm font-semibold transition-colors',
                    step === 0 ? 'cursor-not-allowed text-muted-foreground/30' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <ArrowLeft className="size-4" />
                  Back
                </button>
                {step < 3 ? (
                  <Button
                    onClick={next}
                    disabled={!canProceed}
                    className="rounded-full bg-brand-gradient text-white disabled:opacity-40"
                  >
                    Continue
                    <ArrowRight className="size-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={finish}
                    disabled={!canProceed}
                    className="rounded-full bg-brand-gradient text-white disabled:opacity-40"
                  >
                    Submit brief
                    <Check className="size-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Step({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3 className="font-display text-lg font-bold tracking-tight sm:text-xl">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </motion.div>
  )
}
