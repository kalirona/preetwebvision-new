'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  ChevronRight,
  Sparkles,
  BookOpen,
  TrendingUp,
  Mail,
  Search,
  X,
  CheckCircle2,
  Loader2,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import {
  Reveal,
  SectionHeading,
  StaggerGroup,
  staggerItem,
  GradientText,
} from '@/components/site/primitives'
import { AmbientBackground } from '@/components/site/ambient-background'
import { LazyImage } from '@/components/site/lazy-image'
import { renderWithGlossary } from '@/components/site/glossary'
import { useNav } from '@/lib/nav-store'
import { BLOG_POSTS, type BlogPost } from '@/lib/content-data'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const CATEGORIES = ['All', 'Web Design', 'AI', 'SEO', 'Ecommerce', 'Growth'] as const
type Category = (typeof CATEGORIES)[number]

type AuthorOption = { name: string; initials: string; accent: string }

// Unique authors derived from BLOG_POSTS (first occurrence wins for initials/accent).
const AUTHORS: AuthorOption[] = (() => {
  const seen = new Set<string>()
  const out: AuthorOption[] = []
  for (const p of BLOG_POSTS) {
    if (seen.has(p.author)) continue
    seen.add(p.author)
    out.push({ name: p.author, initials: p.authorInitials, accent: p.authorAccent })
  }
  return out
})()

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

// Lowercased haystack of everything searchable on a post (title + excerpt + content).
function postSearchText(post: BlogPost): string {
  const contentText = post.content
    .map((b) => (b.type === 'ul' ? (b.items ?? []).join(' ') : (b.text ?? '')))
    .join(' ')
  return `${post.title} ${post.excerpt} ${contentText}`.toLowerCase()
}

/* ============ BLOG GRID ============ */
function BlogGrid({ onOpen }: { onOpen: (post: BlogPost) => void }) {
  const [category, setCategory] = React.useState<Category>('All')
  const [author, setAuthor] = React.useState<string>('All')
  const [search, setSearch] = React.useState('')

  const filtered = React.useMemo(() => {
    const q = search.trim().toLowerCase()
    return BLOG_POSTS.filter((p) => {
      if (category !== 'All' && p.category !== category) return false
      if (author !== 'All' && p.author !== author) return false
      if (q && !postSearchText(p).includes(q)) return false
      return true
    })
  }, [category, author, search])

  const hasActiveFilters = category !== 'All' || author !== 'All' || search.trim() !== ''
  // Featured card only shows when nothing is filtered — it's a fixed post, not search-relevant.
  const showFeatured = !hasActiveFilters
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0]
  const rest = showFeatured ? filtered.filter((p) => p.id !== featured.id) : filtered

  const clearFilters = React.useCallback(() => {
    setSearch('')
    setAuthor('All')
    setCategory('All')
  }, [])

  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Search + filter toolbar */}
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-muted/20 p-4 backdrop-blur sm:p-5">
          <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-brand-gradient opacity-10 blur-3xl" />

          {/* Search */}
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="relative mx-auto max-w-2xl"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              aria-label="Search articles"
              className={cn(
                'h-11 rounded-full border-border/60 bg-background/60 pl-11 pr-10 text-sm',
                'focus-visible:border-ring focus-visible:ring-ring/50',
                '[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none'
              )}
            />
            <AnimatePresence>
              {search && (
                <motion.button
                  type="button"
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-3 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                >
                  <X className="size-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </form>

          {/* Author chips */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="shrink-0 pr-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Authors
            </span>
            <button
              onClick={() => setAuthor('All')}
              aria-pressed={author === 'All'}
              className={cn(
                'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                author === 'All'
                  ? 'border-transparent bg-brand-gradient text-white shadow-[0_4px_20px_-6px_rgba(255,45,117,0.6)]'
                  : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground hover:border-border'
              )}
            >
              <span className="grid size-7 place-items-center rounded-full bg-white/15 text-[10px] font-bold">All</span>
              Everyone
            </button>
            {AUTHORS.map((a) => {
              const active = author === a.name
              return (
                <button
                  key={a.name}
                  onClick={() => setAuthor(active ? 'All' : a.name)}
                  aria-pressed={active}
                  className={cn(
                    'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                    active
                      ? 'border-transparent bg-brand-gradient-soft text-foreground ring-2 ring-[#ff2d75]/60'
                      : 'border-border/60 bg-background/40 text-muted-foreground hover:text-foreground hover:border-border'
                  )}
                >
                  <span
                    className={cn(
                      'grid size-7 place-items-center rounded-full bg-gradient-to-br text-[10px] font-bold text-white',
                      a.accent
                    )}
                  >
                    {a.initials}
                  </span>
                  {a.name}
                </button>
              )
            })}
          </div>

          {/* Categories + result count */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1">
              {CATEGORIES.map((c) => {
                const active = category === c
                return (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    aria-pressed={active}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                      active ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="blog-filter-pill"
                        className="absolute inset-0 rounded-full bg-brand-gradient shadow-[0_4px_20px_-6px_rgba(255,45,117,0.6)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{c}</span>
                  </button>
                )
              })}
            </div>
            <p className="text-xs text-muted-foreground" aria-live="polite">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{' '}
              {BLOG_POSTS.length} articles
            </p>
          </div>
        </div>

        {/* Featured post (only when no filters are active) */}
        <AnimatePresence>
          {showFeatured && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <FeaturedCard post={featured} onOpen={onOpen} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {rest.map((post) => (
              <motion.div
                key={post.id}
                layout
                variants={staggerItem}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
              >
                <BlogCard post={post} onOpen={onOpen} />
              </motion.div>
            ))}
          </AnimatePresence>
        </StaggerGroup>

        {/* Empty state */}
        {rest.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 flex flex-col items-center text-center"
          >
            <div className="grid size-16 place-items-center rounded-full bg-muted/40 ring-1 ring-border/60">
              <Search className="size-7 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold">No articles found</h3>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Try a different keyword or clear your filters to see everything.
            </p>
            {hasActiveFilters && (
              <Button variant="outline" className="mt-5 rounded-full" onClick={clearFilters}>
                <X className="size-4" />
                Clear filters
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}

function FeaturedCard({ post, onOpen }: { post: BlogPost; onOpen: (p: BlogPost) => void }) {
  return (
    <button
      onClick={() => onOpen(post)}
      className="group relative block w-full overflow-hidden rounded-3xl border border-border/60 text-left"
    >
      {post.image ? (
        <>
          <LazyImage
            src={post.image}
            alt={post.title}
            wrapperClassName="absolute inset-0 size-full"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className={cn('absolute inset-0 bg-gradient-to-br opacity-30 mix-blend-multiply', post.gradient)} />
        </>
      ) : (
        <div className={cn('absolute inset-0 bg-gradient-to-br', post.gradient)} />
      )}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        ✨ Featured
      </span>
      <span className="absolute right-5 top-5 text-5xl drop-shadow-lg">{post.emoji}</span>
      <div className="relative grid min-h-[22rem] items-end p-6 sm:p-8 lg:min-h-[26rem]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-xs text-white/80">
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 backdrop-blur">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar className="size-3" />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Clock className="size-3" />{post.readingMinutes} min</span>
          </div>
          <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
            {post.title}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">{post.excerpt}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition-transform group-hover:translate-x-1">
            Read article
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </button>
  )
}

function BlogCard({ post, onOpen }: { post: BlogPost; onOpen: (p: BlogPost) => void }) {
  return (
    <button
      onClick={() => onOpen(post)}
      className="group card-sheen relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl"
    >
      <div className="relative h-40 overflow-hidden">
        {post.image ? (
          <>
            <LazyImage
              src={post.image}
              alt={post.title}
              wrapperClassName="absolute inset-0 size-full"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={cn('absolute inset-0 bg-gradient-to-br opacity-30 mix-blend-multiply', post.gradient)} />
          </>
        ) : (
          <div className={cn('absolute inset-0 bg-gradient-to-br', post.gradient)} />
        )}
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute left-4 top-4 text-4xl drop-shadow-lg">{post.emoji}</span>
        <span className="absolute right-3 top-3 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Calendar className="size-3" />
          {formatDate(post.date)}
          <span className="mx-1">·</span>
          <Clock className="size-3" />
          {post.readingMinutes} min
        </div>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight">
          {post.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-2">
            <Avatar className="size-7 border border-background">
              <AvatarFallback className={cn('bg-gradient-to-br text-[10px] font-bold text-white', post.authorAccent)}>
                {post.authorInitials}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{post.author}</span>
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold">
            Read
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </button>
  )
}

/* ============ ARTICLE VIEW ============ */
function ArticleView({ post, onBack, onOpen }: { post: BlogPost; onBack: () => void; onOpen: (p: BlogPost) => void }) {
  const { setPage } = useNav()
  const [progress, setProgress] = React.useState(0)
  const articleRef = React.useRef<HTMLDivElement>(null)

  // Reading progress + view tracking
  React.useEffect(() => {
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = el.scrollHeight - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), total)
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    // Track view (best-effort)
    fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: post.slug }),
    }).catch(() => {})
    return () => window.removeEventListener('scroll', onScroll)
  }, [post.slug])

  // Inject JSON-LD structured data for SEO (schema.org Article + BreadcrumbList)
  React.useEffect(() => {
    const articleLd = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      dateModified: post.date,
      author: {
        '@type': 'Person',
        name: post.author,
        jobTitle: post.authorRole,
      },
      publisher: {
        '@type': 'Organization',
        name: 'Preet Web Vision',
        url: 'https://preetwebvision.com',
      },
      articleSection: post.category,
      wordCount: post.content.reduce((acc, b) => acc + (b.text?.split(/\s+/).length ?? 0), 0),
      keywords: post.category,
    }
    const breadcrumbLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://preetwebvision.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://preetwebvision.com/#blog' },
        { '@type': 'ListItem', position: 3, name: post.category, item: `https://preetwebvision.com/#blog` },
        { '@type': 'ListItem', position: 4, name: post.title },
      ],
    }
    const script1 = document.createElement('script')
    script1.type = 'application/ld+json'
    script1.text = JSON.stringify(articleLd)
    script1.dataset.dynamic = 'true'
    document.head.appendChild(script1)
    const script2 = document.createElement('script')
    script2.type = 'application/ld+json'
    script2.text = JSON.stringify(breadcrumbLd)
    script2.dataset.dynamic = 'true'
    document.head.appendChild(script2)
    return () => {
      document.head.querySelectorAll('script[data-dynamic="true"]').forEach((s) => s.remove())
    }
  }, [post])

  const related = BLOG_POSTS.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3)
  const fallbackRelated = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 3)
  const relatedPosts = related.length >= 2 ? related : fallbackRelated

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="relative">
      {/* Reading progress bar */}
      <div className="fixed inset-x-0 top-0 z-[55] h-1 bg-transparent">
        <div
          className="reading-progress h-full transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-6">
        <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-br opacity-10', post.gradient)} />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <button
              onClick={() => setPage('home')}
              className="hover:text-foreground"
            >
              Home
            </button>
            <ChevronRight className="size-3" />
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-1 font-medium hover:text-foreground"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              Blog
            </button>
            <ChevronRight className="size-3" />
            <span className="truncate text-foreground/70">{post.category}</span>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-brand-gradient-soft px-2.5 py-1 font-semibold text-foreground">
              {post.category}
            </span>
            <span className="flex items-center gap-1"><Calendar className="size-3" />{formatDate(post.date)}</span>
            <span className="flex items-center gap-1"><Clock className="size-3" />{post.readingMinutes} min read</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>

          {/* Author + share */}
          <div className="mt-7 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="size-11 border-2 border-background">
                <AvatarFallback className={cn('bg-gradient-to-br text-white', post.authorAccent)}>
                  {post.authorInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-display text-sm font-bold">{post.author}</p>
                <p className="text-xs text-muted-foreground">{post.authorRole}</p>
              </div>
            </div>
            <button
              onClick={share}
              className="flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/30 px-3.5 py-2 text-xs font-semibold transition-colors hover:text-foreground hover:border-border"
            >
              <Share2 className="size-3.5" />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Cover */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative h-56 overflow-hidden rounded-3xl sm:h-72">
          {post.image ? (
            <>
              <LazyImage
                src={post.image}
                alt={post.title}
                wrapperClassName="absolute inset-0 size-full"
                className="size-full object-cover"
              />
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-30 mix-blend-multiply', post.gradient)} />
            </>
          ) : (
            <div className={cn('absolute inset-0 bg-gradient-to-br', post.gradient)} />
          )}
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute left-6 top-6 text-6xl drop-shadow-lg">{post.emoji}</span>
        </div>
      </div>

      {/* Body */}
      <article ref={articleRef} className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="prose-brand">
          {post.content.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i}>{renderWithGlossary(block.text || '')}</h2>
            if (block.type === 'h3') return <h3 key={i}>{renderWithGlossary(block.text || '')}</h3>
            if (block.type === 'quote')
              return <blockquote key={i}>{renderWithGlossary(block.text || '')}</blockquote>
            if (block.type === 'ul')
              return (
                <ul key={i}>
                  {block.items?.map((it, j) => <li key={j}>{renderWithGlossary(it)}</li>)}
                </ul>
              )
            return <p key={i}>{renderWithGlossary(block.text || '')}</p>
          })}
        </div>

        {/* Newsletter inline signup form */}
        <BlogNewsletterSignup />
      </article>

      {/* Floating reading-progress badge */}
      <AnimatePresence>
        {progress > 5 && progress < 95 ? (
          <motion.div
            key="reading-badge"
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-40 hidden sm:flex"
            aria-hidden="true"
          >
            <div className="flex items-center gap-2 rounded-full border border-border/60 glass-strong px-3 py-1.5 shadow-xl">
              <span className="relative grid size-6 place-items-center">
                <svg viewBox="0 0 36 36" className="size-6 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    strokeWidth="3"
                    className="text-muted/40"
                    stroke="currentColor"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    strokeWidth="3"
                    strokeLinecap="round"
                    stroke="url(#readingProgressGrad)"
                    strokeDasharray={`${2 * Math.PI * 15}`}
                    strokeDashoffset={`${2 * Math.PI * 15 * (1 - progress / 100)}`}
                    style={{ transition: 'stroke-dashoffset 0.15s linear' }}
                  />
                  <defs>
                    <linearGradient id="readingProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--brand-orange)" />
                      <stop offset="100%" stopColor="var(--brand-rose)" />
                    </linearGradient>
                  </defs>
                </svg>
                <BookOpen className="size-3 text-foreground" />
              </span>
              <span className="text-xs font-bold tabular-nums">
                {Math.round(progress)}%
                <span className="ml-1 font-medium text-muted-foreground">read</span>
              </span>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Related */}
      <section className="relative border-t border-border/60 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Keep <GradientText>reading</GradientText>
            </h2>
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-1.5 text-sm font-semibold"
            >
              All articles
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
          <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((p) => (
              <motion.div key={p.id} variants={staggerItem}>
                <BlogCard post={p} onOpen={onOpen} />
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </div>
  )
}

/* ============ INLINE NEWSLETTER SIGNUP (in articles) ============ */
function BlogNewsletterSignup() {
  const [email, setEmail] = React.useState('')
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'loading') return
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'blog-article' }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed')
      setStatus('success')
      setEmail('')
      toast.success("You're on the list!", {
        description: 'Expect growth tips and studio updates in your inbox.',
      })
    } catch {
      setStatus('error')
      toast.error('Could not subscribe. Please try again.')
    }
  }

  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-border/60 bg-muted/20 p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-20 [mask-image:radial-gradient(ellipse_at_right,#000,transparent_70%)]" />
      <div className="relative">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-lg">
            <Mail className="size-5" />
          </span>
          <div className="flex-1">
            <h3 className="font-display text-lg font-bold">
              Enjoyed this? Get the next one in your <span className="text-gradient-brand">inbox</span>.
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Weekly insights on web, AI, SEO and growth. No spam, ever.
            </p>
          </div>
        </div>
        {status === 'success' ? (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm">
            <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
            <span>
              <span className="font-semibold">You&apos;re subscribed!</span>{' '}
              <span className="text-muted-foreground">Look out for our next article.</span>
            </span>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-5 flex flex-col gap-2 sm:flex-row">
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-11 flex-1 rounded-full bg-background/60"
              disabled={status === 'loading'}
            />
            <Button
              type="submit"
              disabled={status === 'loading'}
              className="h-11 shrink-0 rounded-full bg-brand-gradient text-white"
            >
              {status === 'loading' ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        )}
        <p className="mt-2 text-[11px] text-muted-foreground">
          Join 2,000+ founders and operators. Unsubscribe anytime.
        </p>
      </div>
    </div>
  )
}

/* ============ PAGE ============ */
export function BlogPage() {
  const [activePost, setActivePost] = React.useState<BlogPost | null>(null)

  const open = React.useCallback((post: BlogPost) => {
    setActivePost(post)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const back = React.useCallback(() => {
    setActivePost(null)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  // Listen for command palette "open blog post" events
  React.useEffect(() => {
    const onOpenPost = (e: Event) => {
      const slug = (e as CustomEvent<string>).detail
      const post = BLOG_POSTS.find((p) => p.slug === slug)
      if (post) open(post)
    }
    window.addEventListener('open-blog-post', onOpenPost as EventListener)
    return () => window.removeEventListener('open-blog-post', onOpenPost as EventListener)
  }, [open])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {activePost ? (
          <motion.div
            key={activePost.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArticleView post={activePost} onBack={back} onOpen={open} />
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BlogHero />
            <BlogGrid onOpen={open} />
            <BlogCta />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function BlogHero() {
  const stats = [
    { label: 'Articles', value: BLOG_POSTS.length, suffix: '' },
    { label: 'Categories', value: 5, suffix: '' },
    { label: 'Avg read', value: 6, suffix: ' min' },
  ]
  return (
    <section className="relative overflow-hidden pb-8 pt-10 sm:pt-16">
      <AmbientBackground variant="strong" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-muted/40 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <BookOpen className="size-3.5" style={{ color: 'var(--brand-pink)' }} />
            Insights
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance sm:text-6xl">
            Ideas that <GradientText className="text-glow-brand">compound</GradientText> your growth
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Field-tested playlists on web design, AI automations, SEO and ecommerce — from the team shipping them daily.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl font-bold text-gradient-brand">
                  {s.value}
                  {s.suffix}
                </p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function BlogCta() {
  const { setPage } = useNav()
  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand-gradient opacity-20 blur-3xl animate-pulse-glow" />
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_at_right,#000,transparent_70%)]" />
          <div className="relative grid items-center gap-6 sm:grid-cols-[1.4fr_1fr]">
            <div>
              <Badge className="rounded-full border-border/60 bg-brand-gradient-soft text-foreground">
                <TrendingUp className="size-3.5" />
                Put it into practice
              </Badge>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Reading is good. <GradientText>Shipping is better.</GradientText>
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Turn these insights into outcomes. Tell us about your project and we&apos;ll bring the team.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 sm:justify-end">
              <Button
                onClick={() => setPage('contact')}
                className="rounded-full bg-brand-gradient text-white shadow-[0_8px_30px_-8px_rgba(255,45,117,0.6)]"
              >
                <Sparkles className="size-4" />
                Start a project
              </Button>
              <Button
                onClick={() => setPage('services')}
                variant="outline"
                className="rounded-full"
              >
                Explore services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
