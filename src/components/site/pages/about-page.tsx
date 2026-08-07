'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Sparkles,
  Globe,
  Users,
  Heart,
  Zap,
  Quote,
  Linkedin,
  Twitter,
  Github,
  Link as LinkIcon,
  MapPin,
  Briefcase,
  ArrowUpRight,
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
import { TeamModal } from '@/components/site/team-modal'
import { useNav } from '@/lib/nav-store'
import { TEAM, VALUES, TIMELINE, STATS, AWARDS, TECH_STACK } from '@/lib/site-data'
import { TEAM_PROFILES, JOB_ROLES, type TeamProfile } from '@/lib/content-data'
import { cn } from '@/lib/utils'

/* Social icon resolver — maps a label string to a Lucide icon */
function SocialIcon({ label }: { label: string }) {
  const cls = 'size-4'
  if (label.toLowerCase().includes('linked')) return <Linkedin className={cls} />
  if (label.toLowerCase().includes('git')) return <Github className={cls} />
  if (label.toLowerCase().includes('twitter') || label.toLowerCase().includes('x'))
    return <Twitter className={cls} />
  return <LinkIcon className={cls} />
}

/* ============================== HERO ============================== */
function Hero() {
  const { setPage } = useNav()
  return (
    <section className="relative overflow-hidden pb-20 pt-10 sm:pt-16">
      <AmbientBackground variant="strong" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: copy */}
          <div className="relative">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="size-3.5" style={{ color: 'var(--brand-pink)' }} />
                Our Story
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                We&apos;re <GradientText className="animate-gradient-pan bg-[length:220%_220%]">Preet Web Vision</GradientText>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed">
                A senior, remote-first digital studio pairing{' '}
                <span className="text-foreground font-medium">design obsessiveness</span> with{' '}
                <span className="text-foreground font-medium">AI-native engineering</span>. We build
                websites, web apps and automation systems that look stunning and ship measurable
                outcomes — for ambitious brands across the globe.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  onClick={() => setPage('contact')}
                  className="group relative h-12 overflow-hidden rounded-full bg-brand-gradient px-6 text-base text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(255,45,117,0.85)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Work with us
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 animate-shimmer opacity-40" />
                </Button>
                <Button
                  onClick={() => setPage('portfolio')}
                  variant="outline"
                  className="h-12 rounded-full px-6 text-base backdrop-blur"
                >
                  See our work
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Globe className="size-4" style={{ color: 'var(--brand-orange)' }} />
                  12 countries served
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="size-4" style={{ color: 'var(--brand-pink)' }} />
                  40+ senior experts
                </div>
                <div className="flex items-center gap-1.5">
                  <Heart className="size-4" style={{ color: 'var(--brand-rose)' }} />
                  98% retention
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: floating visual */}
          <Reveal delay={0.2} className="relative">
            <HeroVisual />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      {/* central orb composition */}
      <div className="absolute inset-1/4 rounded-full bg-brand-gradient opacity-30 blur-2xl animate-pulse-glow" />
      <div className="absolute inset-[30%] rounded-full bg-brand-gradient animate-gradient-pan bg-[length:200%_200%] shadow-[0_0_80px_-10px_rgba(255,45,117,0.7)]" />

      {/* orbit rings */}
      <div className="absolute inset-0 rounded-full border border-dashed border-border/50 animate-spin-slow" />
      <div className="absolute inset-[14%] rounded-full border border-border/40 animate-spin-slow [animation-direction:reverse]" />

      {/* floating stat card cluster */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-2 top-6 w-44 rounded-2xl glass-strong p-3.5 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-emerald-500/15 text-emerald-500">
            <Globe className="size-4" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">Brands shipped</p>
            <p className="font-display text-sm font-bold">180+</p>
          </div>
        </div>
        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[88%] rounded-full bg-brand-gradient" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -right-2 top-1/3 w-44 rounded-2xl glass-strong p-3.5 shadow-xl"
      >
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-fuchsia-500/15 text-fuchsia-500">
            <Users className="size-4" />
          </span>
          <div>
            <p className="text-[11px] text-muted-foreground">Remote team</p>
            <p className="font-display text-sm font-bold">12 countries</p>
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
        <p className="text-[11px] text-muted-foreground">Founded</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="font-display text-2xl font-bold text-gradient-brand">2016</p>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
            still shipping
          </span>
        </div>
      </motion.div>
    </div>
  )
}

/* ============================== MISSION / STORY ============================== */
function Story() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left: narrative */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why we exist"
              title={
                <>
                  Design, engineering &amp; AI —{' '}
                  <GradientText>one craft, one team</GradientText>
                </>
              }
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-muted-foreground">
                We started Preet Web Vision in 2016 with a simple conviction: design, engineering
                and AI shouldn&apos;t live in separate rooms. When the people shaping the pixels
                also write the code and train the models, the work gets sharper, faster and
                measurably better.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                Eight years on, that belief has carried us to{' '}
                <span className="text-foreground font-medium">180+ brands</span> across{' '}
                <span className="text-foreground font-medium">12 countries</span> — from
                early-stage startups to public companies. We stay small and senior on purpose, so
                the people you meet are the people doing the work.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted-foreground">
                Today we pair that craft with an AI-native workflow — LLM agents, RAG systems and
                automation woven directly into the products we ship — so our clients don&apos;t
                just keep up. They compound.
              </p>
            </Reveal>
            <Reveal delay={0.28}>
              <div className="mt-7 flex flex-wrap gap-2">
                {['Remote-first', 'Senior-only', 'AI-native', 'Outcome-obsessed'].map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full border-border/60 bg-brand-gradient-soft px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: gradient stat block + card cluster */}
          <Reveal delay={0.2}>
            <div className="relative">
              {/* main gradient block */}
              <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-7 sm:p-8">
                <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top_right,#000,transparent_70%)]" />
                <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-brand-gradient opacity-25 blur-3xl animate-pulse-glow" />
                <div className="relative">
                  <Quote className="size-8 text-muted-foreground/30" />
                  <p className="mt-4 font-display text-xl font-medium leading-relaxed sm:text-2xl">
                    Beautiful work is the price of entry.{' '}
                    <GradientText>Real outcomes</GradientText> are the goal.
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <Avatar className="size-11 border-2 border-background">
                      <AvatarFallback className="bg-gradient-to-br from-orange-500 to-pink-500 text-white">
                        PK
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-display text-sm font-bold">Preet Kaur</p>
                      <p className="text-xs text-muted-foreground">Founder &amp; Creative Director</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating mini stat card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -left-4 w-44 rounded-2xl glass-strong p-4 shadow-xl sm:-left-6"
              >
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-amber-500/15 text-amber-500">
                    <Zap className="size-4" />
                  </span>
                  <div>
                    <p className="text-[11px] text-muted-foreground">Avg. client ROI</p>
                    <p className="font-display text-sm font-bold text-gradient-brand">14x</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
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

/* ============================== VALUES ============================== */
function Values() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our principles"
          title={
            <>
              What we <GradientText>stand for</GradientText>
            </>
          }
          description="Four values that shape every decision, from kickoff to launch and beyond."
        />
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                variants={staggerItem}
                className="group relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl"
              >
                <span className="pointer-events-none absolute -right-10 -top-10 size-28 rounded-full bg-brand-gradient opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-30" />
                <span className="relative grid size-12 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg">
                  <Icon className="size-6" />
                </span>
                <h3 className="relative mt-5 font-display text-lg font-bold tracking-tight">
                  {v.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </motion.div>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}

/* ============================== TIMELINE ============================== */
function TimelineSection() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/4 size-72 -translate-x-1/2 rounded-full bg-brand-gradient opacity-10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Milestones"
          title={
            <>
              Our <GradientText>journey</GradientText>
            </>
          }
          description="From a one-person studio in 2016 to a senior, AI-native team shipping across 12 countries."
        />

        <div className="relative mx-auto mt-16 max-w-4xl">
          {/* gradient spine — centered on desktop, left on mobile */}
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-border to-transparent sm:left-1/2 sm:-translate-x-1/2" />
          <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-orange-500/60 via-pink-500/60 to-rose-500/60 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-8 sm:space-y-12">
            {TIMELINE.map((event, i) => {
              const isLeft = i % 2 === 0
              return (
                <Reveal key={event.year} delay={i * 0.08}>
                  <div
                    className={cn(
                      'relative flex items-center gap-6',
                      isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                    )}
                  >
                    {/* node dot */}
                    <div className="absolute left-4 z-10 -translate-x-1/2 sm:left-1/2">
                      <span className="relative grid size-5 place-items-center rounded-full bg-brand-gradient shadow-[0_0_20px_-2px_rgba(255,45,117,0.7)]">
                        <span className="absolute size-5 animate-ping rounded-full bg-brand-gradient opacity-40" />
                      </span>
                    </div>

                    {/* card — half width on desktop */}
                    <div
                      className={cn(
                        'ml-12 w-full sm:ml-0 sm:w-[calc(50%-2.5rem)]',
                        isLeft ? 'sm:pr-0 sm:text-right' : 'sm:pl-0'
                      )}
                    >
                      <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-xl">
                        <span className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-brand-gradient opacity-10 blur-2xl transition-opacity group-hover:opacity-25" />
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient-soft px-2.5 py-1 text-xs font-bold text-foreground">
                          <span className="size-1.5 rounded-full bg-brand-gradient" />
                          {event.year}
                        </span>
                        <h3 className="mt-3 font-display text-lg font-bold tracking-tight">
                          {event.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    {/* spacer for the other half on desktop */}
                    <div className="hidden sm:block sm:w-[calc(50%-2.5rem)]" />
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================== TEAM ============================== */
function Team({ onOpen }: { onOpen: (p: TeamProfile) => void }) {
  const { setPage } = useNav()
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Meet the team"
          title={
            <>
              The <GradientText>humans</GradientText> behind the vision
            </>
          }
          description="A senior, multidisciplinary crew. Tap a face to learn more — the people you meet are the people doing the work."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((m, i) => (
            <motion.button
              key={m.name}
              variants={staggerItem}
              onClick={() => onOpen(TEAM_PROFILES[i])}
              className="group card-sheen relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <span
                className={cn(
                  'pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-30',
                  m.accent
                )}
              />
              <div className="relative flex items-center gap-4">
                <Avatar className="size-14 border-2 border-background shadow-md transition-transform duration-300 group-hover:scale-105">
                  {TEAM_PROFILES[i]?.image ? (
                    <img
                      src={TEAM_PROFILES[i].image}
                      alt={m.name}
                      className="size-full object-cover"
                    />
                  ) : null}
                  <AvatarFallback
                    className={cn(
                      'bg-gradient-to-br text-white font-display text-lg font-bold',
                      m.accent
                    )}
                  >
                    {m.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-bold tracking-tight">{m.name}</p>
                  <p className="text-sm text-muted-foreground">{m.role}</p>
                </div>
                <span className="text-xs font-semibold text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  View →
                </span>
              </div>
              <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">
                {m.bio}
              </p>
              <div className="relative mt-5 flex items-center gap-2 pt-1">
                {m.socials.map((s) => (
                  <span
                    key={s.label}
                    aria-label={`${m.name} on ${s.label}`}
                    className="grid size-9 place-items-center rounded-full border border-border/60 bg-muted/40 text-muted-foreground transition-all group-hover:border-border group-hover:bg-brand-gradient-soft group-hover:text-foreground"
                  >
                    <SocialIcon label={s.label} />
                  </span>
                ))}
              </div>
            </motion.button>
          ))}

          {/* Join the team — CTA card */}
          <motion.button
            variants={staggerItem}
            onClick={() => setPage('contact')}
            className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-border/70 bg-muted/20 p-6 text-left transition-colors hover:border-border"
          >
            <span className="absolute -right-8 -top-8 size-32 rounded-full bg-brand-gradient opacity-10 blur-2xl transition-opacity group-hover:opacity-25" />
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                We&apos;re hiring
              </span>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">
                Join the team
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;re always looking for senior designers, engineers and AI folks who care
                deeply about craft. Say hello.
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
              Open roles
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </span>
          </motion.button>
        </StaggerGroup>
      </div>
    </section>
  )
}

/* ============================== AWARDS STRIP ============================== */
function Awards() {
  return (
    <section className="relative py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Recognition &amp; standards
          </p>
        </Reveal>
        <StaggerGroup className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {AWARDS.map((a) => {
            const Icon = a.icon
            return (
              <motion.div
                key={a.label}
                variants={staggerItem}
                className="group flex items-center gap-3 rounded-2xl border border-border/60 bg-card/60 p-4 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-lg"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft">
                  <Icon className="size-5" style={{ color: 'var(--brand-pink)' }} />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-bold">{a.label}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{a.sub}</p>
                </div>
              </motion.div>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}

/* ============================== TECH STACK MARQUEE ============================== */
function TechStack() {
  return (
    <section className="relative py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Tools we master
          </p>
        </Reveal>
        <div className="mt-6">
          <Marquee items={TECH_STACK} reverse />
        </div>
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
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] gradient-border p-8 sm:p-12 lg:p-14">
            {/* ambient glow */}
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand-gradient opacity-25 blur-3xl animate-pulse-glow" />
            <div className="pointer-events-none absolute -left-16 bottom-0 size-64 rounded-full opacity-25 blur-3xl" style={{ background: 'var(--brand-rose)' }} />

            <div className="relative mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles className="size-3.5" style={{ color: 'var(--brand-pink)' }} />
                Let&apos;s build together
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold tracking-tight sm:text-5xl leading-[1.08]">
                Let&apos;s build the <GradientText>future, together</GradientText>
              </h2>
              <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
                Tell us about your goals and we&apos;ll bring the design, engineering and AI to make
                them real. Most projects kick off within two weeks.
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
                  onClick={() => setPage('services')}
                  variant="outline"
                  className="h-12 rounded-full px-6 text-base backdrop-blur"
                >
                  Explore services
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== CAREERS ============================== */
function Careers() {
  const { setPage } = useNav()
  const [teamFilter, setTeamFilter] = React.useState<string>('All')
  const teams = ['All', 'Design', 'Engineering', 'AI', 'Growth', 'Operations']
  const filtered = teamFilter === 'All' ? JOB_ROLES : JOB_ROLES.filter((r) => r.team === teamFilter)

  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              align="left"
              eyebrow="We're hiring"
              title={
                <>
                  Build your career at <GradientText>Preet Web Vision</GradientText>
                </>
              }
              description="Senior, remote-first and obsessed with craft. We're growing the team carefully — come shape what we build next."
            />
            <Reveal delay={0.15}>
              <div className="mt-7 grid grid-cols-3 gap-3">
                {[
                  { label: 'Open roles', value: JOB_ROLES.length },
                  { label: 'Remote-first', value: '100%' },
                  { label: 'Avg tenure', value: '3.2y' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl border border-border/60 bg-card p-3.5 text-center">
                    <p className="font-display text-xl font-bold text-gradient-brand">{s.value}</p>
                    <p className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button onClick={() => setPage('contact')} className="rounded-full bg-brand-gradient text-white">
                  Apply / introduce yourself
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </Reveal>
          </div>

          <div>
            {/* Team filter */}
            <Reveal>
              <div className="flex flex-wrap gap-2">
                {teams.map((t) => {
                  const active = teamFilter === t
                  return (
                    <button
                      key={t}
                      onClick={() => setTeamFilter(t)}
                      className={cn(
                        'relative rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
                        active ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="careers-filter-pill"
                          className="absolute inset-0 rounded-full bg-brand-gradient"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{t}</span>
                    </button>
                  )
                })}
              </div>
            </Reveal>

            {/* Roles list */}
            <StaggerGroup className="mt-5 space-y-3">
              {filtered.map((role) => (
                <motion.button
                  key={role.id}
                  variants={staggerItem}
                  onClick={() => setPage('contact')}
                  className="group cmp-row flex w-full items-center gap-4 rounded-2xl border border-border/60 bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-lg sm:p-5"
                >
                  <span className={cn('grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md', role.accent)}>
                    <Briefcase className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <p className="font-display text-base font-bold tracking-tight">{role.title}</p>
                      <span className="rounded-full bg-muted/60 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{role.team}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{role.blurb}</p>
                    <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3" />
                        {role.location}
                      </span>
                      <span>·</span>
                      <span>{role.type}</span>
                    </div>
                  </div>
                  <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </motion.button>
              ))}
            </StaggerGroup>

            {filtered.length === 0 && (
              <p className="mt-8 text-center text-sm text-muted-foreground">No open roles in this team right now.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============================== PAGE ============================== */
export function AboutPage() {
  const [activeProfile, setActiveProfile] = React.useState<TeamProfile | null>(null)
  return (
    <div className="relative">
      <Hero />
      <Story />
      <StatsBand />
      <Values />
      <TimelineSection />
      <Team onOpen={setActiveProfile} />
      <Careers />
      <Awards />
      <TechStack />
      <FinalCta />
      <TeamModal profile={activeProfile} onClose={() => setActiveProfile(null)} />
    </div>
  )
}
