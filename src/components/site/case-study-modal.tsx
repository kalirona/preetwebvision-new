'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Quote, Target, Lightbulb, TrendingUp, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useNav } from '@/lib/nav-store'
import { CASE_STUDIES } from '@/lib/content-data'
import type { Project } from '@/lib/site-data'
import { cn } from '@/lib/utils'

export function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null
  onClose: () => void
}) {
  const { setPage } = useNav()
  const caseStudy = project ? CASE_STUDIES[project.id] : null

  React.useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && caseStudy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`Case study: ${project.title}`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* Panel */}
          <motion.div
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl border border-border/60 bg-background shadow-2xl sm:rounded-3xl"
          >
            {/* Header / cover */}
            <div className="relative shrink-0 overflow-hidden">
              {project.image ? (
                <>
                  <img src={project.image} alt={project.title} className="absolute inset-0 size-full object-cover" />
                  <div className={cn('absolute inset-0 bg-gradient-to-br opacity-40 mix-blend-multiply', project.gradient)} />
                </>
              ) : (
                <div className={cn('absolute inset-0 bg-gradient-to-br', project.gradient)} />
              )}
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <span className="absolute left-6 top-6 text-5xl drop-shadow-lg">{project.emoji}</span>
              <button
                onClick={onClose}
                aria-label="Close case study"
                className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-colors hover:bg-white/25"
              >
                <X className="size-4" />
              </button>
              <div className="relative flex min-h-[10rem] items-end p-6 sm:min-h-[12rem] sm:p-8">
                <div>
                  <div className="flex items-center gap-2 text-xs text-white/80">
                    <span className="rounded-full bg-white/15 px-2.5 py-0.5 backdrop-blur">{project.category}</span>
                    <span>{project.client}</span>
                    <span>·</span>
                    <span>{project.year}</span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                    {project.title}
                  </h2>
                </div>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {/* Metrics row */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {caseStudy.results.map((r) => (
                  <div
                    key={r.label}
                    className="relative overflow-hidden rounded-2xl border border-border/60 bg-card p-3.5"
                  >
                    <div className="pointer-events-none absolute -right-4 -top-4 size-12 rounded-full bg-brand-gradient opacity-15 blur-xl" />
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{r.label}</p>
                    <p className="mt-1 font-display text-xl font-bold text-gradient-brand">{r.value}</p>
                  </div>
                ))}
              </div>

              {/* Challenge */}
              <Section icon={Target} title="The challenge" accent="var(--brand-orange)">
                <p className="text-sm leading-relaxed text-muted-foreground">{caseStudy.challenge}</p>
              </Section>

              {/* Solution */}
              <Section icon={Lightbulb} title="Our solution" accent="var(--brand-pink)">
                <p className="text-sm leading-relaxed text-muted-foreground">{caseStudy.solution}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {caseStudy.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Results */}
              <Section icon={TrendingUp} title="The results" accent="var(--brand-emerald)">
                <ul className="space-y-2">
                  {caseStudy.results.map((r) => (
                    <li key={r.label} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="size-4 shrink-0" style={{ color: 'var(--brand-emerald)' }} />
                      <span className="text-muted-foreground">{r.label}:</span>
                      <span className="font-semibold">{r.value}</span>
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Testimonial */}
              {caseStudy.testimonial && (
                <div className="relative mt-6 overflow-hidden rounded-2xl border border-border/60 bg-muted/20 p-5">
                  <Quote className="absolute right-4 top-4 size-10 text-muted-foreground/10" />
                  <blockquote className="relative pr-10 text-sm font-medium leading-relaxed">
                    &ldquo;{caseStudy.testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="relative mt-4 flex items-center gap-2.5">
                    <Avatar className="size-8 border border-background">
                      <AvatarFallback className="bg-brand-gradient text-[10px] font-bold text-white">
                        {caseStudy.testimonial.name.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs font-bold">{caseStudy.testimonial.name}</p>
                      <p className="text-[11px] text-muted-foreground">{caseStudy.testimonial.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <div className="shrink-0 border-t border-border/60 bg-muted/20 p-5 sm:p-6">
              <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                <p className="text-sm text-muted-foreground">
                  Want results like these? Let&apos;s talk.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={onClose} className="rounded-full">
                    Close
                  </Button>
                  <Button
                    onClick={() => {
                      onClose()
                      setPage('contact')
                    }}
                    className="rounded-full bg-brand-gradient text-white"
                  >
                    Start a project
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Section({
  icon: Icon,
  title,
  accent,
  children,
}: {
  icon: typeof Target
  title: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-6">
      <h3 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide text-muted-foreground">
        <span className="grid size-7 place-items-center rounded-lg" style={{ background: `color-mix(in oklch, ${accent} 15%, transparent)` }}>
          <Icon className="size-3.5" style={{ color: accent }} />
        </span>
        {title}
      </h3>
      <div className="mt-2.5">{children}</div>
    </div>
  )
}
