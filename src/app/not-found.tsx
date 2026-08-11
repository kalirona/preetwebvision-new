'use client'

import { motion } from 'framer-motion'
import { Home, Search, ArrowRight, Bot } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const goHome = () => {
    window.location.href = '/'
  }
  const goHomeAndSearch = () => {
    // Navigate to home route, then open command palette after mount
    sessionStorage.setItem('pwv-open-command-palette', '1')
    window.location.href = '/'
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-brand-gradient opacity-20 blur-[100px] animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full opacity-20 blur-[110px] animate-float"
          style={{ background: 'var(--brand-rose)' }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative text-center"
      >
        {/* Big 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 16 }}
          className="relative mx-auto mb-6 w-fit"
        >
          <h1 className="font-display text-[8rem] font-bold leading-none tracking-tighter sm:text-[12rem]">
            <span className="text-gradient-brand text-glow-brand animate-gradient-pan bg-[length:220%_220%]">
              404
            </span>
          </h1>
          <span className="absolute -right-4 -top-2 text-4xl animate-float">🔍</span>
        </motion.div>

        <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur">
          <span className="size-1.5 rounded-full bg-brand-pink" />
          Lost in the digital void
        </span>

        <h2 className="mt-5 font-display text-2xl font-bold tracking-tight sm:text-3xl">
          This page took a <span className="text-gradient-brand">detour</span>
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist — or maybe it moved. Let&apos;s get you back on track.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            onClick={goHome}
            className="group relative h-12 overflow-hidden rounded-full bg-brand-gradient px-6 text-base text-white shadow-[0_10px_40px_-8px_rgba(255,45,117,0.6)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Home className="size-4" />
              Back to home
            </span>
            <span className="absolute inset-0 animate-shimmer opacity-40" />
          </Button>
          <Button
            onClick={goHomeAndSearch}
            variant="outline"
            className="h-12 rounded-full px-6 text-base"
          >
            <Search className="size-4" />
            Search the site
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {[
            { label: 'Services', hash: '#services' },
            { label: 'Work', hash: '#portfolio' },
            { label: 'Tools', hash: '#pricing' },
            { label: 'Blog', hash: '#blog' },
            { label: 'Contact', hash: '#contact' },
          ].map((link) => (
            <button
              key={link.hash}
              onClick={() => { window.location.href = `/${link.hash}` }}
              className="group inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <ArrowRight className="size-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-60" />
            </button>
          ))}
        </div>

        {/* AI assistant hint */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Bot className="size-3.5" style={{ color: 'var(--brand-pink)' }} />
          Tip: press
          <kbd className="kbd">⌘</kbd>
          <kbd className="kbd">K</kbd>
          anytime to open the command palette
        </div>
      </motion.div>
    </div>
  )
}
