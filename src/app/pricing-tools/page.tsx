import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Tools & Recommended Resources',
  description: 'Explore Preet Web Vision recommended tools and resources for web design, AI automation, SEO, and ecommerce. Curated affiliate tools we use and trust for our clients.',
  keywords: ['web design tools', 'AI automation tools', 'SEO tools', 'ecommerce tools', 'recommended resources'],
  openGraph: {
    title: 'Preet Web Vision — Tools & Resources',
    description: 'Curated tools and resources for digital growth.',
    url: 'https://preetwebvision.com/pricing-tools',
    siteName: 'Preet Web Vision',
    type: 'website',
  },
  alternates: { canonical: 'https://preetwebvision.com/pricing-tools' },
}

export default function PricingPage() {
  redirect('/')
}
