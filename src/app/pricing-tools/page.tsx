import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Pricing & Tools',
  description: 'Explore Preet Web Vision pricing plans and recommended tools. Launch, Growth, and Enterprise tiers plus curated affiliate tools for your business.',
  keywords: ['web design pricing', 'AI automation cost', 'ecommerce development pricing', 'SEO pricing'],
  openGraph: {
    title: 'Preet Web Vision Pricing & Tools',
    description: 'Transparent pricing for websites, AI, web apps, SEO and ecommerce.',
    url: 'https://preetwebvision.com/pricing-tools',
  },
  alternates: { canonical: 'https://preetwebvision.com/pricing-tools' },
}

export default function PricingPage() {
  redirect('/#pricing')
}
