import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Portfolio — Our Work',
  description: 'See how Preet Web Vision helped brands grow with stunning websites, AI automations, web apps, SEO and ecommerce. Real projects, real results.',
  keywords: ['web design portfolio', 'AI automation case studies', 'ecommerce projects', 'SEO results'],
  openGraph: {
    title: 'Preet Web Vision Portfolio',
    description: 'Projects that ship outcomes — ecommerce, AI, web apps, and more.',
    url: 'https://preetwebvision.com/portfolio',
  },
  alternates: { canonical: 'https://preetwebvision.com/portfolio' },
}

export default function PortfolioPage() {
  redirect('/#portfolio')
}
