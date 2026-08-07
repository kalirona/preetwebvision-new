'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Check, Sparkles } from 'lucide-react'

type Notification = {
  id: string
  name: string
  action: string
  location: string
  time: string
  emoji: string
  accent: string
}

const SAMPLES: Omit<Notification, 'id' | 'time'>[] = [
  { name: 'Aarav', action: 'started a website project', location: 'Mumbai, IN', emoji: '🌐', accent: 'from-orange-500 to-pink-500' },
  { name: 'Sofia', action: 'booked an AI automation call', location: 'Milan, IT', emoji: '🤖', accent: 'from-fuchsia-500 to-rose-500' },
  { name: 'Marcus', action: 'subscribed to the newsletter', location: 'Berlin, DE', emoji: '✉️', accent: 'from-amber-500 to-orange-500' },
  { name: 'Priya', action: 'requested an SEO audit', location: 'London, UK', emoji: '🔍', accent: 'from-emerald-500 to-teal-500' },
  { name: 'David', action: 'started a web app build', location: 'Toronto, CA', emoji: '💻', accent: 'from-rose-500 to-pink-500' },
  { name: 'Elena', action: 'downloaded the pricing guide', location: 'Madrid, ES', emoji: '📄', accent: 'from-fuchsia-500 to-rose-500' },
  { name: 'James', action: 'launched an ecommerce store', location: 'Austin, US', emoji: '🛍️', accent: 'from-orange-500 to-pink-500' },
  { name: 'Yuki', action: 'joined the ROI calculator', location: 'Tokyo, JP', emoji: '📊', accent: 'from-amber-500 to-orange-500' },
  { name: 'Amara', action: 'booked a discovery call', location: 'Lagos, NG', emoji: '📅', accent: 'from-emerald-500 to-teal-500' },
  { name: 'Liam', action: 'started a project brief', location: 'Sydney, AU', emoji: '🚀', accent: 'from-rose-500 to-pink-500' },
]

const STORAGE_KEY = 'pwv-social-proof-dismissed'

function timeAgo(minutes: number): string {
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  return `${Math.floor(hours / 24)}d ago`
}

export function SocialProofNotifications() {
  const [current, setCurrent] = React.useState<Notification | null>(null)
  const [dismissed, setDismissed] = React.useState(false)
  const [shown, setShown] = React.useState<Notification[]>([])

  // Check if user previously dismissed
  React.useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') setDismissed(true)
    } catch {
      /* ignore */
    }
  }, [])

  // Rotate notifications
  React.useEffect(() => {
    if (dismissed) return
    let timeout: ReturnType<typeof setTimeout>
    let hideTimeout: ReturnType<typeof setTimeout>

    const showNext = () => {
      const available = SAMPLES.filter((s) => !shown.some((sh) => sh.name === s.name))
      const pool = available.length > 0 ? available : SAMPLES
      const pick = pool[Math.floor(Math.random() * pool.length)]
      const notif: Notification = {
        ...pick,
        id: `${Date.now()}`,
        time: timeAgo(Math.floor(Math.random() * 45) + 1),
      }
      setCurrent(notif)
      setShown((prev) => [...prev.slice(-4), notif])

      // Auto-hide after 5s
      hideTimeout = setTimeout(() => setCurrent(null), 5000)
      // Schedule next show after 12-22s
      timeout = setTimeout(showNext, 12000 + Math.random() * 10000)
    }

    // First notification after 6s
    const initial = setTimeout(showNext, 6000)
    return () => {
      clearTimeout(initial)
      clearTimeout(timeout)
      clearTimeout(hideTimeout)
    }
  }, [dismissed, shown])

  const dismiss = () => {
    setDismissed(true)
    setCurrent(null)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  if (dismissed) return null

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 hidden sm:block">
      <AnimatePresence>
        {current && (
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: -40, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -40, y: 10 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="pointer-events-auto notif-card relative w-72 overflow-hidden rounded-2xl p-3.5"
            role="status"
            aria-live="polite"
          >
            <button
              onClick={dismiss}
              aria-label="Dismiss notifications"
              className="absolute right-2 top-2 grid size-6 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-3" />
            </button>
            <div className="flex items-start gap-3 pr-5">
              <span className={`grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${current.accent} text-base shadow-md`}>
                {current.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-snug">
                  <span className="font-bold">{current.name}</span>{' '}
                  <span className="text-muted-foreground">{current.action}</span>
                </p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <MapPin className="size-2.5" />
                    {current.location}
                  </span>
                  <span>·</span>
                  <span>{current.time}</span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex items-center gap-1 border-t border-border/40 pt-2 text-[10px] text-muted-foreground">
              <Check className="size-2.5 text-emerald-500" />
              Verified by Preet Web Vision
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
