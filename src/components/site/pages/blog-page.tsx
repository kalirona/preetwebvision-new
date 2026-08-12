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
  CheckCircle2,
  Loader2,
  Send,
  Search,
  X,
  ChevronLeft,
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
import { useNav } from '@/lib/nav-store'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  authorRole: string
  authorInitials: string
  authorAccent: string
  imageUrl: string | null
  featured: boolean
  createdAt: string
}

type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

const CATEGORIES = ['All', 'Web Design', 'AI', 'SEO', 'Ecommerce', 'Growth']

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function estimateReadTime(content: string): number {
  try {
    const blocks = JSON.parse(content)
    const text = blocks.map((b: { text?: string; items?: string[] }) => b.text || (b.items || []).join(' ')).join(' ')
    const words = text.split(/\s+/).length
    return Math.max(1, Math.ceil(words / 200))
  } catch {
    return 5
  }
}

function getContentPreview(content: string): string {
  try {
    const blocks = JSON.parse(content)
    const firstP = blocks.find((b: { type: string }) => b.type === 'p')
    return firstP?.text || ''
  } catch {
    return content.slice(0, 200)
  }
}

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
            <ArticleView post={activePost} onBack={back} />
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

/* ============ BLOG HERO ============ */
function BlogHero() {
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
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            Ideas that <GradientText className="text-glow-brand">compound</GradientText> your growth
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Field-tested insights on web design, AI automations, SEO and ecommerce — from the team shipping them daily.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ============ BLOG GRID WITH PAGINATION ============ */
function BlogGrid({ onOpen }: { onOpen: (p: BlogPost) => void }) {
  const [posts, setPosts] = React.useState<BlogPost[]>([])
  const [pagination, setPagination] = React.useState<Pagination>({ page: 1, limit: 9, total: 0, totalPages: 0 })
  const [loading, setLoading] = React.useState(true)
  const [category, setCategory] = React.useState('All')
  const [search, setSearch] = React.useState('')

  const fetchPosts = React.useCallback(async (page: number = 1) => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page: String(page), limit: '9' })
      if (category !== 'All') params.set('category', category)
      if (search) params.set('search', search)
      const res = await fetch(`/api/blog-posts?${params}`)
      const data = await res.json()
      setPosts(data.posts || [])
      setPagination(data.pagination || { page: 1, limit: 9, total: 0, totalPages: 0 })
    } catch {
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [category, search])

  React.useEffect(() => {
    fetchPosts(1)
  }, [fetchPosts])

  const featuredPost = posts.find((p) => p.featured && pagination.page === 1 && category === 'All' && !search)
  const regularPosts = posts.filter((p) => p.id !== featuredPost?.id)

  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Featured post */}
        <AnimatePresence>
          {featuredPost && !loading && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <FeaturedCard post={featuredPost} onOpen={onOpen} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search + Filters */}
        <div className="mt-10 flex flex-col items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search articles…"
              className="rounded-full bg-muted/30 pl-9"
              onKeyDown={(e) => e.key === 'Enter' && fetchPosts(1)}
            />
            {search && (
              <button onClick={() => { setSearch(''); fetchPosts(1) }} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {CATEGORIES.map((c) => {
              const active = category === c
              return (
                <button
                  key={c}
                  onClick={() => { setCategory(c); }}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    active ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {active && (
                    <motion.span layoutId="blog-filter-pill" className="absolute inset-0 rounded-full bg-brand-gradient shadow-[0_4px_20px_-6px_rgba(255,45,117,0.6)]" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                  )}
                  <span className="relative z-10">{c}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-3xl border border-border/60 bg-muted/20" />
            ))}
          </div>
        ) : regularPosts.length === 0 ? (
          <div className="mt-12 flex flex-col items-center py-16 text-center">
            <Search className="size-10 text-muted-foreground/40" />
            <p className="mt-3 font-display text-lg font-bold">No articles found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search or category.</p>
          </div>
        ) : (
          <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <motion.div key={post.id} variants={staggerItem}>
                <BlogCard post={post} onOpen={onOpen} />
              </motion.div>
            ))}
          </StaggerGroup>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && !loading && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => { fetchPosts(pagination.page - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              disabled={pagination.page === 1}
              className="grid size-10 place-items-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ChevronLeft className="size-4" />
            </button>
            {[...Array(pagination.totalPages)].map((_, i) => {
              const pageNum = i + 1
              const isActive = pageNum === pagination.page
              return (
                <button
                  key={pageNum}
                  onClick={() => { fetchPosts(pageNum); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className={cn(
                    'grid size-10 place-items-center rounded-full text-sm font-semibold transition-colors',
                    isActive ? 'bg-brand-gradient text-white' : 'border border-border/70 bg-card text-muted-foreground hover:text-foreground'
                  )}
                >
                  {pageNum}
                </button>
              )
            })}
            <button
              onClick={() => { fetchPosts(pagination.page + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              disabled={pagination.page === pagination.totalPages}
              className="grid size-10 place-items-center rounded-full border border-border/70 bg-card text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        )}

        {/* Result count */}
        {!loading && posts.length > 0 && (
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Showing {posts.length} of {pagination.total} articles · Page {pagination.page} of {pagination.totalPages || 1}
          </p>
        )}
      </div>
    </section>
  )
}

/* ============ FEATURED CARD ============ */
function FeaturedCard({ post, onOpen }: { post: BlogPost; onOpen: (p: BlogPost) => void }) {
  return (
    <button
      onClick={() => onOpen(post)}
      className="group relative block w-full overflow-hidden rounded-3xl border border-border/60 text-left"
    >
      {post.imageUrl ? (
        <div className="absolute inset-0">
          <img src={post.imageUrl} alt={post.title} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500" />
      )}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <span className="absolute left-5 top-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        ✨ Featured
      </span>
      <div className="relative grid min-h-[22rem] items-end p-6 sm:p-8 lg:min-h-[26rem]">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 text-xs text-white/80">
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 backdrop-blur">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar className="size-3" />{formatDate(post.createdAt)}</span>
            <span className="flex items-center gap-1"><Clock className="size-3" />{estimateReadTime(post.content)} min</span>
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

/* ============ BLOG CARD ============ */
function BlogCard({ post, onOpen }: { post: BlogPost; onOpen: (p: BlogPost) => void }) {
  return (
    <button
      onClick={() => onOpen(post)}
      className="group card-sheen relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-border hover:shadow-xl"
    >
      <div className="relative h-40 overflow-hidden">
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="size-full bg-gradient-to-br from-orange-500 via-pink-500 to-rose-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <span className="absolute right-3 top-3 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Calendar className="size-3" />
          {formatDate(post.createdAt)}
          <span className="mx-1">·</span>
          <Clock className="size-3" />
          {estimateReadTime(post.content)} min
        </div>
        <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-tight line-clamp-2">
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
function ArticleView({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  const { setPage } = useNav()
  const [progress, setProgress] = React.useState(0)
  const articleRef = React.useRef<HTMLDivElement>(null)

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
    return () => window.removeEventListener('scroll', onScroll)
  }, [post.id])

  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, url })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied to clipboard!')
      }
    } catch { /* cancelled */ }
  }

  // Parse content blocks
  let contentBlocks: Array<{ type: string; text?: string; items?: string[] }> = []
  try {
    contentBlocks = JSON.parse(post.content)
  } catch {
    contentBlocks = [{ type: 'p', text: post.content }]
  }

  return (
    <div className="relative">
      {/* Reading progress bar */}
      <div className="fixed inset-x-0 top-0 z-[55] h-1 bg-transparent">
        <div className="reading-progress h-full transition-[width] duration-150" style={{ width: `${progress}%` }} />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden pb-10 pt-6">
        <div className={cn('pointer-events-none absolute inset-0 bg-gradient-to-br opacity-10', post.authorAccent)} />
        <div className="pointer-events-none absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
          <button onClick={onBack} className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            All articles
          </button>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="rounded-full bg-brand-gradient-soft px-2.5 py-1 font-semibold text-foreground">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar className="size-3" />{formatDate(post.createdAt)}</span>
            <span className="flex items-center gap-1"><Clock className="size-3" />{estimateReadTime(post.content)} min read</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
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
            <button onClick={share} className="flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/30 px-3.5 py-2 text-xs font-semibold transition-colors hover:text-foreground hover:border-border">
              <Share2 className="size-3.5" />
              Share
            </button>
          </div>
        </div>
      </section>

      {/* Cover */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className={cn('relative h-56 overflow-hidden rounded-3xl sm:h-72', !post.imageUrl && 'bg-gradient-to-br')}>
          {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="size-full object-cover" />}
        </div>
      </div>

      {/* Body */}
      <article ref={articleRef} className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="prose-brand">
          {contentBlocks.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>
            if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>
            if (block.type === 'quote') return <blockquote key={i}>{block.text}</blockquote>
            if (block.type === 'ul') return (
              <ul key={i}>
                {block.items?.map((it, j) => <li key={j}>{it}</li>)}
              </ul>
            )
            return <p key={i}>{block.text}</p>
          })}
          {contentBlocks.length === 0 && <p>{post.excerpt}</p>}
        </div>
      </article>

      {/* Floating reading badge */}
      <AnimatePresence>
        {progress > 5 && progress < 95 && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            className="fixed bottom-24 right-5 z-40 hidden sm:flex"
          >
            <div className="flex items-center gap-2 rounded-full glass-strong px-3 py-1.5 shadow-xl">
              <span className="relative grid size-6 place-items-center">
                <svg viewBox="0 0 36 36" className="size-6 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3" className="text-muted/40" stroke="currentColor" />
                  <circle cx="18" cy="18" r="15" fill="none" strokeWidth="3" stroke="url(#reading-grad)" strokeLinecap="round" strokeDasharray={2 * Math.PI * 15} strokeDashoffset={2 * Math.PI * 15 * (1 - progress / 100)} className="transition-[stroke-dashoffset] duration-150" />
                  <defs><linearGradient id="reading-grad" x1="0" y1="0" x2="36" y2="36"><stop stopColor="var(--brand-orange)" /><stop offset="1" stopColor="var(--brand-rose)" /></linearGradient></defs>
                </svg>
                <BookOpen className="size-3" />
              </span>
              <span className="text-xs font-semibold">{Math.round(progress)}% read</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ============ CTA ============ */
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
              <Button onClick={() => setPage('contact')} className="rounded-full bg-brand-gradient text-white shadow-[0_8px_30px_-8px_rgba(255,45,117,0.6)]">
                <Sparkles className="size-4" />
                Start a project
              </Button>
              <Button onClick={() => setPage('services')} variant="outline" className="rounded-full">
                Explore services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
