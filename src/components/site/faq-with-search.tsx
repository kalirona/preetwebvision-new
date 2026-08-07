'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, HelpCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

type Faq = { question: string; answer: string }

export function FaqWithSearch({
  faqs,
  eyebrow,
  title,
  description,
}: {
  faqs: Faq[]
  eyebrow?: string
  title?: React.ReactNode
  description?: string
}) {
  const [query, setQuery] = React.useState('')
  const [activeItem, setActiveItem] = React.useState<string>('')

  const filtered = React.useMemo(() => {
    if (!query.trim()) return faqs
    const q = query.toLowerCase()
    return faqs.filter(
      (f) =>
        f.question.toLowerCase().includes(q) ||
        f.answer.toLowerCase().includes(q)
    )
  }, [query, faqs])

  // Highlight matching text
  const highlight = (text: string) => {
    if (!query.trim()) return text
    const q = query.trim()
    const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <mark key={i} className="rounded bg-brand-gradient-soft px-0.5 text-foreground">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <div>
      {/* Search bar */}
      <div className="mx-auto mb-8 max-w-md">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveItem('')
            }}
            placeholder="Search questions…"
            className="h-12 w-full rounded-full border border-border/70 bg-muted/30 pl-11 pr-10 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus-visible:border-border focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Search FAQ"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3.5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        {query && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {filtered.length > 0
              ? `${filtered.length} ${filtered.length === 1 ? 'match' : 'matches'} for "${query}"`
              : `No matches for "${query}"`}
          </p>
        )}
      </div>

      {/* Accordion */}
      <AnimatePresence mode="wait">
        {filtered.length > 0 ? (
          <motion.div
            key={query}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Accordion
              type="single"
              collapsible
              value={activeItem}
              onValueChange={setActiveItem}
              className="space-y-3"
            >
              {filtered.map((f, i) => (
                <AccordionItem
                  key={`${query}-${i}`}
                  value={`item-${i}`}
                  className="overflow-hidden rounded-2xl border border-border/60 bg-card px-5 data-[state=open]:border-border"
                >
                  <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
                    {highlight(f.question)}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {highlight(f.answer)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-12 text-center"
          >
            <span className="grid size-14 place-items-center rounded-full bg-muted/40">
              <HelpCircle className="size-6 text-muted-foreground" />
            </span>
            <p className="mt-4 font-display text-lg font-bold">No questions found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search, or{' '}
              <button
                onClick={() => setQuery('')}
                className="font-semibold text-foreground underline-offset-4 hover:underline"
              >
                clear the search
              </button>
              .
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
