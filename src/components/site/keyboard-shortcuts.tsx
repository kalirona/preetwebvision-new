'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNav } from '@/lib/nav-store'
import type { PageId } from '@/lib/site-data'
import { NAV_ITEMS } from '@/lib/site-data'

// G + key navigation shortcuts
const G_SHORTCUTS: Record<string, PageId> = {
  h: 'home',
  s: 'services',
  w: 'portfolio',
  a: 'about',
  p: 'pricing',
  b: 'blog',
  c: 'contact',
}

export function KeyboardShortcuts() {
  const { setPage } = useNav()
  const [showHelp, setShowHelp] = React.useState(false)
  const [gPressed, setGPressed] = React.useState(false)
  const gTimer = React.useRef<ReturnType<typeof setTimeout>>()

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const isTyping =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable ||
          target.getAttribute('role') === 'combobox')

      // ? to show help overlay (Shift+/ = ?)
      if (e.key === '?' && !isTyping) {
        e.preventDefault()
        setShowHelp((s) => !s)
        return
      }
      if (e.key === 'Escape' && showHelp) {
        setShowHelp(false)
        return
      }

      if (isTyping) return

      // G + key navigation
      const key = e.key.toLowerCase()
      if (key === 'g' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setGPressed(true)
        // Reset after 1.5s if no second key
        clearTimeout(gTimer.current)
        gTimer.current = setTimeout(() => setGPressed(false), 1500)
        return
      }

      if (gPressed && G_SHORTCUTS[key]) {
        e.preventDefault()
        setPage(G_SHORTCUTS[key])
        setGPressed(false)
        clearTimeout(gTimer.current)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      clearTimeout(gTimer.current)
    }
  }, [setPage, gPressed, showHelp])

  return (
    <>
      {/* G-key indicator */}
      <AnimatePresence>
        {gPressed && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            className="fixed bottom-5 left-1/2 z-[65] -translate-x-1/2"
          >
            <div className="flex items-center gap-2 rounded-full border border-border/70 bg-card/90 px-4 py-2 text-sm shadow-xl backdrop-blur">
              <kbd className="kbd">G</kbd>
              <span className="text-muted-foreground">+</span>
              <kbd className="kbd">?</kbd>
              <span className="text-muted-foreground">then</span>
              <span className="flex gap-1">
                {Object.entries(G_SHORTCUTS).map(([k, page]) => (
                  <kbd key={k} className="kbd">{k}</kbd>
                ))}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help overlay */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Keyboard shortcuts"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowHelp(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-2xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight">
                    Keyboard <span className="text-gradient-brand">Shortcuts</span>
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Navigate faster without leaving your keyboard.
                  </p>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  aria-label="Close shortcuts"
                  className="grid size-8 place-items-center rounded-full border border-border/70 bg-muted/30 text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-5">
                {/* Navigation */}
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Navigation
                  </p>
                  <div className="grid gap-2">
                    {Object.entries(G_SHORTCUTS).map(([key, page]) => {
                      const label = NAV_ITEMS.find((n) => n.id === page)?.label ?? page
                      return (
                        <div key={key} className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted/40">
                          <span className="text-sm">{label}</span>
                          <span className="flex items-center gap-1">
                            <kbd className="kbd">G</kbd>
                            <span className="text-xs text-muted-foreground">then</span>
                            <kbd className="kbd">{key.toUpperCase()}</kbd>
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Actions
                  </p>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted/40">
                      <span className="text-sm">Open command palette</span>
                      <span className="flex items-center gap-1">
                        <kbd className="kbd">⌘</kbd>
                        <kbd className="kbd">K</kbd>
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted/40">
                      <span className="text-sm">Show this help</span>
                      <kbd className="kbd">?</kbd>
                    </div>
                    <div className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted/40">
                      <span className="text-sm">Close dialog / panel</span>
                      <kbd className="kbd">Esc</kbd>
                    </div>
                  </div>
                </div>
              </div>

              <p className="mt-5 text-center text-[11px] text-muted-foreground">
                Shortcuts are disabled while typing in inputs.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
