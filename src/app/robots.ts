import type { MetadataRoute } from 'next'
import { getSeoSettings } from '@/lib/seo-settings'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await getSeoSettings()
  const base = settings.canonical_url || 'https://preetwebvision.com'
  const sitemapUrl = settings.robots_sitemap_url || `${base}/sitemap.xml`
  const allowAll = settings.robots_allow_all !== 'false'
  const disallowAdmin = settings.robots_disallow_admin !== 'false'
  const disallowApi = settings.robots_disallow_api !== 'false'

  const disallowPaths: string[] = []
  if (disallowAdmin) disallowPaths.push('/admin')
  if (disallowApi) disallowPaths.push('/api')

  return {
    rules: {
      userAgent: '*',
      allow: allowAll ? '/' : undefined,
      disallow: disallowPaths.length > 0 ? disallowPaths : undefined,
    },
    sitemap: sitemapUrl,
    host: base,
  }
}
