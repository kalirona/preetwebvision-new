'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, Tag } from 'lucide-react'
import { cn } from '@/lib/utils'

export type AffiliateBoxItem = {
  id: string
  title: string
  description?: string | null
  price?: string | null
  imageUrl?: string | null
  affiliateUrl: string
  category?: string | null
  featured?: boolean
}

function FeaturedBadge() {
  return (
    <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-brand-gradient px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-md">
      <Star className="size-3" />
      Featured
    </span>
  )
}

export function AffiliateBox({ item, index = 0 }: { item: AffiliateBoxItem; index?: number }) {
  return (
    <motion.a
      href={item.affiliateUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative block h-full overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl"
    >
      {/* Image / gradient area */}
      <div className="relative h-40 w-full overflow-hidden rounded-t-3xl bg-muted">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-brand-gradient/20 to-transparent">
            <Tag className="size-10 text-muted-foreground/50" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        {item.featured && <FeaturedBadge />}
        {item.category && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur">
            {item.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-base font-bold tracking-tight">{item.title}</h3>
        {item.price && (
          <p className="mt-1 font-display text-xl font-bold text-gradient-brand">{item.price}</p>
        )}
        {item.description && (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}

        {/* CTA */}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-foreground transition-colors group-hover:text-[var(--brand-pink)]">
          Check it out
          <ExternalLink className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.a>
  )
}