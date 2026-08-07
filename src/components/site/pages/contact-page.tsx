'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Send,
  Sparkles,
  Clock,
  Calendar,
  MessageSquare,
  Globe,
  ShieldCheck,
  Users,
  Loader2,
  PartyPopper,
  Twitter,
  Linkedin,
  Github,
  Instagram,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Reveal,
  SectionHeading,
  GradientText,
} from '@/components/site/primitives'
import { AmbientBackground } from '@/components/site/ambient-background'
import { useNav } from '@/lib/nav-store'
import { cn } from '@/lib/utils'

/* ============================== CONSTANTS ============================== */
const SERVICE_OPTIONS = [
  'Website Design & Development',
  'AI Automations',
  'Web App Development',
  'SEO & Digital Growth',
  'Ecommerce Solutions',
] as const

const BUDGET_OPTIONS = ['<$5k', '$5k–$15k', '$15k–$50k', '$50k+'] as const

const CONTACT_FAQS = [
  {
    question: 'How fast do you respond?',
    answer:
      'We reply to every serious inquiry within one business day — usually much faster during working hours (9am–7pm IST). For urgent projects, mention it in your message and we will bump you to the top of the queue.',
  },
  {
    question: 'Do you sign NDAs?',
    answer:
      'Always. We are happy to sign a mutual NDA before any detailed discussion. Confidentiality is the default at Preet Web Vision — your idea, your data, your competitive edge stays yours.',
  },
  {
    question: 'What happens after I submit the form?',
    answer:
      'A senior team member (not a sales bot) reviews your message and replies with thoughtful next steps — usually a free 30-minute discovery call, a rough timeline and budget range, and a few relevant case studies.',
  },
  {
    question: 'Can we hop on a call right away?',
    answer:
      'Yes. Mention in your message that you would like a call, share two or three time windows that work for you, and we will send a calendar invite within hours — wherever you are in the world.',
  },
]

const CITY_PINS = [
  { name: 'San Francisco', x: '18%', y: '38%' },
  { name: 'New York', x: '30%', y: '42%' },
  { name: 'London', x: '48%', y: '32%' },
  { name: 'Dubai', x: '60%', y: '48%' },
  { name: 'Bengaluru', x: '70%', y: '58%' },
  { name: 'Singapore', x: '78%', y: '64%' },
  { name: 'Sydney', x: '88%', y: '78%' },
]

const schema = z.object({
  name: z.string().min(2, 'Please enter your name (min 2 characters).'),
  email: z.string().email('Please enter a valid email address.'),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, 'Tell us a bit more about your project (min 10 characters).'),
  website: z.string().optional(), // honeypot
})

type FormValues = z.infer<typeof schema>

/* ============================== HERO ============================== */
function Hero() {
  const trust = [
    'Reply within 1 business day',
    'Free 30-min consultation',
    'NDA on request',
  ]
  return (
    <section className="relative overflow-hidden pb-12 pt-10 sm:pt-16">
      <AmbientBackground variant="strong" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="flex size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Get in touch
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Let&apos;s build something{' '}
              <GradientText className="animate-gradient-pan bg-[length:220%_220%]">
                extraordinary
              </GradientText>
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed">
              Tell us about your project and a senior team member will reply
              within one business day — with ideas, not a sales pitch.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {trust.map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  {t}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================== CONTACT INFO PANEL ============================== */
function ContactInfoPanel() {
  const methods = [
    {
      icon: Mail,
      label: 'Email us',
      value: 'hello@preetwebvision.com',
      href: 'mailto:hello@preetwebvision.com',
      tile: 'bg-orange-500/15 text-orange-500',
    },
    {
      icon: Phone,
      label: 'Call us',
      value: '+91 90000 00000',
      href: 'tel:+919000000000',
      tile: 'bg-emerald-500/15 text-emerald-500',
    },
    {
      icon: MapPin,
      label: 'Where we are',
      value: 'Remote-first · worldwide',
      href: undefined,
      tile: 'bg-fuchsia-500/15 text-fuchsia-500',
    },
  ]

  const reasons = [
    { icon: MessageSquare, text: 'Free 30-minute discovery call' },
    { icon: Sparkles, text: 'Detailed project proposal & timeline' },
    { icon: Users, text: 'Senior team — no hand-offs to juniors' },
    { icon: ShieldCheck, text: 'Zero pressure, no spam, ever' },
  ]

  const socials = [
    { icon: Twitter, label: 'Twitter / X', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
  ]

  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-3xl glass-strong p-6 sm:p-8">
      {/* gradient orb accents */}
      <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-brand-gradient opacity-20 blur-3xl animate-pulse-glow" />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 size-48 rounded-full opacity-15 blur-3xl animate-float-slow"
        style={{ background: 'var(--brand-amber)' }}
      />

      <div className="relative flex h-full flex-col">
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <Sparkles className="size-3" style={{ color: 'var(--brand-pink)' }} />
          Reach out
        </span>
        <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          Let&apos;s talk about <GradientText>your vision</GradientText>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We partner with founders and product teams who care about craft.
          Here&apos;s how to reach a human.
        </p>

        {/* Contact methods */}
        <div className="mt-6 space-y-3">
          {methods.map((m) => {
            const Icon = m.icon
            const inner = (
              <div className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 p-4 transition-all hover:-translate-y-0.5 hover:border-border hover:bg-card">
                <span
                  className={cn(
                    'grid size-11 shrink-0 place-items-center rounded-xl',
                    m.tile
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                  <p className="truncate font-display text-sm font-semibold">
                    {m.value}
                  </p>
                </div>
                {m.href && (
                  <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                )}
              </div>
            )
            return m.href ? (
              <a key={m.label} href={m.href} className="block">
                {inner}
              </a>
            ) : (
              <div key={m.label}>{inner}</div>
            )
          })}
        </div>

        {/* Why reach out */}
        <div className="mt-6 rounded-2xl border border-border/60 bg-card/40 p-5">
          <p className="font-display text-sm font-bold">Why reach out</p>
          <ul className="mt-3 space-y-2.5">
            {reasons.map((r) => {
              const Icon = r.icon
              return (
                <li
                  key={r.text}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-brand-gradient-soft">
                    <Icon
                      className="size-3"
                      style={{ color: 'var(--brand-pink)' }}
                    />
                  </span>
                  <span>{r.text}</span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Office hours / response badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="rounded-full border-border/60 bg-brand-gradient-soft px-3 py-1 text-foreground"
          >
            <Clock className="size-3.5" style={{ color: 'var(--brand-pink)' }} />
            Mon–Fri · 9am–7pm IST
          </Badge>
          <Badge
            variant="outline"
            className="rounded-full border-border/60 bg-muted/40 px-3 py-1 text-foreground"
          >
            <Calendar className="size-3.5" />
            ~1 business day reply
          </Badge>
        </div>

        {/* Socials */}
        <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-5">
          <span className="text-xs text-muted-foreground">Follow along</span>
          <div className="flex gap-2">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-xl border border-border/60 bg-card/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-transparent hover:bg-brand-gradient hover:text-white hover:shadow-[0_8px_24px_-8px_rgba(255,45,117,0.6)]"
                >
                  <Icon className="size-4" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ============================== CHIP SELECTOR ============================== */
function Chip({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        'rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
        selected
          ? 'border-transparent bg-brand-gradient text-white shadow-[0_4px_20px_-6px_rgba(255,45,117,0.6)]'
          : 'border-border bg-muted/30 text-muted-foreground hover:border-border hover:text-foreground'
      )}
    >
      {label}
    </button>
  )
}

/* ============================== CONTACT FORM CARD ============================== */
function ContactFormCard() {
  const [service, setService] = React.useState<string | null>(null)
  const [budget, setBudget] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
      website: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    // Honeypot: if filled, silently pretend success (anti-spam).
    if (values.website) {
      setSuccess(values.name)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company || undefined,
          service: service || undefined,
          budget: budget || undefined,
          message: values.message,
        }),
      })
      const data = await res.json().catch(() => null)
      if (data?.ok) {
        setSuccess(values.name)
        toast.success('Message received!', {
          description: "We'll reply within one business day.",
        })
      } else {
        toast.error(data?.error || 'Something went wrong. Please try again.')
      }
    } catch {
      toast.error('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSuccess(null)
    setService(null)
    setBudget(null)
    reset({ name: '', email: '', company: '', message: '', website: '' })
  }

  return (
    <div className="relative h-full">
      {/* gradient halo */}
      <div className="pointer-events-none absolute -inset-1 rounded-[2rem] bg-brand-gradient opacity-20 blur-2xl" />
      <div className="relative h-full overflow-hidden rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,#000,transparent_70%)]" />

        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-lg">
              <Send className="size-4" />
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Start a project
            </span>
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Start your project
          </h2>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Fill in a few details and we&apos;ll take it from there. Takes under
            two minutes.
          </p>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-6 py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 16,
                    delay: 0.1,
                  }}
                  className="relative grid size-20 place-items-center rounded-full bg-brand-gradient text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.7)]"
                >
                  <CheckCircle2 className="size-10" />
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 0 }}
                    transition={{ duration: 1.2, delay: 0.3, repeat: 2 }}
                    className="absolute inset-0 rounded-full border-2 border-white"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="mt-6"
                >
                  <div className="flex items-center justify-center gap-2">
                    <PartyPopper className="size-5 text-amber-500" />
                    <h3 className="font-display text-2xl font-bold">
                      Message received, {success.split(' ')[0]}!
                    </h3>
                  </div>
                  <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                    Thanks for reaching out. A senior team member will review
                    your message and reply within{' '}
                    <span className="font-medium text-foreground">
                      one business day
                    </span>
                    . Keep an eye on your inbox.
                  </p>
                </motion.div>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="mt-6 rounded-full"
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit(onSubmit)}
                className="mt-7 space-y-5"
                noValidate
              >
                {/* Honeypot — hidden from humans */}
                <div
                  aria-hidden
                  className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
                >
                  <label htmlFor="website-field">Website</label>
                  <input
                    id="website-field"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('website')}
                  />
                </div>

                {/* Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Your name" htmlFor="name" required error={errors.name?.message}>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      autoComplete="name"
                      className="h-11 rounded-xl bg-muted/30"
                      aria-invalid={!!errors.name}
                      {...register('name')}
                    />
                  </Field>
                  <Field label="Email" htmlFor="email" required error={errors.email?.message}>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@company.com"
                      autoComplete="email"
                      className="h-11 rounded-xl bg-muted/30"
                      aria-invalid={!!errors.email}
                      {...register('email')}
                    />
                  </Field>
                </div>

                {/* Company */}
                <Field label="Company (optional)" htmlFor="company">
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    autoComplete="organization"
                    className="h-11 rounded-xl bg-muted/30"
                    {...register('company')}
                  />
                </Field>

                {/* Service of interest */}
                <div>
                  <Label className="mb-2.5 text-sm font-medium">
                    Service of interest
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {SERVICE_OPTIONS.map((s) => (
                      <Chip
                        key={s}
                        label={s}
                        selected={service === s}
                        onClick={() =>
                          setService((cur) => (cur === s ? null : s))
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <Label className="mb-2.5 text-sm font-medium">
                    Estimated budget
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {BUDGET_OPTIONS.map((b) => (
                      <Chip
                        key={b}
                        label={b}
                        selected={budget === b}
                        onClick={() =>
                          setBudget((cur) => (cur === b ? null : b))
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Message */}
                <Field
                  label="Project details"
                  htmlFor="message"
                  required
                  error={errors.message?.message}
                >
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us what you're building, your goals, timeline, and anything else we should know…"
                    className="resize-none rounded-xl bg-muted/30"
                    aria-invalid={!!errors.message}
                    {...register('message')}
                  />
                </Field>

                {/* Submit */}
                <div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="group relative h-12 w-full overflow-hidden rounded-xl bg-brand-gradient text-base text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.6)] transition-all hover:shadow-[0_14px_50px_-8px_rgba(255,45,117,0.85)] disabled:opacity-80"
                  >
                    {loading ? (
                      <span className="relative z-10 flex items-center gap-2">
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <span className="relative z-10 flex items-center gap-2">
                        Send message
                        <Send className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    )}
                    <span className="absolute inset-0 animate-shimmer opacity-30" />
                  </Button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
                    <ShieldCheck className="size-3.5 text-emerald-500" />
                    We respect your privacy. No spam, ever.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="mb-2 text-sm font-medium">
        {label}
        {required && (
          <span style={{ color: 'var(--brand-pink)' }} className="ml-0.5">
            *
          </span>
        )}
      </Label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-destructive"
          >
            <span className="size-1 rounded-full bg-destructive" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ============================== MAIN GRID ============================== */
function ContactGrid() {
  return (
    <section className="relative py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <ContactInfoPanel />
          </Reveal>
          <Reveal delay={0.1}>
            <ContactFormCard />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============================== FAQ ============================== */
function ContactFaq() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Good to know"
          title={
            <>
              Before you <GradientText>reach out</GradientText>
            </>
          }
          description="A few quick answers so you know exactly what to expect after hitting send."
        />
        <Reveal delay={0.1} className="mt-12">
          <Accordion type="single" collapsible className="space-y-3">
            {CONTACT_FAQS.map((f, i) => (
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

/* ============================== GLOBAL PRESENCE STRIP ============================== */
function GlobalPresence() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-8 sm:p-12">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
          <div className="pointer-events-none absolute -left-20 top-1/2 size-64 -translate-y-1/2 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
          <div
            className="pointer-events-none absolute -right-20 -top-10 size-72 rounded-full opacity-15 blur-3xl animate-pulse-glow"
            style={{ background: 'var(--brand-rose)' }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <Globe
                  className="size-3.5"
                  style={{ color: 'var(--brand-pink)' }}
                />
                Remote-first
              </span>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                Serving clients{' '}
                <GradientText>worldwide</GradientText>
              </h2>
              <p className="mt-3 max-w-md text-sm text-muted-foreground sm:text-base">
                We&apos;re a distributed studio. That means the best talent for
                your project — not just whoever happens to sit in our office.
                We&apos;ve shipped work for teams across 4 continents.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge
                  variant="outline"
                  className="rounded-full border-border/60 bg-muted/40 px-3 py-1.5 text-foreground"
                >
                  <Zap
                    className="size-3.5"
                    style={{ color: 'var(--brand-orange)' }}
                  />
                  180+ brands shipped
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full border-border/60 bg-muted/40 px-3 py-1.5 text-foreground"
                >
                  <Globe className="size-3.5 text-emerald-500" />
                  4 continents
                </Badge>
                <Badge
                  variant="outline"
                  className="rounded-full border-border/60 bg-muted/40 px-3 py-1.5 text-foreground"
                >
                  <Clock
                    className="size-3.5"
                    style={{ color: 'var(--brand-pink)' }}
                  />
                  Overlapping time zones
                </Badge>
              </div>
            </div>

            {/* Stylized world map */}
            <div className="relative mx-auto aspect-[16/10] w-full max-w-2xl">
              {/* dotted backdrop */}
              <div className="absolute inset-0 dot-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" />
              {/* equator line */}
              <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
              {/* orbit arcs */}
              <div className="absolute left-1/2 top-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/40 [mask-image:radial-gradient(ellipse_at_center,#000_40%,transparent_70%)]" />

              {CITY_PINS.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    type: 'spring',
                    stiffness: 220,
                    damping: 14,
                  }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: c.x, top: c.y }}
                >
                  <span className="relative flex size-3">
                    <span
                      className="absolute inline-flex size-full animate-ping rounded-full opacity-60 [animation-duration:2.5s]"
                      style={{ background: 'var(--brand-pink)' }}
                    />
                    <span className="relative inline-flex size-3 rounded-full bg-brand-gradient shadow-[0_0_12px_rgba(255,45,117,0.7)]" />
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap rounded-md bg-background/80 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    {c.name}
                  </span>
                </motion.div>
              ))}

              {/* central pulse */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gradient opacity-20 blur-2xl"
              />
            </div>
          </div>
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
          <div className="gradient-border relative overflow-hidden rounded-[2.5rem] p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-brand-gradient opacity-20 blur-3xl animate-pulse-glow" />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 size-64 rounded-full opacity-20 blur-3xl"
              style={{ background: 'var(--brand-amber)' }}
            />
            <div className="relative flex flex-col items-center gap-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <Sparkles
                  className="size-3.5"
                  style={{ color: 'var(--brand-pink)' }}
                />
                Not ready yet?
              </span>
              <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Prefer to <GradientText>explore</GradientText> first?
              </h2>
              <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
                Browse our services, peek at recent work, or learn who we are.
                Whenever you&apos;re ready, we&apos;ll be here.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button
                  onClick={() => setPage('services')}
                  className="group h-12 rounded-full bg-brand-gradient px-6 text-base text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.6)] hover:shadow-[0_14px_50px_-8px_rgba(255,45,117,0.85)]"
                >
                  <span className="flex items-center gap-2">
                    Explore services
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>
                <Button
                  onClick={() => setPage('home')}
                  variant="outline"
                  className="h-12 rounded-full px-6 text-base backdrop-blur"
                >
                  Back home
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================== PAGE ============================== */
export function ContactPage() {
  return (
    <div className="relative">
      <Hero />
      <ContactGrid />
      <ContactFaq />
      <GlobalPresence />
      <FinalCta />
    </div>
  )
}
