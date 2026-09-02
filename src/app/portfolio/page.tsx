import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Portfolio — Our Work & Case Studies',
  description: 'See how Preet Web Vision helped brands grow with stunning websites, AI automations, web apps, SEO and ecommerce. Real projects with measurable results: +38% conversion rate, 71% tickets auto-resolved, 217% organic traffic growth, and more.',
  keywords: ['web design portfolio', 'AI automation case studies', 'ecommerce projects', 'SEO results', 'web app case studies', 'digital agency work'],
  openGraph: {
    title: 'Preet Web Vision Portfolio — Real Results',
    description: 'Projects that ship outcomes — ecommerce, AI, web apps, SEO and more.',
    url: 'https://preetwebvision.com/portfolio',
    siteName: 'Preet Web Vision',
    type: 'website',
  },
  alternates: { canonical: 'https://preetwebvision.com/portfolio' },
}

export default function PortfolioPage() {
  redirect('/')
}
