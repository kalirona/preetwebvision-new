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
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Reveal,
  SectionHeading,
  StaggerGroup,
  staggerItem,
  GradientText,
} from '@/components/site/primitives'
import { AmbientBackground } from '@/components/site/ambient-background'
import { useNav } from '@/lib/nav-store'
import { BLOG_POSTS, type BlogPost } from '@/lib/content-data'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const CATEGORIES = ['All', 'Web Design', 'AI', 'SEO', 'Ecommerce', 'Growth'] as const
type Category = (typeof CATEGORIES)[number]

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

/* ============ BLOG GRID ============ */
function BlogGrid({ onOpen }: { onOpen: (post: BlogPost) => void }) {
  const [category, setCategory] = React.useState<Category>('All')
  const filtered = React.useMemo(
    () => (category === 'All' ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === category)),
    [category]
  )
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0]
  const rest = filtered.filter((p) => p.id !== featured.id || category !== 'All')

  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Featured post (only on "All") */}
        <AnimatePresence>
          {category === 'All' && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              <FeaturedCard post={featured} onOpen={onOpen} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((c) => {
            const active = category === c
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
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

        {/* Grid */}
        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <motion.div key={post.id} variants={staggerItem}>
              <BlogCard post={post} onOpen={onOpen} />
            </motion.div>
          ))}
        </StaggerGroup>

        {rest.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No articles in this category yet.</p>
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
      <div className={cn('absolute inset-0 bg-gradient-to-br', post.gradient)} />
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
      <div className={cn('relative h-40 overflow-hidden bg-gradient-to-br', post.gradient)}>
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
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            All articles
          </button>
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
        <div className={cn('relative h-56 overflow-hidden rounded-3xl bg-gradient-to-br sm:h-72', post.gradient)}>
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span className="absolute left-6 top-6 text-6xl drop-shadow-lg">{post.emoji}</span>
        </div>
      </div>

      {/* Body */}
      <article ref={articleRef} className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="prose-brand">
          {post.content.map((block, i) => {
            if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>
            if (block.type === 'h3') return <h3 key={i}>{block.text}</h3>
            if (block.type === 'quote')
              return <blockquote key={i}>{block.text}</blockquote>
            if (block.type === 'ul')
              return (
                <ul key={i}>
                  {block.items?.map((it, j) => <li key={j}>{it}</li>)}
                </ul>
              )
            return <p key={i}>{block.text}</p>
          })}
        </div>

        {/* Newsletter inline CTA */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-border/60 bg-muted/20 p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
          <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white">
              <Mail className="size-5" />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold">Enjoyed this? Get the next one in your inbox.</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Weekly insights on web, AI, SEO and growth. No spam, ever.
              </p>
            </div>
            <Button
              onClick={() => setPage('contact')}
              className="shrink-0 rounded-full bg-brand-gradient text-white"
            >
              Subscribe
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </article>

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
