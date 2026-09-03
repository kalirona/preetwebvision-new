'use client'

import * as React from 'react'
import { Share2, Check, Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export function BlogShareButton({
  title,
  slug,
  className,
}: {
  title: string
  slug: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`

  const share = async () => {
    const shareData = { title, url }
    // Use native share sheet on capable devices (mobile / macOS Safari)
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData)
        return
      } catch {
        // user dismissed — fall through to clipboard copy
      }
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success('Article link copied to clipboard!')
      setTimeout(() => setCopied(false), 2200)
    } catch {
      toast.error('Could not copy link — please copy it manually.')
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/30 px-3.5 py-2 text-xs font-semibold text-foreground/80 transition-colors hover:border-border hover:text-foreground',
        className,
      )}
      aria-label={`Share article: ${title}`}
    >
      {copied ? <Check className="size-3.5 text-emerald-500" /> : <Share2 className="size-3.5" />}
      {copied ? 'Copied' : 'Share'}
      <Link2 className="size-3 -translate-x-0.5 text-muted-foreground/60" />
    </button>
  )
}
