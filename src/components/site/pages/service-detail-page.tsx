'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Sparkles,
  Rocket,
  Lightbulb,
  Code2,
  PenTool,
  Target,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Reveal,
  SectionHeading,
  GradientText,
  StaggerGroup,
  staggerItem,
} from '@/components/site/primitives'
import { AmbientBackground } from '@/components/site/ambient-background'
import { SvgDivider } from '@/components/site/svg-divider'
import { SERVICES, FAQS } from '@/lib/site-data'
import { FaqWithSearch } from '@/components/site/faq-with-search'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { AiAssistant } from '@/components/site/ai-assistant'
import { ScrollProgress, BackToTop } from '@/components/site/site-chrome'
import { cn } from '@/lib/utils'

const PROCESS_STEPS = [
  { icon: Lightbulb, title: 'Discover', desc: 'We dig into your goals and audience to craft a sharp roadmap.' },
  { icon: PenTool, title: 'Design', desc: 'We design interactive prototypes you can feel before we build.' },
  { icon: Code2, title: 'Build', desc: 'Clean, scalable, tested code with weekly demos.' },
  { icon: Rocket, title: 'Launch', desc: 'We ship, measure, and optimize for compounding growth.' },
]

export function ServiceDetailPage({ slug }: { slug: string }) {
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) return null
  const Icon = service.icon
  const relatedServices = SERVICES.filter((s) => s.id !== service.id).slice(0, 3)

  const serviceFaqs = FAQS.filter((f) =>
    f.question.toLowerCase().includes(service.title.toLowerCase().split(' ')[0]) ||
    f.answer.toLowerCase().includes(service.title.toLowerCase().split(' ')[0])
  )
  const displayFaqs = serviceFaqs.length >= 2 ? serviceFaqs : FAQS.slice(0, 4)

  return (
    <div className="relative flex min-h-screen flex-col">
      <ScrollProgress />
      <Navbar />
      <main className="relative flex-1 pt-24">
        {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-8">
        <AmbientBackground variant="strong" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="breadcrumb mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-foreground">Home</a>
            <span>›</span>
            <a href="/#services" className="hover:text-foreground">Services</a>
            <span>›</span>
            <span className="truncate text-foreground/70">{service.title}</span>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Reveal>
                <span className={cn(
                  'inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br p-3 text-white shadow-lg',
                  service.accent
                )}>
                  <Icon className="size-7" />
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                  {service.title}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-3 text-lg font-medium" style={{ color: 'var(--brand-pink)' }}>
                  {service.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="/#contact">
                    <Button className="h-12 rounded-full bg-brand-gradient px-6 text-base text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.6)]">
                      Start a project
                      <ArrowRight className="size-4" />
                    </Button>
                  </a>
                  <a href="/#portfolio">
                    <Button variant="outline" className="h-12 rounded-full px-6 text-base">
                      See related work
                    </Button>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Visual */}
            <Reveal delay={0.25} className="relative">
              <div className="relative mx-auto aspect-square w-full max-w-sm">
                <div className={cn('absolute inset-1/4 rounded-full bg-gradient-to-br opacity-30 blur-2xl animate-pulse-glow', service.accent)} />
                <div className={cn('absolute inset-1/3 rounded-full bg-gradient-to-br animate-gradient-pan bg-[length:200%_200%] shadow-[0_0_80px_-10px_rgba(255,45,117,0.7)]', service.accent)} />
                <div className="absolute inset-0 rounded-full border border-dashed border-border/50 animate-spin-slow" />
                <div className="absolute inset-[12%] rounded-full border border-border/40 animate-spin-slow [animation-direction:reverse]" />
                <span className="absolute inset-0 grid place-items-center">
                  <Icon className="size-20 text-white drop-shadow-2xl" />
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SvgDivider />

      {/* Features */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="What's included"
            title={<>Everything you get with <GradientText>{service.title}</GradientText></>}
            description="A comprehensive scope designed to deliver real business outcomes — not just deliverables."
          />
          <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.features.map((feature, i) => (
              <motion.div
                key={feature}
                variants={staggerItem}
                className="group relative flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5 transition-all hover:-translate-y-1 hover:border-border hover:shadow-lg"
              >
                <span className={cn(
                  'grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white shadow-md transition-transform group-hover:scale-110',
                  service.accent
                )}>
                  <Check className="size-4" />
                </span>
                <div>
                  <p className="font-display text-sm font-bold">{feature}</p>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <SvgDivider />

      {/* Deliverables */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Deliverables"
            title={<>What you&apos;ll <GradientText>receive</GradientText></>}
            description="Tangible outputs you can measure and build on."
          />
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2">
            {service.deliverables.map((item, i) => (
              <motion.div
                key={item}
                variants={staggerItem}
                className="flex items-center gap-4 rounded-2xl border border-border/60 bg-card p-5"
              >
                <span className="font-display text-2xl font-bold text-gradient-brand">0{i + 1}</span>
                <div>
                  <p className="font-display text-sm font-bold">{item}</p>
                </div>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <SvgDivider />

      {/* Process */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="How we work"
            title={<>Our <GradientText>4-step process</GradientText></>}
            description="A proven path from idea to impact."
          />
          <div className="relative mt-16">
            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />
            <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PROCESS_STEPS.map((step, i) => {
                const StepIcon = step.icon
                return (
                  <motion.div key={step.title} variants={staggerItem} className="relative">
                    <div className="relative z-10 mx-auto grid size-14 place-items-center rounded-2xl border border-border/60 bg-card shadow-sm lg:mx-0">
                      <StepIcon className="size-6" style={{ color: 'var(--brand-pink)' }} />
                      <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-brand-gradient text-[10px] font-bold text-white">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="mt-5 text-center lg:text-left">
                      <h3 className="font-display text-lg font-bold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </StaggerGroup>
          </div>
        </div>
      </section>

      <SvgDivider />

      {/* FAQ */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="FAQ"
            title={<>Questions about <GradientText>{service.title}</GradientText></>}
          />
          <Reveal delay={0.1} className="mt-12">
            <FaqWithSearch faqs={displayFaqs} />
          </Reveal>
        </div>
      </section>

      <SvgDivider />

      {/* Related services */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Explore more"
            title={<>Related <GradientText>services</GradientText></>}
            description="Combine capabilities for a full growth engine."
          />
          <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-3">
            {relatedServices.map((s) => {
              const RIcon = s.icon
              return (
                <motion.a
                  key={s.id}
                  href={`/services/${s.slug}`}
                  variants={staggerItem}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card p-6 transition-all hover:-translate-y-1 hover:border-border hover:shadow-xl"
                >
                  <span className={cn(
                    'grid size-12 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform group-hover:scale-110',
                    s.accent
                  )}>
                    <RIcon className="size-6" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                    Learn more
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </motion.a>
              )
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="cta-glass relative overflow-hidden rounded-[2rem] p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand-gradient opacity-20 blur-3xl animate-pulse-glow" />
            <div className="relative text-center">
              <Badge className="rounded-full border-border/60 bg-brand-gradient-soft text-foreground">
                <Sparkles className="size-3.5" />
                Ready to start?
              </Badge>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
                Let&apos;s build your <GradientText>{service.title.toLowerCase()}</GradientText> project
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                Tell us about your vision. We&apos;ll reply within one business day with a plan.
              </p>
              <div className="mt-7 flex justify-center gap-3">
                <a href="/#contact">
                  <Button className="h-12 rounded-full bg-brand-gradient px-6 text-base text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.6)]">
                    Start a project
                    <ArrowRight className="size-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
      <Footer />
      <AiAssistant />
      <BackToTop />
    </div>
  )
}
