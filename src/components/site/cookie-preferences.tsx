'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

const PREFS_KEY = 'pwv-cookie-consent-v1'

type Prefs = {
  essential: boolean // always true
  analytics: boolean
  marketing: boolean
}

function readPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return {
        essential: true,
        analytics: parsed.choice === 'accepted' || parsed.analytics === true,
        marketing: parsed.marketing === true,
      }
    }
  } catch {
    /* ignore */
  }
  return { essential: true, analytics: false, marketing: false }
}

function savePrefs(prefs: Prefs) {
  try {
    localStorage.setItem(
      PREFS_KEY,
      JSON.stringify({
        choice: prefs.analytics ? 'accepted' : 'rejected',
        analytics: prefs.analytics,
        marketing: prefs.marketing,
        ts: Date.now(),
      })
    )
  } catch {
    /* ignore */
  }
}

export function CookiePreferencesModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [prefs, setPrefs] = React.useState<Prefs>({ essential: true, analytics: false, marketing: false })

  React.useEffect(() => {
    if (open) {
      setPrefs(readPrefs())
      document.body.style.overflow = 'hidden'
      const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
      window.addEventListener('keydown', onKey)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', onKey)
      }
    }
  }, [open, onClose])

  const toggle = (key: keyof Prefs) => {
    if (key === 'essential') return // can't toggle essential
    setPrefs((p) => ({ ...p, [key]: !p[key] }))
  }

  const save = () => {
    savePrefs(prefs)
    onClose()
  }

  const acceptAll = () => {
    const all = { essential: true, analytics: true, marketing: true }
    setPrefs(all)
    savePrefs(all)
    onClose()
  }

  const rejectAll = () => {
    const none = { essential: true, analytics: false, marketing: false }
    setPrefs(none)
    savePrefs(none)
    onClose()
  }

  const categories: { key: keyof Prefs; label: string; description: string; required?: boolean }[] = [
    {
      key: 'essential',
      label: 'Essential',
      description: 'Required for the site to function (theme, cookie consent). Always on.',
      required: true,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      description: 'Anonymous page views and form submissions to improve our content.',
    },
    {
      key: 'marketing',
      label: 'Marketing',
      description: 'We don\'t currently use marketing cookies, but the toggle is here for future use.',
    },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] flex items-end justify-center p-0 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 40, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-border/60 bg-background shadow-2xl sm:rounded-3xl"
          >
            {/* Header */}
            <div className="relative shrink-0 overflow-hidden border-b border-border/60">
              <div className="absolute inset-0 bg-brand-gradient opacity-10" />
              <div className="absolute inset-0 grid-bg opacity-20" />
              <div className="relative flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-brand-gradient text-white shadow-lg">
                    <Cookie className="size-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-xl font-bold tracking-tight">
                      Cookie <span className="text-gradient-brand">Preferences</span>
                    </h2>
                    <p className="text-xs text-muted-foreground">Control what we track</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close preferences"
                  className="grid size-9 place-items-center rounded-full border border-border/70 bg-muted/30 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <p className="mb-5 text-sm text-muted-foreground">
                We believe in minimal, transparent tracking. Toggle the categories below — you can change these anytime.
              </p>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <div
                    key={cat.key}
                    className="flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-display text-sm font-bold">{cat.label}</p>
                        {cat.required && (
                          <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{cat.description}</p>
                    </div>
                    <button
                      role="switch"
                      aria-checked={prefs[cat.key]}
                      aria-label={`Toggle ${cat.label}`}
                      disabled={cat.required}
                      onClick={() => toggle(cat.key)}
                      data-on={prefs[cat.key]}
                      className="toggle-switch shrink-0 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="shrink-0 border-t border-border/60 bg-muted/20 p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <Button variant="ghost" onClick={rejectAll} className="rounded-full text-muted-foreground hover:text-foreground">
                  Reject all
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={save} className="rounded-full">
                    <Check className="size-4" />
                    Save preferences
                  </Button>
                  <Button onClick={acceptAll} className="rounded-full bg-brand-gradient text-white">
                    Accept all
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
