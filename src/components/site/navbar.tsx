'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, Sun, Moon, ArrowRight, ChevronDown } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from '@/components/ui/sheet'
import { useNav } from '@/lib/nav-store'
import { NAV_ITEMS, SERVICES } from '@/lib/site-data'
import { cn } from '@/lib/utils'

function BrandMark({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2.5 outline-none"
      aria-label="Preet Web Vision — home"
    >
      <span className="relative grid size-9 place-items-center overflow-hidden rounded-xl bg-brand-gradient shadow-[0_6px_24px_-6px_rgba(255,45,117,0.6)] transition-transform group-hover:scale-105">
        <span className="absolute inset-0 animate-shimmer opacity-60" />
        <span className="font-display text-base font-bold text-white">P</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[15px] font-bold tracking-tight">
          Preet<span className="text-gradient-brand"> Web</span> Vision
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Digital Studio
        </span>
      </span>
    </button>
  )
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  const isDark = mounted && theme === 'dark'
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="group relative grid size-9 place-items-center overflow-hidden rounded-full border border-border/70 bg-muted/30 text-foreground transition-colors hover:bg-muted/60"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <motion.span
        key={isDark ? 'sun' : 'moon'}
        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="grid place-items-center"
      >
        {isDark ? (
          <Sun className="size-4 group-hover:rotate-45 transition-transform duration-300" style={{ color: 'var(--brand-amber)' }} />
        ) : (
          <Moon className="size-4 group-hover:-rotate-12 transition-transform duration-300" style={{ color: 'var(--brand-pink)' }} />
        )}
      </motion.span>
    </button>
  )
}

/* ============ Mega Menu ============ */
function MegaMenu({ active }: { active: boolean }) {
  const [open, setOpen] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>()
  const { setPage } = useNav()

  const onEnter = () => {
    clearTimeout(timeoutRef.current)
    setOpen(true)
  }
  const onLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200)
  }

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        onClick={() => setPage('services')}
        className={cn(
          'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
          active || open
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Services
        <ChevronDown className={cn('size-3.5 transition-transform', open && 'rotate-180')} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-full z-50 mt-2 w-[34rem] -translate-x-1/2"
          >
            <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/95 shadow-2xl backdrop-blur-xl">
              {/* Header strip */}
              <div className="flex items-center justify-between border-b border-border/60 bg-brand-gradient-soft px-5 py-3">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Our Services
                </span>
                <button
                  onClick={() => { setOpen(false); setPage('services') }}
                  className="flex items-center gap-1 text-xs font-semibold text-foreground transition-colors hover:text-[var(--brand-pink)]"
                >
                  View all
                  <ArrowRight className="size-3" />
                </button>
              </div>
              {/* Services grid */}
              <div className="grid grid-cols-1 gap-1 p-3">
                {SERVICES.map((service, i) => {
                  const Icon = service.icon
                  return (
                    <a
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-muted/60"
                    >
                      <span className={cn(
                        'grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md transition-transform group-hover:scale-110',
                        service.accent
                      )}>
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-display text-sm font-bold tracking-tight">{service.title}</p>
                          <span className="font-mono text-[10px] text-muted-foreground/60">0{i + 1}</span>
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground line-clamp-1">
                          {service.tagline}
                        </p>
                      </div>
                      <ArrowRight className="size-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60" />
                    </a>
                  )
                })}
              </div>
              {/* Footer CTA */}
              <div className="border-t border-border/60 bg-muted/30 px-5 py-3">
                <button
                  onClick={() => { setOpen(false); setPage('contact') }}
                  className="flex w-full items-center justify-between text-sm font-semibold"
                >
                  <span>Not sure which service you need?</span>
                  <span className="flex items-center gap-1 text-[var(--brand-pink)]">
                    Get a free consultation
                    <ArrowRight className="size-3.5" />
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Navbar() {
  const { page, setPage } = useNav()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (id: (typeof NAV_ITEMS)[number]['id']) => {
    setPage(id)
    setOpen(false)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'py-2.5' : 'py-4'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          className={cn(
            'flex items-center justify-between gap-4 rounded-2xl px-3 sm:px-4 py-2.5 transition-all duration-300',
            scrolled
              ? 'nav-scrolled'
              : 'border border-transparent'
          )}
        >
          <BrandMark onClick={() => go('home')} />

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const active = page === item.id
              // Render mega menu for Services
              if (item.id === 'services') {
                return <MegaMenu key={item.id} active={active} />
              }
              return (
                <button
                  key={item.id}
                  onClick={() => go(item.id)}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-muted/70 border border-border/60"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>
            <Button
              onClick={() => go('contact')}
              className="hidden sm:inline-flex group relative overflow-hidden rounded-full bg-brand-gradient px-5 text-white shadow-[0_8px_30px_-8px_rgba(255,45,117,0.6)] hover:shadow-[0_10px_40px_-8px_rgba(255,45,117,0.8)]"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                Let&apos;s talk
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="absolute inset-0 animate-shimmer opacity-40" />
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="lg:hidden grid size-9 place-items-center rounded-full border border-border/70 bg-muted/30"
                  aria-label="Open menu"
                >
                  <Menu className="size-4" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[86vw] max-w-sm border-border/60 bg-background/95 p-0"
              >
                <SheetTitle className="sr-only">Navigation menu</SheetTitle>
                <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
                  <BrandMark onClick={() => go('home')} />
                  <SheetClose asChild>
                    <button
                      className="grid size-9 place-items-center rounded-full border border-border/70"
                      aria-label="Close menu"
                    >
                      <X className="size-4" />
                    </button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-1 p-4">
                  {NAV_ITEMS.map((item, i) => {
                    const active = page === item.id
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * i }}
                      >
                        <button
                          onClick={() => go(item.id)}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-base font-medium transition-colors',
                            active
                              ? 'bg-muted/70 text-foreground'
                              : 'text-muted-foreground hover:bg-muted/40 hover:text-foreground'
                          )}
                        >
                          <span className="flex items-center gap-3">
                            <span className="font-mono text-xs text-muted-foreground/70">
                              0{i + 1}
                            </span>
                            {item.label}
                          </span>
                          <ArrowRight className="size-4 opacity-50" />
                        </button>
                        {/* Show service links under Services on mobile */}
                        {item.id === 'services' && (
                          <div className="ml-4 mt-1 space-y-0.5 border-l border-border/40 pl-4">
                            {SERVICES.map((s) => {
                              const Icon = s.icon
                              return (
                                <a
                                  key={s.id}
                                  href={`/services/${s.slug}`}
                                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
                                >
                                  <Icon className="size-4 shrink-0" style={{ color: 'var(--brand-pink)' }} />
                                  {s.title}
                                </a>
                              )
                            })}
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
                </nav>
                <div className="mt-auto space-y-3 border-t border-border/60 p-5">
                  <Button
                    onClick={() => go('contact')}
                    className="w-full rounded-xl bg-brand-gradient text-white"
                  >
                    <Sparkles className="size-4" />
                    Start a project
                  </Button>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
