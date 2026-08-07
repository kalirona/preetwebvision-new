'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GLOSSARY } from '@/lib/content-data'
import { cn } from '@/lib/utils'

type GlossaryMap = Map<string, string>

// Build a map of lowercase term -> definition for fast lookup
const glossaryMap: GlossaryMap = new Map(
  GLOSSARY.map((g) => [g.term.toLowerCase(), g.definition])
)

// Sort terms by length descending so longer phrases match first (e.g. "Core Web Vitals" before "CLS")
const sortedTerms = GLOSSARY.map((g) => g.term).sort((a, b) => b.length - a.length)

/**
 * Render text with glossary terms auto-wrapped in tooltip spans.
 * Case-insensitive matching on whole words/phrases.
 */
export function renderWithGlossary(text: string): React.ReactNode[] {
  // Build a regex that matches any glossary term (case-insensitive, word-boundary)
  const escaped = sortedTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const re = new RegExp(`\\b(${escaped.join('|')})\\b`, 'gi')

  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = re.exec(text)) !== null) {
    const matchedText = match[0]
    const start = match.index

    // Push preceding text
    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start))
    }

    // Push glossary term
    const definition = glossaryMap.get(matchedText.toLowerCase())
    if (definition) {
      parts.push(<GlossaryTerm key={key++} term={matchedText} definition={definition} />)
    } else {
      parts.push(matchedText)
    }
    lastIndex = start + matchedText.length
  }

  // Push remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts
}

function GlossaryTerm({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <span
      className="glossary-term inline"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={(e) => {
        e.stopPropagation()
        setOpen((o) => !o)
      }}
      tabIndex={0}
      role="button"
      aria-describedby={open ? id : undefined}
      aria-expanded={open}
    >
      {term}
      <AnimatePresence>
        {open && (
          <motion.span
            id={id}
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-50 mt-2 w-64 -translate-x-1/2 rounded-xl border border-border/70 bg-popover p-3 text-xs leading-relaxed text-popover-foreground shadow-xl"
          >
            <span className="mb-1 block font-display text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--brand-pink)' }}>
              {term}
            </span>
            {definition}
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-l border-t border-border/70 bg-popover" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
