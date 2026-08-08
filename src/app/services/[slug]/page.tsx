import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { SERVICES } from '@/lib/site-data'
import { ServiceDetailPage } from '@/components/site/pages/service-detail-page'

// Generate static params for all services
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

// Generate unique SEO metadata per service
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = SERVICES.find((s) => s.slug === slug)
    if (!service) return { title: 'Service Not Found' }

    const Icon = service.icon
    return {
      metadataBase: new URL('https://preetwebvision.com'),
      title: `${service.title} — Preet Web Vision`,
      description: service.description,
      keywords: [service.title, service.tagline, ...service.features, 'Preet Web Vision', 'digital agency'],
      openGraph: {
        title: `${service.title} — Preet Web Vision`,
        description: service.description,
        siteName: 'Preet Web Vision',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: service.title,
        description: service.description,
      },
    }
  })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = SERVICES.find((s) => s.slug === slug)
  if (!service) notFound()

  // Inject Service schema.org JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: 'Preet Web Vision',
      url: 'https://preetwebvision.com',
    },
    areaServed: 'Worldwide',
    serviceType: service.title,
    offers: {
      '@type': 'Offer',
      description: service.tagline,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailPage slug={slug} />
    </>
  )
}
