'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Home,
  Palette,
  Briefcase,
  Users,
  DollarSign,
  BookOpen,
  Mail,
  Bot,
  Sun,
  Moon,
  ArrowRight,
  CornerDownLeft,
  type LucideIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { useNav } from '@/lib/nav-store'
import { NAV_ITEMS, type PageId } from '@/lib/site-data'
import { BLOG_POSTS } from '@/lib/content-data'
import { cn } from '@/lib/utils'

type CmdItem = {
  id: string
  label: string
  hint?: string
  icon: LucideIcon
  accent: string
  group: 'Navigate' | 'Read' | 'Actions'
  action: () => void
  keywords?: string
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [selected, setSelected] = React.useState(0)
  const { setPage } = useNav()
  const { theme, setTheme } = useTheme()
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  // Global Cmd+K / Ctrl+K handler (intercepts before the AI assistant)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        e.stopPropagation()
        setOpen((o) => !o)
      }
    }
    // Listen for custom event (from 404 page "Search the site" button)
    const onOpen = () => setOpen(true)
    // Capture phase to intercept before the AI assistant's listener
    window.addEventListener('keydown', onKey, true)
    window.addEventListener('open-command-palette', onOpen)
    return () => {
      window.removeEventListener('keydown', onKey, true)
      window.removeEventListener('open-command-palette', onOpen)
    }
  }, [])

  // Focus input when opened + reset when closed
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setQuery('')
      setSelected(0)
    }
  }, [open])

  // Auto-open if redirected from 404 page (via sessionStorage flag)
  React.useEffect(() => {
    try {
      if (sessionStorage.getItem('pwv-open-command-palette') === '1') {
        sessionStorage.removeItem('pwv-open-command-palette')
        setTimeout(() => setOpen(true), 600)
      }
    } catch {
      /* ignore */
    }
  }, [])

  // Build command items
  const pageIcons: Record<PageId, LucideIcon> = {
    home: Home,
    services: Palette,
    portfolio: Briefcase,
    about: Users,
    pricing: DollarSign,
    blog: BookOpen,
    contact: Mail,
  }

  const items = React.useMemo<CmdItem[]>(() => {
    const navItems: CmdItem[] = NAV_ITEMS.map((item) => ({
      id: `nav-${item.id}`,
      label: item.label,
      hint: 'Go to page',
      icon: pageIcons[item.id],
      accent: 'text-muted-foreground',
      group: 'Navigate',
      action: () => {
        setPage(item.id)
        setOpen(false)
      },
      keywords: `page navigate ${item.label.toLowerCase()}`,
    }))

    const blogItems: CmdItem[] = BLOG_POSTS.map((post) => ({
      id: `blog-${post.id}`,
      label: post.title,
      hint: `${post.category} · ${post.readingMinutes} min`,
      icon: BookOpen,
      accent: 'text-muted-foreground',
      group: 'Read',
      action: () => {
        setPage('blog')
        setOpen(false)
        // Defer to let the page mount, then the blog page's own state handles article opening
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('open-blog-post', { detail: post.slug }))
        }, 400)
      },
      keywords: `blog article read ${post.title.toLowerCase()} ${post.category.toLowerCase()} ${post.author.toLowerCase()}`,
    }))

    const actionItems: CmdItem[] = [
      {
        id: 'action-chat',
        label: 'Open AI Assistant',
        hint: 'Chat with Vision AI',
        icon: Bot,
        accent: 'text-muted-foreground',
        group: 'Actions',
        action: () => {
          setOpen(false)
          // Dispatch a custom event the AI assistant listens for
          setTimeout(() => {
            window.dispatchEvent(new CustomEvent('open-ai-assistant'))
          }, 100)
        },
        keywords: 'ai chat bot assistant vision help',
      },
      {
        id: 'action-theme',
        label: theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        hint: 'Toggle theme',
        icon: theme === 'dark' ? Sun : Moon,
        accent: 'text-muted-foreground',
        group: 'Actions',
        action: () => {
          setTheme(theme === 'dark' ? 'light' : 'dark')
          setOpen(false)
        },
        keywords: 'theme dark light mode toggle sun moon',
      },
    ]

    return [...navItems, ...blogItems, ...actionItems]
  }, [setPage, theme, setTheme])

  // Filter
  const filtered = React.useMemo(() => {
    if (!query.trim()) return items
    const q = query.toLowerCase()
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.keywords?.toLowerCase().includes(q) ||
        item.hint?.toLowerCase().includes(q)
    )
  }, [items, query])

  // Group filtered items
  const grouped = React.useMemo(() => {
    const groups: Record<string, CmdItem[]> = {}
    for (const item of filtered) {
      if (!groups[item.group]) groups[item.group] = []
      groups[item.group].push(item)
    }
    return groups
  }, [filtered])

  // Flatten for keyboard nav
  const flatFiltered = filtered

  // Reset selected when query changes
  React.useEffect(() => {
    setSelected(0)
  }, [query])

  // Keyboard navigation within palette
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, flatFiltered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      flatFiltered[selected]?.action()
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  // Scroll selected into view
  React.useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${selected}"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  let runningIndex = -1

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-start justify-center p-4 pt-[12vh] sm:pt-[15vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div className="cmdk-overlay absolute inset-0" onClick={() => setOpen(false)} aria-hidden />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            className="cmdk-panel relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3.5">
              <Search className="size-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search pages, articles, or actions…"
                className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
                aria-label="Search commands"
              />
              <kbd className="kbd shrink-0">ESC</kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="flex-1 overflow-y-auto p-2">
              {flatFiltered.length === 0 ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <Search className="size-8 text-muted-foreground/40" />
                  <p className="mt-3 text-sm font-medium">No results for &ldquo;{query}&rdquo;</p>
                  <p className="mt-1 text-xs text-muted-foreground">Try a different search term.</p>
                </div>
              ) : (
                Object.entries(grouped).map(([group, groupItems]) => (
                  <div key={group} className="mb-1">
                    <p className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      runningIndex++
                      const idx = runningIndex
                      const isSelected = idx === selected
                      const Icon = item.icon
                      return (
                        <button
                          key={item.id}
                          data-index={idx}
                          data-selected={isSelected}
                          onClick={item.action}
                          onMouseEnter={() => setSelected(idx)}
                          className={cn(
                            'cmdk-item flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left'
                          )}
                        >
                          <span className="cmdk-item-icon grid size-8 shrink-0 place-items-center rounded-lg bg-muted/50 text-muted-foreground">
                            <Icon className="size-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">{item.label}</span>
                            {item.hint && (
                              <span className="block truncate text-xs text-muted-foreground">{item.hint}</span>
                            )}
                          </span>
                          {isSelected && (
                            <CornerDownLeft className="size-3.5 shrink-0 text-muted-foreground" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-border/60 px-4 py-2.5 text-[11px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="kbd">↑</kbd>
                  <kbd className="kbd">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="kbd">↵</kbd>
                  select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Preet Web Vision
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
