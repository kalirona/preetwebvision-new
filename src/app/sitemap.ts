import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://preetwebvision.com'
  const now = new Date()

  // The site is a single-route SPA, but we declare logical pages for SEO
  const pages = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/#services', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/#portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/#about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/#pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/#blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/#contact', priority: 0.9, changeFrequency: 'monthly' as const },
  ]

  return pages.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }))
}
