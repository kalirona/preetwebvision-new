'use client'

import * as React from 'react'
import { GLOSSARY } from '@/lib/content-data'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type GlossaryMap = Map<string, string>

// Build a map of lowercase term -> definition for fast lookup
const glossaryMap: GlossaryMap = new Map(
  GLOSSARY.map((g) => [g.term.toLowerCase(), g.definition])
)

// Sort terms by length descending so longer phrases match first (e.g. "Core Web Vitals" before "CLS")
const sortedTerms = GLOSSARY.map((g) => g.term).sort((a, b) => b.length - a.length)

/**
 * Render text with glossary terms auto-wrapped in Popover-based tooltip spans.
 * Case-insensitive matching on whole words/phrases. Uses Radix Popover for
 * smart edge positioning (no viewport overflow).
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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span
          className="glossary-term inline cursor-help"
          tabIndex={0}
          role="button"
          aria-label={`Definition of ${term}`}
        >
          {term}
        </span>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        sideOffset={6}
        className="w-64 rounded-xl border border-border/70 bg-popover p-3 text-xs leading-relaxed text-popover-foreground shadow-xl"
      >
        <span className="mb-1 block font-display text-[11px] font-bold uppercase tracking-wide" style={{ color: 'var(--brand-pink)' }}>
          {term}
        </span>
        {definition}
      </PopoverContent>
    </Popover>
  )
}
