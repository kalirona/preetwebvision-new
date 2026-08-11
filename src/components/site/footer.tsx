'use client'

import * as React from 'react'
import { Mail, MapPin, Phone, ArrowUpRight, Instagram, Linkedin, Twitter, Github, Send, Loader2, Check, Cookie, Youtube } from 'lucide-react'
import { useNav } from '@/lib/nav-store'
import { NAV_ITEMS, SERVICES } from '@/lib/site-data'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CookiePreferencesModal } from '@/components/site/cookie-preferences'
import { toast } from 'sonner'

export function Footer() {
  const { setPage } = useNav()
  const [email, setEmail] = React.useState('')
  const [subscribing, setSubscribing] = React.useState(false)
  const [subscribed, setSubscribed] = React.useState(false)
  const [subCount, setSubCount] = React.useState<number | null>(null)
  const [cookiePrefsOpen, setCookiePrefsOpen] = React.useState(false)

  React.useEffect(() => {
    fetch('/api/newsletter')
      .then((r) => r.json())
      .then((d) => d?.ok && setSubCount(d.count))
      .catch(() => {})
  }, [])

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || subscribing) return
    setSubscribing(true)
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Request failed')
      setSubscribed(true)
      setSubCount((c) => (c != null ? c + 1 : 1))
      toast.success("You're on the list!", {
        description: 'Expect growth tips and studio updates in your inbox.',
      })
      setEmail('')
      setTimeout(() => setSubscribed(false), 3500)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not subscribe.')
    } finally {
      setSubscribing(false)
    }
  }

  return (
    <footer className="mt-auto relative overflow-hidden border-t border-border/60 bg-muted/20">
      {/* glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-brand-gradient opacity-20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* CTA strip */}
        <div className="grid gap-6 border-b border-border/60 py-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold sm:text-3xl">
              Ready to build something <span className="text-gradient-brand">unforgettable</span>?
            </h3>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Tell us about your vision. We&apos;ll reply within one business day with a plan to make it real.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button
              onClick={() => setPage('contact')}
              className="rounded-full bg-brand-gradient px-6 text-white shadow-[0_8px_30px_-8px_rgba(255,45,117,0.6)]"
            >
              Start a project
            </Button>
            <Button
              onClick={() => setPage('services')}
              variant="outline"
              className="rounded-full px-6"
            >
              Explore services
            </Button>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <button
              onClick={() => setPage('home')}
              className="flex items-center gap-2.5"
              aria-label="Preet Web Vision home"
            >
              <span className="grid size-9 place-items-center rounded-xl bg-brand-gradient font-display text-base font-bold text-white">
                P
              </span>
              <span className="font-display text-[15px] font-bold tracking-tight">
                Preet<span className="text-gradient-brand"> Web</span> Vision
              </span>
            </button>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A digital studio crafting stunning websites, AI automations, web apps, SEO and ecommerce
              experiences that help ambitious brands grow.
            </p>
            <form onSubmit={subscribe} className="mt-5 flex max-w-sm items-center gap-2">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email for growth tips"
                className="rounded-full bg-background/60"
                disabled={subscribing}
              />
              <Button
                type="submit"
                size="icon"
                disabled={subscribing || subscribed}
                className="rounded-full bg-brand-gradient text-white shrink-0 transition-transform hover:scale-105 disabled:opacity-70"
                aria-label="Subscribe"
              >
                {subscribed ? (
                  <Check className="size-4" />
                ) : subscribing ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </form>
            {subCount != null && (
              <p className="mt-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {subCount.toLocaleString()}
                </span>{' '}
                growth-minded folks already subscribed
              </p>
            )}
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Linkedin, label: 'LinkedIn', href: '#' },
                { Icon: Twitter, label: 'Twitter', href: '#' },
                { Icon: Instagram, label: 'Instagram', href: '#' },
                { Icon: Github, label: 'GitHub', href: '#' },
                { Icon: Youtube, label: 'YouTube — Free Learnings', href: 'https://youtube.com/@preet_tech_ideas' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-full border border-border/70 bg-background/40 text-muted-foreground transition-colors hover:text-foreground hover:border-border"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Navigate
            </h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => setPage(item.id)}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                    <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-60" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href={`/services/${s.slug}`}
                    className="text-left text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-pink" style={{ color: 'var(--brand-pink)' }} />
                <a href="mailto:hello@preetwebvision.com" className="hover:text-foreground">
                  hello@preetwebvision.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <Phone className="mt-0.5 size-4 shrink-0" style={{ color: 'var(--brand-orange)' }} />
                <a href="https://wa.me/639633112000" className="hover:text-foreground">
                  +63 963 311 2000 (WhatsApp)
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0" style={{ color: 'var(--brand-rose)' }} />
                <span>Remote-first · serving clients worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-border/60 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Preet Web Vision. Crafted with care.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-foreground">Privacy</a>
            <a href="/terms" className="hover:text-foreground">Terms</a>
            <button
              onClick={() => setCookiePrefsOpen(true)}
              className="flex items-center gap-1 transition-colors hover:text-foreground"
            >
              <Cookie className="size-3" />
              Cookie preferences
            </button>
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
      <CookiePreferencesModal open={cookiePrefsOpen} onClose={() => setCookiePrefsOpen(false)} />
    </footer>
  )
}
