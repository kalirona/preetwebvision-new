'use client'

import * as React from 'react'
import { motion, useInView, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  once = true,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: React.ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center mx-auto max-w-2xl' : 'items-start text-left',
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-brand-gradient" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl leading-[1.08]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ---------- Gradient text wrapper ---------- */
export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <span className={cn('text-gradient-brand', className)}>{children}</span>
}

/* ---------- Animated counter ---------- */
export function Counter({
  value,
  suffix = '',
  duration = 2,
}: {
  value: number
  suffix?: string
  duration?: number
}) {
  const ref = React.useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

/* ---------- Marquee ---------- */
export function Marquee({
  items,
  className,
  reverse = false,
}: {
  items: string[]
  className?: string
  reverse?: boolean
}) {
  const doubled = [...items, ...items]
  return (
    <div className={cn('mask-fade-edges overflow-hidden', className)}>
      <div
        className={cn(
          'flex w-max gap-12',
          reverse ? 'animate-marquee-slow [animation-direction:reverse]' : 'animate-marquee'
        )}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-xl sm:text-2xl font-display font-semibold text-muted-foreground/60 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
