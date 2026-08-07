'use client'

import * as React from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowUp, Cookie, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

/* ============ Scroll Progress Bar (top of viewport) ============ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scroll-progress"
      aria-hidden
    />
  )
}

/* ============ Back to top button ============ */
export function BackToTop() {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 left-5 z-40 grid size-11 place-items-center rounded-full glass-strong text-foreground shadow-lg transition-colors hover:text-[var(--brand-pink)]"
          aria-label="Back to top"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ============ Cookie consent banner ============ */
const CONSENT_KEY = 'pwv-cookie-consent-v1'

export function CookieConsent() {
  const [visible, setVisible] = React.useState(false)
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (!stored) {
        const t = setTimeout(() => setVisible(true), 1400)
        return () => clearTimeout(t)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const decide = (choice: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice, ts: Date.now() }))
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 240, damping: 26 }}
          className="fixed inset-x-3 bottom-3 z-[55] mx-auto max-w-2xl"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="glass-deep noise-overlay overflow-hidden rounded-2xl border border-border/60 p-4 sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-1 items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-gradient-soft">
                  <Cookie className="size-5" style={{ color: 'var(--brand-pink)' }} />
                </span>
                <div>
                  <p className="text-sm font-semibold leading-snug">
                    We use cookies to enhance your experience.
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    We use analytics to improve our site. You control your preferences. Read our{' '}
                    <a href="#" className="link-underline font-medium text-foreground">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => decide('rejected')}
                  className="rounded-full text-muted-foreground hover:text-foreground"
                >
                  Decline
                </Button>
                <Button
                  size="sm"
                  onClick={() => decide('accepted')}
                  className="rounded-full bg-brand-gradient px-4 text-white"
                >
                  <Check className="size-3.5" />
                  Accept
                </Button>
                <button
                  onClick={() => decide('rejected')}
                  className="grid size-8 place-items-center rounded-full text-muted-foreground hover:text-foreground sm:hidden"
                  aria-label="Close"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
