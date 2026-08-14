import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import { markdownToHtml, estimateReadingMinutes } from '@/lib/markdown'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { AiAssistant } from '@/components/site/ai-assistant'
import { BlogShareButton } from '@/components/site/blog-share-button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Calendar, Clock, ArrowLeft, ArrowRight, ChevronRight, Sparkles } from 'lucide-react'

// ============ Types ============
type ContentBlock = { type: 'p' | 'h2' | 'h3' | 'ul' | 'quote'; text?: string; items?: string[] }

type BlogPostRow = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  category: string | null
  author: string | null
  authorRole: string | null
  authorInitials: string | null
  authorAccent: string | null
  imageUrl: string | null
  featured: number | boolean
  status: string
  createdAt: string
  updatedAt: string
}

const SITE_BASE = 'https://preetwebvision.com'

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Parse content into HTML for rendering inside .prose-brand.
// Supports two formats: legacy JSON blocks array, and markdown text.
function contentToHtml(content: string): { html: string; isMarkdown: boolean } {
  // Try legacy JSON blocks first (existing posts created via the old editor)
  try {
    const parsed = JSON.parse(content)
    if (
      Array.isArray(parsed) &&
      parsed.length > 0 &&
      typeof parsed[0] === 'object' &&
      'type' in parsed[0]
    ) {
      const blocks = parsed as ContentBlock[]
      const parts = blocks.map((b) => {
        switch (b.type) {
          case 'h2':
            return `<h2>${escapeHtml(b.text || '')}</h2>`
          case 'h3':
            return `<h3>${escapeHtml(b.text || '')}</h3>`
          case 'quote':
            return `<blockquote>${escapeHtml(b.text || '')}</blockquote>`
          case 'ul':
            return `<ul>${(b.items || []).map((it) => `<li>${escapeHtml(it)}</li>`).join('')}</ul>`
          case 'p':
          default:
            return `<p>${escapeHtml(b.text || '')}</p>`
        }
      })
      return { html: parts.join('\n'), isMarkdown: false }
    }
  } catch {
    // Not JSON — fall through to markdown
  }
  return { html: markdownToHtml(content), isMarkdown: true }
}

// ============ Fetch helpers ============
async function fetchPost(slug: string): Promise<BlogPostRow | null> {
  try {
    const rows = (await db.$queryRaw`
      SELECT id, title, slug, excerpt, content, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, status, createdAt, updatedAt
      FROM BlogPost
      WHERE slug = ${slug} AND status = 'published'
      LIMIT 1
    `) as BlogPostRow[]
    return rows[0] || null
  } catch (err) {
    console.error('Blog article fetch error:', err)
    return null
  }
}

async function fetchRelatedPosts(
  category: string | null,
  excludeSlug: string,
): Promise<BlogPostRow[]> {
  try {
    if (category) {
      const rows = (await db.$queryRaw`
        SELECT id, title, slug, excerpt, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, createdAt
        FROM BlogPost
        WHERE status = 'published' AND category = ${category} AND slug != ${excludeSlug}
        ORDER BY createdAt DESC
        LIMIT 3
      `) as BlogPostRow[]
      if (rows.length > 0) return rows
    }
    // Fallback: latest posts from any category
    const rows = (await db.$queryRaw`
      SELECT id, title, slug, excerpt, category, author, authorRole, authorInitials, authorAccent, imageUrl, featured, createdAt
      FROM BlogPost
      WHERE status = 'published' AND slug != ${excludeSlug}
      ORDER BY createdAt DESC
      LIMIT 3
    `) as BlogPostRow[]
    return rows
  } catch {
    return []
  }
}

// ============ Metadata ============
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) {
    return {
      title: 'Article not found — Preet Web Vision',
      description: 'The article you were looking for could not be found.',
      robots: { index: false, follow: false },
    }
  }

  const description = post.excerpt || `Read "${post.title}" on the Preet Web Vision blog.`
  const url = `${SITE_BASE}/blog/${post.slug}`
  const ogImage = post.imageUrl || `${SITE_BASE}/og-image.png`

  return {
    metadataBase: new URL(SITE_BASE),
    title: `${post.title} — Preet Web Vision Blog`,
    description,
    keywords: [
      post.category || 'digital marketing',
      'Preet Web Vision',
      'agency blog',
      post.author || 'Preet Kaur',
    ].filter(Boolean) as string[],
    authors: post.author ? [{ name: post.author }] : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url,
      siteName: 'Preet Web Vision',
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: post.author ? [post.author] : undefined,
      images: [{ url: ogImage, alt: post.title }],
      tags: post.category ? [post.category] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
  }
}

// ============ Page ============
export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await fetchPost(slug)
  if (!post) notFound()

  const [related, { html: contentHtml }] = await Promise.all([
    fetchRelatedPosts(post.category, post.slug),
    Promise.resolve(contentToHtml(post.content)),
  ])
  const readingMinutes = estimateReadingMinutes(post.content)

  const authorName = post.author || 'Preet Web Vision'
  const authorRole = post.authorRole || 'Digital Studio'
  const authorInitials = post.authorInitials || 'PW'
  const authorAccent = post.authorAccent || 'from-orange-500 to-pink-500'
  const category = post.category || 'Insights'

  // Article schema.org JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt || '',
    image: post.imageUrl ? [post.imageUrl] : [`${SITE_BASE}/og-image.png`],
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Preet Web Vision',
      url: SITE_BASE,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_BASE}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_BASE}/blog/${post.slug}`,
    },
    articleSection: category,
    url: `${SITE_BASE}/blog/${post.slug}`,
  }

  // Breadcrumb schema.org JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_BASE },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_BASE}/#blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_BASE}/blog/${post.slug}`,
      },
    ],
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Navbar />

      <main className="relative flex-1 pt-24">
        {/* Decorative ambient orb */}
        <div className="pointer-events-none absolute -top-24 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand-gradient opacity-[0.12] blur-3xl" />

        {/* ============ Hero ============ */}
        <section className="relative overflow-hidden pb-8">
          <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-6">
              <BreadcrumbList className="text-xs">
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="hover:text-foreground">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="size-3" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/#blog" className="hover:text-foreground">
                      Blog
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="size-3" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="max-w-[12rem] truncate text-foreground/80 sm:max-w-xs">
                    {post.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Category + meta */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="rounded-full bg-brand-gradient-soft px-2.5 py-1 font-semibold text-foreground">
                {category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="size-3" />
                {formatDate(post.createdAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-3" />
                {readingMinutes} min read
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.excerpt}</p>
            )}

            {/* Author + share */}
            <div className="mt-7 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="size-11 border-2 border-background">
                  <AvatarFallback
                    className={`bg-gradient-to-br ${authorAccent} font-display font-bold text-white`}
                  >
                    {authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-display text-sm font-bold">{authorName}</p>
                  <p className="text-xs text-muted-foreground">{authorRole}</p>
                </div>
              </div>
              <BlogShareButton title={post.title} slug={post.slug} />
            </div>
          </div>
        </section>

        {/* ============ Cover ============ */}
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div
            className={`relative h-56 overflow-hidden rounded-3xl border border-border/60 sm:h-72 ${
              !post.imageUrl
                ? 'bg-gradient-to-br from-orange-500/30 via-pink-500/30 to-rose-500/30'
                : ''
            }`}
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="size-full object-cover"
                loading="eager"
              />
            )}
            {!post.imageUrl && (
              <div className="grid size-full place-items-center">
                <Sparkles className="size-12 text-foreground/40" />
              </div>
            )}
          </div>
        </div>

        {/* ============ Article body ============ */}
        <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <div className="prose-brand" dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>

        {/* ============ Author CTA strip ============ */}
        <section className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-12 -top-12 size-48 rounded-full bg-brand-gradient opacity-15 blur-3xl" />
            <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Avatar className="size-14 border-2 border-background">
                <AvatarFallback
                  className={`bg-gradient-to-br ${authorAccent} font-display text-lg font-bold text-white`}
                >
                  {authorInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-display text-base font-bold">Written by {authorName}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{authorRole}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Building fast, AI-native websites & automations that move real metrics — shipped
                  for 180+ brands across 12 countries.
                </p>
              </div>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(255,45,117,0.6)] transition-transform hover:scale-[1.02]"
              >
                <Sparkles className="size-4" />
                Work with us
              </Link>
            </div>
          </div>
        </section>

        {/* ============ Back to blog ============ */}
        <div className="mx-auto max-w-3xl px-4 pb-8 sm:px-6">
          <Link
            href="/#blog"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to all articles
          </Link>
        </div>

        {/* ============ Related posts ============ */}
        {related.length > 0 && (
          <section className="relative border-t border-border/60 bg-muted/20 py-16">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-pink)]">
                    Keep reading
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    Related articles
                  </h2>
                </div>
                <Link
                  href="/#blog"
                  className="hidden items-center gap-1 text-sm font-semibold text-foreground/80 hover:text-foreground sm:inline-flex"
                >
                  View all
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rp) => {
                  const rAccent = rp.authorAccent || 'from-orange-500 to-pink-500'
                  return (
                    <Link
                      key={rp.id}
                      href={`/blog/${rp.slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-border hover:shadow-xl"
                    >
                      <div
                        className={`relative h-32 overflow-hidden ${
                          !rp.imageUrl ? `bg-gradient-to-br ${rAccent} opacity-90` : ''
                        }`}
                      >
                        {rp.imageUrl && (
                          <img
                            src={rp.imageUrl}
                            alt={rp.title}
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                        )}
                        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-foreground backdrop-blur">
                          {rp.category || 'Insights'}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <p className="font-display text-sm font-bold leading-snug transition-colors group-hover:text-[var(--brand-pink)]">
                          {rp.title}
                        </p>
                        {rp.excerpt && (
                          <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                            {rp.excerpt}
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-2 text-[10px] text-muted-foreground">
                          <span>{formatDate(rp.createdAt)}</span>
                          <span>·</span>
                          <span>{estimateReadingMinutes(rp.content || '')} min read</span>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ============ Final CTA ============ */}
        <section className="relative py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card p-8 sm:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand-gradient opacity-20 blur-3xl animate-pulse-glow" />
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-25 [mask-image:radial-gradient(ellipse_at_right,#000,transparent_70%)]" />
              <div className="relative grid items-center gap-6 sm:grid-cols-[1.4fr_1fr]">
                <div>
                  <Badge className="rounded-full border-border/60 bg-brand-gradient-soft text-foreground">
                    <Sparkles className="size-3.5" />
                    Put it into practice
                  </Badge>
                  <h2 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    Reading is good. <span className="text-gradient-brand">Shipping is better.</span>
                  </h2>
                  <p className="mt-3 max-w-md text-muted-foreground">
                    Turn these insights into outcomes. Tell us about your project and we&apos;ll
                    bring the team.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 sm:justify-end">
                  <Link
                    href="/#contact"
                    className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_30px_-8px_rgba(255,45,117,0.6)] transition-transform hover:scale-[1.02]"
                  >
                    <Sparkles className="size-4" />
                    Start a project
                  </Link>
                  <Link
                    href="/#services"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  >
                    Explore services
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <AiAssistant />
    </div>
  )
}
