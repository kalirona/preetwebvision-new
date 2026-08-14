import type { MetadataRoute } from 'next'
import { db } from '@/lib/db'
import { getSeoSettings } from '@/lib/seo-settings'
import { SERVICES } from '@/lib/site-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSeoSettings()
  const base = settings.canonical_url || 'https://preetwebvision.com'
  const now = new Date()

  const priorityHome = parseFloat(settings.sitemap_priority_home || '1.0')
  const priorityServices = parseFloat(settings.sitemap_priority_services || '0.9')
  const priorityBlog = parseFloat(settings.sitemap_priority_blog || '0.8')
  const priorityOther = parseFloat(settings.sitemap_priority_other || '0.6')

  const freqHome = (settings.sitemap_changefreq_home || 'weekly') as MetadataRoute.Sitemap[number]['changeFrequency']
  const freqServices = (settings.sitemap_changefreq_services || 'monthly') as MetadataRoute.Sitemap[number]['changeFrequency']
  const freqBlog = (settings.sitemap_changefreq_blog || 'weekly') as MetadataRoute.Sitemap[number]['changeFrequency']

  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: freqHome, priority: priorityHome },
    { url: `${base}/#services`, lastModified: now, changeFrequency: freqServices, priority: priorityServices },
    { url: `${base}/#portfolio`, lastModified: now, changeFrequency: freqServices, priority: priorityServices },
    { url: `${base}/#about`, lastModified: now, changeFrequency: freqServices, priority: priorityOther },
    { url: `${base}/#pricing`, lastModified: now, changeFrequency: freqServices, priority: priorityOther },
    { url: `${base}/#blog`, lastModified: now, changeFrequency: freqBlog, priority: priorityBlog },
    { url: `${base}/#contact`, lastModified: now, changeFrequency: freqServices, priority: priorityServices },
    { url: `${base}/about-us`, lastModified: now, changeFrequency: freqServices, priority: priorityOther },
    { url: `${base}/services`, lastModified: now, changeFrequency: freqServices, priority: priorityServices },
    { url: `${base}/portfolio`, lastModified: now, changeFrequency: freqServices, priority: priorityServices },
    { url: `${base}/pricing-tools`, lastModified: now, changeFrequency: freqServices, priority: priorityOther },
    { url: `${base}/contact-us`, lastModified: now, changeFrequency: freqServices, priority: priorityServices },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  // Add service detail pages
  for (const service of SERVICES) {
    pages.push({
      url: `${base}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: freqServices,
      priority: priorityServices,
    })
  }

  // Add individual blog article pages — fetched from DB via raw SQL.
  // Each published post gets its own /blog/[slug] URL so search engines
  // can index every article independently (previously we only emitted a
  // single #blog hash URL for the whole blog).
  try {
    const posts = (await db.$queryRaw`
      SELECT slug, updatedAt, createdAt
      FROM BlogPost
      WHERE status = 'published' AND slug IS NOT NULL AND slug != ''
      ORDER BY createdAt DESC
    `) as Array<{ slug: string; updatedAt: string | null; createdAt: string }>

    for (const post of posts) {
      const lastModified = post.updatedAt || post.createdAt
      pages.push({
        url: `${base}/blog/${post.slug}`,
        lastModified: lastModified ? new Date(lastModified) : now,
        changeFrequency: freqBlog,
        priority: priorityBlog,
      })
    }
  } catch (err) {
    // Fail soft — if the DB query errors, the sitemap still returns the static pages.
    console.error('Sitemap blog fetch error:', err)
  }

  return pages
}
